import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.6)' 
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' 
    : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.05)'
    : '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 16,
  padding: '32px',
  transition: 'transform 0.3s ease-in-out',
}));

export default GlassCard;
