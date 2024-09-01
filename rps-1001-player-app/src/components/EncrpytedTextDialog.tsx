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
  const rsaPubKey = useMemo(() => {
    try{
      return importRsaKey(defaultPubString)
    }catch{return undefined}
  }, [])

  useEffect(() => {
    if (open) {
      if (!rsaPubKey) {
        setEncryptedConfig("加密失敗... 讀唔到條匙。")
        return
      }

      const sanitizedPayload = structuredClone(payload)
      const pattern: string = payload[FieldNames.Pattern]

      const normalizedPattern = pattern
        .replace(/\u270A/g, "R")
        .replace(/\u270C/g, "S")
        .replace(/\u270B/g, "P")

      sanitizedPayload[FieldNames.Pattern] = normalizedPattern

      const jsonString = JSON.stringify(sanitizedPayload)
      try {
        void rsaPubKey.then(key => {
          void encryptPayload(key, jsonString).then(setEncryptedConfig)
        })
      } catch {
        setEncryptedConfig("加密失敗...")
      }
    }
  }, [open, payload, rsaPubKey])

  const textForCopy = "```\n" + encryptedConfig + "\n```"

  const closeDialog = () => void onClose()

  const handleSelectAll = () => {
    const textField = document.querySelector("textarea")
    if (textField) {
      textField.select()
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={closeDialog} closeAfterTransition={false}>
      <DialogTitle>參賽密文</DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          <Typography>請自行複製密文，並於相關主題使用。</Typography>
          <TextField
            fullWidth multiline rows={4} value={textForCopy}
            contentEditable={false}
            slotProps={{ htmlInput: { inputMode: "none" } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSelectAll} variant="contained">全選</Button>
        <Button onClick={closeDialog}>收到</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FetchEncryptedConfigDialog
