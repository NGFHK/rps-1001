import { Button, Tooltip } from "@mui/material"
import MailLockIcon from '@mui/icons-material/MailLock'

const CopyEncrpytedTextButton = () => {
  return (
    <Tooltip title="明年請早">
      <span>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={<MailLockIcon />}
          disabled
          sx={{width: '100%'}}
        >
			取得密文
        </Button>
      </span>
    </Tooltip>
  )
}

export default CopyEncrpytedTextButton
