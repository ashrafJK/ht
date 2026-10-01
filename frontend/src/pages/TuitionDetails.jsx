import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaGraduationCap,
  FaBook,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowLeft,
  FaStar,
  FaTimes,
  FaExclamationCircle,
} from 'react-icons/fa';

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isTutor, isAuthenticated } = useAuth();

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverMessage, setCoverMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/tuitions/${id}`);
        setTuition(data);
      } catch (err) {
        toast.error('Tuition details not found');
        navigate('/tuitions');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error('Please log in as a Tutor to apply for tuition');
      navigate('/login', { state: { from: `/tuitions/${id}` } });
      return;
    }
    if (!isTutor) {
      toast.error('Only registered tutors can apply for tuition posts');
      return;
    }
    setApplyModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await API.post('/applications', {
        tuitionId: tuition._id,
        coverMessage,
      });
      toast.success('Application submitted successfully!');
      setApplyModalOpen(false);
      setCoverMessage('');
    } catch (err) {
      toast.error(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading tuition details...</p>
      </div>
    );
  }

  if (!tuition) return null;

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <Link
        to="/tuitions"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors"
      >
        <FaArrowLeft /> Back to All Tuitions
      </Link>

      {/* Header Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 font-extrabold text-xs uppercase tracking-wider rounded-lg border border-primary-100">
              {tuition.tuitionType || 'Home Tuition'}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-mono font-bold text-xs rounded-lg">
              {tuition.tuitionId}
            </span>
          </div>

          {tuition.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 text-white shadow-sm">
              <FaStar className="text-yellow-200" /> Featured Tuition
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-tight">
          {tuition.title}
        </h1>

        {/* Salary Banner */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Offered Monthly Salary</span>
            <div className="text-3xl font-extrabold text-emerald-600">
              {!isNaN(Number(tuition.salary)) && String(tuition.salary).trim() !== ''
                ? `৳${Number(tuition.salary).toLocaleString('en-IN')}`
                : String(tuition.salary).startsWith('৳') ? tuition.salary : `৳${tuition.salary}`}{' '}
              <span className="text-xs font-medium text-slate-500">/ month</span>
            </div>
          </div>

          <button
            onClick={handleApplyClick}
            disabled={tuition.status === 'closed'}
            className={`px-8 py-3.5 rounded-xl font-bold text-base text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              tuition.status === 'closed'
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/30 active:scale-95'
            }`}
          >
            <FaPaperPlane /> {tuition.status === 'closed' ? 'Tuition Closed' : 'Apply for This Tuition'}
          </button>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Information */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FaGraduationCap className="text-primary-600" /> Student Information
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Class / Grade</span>
              <span className="font-bold text-navy-900">{tuition.className}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Subject(s)</span>
              <span className="font-bold text-navy-900">{tuition.subject}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Number of Students</span>
              <span className="font-bold text-navy-900">{tuition.numberOfStudents || 1} Student</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Student Gender</span>
              <span className="font-bold text-navy-900">{tuition.studentGender || 'Any'}</span>
            </li>
          </ul>
        </div>

        {/* Tuition Details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FaChalkboardTeacher className="text-emerald-600" /> Tuition Information
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Location</span>
              <span className="font-bold text-navy-900">{tuition.location}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Detailed Area</span>
              <span className="font-bold text-navy-900">{tuition.area || 'N/A'}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Days / Week</span>
              <span className="font-bold text-navy-900">{tuition.daysPerWeek}</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 font-medium">Preferred Time</span>
              <span className="font-bold text-navy-900">{tuition.preferredTime}</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Tutor Gender Preference</span>
              <span className="font-bold text-emerald-600">{tuition.tutorGenderPreference || 'Any'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Requirements & Description */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div>
          <h3 className="text-lg font-bold text-navy-900 mb-2">Requirements</h3>
          <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm leading-relaxed border border-slate-200/80">
            {tuition.requirements || 'Previous teaching experience preferred. Good academic background required.'}
          </div>
        </div>

        {tuition.description && (
          <div>
            <h3 className="text-lg font-bold text-navy-900 mb-2">Description / Special Instructions</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {tuition.description}
            </p>
          </div>
        )}
      </div>

      {/* APPLICATION MODAL */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => setApplyModalOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-navy-900">Apply for {tuition.tuitionId}</h3>
                <p className="text-xs text-slate-500">{tuition.title}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="text-slate-400 hover:text-navy-900"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Cover Letter / Message to Admin (Optional)
                </label>
                <textarea
                  rows="4"
                  placeholder="Explain why you are the ideal tutor for this post (e.g. your university, past experience, availability)..."
                  value={coverMessage}
                  onChange={(e) => setCoverMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>

              <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 text-xs text-primary-800 flex items-start gap-2">
                <FaExclamationCircle className="text-primary-600 text-base shrink-0 mt-0.5" />
                <span>
                  Your registered tutor profile details (University, Experience, Phone) will be automatically submitted to the Admin.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
