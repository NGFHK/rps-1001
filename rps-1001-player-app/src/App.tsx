import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import BottomAppBar from './components/BottomAppBar'
import ConfigForm from './components/ConfigForm'
import { DialogsProvider } from '@toolpad/core'
import TitleText from './components/TitleText'

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
      <DialogsProvider>
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
          <TitleText />
          <ConfigForm />
        </Container>
        <BottomAppBar />
      </DialogsProvider>
    </ThemeProvider>
  )
}

export default App
