import { Button, Stack, Typography } from "@mui/material"
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import FieldNames from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useRef } from "react"

function ConfigForm() {
  const formContext = useForm()
  const patternRef = useRef<HTMLInputElement>(null)

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={data => console.log(data)}
    >
      <Stack gap={2}>
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
