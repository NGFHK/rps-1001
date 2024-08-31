import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
import BottomAppBar from './components/BottomAppBar'
import ConfigForm from './components/ConfigForm'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#dff0ea',
    },
    secondary: {
      main: '#004200',
    },
  },
  typography: {
    fontFamily: [
      'Pixelify Sans',
      'Noto Sans HK',
      'sans-serif',
    ].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm"
        sx={{
          gap: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h1" fontSize='4rem'>
          RPS-1001
        </Typography>
        <ConfigForm />
      </Container>
      <BottomAppBar />
    </ThemeProvider>
  )
}

export default App
