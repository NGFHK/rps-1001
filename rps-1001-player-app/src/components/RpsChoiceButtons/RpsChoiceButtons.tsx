import { Button, IconButton, Stack } from '@mui/material'
import { validRpsChoiceArr } from '../common/const'
import ButtonThemeProvider from './ButtonThemeProvider'
import BackspaceIcon from '@mui/icons-material/Backspace'


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
      <Stack spacing={2} direction="row">
        {validRpsChoiceArr.map((char) => (
          <Button
            key={char}
            onClick={() => handleChoiceClick(char)}
          >
            {char}
          </Button>
        ))}
        <IconButton onClick={handleDeleteClick} size="large" color="primary">
          <BackspaceIcon />
        </IconButton>
      </Stack>
    </ButtonThemeProvider>
  )
}

export default RpsChoiceButtons
