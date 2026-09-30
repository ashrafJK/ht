import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaUserGraduate,
  FaCheckCircle,
  FaSearch,
  FaBan,
  FaCheck,
  FaEye,
  FaUser,
  FaStar,
  FaTrash,
} from 'react-icons/fa';

const AdminTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('');
  const [selectedTutor, setSelectedTutor] = useState(null);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (verifiedFilter) params.append('verified', verifiedFilter);

      const { data } = await API.get(`/tutors?${params.toString()}`);
      setTutors(data || []);
    } catch (err) {
      toast.error('Failed to load tutors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [search, verifiedFilter]);

  const handleToggleVerify = async (id) => {
    try {
      const { data } = await API.patch(`/tutors/${id}/verify`);
      toast.success(
        data.verified ? 'Tutor badge verified ✓' : 'Verification badge removed'
      );
      setTutors(tutors.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      toast.error('Failed to update verification status');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const { data } = await API.patch(`/tutors/${id}/status`);
      toast.success(
        data.userId?.status === 'suspended' ? 'Tutor suspended' : 'Tutor activated'
      );
      setTutors(tutors.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      toast.error('Failed to update account status');
    }
  };

  const handleDeleteTutor = async (tutorId) => {
    if (!window.confirm('Are you sure you want to permanently delete this tutor profile and account?')) {
      return;
    }
    try {
      await API.delete(`/tutors/${tutorId}`);
      toast.success('Tutor profile deleted permanently');
      setTutors(tutors.filter((t) => t._id !== tutorId));
    } catch (err) {
      toast.error('Failed to delete tutor profile');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Registered Tutors Management</h1>
          <p className="text-xs text-slate-500">Verify university credentials, issue verified badges, or suspend accounts</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl border border-purple-100">
            {tutors.length} Total Tutors
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by Tutor Name, University, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <select
          value={verifiedFilter}
          onChange={(e) => setVerifiedFilter(e.target.value)}
          className="py-2 px-3 rounded-xl border border-slate-200 text-sm bg-white font-medium"
        >
          <option value="">All Tutors</option>
          <option value="true">Verified Tutors Only</option>
          <option value="false">Unverified Tutors</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading registered tutors...</div>
        ) : tutors.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No registered tutors found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Tutor Details</th>
                  <th className="py-3.5 px-4">University & Dept</th>
                  <th className="py-3.5 px-4">Subjects & Exp</th>
                  <th className="py-3.5 px-4 text-center">Completion</th>
                  <th className="py-3.5 px-4 text-center">Verification</th>
                  <th className="py-3.5 px-4 text-center">Account</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tutors.map((tutor) => {
                  const isSuspended = tutor.userId?.status === 'suspended';
                  return (
                    <tr key={tutor._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {tutor.photo ? (
                            <img
                              src={tutor.photo}
                              alt={tutor.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-base shrink-0 border border-slate-200">
                              <FaUser />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-navy-900 flex items-center gap-1.5">
                              {tutor.name}
                              {tutor.verified && (
                                <FaCheckCircle className="text-emerald-500 text-xs" title="Verified Badge" />
                              )}
                            </p>
                            <p className="text-xs text-slate-500">{tutor.phone} • {tutor.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <span className="font-bold text-slate-800 block line-clamp-1">{tutor.university}</span>
                        <span className="text-slate-500 block">{tutor.department} ({tutor.degree})</span>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <span className="font-semibold text-slate-800 block line-clamp-1">
                          {Array.isArray(tutor.subjects) ? tutor.subjects.join(', ') : tutor.subjects}
                        </span>
                        <span className="text-slate-400">{tutor.experience || '1 Year'}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-primary-50 text-primary-700">
                          {tutor.profileCompletion || 85}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleVerify(tutor._id)}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 mx-auto ${
                            tutor.verified
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <FaCheckCircle className={tutor.verified ? 'text-emerald-600' : 'text-slate-400'} />
                          {tutor.verified ? '✓ Verified' : 'Verify Badge'}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-full ${
                            isSuspended ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isSuspended ? 'Suspended' : 'Active'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedTutor(tutor)}
                            className="p-2 text-slate-600 hover:text-primary-600 rounded-lg hover:bg-slate-100 text-xs"
                            title="View Tutor Profile"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(tutor._id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              isSuspended
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            }`}
                            title={isSuspended ? 'Activate Tutor' : 'Suspend Tutor'}
                          >
                            {isSuspended ? 'Activate' : 'Suspend'}
                          </button>
                          <button
                            onClick={() => handleDeleteTutor(tutor._id)}
                            className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 text-xs"
                            title="Delete Tutor Permanently"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TUTOR PROFILE POPUP MODAL */}
      {selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => setSelectedTutor(null)}
          />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-900">Tutor Profile Overview</h3>
              <button
                onClick={() => setSelectedTutor(null)}
                className="text-slate-400 hover:text-navy-900 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              {selectedTutor.photo ? (
                <img
                  src={selectedTutor.photo}
                  alt={selectedTutor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl border">
                  <FaUser />
                </div>
              )}
              <div>
                <h4 className="text-xl font-bold text-navy-900">{selectedTutor.name}</h4>
                <p className="text-xs text-slate-500">{selectedTutor.email} • {selectedTutor.phone}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {selectedTutor.gender}
                  </span>
                  {selectedTutor.verified && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <FaCheckCircle /> Verified Tutor
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <p><strong>University:</strong> {selectedTutor.university}</p>
              <p><strong>Department:</strong> {selectedTutor.department}</p>
              <p><strong>Degree:</strong> {selectedTutor.degree} ({selectedTutor.passingYear || 'N/A'})</p>
              <p><strong>Teaching Exp:</strong> {selectedTutor.experience}</p>
              <p><strong>Subjects:</strong> {Array.isArray(selectedTutor.subjects) ? selectedTutor.subjects.join(', ') : selectedTutor.subjects}</p>
              <p><strong>Preferred Locations:</strong> {Array.isArray(selectedTutor.preferredLocations) ? selectedTutor.preferredLocations.join(', ') : selectedTutor.preferredLocations}</p>
              <p><strong>Expected Salary:</strong> ৳{selectedTutor.expectedSalary}/month</p>
              <p><strong>Available Days & Time:</strong> {selectedTutor.availableDays} ({selectedTutor.availableTime})</p>
            </div>

            {selectedTutor.bio && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Tutor Bio</h5>
                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                  {selectedTutor.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTutors;
