import { Box, Button } from "@mui/material"
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import FieldNames from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import { useRef } from "react"

function ConfigForm() {
  const formContext = useForm()
  const patternRef = useRef<HTMLInputElement>(null)

  return (
    <Box>
      <FormContainer
        formContext={formContext}
        onSuccess={data => console.log(data)}
      >
        <Box display="flex" flexDirection="column" gap={2} sx={{ width: '100%' }}>
          <PatternInput inputRef={patternRef} />
          <TextFieldElement
            name={FieldNames.VictoryMsg}
            label="勝利宣言"
            fullWidth
          />
          <RpsChoiceButtons inputRef={patternRef} />
          <Button variant="contained" color="secondary" fullWidth>
            複製密文
          </Button>
        </Box>
      </FormContainer>
    </Box>
  )
}

export default ConfigForm
