import { useState, useEffect, useMemo } from "react"
import {
  Alert,
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
import { useDialogs } from '@toolpad/core'
import defaultPubString from "../assets/20240905_pub.txt?raw"
import importRsaKey from "../utils/importRsaKey"
import encryptPayload from "../utils/encryptToBase64"
import { ConfigValues, FieldNames } from "./ConfigValues"

const EncryptedConfigDialog = ({ payload, open, onClose }: DialogProps<ConfigValues>) => {
  const dialogs = useDialogs()
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

  const handleCopy = async () => {
    const confirmed = await dialogs.confirm("確定要複製密文？\n此舉將覆蓋你剪貼簿之內容。", {okText: "複製"})
    if (!confirmed) return

    selectAll()
    document.execCommand("copy")
  }

  const selectAll = () => {
    const textField = document.querySelector("textarea")
    if (textField) {
      textField.select()
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={closeDialog} closeAfterTransition={false}>
      <DialogTitle>參賽密文</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Typography>請自行複製密文，並於相關主題使用。</Typography>
          <Alert severity="warning">注意：請勿自行插入會員加密；移除<code>```</code>標記、或更改任何格式。</Alert>
          <TextField
            fullWidth multiline rows={8} value={textForCopy}
            contentEditable={false}
            slotProps={{ htmlInput: { inputMode: "none" } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopy} variant="contained" color="secondary">複製</Button>
        <Button onClick={selectAll} variant="contained">全選</Button>
        <Button onClick={closeDialog}>收到</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EncryptedConfigDialog
