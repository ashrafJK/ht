import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import User from './models/User.js';

import authRoutes from './routes/authRoutes.js';
import tuitionRoutes from './routes/tuitionRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure DB connection middleware for serverless environment
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      message: `Database Connection Failed: ${err.message}`,
      error: err.message,
    });
  }
});


// Helper to ensure Admin user exists in DB
export const ensureAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hometutorbd.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        phone: '01700000000',
        password: adminPassword,
        role: 'admin',
        status: 'active',
      });
      console.log(`Auto-seeded Admin User: ${adminEmail} (password: ${adminPassword})`);
    }
  } catch (err) {
    console.error(`Error ensuring admin user: ${err.message}`);
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Home Tutor BD API Server is running smoothly' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tuitions', tuitionRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    await ensureAdminUser();
  });
}

export default app;
