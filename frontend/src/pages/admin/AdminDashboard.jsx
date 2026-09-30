import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import {
  FaBookOpen,
  FaFileSignature,
  FaUserGraduate,
  FaCheckCircle,
  FaPlusCircle,
  FaChartBar,
  FaChartPie,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-500 font-medium">Loading admin dashboard statistics...</p>
      </div>
    );
  }

  const summary = stats?.summary || {};
  const charts = stats?.charts || {};
  const popularSubjects = charts.popularSubjects || [];
  const popularLocations = charts.popularLocations || [];

  const maxSubjectCount = Math.max(...popularSubjects.map((s) => s.count), 1);
  const maxLocationCount = Math.max(...popularLocations.map((l) => l.count), 1);

  const colors = [
    'bg-primary-600 text-primary-600',
    'bg-emerald-500 text-emerald-500',
    'bg-amber-500 text-amber-500',
    'bg-purple-600 text-purple-600',
    'bg-rose-500 text-rose-500',
    'bg-indigo-600 text-indigo-600',
    'bg-teal-500 text-teal-500',
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard Overview</h1>
          <p className="text-xs text-slate-500">Monitor tuitions, applications, and tutor verifications</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tuitions/create"
            className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
          >
            <FaPlusCircle /> Create New Tuition
          </Link>
        </div>
      </div>

      {/* STATS SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Tuitions</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FaBookOpen />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-navy-900">{summary.totalTuitions || 0}</span>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-600 font-bold">{summary.activeTuitions || 0} Active</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{summary.closedTuitions || 0} Closed</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Tutors</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              <FaUserGraduate />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-navy-900">{summary.totalTutors || 0}</span>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-600 font-bold">{summary.verifiedTutors || 0} Verified</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Applications</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              <FaFileSignature />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-navy-900">{summary.totalApplications || 0}</span>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-amber-600 font-bold">{summary.pendingApplications || 0} Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approved Apps</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              <FaCheckCircle />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-600">{summary.approvedApplications || 0}</span>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-rose-600 font-bold">{summary.rejectedApplications || 0} Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Subjects Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <FaChartBar className="text-primary-600" /> Tuitions by Popular Subject
            </h3>
            <span className="text-xs text-slate-400 font-medium">Top Subjects</span>
          </div>

          {popularSubjects.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">No subject statistics yet</div>
          ) : (
            <div className="space-y-4 pt-1">
              {popularSubjects.map((item, idx) => {
                const percentage = Math.round((item.count / maxSubjectCount) * 100);
                const colorClass = colors[idx % colors.length].split(' ')[0];
                return (
                  <div key={item.subject || idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800">{item.subject}</span>
                      <span className="text-slate-500 font-mono">{item.count} Tuitions</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Popular Locations Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <FaChartPie className="text-emerald-600" /> Popular Tuition Hubs
            </h3>
            <span className="text-xs text-slate-400 font-medium">Top Locations</span>
          </div>

          {popularLocations.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">No location statistics yet</div>
          ) : (
            <div className="space-y-4 pt-1">
              {popularLocations.map((item, idx) => {
                const percentage = Math.round((item.count / maxLocationCount) * 100);
                const colorClass = colors[idx % colors.length].split(' ')[0];
                return (
                  <div key={item.location || idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800">{item.location}</span>
                      <span className="text-slate-500 font-mono">{item.count} Posts</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
