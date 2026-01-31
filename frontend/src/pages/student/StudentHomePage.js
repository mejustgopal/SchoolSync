import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser?.sclassName?._id

    // const classID = currentUser.sclassName._id

    useEffect(() => {
        if (currentUser?._id && classID) {
            dispatch(getUserDetails(currentUser._id, ROLE_CONSTANTS.STUDENT));
            dispatch(getSubjectList(classID, "ClassSubjects"));
        }
    }, [dispatch, currentUser?._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Subject} alt="Subjects" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Subjects
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={numberOfSubjects} duration={2.5} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'rgba(85, 0, 128, 0.1)' }}>
                                <img src={Assignment} alt="Assignments" style={{ width: 40, height: 40 }} />
                            </Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Assignments
                            </Typography>
                            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                <CountUp start={0} end={15} duration={4} />
                            </Typography>
                        </GlassCard>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <GlassCard sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                response ?
                                    <Typography variant="h6">No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6">Loading...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
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

export default StudentHomePage