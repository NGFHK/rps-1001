from entities.game import Game
from randomPlayerGenerator import genPlayer


class GameManager:
    def startGame(self, players):
        self.game = Game(players)
        self.game.start()

    def startEmulatedGame(self, numPlayers):
        players = []
        for i in range(numPlayers):
            players.append(genPlayer(configMsgNum=i + 1))

        self.game = Game(players)
        self.game.start()
