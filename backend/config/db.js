import mongoose from 'mongoose';

// Global cache for serverless environment across warm lambdas
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hometutorbd';

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering so operations fail fast if DB is disconnected
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    console.log('Connecting to MongoDB Atlas...');
    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log(`MongoDB Connected: ${m.connection.host}`);
      return m;
    }).catch((err) => {
      console.error('MongoDB Connection Error:', err.message);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;

