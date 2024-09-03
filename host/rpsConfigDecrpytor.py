from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.hashes import SHA256
import base64
import json
from entities.playerRpsConfig import *


class RpsConfigDecrpytor:
    def __init__(self, privateKeyPath: str) -> None:
        self.privateKey = self._load_private_key(privateKeyPath)

    def _load_private_key(self, privateKeyPath: str):
        with open(privateKeyPath, "rb") as key_file:
            return serialization.load_pem_private_key(
                key_file.read(),
                password=None,
            )

    def decrypt(self, encryptedTextInBase64: str):
        encryptedText = base64.b64decode(encryptedTextInBase64)
        decryptedText = self.privateKey.decrypt(
            encryptedText,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=SHA256()), algorithm=SHA256(), label=None
            ),
        )
        return decryptedText

    def decrypt_to_config(self, encryptedTextInBase64: str):
        decryptedText = self.decrypt(encryptedTextInBase64)
        decryptedJson = json.loads(decryptedText)

        repeatMode = RepeatMode[decryptedJson["repeatMode"]]
        
        configPrivacyMode = None
        try:
            configPrivacyMode = ConfigPrivacyMode[decryptedJson["configPrivacyMode"]]
        except KeyError:
            # Alpha web had a bug: the configPrivacyMode was stored as True/False,
            # the bug has fixed, but we still need to handle True/False.
            configPrivacyMode = ConfigPrivacyMode.PUBLIC if decryptedJson["configPrivacyMode"] == True else ConfigPrivacyMode.PRIVATE

        victoryMsg = decryptedJson.get("victoryMsg") or ""
        pattern = [RpsChoice(choice) for choice in decryptedJson["pattern"]]

        return PlayerRpsConfig(pattern, repeatMode, configPrivacyMode, victoryMsg)
