import { Button } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CopyEncrpytedTextButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      startIcon={<ContentCopyIcon />}
    >
			複製密文
    </Button>
  )
}

export default CopyEncrpytedTextButton
