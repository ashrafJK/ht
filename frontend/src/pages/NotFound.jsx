import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center text-4xl shadow-md">
        <FaGraduationCap />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-6xl font-extrabold text-navy-900">404</h1>
        <h2 className="text-xl font-bold text-slate-700">Page Not Found</h2>
        <p className="text-slate-500 text-sm">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
      >
        <FaHome /> Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
