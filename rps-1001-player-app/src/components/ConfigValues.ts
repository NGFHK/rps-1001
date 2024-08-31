export enum RepeatMode {
    REPEAT_WHEN_EXHAUSTED = 1,
    REPEAT_WHEN_EXHAUSTED_AND_RESET = 2,
}

export enum ConfigPrivacyMode {
    PUBLIC = 1,
    PRIVATE = 2,
}

export enum FieldNames {
    Pattern = 'pattern',
    RepeatMode = 'repeatMode',
    ConfigPrivacyMode = 'configPrivacyMode',
    VictoryMsg = 'victoryMsg',
}

export default FieldNames
