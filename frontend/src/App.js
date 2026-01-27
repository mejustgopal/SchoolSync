import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import { ROLE_CONSTANTS } from './constants';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser />} />

          <Route path="/Adminlogin" element={<LoginPage role={ROLE_CONSTANTS.ADMIN} />} />
          <Route path="/Studentlogin" element={<LoginPage role={ROLE_CONSTANTS.STUDENT} />} />
          <Route path="/Teacherlogin" element={<LoginPage role={ROLE_CONSTANTS.TEACHER} />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentRole === ROLE_CONSTANTS.ADMIN &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === ROLE_CONSTANTS.STUDENT &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === ROLE_CONSTANTS.TEACHER &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App