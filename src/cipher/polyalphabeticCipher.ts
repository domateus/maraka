// Polyalphabetic Cipher using Vigenère Cipher (UTF-16).

type EncryptPayload = {
    plaintext: string;
    key: string;
  };
  
type DecryptPayload = {
    ciphertext: string;
    key: string;
  };

type Encrypter = (payload: EncryptPayload) => string;

type Dencrypter = (payload: DecryptPayload) => string;
  
// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) + key[i % key.length].charCodeAt(0)))
      .join("");
  
// Decryption
export const decrypt: Dencrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) - key[i % key.length].charCodeAt(0)))
      .join("");
