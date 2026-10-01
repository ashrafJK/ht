import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaCamera,
} from 'react-icons/fa';
import { compressImageFile } from '../utils/imageCompressor';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    university: '',
    department: '',
    degree: 'B.Sc / Honours',
    passingYear: '',
    experience: '1-2 Years',
    subjects: 'Mathematics, Physics',
    preferredLocations: 'Dhanmondi, Mirpur',
    expectedSalary: '8000',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file);
        setFormData((prev) => ({ ...prev, photo: compressed }));
        toast.success('Profile photo selected & optimized!');
      } catch (err) {
        toast.error(err.message || 'Error processing photo');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setSubmitting(true);
      await register(formData);
      navigate('/tutor/dashboard');
    } catch (err) {
      // toast error handled in authContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-3xl mx-auto mb-3">
            <FaGraduationCap />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Create Your Tutor Account
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Join English Medium Tutor to start applying for verified home tuition opportunities across Bangladesh.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700 border-b border-slate-100 pb-2">
              1. Account Credentials
            </h3>

            {/* Profile Photo Upload Block */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
              <div className="relative group shrink-0">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-500 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-3xl border-2 border-slate-300">
                    <FaUser />
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-1 w-full">
                <label className="block text-xs font-bold text-slate-800">Profile Photo (Optional)</label>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95">
                    <FaCamera /> Choose Image File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.photo && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photo: '' })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  name="photo"
                  placeholder="Or paste image URL (https://...)"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tanvir@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (BD) *</label>
                <div className="relative">
                  <FaPhone className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="01700000000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700 border-b border-slate-100 pb-2">
              2. Academic Background
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">University / Institute *</label>
                <div className="relative">
                  <FaUniversity className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    name="university"
                    required
                    placeholder="e.g. BUET, DU, NSU, DMC"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department / Discipline *</label>
                <input
                  type="text"
                  name="department"
                  required
                  placeholder="e.g. CSE, Physics, English"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  name="degree"
                  placeholder="e.g. B.Sc in EEE"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Passing Year / Status</label>
                <input
                  type="text"
                  name="passingYear"
                  placeholder="e.g. 2025 (Running)"
                  value={formData.passingYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Teaching Preferences */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700 border-b border-slate-100 pb-2">
              3. Teaching Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 2 Years"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Monthly Salary (৳)</label>
                <input
                  type="number"
                  name="expectedSalary"
                  placeholder="8000"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Subjects (comma separated)</label>
                <input
                  type="text"
                  name="subjects"
                  placeholder="Mathematics, Physics, ICT, Chemistry"
                  value={formData.subjects}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Locations (comma separated)</label>
                <input
                  type="text"
                  name="preferredLocations"
                  placeholder="Dhanmondi, Mirpur, Uttara, Online"
                  value={formData.preferredLocations}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-base shadow-lg shadow-primary-600/30 transition-all active:scale-95"
          >
            {submitting ? 'Registering Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
          Already have a tutor account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:underline">
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
