import { Link, Stack, Typography } from "@mui/material"
import { CheckboxElement, FormContainer, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import FieldNames, { ConfigPrivacyMode, RepeatMode } from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import { useRef } from "react"
import RepeatModeInput from "./RepeatModeInput"
import CopyEncrpytedTextButton from "./CopyEncrpytedTextButton"
import VictoryMsgInput from "./VictoryMsgInput"

function ConfigForm() {
  const formContext = useForm({
    mode: 'onChange',
    defaultValues:{
      [FieldNames.RepeatMode]: RepeatMode.REPEAT_WHEN_EXHAUSTED,
      [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode.PUBLIC,
    }})

  const patternRef = useRef<HTMLInputElement>(null)

  const handleFormSuccess = async (data: unknown) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormContainer
      formContext={formContext}
      onSuccess={handleFormSuccess}
      onError={ (error) => console.error(error) }
    >
      <Stack gap={2}>
        <RepeatModeInput />
        <VictoryMsgInput />
        <PatternInput inputRef={patternRef} />
        <RpsChoiceButtons inputRef={patternRef} />
        <CheckboxElement
          label="📖 賽後公開策略"
          name={FieldNames.ConfigPrivacyMode}
        />
        <CopyEncrpytedTextButton />

        <Typography align="center">
            Work in process... 🚧
        </Typography>
        <Link href="https://lih.kg/3773399" align="center" target="_blank">
          LIHKG Thread
        </Link>
      </Stack>
    </FormContainer>
  )
}

export default ConfigForm
