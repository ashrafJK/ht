import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { FaBookOpen, FaPlusCircle, FaArrowLeft } from 'react-icons/fa';

const AdminCreateTuition = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    className: 'HSC',
    subject: 'Physics',
    studentGender: 'Male',
    numberOfStudents: 1,
    location: 'Dhanmondi',
    area: '',
    daysPerWeek: '3 Days/Week',
    preferredTime: '7:00 PM',
    salary: '8000',
    tutorGenderPreference: 'Any',
    tuitionType: 'Home Tuition',
    requirements: 'Previous teaching experience preferred',
    description: '',
    applicationDeadline: '',
    featured: false,
    status: 'active',
    tuitionId: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await API.post('/tuitions', formData);
      toast.success('Tuition post created successfully!');
      navigate('/admin/tuitions');
    } catch (err) {
      toast.error(err.message || 'Failed to create tuition');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/admin/tuitions')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-navy-900"
      >
        <FaArrowLeft /> Back to Tuition List
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-bold text-navy-900">Create New Tuition Post</h1>
            <p className="text-xs text-slate-500">Fill in student requirements and tuition specifications</p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
            Tuition ID Auto-Generated
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Tuition Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. HSC Chemistry Tutor Required for English Version Student"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
              <input
                type="text"
                name="className"
                required
                placeholder="e.g. HSC, Class 9-10, O-Level"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Dhanmondi, Mirpur, Uttara"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Area</label>
              <input
                type="text"
                name="area"
                placeholder="e.g. Road 27, Dhanmondi"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salary (৳/month) *</label>
              <input
                type="text"
                name="salary"
                required
                placeholder="e.g. 8000 or Five Thousand"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Days Per Week *</label>
              <input
                type="text"
                name="daysPerWeek"
                required
                placeholder="e.g. 3 Days/Week"
                value={formData.daysPerWeek}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time *</label>
              <input
                type="text"
                name="preferredTime"
                required
                placeholder="e.g. 7:00 PM"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tutor Gender Preference</label>
              <select
                name="tutorGenderPreference"
                value={formData.tutorGenderPreference}
                onChange={handleChange}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="Any">Any</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tuition Type</label>
              <select
                name="tuitionType"
                value={formData.tuitionType}
                onChange={handleChange}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="Home Tuition">Home Tuition</option>
                <option value="Online Tuition">Online Tuition</option>
                <option value="Group Tuition">Group Tuition</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Requirements</label>
              <textarea
                rows="3"
                name="requirements"
                placeholder="e.g. BUET or DU Science student preferred. Punctual and responsible."
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Notes</label>
              <textarea
                rows="4"
                name="description"
                placeholder="Detailed description about the student, curriculum, and expectations..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <label htmlFor="featured" className="text-xs font-bold text-slate-800">
                Mark as ⭐ Featured Tuition Post
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/tuitions')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md"
            >
              {submitting ? 'Publishing Post...' : 'Publish Tuition Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateTuition;
