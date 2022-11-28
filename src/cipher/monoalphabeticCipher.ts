// Monoalphabetic Cipher using UTF-16.
// with random UTF-16 key generator

type EncryptPayload = {
    plaintext: string;
    key: string;
  };
  
type DecryptPayload = {
    ciphertext: string;
    key: string;
  };

type RandomKeyGenerator = () => string;

type Encrypter = (payload: EncryptPayload) => string;

type Dencrypter = (payload: DecryptPayload) => string;
  
// Random Key Generator (UTF-16)
export const randomKeyGenerator: RandomKeyGenerator = () =>
    Array.from(Array(256).keys())       // generate a sequence from 1 to 256
      .sort(() => Math.random() - 0.5)    // randomize the sequence
      .map((c) => String.fromCharCode(c)) // convert to UTF-16
      .join("");

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c) => String.fromCharCode(        // convert the key UTF-16 to char
          key[c.charCodeAt(0)]                // lookup the key with the UTF-16 code of the char from plaintext
          .charCodeAt(0)))                    // convert the key char to UTF-16
      .join("");
  
// Decryption
export const decrypt: Dencrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c) => String.fromCharCode(        // convert the key index as UTF-16 to char
          key.indexOf(c)))                    // lookup the index of the char in the key
      .join("");
