import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Box, Container, Typography, Backdrop, CircularProgress } from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import { styled as muiStyled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ 
          mb: 6, 
          fontWeight: 'bold',
          color: 'text.primary',
          animation: `${fadeInUp} 1s ease-out`
        }}>
          Select User Type
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <UserCard>
                <div className="icon">
                  <AccountCircle sx={{ fontSize: 80, color: '#7f56da' }} />
                </div>
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Admin
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Login as an administrator to access the dashboard to manage app data.
                </Typography>
              </UserCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")}>
              <UserCard>
                <div className="icon">
                  <School sx={{ fontSize: 80, color: '#7f56da' }} />
                </div>
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Student
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Login as a student to explore course materials and assignments.
                </Typography>
              </UserCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Teacher")}>
              <UserCard>
                <div className="icon">
                  <Group sx={{ fontSize: 80, color: '#7f56da' }} />
                </div>
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Teacher
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Login as a teacher to create courses, assignments, and track student progress.
                </Typography>
              </UserCard>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = muiStyled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #121212 0%, #2c2143 100%)' : 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)',
  padding: '20px',
}));

// Recreating GlassCard effect locally as styled-component or use import if easier. 
// Using MUI styled for consistent theme access within the file mostly


const UserCard = muiStyled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 20,
  cursor: 'pointer',
  background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    '& .icon': {
        transform: 'scale(1.1)',
    }
  },
  '& .icon': {
      transition: 'transform 0.3s ease',
      marginBottom: theme.spacing(2),
  }
}));