import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Tutor from '../models/Tutor.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new Tutor
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    gender,
    university,
    department,
    degree,
    passingYear,
    experience,
    subjects,
    preferredLocations,
    expectedSalary,
  } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error('Please fill in all required user fields (name, email, phone, password)');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Create User (Role: tutor)
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: 'tutor',
    status: 'active',
  });

  if (user) {
    // Parse subjects & locations if sent as comma-separated or arrays
    const formattedSubjects = Array.isArray(subjects)
      ? subjects
      : subjects
      ? subjects.split(',').map((s) => s.trim())
      : [];

    const formattedLocations = Array.isArray(preferredLocations)
      ? preferredLocations
      : preferredLocations
      ? preferredLocations.split(',').map((l) => l.trim())
      : [];

    // Create associated Tutor Profile
    const tutor = await Tutor.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: gender || 'Male',
      university: university || 'Not Specified',
      department: department || 'Not Specified',
      degree: degree || 'B.Sc / Honours',
      passingYear: passingYear || '',
      experience: experience || '1 Year',
      subjects: formattedSubjects,
      preferredLocations: formattedLocations,
      expectedSalary: expectedSalary ? Number(expectedSalary) : 5000,
      verified: false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
      tutorProfile: tutor,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.status === 'suspended') {
      res.status(403);
      throw new Error('Your account has been suspended. Please contact support.');
    }

    let tutorProfile = null;
    if (user.role === 'tutor') {
      tutorProfile = await Tutor.findOne({ userId: user._id });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
      tutorProfile,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  let tutorProfile = null;
  if (user.role === 'tutor') {
    tutorProfile = await Tutor.findOne({ userId: user._id });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    tutorProfile,
  });
});
