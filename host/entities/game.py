"""
Result printing is pretty messy. Worth refactoring later.
"""

import math

from .gameResult import GameResult
from .player import Player

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

        print(f"有效報名人數： {len(self.players)}")
        print(f"自動首輪晉級人數： {self.numOfByePlayers}")
        print()

        print("# 參賽者名單\n")
        print(self.gen_player_list_str())

        print()
        print("比賽開始！\n")
        self.run_tournament()

    def run_tournament(self):
        if len(self.players) == 1:
            print("得一人參賽。冠軍：", self.players[0].userNickname)
            return

        # First round
        print("# 第1輪\n")
        autoPromotedPlayers = self.players[: self.numOfByePlayers]
        roundOnePlayers = self.players[self.numOfByePlayers :]
        roundOne = Round(roundOnePlayers)
        remainingPlayers = autoPromotedPlayers + roundOne.start()

        roundNum = 2
        while len(remainingPlayers) > 1:
            print(f"# 第{roundNum}輪\n")
            remainingPlayers = Round(remainingPlayers).start()
            roundNum += 1

        winner: Player = remainingPlayers[0]
        print(f"冠軍： {winner.genSelfAndFollowersNames()}")

        prettyVictoryMsgs = [f"「{msg}」" for msg in winner.genVictoryMsgs()]
        print(f"得獎宣言: {'、'.join(prettyVictoryMsgs)}")

    def gen_player_list_str(self):
        playerInfoRows = [
            " - "
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
        if not isPowerOfTwo(len(players)):
            raise ValueError("Number of players must be a power of 2.")

    def start(self) -> list:
        promotingPlayers = []
        # Pair up players by their order
        pairs = [
            (self.players[i], self.players[i + 1])
            for i in range(0, len(self.players), 2)
        ]
        for playerA, playerB in pairs:
            print(
                f"{playerA.genSelfAndFollowersNames()} 🤜 🤛 {playerB.genSelfAndFollowersNames()}"
            )
            result = playerA.fightWith(playerB)

            match result:
                case GameResult.WIN:
                    promotingPlayers.append(playerA)
                    print(f"{playerA.genSelfAndFollowersNames()} 勝")
                case GameResult.LOSE:
                    promotingPlayers.append(playerB)
                    print(f"{playerB.genSelfAndFollowersNames()} 勝")
                case GameResult.DRAW:
                    playerA.addFollowers(playerB)
                    promotingPlayers.append(playerA)
                    print(f"平手。{playerA.genSelfAndFollowersNames()} 同時晉級。")
            print("---")

        return promotingPlayers
