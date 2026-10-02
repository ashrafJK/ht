import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to send a message
router.post('/', createContactMessage);

// Protected Admin routes
router.get('/', protect, adminOnly, getContactMessages);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

export default router;
