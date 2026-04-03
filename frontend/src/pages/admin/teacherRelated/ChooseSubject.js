import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import GlassCard from '../../../components/GlassCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { ROLE_CONSTANTS } from '../../../constants';
import Loading from '../../../components/Loading';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            const classID = params.id;
            // Check for both undefined and the string 'undefined'
            if (classID && classID !== 'undefined') {
                setClassID(classID);
                dispatch(getTeacherFreeClassSubjects(classID));
            }
        }
        else if (situation === ROLE_CONSTANTS.TEACHER) {
            const { classID, teacherID } = params;
            // Check for both undefined and the string 'undefined'
            if (classID && classID !== 'undefined' && teacherID && teacherID !== 'undefined') {
                setClassID(classID);
                setTeacherID(teacherID);
                dispatch(getTeacherFreeClassSubjects(classID));
            }
        }
    }, [situation, params, dispatch]);

    if (loading) {
        return <Loading />;
    } else if (response) {
        return (
            <GlassCard sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom color="primary">
                    Sorry, all subjects have teachers assigned already
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <PurpleButton variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        Add Subjects
                    </PurpleButton>
                </Box>
            </GlassCard>
        );
    } else if (error) {
        // Removed console.log for production
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    return (
        <GlassCard sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <Typography variant="h6" gutterBottom component="div">
                Choose a subject
            </Typography>
            <>
                <TableContainer>
                    <Table aria-label="sclasses table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="center">Subject Name</StyledTableCell>
                                <StyledTableCell align="center">Subject Code</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                                <StyledTableRow key={subject._id}>
                                    <StyledTableCell component="th" scope="row" style={{ color: "white" }}>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                                    <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {situation === "Norm" ?
                                            <GreenButton variant="contained"
                                                onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}>
                                                Choose
                                            </GreenButton>
                                            :
                                            <GreenButton variant="contained" disabled={loader}
                                                onClick={() => updateSubjectHandler(teacherID, subject._id)}>
                                                {loader ? (
                                                    <div className="load"></div>
                                                ) : (
                                                    'Choose Sub'
                                                )}
                                            </GreenButton>}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </GlassCard >
    );
};

export default ChooseSubject;