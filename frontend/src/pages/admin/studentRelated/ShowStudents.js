import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, IconButton, Paper, Typography, Tooltip
} from '@mui/material';
import GlassCard from '../../../components/GlassCard';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import { exportToPdf, exportToExcel } from '../../../utils/reportUtils';
import Loading from '../../../components/Loading';

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popup from '../../../components/Popup';
import { ROLE_CONSTANTS } from '../../../constants';

const ShowStudents = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        // Removed console.log for production
    }

    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState("");

    useEffect(() => {
        if (error) {
            setMessage(error);
            setShowPopup(true);
        }
    }, [error]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
            })
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = Array.isArray(studentsList) && studentsList.length > 0 ? studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName ? student.sclassName.sclassName : "N/A",
            id: student._id,
        };
    }) : []

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate("/Admin/students/student/attendance/" + row.id)
        }
        const handleMarks = () => {
            navigate("/Admin/students/student/marks/" + row.id)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, ROLE_CONSTANTS.STUDENT)}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}>
                    View
                </BlueButton>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <BlackButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlackButton>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            {loading ?
                <Loading />
                :
                <>
                    {(response || studentsList.length === 0) ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 3 }}>
                                No Students Found. Please add students to manage them here.
                            </Typography>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                                Add Students
                            </GreenButton>
                        </Box>
                        :
                        <GlassCard sx={{ width: '100%', overflow: 'hidden', padding: '1rem' }}>
                            {/* Export Toolbar */}
                            <Box sx={{ display: 'flex', gap: 1.5, mb: 2, justifyContent: 'flex-end' }}>
                                <Tooltip title="Export as PDF">
                                    <PurpleButton
                                        id="export-students-pdf"
                                        size="small"
                                        startIcon={<PictureAsPdfIcon />}
                                        onClick={() => exportToPdf('Students Report', studentColumns, studentRows)}
                                    >
                                        PDF
                                    </PurpleButton>
                                </Tooltip>
                                <Tooltip title="Export as Excel">
                                    <GreenButton
                                        id="export-students-excel"
                                        size="small"
                                        startIcon={<GridOnIcon />}
                                        onClick={() => exportToExcel('Students Report', studentColumns, studentRows)}
                                    >
                                        Excel
                                    </GreenButton>
                                </Tooltip>
                            </Box>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </GlassCard>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;