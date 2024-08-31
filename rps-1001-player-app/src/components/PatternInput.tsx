import { TextFieldElement, useFormContext } from "react-hook-form-mui"
import FieldNames from "./ConfigValues"
import type { RpsChoice } from "./common/const"
import _ from "lodash"
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

  const handlePatternChange = (event: { target: { value: string } }) => {
    const inputVal: string = event.target.value
    let newPattern = ''

    // emoji parsing has to done manually
    const inputValArray: string[] = _.split(inputVal, "")

    for (const char of inputValArray) {
      if (validRpsChoiceToCharsMap[char]) {
        newPattern += char
      }
      else if (charToRpsChoiceMap[char]) {
        newPattern += charToRpsChoiceMap[char]
      }
    }
    formContext.setValue(FieldNames.Pattern, newPattern)
  }

  return (<TextFieldElement
    name={FieldNames.Pattern}
    label="拳序 ✋✌️✊"
    fullWidth
    slotProps={{ htmlInput: { pattern: "[✋✌️✊]*" } }}
    onChange={handlePatternChange}
    inputRef={inputRef}
  />)
}

export default PatternInput
