<h1 align="center">
    🎓 SCHOOLSYNC
</h1>

<h3 align="center">
A modern, full-stack MERN application for comprehensive school management.<br>
Streamline class organization, track attendance, assess performance, and facilitate seamless communication.<br>
Built with security, scalability, and user experience in mind.
</h3>

<p align="center">
    <a href="https://www.linkedin.com/in/mejustgopal/">LinkedIn</a> • 
    <a href="#features">Features</a> • 
    <a href="#-quick-start">Quick Start</a> • 
    <a href="#-api-endpoints">API</a>
</p>

---

## ✨ Highlights

- 🎨 **Modern Glassmorphism UI** - Beautiful, responsive design with smooth animations
- 🔐 **Enterprise-Grade Security** - JWT authentication, input validation, rate limiting
- 📊 **Real-time Analytics** - Interactive charts and performance dashboards
- 🚀 **Production-Ready** - Comprehensive error handling and logging
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

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

This will start both services:
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
   - 📚 Add Subjects
   - 👨‍🏫 Register Teachers
   - 👨‍🎓 Enroll Students

### User Roles
- **Admin**: Full system access, manage all entities
- **Teacher**: Manage assigned classes, mark attendance, grade students
- **Student**: View profile, attendance, grades, and submit complaints

---

# 💡 About

The School Management System is a comprehensive web application built with the MERN stack, designed to digitize and streamline educational institution management. It provides role-based access control, real-time data visualization, and an intuitive interface for all stakeholders.

## Features

### 🔐 Security & Authentication
- JWT-based authentication with secure token management
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting to prevent abuse
- Password hashing with bcrypt
- Protected routes and API endpoints

### 👨‍💼 Admin Features
- Complete dashboard with analytics
- Manage students, teachers, classes, and subjects
- Create and broadcast notices
- View and respond to complaints
- Generate reports and statistics
- Bulk operations support

### 👨‍🏫 Teacher Features
- Class and subject management
- Attendance tracking with session-based system
- Grade submission and performance tracking
- Student performance analytics
- Communication with students

### 👨‍🎓 Student Features
- Personal profile management (DOB, gender, contact info)
- View attendance records with percentage calculations
- Check exam results and performance trends
- Submit complaints and feedback
- Interactive performance charts

### 🎨 UI/UX Enhancements
- Modern glassmorphism design
- Smooth animations and transitions
- Responsive layout for all devices
- Consistent color scheme and typography
- Loading states and error handling
- Toast notifications for user feedback

### 📊 Data Management
- Dynamic attendance system (no session limits)
- Accurate percentage calculations
- Data integrity with referential checks
- Cascade delete protection
- Optimized database queries

## Technologies Used

### Frontend
- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Styled Components** - CSS-in-JS

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Express Rate Limit** - API protection
- **Winston** - Logging

---

# 📁 Project Structure

```bash
├── backend/                # Server side logic
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── index.js            # Entry point
├── frontend/               # Client side logic
│   ├── src/
│   │   ├── pages/          # View components
│   │   ├── redux/          # State management
│   │   └── components/     # Shared UI components
└── README.md
```

# 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/AdminReg` | Register a new Admin |
| **POST** | `/AdminLogin` | Admin Login |
| **POST** | `/TeacherReg` | Register a new Teacher |
| **POST** | `/StudentReg` | Register a new Student |
| **GET** | `/SclassList/:id` | Get all classes |
| **GET** | `/NoticeList/:id` | Get all notices |

---

# 🗄️ Database Schema

### Admin
- `name`: String (Required)
- `email`: String (Unique, Required)
- `password`: String (Required)
- `role`: String (Default: "Admin")
- `schoolName`: String (Unique, Required)

### Student
- `name`: String (Required)
- `rollNum`: Number (Required)
- `password`: String (Required)
- `sclassName`: ObjectId (Ref: **Sclass**)
- `school`: ObjectId (Ref: **Admin**)
- `role`: String (Default: "Student")
- `dob`: Date
- `gender`: String
- `email`: String (optional updateable field)
- `phone`: String
- `address`: String
- `emergencyContact`: String
- `attendance`: Array of objects { date, status, subName }
- `examResult`: Array of objects { subName, marksObtained }

### Teacher
- `name`: String (Required)
- `email`: String (Unique, Required)
- `password`: String (Required)
- `role`: String (Default: "Teacher")
- `school`: ObjectId (Ref: **Admin**)
- `teachSubject`: ObjectId (Ref: **Subject**)
- `teachSclass`: ObjectId (Ref: **Sclass**)

