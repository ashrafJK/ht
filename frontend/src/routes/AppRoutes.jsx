import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/Home';
import TuitionListing from '../pages/TuitionListing';
import TuitionDetails from '../pages/TuitionDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminLogin from '../pages/AdminLogin';
import NotFound from '../pages/NotFound';

import TutorDashboard from '../pages/tutor/TutorDashboard';
import TutorProfile from '../pages/tutor/TutorProfile';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminTuitions from '../pages/admin/AdminTuitions';
import AdminCreateTuition from '../pages/admin/AdminCreateTuition';
import AdminEditTuition from '../pages/admin/AdminEditTuition';
import AdminApplications from '../pages/admin/AdminApplications';
import AdminTutors from '../pages/admin/AdminTutors';

import { ProtectedRoute, AdminRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public & Tutor Routes wrapped in MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tuitions" element={<TuitionListing />} />
        <Route path="tuitions/:id" element={<TuitionDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Tutor Routes */}
        <Route
          path="tutor/dashboard"
          element={
            <ProtectedRoute>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="tutor/profile"
          element={
            <ProtectedRoute>
              <TutorProfile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes wrapped in AdminLayout */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tuitions" element={<AdminTuitions />} />
        <Route path="tuitions/create" element={<AdminCreateTuition />} />
        <Route path="tuitions/:id/edit" element={<AdminEditTuition />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="tutors" element={<AdminTutors />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
