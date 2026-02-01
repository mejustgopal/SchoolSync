import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
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
          minHeight: '80vh', // Ensure it takes up space even if content is small
        }}
      >
        <Paper
            elevation={3}
            sx={{
                padding: 4,
                maxWidth: 500,
                width: '100%',
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Add Notice
            </Typography>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    placeholder="Enter notice title..."
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Details"
                    variant="outlined"
                    placeholder="Enter notice details..."
                    multiline
                    rows={4}
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    variant="outlined"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={loader}
                    sx={{
                        mt: 2,
                        height: 50,
                        backgroundColor: '#550080', // Using the primary color I saw in App.js
                        '&:hover': {
                            backgroundColor: '#3e0061',
                        }
                    }}
                  >
                    {loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Add Notice'
                    )}
                  </Button>
              </Stack>
            </form>
        </Paper>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;