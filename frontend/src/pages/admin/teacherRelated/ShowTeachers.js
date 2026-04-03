import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box, IconButton, Typography, Tooltip, Divider
} from '@mui/material';
import GlassCard from '../../../components/GlassCard';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton, RedButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { ROLE_CONSTANTS } from '../../../constants';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import { exportToPdf, exportToExcel } from '../../../utils/reportUtils';
import Loading from '../../../components/Loading';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState("");

    if (loading) {
        return <Loading />;
    } else if (response || teachersList.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 3 }}>
                    No Teachers Found. Please add teachers to manage them here.
                </Typography>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                    Add Teacher
                </GreenButton>
            </Box>
        );
    } else if (error) {
        // Removed console.log for production
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = Array.isArray(teachersList) && teachersList.length > 0
        ? teachersList.map((teacher) => {
            return {
                name: teacher.name,
                teachSubject: teacher.teachSubject?.subName || null,
                teachSclass: teacher.teachSclass ? teacher.teachSclass.sclassName : "N/A",
                teachSclassID: teacher.teachSclass ? teacher.teachSclass._id : null,
                id: teacher._id,
            };
        })
        : [];

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <GlassCard sx={{ width: '100%', overflow: 'hidden', padding: '1rem' }}>
            {/* Export Toolbar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    👩‍🏫 Teachers List
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Export to PDF">
                        <RedButton
                            variant="contained"
                            size="small"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => exportToPdf('Teachers Report', columns, rows)}
                        >
                            PDF
                        </RedButton>
                    </Tooltip>
                    <Tooltip title="Export to Excel">
                        <GreenButton
                            variant="contained"
                            size="small"
                            startIcon={<TableChartIcon />}
                            onClick={() => exportToExcel('Teachers Report', columns, rows)}
                        >
                            Excel
                        </GreenButton>
                    </Tooltip>
                </Box>
            </Box>
            <Divider sx={{ mb: 1, borderColor: 'rgba(127,86,218,0.12)' }} />
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'teachSubject') {
                                                return (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {value ? (
                                                            value
                                                        ) : (
                                                            <Button variant="contained"
                                                                onClick={() => {
                                                                    navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                                }}>
                                                                Add Subject
                                                            </Button>
                                                        )}
                                                    </StyledTableCell>
                                                );
                                            }
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => deleteHandler(row.id, ROLE_CONSTANTS.TEACHER)}>
                                                <PersonRemoveIcon color="error" />
                                            </IconButton>
                                            <BlueButton variant="contained"
                                                onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                                View
                                            </BlueButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </GlassCard >
    );
};

export default ShowTeachers