import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    tuitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tuition',
      required: true,
    },
    coverMessage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate application from same tutor for same tuition
applicationSchema.index({ tutorId: 1, tuitionId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
