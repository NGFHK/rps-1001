import argparse

from lihkgParser import LihkgParser
from gameManager import GameManager


def main():
    parser = genParser()
    args = parser.parse_args()
    gameManager = GameManager()

    if args.threadId:
        lihkgParser = LihkgParser(args.threadId, args.beginMsgNum, args.endMsgNum)
        players = lihkgParser.parse()
        if not players:
            print("No players found.")
            return
        gameManager.startGame(players)
        return

    print("Emulated game started.")
    gameManager.startEmulatedGame(args.numPlayers)


def genParser():
    parser = argparse.ArgumentParser(description="連登包剪揼大賽工具小精靈。")
    parser.add_argument("--threadId", type=int, help="LIHKG嘅thread ID")
    parser.add_argument(
        "--beginMsgNum", default=2, type=int, help="報名message嘅起始編號，預設為#2"
    )
    parser.add_argument(
        "--endMsgNum",
        type=int,
        default=None,
        help="報名message嘅結束編號，預設為None，即thread最後一個message",
    )
    parser.add_argument(
        "--numPlayers",
        type=int,
        default=100,
        help="測試用，無thread ID 時使用，指定玩家數量，預設為100",
    )
    return parser


if __name__ == "__main__":
    main()
