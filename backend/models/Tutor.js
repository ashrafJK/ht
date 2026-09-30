import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male',
    },
    university: {
      type: String,
      required: [true, 'University is required'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    degree: {
      type: String,
      default: 'B.Sc / Honours',
    },
    passingYear: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '1 Year',
    },
    subjects: {
      type: [String],
      default: [],
    },
    classes: {
      type: [String],
      default: [],
    },
    preferredLocations: {
      type: [String],
      default: [],
    },
    expectedSalary: {
      type: Number,
      default: 5000,
    },
    availableDays: {
      type: String,
      default: '3 Days/Week',
    },
    availableTime: {
      type: String,
      default: 'Evening',
    },
    bio: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;
