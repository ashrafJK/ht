import mongoose from 'mongoose';
import dns from 'dns';
import Tuition from './models/Tuition.js';
import dotenv from 'dotenv';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hometutorallbd_db_user:english654321@cluster0.i0w24ru.mongodb.net/hometutorbd?retryWrites=true&w=majority';

const updateTuitionIds = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas!');

    const tuitions = await Tuition.find({ tuitionId: /^HT-/i });
    console.log(`Found ${tuitions.length} tuitions with HT- prefix...`);

    let count = 0;
    for (const t of tuitions) {
      const oldId = t.tuitionId;
      const newId = oldId.replace(/^HT-/i, 'EMT-');
      t.tuitionId = newId;
      await t.save();
      console.log(`Updated: ${oldId} ➔ ${newId}`);
      count++;
    }

    console.log(`🎉 SUCCESS! Updated ${count} tuition IDs to EMT- prefix in MongoDB Atlas!`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating tuition IDs:', error.message);
    process.exit(1);
  }
};

updateTuitionIds();
