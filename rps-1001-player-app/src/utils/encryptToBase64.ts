import { decodeToBase64 } from "./covertUtils"

const encryptPayload = async (rsaPubKey: CryptoKey | PromiseLike<CryptoKey>, payload: string) => {
  try {
    const enc = new TextEncoder()
    const encoded = enc.encode(payload)
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      await rsaPubKey,
      encoded,
    )

    return decodeToBase64(new Uint8Array(encrypted))

  } catch (error) {
    console.error("Encryption failed:", error)
    return "Encryption failed."
  }
}

export default encryptPayload
