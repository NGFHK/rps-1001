import { TextFieldElement, useFormContext } from "react-hook-form-mui"
import FieldNames from "./ConfigValues"
import type { RpsChoice } from "./common/const"
import { validRpsChoiceToCharsMap } from "./common/const"

// Create a reverse lookup map for key presses
const charToRpsChoiceMap = Object.entries(validRpsChoiceToCharsMap).reduce<Record<string, RpsChoice>>(
  (acc, [rpsChoice, chars]) => {
    chars.forEach((char) => {
      acc[char] = rpsChoice
    })
    return acc
  },
  {}
)

interface Props {
  inputRef: React.RefObject<HTMLInputElement>
}

function PatternInput({ inputRef } : Props) {
  const formContext = useFormContext()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, metaKey, ctrlKey, altKey, target } = event
    const isModifierKey = metaKey || ctrlKey || altKey
    const isNavigationKey = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Backspace'].includes(key)

    // Ignore key presses that are modifiers or navigation-related
    if (isModifierKey || isNavigationKey) return

    event.preventDefault()

    const rpsChoice = charToRpsChoiceMap[key]
    const inputTarget = target as HTMLInputElement

    const { selectionStart, selectionEnd, value } = inputTarget
    if (rpsChoice) {
      const start = selectionStart ?? 0
      const end = selectionEnd ?? 0
      const newValue = value.slice(0, start) + rpsChoice + value.slice(end)
      inputTarget.value = newValue

      const offset  = start + rpsChoice.length
      inputTarget.setSelectionRange(offset, offset)
      formContext.setValue(FieldNames.Pattern, newValue)
    }
    else if (validRpsChoiceToCharsMap[key]) {
      formContext.setValue(FieldNames.Pattern, value + key)
    }
  }


  return (
    <TextFieldElement
      name={FieldNames.Pattern}
      label="👊 拳序"
      required
      placeholder="✋✌️✊"
      autoComplete="off"
      slotProps={{ htmlInput: { pattern: "[✋✌️✊]*" } }}
      inputMode="none"
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
    />
  )
}

export default PatternInput
