// Caesar Cipher using UTF-16.

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) + Number(key)))
      .join("");
  
// Decryption
export const decrypt: Decrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) - Number(key)))
      .join("");
