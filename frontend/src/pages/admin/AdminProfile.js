import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { underControl } from '../../redux/userRelated/userSlice';
import { Typography, Grid, Box, Avatar, Container, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@mui/material';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';
import { PurpleButton } from '../../components/buttonStyles';
import Popup from '../../components/Popup';
import Loading from '../../components/Loading';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { currentUser, response, error, status } = useSelector((state) => state.user);
    const address = ROLE_CONSTANTS.ADMIN;

    const [open, setOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        schoolName: currentUser?.schoolName || '',
        password: '',
    });

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    useEffect(() => {
        dispatch(underControl());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'success') {
            setMessage("Profile Updated Successfully");
            setShowPopup(true);
            dispatch(underControl());
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, dispatch]);

    const handleOpen = () => {
        setFormData({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            schoolName: currentUser?.schoolName || '',
            password: '',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const dataToSubmit = { ...formData };
        if (!dataToSubmit.password || dataToSubmit.password.trim() === '') {
            delete dataToSubmit.password;
        }

        dispatch(updateUser(dataToSubmit, currentUser._id, address));
        setOpen(false);
    };

    if (!currentUser) {
        return <Loading />;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <GlassCard sx={{ mb: 4, p: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center">
                            <Avatar alt="Admin Avatar" sx={{ width: 160, height: 160, fontSize: '4rem', bgcolor: 'primary.main', boxShadow: '0 4px 20px rgba(127,86,218,0.4)', fontWeight: 700 }}>
                                {String(currentUser.name).charAt(0)}
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                    {currentUser.name}
                                </Typography>
                                <PurpleButton variant="contained" onClick={handleOpen} sx={{ borderRadius: 8, px: 3, fontWeight: 700 }}>
                                    Edit Profile
                                </PurpleButton>
                            </Box>
                            
                            <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                <span style={{ color: '#888', fontWeight: 400 }}>Role:</span> Admin
                            </Typography>
                            
                            <Box sx={{ p: 3, mt: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Email Address</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600, overflowWrap: 'break-word' }}>{currentUser.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">School</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentUser.schoolName}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </GlassCard>

            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 2,
                        minWidth: 400
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pb: 1 }}>Edit Your Profile</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                        Update your administrator details.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="schoolName"
                        label="School Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.schoolName}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="New Password (Leave blank to keep current)"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 8, px: 3 }}>
                        Cancel
                    </Button>
                    <PurpleButton onClick={handleSubmit} variant="contained" sx={{ borderRadius: 8, px: 3 }}>
                        Save Changes
                    </PurpleButton>
                </DialogActions>
            </Dialog>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AdminProfile;
