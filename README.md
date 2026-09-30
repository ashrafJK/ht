# Home Tutor BD — MERN Stack Home Tuition Management Platform

A professional, modern, and full-stack MERN (MongoDB, Express.js, React.js, Node.js) platform designed specifically for Bangladesh to publish, search, and manage home tuition opportunities and verified tutors.

---

## 🌟 Key Platform Features

### 🔐 Strict Role-Based Architecture
- **Admin**:
  - **Exclusive Tuition Creation**: Tuitions can be created, edited, deleted, published/unpublished, or closed **ONLY** by the Admin.
  - **Auto-Generated Tuition ID**: Generates unique IDs like `HT-1001`, `HT-1002`, `HT-1025`...
  - **Dashboard Analytics**: Real-time stats and visual charts (Tuitions timeline, Applications breakdown, Popular Subjects, Popular Hubs).
  - **Application Management**: View applicant profile details, cover messages, and approve/reject applications.
  - **Tutor Verification**: Review tutor credentials and grant **✓ Verified Tutor** badges or suspend/activate accounts.
- **Tutor**:
  - Register with full academic details (University, Department, Experience, Subjects, Locations).
  - Profile completion metric (e.g. 85% Completion Bar).
  - Browse, search, and filter tuitions.
  - Apply for tuition with custom cover letter (prevents duplicate applications).
  - Personal Dashboard to track application statuses (Pending, Approved, Rejected) and view personalized tuition recommendations.
- **Guest Visitor**:
  - Browse homepage, explore tuition posts, search & filter by subject, class, location, and salary in Bangladeshi Taka (`৳`).

---

## 🛠️ Technology Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS** (Custom theme with light background, navy blue primary, soft shadows)
- **React Router DOM v6** (Nested routes, protected tutor & admin guards)
- **Axios** (API requests with JWT header interceptor)
- **Framer Motion** (Smooth transitions & animations)
- **React Hot Toast** (Toast notifications for all actions)
- **React Icons** (FontAwesome icons)
- **Recharts** (Visual charts for Admin analytics)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Token)** authentication
- **bcryptjs** password hashing
- **CORS** & **dotenv**

---

## 📁 Directory Structure

```
home-tutor-bd/
├── package.json               # Root orchestration scripts
├── README.md                  # Detailed documentation
├── backend/
│   ├── config/
│   │   └── db.js              # Mongoose DB connection handler
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── tuitionController.js
│   │   └── tutorController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protect, adminOnly, tutorOnly
│   │   └── errorMiddleware.js # 404 & error handlers
│   ├── models/
│   │   ├── Application.js    # Application model with unique index
│   │   ├── Tuition.js        # Tuition model (HT-ID, salary in ৳)
│   │   ├── Tutor.js          # Tutor model (University, completion)
│   │   └── User.js           # User model (hashed password)
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── tuitionRoutes.js
│   │   └── tutorRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env                   # Environment config
│   ├── seed.js                # Seed script for initial admin & tuitions
│   └── server.js              # Express server entrypoint
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/         # AdminSidebar, AdminHeader
    │   │   └── common/        # Navbar, Footer, TuitionCard, SkeletonCard
    │   ├── context/
    │   │   └── AuthContext.jsx# Auth & User state
    │   ├── layouts/
    │   │   ├── AdminLayout.jsx# Responsive drawer layout for admin
    │   │   └── MainLayout.jsx # Public & Tutor site layout
    │   ├── pages/
    │   │   ├── admin/         # AdminDashboard, AdminTuitions, AdminCreateTuition, AdminApplications, AdminTutors
    │   │   ├── tutor/         # TutorDashboard, TutorProfile
    │   │   ├── Home.jsx       # Hero, Search, Featured, Categories, FAQs
    │   │   ├── TuitionListing.jsx # Multi-filter search system
    │   │   ├── TuitionDetails.jsx # Tuition info & application popup
    │   │   ├── Login.jsx & Register.jsx
    │   │   └── AdminLogin.jsx
    │   ├── routes/
    │   │   └── AppRoutes.jsx  # Router config & protected guards
    │   └── services/
    │       └── api.js         # Axios interceptor
    └── index.html
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hometutorbd
JWT_SECRET=hometutorbd_super_secret_jwt_key_2026
NODE_ENV=development

# Initial Admin Seed Credentials
ADMIN_EMAIL=admin@hometutorbd.com
ADMIN_PASSWORD=admin123
```

> **MongoDB Atlas Setup**: Replace `MONGO_URI` with your MongoDB Atlas connection string:
> `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hometutorbd?retryWrites=true&w=majority`

---

## 🚀 How to Run Locally

### 1. Seed Initial Admin & Sample Data
Run the seed script to populate the database with default admin credentials (`admin@hometutorbd.com` / `admin123`) and sample tuition posts:

```bash
cd backend
npm run seed
```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```
The backend API server will start on `http://localhost:5000`.

### 3. Start Frontend App
```bash
cd frontend
npm run dev
```
The React Vite frontend will run on `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new tutor account |
| `POST` | `/api/auth/login` | Public | Log in user or admin |
| `GET` | `/api/auth/me` | Private | Get logged-in user details |
| `GET` | `/api/tuitions` | Public | List & search tuitions with filters |
| `GET` | `/api/tuitions/:id` | Public | Get single tuition details |
| `POST` | `/api/tuitions` | Admin | Create tuition post (auto HT-ID) |
| `PUT` | `/api/tuitions/:id` | Admin | Edit tuition post |
| `DELETE` | `/api/tuitions/:id` | Admin | Delete tuition post |
| `PATCH` | `/api/tuitions/:id/status` | Admin | Change status (active, closed) |
| `PATCH` | `/api/tuitions/:id/featured` | Admin | Toggle featured flag |
| `POST` | `/api/applications` | Tutor | Apply for tuition (no duplicates) |
| `GET` | `/api/applications/my` | Tutor | Get tutor's own applications |
| `GET` | `/api/applications` | Admin | Get all tuition applications |
| `PATCH` | `/api/applications/:id/status` | Admin | Approve or reject application |
| `GET` | `/api/tutors` | Public/Admin | List registered tutors |
| `PUT` | `/api/tutors/profile` | Tutor | Update profile info |
| `PATCH` | `/api/tutors/:id/verify` | Admin | Toggle tutor verified badge |
| `PATCH` | `/api/tutors/:id/status` | Admin | Suspend or activate tutor |
| `GET` | `/api/admin/stats` | Admin | Get dashboard statistics & charts |

---

## 🔑 Access Credentials Summary

- **Admin Login Route**: `/admin/login`
  - **Email**: `admin@hometutorbd.com`
  - **Password**: `admin123`
- **Sample Tutor Login**:
  - **Email**: `tanvir@gmail.com`
  - **Password**: `password123`
