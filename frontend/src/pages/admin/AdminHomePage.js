import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import CountUp from 'react-countup';
import GlassCard from '../../components/GlassCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

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
                                Total Students
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfStudents} duration={2.5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Classes} alt="Classes" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Classes
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfClasses} duration={5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Teachers} alt="Teachers" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Teachers
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfTeachers} duration={2.5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Fees} alt="Fees" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Fees Collection
                            </Typography>
                            <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                                $<CountUp start={0} end={23000} duration={2.5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <GlassCard sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </GlassCard>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AdminHomePage