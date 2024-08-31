import { Button, Stack, Typography } from "@mui/material"
import { FormContainer, RadioButtonGroup, TextFieldElement, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import FieldNames, { ConfigPrivacyMode, RepeatMode } from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useRef } from "react"

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
        <RadioButtonGroup
          label="重複模式"
          name={FieldNames.RepeatMode}
          row
          required
          options={[
            {
              id: RepeatMode.REPEAT_WHEN_EXHAUSTED,
              label: "窮盡後重複",
            },
            {
              id: RepeatMode.REPEAT_EVERY_ROUND_OR_EXHAUSTED,
              label: "每盤或窮盡後重複",
            }
          ]}
        />
        <TextFieldElement
          name={FieldNames.VictoryMsg}
          label="勝利宣言"
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
