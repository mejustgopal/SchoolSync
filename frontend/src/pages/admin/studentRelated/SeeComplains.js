import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Checkbox, Typography, Paper
} from '@mui/material';
import GlassCard from '../../../components/GlassCard';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import { useState } from 'react';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from '@mui/material';

const SeeComplains = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser, error: userError } = useSelector(state => state.user)

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    if (error) {
      setMessage(error);
      setShowPopup(true);
    }
    else if (userError) {
      setMessage(userError);
      setShowPopup(true);
    }
  }, [error, userError]);

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = Array.isArray(complainsList) && complainsList.length > 0 ? complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user ? complain.user.name : "Unknown User",
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  }) : []

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllComplains(currentUser._id, "Complain"));
      })
  }

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Complain")}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    );
  };

  const actions = [
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Complaints',
      action: () => deleteHandler(currentUser._id, "Complains")
    }
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {(response || complainsList.length === 0) ?
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
                No Complaints Found. Rest easy, everything seems to be going smoothly!
              </Typography>
            </Box>
            :
            <GlassCard sx={{ width: '100%', overflow: 'hidden', padding: '1rem' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
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

export default SeeComplains;