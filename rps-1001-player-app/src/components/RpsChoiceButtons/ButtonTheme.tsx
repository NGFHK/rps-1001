import { createTheme, ThemeOptions } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'

const length = 'min(10vh, 10vw)'
const fontSize = `calc(${length} * 0.6)`

const useButtonTheme = () => {
  const parentTheme = useTheme()

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

  return createTheme(parentTheme, buttonThemeOptions)
}

export default useButtonTheme
