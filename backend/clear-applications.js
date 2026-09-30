import mongoose from 'mongoose';
import dns from 'dns';
import Application from './models/Application.js';
import dotenv from 'dotenv';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hometutorallbd_db_user:english654321@cluster0.i0w24ru.mongodb.net/hometutorbd?retryWrites=true&w=majority';

const clearApplications = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas!');
    const result = await Application.deleteMany({});
    console.log(`🎉 SUCCESS! Deleted ${result.deletedCount} applications permanently from MongoDB Atlas!`);
    process.exit(0);
  } catch (error) {
    console.error('Error clearing applications:', error.message);
    process.exit(1);
  }
};

clearApplications();
