import React from 'react';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.theme);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '24px',
            zIndex: 1000, // Ensure it's on top
        }}>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} TransitionComponent={Zoom}>
                <IconButton
                    onClick={() => dispatch(toggleTheme())}
                    color="inherit"
                    sx={{
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        boxShadow: 3,
                        width: 50,
                        height: 50,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    {darkMode ? <Brightness7 fontSize="medium" /> : <Brightness4 fontSize="medium" />}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default ThemeToggle;
