export enum RepeatMode {
    REPEAT_WHEN_EXHAUSTED = "REPEAT_WHEN_EXHAUSTED",
    REPEAT_EVERY_ROUND_OR_EXHAUSTED = "REPEAT_EVERY_ROUND_OR_EXHAUSTED",
}

export enum ConfigPrivacyMode {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

export enum FieldNames {
    Pattern = 'pattern',
    RepeatMode = 'repeatMode',
    ConfigPrivacyMode = 'configPrivacyMode',
    // a virtual field to control the checkbox
    // we want it to be a checkbox, but at the same time we want to store the value as ConfigPrivacyMode,
    // because there could be more than two privacy modes in the future
    ConfigPrivacyModeCheckbox = 'configPrivacyModeCheckbox',
    VictoryMsg = 'victoryMsg',
}

// This contains virtual fields
export interface ConfigFormValues {
    [FieldNames.Pattern]: string
    [FieldNames.RepeatMode]: RepeatMode
    [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode
    [FieldNames.ConfigPrivacyModeCheckbox]: boolean
    [FieldNames.VictoryMsg]: string
}

export interface ConfigValues {
    [FieldNames.Pattern]: string
    [FieldNames.RepeatMode]: RepeatMode
    [FieldNames.ConfigPrivacyMode]: ConfigPrivacyMode
    [FieldNames.VictoryMsg]: string
}

export default ConfigValues
