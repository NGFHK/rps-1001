from enum import Enum
import re


class RepeatMode(Enum):
    REPEAT_WHEN_EXHAUSTED = 1
    REPEAT_EVERY_ROUND_OR_EXHAUSTED = 2


class ConfigPrivacyMode(Enum):
    PUBLIC = 1
    PRIVATE = 2


class PlayerRpsConfig:
    """A class to store the configuration of the player's Rock, Paper, Scissors gaming logic."""

    def __init__(
        self,
        pattern: str,
        repeatMode: RepeatMode,
        configPrivacyMode: ConfigPrivacyMode,
        victoryMsg: str = "",
    ):
        self.pattern = pattern
        self.repeatMode = repeatMode
        self.configPrivacyMode = configPrivacyMode
        self.winningMessage = victoryMsg
        self.validate()

    def validate(self):
        """Validates the player's configuration."""
        self.validate_pattern()
        self.validate_repeat_mode()
        self.validate_privacy_mode()
        self.validate_winning_message()

    def validate_pattern(self):
        """Validates the pattern string."""
        if not re.fullmatch(r"[✊✋✌️]*", self.pattern):
            raise ValueError(
                "Pattern contains invalid characters. Only ✊, ✋, ✌️ are allowed."
            )
        if not (1 <= len(self.pattern) <= 100):
            raise ValueError("Pattern length must be between 1 and 100 characters.")

    def validate_repeat_mode(self):
        """Validates the repeat mode."""
        if not isinstance(self.repeatMode, RepeatMode):
            raise ValueError(
                "Invalid repeat mode. Must be an instance of RepeatMode Enum."
            )

    def validate_privacy_mode(self):
        """Validates the privacy mode."""
        if not isinstance(self.configPrivacyMode, ConfigPrivacyMode):
            raise ValueError(
                "Invalid privacy mode. Must be an instance of ConfigPrivacyMode Enum."
            )

    def validate_winning_message(self):
        """Validates the winning message."""
        if not (0 <= len(self.winningMessage) <= 42):
            raise ValueError(
                "Winning message length must be between 0 and 42 characters."
            )


# Example usage:
if __name__ == "__main__":
    try:
        configA = PlayerRpsConfig(
            pattern="✊✋✌️✊",
            repeatMode=RepeatMode.REPEAT_WHEN_EXHAUSTED,
            configPrivacyMode=ConfigPrivacyMode.PUBLIC,
        )
        print("configA is valid.")

        configB = PlayerRpsConfig(
            pattern="✊✋✌️✊",
            repeatMode=RepeatMode.REPEAT_WHEN_EXHAUSTED,
            configPrivacyMode=ConfigPrivacyMode.PUBLIC,
            victoryMsg="I win!",
        )
        print("configB is valid.")
    except ValueError as e:
        print(f"Configuration error: {e}")
