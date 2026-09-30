import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar,
  FaToggleOn,
  FaToggleOff,
  FaLock,
  FaEye,
} from 'react-icons/fa';

const AdminTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTuitions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const { data } = await API.get(`/tuitions?${params.toString()}`);
      setTuitions(data.tuitions || []);
    } catch (err) {
      toast.error('Failed to load tuitions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitions();
  }, [search, statusFilter]);

  const handleDelete = async (id, tuitionId) => {
    if (!window.confirm(`Are you sure you want to delete tuition ${tuitionId}?`)) return;
    try {
      await API.delete(`/tuitions/${id}`);
      toast.success('Tuition deleted successfully');
      setTuitions(tuitions.filter((t) => t._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete tuition');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const { data } = await API.patch(`/tuitions/${id}/status`, { status: nextStatus });
      toast.success(`Tuition status updated to ${nextStatus}`);
      setTuitions(tuitions.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleCloseTuition = async (id) => {
    try {
      const { data } = await API.patch(`/tuitions/${id}/status`, { status: 'closed' });
      toast.success('Tuition post closed');
      setTuitions(tuitions.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      toast.error('Failed to close tuition');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const { data } = await API.patch(`/tuitions/${id}/featured`);
      toast.success(data.featured ? 'Marked as Featured' : 'Removed from Featured');
      setTuitions(tuitions.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      toast.error('Failed to update featured flag');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Tuition Posts</h1>
          <p className="text-xs text-slate-500">Create, edit, feature, or archive tuition listings</p>
        </div>

        <Link
          to="/admin/tuitions/create"
          className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
        >
          <FaPlus /> Create Tuition
        </Link>
      </div>

      {/* Filter / Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by Tuition ID, Title, Subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl border border-slate-200 text-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading tuition posts...</div>
        ) : tuitions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No tuition posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Tuition ID</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Subject & Class</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Salary</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-600 text-xs">
                      {t.tuitionId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-900 max-w-xs">
                      <Link to={`/tuitions/${t.tuitionId}`} className="hover:text-primary-600 line-clamp-1">
                        {t.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span className="font-semibold block text-slate-800">{t.subject}</span>
                      <span className="text-slate-400">{t.className}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium text-xs">
                      {t.location}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      ৳{Number(t.salary).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(t._id)}
                        className={`p-1.5 rounded-lg text-sm transition-colors ${
                          t.featured ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={t.featured ? 'Remove Featured' : 'Mark Featured'}
                      >
                        <FaStar />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase rounded-full ${
                          t.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : t.status === 'closed'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(t._id, t.status)}
                          className="p-2 text-slate-500 hover:text-primary-600 rounded-lg hover:bg-slate-100 text-xs"
                          title="Publish/Unpublish"
                        >
                          {t.status === 'active' ? <FaToggleOn className="text-emerald-600 text-lg" /> : <FaToggleOff className="text-lg" />}
                        </button>
                        <button
                          onClick={() => handleCloseTuition(t._id)}
                          className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 text-xs"
                          title="Close Tuition"
                        >
                          <FaLock />
                        </button>
                        <Link
                          to={`/admin/tuitions/${t._id}/edit`}
                          className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 text-xs"
                          title="Edit Tuition"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(t._id, t.tuitionId)}
                          className="p-2 text-rose-600 hover:text-rose-700 rounded-lg hover:bg-rose-50 text-xs"
                          title="Delete Tuition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTuitions;
