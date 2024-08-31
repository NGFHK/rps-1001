import { Button, Stack, Typography } from "@mui/material"
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import FieldNames, { ConfigPrivacyMode, RepeatMode } from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useRef } from "react"
import RepeatModeInput from "./RepeatModeInput"

function ConfigForm() {
  const formContext = useForm({defaultValues:{
    [FieldNames.RepeatMode]: RepeatMode.REPEAT_WHEN_EXHAUSTED,
    [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode.PUBLIC,
  }})

  const patternRef = useRef<HTMLInputElement>(null)

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={data => console.log(data)}
    >
      <Stack gap={2}>
        <RepeatModeInput />
        <TextFieldElement
          name={FieldNames.VictoryMsg}
          label="🏆 勝利宣言"
          placeholder="一度得生者，豈有不滅者乎？"
          autoComplete="off"
        />
        <PatternInput inputRef={patternRef} />
        <RpsChoiceButtons inputRef={patternRef} />
        <Button variant="contained" color="secondary" startIcon={<ContentCopyIcon />}>
            複製密文
        </Button>

        <Typography align="center">
            Work in process... 🚧
        </Typography>
      </Stack>
    </FormContainer>
  )
}

export default ConfigForm
