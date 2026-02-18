import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Box, Typography, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton } from '@mui/material';
import GlassCard from '../../../components/GlassCard';
import { ROLE_CONSTANTS } from '../../../constants';
import { validatePassword } from '../../../utils/validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')
    const [toggle, setToggle] = useState(false)

    const adminID = currentUser._id
    const role = ROLE_CONSTANTS.STUDENT
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else if (rollNum <= 0) {
            setMessage("Roll number must be a positive integer")
            setShowPopup(true)
        }
        else {
            const passwordCheck = validatePassword(password);
            if (!passwordCheck.isValid) {
                setMessage(passwordCheck.message);
                setShowPopup(true);
            } else {
                setLoader(true)
                dispatch(registerUser(fields, role))
            }
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage(error)
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <GlassCard
                    sx={{
                        maxWidth: 500,
                        width: '100%',
                        padding: '2rem',
                        marginTop: '1rem',
                    }}
                >
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                Add Student
                            </Typography>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />

                            {situation === ROLE_CONSTANTS.STUDENT && (
                                <FormControl fullWidth required>
                                    <InputLabel id="class-select-label">Class</InputLabel>
                                    <Select
                                        labelId="class-select-label"
                                        id="class-select"
                                        value={className}
                                        label="Class"
                                        onChange={changeHandler}
                                    >
                                        <MenuItem value='Select Class'>Select Class</MenuItem>
                                        {Array.isArray(sclassesList) && sclassesList.length > 0 && sclassesList.map((classItem, index) => (
                                            <MenuItem key={index} value={classItem.sclassName}>
                                                {classItem.sclassName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            <TextField
                                fullWidth
                                label="Roll Number"
                                variant="outlined"
                                type="number"
                                value={rollNum}
                                onChange={(event) => setRollNum(event.target.value)}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={toggle ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                disabled={loader}
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#550080',
                                    '&:hover': {
                                        backgroundColor: '#3e0061',
                                    }
                                }}
                            >
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Add'
                                )}
                            </Button>
                        </Stack>
                    </form>
                </GlassCard>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent