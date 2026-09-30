import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import TuitionCard from '../components/common/TuitionCard';
import SkeletonCard from '../components/common/SkeletonCard';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBook,
  FaGraduationCap,
  FaCheckCircle,
  FaUserCheck,
  FaStar,
  FaChevronRight,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaHandshake,
  FaQuestionCircle,
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [featuredTuitions, setFeaturedTuitions] = useState([]);
  const [latestTuitions, setLatestTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search Bar State
  const [searchSubject, setSearchSubject] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchClass, setSearchClass] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [featuredRes, latestRes] = await Promise.all([
          API.get('/tuitions?featured=true&limit=3&status=active'),
          API.get('/tuitions?limit=6&status=active'),
        ]);
        setFeaturedTuitions(featuredRes.data.tuitions || []);
        setLatestTuitions(latestRes.data.tuitions || []);
      } catch (err) {
        console.error('Error fetching home page tuitions:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchSubject) params.append('subject', searchSubject);
    if (searchLocation) params.append('location', searchLocation);
    if (searchClass) params.append('className', searchClass);
    navigate(`/tuitions?${params.toString()}`);
  };

  const popularSubjects = [
    { name: 'Mathematics', icon: '📐', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Physics', icon: '⚡', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Chemistry', icon: '🧪', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'English', icon: '📖', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Biology', icon: '🧬', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { name: 'ICT', icon: '💻', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Bangla', icon: '✍️', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { name: 'Accounting', icon: '📊', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  ];

  const popularLocations = [
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
  ];

  const faqs = [
    {
      q: 'How can a tutor apply for a tuition post?',
      a: 'Tutors must register and complete their profile on English Medium Tutor. Once logged in, browse available tuitions on the /tuitions page and click "Apply Now" with an optional cover letter.',
    },
    {
      q: 'Can guardians or students create tuition posts directly?',
      a: 'No. To ensure maximum safety and verification, all tuition posts on English Medium Tutor are screened and created exclusively by our Admin team.',
    },
    {
      q: 'Is tutor registration free on English Medium Tutor?',
      a: 'Yes, tutor registration and profile creation are 100% free of cost.',
    },
    {
      q: 'What credentials do tutors need to provide?',
      a: 'Tutors specify their university, department, degree, passing year, and teaching experience. Admins review credentials to award verified badges.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-900 via-navy-900 to-navy-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-800/60 border border-primary-500/30 text-primary-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner"
          >
            <FaStar className="text-amber-400" /> Bangladesh&apos;s Trusted Tuition Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none"
          >
            Find the Right Home Tutor for Your Learning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Discover verified home tuition opportunities and connect with the right students and tutors across Bangladesh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/tuitions"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-base shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Find Tuition Opportunities
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 transition-all transform hover:-translate-y-0.5"
            >
              Become a Tutor
            </Link>
          </motion.div>

          {/* QUICK SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-slate-100 text-slate-800 text-left"
          >
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div className="relative">
                <FaBook className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Subject (e.g. Physics)"
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Location (e.g. Dhanmondi)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="relative">
                <FaGraduationCap className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Class (e.g. HSC)"
                  value={searchClass}
                  onChange={(e) => setSearchClass(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FaSearch /> Search Tuitions
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FEATURED TUITION SECTION */}
      {featuredTuitions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1">
                <FaStar /> High Priority
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">
                Featured Tuition Posts
              </h2>
            </div>
            <Link
              to="/tuitions?featured=true"
              className="mt-3 sm:mt-0 text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
            >
              View All Featured <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
              : featuredTuitions.map((tuition) => (
                  <TuitionCard key={tuition._id} tuition={tuition} />
                ))}
          </div>
        </section>
      )}

      {/* LATEST TUITION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
              Fresh Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">
              Latest Available Tuitions
            </h2>
          </div>
          <Link
            to="/tuitions"
            className="mt-3 sm:mt-0 text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
          >
            Browse All Tuitions ({latestTuitions.length}+) <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
            : latestTuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
        </div>
      </section>

      {/* POPULAR SUBJECTS SECTION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Explore Tuitions by Popular Subject
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Select a subject to instantly filter verified tuition requests in Dhaka and across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularSubjects.map((sub) => (
              <button
                key={sub.name}
                onClick={() => navigate(`/tuitions?subject=${sub.name}`)}
                className={`p-5 rounded-2xl border transition-all text-left group hover:scale-[1.02] shadow-sm hover:shadow-md bg-white ${sub.color}`}
              >
                <div className="text-3xl mb-2">{sub.icon}</div>
                <h3 className="font-bold text-navy-900 text-base group-hover:text-primary-600 transition-colors">
                  {sub.name}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Explore Tuitions →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR LOCATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Popular Tuition Hubs in Bangladesh
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Find home tuition opportunities in top residential and educational areas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {popularLocations.map((loc) => (
            <button
              key={loc}
              onClick={() => navigate(`/tuitions?location=${loc}`)}
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 shadow-sm transition-all flex items-center gap-2"
            >
              <FaMapMarkerAlt className="text-rose-500" /> {loc}
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-2">
            How English Medium Tutor Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-lg font-bold text-navy-900">1. Register as a Tutor</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Create your free tutor account, fill in your university credentials, preferred subjects, and locations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-lg font-bold text-navy-900">2. Browse & Apply</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Filter admin-screened tuition posts by subject, class, and salary, then apply directly with your profile.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-lg font-bold text-navy-900">3. Get Approved & Teach</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              When the Admin approves your application, start tutoring and earning competitive monthly fees.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                The Most Trustworthy Home Tuition Platform in Bangladesh
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                English Medium Tutor bridges the gap between dedicated tutors and guardians seeking academic excellence.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-amber-400 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-base">Admin Verified Tuition Posts</h4>
                    <p className="text-slate-400 text-sm">Every tuition post is strictly vetted by our admin team before publishing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaUserCheck className="text-emerald-400 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-base">Top University Tutors</h4>
                    <p className="text-slate-400 text-sm">Tutors from BUET, DU, DMC, NSU, BRACU and leading public/private universities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaHandshake className="text-primary-400 text-xl mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-base">Transparent & Spam-Free</h4>
                    <p className="text-slate-400 text-sm">No fake leads or duplicate posts. Clear salaries listed in Bangladeshi Taka (৳).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy-800/80 p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white">Ready to Start Teaching?</h3>
              <p className="text-slate-300 text-sm">
                Join thousands of verified tutors already applying for home tuition opportunities every day.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-block w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-base shadow-lg transition-all"
                >
                  Create Tutor Account Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-soft text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-600">1,500+</span>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm uppercase">Active Tutors</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600">850+</span>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm uppercase">Tuitions Fulfilled</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-500">98%</span>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm uppercase">Success Rate</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-purple-600">50+</span>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm uppercase">Covered Areas</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <FaQuestionCircle className="text-primary-600 text-3xl mx-auto mb-2" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-bold text-navy-900 flex justify-between items-center hover:bg-slate-50 text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <span className="text-primary-600 font-extrabold text-xl ml-2">
                  {openFaq === idx ? '-' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
