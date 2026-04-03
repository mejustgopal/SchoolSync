import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const baseBtn = {
  borderRadius: 50,
  fontWeight: 600,
  letterSpacing: '0.3px',
  transition: 'all 0.22s ease',
  textTransform: 'none',
};

export const RedButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #f44336 0%, #c62828 100%)',
  color: 'white',
  marginLeft: '4px',
  boxShadow: '0 2px 10px rgba(244, 67, 54, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(244, 67, 54, 0.5)',
    background: 'linear-gradient(135deg, #ef5350 0%, #b71c1c 100%)',
  },
}));

export const BlackButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #424242 0%, #212121 100%)',
  color: 'white',
  marginLeft: '4px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
    background: 'linear-gradient(135deg, #616161 0%, #212121 100%)',
  },
}));

export const DarkRedButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #b71c1c 0%, #7f0000 100%)',
  color: 'white',
  boxShadow: '0 2px 10px rgba(183, 28, 28, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(183, 28, 28, 0.5)',
    background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
  },
}));

export const BlueButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
  color: '#fff',
  boxShadow: '0 2px 10px rgba(21, 101, 192, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(21, 101, 192, 0.5)',
    background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
  },
}));

export const PurpleButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #7f56da 0%, #550080 100%)',
  color: '#fff',
  boxShadow: '0 2px 10px rgba(127, 86, 218, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(127, 86, 218, 0.5)',
    background: 'linear-gradient(135deg, #9b6fe8 0%, #6a0099 100%)',
  },
}));

export const LightPurpleButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #7f56da 0%, #06b6d4 100%)',
  border: 0,
  boxShadow: '0 4px 15px rgba(127, 86, 218, 0.4)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  animation: 'pulseBorder 2.5s ease infinite',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(127, 86, 218, 0.55)',
    background: 'linear-gradient(135deg, #9b6fe8 0%, #06b6d4 100%)',
  },
}));

export const GreenButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
  color: '#fff',
  boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(16, 185, 129, 0.5)',
    background: 'linear-gradient(135deg, #34d399 0%, #065f46 100%)',
  },
}));

export const BrownButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #795548 0%, #3e2723 100%)',
  color: 'white',
  boxShadow: '0 2px 10px rgba(121, 85, 72, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(121, 85, 72, 0.5)',
    background: 'linear-gradient(135deg, #8d6e63 0%, #4e342e 100%)',
  },
}));

export const IndigoButton = styled(Button)(() => ({
  ...baseBtn,
  background: 'linear-gradient(135deg, #3949ab 0%, #1a237e 100%)',
  color: 'white',
  boxShadow: '0 2px 10px rgba(57, 73, 171, 0.35)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(57, 73, 171, 0.5)',
    background: 'linear-gradient(135deg, #5c6bc0 0%, #283593 100%)',
  },
}));
