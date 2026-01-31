import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import GlassCard from '../../components/GlassCard';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Students} alt="Students" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Class Students
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfStudents} duration={2.5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Lessons} alt="Lessons" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Lessons
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfSessions} duration={5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Tests} alt="Tests" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Tests Taken
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={24} duration={4} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Time} alt="Time" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Hours
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={30} duration={4} suffix="hrs" />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12}>
                        <GlassCard sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </GlassCard>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TeacherHomePage