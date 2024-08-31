import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import React from 'react'

interface Props {
  children: React.ReactNode;
}

const ButtonThemeProvider = ({ children } : Props) => {
  const parentTheme = useTheme()
  const length = 'min(6ch,max(10vh, 10vw))'
  const fontSize = `calc(${length} * 0.6)`

  const buttonThemeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            aspectRatio: '1 / 1',
            fontSize: fontSize,
            width: length,
            height: length,
          },
        },
      },
    },
  }

  const buttonTheme = createTheme(parentTheme, buttonThemeOptions)

  return <ThemeProvider theme={buttonTheme}>{children}</ThemeProvider>
}

export default ButtonThemeProvider
