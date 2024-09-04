from .fightDetails import *
from .playerRpsConfig import PlayerRpsConfig, RepeatMode, RpsChoice, RpsResult


class Player:
    """
    :param userId: The user's ID from LIHKG.
    :param userNickname: The user's nickname from LIHKG.
    :param nextPatternIndex: The index of the last pattern used by the player.
    :ivar field: followers
    """

    def __init__(
        self,
        userId,
        userNickname,
        configMsgNum: int,
        config: PlayerRpsConfig,
        nextPatternIndex=0,
    ):
        self.userId = userId
        self.userNickname = userNickname
        self.nextPatternIndex = nextPatternIndex
        self.configMsgNum = configMsgNum
        self.config = config
        self.followers = []

    def fightWith(self, anotherPlayer) -> FightDetails:
        self.resetPatternIndexIfNeededOnFightStart()
        anotherPlayer.resetPatternIndexIfNeededOnFightStart()

        longestPatternLen = max(
            len(self.config.pattern), len(anotherPlayer.config.pattern)
        )

        battleRecords = []
        gameResult = GameResult.DRAW

        for _ in range(longestPatternLen):
            selfPattern = self.useNextPattern()
            anotherPattern = anotherPlayer.useNextPattern()

            battleRecords.append(BattleRecord(selfPattern, anotherPattern))

            result = selfPattern.beats(anotherPattern)
            if result == RpsResult.WIN:
                gameResult = GameResult.WIN
                break
            elif result == RpsResult.LOSE:
                gameResult = GameResult.LOSE
                break

        return FightDetails(
            self.genSelfAndFollowersNames(),
            anotherPlayer.genSelfAndFollowersNames(),
            gameResult,
            battleRecords,
        )

    def useNextPattern(self) -> RpsChoice:
        nextPattern = self.config.pattern[self.nextPatternIndex]
        self.nextPatternIndex = (self.nextPatternIndex + 1) % len(self.config.pattern)
        return nextPattern

    def resetPatternIndexIfNeededOnFightStart(self):
        if self.config.repeatMode == RepeatMode.REPEAT_EVERY_ROUND_OR_EXHAUSTED:
            self.nextPatternIndex = 0

    def addFollowers(self, player):
        """add another player and its followers to this player's followers"""
        self.followers.append(player)
        self.followers += player.followers

    def addFollower(self, player):
        self.followers.append(player)

    def genSelfAndFollowersNames(self):
        if not self.followers:
            return self.userNickname

        return f"{self.userNickname} （👪：{', '.join([follower.userNickname for follower in self.followers])}）"

    def genVictoryMsgs(self):
        return [self.config.victoryMsg] + [
            follower.config.victoryMsg for follower in self.followers
        ]
