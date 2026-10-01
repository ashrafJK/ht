import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { bangladeshDivisions } from '../../data/locationData';

const AdminEditTuition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('Dhaka');

  const [formData, setFormData] = useState({
    title: '',
    className: '',
    subject: '',
    studentGender: 'Any',
    numberOfStudents: 1,
    location: '',
    area: '',
    daysPerWeek: '',
    preferredTime: '',
    salary: '',
    tutorGenderPreference: 'Any',
    tuitionType: 'Home Tuition',
    requirements: '',
    description: '',
    featured: false,
    status: 'active',
    tuitionId: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const currentDistricts =
    bangladeshDivisions.find((d) => d.division === selectedDivision)?.districts || [];

  const handleDivisionChange = (e) => {
    const divName = e.target.value;
    setSelectedDivision(divName);
    const divObj = bangladeshDivisions.find((d) => d.division === divName);
    const defaultDist = divObj && divObj.districts.length > 0 ? divObj.districts[0] : '';
    setSelectedDistrict(defaultDist);
    setFormData((prev) => ({ ...prev, location: defaultDist }));
  };

  const handleDistrictChange = (e) => {
    const distName = e.target.value;
    setSelectedDistrict(distName);
    setFormData((prev) => ({ ...prev, location: distName }));
  };

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/tuitions/${id}`);
        setFormData({
          title: data.title || '',
          className: data.className || '',
          subject: data.subject || '',
          studentGender: data.studentGender || 'Any',
          numberOfStudents: data.numberOfStudents || 1,
          location: data.location || '',
          area: data.area || '',
          daysPerWeek: data.daysPerWeek || '',
          preferredTime: data.preferredTime || '',
          salary: data.salary || '',
          tutorGenderPreference: data.tutorGenderPreference || 'Any',
          tuitionType: data.tuitionType || 'Home Tuition',
          requirements: data.requirements || '',
          description: data.description || '',
          featured: data.featured || false,
          status: data.status || 'active',
          tuitionId: data.tuitionId || '',
        });
      } catch (err) {
        toast.error('Tuition post not found');
        navigate('/admin/tuitions');
      } finally {
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id, navigate]);

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

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await API.put(`/tuitions/${id}`, formData);
      toast.success('Tuition updated successfully!');
      navigate('/admin/tuitions');
    } catch (err) {
      toast.error(err.message || 'Failed to update tuition');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading tuition details...</div>;
  }

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
            <h1 className="text-xl font-bold text-navy-900">Edit Tuition Post ({formData.tuitionId})</h1>
            <p className="text-xs text-slate-500">Update parameters for this tuition listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Tuition Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
              <select
                name="className"
                required
                value={formData.className}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="">Select Class / Grade</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Division (বিভাগ) *</label>
              <select
                value={selectedDivision}
                onChange={handleDivisionChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {bangladeshDivisions.map((d) => (
                  <option key={d.division} value={d.division}>
                    {d.division} ({d.bnName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">District (জেলা) *</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {currentDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Area / Thana (বিস্তারিত এলাকা/থানা/রোড)</label>
              <input
                type="text"
                name="area"
                placeholder="e.g. Dhanmondi Road 27, Uttara Sector 4, Zindabazar..."
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
              {submitting ? 'Saving Changes...' : 'Save Tuition Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditTuition;
