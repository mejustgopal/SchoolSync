import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, TextField, Button, Stack } from '@mui/material';
import GlassCard from '../../../components/GlassCard';
import { ROLE_CONSTANTS } from '../../../constants';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    // Validate subjectID before making API call
    if (subjectID && subjectID !== 'undefined') {
      dispatch(getSubjectDetails(subjectID, "Subject"));
    }
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = ROLE_CONSTANTS.TEACHER

  const submitHandler = (event) => {
    event.preventDefault()

    // Get current values at submission time
    const school = subjectDetails && subjectDetails.school
    const teachSubject = subjectDetails && subjectDetails._id
    const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

    // Validate that all required fields are present
    if (!school || school === 'undefined') {
      setMessage('Subject details not loaded. Please try again.');
      setShowPopup(true);
      return;
    }

    if (!teachSubject || teachSubject === 'undefined') {
      setMessage('Subject information is missing. Please try again.');
      setShowPopup(true);
      return;
    }

    if (!teachSclass || teachSclass === 'undefined') {
      setMessage('Class information is missing. Please try again.');
      setShowPopup(true);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setShowPopup(true);
      return;
    }

    // Create fields object with validated values
    const fields = { name, email, password, role, school, teachSubject, teachSclass }

    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
    <div>
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
                Add Teacher
              </Typography>
              <br />
              <Typography variant="body1">
                Subject : {subjectDetails && subjectDetails.subName}
              </Typography>
              <Typography variant="body1">
                Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
              </Typography>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
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
                  'Register'
                )}
              </Button>
            </Stack>
          </form>
        </GlassCard>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher