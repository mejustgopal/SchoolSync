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
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)
 
  const role = ROLE_CONSTANTS.TEACHER
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
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
      setMessage("Network Error")
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