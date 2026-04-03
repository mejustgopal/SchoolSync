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
import { GlobalStyles } from '@mui/material';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  const { darkMode } = useSelector((state) => state.theme);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#c4b5fd' : '#7f56da',
        dark: darkMode ? '#a78bfa' : '#550080',
        light: darkMode ? '#ddd6fe' : '#a78bfa',
      },
      secondary: {
        main: '#06b6d4',
        dark: '#0891b2',
        light: '#67e8f9',
      },
      background: {
        default: darkMode ? '#0f0d1a' : '#f3f0ff',
        paper: darkMode ? '#1a1730' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f1f0ff' : '#1e1b2e',
        secondary: darkMode ? '#9e9eb8' : '#6b5e8e',
      },
      action: {
        active: darkMode ? '#e0e0e0' : 'rgba(0, 0, 0, 0.54)',
        hover: darkMode ? 'rgba(127, 86, 218, 0.1)' : 'rgba(127, 86, 218, 0.06)',
      },
    },
    typography: {
       fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
       h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 800 },
       h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
       h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
       h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
       h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
       h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
       button: { fontFamily: '"Poppins", sans-serif', fontWeight: 600, textTransform: 'none' },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
             color: darkMode ? '#c4b5fd' : '#7f56da',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 6px 16px rgba(127,86,218,0.25)',
            },
            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
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
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7f56da',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7f56da',
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
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
            body: {
              transition: 'background-color 0.4s, color 0.3s',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(-45deg, #0f0d1a, #1a1730, #0c1445, #1a1730)'
                : 'linear-gradient(-45deg, #f3f0ff, #e8e4ff, #e0f2fe, #f0fdf4)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 14s ease infinite',
              minHeight: '100vh',
            },
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

        {/* Global floating dark mode toggle — visible on ALL pages */}
        <ThemeToggle />
      </Router>
    </ThemeProvider>
  )
}

export default App