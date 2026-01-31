import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f00',
  color: 'white',
  marginLeft: '4px',
  '&:hover': {
    backgroundColor: '#eb7979',
    borderColor: '#f26767',
    boxShadow: 'none',
  },
}));

export const BlackButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000000',
  color: 'white',
  marginLeft: '4px',
  '&:hover': {
    backgroundColor: '#212020',
    borderColor: '#212020',
    boxShadow: 'none',
  },
}));

export const DarkRedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#650909',
  color: 'white',
  '&:hover': {
    backgroundColor: '#eb7979',
    borderColor: '#f26767',
    boxShadow: 'none',
  },
}));

export const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#080a43',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0a1e82',
  },
}));

export const PurpleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#270843',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3f1068',
  },
}));

export const LightPurpleButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(100, 50, 200, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(100, 50, 200, .3)',
  },
}));

export const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#133104',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#266810',
  },
}));

export const BrownButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2c1006',
  color: 'white',
  '&:hover': {
    backgroundColor: '#40220c',
    borderColor: '#40220c',
    boxShadow: 'none',
  },
}));

export const IndigoButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2f2b80',
  color: 'white',
  '&:hover': {
    backgroundColor: '#534ea6',
    borderColor: '#473d90',
    boxShadow: 'none',
  },
}));
