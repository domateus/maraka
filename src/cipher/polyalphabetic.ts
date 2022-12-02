// Polyalphabetic Cipher using Vigenère Cipher (UTF-16).

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) + key[i % key.length].charCodeAt(0)))
      .join("");
  
// Decryption
export const decrypt: Decrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) - key[i % key.length].charCodeAt(0)))
      .join("");
