import { Box, Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
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
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          gap={10}
        >
          <Typography variant="h1">RPS-1001</Typography>
          <ConfigForm />
        </Box>
      </Container>
      <BottomAppBar />
    </ThemeProvider>
  )
}

export default App
