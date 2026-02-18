import React, { useState, useEffect } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout, underControl } from '../../redux/userRelated/userSlice';
import { Button, Collapse, Grid, TextField, Box, Typography } from '@mui/material';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';
import Popup from '../../components/Popup';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentUser, response, error, status } = useSelector((state) => state.user);
    const address = ROLE_CONSTANTS.ADMIN

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (response) { console.log(response) } else if (error) { console.log(error) }

    // Removed console.log for production

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser(fields, currentUser._id, address))
    }

    useEffect(() => {
        dispatch(underControl());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'success') {
            setMessage("Profile Updated Successfully");
            setShowPopup(true);
            dispatch(underControl()); // Reset status after showing popup
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, dispatch]);

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            // Removed console.error for production
        }
    }

    return (
        <Box sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
            <GlassCard sx={{ p: 4, mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Admin Profile
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                        <Typography variant="h6">{currentUser.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                        <Typography variant="h6" sx={{ overflowWrap: 'break-word' }}>{currentUser.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">School</Typography>
                        <Typography variant="h6">{currentUser.schoolName}</Typography>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    sx={styles.showButton}
                    onClick={() => setShowTab(!showTab)}
                    endIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                >
                    {buttonText}
                </Button>
            </GlassCard>

            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <GlassCard sx={{ p: 4 }}>
                    <form onSubmit={submitHandler}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                            Edit Details
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    autoComplete="name"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="School"
                                    variant="outlined"
                                    value={schoolName}
                                    onChange={(event) => setSchoolName(event.target.value)}
                                    autoComplete="organization"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="email"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="new-password"
                                    placeholder="Leave blank to keep current password"
                                    helperText="Only fill this if you want to change your password"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    sx={{ ...styles.showButton, minWidth: 150 }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </GlassCard>
            </Collapse>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    )
}

export default AdminProfile

const styles = {
    showButton: {
        backgroundColor: "#550080",
        "&:hover": {
            backgroundColor: "#7f56da",
        },
        color: 'white',
        borderRadius: 2
    }
}