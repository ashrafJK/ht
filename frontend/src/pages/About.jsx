import React from 'react';
import { FaGraduationCap, FaShieldAlt, FaUserCheck, FaHeart, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-3xl mx-auto">
          <FaGraduationCap />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          About English Medium Tutor
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          English Medium Tutor is Bangladesh&apos;s premier dedicated platform connecting ambitious students and guardians with verified home tutors from BUET, DU, DMC, NSU, BRACU, and leading educational institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <FaShieldAlt className="text-amber-500 text-3xl" />
          <h3 className="text-xl font-bold text-navy-900">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our mission is to bring transparency, quality, and trust to home tutoring in Bangladesh. We screen every tuition request from guardians and verify tutor academic backgrounds to build a safe, productive learning environment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <FaUserCheck className="text-emerald-500 text-3xl" />
          <h3 className="text-xl font-bold text-navy-900">Verified Tutors</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We feature tutors specializing in Science, Commerce, Arts, English Medium (Edexcel/Cambridge), Bangla Medium, English Version, and Admission Test preparation.
          </p>
        </div>
      </div>

      <div className="bg-navy-900 text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Empowering Tutors & Students Nationwide</h2>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Whether you are looking for an HSC Physics expert in Dhanmondi, a Class 9 Higher Math tutor in Uttara, or an O-Level English tutor in Gulshan, English Medium Tutor is your trusted education partner.
        </p>
      </div>
    </div>
  );
};

export default About;
