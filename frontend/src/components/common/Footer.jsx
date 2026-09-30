import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-blue-500 text-white flex items-center justify-center shadow-lg">
                <FaGraduationCap className="text-2xl" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                English<span className="text-primary-400"> Medium Tutor</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              English Medium Tutor is Bangladesh&apos;s leading platform for finding verified home tutors and premium tuition opportunities across Dhaka, Chattogram, Sylhet, and nationwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tuitions" className="hover:text-primary-400 transition-colors">
                  Find Tuition
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Popular Hubs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Dhanmondi, Dhaka</li>
              <li>Mirpur, Dhaka</li>
              <li>Uttara, Dhaka</li>
              <li>Mohammadpur, Dhaka</li>
              <li>Gulshan & Banani</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-primary-400 shrink-0" />
                <span>Level 5, House 12, Road 4, Dhanmondi, Dhaka 1205</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <span>info@hometutorbd.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} English Medium Tutor. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">Terms & Conditions</Link>
            <Link to="/about" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/admin/login" className="hover:text-slate-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
