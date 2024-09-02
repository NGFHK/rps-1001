import random
import string
from entities.playerRpsConfig import (
    PlayerRpsConfig,
    RepeatMode,
    ConfigPrivacyMode,
    RpsChoice,
)
from entities.player import Player


def genPlayer(userId: int = 0, configMsgNum: int = 0):
    return Player(
        userId=userId,
        userNickname="".join(
            random.choices(string.ascii_letters, k=random.randint(4, 12))
        ),
        configMsgNum=configMsgNum,
        config=genPlayerRpsConfig(),
    )


def genPlayerRpsConfig():
    pattern = random.choices(list(RpsChoice), k=random.randint(1, 100))
    repeatMode = random.choice(list(RepeatMode))
    configPrivacyMode = random.choice(list(ConfigPrivacyMode))
    victoryMsg = "".join(random.choices(string.ascii_letters, k=random.randint(0, 42)))

    return PlayerRpsConfig(
        pattern=pattern,
        repeatMode=repeatMode,
        configPrivacyMode=configPrivacyMode,
        victoryMsg=victoryMsg,
    )
