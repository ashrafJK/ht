import asyncHandler from 'express-async-handler';
import Tutor from '../models/Tutor.js';
import User from '../models/User.js';

// Helper to calculate profile completion percentage
export const calculateProfileCompletion = (tutor) => {
  if (!tutor) return 0;
  const fields = [
    'name',
    'photo',
    'phone',
    'email',
    'gender',
    'university',
    'department',
    'degree',
    'passingYear',
    'experience',
    'subjects',
    'classes',
    'preferredLocations',
    'expectedSalary',
    'availableDays',
    'availableTime',
    'bio',
  ];

  let filledCount = 0;
  fields.forEach((field) => {
    const val = tutor[field];
    if (Array.isArray(val)) {
      if (val.length > 0) filledCount++;
    } else if (val !== null && val !== undefined && val !== '') {
      filledCount++;
    }
  });

  return Math.round((filledCount / fields.length) * 100);
};

// @desc    Get all tutors (Admin/Public search)
// @route   GET /api/tutors
// @access  Public / Admin
export const getTutors = asyncHandler(async (req, res) => {
  const { search, university, subject, location, verified } = req.query;
  const query = {};

  if (verified !== undefined && verified !== '') {
    query.verified = verified === 'true';
  }

  if (university) {
    query.university = new RegExp(university, 'i');
  }

  if (subject) {
    query.subjects = { $in: [new RegExp(subject, 'i')] };
  }

  if (location) {
    query.preferredLocations = { $in: [new RegExp(location, 'i')] };
  }

  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { university: regex },
      { department: regex },
      { subjects: regex },
      { preferredLocations: regex },
    ];
  }

  const tutors = await Tutor.find(query)
    .populate('userId', 'role status createdAt')
    .sort({ createdAt: -1 });

  const tutorsWithCompletion = tutors.map((t) => {
    const tObj = t.toObject();
    tObj.profileCompletion = calculateProfileCompletion(t);
    return tObj;
  });

  res.json(tutorsWithCompletion);
});

// @desc    Get single tutor details by ID or User ID
// @route   GET /api/tutors/:id
// @access  Public
export const getTutorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let tutor;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    tutor = await Tutor.findById(id).populate('userId', 'role status createdAt');
    if (!tutor) {
      tutor = await Tutor.findOne({ userId: id }).populate('userId', 'role status createdAt');
    }
  }

  if (tutor) {
    const tObj = tutor.toObject();
    tObj.profileCompletion = calculateProfileCompletion(tutor);
    res.json(tObj);
  } else {
    res.status(404);
    throw new Error('Tutor profile not found');
  }
});

// @desc    Update Tutor profile
// @route   PUT /api/tutors/profile
// @access  Private/Tutor
export const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findOne({ userId: req.user._id });

  if (!tutor) {
    res.status(404);
    throw new Error('Tutor profile not found');
  }

  const user = await User.findById(req.user._id);

  // Update Tutor fields
  tutor.name = req.body.name || tutor.name;
  tutor.photo = req.body.photo !== undefined ? req.body.photo : tutor.photo;
  tutor.phone = req.body.phone || tutor.phone;
  tutor.email = req.body.email || tutor.email;
  tutor.gender = req.body.gender || tutor.gender;
  tutor.university = req.body.university || tutor.university;
  tutor.department = req.body.department || tutor.department;
  tutor.degree = req.body.degree || tutor.degree;
  tutor.passingYear = req.body.passingYear !== undefined ? req.body.passingYear : tutor.passingYear;
  tutor.experience = req.body.experience || tutor.experience;
  
  if (req.body.subjects) {
    tutor.subjects = Array.isArray(req.body.subjects)
      ? req.body.subjects
      : req.body.subjects.split(',').map((s) => s.trim());
  }

  if (req.body.classes) {
    tutor.classes = Array.isArray(req.body.classes)
      ? req.body.classes
      : req.body.classes.split(',').map((c) => c.trim());
  }

  if (req.body.preferredLocations) {
    tutor.preferredLocations = Array.isArray(req.body.preferredLocations)
      ? req.body.preferredLocations
      : req.body.preferredLocations.split(',').map((l) => l.trim());
  }

  if (req.body.expectedSalary !== undefined) {
    tutor.expectedSalary = Number(req.body.expectedSalary);
  }

  tutor.availableDays = req.body.availableDays || tutor.availableDays;
  tutor.availableTime = req.body.availableTime || tutor.availableTime;
  tutor.bio = req.body.bio !== undefined ? req.body.bio : tutor.bio;

  const updatedTutor = await tutor.save();

  // Also sync name/phone on User model if updated
  if (user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    await user.save();
  }

  const tObj = updatedTutor.toObject();
  tObj.profileCompletion = calculateProfileCompletion(updatedTutor);

  res.json(tObj);
});

// @desc    Toggle Tutor Verification Status (Verified Badge)
// @route   PATCH /api/tutors/:id/verify
// @access  Private/Admin
export const toggleTutorVerification = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);

  if (tutor) {
    tutor.verified = !tutor.verified;
    const updated = await tutor.save();
    const tObj = updated.toObject();
    tObj.profileCompletion = calculateProfileCompletion(updated);
    res.json(tObj);
  } else {
    res.status(404);
    throw new Error('Tutor not found');
  }
});

// @desc    Toggle Tutor Account Status (Suspend / Activate)
// @route   PATCH /api/tutors/:id/status
// @access  Private/Admin
export const toggleTutorStatus = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor) {
    res.status(404);
    throw new Error('Tutor not found');
  }

  const user = await User.findById(tutor.userId);
  if (!user) {
    res.status(404);
    throw new Error('User account associated with tutor not found');
  }

  user.status = user.status === 'active' ? 'suspended' : 'active';
  await user.save();

  const updatedTutor = await Tutor.findById(tutor._id).populate('userId', 'role status createdAt');
  const tObj = updatedTutor.toObject();
  tObj.profileCompletion = calculateProfileCompletion(updatedTutor);

  res.json(tObj);
});
