import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaUniversity,
  FaClock,
  FaEye,
  FaFileAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTutor, setSelectedTutor] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const url = statusFilter
        ? `/applications?status=${statusFilter}`
        : '/applications';
      const { data } = await API.get(url);
      setApplications(data || []);
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const { data } = await API.patch(`/applications/${appId}/status`, {
        status: newStatus,
      });
      toast.success(
        newStatus === 'approved'
          ? 'Application approved successfully!'
          : 'Application rejected'
      );
      setApplications(
        applications.map((app) => (app._id === appId ? data : app))
      );
    } catch (err) {
      toast.error('Failed to update application status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Tuition Applications</h1>
          <p className="text-xs text-slate-500">Review applicant tutors, view credentials, approve or reject</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-slate-200 text-sm bg-white font-medium"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading applicant requests...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Applicant Tutor</th>
                  <th className="py-3.5 px-4">University & Dept</th>
                  <th className="py-3.5 px-4">Target Tuition</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => {
                  const tutor = app.tutorId || {};
                  const tuition = app.tuitionId || {};
                  return (
                    <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Tutor Column */}
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
                            <p className="font-bold text-navy-900 line-clamp-1">{tutor.name || 'Unknown Tutor'}</p>
                            <p className="text-xs text-slate-500">{tutor.phone || tutor.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Uni & Dept */}
                      <td className="py-3.5 px-4 text-xs">
                        <span className="font-bold text-slate-800 block line-clamp-1">
                          {tutor.university || 'N/A'}
                        </span>
                        <span className="text-slate-500 block">
                          {tutor.department} ({tutor.experience || 'No exp'})
                        </span>
                      </td>

                      {/* Target Tuition */}
                      <td className="py-3.5 px-4 text-xs">
                        <span className="font-mono font-bold text-primary-600 block">
                          {tuition.tuitionId || 'HT-ID'}
                        </span>
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {tuition.title || 'Tuition Post'}
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {new Date(app.appliedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full ${
                            app.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : app.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedTutor({ tutor, app })}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                            title="View Tutor Details"
                          >
                            <FaEye /> View Profile
                          </button>

                          {app.status !== 'approved' && (
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'approved')}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                              title="Approve Application"
                            >
                              <FaCheck /> Approve
                            </button>
                          )}

                          {app.status !== 'rejected' && (
                            <button
                              onClick={() => handleUpdateStatus(app._id, 'rejected')}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                              title="Reject Application"
                            >
                              <FaTimes /> Reject
                            </button>
                          )}
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

      {/* TUTOR DETAIL MODAL */}
      {selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => setSelectedTutor(null)}
          />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-900">Tutor Applicant Credentials</h3>
              <button
                onClick={() => setSelectedTutor(null)}
                className="text-slate-400 hover:text-navy-900 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              {selectedTutor.tutor.photo ? (
                <img
                  src={selectedTutor.tutor.photo}
                  alt={selectedTutor.tutor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl border">
                  <FaUser />
                </div>
              )}
              <div>
                <h4 className="text-xl font-bold text-navy-900">{selectedTutor.tutor.name}</h4>
                <p className="text-xs text-slate-500">{selectedTutor.tutor.email} • {selectedTutor.tutor.phone}</p>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  {selectedTutor.tutor.gender || 'Male'}
                </span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <p><strong>University:</strong> {selectedTutor.tutor.university}</p>
              <p><strong>Department:</strong> {selectedTutor.tutor.department}</p>
              <p><strong>Degree / Graduation:</strong> {selectedTutor.tutor.degree || 'B.Sc'} ({selectedTutor.tutor.passingYear || 'N/A'})</p>
              <p><strong>Experience:</strong> {selectedTutor.tutor.experience || '1 Year'}</p>
            </div>

            {selectedTutor.app.coverMessage && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Applicant Cover Message</h5>
                <p className="text-sm bg-primary-50 text-primary-900 p-4 rounded-2xl border border-primary-100 italic">
                  &ldquo;{selectedTutor.app.coverMessage}&rdquo;
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  handleUpdateStatus(selectedTutor.app._id, 'rejected');
                  setSelectedTutor(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Reject Application
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedTutor.app._id, 'approved');
                  setSelectedTutor(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Approve Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
