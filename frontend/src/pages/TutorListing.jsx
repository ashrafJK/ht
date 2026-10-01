import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import {
  FaSearch,
  FaFilter,
  FaRedo,
  FaCheckCircle,
  FaGraduationCap,
  FaBookOpen,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaInfoCircle,
  FaChalkboardTeacher,
} from 'react-icons/fa';

const TutorListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedUniversity, setSelectedUniversity] = useState(searchParams.get('university') || '');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedTutorModal, setSelectedTutorModal] = useState(null);

  // Fetch Tutors
  const fetchTutors = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedUniversity) params.append('university', selectedUniversity);
      if (selectedSubject) params.append('subject', selectedSubject);
      if (selectedLocation) params.append('location', selectedLocation);
      if (verifiedOnly) params.append('verified', 'true');

      const { data } = await API.get(`/tutors?${params.toString()}`);
      setTutors(data || []);
    } catch (err) {
      console.error('Failed to fetch tutors:', err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedUniversity, selectedSubject, selectedLocation, verifiedOnly]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedUniversity('');
    setSelectedSubject('');
    setSelectedLocation('');
    setVerifiedOnly(false);
    setSearchParams({});
  };

  const universitiesList = [
    'BUET',
    'Dhaka University',
    'NSU (North South University)',
    'BRAC University',
    'IUB (Independent University)',
    'IBA - DU',
    'DMC (Dhaka Medical College)',
    'RUET',
    'KUET',
    'CUET',
    'MIST',
    'AIUB',
    'UIU',
  ];

  const subjectsList = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'English',
    'Biology',
    'ICT',
    'Accounting',
    'Economics',
    'General Science',
  ];

  const locationsList = [
    'Dhanmondi',
    'Mirpur',
    'Uttara',
    'Mohammadpur',
    'Banasree',
    'Bashundhara',
    'Khilgaon',
    'Rampura',
    'Motijheel',
    'Gulshan',
    'Online',
  ];

  const filterSidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
          <FaFilter className="text-primary-600" /> Filter Tutors
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <FaRedo className="text-[10px]" /> Reset
        </button>
      </div>

      {/* Keyword Search */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Search Tutor Name / Subject
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name, dept, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* University Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          University / Institution
        </label>
        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="">All Universities</option>
          {universitiesList.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Teaching Subject
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
          Preferred Location
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

      {/* Verification Filter */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
            <FaCheckCircle className="text-emerald-500 text-sm" /> Verified Tutors Only
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 flex items-center gap-3">
            <FaChalkboardTeacher className="text-primary-600" /> Qualified Tutor Directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse verified English Medium tutors, inspect profiles, qualifications, and find your perfect teacher.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-bold text-sm border border-primary-100">
            {tutors.length} Tutors Available
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

        {/* Tutor Cards List */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-200" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : tutors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-soft">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
                <FaInfoCircle />
              </div>
              <h3 className="text-lg font-bold text-navy-900">No tutors found matching your criteria</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Try searching with broader filters or check back later as new tutors register daily.
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
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="flex items-start gap-4">
                      {tutor.photo ? (
                        <img
                          src={tutor.photo}
                          alt={tutor.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-100 shadow-xs flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 text-primary-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                          {tutor.name ? tutor.name.charAt(0).toUpperCase() : <FaUser />}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-extrabold text-navy-900 truncate">
                            {tutor.name}
                          </h3>
                          {tutor.verified && (
                            <span
                              title="Verified Tutor"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                            >
                              <FaCheckCircle className="text-emerald-500" /> Verified
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-primary-600 font-semibold mt-0.5 flex items-center gap-1">
                          <FaGraduationCap />
                          {tutor.university || 'University Not Specified'}
                        </p>
                        {tutor.department && (
                          <p className="text-xs text-slate-500 truncate">
                            Dept: {tutor.department} {tutor.degree ? `(${tutor.degree})` : ''}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details badges */}
                    <div className="space-y-2 text-xs">
                      {/* Experience & Salary */}
                      <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FaStar className="text-amber-500" />
                          Experience: <strong className="text-navy-900">{tutor.experience || 'N/A'}</strong>
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <FaMoneyBillWave className="text-emerald-600" />
                          Expected: <strong className="text-navy-900">{tutor.expectedSalary ? `৳${tutor.expectedSalary}` : 'Negotiable'}</strong>
                        </span>
                      </div>

                      {/* Subjects */}
                      {tutor.subjects && tutor.subjects.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <FaBookOpen className="text-primary-600" /> Subjects
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {tutor.subjects.slice(0, 4).map((sub, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 font-semibold text-[11px]"
                              >
                                {sub}
                              </span>
                            ))}
                            {tutor.subjects.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px]">
                                +{tutor.subjects.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Preferred Locations */}
                      {tutor.preferredLocations && tutor.preferredLocations.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <FaMapMarkerAlt className="text-rose-500" /> Locations
                          </p>
                          <p className="text-xs text-slate-600 font-medium truncate">
                            {tutor.preferredLocations.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Profile Completion: <strong className="text-primary-600">{tutor.profileCompletion || 70}%</strong>
                    </span>
                    <button
                      onClick={() => setSelectedTutorModal(tutor)}
                      className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tutor Profile Details Modal */}
      {selectedTutorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedTutorModal(null)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-navy-900 via-primary-900 to-navy-950 p-6 text-white relative">
              <button
                onClick={() => setSelectedTutorModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-5">
                {selectedTutorModal.photo ? (
                  <img
                    src={selectedTutorModal.photo}
                    alt={selectedTutorModal.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">
                    {selectedTutorModal.name ? selectedTutorModal.name.charAt(0).toUpperCase() : <FaUser />}
                  </div>
                )}

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold text-white truncate">
                      {selectedTutorModal.name}
                    </h2>
                    {selectedTutorModal.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        <FaCheckCircle className="text-emerald-400" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-200 font-medium flex items-center gap-1.5">
                    <FaGraduationCap /> {selectedTutorModal.university || 'University Not Specified'}
                  </p>
                  {selectedTutorModal.department && (
                    <p className="text-xs text-slate-300">
                      Department: {selectedTutorModal.department} {selectedTutorModal.degree ? `(${selectedTutorModal.degree})` : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">Experience</p>
                  <p className="text-sm font-bold text-navy-900 mt-0.5">{selectedTutorModal.experience || 'Not Specified'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">Expected Salary</p>
                  <p className="text-sm font-bold text-navy-900 mt-0.5">
                    {selectedTutorModal.expectedSalary ? `৳${selectedTutorModal.expectedSalary}` : 'Negotiable'}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">Gender</p>
                  <p className="text-sm font-bold text-navy-900 mt-0.5">{selectedTutorModal.gender || 'Not Specified'}</p>
                </div>
              </div>

              {/* Bio / About */}
              {selectedTutorModal.bio && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    About Tutor
                  </h4>
                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed whitespace-pre-line">
                    {selectedTutorModal.bio}
                  </p>
                </div>
              )}

              {/* Subjects & Classes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <FaBookOpen className="text-primary-600" /> Teaching Subjects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTutorModal.subjects && selectedTutorModal.subjects.length > 0 ? (
                      selectedTutorModal.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-semibold text-xs border border-primary-100"
                        >
                          {sub}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">Not specified</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <FaGraduationCap className="text-indigo-600" /> Preferred Classes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTutorModal.classes && selectedTutorModal.classes.length > 0 ? (
                      selectedTutorModal.classes.map((cls, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100"
                        >
                          {cls}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">Not specified</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Locations & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-rose-500" /> Preferred Locations
                  </h4>
                  <p className="text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedTutorModal.preferredLocations && selectedTutorModal.preferredLocations.length > 0
                      ? selectedTutorModal.preferredLocations.join(', ')
                      : 'Any location / Online'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-amber-500" /> Availability
                  </h4>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400" /> Days:{' '}
                      <strong>{selectedTutorModal.availableDays || 'Flexible'}</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-slate-400" /> Time:{' '}
                      <strong>{selectedTutorModal.availableTime || 'Flexible'}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Direct Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedTutorModal.phone && (
                    <a
                      href={`tel:${selectedTutorModal.phone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <FaPhoneAlt className="text-emerald-600 text-lg" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-emerald-600">Phone</p>
                        <p className="text-sm font-extrabold">{selectedTutorModal.phone}</p>
                      </div>
                    </a>
                  )}

                  {selectedTutorModal.email && (
                    <a
                      href={`mailto:${selectedTutorModal.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 text-primary-800 border border-primary-200 hover:bg-primary-100 transition-colors"
                    >
                      <FaEnvelope className="text-primary-600 text-lg" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold text-primary-600">Email</p>
                        <p className="text-sm font-extrabold truncate">{selectedTutorModal.email}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTutorModal(null)}
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-950 text-white font-bold text-sm rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorListing;
