import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const GlassCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(25, 20, 40, 0.65)'
    : 'rgba(255, 255, 255, 0.82)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 40px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
    : '0 8px 40px 0 rgba(85, 0, 128, 0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(127, 86, 218, 0.18)'
    : '1px solid rgba(127, 86, 218, 0.15)',
  borderRadius: 20,
  padding: '32px',
  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 16px 48px 0 rgba(127, 86, 218, 0.25)'
      : '0 16px 48px 0 rgba(85, 0, 128, 0.18)',
  },
}));

export default GlassCard;

