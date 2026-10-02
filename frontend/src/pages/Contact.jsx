import React, { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../services/api';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaPaperPlane,
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/contact', formData);
      toast.success('Thank you! Your message has been sent to English Medium Tutor team.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Get in Touch with Us
        </h1>
        <p className="text-slate-600 text-sm">
          Have questions about tuition postings, tutor verification, or partnerships? Send us a message or call our support line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="bg-navy-900 text-white p-8 rounded-3xl space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <ul className="space-y-5 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400 text-lg shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-emerald-400 text-lg shrink-0" />
                <span>+880 1700-000000 / +880 1800-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400 text-lg shrink-0" />
                <span>englishmediumtutor33@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Connect With Us</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-navy-900 mb-2">Send Us a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abrar Fahim"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="abrar@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="01700000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows="5"
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <FaPaperPlane /> {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
