import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows / ISP DNS SRV resolution error for MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hometutorbd'
    );
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

export default connectDB;
