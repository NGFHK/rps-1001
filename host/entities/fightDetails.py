from enum import Enum
from .playerRpsConfig import RpsChoice


class GameResult(Enum):
    WIN = 1
    LOSE = 2
    DRAW = 3


class BattleRecord:
    def __init__(self, playerAChoice: RpsChoice, playerBChoice: RpsChoice):
        self.playerAChoice = playerAChoice
        self.playerBChoice = playerBChoice

    def __str__(self):
        return f"{self.playerAChoice}💥{self.playerBChoice}"


class FightDetails:
    def __init__(
        self,
        playerAName: str,
        playerBName: str,
        gameResult: GameResult,
        battleRecords: list[BattleRecord],
    ):
        self.playerAName = playerAName
        self.playerBName = playerBName
        self.gameResult = gameResult
        self.battleRecords = battleRecords

    def genGameResultStr(self):
        match self.gameResult:
            case GameResult.WIN:
                return f"{self.playerAName} 勝"
            case GameResult.LOSE:
                return f"{self.playerBName} 勝"
            case GameResult.DRAW:
                return f"無限平手。{self.playerAName}、{self.playerBName} 同時晉級。"

    def __str__(self):
        header = f"**{self.playerAName} 對 {self.playerBName}**"
        battleRecordsStr = " | ".join(map(str, self.battleRecords))
        resultStr = self.genGameResultStr()

        return "\n".join([header, battleRecordsStr, resultStr])
