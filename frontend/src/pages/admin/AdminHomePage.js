import React, { useMemo, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material'
import RecentActivity from '../../components/RecentActivity';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import CountUp from 'react-countup';
import GlassCard from '../../components/GlassCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
const statCards = [
    { label: 'Total Students', Icon: PeopleAltIcon,              accent: '#7f56da', countKey: 'students', duration: 2.5, prefix: '' },
    { label: 'Total Classes',  Icon: ClassIcon,                   accent: '#06b6d4', countKey: 'classes',  duration: 5,   prefix: '' },
    { label: 'Total Teachers', Icon: SchoolIcon,                  accent: '#10b981', countKey: 'teachers', duration: 2.5, prefix: '' },
];

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList }  = useSelector((state) => state.sclass);
    const { teachersList }  = useSelector((state) => state.teacher);
    const { currentUser }   = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const counts = {
        students: studentsList?.length ?? 0,
        classes:  sclassesList?.length ?? 0,
        teachers: teachersList?.length ?? 0,
    };

    const classDistributionData = useMemo(() => {
        if (!studentsList || studentsList.length === 0) return [];
        const distribution = {};
        studentsList.forEach(student => {
            const className = student.sclassName?.sclassName || "Unassigned";
            distribution[className] = (distribution[className] || 0) + 1;
        });
        return Object.entries(distribution).map(([name, count]) => ({
            name,
            students: count
        }));
    }, [studentsList]);

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3, fontWeight: 700,
                        background: 'linear-gradient(135deg, #7f56da 0%, #06b6d4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Dashboard Overview
                </Typography>

                <Grid container spacing={3}>
                    {statCards.map(({ label, Icon, accent, countKey, duration, prefix }) => (
                        <Grid item xs={12} sm={6} md={4} key={label}>
                            <GlassCard sx={{
                                height: '100%', p: 3,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                borderTop: `3px solid ${accent}`,
                            }}>
                                <Box sx={{
                                    mb: 2, p: 1.5, borderRadius: '50%',
                                    background: `${accent}22`,
                                    boxShadow: `0 4px 14px ${accent}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Icon sx={{ fontSize: 36, color: accent }} />
                                </Box>
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: '0.95rem', textAlign: 'center' }}>
                                    {label}
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: accent }}>
                                    {prefix}<CountUp start={0} end={counts[countKey]} duration={duration} separator="," />
                                </Typography>
                            </GlassCard>
                        </Grid>
                    ))}

                    <Grid item xs={12} md={8}>
                        <GlassCard sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, pl: 1, color: 'text.primary' }}>
                                Class Distribution
                            </Typography>
                            <Box sx={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={classDistributionData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(127,86,218,0.1)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888'}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} dx={-10} />
                                        <RechartsTooltip 
                                            cursor={{fill: 'rgba(127,86,218,0.05)'}} 
                                            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }} 
                                        />
                                        <Bar dataKey="students" radius={[8, 8, 0, 0]}>
                                            {classDistributionData.map((entry, index) => {
                                                const colors = ['#7f56da', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
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
    );
};

export default AdminHomePage;