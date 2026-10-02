import asyncHandler from 'express-async-handler';
import Tuition from '../models/Tuition.js';
import Tutor from '../models/Tutor.js';
import Application from '../models/Application.js';
import Contact from '../models/Contact.js';

// @desc    Get Admin Dashboard Stats & Charts data
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
  const totalTuitions = await Tuition.countDocuments();
  const activeTuitions = await Tuition.countDocuments({ status: 'active' });
  const closedTuitions = await Tuition.countDocuments({ status: 'closed' });
  const inactiveTuitions = await Tuition.countDocuments({ status: 'inactive' });

  const totalTutors = await Tutor.countDocuments();
  const verifiedTutors = await Tutor.countDocuments({ verified: true });

  const totalApplications = await Application.countDocuments();
  const pendingApplications = await Application.countDocuments({ status: 'pending' });
  const approvedApplications = await Application.countDocuments({ status: 'approved' });
  const rejectedApplications = await Application.countDocuments({ status: 'rejected' });

  const totalContacts = await Contact.countDocuments();
  const unreadContacts = await Contact.countDocuments({ status: 'unread' });

  // Compute popular subjects from Tuitions
  const subjectAgg = await Tuition.aggregate([
    { $group: { _id: '$subject', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 7 },
  ]);

  const popularSubjects = subjectAgg.map((item) => ({
    subject: item._id || 'Other',
    count: item.count,
  }));

  // Compute popular locations from Tuitions
  const locationAgg = await Tuition.aggregate([
    { $group: { _id: '$location', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 7 },
  ]);

  const popularLocations = locationAgg.map((item) => ({
    location: item._id || 'Other',
    count: item.count,
  }));

  // Tuitions created over time (by Month)
  const tuitionOverTimeAgg = await Tuition.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const tuitionOverTime = tuitionOverTimeAgg.map((item) => ({
    period: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    count: item.count,
  }));

  // Applications over time (by Month)
  const appOverTimeAgg = await Application.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$appliedAt' },
          year: { $year: '$appliedAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  const applicationsOverTime = appOverTimeAgg.map((item) => ({
    period: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    count: item.count,
  }));

  res.json({
    summary: {
      totalTuitions,
      activeTuitions,
      closedTuitions,
      inactiveTuitions,
      totalTutors,
      verifiedTutors,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalContacts,
      unreadContacts,
    },
    charts: {
      popularSubjects,
      popularLocations,
      tuitionOverTime,
      applicationsOverTime,
    },
  });
});
