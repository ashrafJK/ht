import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-200 rounded w-24"></div>
        <div className="h-5 bg-slate-200 rounded w-16"></div>
      </div>
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="h-10 bg-slate-100 rounded-xl"></div>
        <div className="h-10 bg-slate-100 rounded-xl"></div>
        <div className="h-10 bg-slate-100 rounded-xl"></div>
        <div className="h-10 bg-slate-100 rounded-xl"></div>
      </div>
      <div className="pt-4 flex justify-between items-center border-t border-slate-100">
        <div className="h-8 bg-slate-200 rounded w-24"></div>
        <div className="h-8 bg-slate-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
