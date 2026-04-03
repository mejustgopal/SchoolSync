import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { PurpleButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import GlassCard from "../../../components/GlassCard";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
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
    }, [status, navigate, error, response, dispatch, tempDetails]);
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
                        maxWidth: 550,
                        padding: '50px 3rem 50px',
                        marginTop: '1rem',
                    }}
                >
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Create a class"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                            />
                            <PurpleButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? "Creating..." : "Create"}
                            </PurpleButton>
                            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ borderRadius: 50 }}>
                                Go Back
                            </Button>
                        </Stack>
                    </form>
                </GlassCard>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass