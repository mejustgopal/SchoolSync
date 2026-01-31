import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, ROLE_CONSTANTS.STUDENT));
        }
    }, [dispatch, currentUser?._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
                    Attendance Overview
                </Typography>
                
                <GlassCard sx={{ mb: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0, 150, 0, 0.1)' }}>
                    <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }}>
                        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                    </Typography>
                </GlassCard>

                <GlassCard>
                    <Table>
                        <TableHead>
                            <StyledTableRow sx={{ bgcolor: 'rgba(255, 255, 255, 0.05) !important' }}>
                                <StyledTableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Subject</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Present</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Total Sessions</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Attendance %</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                            return (
                                <TableBody key={index}>
                                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell component="th" scope="row" sx={{ color: 'text.secondary' }}>
                                            {subName}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: 'text.secondary' }}>{present}</StyledTableCell>
                                        <StyledTableCell sx={{ color: 'text.secondary' }}>{sessions}</StyledTableCell>
                                        <StyledTableCell sx={{ color: 'text.secondary', fontWeight: 'bold', color: subjectAttendancePercentage < 75 ? 'error.main' : 'green' }}>
                                            {subjectAttendancePercentage}%
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button 
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleOpen(subId)}
                                                endIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                sx={{ borderRadius: 20 }}
                                            >
                                                Details
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                                                        Attendance Details
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Date</StyledTableCell>
                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ color: data.status === "Present" ? "green" : "error.main" }}>
                                                                            {data.status}
                                                                        </StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        }
                        )}
                    </Table>
                </GlassCard>
            </>
        )
    }

    const renderChartSection = () => {
        return (
            <>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </>
        )
    };

    return (
        <>
            {loading
                ? (
                    <div>Loading...</div>
                )
                :
                <Box sx={{ p: 3, mb: 7 }}> 
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,0.1)' }} elevation={3}>
                                <BottomNavigation 
                                    value={selectedSection} 
                                    onChange={handleSectionChange} 
                                    showLabels 
                                    sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.9)' : 'white' }}
                                >
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                        :
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Currently You Have No Attendance Details
                            </Typography>
                        </>
                    }
                </Box>
            }
        </>
    )
}

export default ViewStdAttendance