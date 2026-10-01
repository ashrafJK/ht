import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import TuitionCard from '../components/common/TuitionCard';
import SkeletonCard from '../components/common/SkeletonCard';
import {
  FaSearch,
  FaFilter,
  FaRedo,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimes,
  FaInfoCircle,
} from 'react-icons/fa';

const TuitionListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedClass, setSelectedClass] = useState(searchParams.get('className') || '');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [minSalary, setMinSalary] = useState(searchParams.get('minSalary') || '');
  const [maxSalary, setMaxSalary] = useState(searchParams.get('maxSalary') || '');
  const [genderPref, setGenderPref] = useState(searchParams.get('tutorGenderPreference') || '');
  const [tuitionType, setTuitionType] = useState(searchParams.get('tuitionType') || '');
  const [daysPerWeek, setDaysPerWeek] = useState(searchParams.get('daysPerWeek') || '');

  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch Tuitions based on current filters
  const fetchTuitions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedClass) params.append('className', selectedClass);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (selectedLocation) params.append('location', selectedLocation);
      if (minSalary) params.append('minSalary', minSalary);
      if (maxSalary) params.append('maxSalary', maxSalary);
      if (genderPref) params.append('tutorGenderPreference', genderPref);
      if (tuitionType) params.append('tuitionType', tuitionType);
      if (daysPerWeek) params.append('daysPerWeek', daysPerWeek);
      params.append('status', 'active');

      const { data } = await API.get(`/tuitions?${params.toString()}`);
      setTuitions(data.tuitions || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch tuitions:', err.message);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedClass,
    selectedSubject,
    selectedLocation,
    minSalary,
    maxSalary,
    genderPref,
    tuitionType,
    daysPerWeek,
  ]);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedLocation('');
    setMinSalary('');
    setMaxSalary('');
    setGenderPref('');
    setTuitionType('');
    setDaysPerWeek('');
    setSearchParams({});
  };

  const classesList = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'HSC', 'O-Level', 'A-Level', 'Admission Test'];
  const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology', 'ICT', 'Bangla', 'Accounting', 'General Science'];
  const locationsList = ['Dhanmondi', 'Mirpur', 'Uttara', 'Mohammadpur', 'Banasree', 'Bashundhara', 'Khilgaon', 'Rampura', 'Motijheel', 'Gulshan', 'Online'];

  const filterSidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
          <FaFilter className="text-primary-600" /> Filter Tuitions
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <FaRedo className="text-[10px]" /> Reset
        </button>
      </div>

      {/* Tuition ID or Search keyword */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Keyword / Tuition ID
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="EMT-1025, Physics, Dhanmondi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Class Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Class / Grade
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Classes</option>
          {classesList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Subjects</option>
          {subjectsList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Location Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Location
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Locations</option>
          {locationsList.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Salary Range (৳)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min (e.g. 5000)"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Max (e.g. 15000)"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Tutor Gender Preference */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Tutor Gender Preference
        </label>
        <div className="flex gap-2">
          {['', 'Male', 'Female'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenderPref(g)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                genderPref === g
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {g === '' ? 'Any' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Tuition Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Tuition Type
        </label>
        <select
          value={tuitionType}
          onChange={(e) => setTuitionType(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Types</option>
          <option value="Home Tuition">Home Tuition</option>
          <option value="Online Tuition">Online Tuition</option>
          <option value="Group Tuition">Group Tuition</option>
        </select>
      </div>

      {/* Days Per Week */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Days Per Week
        </label>
        <select
          value={daysPerWeek}
          onChange={(e) => setDaysPerWeek(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">Any Days</option>
          <option value="2 Days">2 Days/Week</option>
          <option value="3 Days">3 Days/Week</option>
          <option value="4 Days">4 Days/Week</option>
          <option value="5 Days">5 Days/Week</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Available Tuition Opportunities
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse verified tuition jobs, filter by subject & location, and apply directly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-bold text-sm border border-primary-100">
            {total} Active Tuitions
          </span>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="lg:hidden px-4 py-2 bg-navy-900 text-white font-semibold text-sm rounded-xl flex items-center gap-2"
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft h-fit sticky top-24">
          {filterSidebarContent}
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
              onClick={() => setShowMobileFilter(false)}
            />
            <div className="relative z-10 w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl ml-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <span className="font-bold text-navy-900">Filters</span>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-1 text-slate-500 hover:text-navy-900"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              {filterSidebarContent}
            </div>
          </div>
        )}

        {/* Tuition Cards List */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : tuitions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-soft">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
                <FaInfoCircle />
              </div>
              <h3 className="text-lg font-bold text-navy-900">No tuitions matched your filter criteria</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Try resetting your filters or searching with a different subject or location.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <FaRedo /> Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuitionListing;
