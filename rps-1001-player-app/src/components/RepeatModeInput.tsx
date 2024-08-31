import { RadioButtonGroup } from "react-hook-form-mui"
import FieldNames, { RepeatMode } from "./ConfigValues"

const RepeatModeInput = () => (
  <RadioButtonGroup
    label="🔄 重複模式"
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
)

export default RepeatModeInput
