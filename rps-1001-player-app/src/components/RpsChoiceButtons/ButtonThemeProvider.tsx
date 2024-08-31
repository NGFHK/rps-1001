import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import React from 'react'

interface Props {
  children: React.ReactNode;
}

const ButtonThemeProvider = ({ children } : Props) => {
  const parentTheme = useTheme()

  const buttonThemeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        defaultProps: {
          size: "large",
          variant: "contained",
        },
        styleOverrides: {
          root: {
            fontSize: "large",
            aspectRatio: "1 / 1",
          },
        },
      },
    },
  }

  const buttonTheme = createTheme(parentTheme, buttonThemeOptions)

  return <ThemeProvider theme={buttonTheme}>{children}</ThemeProvider>
}

export default ButtonThemeProvider
