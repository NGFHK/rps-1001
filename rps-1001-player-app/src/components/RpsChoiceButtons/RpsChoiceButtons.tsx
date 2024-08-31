import { Box, Button } from '@mui/material'
import { validRpsChoiceArr } from '../common/const'
import ButtonThemeProvider from './ButtonThemeProvider'

interface Props {
  inputRef: React.RefObject<HTMLInputElement>
}

const RpsChoiceButtons = ({ inputRef }: Props) => {
  const handleChoiceClick = (char: string) => {
    if (inputRef.current) {
      inputRef.current.focus()
      document.execCommand('insertText', false, char)
    }
  }

  const handleDeleteClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      document.execCommand('delete', false)
    }
  }

  return (
    <ButtonThemeProvider>
      <Box display="flex" justifyContent="space-around" gap="5vw">
        {validRpsChoiceArr.map((char) => (
          <Button
            key={char}
            onClick={() => handleChoiceClick(char)}
            variant="contained"
          >
            {char}
          </Button>
        ))}
        <Button
          variant="outlined"
          onClick={handleDeleteClick}
        >
          ⌫
        </Button>
      </Box>
    </ButtonThemeProvider>
  )
}

export default RpsChoiceButtons
