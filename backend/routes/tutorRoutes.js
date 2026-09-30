import express from 'express';
import {
  getTutors,
  getTutorById,
  updateTutorProfile,
  toggleTutorVerification,
  toggleTutorStatus,
} from '../controllers/tutorController.js';
import { protect, adminOnly, tutorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTutors);
router.put('/profile', protect, tutorOnly, updateTutorProfile);
router.get('/:id', getTutorById);
router.patch('/:id/verify', protect, adminOnly, toggleTutorVerification);
router.patch('/:id/status', protect, adminOnly, toggleTutorStatus);

export default router;
