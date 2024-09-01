import { useState, useEffect, useMemo } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DialogProps } from "@toolpad/core"
import defaultPubString from "../assets/default_pub.txt?raw"
import importRsaKey from "../utils/importRsaKey"
import encryptPayload from "../utils/encryptToBase64"
import { ConfigValues, FieldNames } from "./ConfigValues"

const FetchEncryptedConfigDialog = ({ payload, open, onClose }: DialogProps<ConfigValues>) => {
  const [encryptedConfig, setEncryptedConfig] = useState<string>("")
  const rsaPubKey = useMemo(() => importRsaKey(defaultPubString), [])

  useEffect(() => {
    if (open) {
      console.log(payload)
      const sanitizedPayload = structuredClone(payload)
      const pattern: string = payload[FieldNames.Pattern]

      const normalizedPattern = pattern
        .replace(/\u270A/g, "R")
        .replace(/\u270C/g, "S")
        .replace(/\u270B/g, "P")

      sanitizedPayload[FieldNames.Pattern] = normalizedPattern

      const jsonString = JSON.stringify(sanitizedPayload)
      void rsaPubKey.then(key => {
        void encryptPayload(key, jsonString).then(setEncryptedConfig)
      })
    }
  }, [open, payload, rsaPubKey])

  const closeDialog = () => void onClose()

  const textForCopy = "```\n" + encryptedConfig + "\n```"

  return (
    <Dialog fullWidth open={open} onClose={closeDialog} closeAfterTransition={false}>
      <DialogTitle>參賽密文</DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          <Typography>請自行複製密文，並於相關主題使用。</Typography>
          <TextField fullWidth multiline rows={4} value={textForCopy} contentEditable={false} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>收到</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FetchEncryptedConfigDialog
