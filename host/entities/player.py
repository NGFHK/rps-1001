from .gameResult import GameResult
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

    def fightWith(self, anotherPlayer) -> GameResult:
        self.resetPatternIndexIfNeededOnFightStart()
        anotherPlayer.resetPatternIndexIfNeededOnFightStart()

        longestPatternLen = max(
            len(self.config.pattern), len(anotherPlayer.config.pattern)
        )

        battleLogStrings = []
        for _ in range(longestPatternLen):
            selfPattern = self.useNextPattern()
            anotherPattern = anotherPlayer.useNextPattern()

            log = f"{selfPattern}💥{anotherPattern}"
            battleLogStrings.append(log)

            result = selfPattern.beats(anotherPattern)
            if result == RpsResult.WIN:
                print(" | ".join(battleLogStrings))
                return GameResult.WIN
            elif result == RpsResult.LOSE:
                print(" | ".join(battleLogStrings))
                return GameResult.LOSE

        print(" | ".join(battleLogStrings))
        return GameResult.DRAW

    def useNextPattern(self) -> RpsChoice:
        nextPattern = self.config.pattern[self.nextPatternIndex]
        self.nextPatternIndex = (self.nextPatternIndex + 1) % len(self.config.pattern)
        return nextPattern

    def resetPatternIndexIfNeededOnFightStart(self):
        if self.config.repeatMode == RepeatMode.REPEAT_EVERY_ROUND_OR_EXHAUSTED:
            self.nextPatternIndex = 0

    def addFollowers(self, player):
        self.followers.append(player)
        self.followers += player.followers

    def addFollower(self, player):
        self.followers.append(player)

    def genSelfAndFollowersNames(self):
        if not self.followers:
            return self.userNickname

        return f"{self.userNickname} ({', '.join([follower.userNickname for follower in self.followers])})"

    def genVictoryMsgs(self):
        return [self.config.victoryMsg] + [
            follower.config.victoryMsg for follower in self.followers
        ]