### Subject
- `subName`: String (Required)
- `subCode`: String (Required)
- `sessions`: String (Required)
- `sclassName`: ObjectId (Ref: **Sclass**)
- `school`: ObjectId (Ref: **Admin**)
- `teacher`: ObjectId (Ref: **Teacher**)

### Sclass (Class)
- `sclassName`: String (Required)
- `school`: ObjectId (Ref: **Admin**)

### Notice
- `title`: String (Required)
- `details`: String (Required)
- `date`: Date (Required)
- `school`: ObjectId (Ref: **Admin**)

### Complain
- `user`: ObjectId (Ref: **Student**)
- `complaint`: String (Required)
- `date`: Date (Required)
- `school`: ObjectId (Ref: **Admin**)

---

# 📡 Full API Reference

### Authentication & Admin
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/AdminReg` | Register a new admin/school |
| POST | `/AdminLogin` | Admin login |
| GET | `/Admin/:id` | Get admin details |

### Students
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/StudentReg` | Register a student |
| POST | `/StudentLogin` | Student login |
| GET | `/Students/:id` | Get all students for a school |
| GET | `/Student/:id` | Get single student detail |
| DELETE | `/Students/:id` | Delete a student |
| DELETE | `/StudentsClass/:id` | Delete all students in a class |
| PUT | `/Student/:id` | Update student details |
| PUT | `/UpdateExamResult/:id` | Update exam marks |
| PUT | `/StudentAttendance/:id` | Update attendance |

### Teachers
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/TeacherReg` | Register a teacher |
| POST | `/TeacherLogin` | Teacher login |
| GET | `/Teachers/:id` | Get all teachers for a school |
| GET | `/Teacher/:id` | Get single teacher detail |
| DELETE | `/Teachers/:id` | Delete a teacher |
| DELETE | `/TeachersClass/:id` | Delete all teachers in a class |
| PUT | `/TeacherSubject` | Update teacher's subject |

### Classes (Sclass)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/SclassCreate` | Create a new class |
| GET | `/SclassList/:id` | Get all classes for a school |
| GET | `/Sclass/:id` | Get single class detail |
| GET | `/Sclass/Students/:id` | Get all students in a class |
| DELETE | `/Sclasses/:id` | Delete a class |

### Subjects
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/SubjectCreate` | Add a new subject |
| GET | `/AllSubjects/:id` | Get all subjects for a school |
| GET | `/ClassSubjects/:id` | Get subjects for a specific class |
| GET | `/FreeSubjectList/:id` | Get subjects without a teacher |
| GET | `/Subject/:id` | Get subject details |
| DELETE | `/Subject/:id` | Delete a subject |
| DELETE | `/SubjectsClass/:id` | Delete subjects by class |

### Notices & Complains
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/NoticeCreate` | Create a notice |
| GET | `/NoticeList/:id` | Get notices for a school |
| DELETE | `/Notices/:id` | Delete all notices |
| DELETE | `/Notice/:id` | Delete a specific notice |
| POST | `/ComplainCreate` | Submit a complaint |
| GET | `/ComplainList/:id` | Get complaints for a school |

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
   - **Name**: `school-management-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

4. **Environment Variables**
   Add the following in the Render dashboard:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/smsproject
   SECRET_KEY=your-production-secret-key
   PORT=5000
   ```

5. **Deploy**
   - Click **Create Web Service**
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Vercel)

1. **Prepare Frontend**
   - Update `frontend/.env` with your production backend URL:
   ```env
   REACT_APP_BASE_URL=https://your-backend.onrender.com
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/)
   - Click **Add New** → **Project**
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**
   ```
   REACT_APP_BASE_URL=https://your-backend.onrender.com
   ```

5. **Deploy**
   - Click **Deploy**
   - Your app will be live at `https://your-app.vercel.app`

## Alternative: Netlify Deployment

For frontend deployment on Netlify:
1. Connect repository to Netlify
2. Set **Base directory**: `frontend`
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `frontend/build`
5. Add environment variable: `REACT_APP_BASE_URL`

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

## Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all validations pass

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
- UI components from Material-UI
- Icons from Material Icons
- Charts powered by Recharts

---

<p align="center">
  Made with ❤️ for better education management
</p>
