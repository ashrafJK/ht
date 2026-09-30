import mongoose from 'mongoose';

const tuitionSchema = new mongoose.Schema(
  {
    tuitionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Tuition title is required'],
      trim: true,
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    studentGender: {
      type: String,
      enum: ['Male', 'Female', 'Any'],
      default: 'Any',
    },
    numberOfStudents: {
      type: Number,
      default: 1,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    area: {
      type: String,
      default: '',
      trim: true,
    },
    daysPerWeek: {
      type: String,
      required: [true, 'Days per week is required'],
      default: '3 Days/Week',
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      default: '7:00 PM',
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
    },
    tutorGenderPreference: {
      type: String,
      enum: ['Male', 'Female', 'Any'],
      default: 'Any',
    },
    tuitionType: {
      type: String,
      enum: ['Home Tuition', 'Online Tuition', 'Group Tuition'],
      default: 'Home Tuition',
    },
    description: {
      type: String,
      default: '',
    },
    requirements: {
      type: String,
      default: '',
    },
    applicationDeadline: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'closed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Tuition = mongoose.model('Tuition', tuitionSchema);
export default Tuition;
