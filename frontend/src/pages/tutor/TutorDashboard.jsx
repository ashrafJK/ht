import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import TuitionCard from '../../components/common/TuitionCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import {
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaGraduationCap,
  FaBookOpen,
  FaUserEdit,
  FaChevronRight,
  FaExclamationTriangle,
} from 'react-icons/fa';

const TutorDashboard = () => {
  const { tutorProfile, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [recommendedTuitions, setRecommendedTuitions] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingApps(true);
        const { data: appsData } = await API.get('/applications/my');
        setApplications(appsData || []);
      } catch (err) {
        console.error('Error fetching my applications:', err.message);
      } finally {
        setLoadingApps(false);
      }

      try {
        setLoadingRecs(true);
        // Fetch recommendations matching tutor location or subjects if available
        let recUrl = '/tuitions?limit=4&status=active';
        if (tutorProfile?.preferredLocations?.length > 0) {
          recUrl += `&location=${encodeURIComponent(tutorProfile.preferredLocations[0])}`;
        }
        const { data: recData } = await API.get(recUrl);
        setRecommendedTuitions(recData.tuitions || []);
      } catch (err) {
        console.error('Error fetching recommended tuitions:', err.message);
      } finally {
        setLoadingRecs(false);
      }
    };

    fetchData();
  }, [tutorProfile]);

  // Compute stats
  const totalApps = applications.length;
  const pendingApps = applications.filter((a) => a.status === 'pending').length;
  const approvedApps = applications.filter((a) => a.status === 'approved').length;
  const rejectedApps = applications.filter((a) => a.status === 'rejected').length;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
            <FaGraduationCap /> Registered Tutor
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.name || 'Tutor'}!
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            {tutorProfile?.university} • {tutorProfile?.department}
          </p>
        </div>

        <div className="z-10 flex items-center gap-3">
          <Link
            to="/tutor/profile"
            className="px-5 py-2.5 rounded-xl bg-white text-navy-900 font-bold text-sm shadow-md hover:bg-slate-100 transition-all flex items-center gap-2"
          >
            <FaUserEdit /> Edit Profile
          </Link>
          <Link
            to="/tuitions"
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <FaBookOpen /> Find Tuitions
          </Link>
        </div>
      </div>

      {/* DASHBOARD STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl shrink-0">
            <FaPaperPlane />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-navy-900">{totalApps}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Applications</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0">
            <FaClock />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-amber-600">{pendingApps}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">Pending Review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
            <FaCheckCircle />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-emerald-600">{approvedApps}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">Approved</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shrink-0">
            <FaTimesCircle />
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-rose-600">{rejectedApps}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">Rejected</span>
          </div>
        </div>
      </div>

      {/* MY APPLICATIONS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900">My Applications</h2>
            <p className="text-xs text-slate-500">Track the status of all your tuition applications</p>
          </div>
          <Link to="/tuitions" className="text-xs font-bold text-primary-600 hover:underline">
            Apply for More →
          </Link>
        </div>

        {loadingApps ? (
          <div className="p-8 text-center text-slate-400">Loading your applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 space-y-3">
            <p className="text-sm font-medium">You haven&apos;t applied for any tuitions yet.</p>
            <Link
              to="/tuitions"
              className="inline-block px-4 py-2 bg-primary-600 text-white font-bold text-xs rounded-xl shadow"
            >
              Browse Tuitions Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Tuition ID</th>
                  <th className="py-3 px-4">Title & Subject</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-600 text-xs">
                      {app.tuitionId?.tuitionId || 'HT-ID'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        to={`/tuitions/${app.tuitionId?.tuitionId || app.tuitionId?._id}`}
                        className="font-bold text-navy-900 hover:text-primary-600 line-clamp-1"
                      >
                        {app.tuitionId?.title || 'Tuition Post'}
                      </Link>
                      <span className="text-xs text-slate-500">{app.tuitionId?.subject}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {app.tuitionId?.location}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-600">
                      ৳{app.tuitionId?.salary ? Number(app.tuitionId.salary).toLocaleString('en-IN') : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {new Date(app.appliedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full ${
                          app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : app.status === 'rejected'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECOMMENDED TUITIONS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Recommended Tuitions for You</h2>
            <p className="text-xs text-slate-500">
              Matched based on your subjects and preferred location ({tutorProfile?.preferredLocations?.[0] || 'Dhaka'})
            </p>
          </div>
          <Link to="/tuitions" className="text-xs font-bold text-primary-600 hover:underline">
            View All ({recommendedTuitions.length}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loadingRecs
            ? [1, 2].map((n) => <SkeletonCard key={n} />)
            : recommendedTuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
