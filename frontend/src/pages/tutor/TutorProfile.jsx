import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBook,
  FaCheckCircle,
  FaCamera,
  FaShieldAlt,
} from 'react-icons/fa';

const TutorProfile = () => {
  const { tutorProfile, updateTutorProfileState } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    phone: '',
    email: '',
    gender: 'Male',
    university: '',
    department: '',
    degree: '',
    passingYear: '',
    experience: '',
    subjects: '',
    classes: '',
    preferredLocations: '',
    expectedSalary: '',
    availableDays: '',
    availableTime: '',
    bio: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tutorProfile) {
      setFormData({
        name: tutorProfile.name || '',
        photo: tutorProfile.photo || '',
        phone: tutorProfile.phone || '',
        email: tutorProfile.email || '',
        gender: tutorProfile.gender || 'Male',
        university: tutorProfile.university || '',
        department: tutorProfile.department || '',
        degree: tutorProfile.degree || '',
        passingYear: tutorProfile.passingYear || '',
        experience: tutorProfile.experience || '',
        subjects: Array.isArray(tutorProfile.subjects)
          ? tutorProfile.subjects.join(', ')
          : tutorProfile.subjects || '',
        classes: Array.isArray(tutorProfile.classes)
          ? tutorProfile.classes.join(', ')
          : tutorProfile.classes || '',
        preferredLocations: Array.isArray(tutorProfile.preferredLocations)
          ? tutorProfile.preferredLocations.join(', ')
          : tutorProfile.preferredLocations || '',
        expectedSalary: tutorProfile.expectedSalary || '',
        availableDays: tutorProfile.availableDays || '',
        availableTime: tutorProfile.availableTime || '',
        bio: tutorProfile.bio || '',
      });
    }
  }, [tutorProfile]);

  const completionPercentage = tutorProfile?.profileCompletion || 85;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
        toast.success('Photo updated! Click Save Profile Changes to save.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data } = await API.put('/tutors/profile', formData);
      updateTutorProfileState(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Header Card with Completion Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            {formData.photo ? (
              <img
                src={formData.photo}
                alt={formData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary-500 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-4xl border-4 border-slate-200">
                <FaUser />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full text-xs shadow-md cursor-pointer transition-transform hover:scale-110" title="Upload New Profile Photo">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {tutorProfile?.verified && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full text-xs shadow" title="Verified Tutor">
                <FaCheckCircle />
              </span>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-navy-900">{formData.name}</h1>
              {tutorProfile?.verified ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-flex items-center gap-1 border border-emerald-200">
                  <FaCheckCircle /> Verified Tutor
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  Unverified
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {formData.university} — {formData.department}
            </p>

            {/* Profile Completion Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-slate-600">Profile Completion</span>
                <span className="text-primary-600 font-extrabold">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-primary-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-8">
        {/* Section 1: Personal Information */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FaUser className="text-primary-600" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Profile Photo URL</label>
              <input
                type="url"
                name="photo"
                placeholder="https://example.com/photo.jpg"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                disabled
                value={formData.email}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Information */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FaUniversity className="text-emerald-600" /> Academic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / Institute</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                placeholder="e.g. B.Sc in CSE"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Passing Year / Graduation</label>
              <input
                type="text"
                name="passingYear"
                placeholder="e.g. 2025"
                value={formData.passingYear}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Teaching Preferences */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FaBook className="text-amber-500" /> Teaching Preferences & Availability
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teaching Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 3 Years"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Salary (৳/month)</label>
              <input
                type="number"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Subjects (comma-separated)</label>
              <input
                type="text"
                name="subjects"
                placeholder="Mathematics, Physics, Chemistry, English"
                value={formData.subjects}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Classes (comma-separated)</label>
              <input
                type="text"
                name="classes"
                placeholder="HSC, Class 9-10, Admission Test"
                value={formData.classes}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Locations (comma-separated)</label>
              <input
                type="text"
                name="preferredLocations"
                placeholder="Dhanmondi, Mirpur, Uttara, Online"
                value={formData.preferredLocations}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Available Days / Week</label>
              <input
                type="text"
                name="availableDays"
                placeholder="e.g. 3-4 Days/Week"
                value={formData.availableDays}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Available Time</label>
              <input
                type="text"
                name="availableTime"
                placeholder="e.g. 5:00 PM - 9:00 PM"
                value={formData.availableTime}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio / Overview</label>
              <textarea
                rows="4"
                name="bio"
                placeholder="Share your teaching style, achievements, and past student success stories..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {saving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorProfile;
