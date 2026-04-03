import React from 'react';
import { Box, Tooltip, Zoom, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.theme);

    return (
        <Tooltip
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            placement="left"
            TransitionComponent={Zoom}
        >
            <Box
                onClick={() => dispatch(toggleTheme())}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 30,
                    cursor: 'pointer',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    background: darkMode
                        ? 'rgba(30, 27, 60, 0.85)'
                        : 'rgba(255, 255, 255, 0.85)',
                    border: darkMode
                        ? '1px solid rgba(127, 86, 218, 0.35)'
                        : '1px solid rgba(127, 86, 218, 0.2)',
                    boxShadow: darkMode
                        ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(127,86,218,0.1)'
                        : '0 8px 32px rgba(127,86,218,0.2), 0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    '&:hover': {
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: darkMode
                            ? '0 14px 40px rgba(127,86,218,0.35)'
                            : '0 14px 40px rgba(127,86,218,0.3)',
                    },
                    '&:active': {
                        transform: 'scale(0.97)',
                    },
                }}
            >
                <Box
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #7f56da, #06b6d4)',
                        boxShadow: '0 2px 8px rgba(127,86,218,0.4)',
                        flexShrink: 0,
                    }}
                >
                    {darkMode
                        ? <Brightness7 sx={{ fontSize: 16, color: '#fff' }} />
                        : <Brightness4 sx={{ fontSize: 16, color: '#fff' }} />
                    }
                </Box>
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        letterSpacing: '0.3px',
                        color: darkMode ? '#c4b5fd' : '#7f56da',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                    }}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Typography>
            </Box>
        </Tooltip>
    );
};

export default ThemeToggle;
