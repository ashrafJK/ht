import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUserShield, FaLock, FaEnvelope } from 'react-icons/fa';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const user = await login(email, password);
      if (user.role !== 'admin') {
        toast.error('Access denied. Account does not have admin privileges.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      // Toast handled in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-3xl mx-auto mb-2 shadow-inner">
            <FaUserShield />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal Login</h1>
          <p className="text-slate-400 text-xs">Home Tutor BD Administrative Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-500 text-xs" />
              <input
                type="email"
                required
                placeholder="admin@hometutorbd.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-3.5 text-slate-500 text-xs" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            {submitting ? 'Verifying Admin...' : 'Log In to Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
