import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top"
    const horizontal = "center"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl())
        dispatch(underStudentControl())
    };

    // Determine severity
    let severity = "error";
    if (message) {
        const lowerMsg = String(message).toLowerCase();
        if (
            lowerMsg.includes("success") ||
            lowerMsg.includes("done") ||
            lowerMsg.includes("added") ||
            lowerMsg.includes("updated") ||
            lowerMsg.includes("registered")
        ) {
            severity = "success";
        }
    }

    return (
        <>
            <Snackbar open={showPopup} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {typeof message === 'string' && message.split('\n').map((msg, i) => <div key={i}>{msg}</div>)}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
