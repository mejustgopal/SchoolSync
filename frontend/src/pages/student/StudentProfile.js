import React, { useState } from 'react';
import { Typography, Grid, Box, Avatar, Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import GlassCard from '../../components/GlassCard';
import { PurpleButton } from '../../components/buttonStyles';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { ROLE_CONSTANTS } from '../../constants';

const StudentProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const sclassName = currentUser.sclassName;
    const studentSchool = currentUser.school;

    const [open, setOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        password: '',
        dob: currentUser?.dob ? new Date(currentUser.dob).toISOString().split('T')[0] : '',
        gender: currentUser?.gender || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        emergencyContact: currentUser?.emergencyContact || '',
    });

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const handleOpen = () => {
        setFormData({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            password: '',
            dob: currentUser?.dob ? new Date(currentUser.dob).toISOString().split('T')[0] : '',
            gender: currentUser?.gender || '',
            phone: currentUser?.phone || '',
            address: currentUser?.address || '',
            emergencyContact: currentUser?.emergencyContact || '',
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
        
        // Don't send empty strings for optional fields if they're empty, to avoid validation errors if any
        const dataToSubmit = { ...formData };
        if (!dataToSubmit.password || dataToSubmit.password.trim() === '') {
            delete dataToSubmit.password;
        }

        dispatch(updateUser(dataToSubmit, currentUser._id, ROLE_CONSTANTS.STUDENT));
        setOpen(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <GlassCard sx={{ mb: 4, p: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center">
                            <Avatar alt="Student Avatar" sx={{ width: 160, height: 160, fontSize: '4rem', bgcolor: 'primary.main', boxShadow: '0 4px 20px rgba(127,86,218,0.4)', fontWeight: 700 }}>
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
                                <span style={{ color: '#888', fontWeight: 400 }}>Role:</span> Student 
                                <span style={{ color: '#888', fontWeight: 400, marginLeft: '8px' }}>| Roll No:</span> {currentUser.rollNum}
                            </Typography>
                            
                            <Box sx={{ p: 3, mt: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Email Address</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentUser.email || "Not Specified"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">School</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{studentSchool?.schoolName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Assigned Class</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{sclassName?.sclassName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Phone Number</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentUser.phone || "Not Specified"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Date of Birth</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentUser.dob ? new Date(currentUser.dob).toLocaleDateString() : "Not Specified"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Emergency Contact</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#ef4444' }}>{currentUser.emergencyContact || "Not Specified"}</Typography>
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
                        minWidth: 450
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pb: 1 }}>Edit Personal Information</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Full Name"
                                fullWidth
                                variant="outlined"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="gender"
                                label="Gender"
                                fullWidth
                                variant="outlined"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                label="Address"
                                fullWidth
                                variant="outlined"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="emergencyContact"
                                label="Emergency Contact"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="New Password (Leave blank to keep current)"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, pt: 2 }}>
                    <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 8, px: 3 }}>
                        Cancel
                    </Button>
                    <PurpleButton onClick={handleSubmit} variant="contained" sx={{ borderRadius: 8, px: 3 }}>
                        Save Changes
                    </PurpleButton>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default StudentProfile;