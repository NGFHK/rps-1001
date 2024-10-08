import { Link, Stack } from "@mui/material"
import { CheckboxElement, FormContainer, useForm } from "react-hook-form-mui"
import PatternInput from "./PatternInput"
import { ConfigFormValues, ConfigPrivacyMode, ConfigValues, FieldNames, RepeatMode } from "./ConfigValues"
import RpsChoiceButtons from "./RpsChoiceButtons/RpsChoiceButtons"
import { useEffect, useRef } from "react"
import RepeatModeInput from "./RepeatModeInput"
import CopyEncrpytedTextButton from "./CopyEncrpytedTextButton"
import VictoryMsgInput from "./VictoryMsgInput"
import { useDialogs } from "@toolpad/core"
import EncryptedConfigDialog from "./EncryptedConfigDialog"
import _ from "lodash"

const beforeUnloadHandler = (event: { preventDefault: () => void; returnValue: boolean }) => {
  event.preventDefault()
  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true
}

function ConfigForm() {
  const formContext = useForm<ConfigFormValues>({
    mode: 'onChange',
    defaultValues:{
      [FieldNames.RepeatMode]: RepeatMode.REPEAT_WHEN_EXHAUSTED,
      [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode.PUBLIC,
      [FieldNames.ConfigPrivacyModeCheckbox]: true,
    }})

  const dialogs = useDialogs()

  const handleFormSuccess = (data: ConfigValues) => {
    const encrpytingFields = _.omit(data, FieldNames.ConfigPrivacyModeCheckbox)
    void dialogs.open(EncryptedConfigDialog, encrpytingFields)
    console.log(encrpytingFields)
  }

  const isDirty = Object.keys(formContext.formState.dirtyFields).length !== 0
  useEffect(() => {
    if (isDirty) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      return
    }
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  }, [isDirty])

  // See ConfigValues.ts for why we need this virtual field
  const handlePrivacyModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    formContext.setValue(
      FieldNames.ConfigPrivacyMode,
      checked ? ConfigPrivacyMode.PUBLIC : ConfigPrivacyMode.PRIVATE
    )
  }

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
          label="📖 賽後公開出拳策略"
          name={FieldNames.ConfigPrivacyModeCheckbox}
          onChange={handlePrivacyModeChange}
        />
        <CopyEncrpytedTextButton />
        <Link href="https://lih.kg/3773399" align="center" target="_blank">
          LIHKG Thread
        </Link>
      </Stack>
    </FormContainer>
  )
}

export default ConfigForm
