import { createTheme } from '@mui/material';
import colors from 'theme/colors.module.scss';
export const baseTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.white,
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
  },

  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.lightest,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.lightest,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
          '& fieldset': {
            borderRadius: 0,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          marginTop: '20px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          display: 'flex',
          margin: 'auto',
        },
      },
    },
  },
});
