import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                width: '100%',
                gap: 2
            }}
        >
            <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Loading details...
            </Typography>
        </Box>
    );
};

export default Loading;
