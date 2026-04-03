import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { ROLE_CONSTANTS } from '../../constants';
import GlassCard from '../../components/GlassCard';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);
    if (response || error) { } // Silence unused var warning

    const address = ROLE_CONSTANTS.STUDENT
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID, address]);

    // Removed console.log for production

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Box sx={{ width: '100%', overflow: 'auto', p: 3 }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <GlassCard sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Student Details
                    </Typography>
                    
                    <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="body1"><strong>Name:</strong> {userDetails.name}</Typography>
                        <Typography variant="body1"><strong>Roll Number:</strong> {userDetails.rollNum}</Typography>
                        <Typography variant="body1"><strong>Class:</strong> {sclassName.sclassName}</Typography>
                        <Typography variant="body1"><strong>School:</strong> {studentSchool.schoolName}</Typography>
                    </Box>

                    <Typography variant="h5" gutterBottom>
                        Attendance
                    </Typography>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <Table key={index} sx={{ mb: 3 }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell>Present</StyledTableCell>
                                                    <StyledTableCell>Total Sessions</StyledTableCell>
                                                    <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>

                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{subName}</StyledTableCell>
                                                    <StyledTableCell>{present}</StyledTableCell>
                                                    <StyledTableCell>{sessions}</StyledTableCell>
                                                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <PurpleButton size="small" variant="contained" onClick={() => handleOpen(subId)}>
                                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                                        </PurpleButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow>
                                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 2, p: 2, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 2 }}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Attendance Details
                                                                </Typography>
                                                                <Table size="small">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell>Date</StyledTableCell>
                                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {Array.isArray(allData) && allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={index}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {dateString}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                return null;
                            })}
                            
                            <Box sx={{ my: 3, p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Typography variant="h6" gutterBottom>
                                    Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CustomPieChart data={chartData} />
                                </Box>
                            </Box>
                        </>
                    )}
                    
                    <PurpleButton
                        variant="contained"
                        sx={{ mb: 4 }}
                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                    >
                        Add Attendance
                    </PurpleButton>

                    <Typography variant="h5" gutterBottom>
                        Subject Marks
                    </Typography>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                        <Box sx={{ mb: 3 }}>
                            {subjectMarks.map((result, index) => {
                                if (result.subName && result.subName.subName === teachSubject) {
                                    return (
                                        <Table key={index} sx={{ mb: 2 }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell>Marks</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                return null;
                            })}
                        </Box>
                    }
                    <PurpleButton 
                        variant="contained"
                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                    >
                        Add Marks
                    </PurpleButton>
                </GlassCard>
            )}
        </Box>
    )
}

export default TeacherViewStudent;