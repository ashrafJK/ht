import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import {
  FaChalkboardTeacher,
  FaUserCheck,
  FaPhoneAlt,
  FaEnvelope,
  FaBookOpen,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
  FaInfoCircle,
} from 'react-icons/fa';
import { bangladeshDivisions } from '../data/locationData';

const PostTuition = () => {
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');

  const [formData, setFormData] = useState({
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    className: 'Class 1',
    subject: '',
    location: 'Dhaka, Dhaka',
    area: '',
    salary: '8000',
    tutorGenderPreference: 'Any',
    studentGender: 'Any',
    tuitionType: 'Home Tuition',
    daysPerWeek: '3 Days/Week',
    preferredTime: '5:00 PM',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [createdTuition, setCreatedTuition] = useState(null);

  const currentDistricts =
    bangladeshDivisions.find((d) => d.division === selectedDivision)?.districts || [];

  const handleDivisionChange = (e) => {
    const divName = e.target.value;
    setSelectedDivision(divName);
    const divObj = bangladeshDivisions.find((d) => d.division === divName);
    const defaultDist = divObj && divObj.districts.length > 0 ? divObj.districts[0] : '';
    setSelectedDistrict(defaultDist);
    setFormData((prev) => ({ ...prev, location: `${defaultDist}, ${divName}` }));
  };

  const handleDistrictChange = (e) => {
    const distName = e.target.value;
    setSelectedDistrict(distName);
    setFormData((prev) => ({ ...prev, location: `${distName}, ${selectedDivision}` }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.guardianPhone) {
      toast.error('Please enter your phone number so tutors can contact you');
      return;
    }
    if (!formData.subject) {
      toast.error('Please specify the subject(s)');
      return;
    }
    if (!formData.location) {
      toast.error('Please enter the location');
      return;
    }
    if (!formData.salary) {
      toast.error('Please specify expected salary');
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await API.post('/tuitions/request', formData);
      if (data.success) {
        setCreatedTuition(data.tuition);
        toast.success('Tuition request posted successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to post tuition request');
    } finally {
      setSubmitting(false);
    }
  };

  const classOptions = [
    'Play',
    'Pre-Schooling',
    'Nursery',
    'KG',
    'KG 1',
    'KG 2',
    'Standard 1',
    'Standard 2',
    'Standard 3',
    'Standard 4',
    'Standard 5',
    'Standard 6',
    'Standard 7',
    'Standard 8',
    'Standard 9',
    'Standard 10',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'O Level',
    'A Level (AS)',
    'A Level (A2)',
    'HSC / Class 11-12',
    'Admission Test',
    'IELTS / English Spoken',
  ];

  const tuitionTypes = ['Home Tuition', 'Online Tuition', 'Group Tuition'];

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-primary-900 to-navy-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-primary-500/20 text-primary-300 border border-primary-400/30">
            <FaChalkboardTeacher /> Free Tutor Request
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Need a Quality Tutor? <span className="text-primary-400">Post Your Requirement</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Fill out the simple form below. Thousands of verified English Medium & NCTB tutors from BUET, DU, NSU, DMC, BRAC will review your post and reach out to you directly!
          </p>
        </div>
      </div>

      {/* Success Modal / Card after posting */}
      {createdTuition ? (
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-soft text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto">
            <FaCheckCircle />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-navy-900">
              Tuition Request Posted Successfully!
            </h2>
            <p className="text-slate-600 text-sm">
              Your Tuition ID is <strong className="text-primary-600 font-extrabold text-base">{createdTuition.tuitionId}</strong>.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our verified tutors are being notified. You can view your live tuition post on the Tuitions listing page.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-2 text-xs text-slate-700">
            <p><strong>Title:</strong> {createdTuition.title}</p>
            <p><strong>Class:</strong> {createdTuition.className} | <strong>Subject:</strong> {createdTuition.subject}</p>
            <p><strong>Location:</strong> {createdTuition.location} {createdTuition.area ? `(${createdTuition.area})` : ''}</p>
            <p><strong>Salary:</strong> ৳{createdTuition.salary}/month</p>
            <p><strong>Contact Phone:</strong> {createdTuition.guardianPhone}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/tuitions"
              className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all"
            >
              View All Tuitions List
            </Link>
            <button
              onClick={() => {
                setCreatedTuition(null);
                setFormData({
                  guardianName: '',
                  guardianPhone: '',
                  guardianEmail: '',
                  className: 'Class 9-10',
                  subject: '',
                  location: '',
                  area: '',
                  salary: '8000',
                  tutorGenderPreference: 'Any',
                  studentGender: 'Any',
                  tuitionType: 'Home Tuition',
                  daysPerWeek: '3 Days/Week',
                  preferredTime: '5:00 PM',
                  description: '',
                });
              }}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-sm transition-all"
            >
              Post Another Requirement
            </button>
          </div>
        </div>
      ) : (
        /* Main Request Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-8">
          {/* Step 1: Guardian / Student Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FaUserCheck className="text-primary-600" /> 1. Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Guardian / Contact Person Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  placeholder="e.g. Mr. Al-Amin Chowdhury"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    name="guardianPhone"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="email"
                    name="guardianEmail"
                    placeholder="guardian@example.com"
                    value={formData.guardianEmail}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Tuition Details */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FaBookOpen className="text-indigo-600" /> 2. Tuition Requirements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Class / Grade *
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subjects *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Physics, Chemistry, Higher Math"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Division *
                </label>
                <select
                  value={selectedDivision}
                  onChange={handleDivisionChange}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {bangladeshDivisions.map((d) => (
                    <option key={d.division} value={d.division}>
                      {d.division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  District *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3.5 top-3 text-rose-500 text-xs" />
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    {currentDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Area / Road / Thana
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. Dhanmondi Road 27, Uttara Sector 4, Zindabazar, Halishahar..."
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Budget / Salary (৳) *
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3.5 top-3 text-emerald-600 text-xs" />
                  <input
                    type="text"
                    name="salary"
                    required
                    placeholder="e.g. 8000, 10000 or Negotiable"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tuition Type
                </label>
                <select
                  name="tuitionType"
                  value={formData.tuitionType}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {tuitionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tutor Gender Preference
                </label>
                <select
                  name="tutorGenderPreference"
                  value={formData.tutorGenderPreference}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="Any">Any Gender</option>
                  <option value="Male">Male Tutor</option>
                  <option value="Female">Female Tutor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Days Per Week
                </label>
                <select
                  name="daysPerWeek"
                  value={formData.daysPerWeek}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="2 Days/Week">2 Days / Week</option>
                  <option value="3 Days/Week">3 Days / Week</option>
                  <option value="4 Days/Week">4 Days / Week</option>
                  <option value="5 Days/Week">5 Days / Week</option>
                  <option value="6 Days/Week">6 Days / Week</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Notes / Requirements
                </label>
                <textarea
                  rows="3"
                  name="description"
                  placeholder="e.g. BUET or DU student preferred. Student needs extra attention in Math."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-extrabold text-base shadow-lg shadow-primary-600/30 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            {submitting ? 'Submitting Request...' : 'Submit Tuition Request'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PostTuition;
