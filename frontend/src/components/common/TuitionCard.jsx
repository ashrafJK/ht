import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaBook,
  FaGraduationCap,
  FaStar,
  FaChevronRight,
  FaPaperPlane,
} from 'react-icons/fa';

const TuitionCard = ({ tuition, onApplyClick }) => {
  const navigate = useNavigate();

  if (!tuition) return null;

  const {
    _id,
    tuitionId,
    title,
    className,
    subject,
    location,
    area,
    daysPerWeek,
    preferredTime,
    salary,
    tuitionType,
    featured,
    createdAt,
    status,
    tutorGenderPreference,
  } = tuition;

  // Format posted date relative to current time
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;

    if (isNaN(date.getTime()) || diffMs < 0) return 'Just now';

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;

    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-hover flex flex-col justify-between overflow-hidden ${
        featured
          ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-md'
          : 'border-slate-200/80 shadow-soft'
      }`}
    >
      {/* Top Banner & Header */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-primary-50 text-primary-700 border border-primary-100">
              {tuitionType || 'Home Tuition'}
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              {tuitionId || 'HT-1000'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm">
                <FaStar className="text-yellow-200" /> Featured
              </span>
            )}
            {status && status !== 'active' && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 text-slate-700 uppercase">
                {status}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/tuitions/${tuitionId || _id}`}>
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl">
            <FaGraduationCap className="text-primary-500 text-base shrink-0" />
            <span className="truncate font-semibold">{className}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl">
            <FaBook className="text-blue-500 text-base shrink-0" />
            <span className="truncate font-semibold">{subject}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl">
            <FaMapMarkerAlt className="text-rose-500 text-base shrink-0" />
            <span className="truncate font-medium">
              {location} {area ? `(${area})` : ''}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-xl">
            <FaCalendarAlt className="text-amber-500 text-base shrink-0" />
            <span className="truncate font-medium">{daysPerWeek || '3 Days'}</span>
          </div>
        </div>

        {/* Extra Specs */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1" title={createdAt ? new Date(createdAt).toLocaleString() : ''}>
            <FaClock className="text-slate-400" /> {formatDate(createdAt)}
          </div>
          <div>
            Tutor Pref: <span className="font-semibold text-slate-700">{tutorGenderPreference || 'Any'}</span>
          </div>
        </div>
      </div>

      {/* Footer Salary & Buttons */}
      <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Salary</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-emerald-600">
              {!isNaN(Number(salary)) && String(salary).trim() !== ''
                ? `৳${Number(salary).toLocaleString('en-IN')}`
                : String(salary).startsWith('৳') ? salary : `৳${salary}`}
            </span>
            <span className="text-xs text-slate-500 font-medium">/month</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/tuitions/${tuitionId || _id}`}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm flex items-center gap-1"
          >
            Details <FaChevronRight className="text-[10px]" />
          </Link>
          <button
            onClick={() => (onApplyClick ? onApplyClick(tuition) : navigate(`/tuitions/${tuitionId || _id}`))}
            className="px-3.5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 active:scale-95 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <FaPaperPlane className="text-[11px]" /> Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;
