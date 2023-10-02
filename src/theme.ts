import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2979FF', // A primary color representing interactivity
    },
    secondary: {
      main: '#FF6D00', // A secondary color for actions and accents
    },
    background: {
      default: '#F0F0F0', // Slightly darker background color
      paper: '#F0F0F0', // Paper/card background color
    },
    text: {
      primary: '#333333', // Dark text color
      secondary: '#666666', // Slightly lighter secondary text color
    },
  },
  typography: {
    fontFamily: 'Philosopher, sans-serif',
    h1: {
      fontSize: '2.5rem', // Large headings
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners for elements
  },
});

export default theme;
