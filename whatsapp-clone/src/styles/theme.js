// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Tonalidad verde principal
      light: '#81C784', // Verde pastel claro
      dark: '#388E3C', // Verde oscuro
    },
    secondary: {
      main: '#FFEB3B', // Amarillo pastel
    },
    background: {
      default: '#F1F8E9', // Fondo pastel
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
