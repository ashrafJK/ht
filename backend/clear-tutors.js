import mongoose from 'mongoose';
import dns from 'dns';
import Tutor from './models/Tutor.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hometutorallbd_db_user:english654321@cluster0.i0w24ru.mongodb.net/hometutorbd?retryWrites=true&w=majority';

const clearTutors = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas!');

    // Delete all tutor profiles
    const tutorResult = await Tutor.deleteMany({});
    console.log(`🎉 SUCCESS! Deleted ${tutorResult.deletedCount} tutor profiles permanently from MongoDB Atlas!`);

    // Delete all non-admin user accounts
    const userResult = await User.deleteMany({ role: { $ne: 'admin' } });
    console.log(`🎉 SUCCESS! Deleted ${userResult.deletedCount} non-admin tutor user accounts permanently from MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error('Error clearing tutors:', error.message);
    process.exit(1);
  }
};

clearTutors();
