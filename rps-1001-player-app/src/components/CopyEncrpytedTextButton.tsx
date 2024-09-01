import { Button } from "@mui/material"
import MailLockIcon from '@mui/icons-material/MailLock'

const CopyEncrpytedTextButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      startIcon={<MailLockIcon />}
    >
			取得密文
    </Button>
  )
}

export default CopyEncrpytedTextButton
