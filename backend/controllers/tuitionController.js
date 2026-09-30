import asyncHandler from 'express-async-handler';
import Tuition from '../models/Tuition.js';

// Helper to generate next Tuition ID (HT-1001, HT-1002, ...)
export const generateTuitionId = async () => {
  const tuitions = await Tuition.find({ tuitionId: /^HT-\d+$/ }, { tuitionId: 1 }).lean();
  let maxNum = 1000;
  for (const t of tuitions) {
    if (t.tuitionId) {
      const match = t.tuitionId.match(/HT-(\d+)/);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    }
  }

  let candidateNum = maxNum + 1;
  let candidateId = `HT-${candidateNum}`;

  while (await Tuition.exists({ tuitionId: candidateId })) {
    candidateNum++;
    candidateId = `HT-${candidateNum}`;
  }

  return candidateId;
};

// @desc    Get all tuition posts (Filtered & Searched)
// @route   GET /api/tuitions
// @access  Public
export const getTuitions = asyncHandler(async (req, res) => {
  const {
    search,
    className,
    subject,
    location,
    area,
    minSalary,
    maxSalary,
    tutorGenderPreference,
    tuitionType,
    daysPerWeek,
    status,
    featured,
    limit,
    page = 1,
  } = req.query;

  const query = {};

  // Status filter (Default: only 'active' unless admin specifies otherwise)
  if (status) {
    query.status = status;
  }

  // Featured filter
  if (featured !== undefined && featured !== '') {
    query.featured = featured === 'true';
  }

  // Text / Keyword Search (Subject, Location, Title, Tuition ID, Area)
  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [
      { tuitionId: regex },
      { title: regex },
      { subject: regex },
      { location: regex },
      { area: regex },
      { className: regex },
    ];
  }

  // Explicit filters
  if (className) {
    query.className = new RegExp(`^${className}$`, 'i');
  }
  if (subject) {
    query.subject = new RegExp(subject, 'i');
  }
  if (location) {
    query.location = new RegExp(location, 'i');
  }
  if (area) {
    query.area = new RegExp(area, 'i');
  }
  if (tutorGenderPreference && tutorGenderPreference !== 'Any') {
    query.tutorGenderPreference = { $in: [tutorGenderPreference, 'Any'] };
  }
  if (tuitionType) {
    query.tuitionType = tuitionType;
  }
  if (daysPerWeek) {
    query.daysPerWeek = new RegExp(daysPerWeek, 'i');
  }

  // Salary range
  if (minSalary || maxSalary) {
    query.salary = {};
    if (minSalary) query.salary.$gte = Number(minSalary);
    if (maxSalary) query.salary.$lte = Number(maxSalary);
  }

  const pageSize = limit ? Number(limit) : 50;
  const count = await Tuition.countDocuments(query);
  const tuitions = await Tuition.find(query)
    .sort({ featured: -1, createdAt: -1 })
    .skip(pageSize * (Number(page) - 1))
    .limit(pageSize);

  res.json({
    tuitions,
    page: Number(page),
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Get single tuition by ID (Mongo ID or HT-XXXX)
// @route   GET /api/tuitions/:id
// @access  Public
export const getTuitionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let tuition;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    tuition = await Tuition.findById(id);
  } else {
    tuition = await Tuition.findOne({ tuitionId: id });
  }

  if (tuition) {
    res.json(tuition);
  } else {
    res.status(404);
    throw new Error('Tuition post not found');
  }
});

// @desc    Create new tuition post
// @route   POST /api/tuitions
// @access  Private/Admin
export const createTuition = asyncHandler(async (req, res) => {
  const {
    title,
    className,
    subject,
    studentGender,
    numberOfStudents,
    location,
    area,
    daysPerWeek,
    preferredTime,
    salary,
    tutorGenderPreference,
    tuitionType,
    description,
    requirements,
    applicationDeadline,
    featured,
    status,
    tuitionId: customTuitionId,
  } = req.body;

  let tuitionId = customTuitionId;
  if (tuitionId) {
    const existing = await Tuition.findOne({ tuitionId });
    if (existing) {
      res.status(400);
      throw new Error(`Tuition ID ${tuitionId} already exists. Please use a unique ID.`);
    }
  }

  let tuition;
  let attempts = 0;
  while (!tuition && attempts < 5) {
    try {
      if (!customTuitionId || attempts > 0) {
        tuitionId = await generateTuitionId();
      }
      tuition = await Tuition.create({
        tuitionId,
        title,
        className,
        subject,
        studentGender: studentGender || 'Any',
        numberOfStudents: numberOfStudents || 1,
        location,
        area: area || '',
        daysPerWeek: daysPerWeek || '3 Days/Week',
        preferredTime: preferredTime || '7:00 PM',
        salary: Number(salary),
        tutorGenderPreference: tutorGenderPreference || 'Any',
        tuitionType: tuitionType || 'Home Tuition',
        description: description || '',
        requirements: requirements || '',
        applicationDeadline: applicationDeadline || null,
        featured: featured || false,
        status: status || 'active',
      });
    } catch (err) {
      if (err.code === 11000 && !customTuitionId) {
        attempts++;
        continue;
      }
      throw err;
    }
  }

  res.status(201).json(tuition);
});

// @desc    Update tuition post
// @route   PUT /api/tuitions/:id
// @access  Private/Admin
export const updateTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    tuition.title = req.body.title || tuition.title;
    tuition.className = req.body.className || tuition.className;
    tuition.subject = req.body.subject || tuition.subject;
    tuition.studentGender = req.body.studentGender || tuition.studentGender;
    tuition.numberOfStudents = req.body.numberOfStudents ?? tuition.numberOfStudents;
    tuition.location = req.body.location || tuition.location;
    tuition.area = req.body.area ?? tuition.area;
    tuition.daysPerWeek = req.body.daysPerWeek || tuition.daysPerWeek;
    tuition.preferredTime = req.body.preferredTime || tuition.preferredTime;
    tuition.salary = req.body.salary !== undefined ? Number(req.body.salary) : tuition.salary;
    tuition.tutorGenderPreference = req.body.tutorGenderPreference || tuition.tutorGenderPreference;
    tuition.tuitionType = req.body.tuitionType || tuition.tuitionType;
    tuition.description = req.body.description ?? tuition.description;
    tuition.requirements = req.body.requirements ?? tuition.requirements;
    tuition.applicationDeadline = req.body.applicationDeadline ?? tuition.applicationDeadline;
    if (req.body.featured !== undefined) tuition.featured = req.body.featured;
    if (req.body.status !== undefined) tuition.status = req.body.status;

    const updatedTuition = await tuition.save();
    res.json(updatedTuition);
  } else {
    res.status(404);
    throw new Error('Tuition post not found');
  }
});

// @desc    Delete tuition post
// @route   DELETE /api/tuitions/:id
// @access  Private/Admin
export const deleteTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    await tuition.deleteOne();
    res.json({ message: 'Tuition post removed successfully' });
  } else {
    res.status(404);
    throw new Error('Tuition post not found');
  }
});

// @desc    Update tuition status (active, inactive, closed)
// @route   PATCH /api/tuitions/:id/status
// @access  Private/Admin
export const updateTuitionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    if (!['active', 'inactive', 'closed'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status value. Must be active, inactive, or closed.');
    }
    tuition.status = status;
    const updated = await tuition.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Tuition post not found');
  }
});

// @desc    Toggle tuition featured status
// @route   PATCH /api/tuitions/:id/featured
// @access  Private/Admin
export const toggleTuitionFeatured = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    tuition.featured = !tuition.featured;
    const updated = await tuition.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Tuition post not found');
  }
});
