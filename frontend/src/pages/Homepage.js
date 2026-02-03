import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={4} sx={{ alignItems: 'center', height: '100%' }}>
                
                {/* Text Content */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: { xs: 2, md: 4 } }}>
                        <Typography 
                            variant="h2" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 800, 
                                background: 'linear-gradient(45deg, #7f56da, #550080)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '2.5rem', md: '3.75rem' } // Responsive font size
                            }}
                        >
                            School Management System
                        </Typography>
                        <StyledText>
                            Streamline your school's operations with our all-in-one platform. 
                            Track attendance, manage marks, and communicate seamlessly.
                        </StyledText>
                        
                        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <StyledLink to="/choose">
                                <LightPurpleButton fullWidth sx={{ fontSize: '1.1rem' }}>
                                    Login to Portal
                                </LightPurpleButton>
                            </StyledLink>

                            <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                                Don't have an account?{' '}
                                <StyledLink to="/Adminregister" style={{ fontWeight: 600, color: '#7f56da' }}>
                                    Sign Up
                                </StyledLink>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Hero Image */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <StyledImage src={Students} alt="students" />
                </Grid>

            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    paddingBottom: theme.spacing(4),
  },
}));

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  filter: theme.palette.mode === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))',
  transition: 'transform 0.3s ease',
  '&:hover': {
      transform: 'scale(1.02)',
  }
}));
