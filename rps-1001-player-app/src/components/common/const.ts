export const validRpsChoiceToCharsMap: Record<string, readonly string[]> = {
  "\u270B": ['1', 'p', 'P'],
  "\u270C": ['2', 'v', 'V', 's', 'S'],
  "\u270A": ['3', 'r', 'R'],
} as const
export const validRpsChoiceArr = Object.keys(validRpsChoiceToCharsMap)
export const validRpsChoices: string = validRpsChoiceArr.join('')

export type RpsChoice = keyof typeof validRpsChoiceToCharsMap
