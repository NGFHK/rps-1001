from enum import Enum
import pprint


class RepeatMode(Enum):
    REPEAT_WHEN_EXHAUSTED = 1
    REPEAT_EVERY_ROUND_OR_EXHAUSTED = 2


class ConfigPrivacyMode(Enum):
    PUBLIC = 1
    PRIVATE = 2


class RpsResult(Enum):
    WIN = 1
    LOSE = 2
    DRAW = 3


class RpsChoice(Enum):
    ROCK = "R"
    PAPER = "P"
    SCISSORS = "S"

    def beats(self, other: "RpsChoice") -> RpsResult:
        if self == other:
            return RpsResult.DRAW
        win = (
            (self == RpsChoice.ROCK and other == RpsChoice.SCISSORS)
            or (self == RpsChoice.PAPER and other == RpsChoice.ROCK)
            or (self == RpsChoice.SCISSORS and other == RpsChoice.PAPER)
        )
        return RpsResult.WIN if win else RpsResult.LOSE

    def __str__(self):
        return {
            RpsChoice.ROCK: "✊",
            RpsChoice.PAPER: "✋",
            RpsChoice.SCISSORS: "✌️",
        }[self]


class PlayerRpsConfig:
    """A class to store the configuration of the player's Rock, Paper, Scissors gaming strategy."""

    def __init__(
        self,
        pattern: list[RpsChoice],
        repeatMode: RepeatMode,
        configPrivacyMode: ConfigPrivacyMode,
        victoryMsg: str = "",
    ):
        self.pattern = pattern
        self.repeatMode = repeatMode
        self.configPrivacyMode = configPrivacyMode
        self.victoryMsg = victoryMsg
        self.validate()

    def __repr__(self):
        return pprint.pformat(vars(self), indent=4)

    def validate(self):
        """Validates the player's configuration."""
        self.validate_pattern()
        self.validate_repeat_mode()
        self.validate_privacy_mode()
        self.validate_victory_msg()

    def validate_pattern(self):
        if not (1 <= len(self.pattern) <= 100):
            raise ValueError("Pattern length must be between 1 and 100 choices.")

    def validate_repeat_mode(self):
        if not isinstance(self.repeatMode, RepeatMode):
            raise ValueError(
                "Invalid repeat mode. Must be an instance of RepeatMode Enum."
            )

    def validate_privacy_mode(self):
        if not isinstance(self.configPrivacyMode, ConfigPrivacyMode):
            raise ValueError(
                "Invalid privacy mode. Must be an instance of ConfigPrivacyMode Enum."
            )

    def validate_victory_msg(self):
        if not (0 <= len(self.victoryMsg) <= 42):
            raise ValueError(
                "Victory message length must be between 0 and 42 characters."
            )
