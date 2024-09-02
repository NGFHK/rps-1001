from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.hashes import SHA256
import base64
import json
from entities.playerRpsConfig import *


def decrypt_input(encrypted_input_base64):
    # Read the private key from alpha_private.pem
    with open("../keys/alpha_private.pem", "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
        )

    # Decode the base64-encoded input
    encrypted_input = base64.b64decode(encrypted_input_base64)

    # Decrypt the input using RSA-OAEP
    decrypted_input = private_key.decrypt(
        encrypted_input,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=SHA256()), algorithm=SHA256(), label=None
        ),
    )

    return decrypted_input


def decrypt_to_config(encrypted_input_base64) -> PlayerRpsConfig:
    decrypted_raw_config = decrypt_input(encrypted_input_base64)
    decrypted_json = json.loads(decrypted_raw_config)

    repeatMode = RepeatMode[decrypted_json["repeatMode"]]
    configPrivacyMode = ConfigPrivacyMode[decrypted_json["configPrivacyMode"]]
    victoryMsg = decrypted_json["victoryMsg"]
    pattern = [RpsChoice(choice) for choice in decrypted_json["pattern"]]

    return PlayerRpsConfig(pattern, repeatMode, configPrivacyMode, victoryMsg)
