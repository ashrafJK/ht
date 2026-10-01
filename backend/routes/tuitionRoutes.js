import express from 'express';
import {
  getTuitions,
  getTuitionById,
  createTuition,
  postTuitionRequest,
  updateTuition,
  deleteTuition,
  updateTuitionStatus,
  toggleTuitionFeatured,
} from '../controllers/tuitionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', postTuitionRequest);

router
  .route('/')
  .get(getTuitions)
  .post(protect, adminOnly, createTuition);

router
  .route('/:id')
  .get(getTuitionById)
  .put(protect, adminOnly, updateTuition)
  .delete(protect, adminOnly, deleteTuition);

router.patch('/:id/status', protect, adminOnly, updateTuitionStatus);
router.patch('/:id/featured', protect, adminOnly, toggleTuitionFeatured);

export default router;
