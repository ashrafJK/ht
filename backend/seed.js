import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Tutor from './models/Tutor.js';
import Tuition from './models/Tuition.js';
import Application from './models/Application.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany();
    await Tutor.deleteMany();
    await Tuition.deleteMany();
    await Application.deleteMany();

    console.log('Seeding Admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hometutorbd.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const adminUser = await User.create({
      name: 'System Admin',
      email: adminEmail,
      phone: '01700000000',
      password: adminPassword,
      role: 'admin',
      status: 'active',
    });

    console.log(`Admin user created: ${adminEmail} (password: ${adminPassword})`);

    // Create sample Tutors
    console.log('Seeding sample tutors...');
    const tutor1User = await User.create({
      name: 'Tanvir Ahmed',
      email: 'tanvir@gmail.com',
      phone: '01812345678',
      password: 'password123',
      role: 'tutor',
      status: 'active',
    });

    const tutor1 = await Tutor.create({
      userId: tutor1User._id,
      name: tutor1User.name,
      email: tutor1User.email,
      phone: tutor1User.phone,
      gender: 'Male',
      university: 'BUET (Bangladesh University of Engineering and Technology)',
      department: 'Computer Science & Engineering',
      degree: 'B.Sc in CSE',
      passingYear: '2024',
      experience: '3 Years',
      subjects: ['Mathematics', 'Physics', 'ICT', 'Chemistry'],
      classes: ['Class 9-10', 'HSC', 'Admission Test'],
      preferredLocations: ['Dhanmondi', 'Mirpur', 'Mohammadpur', 'Uttara'],
      expectedSalary: 10000,
      availableDays: '3-4 Days/Week',
      availableTime: '6:00 PM - 9:00 PM',
      bio: 'Experienced engineering student with a track record of guiding HSC and Admission candidates to top universities.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      verified: true,
    });

    const tutor2User = await User.create({
      name: 'Nusrat Jahan',
      email: 'nusrat@gmail.com',
      phone: '01798765432',
      password: 'password123',
      role: 'tutor',
      status: 'active',
    });

    const tutor2 = await Tutor.create({
      userId: tutor2User._id,
      name: tutor2User.name,
      email: tutor2User.email,
      phone: tutor2User.phone,
      gender: 'Female',
      university: 'University of Dhaka (DU)',
      department: 'English Literature',
      degree: 'B.A. (Honours)',
      passingYear: '2025',
      experience: '2 Years',
      subjects: ['English', 'Bangla', 'General Science'],
      classes: ['Class 6-8', 'Class 9-10', 'O-Level'],
      preferredLocations: ['Dhanmondi', 'Banasree', 'Khilgaon', 'Rampura'],
      expectedSalary: 8000,
      availableDays: '3 Days/Week',
      availableTime: '4:00 PM - 7:00 PM',
      bio: 'Passionate English language teacher specializing in grammar, composition, and English medium curriculum.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      verified: true,
    });

    const tutor3User = await User.create({
      name: 'Arafat Rahman',
      email: 'arafat@gmail.com',
      phone: '01655443322',
      password: 'password123',
      role: 'tutor',
      status: 'active',
    });

    const tutor3 = await Tutor.create({
      userId: tutor3User._id,
      name: tutor3User.name,
      email: tutor3User.email,
      phone: tutor3User.phone,
      gender: 'Male',
      university: 'Dhaka Medical College (DMC)',
      department: 'MBBS',
      degree: 'MBBS (3rd Year)',
      passingYear: '2026',
      experience: '4 Years',
      subjects: ['Biology', 'Chemistry', 'Physics'],
      classes: ['HSC', 'Medical Admission', 'Class 9-10'],
      preferredLocations: ['Bakshibazar', 'Motijheel', 'Dhanmondi', 'Gulshan'],
      expectedSalary: 12000,
      availableDays: '4 Days/Week',
      availableTime: '7:00 PM - 9:00 PM',
      bio: 'Medical student with in-depth biological sciences expertise. Helped 15+ students crack medical college entrance exams.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      verified: false,
    });

    // Create Sample Tuitions
    console.log('Seeding sample tuitions...');
    const tuitionsData = [
      {
        tuitionId: 'HT-1025',
        title: 'HSC Chemistry Tutor Required for English Version Student',
        className: 'HSC',
        subject: 'Chemistry',
        studentGender: 'Male',
        numberOfStudents: 1,
        location: 'Dhanmondi',
        area: 'Road 27, Dhanmondi, Dhaka',
        daysPerWeek: '3 Days/Week',
        preferredTime: '7:00 PM',
        salary: 8000,
        tutorGenderPreference: 'Any',
        tuitionType: 'Home Tuition',
        description: 'Looking for a skilled tutor to guide a 2nd year HSC student in Chemistry 1st & 2nd paper for English Version curriculum.',
        requirements: 'BUET or DU Science student preferred. Must have prior HSC teaching experience.',
        featured: true,
        status: 'active',
      },
      {
        tuitionId: 'HT-1026',
        title: 'Class 9 Higher Math & Physics Female Tutor Needed',
        className: 'Class 9-10',
        subject: 'Mathematics',
        studentGender: 'Female',
        numberOfStudents: 1,
        location: 'Uttara',
        area: 'Sector 4, Uttara',
        daysPerWeek: '4 Days/Week',
        preferredTime: '5:30 PM',
        salary: 10000,
        tutorGenderPreference: 'Female',
        tuitionType: 'Home Tuition',
        description: 'Need a female tutor for a Class 9 Bangla Medium student for Higher Mathematics and Physics.',
        requirements: 'Punctual, friendly female tutor from BUET, DU, or NSU.',
        featured: true,
        status: 'active',
      },
      {
        tuitionId: 'HT-1027',
        title: 'HSC ICT & Physics Tutor for Admission Preparation',
        className: 'HSC',
        subject: 'ICT',
        studentGender: 'Male',
        numberOfStudents: 1,
        location: 'Mirpur',
        area: 'Mirpur 10, Near Stadium',
        daysPerWeek: '3 Days/Week',
        preferredTime: '6:30 PM',
        salary: 7500,
        tutorGenderPreference: 'Male',
        tuitionType: 'Home Tuition',
        description: 'HSC 2026 candidate needs intensive support in ICT coding & logic design plus Physics numerical problems.',
        requirements: 'Engineering undergrad background preferred.',
        featured: true,
        status: 'active',
      },
      {
        tuitionId: 'HT-1028',
        title: 'O-Level English & Chemistry Home Tutor',
        className: 'O-Level',
        subject: 'English',
        studentGender: 'Female',
        numberOfStudents: 1,
        location: 'Gulshan',
        area: 'Gulshan 2, Dhaka',
        daysPerWeek: '3 Days/Week',
        preferredTime: '4:00 PM',
        salary: 12000,
        tutorGenderPreference: 'Any',
        tuitionType: 'Home Tuition',
        description: 'Edexcel O-Level English Language & Chemistry preparation for upcoming May/June exams.',
        requirements: 'Strong command over English medium curriculum and past papers practice.',
        featured: true,
        status: 'active',
      },
      {
        tuitionId: 'HT-1029',
        title: 'Class 8 All Subjects General Tutor Needed',
        className: 'Class 6-8',
        subject: 'General Science',
        studentGender: 'Male',
        numberOfStudents: 1,
        location: 'Banasree',
        area: 'Block C, Banasree',
        daysPerWeek: '5 Days/Week',
        preferredTime: '6:00 PM',
        salary: 9000,
        tutorGenderPreference: 'Any',
        tuitionType: 'Home Tuition',
        description: 'Responsible tutor required to oversee daily homework, Math, Science, and English for Class 8.',
        requirements: 'University student with patient teaching attitude.',
        featured: false,
        status: 'active',
      },
      {
        tuitionId: 'HT-1030',
        title: 'Medical Admission Biology & Organic Chemistry Specialist',
        className: 'Admission Test',
        subject: 'Biology',
        studentGender: 'Female',
        numberOfStudents: 2,
        location: 'Mohammadpur',
        area: 'Japan Garden City, Mohammadpur',
        daysPerWeek: '4 Days/Week',
        preferredTime: '7:30 PM',
        salary: 15000,
        tutorGenderPreference: 'Female',
        tuitionType: 'Home Tuition',
        description: 'Group of 2 HSC passed students preparing for Medical Admission Test.',
        requirements: 'DMC or SSMC medical student preferred.',
        featured: true,
        status: 'active',
      },
      {
        tuitionId: 'HT-1031',
        title: 'Online HSC Higher Math Crash Course',
        className: 'HSC',
        subject: 'Mathematics',
        studentGender: 'Any',
        numberOfStudents: 1,
        location: 'Online',
        area: 'Zoom / Google Meet',
        daysPerWeek: '3 Days/Week',
        preferredTime: '8:00 PM',
        salary: 6000,
        tutorGenderPreference: 'Any',
        tuitionType: 'Online Tuition',
        description: 'Online classes for HSC Higher Math calculus and vector algebra modules.',
        requirements: 'Digital pen tablet & high speed internet connection required.',
        featured: false,
        status: 'active',
      },
    ];

    const createdTuitions = await Tuition.insertMany(tuitionsData);

    // Create Sample Applications
    console.log('Seeding sample applications...');
    await Application.create([
      {
        tutorId: tutor1._id,
        tuitionId: createdTuitions[0]._id, // HT-1025
        coverMessage: 'I am a BUET CSE student with 3 years of Chemistry tutoring experience for HSC candidates.',
        status: 'approved',
      },
      {
        tutorId: tutor2._id,
        tuitionId: createdTuitions[1]._id, // HT-1026
        coverMessage: 'I live in Uttara Sector 4 and have taught Class 9 Science subjects for 2 years.',
        status: 'pending',
      },
      {
        tutorId: tutor3._id,
        tuitionId: createdTuitions[5]._id, // HT-1030
        coverMessage: 'I am a DMC medical student. I have guided 15+ students for medical entrance exams.',
        status: 'pending',
      },
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
