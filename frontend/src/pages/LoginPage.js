import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { ROLE_CONSTANTS } from '../constants';
import GlassCard from '../components/GlassCard';
import { validateEmail, validatePassword, validateRollNumber, validateName } from '../utils/validation';

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === ROLE_CONSTANTS.STUDENT) {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            // Validation
            let hasError = false;

            if (!validateRollNumber(rollNum)) {
                setRollNumberError(true);
                hasError = true;
            }

            if (!validateName(studentName)) {
                setStudentNameError(true);
                hasError = true;
            }

            const passwordCheck = validatePassword(password);
            if (!passwordCheck.isValid) {
                setPasswordError(true);
                setMessage(passwordCheck.message);
                setShowPopup(true);
                hasError = true;
            }

            if (hasError) return;

            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            // Validation
            let hasError = false;

            if (!validateEmail(email)) {
                setEmailError(true);
                hasError = true;
            }

            const passwordCheck = validatePassword(password);
            if (!passwordCheck.isValid) {
                setPasswordError(true);
                setMessage(passwordCheck.message);
                setShowPopup(true);
                hasError = true;
            }

            if (hasError) return;

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === ROLE_CONSTANTS.ADMIN) {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === ROLE_CONSTANTS.STUDENT) {
                navigate('/Student/dashboard');
            } else if (currentRole === ROLE_CONSTANTS.TEACHER) {
                navigate('/Teacher/dashboard');
            }
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
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <RootContainer>
            <CssBaseline />
            <GlassCard sx={{ maxWidth: 500, width: '100%', mx: 2, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                    {role} Login
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                    Please enter your details to continue
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    {role === ROLE_CONSTANTS.STUDENT ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="rollNumber"
                                label="Roll Number"
                                name="rollNumber"
                                type="number"
                                autoFocus
                                error={rollNumberError}
                                className={rollNumberError ? "shake" : ""}
                                helperText={rollNumberError && 'Roll Number is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="studentName"
                                label="Name"
                                name="studentName"
                                autoComplete="name"
                                error={studentNameError}
                                className={studentNameError ? "shake" : ""}
                                helperText={studentNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError}
                            className={emailError ? "shake" : ""}
                            helperText={emailError && 'Email is required'}
                            onChange={handleInputChange}
                        />
                    )}
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
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setToggle(!toggle)}
                                        edge="end"
                                    >
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
                        <StyledLink href="#">
                            Forgot password?
                        </StyledLink>
                    </Grid>

                    <LightPurpleButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </LightPurpleButton>

                    {role === ROLE_CONSTANTS.ADMIN &&
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <StyledLink to="/Adminregister" style={{ fontWeight: 600 }}>
                                    Sign up
                                </StyledLink>
                            </Typography>
                        </Box>
                    }
                </Box>
            </GlassCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </RootContainer>
    );
}

export default LoginPage

const RootContainer = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, #121212 0%, #2c2143 100%)`
        : `linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)`, // Light gradient
    padding: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
    }
}));
