import React, { useState } from 'react';
import { Typography, Grid, Box, Avatar, Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import GlassCard from '../../components/GlassCard';
import { PurpleButton } from '../../components/buttonStyles';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { ROLE_CONSTANTS } from '../../constants';

const TeacherProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        password: '',
    });

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const teachSclass = currentUser.teachSclass;
    const teachSubject = currentUser.teachSubject;
    const teachSchool = currentUser.school;

    const handleOpen = () => {
        setFormData({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
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
        dispatch(updateUser(formData, currentUser._id, ROLE_CONSTANTS.TEACHER));
        setOpen(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <GlassCard sx={{ mb: 4, p: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center">
                            <Avatar alt="Teacher Avatar" sx={{ width: 160, height: 160, fontSize: '4rem', bgcolor: 'primary.main', boxShadow: '0 4px 20px rgba(127,86,218,0.4)', fontWeight: 700 }}>
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
                                <span style={{ color: '#888', fontWeight: 400 }}>Role:</span> Teacher
                            </Typography>
                            
                            <Box sx={{ p: 3, mt: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Email Address</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentUser.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">School</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{teachSchool?.schoolName}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Assigned Class</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{teachSclass?.sclassName || "Unassigned"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="text.secondary">Assigned Subject</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{teachSubject?.subName || "Unassigned"}</Typography>
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
                        Update your display name and login email.
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
        </Container>
    );
};

export default TeacherProfile;