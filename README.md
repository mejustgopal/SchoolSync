<h1 align="center">
    🎓 SCHOOLSYNC
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MUI-5.12-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
</p>

<h3 align="center">
A modern, full-stack MERN application for comprehensive school management.<br>
Streamline class organization, track attendance, assess performance, and facilitate seamless communication.<br>
Built with security, scalability, and a premium glassmorphism design.
</h3>

<p align="center">
    <a href="https://www.linkedin.com/in/mejustgopal/">LinkedIn</a> • 
    <a href="#-features">Features</a> • 
    <a href="#-quick-start">Quick Start</a> • 
    <a href="#-full-api-reference">API</a> •
    <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Highlights

| | Feature | Description |
|---|---|---|
| 🎨 | **Glassmorphism V3 Design** | Premium frosted‑glass cards, animated gradients, and smooth micro‑interactions |
| 🌙 | **Dark / Light Mode** | Persistent theme toggle with fully themed components |
| 📊 | **Attendance Reporting** | Comprehensive subject‑wise attendance analysis with PDF/Excel export |
| 🔐 | **Enterprise Security** | JWT auth, bcrypt hashing, Helmet, rate limiting, and robust input validation |
| 📱 | **Fully Responsive** | Optimized layouts for desktop, tablet, and mobile |
| ⚡ | **ES Modules** | Modern `import/export` syntax across the entire backend |
| 🛡️ | **Centralized Error Handling** | Global Express error middleware with user‑friendly messages |

---

# 🚀 Quick Start

Get the project running locally in minutes!

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) account or local installation
- Git

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/mejustgopal/School-Management-System.git
cd School-Management-System

# Install dependencies for all packages
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Environment Setup

**Backend** (`backend/.env`):
```env
MONGO_URL=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/smsproject
SECRET_KEY=your-secret-key-here
PORT=5000
```
> **Note:** If your password contains special characters like `@`, URL-encode them (e.g., `@` → `%40`)

**Frontend** (`frontend/.env`):
```env
REACT_APP_BASE_URL=http://localhost:5000
```

### 4. Run the Application
From the **root directory**:

```bash
npm start
```

This will start both services concurrently:
- 🎨 **Frontend**: http://localhost:3000
- ⚙️ **Backend**: http://localhost:5000

---

# 🕹️ Getting Started

### Initial Setup
1. Navigate to http://localhost:3000
2. Click **Sign Up** and register as an **Admin**
3. Log in with your credentials
4. Use the Admin Dashboard to:
   - ➕ Create Classes
   - 📚 Add Subjects (with exam dates & session counts)
   - 👨‍🏫 Register Teachers (assigned to subjects)
   - 👨‍🎓 Enroll Students

### User Roles

| Role | Access |
|------|--------|
| **Admin** | Full system access — manage all entities, view analytics, broadcast notices, review complaints, generate reports |
| **Teacher** | Manage assigned classes, mark attendance, grade students, view performance analytics |
| **Student** | View profile, attendance records, exam results, submit complaints |

---

# 💡 About

SchoolSync is a comprehensive web application built with the MERN stack, designed to digitize and streamline educational institution management. It provides role-based access control, real-time data visualization, and an intuitive glassmorphism interface for all stakeholders.

---

# 🎯 Features

### 🔐 Security & Authentication
- JWT-based authentication with 24-hour token expiry
- Role-based access control (RBAC) with dedicated middleware
- Input validation and sanitization via `express-validator` & `express-mongo-sanitize`
- Rate limiting to prevent brute-force attacks (`express-rate-limit`)
- HTTP security headers via `helmet`
- Password hashing with `bcrypt` (10 salt rounds)
- Protected API routes with `authMiddleware` and `roleMiddleware`
- Centralized error handler with user-friendly messages for DB errors

