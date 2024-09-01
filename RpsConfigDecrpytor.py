from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.hashes import SHA256
import base64


def decrypt_input(encrypted_input_base64):
    # Read the private key from alpha_private.pem
    with open("./keys/alpha_private.pem", "rb") as key_file:
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

# Example usage
encrypted_input_base64 = "iIbqYdF/F9AExex17L8snbja9ZKo3U2pNlPn8DVmcOTurwctt0Qbb2qvXPwvQNSpL6FJoxlC98QGsTbbSv91jUk1LgLy4fmCbdmDpREg2bnqCj/Z43FBXTBpsux5LPgnXdrENLQ/Pc/61doZAgzMqMNNuKQ8F6S+SqPFmSvP2xp+U2xqTgkyVr5UqwoaWetgrk0bWNjr4U5vTabR/0e1g23h2nC3f4/osXkyZkBgD3x8m+X6v89padc8hAzqladDOht+NgeMSfRiPUy8YYdC2qa7Px4Lbb2vPnmhvNeKUHDQfG084C5cWLEgtahuOlMNO1LfyTmKR/dDMlHPdNbDnA=="
decrypted_output = decrypt_input(encrypted_input_base64)
print(decrypted_output)
