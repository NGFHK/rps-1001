from entities.game import Game
from randomPlayerGenerator import genPlayer


class GameManager:
    def startGame(self, players):
        # to remove duplicated players
        actualPlayers = []
        seenIds = set()
        for player in players[::-1]:
            if player.userId not in seenIds:
                actualPlayers.append(player)
                seenIds.add(player.userId)

        actualPlayers = actualPlayers[::-1]

        self.game = Game(actualPlayers)
        self.game.start()

    def startEmulatedGame(self, numPlayers):
        players = []
        for i in range(numPlayers):
            players.append(genPlayer(configMsgNum=i + 1))

        self.game = Game(players)
        self.game.start()