### 👨‍💼 Admin Features
- 📊 Interactive dashboard with animated count-up statistics
- 👥 Full CRUD for Students, Teachers, Classes, and Subjects
- 📢 Create and broadcast notices to the entire school
- 💬 View and manage student complaints
- 📄 **Export reports to PDF & Excel** (Teachers, Students, Subjects, Classes)
- 📈 **Subject-wise Attendance Analysis** — Detailed student attendance reports with percentage tracking
- 🗑️ Bulk delete with cascade protection (students → complaints, classes → subjects → teachers)
- 📈 Bar charts and pie charts for performance overview

### 👨‍🏫 Teacher Features
- 📋 Class and subject management dashboard
- ✅ Attendance tracking with session-based system
- 📝 Grade submission and exam result management
- 📊 Student performance analytics with charts
- 👤 Profile management with secure password updates

### 👨‍🎓 Student Features
- 👤 Personal profile management (DOB, gender, contact info)
- 📅 View attendance records with percentage calculations
- 📊 Check exam results and performance trends
- 💬 Submit complaints and feedback
- 📈 Interactive performance charts (bar & pie)

### 🎨 Design System (Glassmorphism V3)
- **GlassCard** components with frosted-glass backdrop blur
- **Animated gradient backgrounds** (14s infinite shift)
- **Dark / Light mode** toggle with full theme persistence
- **Custom button palette**: `PurpleButton`, `GreenButton`, `BlueButton`, `RedButton`, `LightPurpleButton`
- **Styled table components** with branded header rows
- **Smooth micro-animations**: hover effects, shake validation, fade-slide-up
- **Typography**: Poppins (headings) + Inter (body)
- **Consistent color system**: `#7f56da` (primary), `#06b6d4` (accent)

### 📊 Data & Reporting
- One-click **PDF export** with branded headers, footers, and styled tables
- One-click **Excel export** with auto-fitted column widths
- Dynamic attendance system (no session limits)
- Accurate percentage calculations
- Data integrity with referential cascade deletes
- **Optimized MongoDB queries** with selective population and compound indexes
- Optimized performance for large datasets

---

# 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with functional components & hooks |
| **Material-UI (MUI) 5** | Component library & design system |
| **Redux Toolkit** | Global state management |
| **React Router 6** | Client-side routing |
| **Recharts** | Interactive data visualization |
| **Axios** | HTTP client |
| **jsPDF + autoTable** | PDF report generation |
| **SheetJS (xlsx)** | Excel report generation |
| **Styled Components** | CSS-in-JS theming |
| **React CountUp** | Animated statistics |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment (ES Modules) |
| **Express.js 4** | Web framework |
| **MongoDB + Mongoose 7** | NoSQL database & ODM |
| **JWT** | Stateless authentication |
| **Bcrypt** | Password hashing |
| **Helmet** | HTTP security headers |
| **Express Validator** | Request validation |
| **Express Rate Limit** | API abuse prevention |
| **Express Mongo Sanitize** | NoSQL injection prevention |
| **Winston** | Structured logging |

---

# 📁 Project Structure

```
SchoolSync/
├── backend/
│   ├── constants/          # Role constants & enums
│   ├── controllers/        # Request handlers (7 controllers)
│   │   ├── admin-controller.js
│   │   ├── class-controller.js
│   │   ├── complain-controller.js
│   │   ├── notice-controller.js
│   │   ├── student_controller.js
│   │   ├── subject-controller.js
│   │   └── teacher-controller.js
│   ├── middleware/          # Express middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── roleMiddleware.js    # RBAC enforcement
│   │   ├── errorHandler.js      # Centralized error handling
│   │   └── validators.js        # Input validation rules
│   ├── models/             # Mongoose schemas (7 models)
│   ├── routes/             # API route definitions
│   └── index.js            # Entry point (Helmet, CORS, rate limit)
├── frontend/
│   └── src/
│       ├── components/     # Shared UI components
│       │   ├── GlassCard.js         # Glassmorphism card wrapper
│       │   ├── ThemeToggle.js       # Dark/Light mode switch
│       │   ├── Loading.js           # Unified loading indicator
│       │   ├── ErrorBoundary.js     # React error boundary
│       │   ├── CustomBarChart.js    # Themed bar charts
│       │   ├── CustomPieChart.js    # Themed pie charts
│       │   ├── RecentActivity.js    # Dashboard activity feed
│       │   ├── buttonStyles.js      # Themed button components
│       │   └── styles.js            # Styled table components
│       ├── pages/          # Route-level page components
│       │   ├── admin/      # Admin dashboard & management pages
│       │   ├── student/    # Student dashboard & features
│       │   └── teacher/    # Teacher dashboard & features
│       ├── redux/          # Redux Toolkit slices & async thunks
│       ├── utils/          # Utility functions
│       │   ├── reportUtils.js   # PDF & Excel export
│       │   └── validation.js    # Client-side validation
│       └── constants/      # Role constants
└── README.md
```

