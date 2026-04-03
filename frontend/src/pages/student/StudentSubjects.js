import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import GlassCard from '../../components/GlassCard';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { ROLE_CONSTANTS } from '../../constants';
import Popup from '../../components/Popup';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    // eslint-disable-next-line no-unused-vars
    const { response, error, statestatus, userDetails } = useSelector((state) => state.user);
    const { currentUser, loading } = useSelector((state) => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, ROLE_CONSTANTS.STUDENT));
        }
    }, [dispatch, currentUser?._id])

    useEffect(() => {
        if (error) {
            setMessage(error);
            setShowPopup(true);
        }
    }, [error]);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0 && currentUser?.sclassName?._id) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser?.sclassName?._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Subject Marks
                </Typography>
                <GlassCard sx={{ width: '100%', overflow: 'auto' }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Marks</StyledTableCell>
                                <StyledTableCell>Exam Date</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(subjectMarks) && subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                        <StyledTableCell>{result.subName.examDate ? new Date(result.subName.examDate).toLocaleDateString() : "N/A"}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </GlassCard>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    You are currently in Class {sclassDetails?.sclassName || currentUser?.sclassName?.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    And these are the subjects:
                </Typography>
                {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                    <GlassCard sx={{ width: '100%', overflow: 'auto' }}>
                        <Table sx={{ mt: 2 }} aria-label="subjects table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Subject Name</StyledTableCell>
                                    <StyledTableCell>Subject Code</StyledTableCell>
                                    <StyledTableCell>Exam Date</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {subjectsList.map((subject, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{subject.subName}</StyledTableCell>
                                        <StyledTableCell>{subject.subCode}</StyledTableCell>
                                        <StyledTableCell>
                                            {subject.examDate ? new Date(subject.examDate).toLocaleDateString() : 'N/A'}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </GlassCard>
                ) : (
                    <Typography variant="subtitle1">
                        No subjects found.
                    </Typography>
                )}
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255, 255, 255, 0.1)', bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)' }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
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
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentSubjects;