import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import GlassCard from '../../../components/GlassCard';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        // Removed console.log for production
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <GlassCard sx={{ padding: '2rem', maxWidth: 600, width: '100%' }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Teacher Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                            <Typography variant="h6">
                                Teacher Name: {teacherDetails?.name}
                            </Typography>
                            <Typography variant="h6">
                                Class Name: {teacherDetails?.teachSclass?.sclassName}
                            </Typography>
                            {isSubjectNamePresent ? (
                                <>
                                    <Typography variant="h6">
                                        Subject Name: {teacherDetails?.teachSubject?.subName}
                                    </Typography>
                                    <Typography variant="h6">
                                        Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                                    </Typography>
                                </>
                            ) : (
                                <Button variant="contained" onClick={handleAddSubject} sx={{ mt: 2 }}>
                                    Add Subject
                                </Button>
                            )}
                        </Box>
                    </GlassCard>
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;