---

# 🔌 API Endpoints

### Authentication & Admin
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/AdminReg` | Register a new admin/school |
| POST | `/AdminLogin` | Admin login |
| GET | `/Admin/:id` | Get admin details |
| PUT | `/Admin/:id` | Update admin profile |

### Students
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/StudentReg` | Register a student |
| POST | `/StudentLogin` | Student login |
| GET | `/Students/:id` | Get all students for a school |
| GET | `/Student/:id` | Get single student detail |
| DELETE | `/Students/:id` | Delete all students for a school |
| DELETE | `/Student/:id` | Delete a student |
| DELETE | `/StudentsClass/:id` | Delete all students in a class |
| PUT | `/Student/:id` | Update student details |
| PUT | `/UpdateExamResult/:id` | Update exam marks |
| PUT | `/StudentAttendance/:id` | Update attendance |
| PUT | `/RemoveAllStudentsSubAtten/:id` | Clear attendance by subject |
| PUT | `/RemoveAllStudentsAtten/:id` | Clear all attendance |
| PUT | `/RemoveStudentSubAtten/:id` | Remove student's subject attendance |
| PUT | `/RemoveStudentAtten/:id` | Remove student's all attendance |
| GET | `/AttendanceReport/:id` | **Generate subject-wise attendance report** |

### Teachers
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/TeacherReg` | Register a teacher |
| POST | `/TeacherLogin` | Teacher login |
| GET | `/Teachers/:id` | Get all teachers for a school |
| GET | `/Teacher/:id` | Get single teacher detail |
| DELETE | `/Teacher/:id` | Delete a teacher |
| DELETE | `/Teachers/:id` | Delete all teachers for a school |
| DELETE | `/TeachersClass/:id` | Delete all teachers in a class |
| PUT | `/TeacherSubject` | Update teacher's subject |
| PUT | `/Teacher/:id` | Update teacher profile |
| POST | `/TeacherAttendance/:id` | Record teacher attendance |

### Classes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/SclassCreate` | Create a new class |
| GET | `/SclassList/:id` | Get all classes for a school |
| GET | `/Sclass/:id` | Get single class detail |
| GET | `/Sclass/Students/:id` | Get all students in a class |
| GET | `/Sclass/Teachers/:id` | Get all teachers in a class |
| DELETE | `/Sclass/:id` | Delete a class (cascade) |
| DELETE | `/Sclasses/:id` | Delete all classes (cascade) |

### Subjects
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/SubjectCreate` | Add subjects (bulk) |
| GET | `/AllSubjects/:id` | Get all subjects for a school |
| GET | `/ClassSubjects/:id` | Get subjects for a class |
| GET | `/FreeSubjectList/:id` | Get unassigned subjects |
| GET | `/Subject/:id` | Get subject details |
| DELETE | `/Subject/:id` | Delete a subject |
| DELETE | `/Subjects/:id` | Delete all subjects |
| DELETE | `/SubjectsClass/:id` | Delete subjects by class |

### Notices & Complaints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/NoticeCreate` | Create a notice |
| GET | `/NoticeList/:id` | Get notices for a school |
| DELETE | `/Notices/:id` | Delete all notices |
| DELETE | `/Notice/:id` | Delete a specific notice |
| PUT | `/Notice/:id` | Update a notice |
| POST | `/ComplainCreate` | Submit a complaint |
| GET | `/ComplainList/:id` | Get complaints for a school |

