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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeToggle from './components/ThemeToggle';
import { GlobalStyles } from '@mui/material';

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  const { darkMode } = useSelector((state) => state.theme);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#d8b4fe' : '#550080',
      },
      secondary: {
        main: '#7f56da',
      },
      background: {
        default: darkMode ? '#121212' : '#f0f2f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#fff' : '#2c2143',
        secondary: darkMode ? '#a0a0a0' : '#666',
      },
      action: {
        active: darkMode ? '#e0e0e0' : 'rgba(0, 0, 0, 0.54)',
        hover: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      },
    },
    typography: {
       fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
       h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
       h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
       h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
       h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
       h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 500 },
       h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 500 },
       button: { fontFamily: '"Poppins", sans-serif', fontWeight: 600, textTransform: 'none' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
             color: darkMode ? '#e0e0e0' : 'inherit',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            },
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', 
          },
        },
      },
       MuiTextField: {
         styleOverrides: {
           root: {
             '& .MuiOutlinedInput-root': {
               borderRadius: 12,
             },
           },
         },
       },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
          styles={(theme) => ({
            body: { transition: 'background-color 0.3s, color 0.3s' },
            'input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
              caretColor: theme.palette.text.primary,
              transition: 'background-color 5000s ease-in-out 0s',
            },
            'input:-webkit-autofill:hover': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            },
            'input:-webkit-autofill:focus': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            },
            'input:-webkit-autofill:active': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            },
          })}
      />
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
        <ThemeToggle />
      </Router>
    </ThemeProvider>
  )
}

export default App