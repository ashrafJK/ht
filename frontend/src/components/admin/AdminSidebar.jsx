import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChartPie,
  FaBookOpen,
  FaFileSignature,
  FaUserGraduate,
  FaStar,
  FaSignOutAlt,
  FaGraduationCap,
  FaTimes,
  FaHome,
  FaPlusCircle,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FaChartPie },
    { name: 'Tuition Posts', path: '/admin/tuitions', icon: FaBookOpen },
    { name: 'Create Tuition', path: '/admin/tuitions/create', icon: FaPlusCircle },
    { name: 'Applications', path: '/admin/applications', icon: FaFileSignature },
    { name: 'Tutors', path: '/admin/tutors', icon: FaUserGraduate },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-navy-900 text-slate-300 w-64 p-5">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-navy-800 pb-5">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg">
              <FaGraduationCap className="text-2xl" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight block">
                EMT <span className="text-amber-400">Admin</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Control Panel</span>
            </div>
          </Link>
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                    : 'text-slate-400 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className={`text-base ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-5 border-t border-navy-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-navy-800 hover:text-white transition-colors"
        >
          <FaHome className="text-sm" /> Back to Main Site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
        >
          <FaSignOutAlt className="text-sm" /> Sign Out Admin
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-xs h-full bg-navy-900 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
