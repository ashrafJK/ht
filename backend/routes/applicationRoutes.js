import express from 'express';
import {
  applyForTuition,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';
import { protect, adminOnly, tutorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, tutorOnly, applyForTuition)
  .get(protect, adminOnly, getAllApplications);

router.get('/my', protect, tutorOnly, getMyApplications);
router
  .route('/:id')
  .delete(protect, adminOnly, deleteApplication);
router.patch('/:id/status', protect, adminOnly, updateApplicationStatus);

export default router;