---

# 🗄️ Database Schema

### Admin
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Unique, Required |
| `password` | String | Required, bcrypt hashed |
| `role` | String | Default: `"Admin"` |
| `schoolName` | String | Unique, Required |

### Student
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `rollNum` | Number | Required |
| `password` | String | Required, bcrypt hashed |
| `sclassName` | ObjectId | Ref: **Sclass** |
| `school` | ObjectId | Ref: **Admin** |
| `role` | String | Default: `"Student"` |
| `dob` | Date | Optional |
| `gender` | String | Optional |
| `email` | String | Optional |
| `phone` | String | Optional |
| `address` | String | Optional |
| `emergencyContact` | String | Optional |
| `attendance` | Array | `{ date, status, subName }` |
| `examResult` | Array | `{ subName, marksObtained }` |

### Teacher
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Unique, Required |
| `password` | String | Required, bcrypt hashed |
| `role` | String | Default: `"Teacher"` |
| `school` | ObjectId | Ref: **Admin** |
| `teachSubject` | ObjectId | Ref: **Subject** |
| `teachSclass` | ObjectId | Ref: **Sclass** |
| `attendance` | Array | `{ date, status }` |

### Subject
| Field | Type | Notes |
|-------|------|-------|
| `subName` | String | Required |
| `subCode` | String | Required |
| `sessions` | String | Required |
| `examDate` | Date | Required |
| `sclassName` | ObjectId | Ref: **Sclass** |
| `school` | ObjectId | Ref: **Admin** |
| `teacher` | ObjectId | Ref: **Teacher** |

### Sclass (Class)
| Field | Type | Notes |
|-------|------|-------|
| `sclassName` | String | Required |
| `school` | ObjectId | Ref: **Admin** |

### Notice
| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `details` | String | Required |
| `date` | Date | Required |
| `school` | ObjectId | Ref: **Admin** |

### Complain
| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId | Ref: **Student** |
| `complaint` | String | Required |
| `date` | Date | Required |
| `school` | ObjectId | Ref: **Admin** |

---

# 🚀 Deployment

## Backend Deployment (Render)

1. **Prepare Your Repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://render.com/)
   - Click **New** → **Web Service**
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `schoolsync-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

4. **Environment Variables**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/smsproject
   SECRET_KEY=your-production-secret-key
   PORT=5000
   ```

5. **Deploy** → Copy your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Vercel)

1. **Update** `frontend/.env` with your production backend URL:
   ```env
   REACT_APP_BASE_URL=https://your-backend.onrender.com
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/)
   - Click **Add New** → **Project** → Import repo

3. **Configure**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**
   ```
   REACT_APP_BASE_URL=https://your-backend.onrender.com
   ```

5. **Deploy** → Your app will be live at `https://your-app.vercel.app`

### Alternative: Netlify

1. Connect repository → Set **Base directory**: `frontend`
2. **Build command**: `npm run build` → **Publish directory**: `frontend/build`
3. Add env variable: `REACT_APP_BASE_URL`

---

# 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style (ES Modules, functional components)
- Use the established design system (`GlassCard`, themed buttons)
- Write meaningful commit messages
- Test your changes thoroughly
- Ensure all validations pass
- Update documentation as needed

---

# 📝 License

This project is open source and available for educational purposes.

---

# 👨‍💻 Author

**Gopal Kumar Singh**
- LinkedIn: [@mejustgopal](https://www.linkedin.com/in/mejustgopal/)
- GitHub: [@mejustgopal](https://github.com/mejustgopal)

---

# 🙏 Acknowledgments

- Built with ❤️ using the MERN stack
- UI components from [Material-UI](https://mui.com/)
- Icons from [Material Icons](https://fonts.google.com/icons)
- Charts powered by [Recharts](https://recharts.org/)
- PDF generation by [jsPDF](https://github.com/parallax/jsPDF)
- Excel export by [SheetJS](https://sheetjs.com/)

---

<p align="center">
  Made with ❤️ for better education management
</p>
