import { TextFieldElement } from "react-hook-form-mui"
import { FieldNames } from "./ConfigValues"

const VictoryMsgInput = () => (
  <TextFieldElement
    name={FieldNames.VictoryMsg}
    label="🏆 勝利宣言"
    placeholder="一度得生者，豈有不滅者乎？"
    autoComplete="off"
    rules={{
      maxLength: { value: 42, message: '上限 42 字。' }
    }}
  />
)

export default VictoryMsgInput
