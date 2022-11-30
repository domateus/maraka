// Monoalphabetic Cipher using UTF-16.
// with random UTF-16 key generator

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c) => String.fromCharCode(        // convert the key UTF-16 to char
          key[c.charCodeAt(0)]                // lookup the key with the UTF-16 code of the char from plaintext
          .charCodeAt(0)))                    // convert the key char to UTF-16
      .join("");
  
// Decryption
export const decrypt: Decrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c) => String.fromCharCode(        // convert the key index as UTF-16 to char
          key.indexOf(c)))                    // lookup the index of the char in the key
      .join("");
