import { Link, Stack, Typography } from "@mui/material"
import { CheckboxElement, FormContainer, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import { ConfigPrivacyMode, ConfigValues, FieldNames, RepeatMode } from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import { useEffect, useRef } from "react"
import RepeatModeInput from "./RepeatModeInput"
import CopyEncrpytedTextButton from "./CopyEncrpytedTextButton"
import VictoryMsgInput from "./VictoryMsgInput"
import { useDialogs } from "@toolpad/core"
import FetchEncryptedConfigDialog from "./EncrpytedTextDialog"

const beforeUnloadHandler = (event: { preventDefault: () => void; returnValue: boolean }) => {
  // Recommended
  event.preventDefault()
  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true
}

function ConfigForm() {
  const formContext = useForm<ConfigValues>({
    mode: 'onChange',
    defaultValues:{
      [FieldNames.RepeatMode]: RepeatMode.REPEAT_WHEN_EXHAUSTED,
      [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode.PUBLIC,
    }})

  const dialogs = useDialogs()

  const handleFormSuccess = (data: ConfigValues) => {
    void dialogs.open(FetchEncryptedConfigDialog, data)
  }

  const isDirty = Object.keys(formContext.formState.dirtyFields).length !== 0
  useEffect(() => {
    if (isDirty) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      return
    }
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  }, [isDirty])

  const patternRef = useRef<HTMLInputElement>(null)

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
