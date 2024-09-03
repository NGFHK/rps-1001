"""
The code is shit but it works.
"""

import requests
import re

from entities.player import Player
from rpsConfigDecrpytor import RpsConfigDecrpytor

BASE_URL = "https://lihkg.com/api_v2/thread"
PRIVATE_KEY_PATH = "../keys/alpha_private.pem"

class LihkgParser:
    def __init__(
        self, threadId: int, beginMsgNum: int = 2, endMsgNum: int = None
    ) -> None:
        self.threadId = threadId
        self.beginMsgNum = beginMsgNum
        self.endMsgNum = endMsgNum
        self.startingPage = self.calStartingPage(beginMsgNum)
        self.readingPage = self.startingPage
        self.decrpytor = RpsConfigDecrpytor(PRIVATE_KEY_PATH)

    def calStartingPage(self, beginMsgNum: int) -> int:
        return beginMsgNum // 26 + 1

    def parse(self) -> list[Player]:
        players = []
        isPageValid = True
        while isPageValid:
            responseJson = self.fetchThreadPage()["response"]

            isPageValid = len(responseJson["item_data"]) > 0
            if not isPageValid:
                break

            for item in responseJson["item_data"]:
                if not self.beginMsgNum <= item["msg_num"]:
                    continue
                if self.endMsgNum and item["msg_num"] > self.endMsgNum:
                    isPageValid = False
                    break

                msg = item["msg"]
                if '<pre><code data-type="">' not in msg:
                    continue

                # parse msg by using regex to find the text between <pre><code data-type="">...</code></pre>
                pattern = r'<pre><code data-type="">(.*?)</code></pre>'
                matches = re.findall(pattern, msg, re.DOTALL)
                if not matches:
                    continue

                # use the latest one
                encryptedMsg = matches[-1]
                config = None
                try:
                    config = self.decrpytor.decrypt_to_config(encryptedMsg)
                except Exception as e:
                    print(f"Failed to decrypt message: {encryptedMsg}")
                    print(e)
                    continue

                msgNum = item["msg_num"]
                userNickname = item["user_nickname"]
                userId = item["user"]["user_id"]

                player = Player(userId, userNickname, msgNum, config)
                players.append(player)

        return players

    def fetchThreadPage(self):
        url = f"{BASE_URL}/{self.threadId}/page/{self.readingPage}?order=reply_time"
        # Copied from https://github.com/tonyfung99/lihkg-python/blob/a40931062580b664904a55f330a2f4b99876343e/network.py#L5-L11
        headers = {
            "X-LI-DEVICE": "7137b91d34c213695cf29dc3da2a8f5a95c3b976",
            "X-LI-DEVICE-TYPE": "android",
            "User-Agent": "LIHKG/16.0.4 Android/9.0.0 Google/Pixel XL",
            "orginal": "https://lihkg.com",
            "referer": "https://lihkg.com/category/1",
        }
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            print(response)
            print(f"Failed to fetch thread page: {response.status_code}")
            raise Exception("Failed to fetch thread page")

        self.readingPage += 1
        return response.json()
