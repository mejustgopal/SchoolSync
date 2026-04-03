import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import RecentActivity from '../../components/RecentActivity';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
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

    let attendanceBadge = { label: "Unknown", color: "#888", bgcolor: "#8882" };
    if (overallAttendancePercentage >= 85) {
        attendanceBadge = { label: "Excellent Standing", color: "#10b981", bgcolor: "#10b98122", shadow: "0 0 10px #10b98144" };
    } else if (overallAttendancePercentage >= 75) {
        attendanceBadge = { label: "Warning Level", color: "#f59e0b", bgcolor: "#f59e0b22", shadow: "0 0 10px #f59e0b44" };
    } else if (overallAttendancePercentage > 0) {
        attendanceBadge = { label: "Critical Danger", color: "#ef4444", bgcolor: "#ef444422", shadow: "0 0 10px #ef444444" };
    }

    const subjectMarksData = React.useMemo(() => {
        if (!userDetails?.examResult || userDetails.examResult.length === 0) return [];
        return userDetails.examResult.map(result => ({
            subject: result.subName?.subName || "Subject",
            marks: result.marksObtained
        }));
    }, [userDetails]);

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
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
                    <Grid item xs={12} md={8} lg={9}>
                        <GlassCard sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
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
                                                            <Box sx={{
                                                                position: 'absolute', top: 20, right: 20,
                                                                bgcolor: attendanceBadge.bgcolor, color: attendanceBadge.color,
                                                                px: 2, py: 0.8, borderRadius: 2, fontWeight: 700,
                                                                border: `1px solid ${attendanceBadge.color}44`,
                                                                boxShadow: attendanceBadge.shadow
                                                            }}>
                                                                {attendanceBadge.label} ({overallAttendancePercentage.toFixed(1)}%)
                                                            </Box>
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

                    <Grid item xs={12} md={8}>
                        <GlassCard sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, pl: 1, color: 'text.primary' }}>
                                Academic Performance (Marks)
                            </Typography>
                            {subjectMarksData.length > 0 ? (
                                <Box sx={{ width: '100%', height: 350 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={subjectMarksData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(127,86,218,0.1)" />
                                            <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#888'}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} dx={-10} domain={[0, 100]} />
                                            <RechartsTooltip 
                                                cursor={{fill: 'rgba(127,86,218,0.05)'}} 
                                                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }} 
                                            />
                                            <Bar dataKey="marks" radius={[8, 8, 0, 0]}>
                                                {subjectMarksData.map((entry, index) => {
                                                    const colors = ['#7f56da', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                                                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            ) : (
                                <Typography sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>No exam marks recorded yet.</Typography>
                            )}
                        </GlassCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <GlassCard sx={{ p: '24px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                            <RecentActivity />
                        </GlassCard>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default StudentHomePage