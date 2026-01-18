<h1 align="center">
    SCHOOL MANAGEMENT SYSTEM
</h1>

<h3 align="center">
Streamline school management, class organization, and add students and faculty.<br>
Seamlessly track attendance, assess performance, and provide feedback. <br>
Access records, view marks, and communicate effortlessly.
</h3>

<p align="center">
    <a href="https://www.linkedin.com/in/mejustgopal/">LinkedIn</a>
</p>

---

# 🚀 Quick Start

Get the project running locally in minutes!

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
Open a terminal in the root directory and run:

```bash
npm install
cd backend && npm install
cd frontend && npm install
```

### 3. Environment Setup

**Backend** (`backend/.env`):
```env
MONGO_URL=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/smsproject
SECRET_KEY=secret123key
```
*Note: If your password has special characters like `@`, URL-encode them (e.g., `@` becomes `%40`).*

**Frontend** (`frontend/.env`):
```env
REACT_APP_BASE_URL=http://localhost:5000
```

### 4. Run the App
From the **root directory**, run this single command to start both backend and frontend:

```bash
npm start
```
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

# 🕹️ Usage

**First Run:**
1.  The system starts with no users.
2.  Go to the **Sign Up** page.
3.  Register as an **Admin**.
4.  Once logged in, use the Admin Dashboard to:
    -   Add Classes
    -   Add Subjects
    -   Add Teachers
    -   Add Students

---

# About

The School Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline school management, class organization, and facilitate communication between students, teachers, and administrators.

## Features

- **User Roles:** Admin, Teacher, and Student roles with specific access levels.
- **Admin Dashboard:** Manage students, teachers, classes, subjects, and settings.
- **Attendance Tracking:** Mark and track student attendance.
- **Performance Assessment:** Give marks and feedback; visualize data with charts.
- **Communication:** Messaging system for teachers and students.

## Technologies Used

- **Frontend:** React.js, Material UI, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

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

# Deployment

### Backend (Render)
1.  Push code to GitHub.
2.  Create a **Web Service** on [Render](https://render.com/).
3.  Set **Root Directory** to `backend`.
4.  Build Command: `npm install`
5.  Start Command: `npm start`
6.  Add Environment Variables: `MONGO_URL`, `SECRET_KEY`.

### Frontend (Vercel/Netlify)
1.  Push code to GitHub.
2.  Import project to [Vercel](https://vercel.com/) or Netlify.
3.  Set **Root Directory** to `frontend`.
4.  Build Command: `npm run build`
5.  Output Directory: `build`
6.  Add Environment Variable: `REACT_APP_BASE_URL` (set to your Render backend URL).

---

