import asyncHandler from 'express-async-handler';
import Application from '../models/Application.js';
import Tutor from '../models/Tutor.js';
import Tuition from '../models/Tuition.js';

// @desc    Apply for a tuition
// @route   POST /api/applications
// @access  Private/Tutor
export const applyForTuition = asyncHandler(async (req, res) => {
  const { tuitionId, coverMessage } = req.body;

  if (!tuitionId) {
    res.status(400);
    throw new Error('Tuition ID is required to apply');
  }

  // Find tutor profile associated with user
  const tutor = await Tutor.findOne({ userId: req.user._id });
  if (!tutor) {
    res.status(404);
    throw new Error('Tutor profile not found. Please complete registration.');
  }

  // Check if tuition exists
  const tuition = await Tuition.findById(tuitionId);
  if (!tuition) {
    res.status(404);
    throw new Error('Tuition post not found');
  }

  if (tuition.status === 'closed') {
    res.status(400);
    throw new Error('This tuition post is closed for applications');
  }

  // Prevent duplicate application
  const existingApp = await Application.findOne({
    tutorId: tutor._id,
    tuitionId: tuition._id,
  });

  if (existingApp) {
    res.status(400);
    throw new Error('Application already submitted for this tuition');
  }

  const application = await Application.create({
    tutorId: tutor._id,
    tuitionId: tuition._id,
    coverMessage: coverMessage || '',
    status: 'pending',
    appliedAt: new Date(),
  });

  const populatedApp = await Application.findById(application._id)
    .populate('tuitionId')
    .populate('tutorId');

  res.status(201).json(populatedApp);
});

// @desc    Get tutor's own applications
// @route   GET /api/applications/my
// @access  Private/Tutor
export const getMyApplications = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findOne({ userId: req.user._id });

  if (!tutor) {
    return res.json([]);
  }

  const applications = await Application.find({ tutorId: tutor._id })
    .populate('tuitionId')
    .sort({ appliedAt: -1 });

  res.json(applications);
});

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Private/Admin
export const getAllApplications = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  const applications = await Application.find(query)
    .populate({
      path: 'tutorId',
      select: 'name photo phone email university department degree experience verified gender',
    })
    .populate({
      path: 'tuitionId',
      select: 'tuitionId title className subject location area salary status',
    })
    .sort({ appliedAt: -1 });

  // Optional search filtering in memory if needed
  let filtered = applications;
  if (search) {
    const regex = new RegExp(search, 'i');
    filtered = applications.filter((app) => {
      const tutorName = app.tutorId?.name || '';
      const tutorUni = app.tutorId?.university || '';
      const tuitionTitle = app.tuitionId?.title || '';
      const tuitionCode = app.tuitionId?.tuitionId || '';
      return (
        regex.test(tutorName) ||
        regex.test(tutorUni) ||
        regex.test(tuitionTitle) ||
        regex.test(tuitionCode)
      );
    });
  }

  res.json(filtered);
});

// @desc    Update application status (Approve / Reject)
// @route   PATCH /api/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid application status');
  }

  application.status = status;
  const updatedApp = await application.save();

  const populated = await Application.findById(updatedApp._id)
    .populate('tutorId')
    .populate('tuitionId');

  res.json(populated);
});

// @desc    Delete application permanently (Admin)
// @route   DELETE /api/applications/:id
// @access  Private/Admin
export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    await application.deleteOne();
    res.json({ message: 'Application deleted permanently' });
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});
