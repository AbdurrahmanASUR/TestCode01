import { createTheme } from '@mui/material'

const theme = createTheme({
  brandColor: {
    facebook: '#1877f2',
    twitter: '#1da1f2',
    whatsapp: '#25d366',
    telegram: '#0088cc',
    instagram: '#e1306c',
  },
  palette: {
    background: {
      default: '#fff',
      gray: '#FAFAFA',
    },
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#D4B071',
    },
    gray: ['#EEEEEE', '#DCDCDC', '#C3C3C3'],
    text: {
      primary: '#D4B071',
      secondary: '#555',
      dark: '#000',
      dark75: '#333',
      light: '#999',
      darkPrimary: '#9B6B49',
    },
    error: {
      main: '#F55157',
    },
    action: {
      hover: '#DFDFDF',
      selected: '#EBEBEB',
    },
    divider: '#D4B071',
  },
  shape: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 22,
  },
  typography: {
    h6: {
      fontSize: '1rem',
    },
  },
})

export default theme
