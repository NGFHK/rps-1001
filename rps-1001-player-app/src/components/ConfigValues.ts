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
    VictoryMsg = 'victoryMsg',
}

export default FieldNames
