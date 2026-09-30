import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const testUri = 'mongodb+srv://hometutorallbd_db_user:english654321@cluster0.i0w24ru.mongodb.net/hometutorbd?retryWrites=true&w=majority';

console.log('Testing connection to MongoDB Atlas with new password english654321...');

try {
  const conn = await mongoose.connect(testUri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log('🎉 SUCCESS! Connected to MongoDB Atlas host:', conn.connection.host);
  process.exit(0);
} catch (err) {
  console.error('FAILED! Connection error:', err.message);
  process.exit(1);
}
