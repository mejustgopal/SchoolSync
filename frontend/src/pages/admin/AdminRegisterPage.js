import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';
import { validateEmail, validatePassword } from '../../utils/validation';

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = ROLE_CONSTANTS.ADMIN

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }

        const passwordCheck = validatePassword(password);
        if (!passwordCheck.isValid) {
            setPasswordError(true);
            setMessage(passwordCheck.message);
            setShowPopup(true);
            return;
        }

        const fields = { name, email, password, role, schoolName }
        setLoader(true)
        dispatch(registerUser(fields, role))
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === ROLE_CONSTANTS.ADMIN)) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage(error)
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <RootContainer>
            <CssBaseline />
            <GlassCard sx={{ maxWidth: 500, width: '100%', mx: 2, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                    Admin Registration
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                    Create your school administration account
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="adminName"
                        label="Your Name"
                        name="adminName"
                        autoComplete="name"
                        autoFocus
                        error={adminNameError}
                        className={adminNameError ? "shake" : ""}
                        helperText={adminNameError && 'Name is required'}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="schoolName"
                        label="School Name"
                        name="schoolName"
                        autoComplete="off"
                        error={schoolNameError}
                        className={schoolNameError ? "shake" : ""}
                        helperText={schoolNameError && 'School name is required'}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={emailError}
                        className={emailError ? "shake" : ""}
                        helperText={emailError && 'Email is required'}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={toggle ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        error={passwordError}
                        className={passwordError ? "shake" : ""}
                        helperText={passwordError && 'Password is required'}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setToggle(!toggle)}>
                                        {toggle ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 1 }}>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </Grid>

                    <LightPurpleButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loader ? "Registering..." : "Register"}
                    </LightPurpleButton>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <StyledLink to="/Adminlogin" style={{ fontWeight: 600 }}>
                                Log in
                            </StyledLink>
                        </Typography>
                    </Box>
                </Box>
            </GlassCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </RootContainer>
    );
}

export default AdminRegisterPage

const RootContainer = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, #121212 0%, #2c2143 100%)`
        : `linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)`,
    padding: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    }
}));
