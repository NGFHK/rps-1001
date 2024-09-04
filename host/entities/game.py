"""
Result printing is pretty messy. Worth refactoring later.
"""

import math

from .player import Player
from .fightDetails import GameResult

USERNAME_COL_NAME = "Nick name"
USER_ID_COL_NAME = "User ID"
REPLY_ID_COL_NAME = "Reply ID"
BYE_TEXT = "(Bye 1st round)"

USERNAME_COL_WIDTH = 16
USER_ID_COL_WIDTH = 8
REPLY_ID_COL_WIDTH = len(
    REPLY_ID_COL_NAME
)  # Column name is longer than the longest reply ID

class Game:
    def __init__(self, players: list):
        self.players = players
        self.numOfByePlayers = self.calculate_num_of_bye_players(len(players))

    def calculate_num_of_bye_players(self, totalNumOfPlayers):
        n = math.ceil(math.log2(totalNumOfPlayers))
        return (2**n) - totalNumOfPlayers

    def start(self):
        """
        Game can always be started.
        The result is deterministic.
        """
        # TODO: Refactor text printing to a separate class

        print("```md")
        print(f"有效報名人數： {len(self.players)}")
        print(f"自動首輪晉級人數： {self.numOfByePlayers}")
        print()

        print("# 參賽者名單\n")
        print(self.gen_player_list_str())
        print("```")

        print("比賽開始！")
        self.run_tournament()

    def run_tournament(self):
        if len(self.players) == 1:
            print("得一人參賽。冠軍：", self.players[0].userNickname)
            return

        # First round
        print("```md")
        print("# 第1輪\n")
        autoPromotedPlayers = self.players[: self.numOfByePlayers]
        roundOnePlayers = self.players[self.numOfByePlayers :]
        roundOne = Round(roundOnePlayers)
        remainingPlayers = autoPromotedPlayers + roundOne.start()
        print("```")

        roundNum = 2
        while len(remainingPlayers) > 1:
            print("```md")
            print(f"# 第{roundNum}輪\n")
            remainingPlayers = Round(remainingPlayers).start()
            print("```")

            roundNum += 1

        winner: Player = remainingPlayers[0]
        prettyVictoryMsgs = [f"「{msg}」" for msg in winner.genVictoryMsgs()]
        print("```md")
        print("# 結果\n")
        print(f"冠軍： {winner.genSelfAndFollowersNames()}")
        print(f"得獎宣言: {'、'.join(prettyVictoryMsgs)}")
        print("```")

    def gen_player_list_str(self):
        playerInfoRows = [
            "- "
            f"{'#' + str(player.configMsgNum):{5}} "
            f"{player.userNickname}#{player.userId}"
            f"{" " + BYE_TEXT if i < self.numOfByePlayers else ''}"
            for i, player in enumerate(self.players)
        ]
        return "\n".join(playerInfoRows)


def isPowerOfTwo(n):
    return (n & (n - 1)) == 0


class Round:
    def __init__(self, players: list[Player]):
        self.players = players
        if len(players) % 2 != 0:
            raise ValueError("Number of players must be divisible by 2.")

    def start(self) -> list:
        promotingPlayers = []
        # Pair up players by their order
        pairs = [
            (self.players[i], self.players[i + 1])
            for i in range(0, len(self.players), 2)
        ]
        for playerA, playerB in pairs:
            fightDetails = playerA.fightWith(playerB)
            print(fightDetails)
            match fightDetails.gameResult:
                case GameResult.WIN:
                    promotingPlayers.append(playerA)
                case GameResult.LOSE:
                    promotingPlayers.append(playerB)
                case GameResult.DRAW:
                    playerA.addFollowers(playerB)
                    promotingPlayers.append(playerA)

        return promotingPlayers
