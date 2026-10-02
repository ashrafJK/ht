import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields (name, email, phone, message)');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully.',
    data: contact,
  });
});

// @desc    Get all contact messages for admin
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};

  if (status && ['unread', 'read', 'replied'].includes(status)) {
    filter.status = status;
  }

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });

  res.json(contacts);
});

// @desc    Update contact message status (unread / read / replied)
// @route   PATCH /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['unread', 'read', 'replied'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  contact.status = status;
  await contact.save();

  res.json(contact);
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  await contact.deleteOne();

  res.json({ message: 'Contact message deleted successfully' });
});
