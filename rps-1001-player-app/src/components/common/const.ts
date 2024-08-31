export const validRpsChoiceToCharsMap: Record<string, readonly string[]> = {
  "✋": ['1', 'p', 'P'],
  "✌️": ['2', 'v', 'V', 's', 'S'],
  "✊": ['3', 'r', 'R'],
} as const
export const validRpsChoiceArr = Object.keys(validRpsChoiceToCharsMap)
export const validRpsChoices: string = validRpsChoiceArr.join('')

export type RpsChoice = keyof typeof validRpsChoiceToCharsMap; 
