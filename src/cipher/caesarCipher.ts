// Caesar Cipher using UTF-16.

type EncryptPayload = {
    plaintext: string;
    key: number;
  };
  
type DecryptPayload = {
    ciphertext: string;
    key: number;
  };
  
type Encrypter = (payload: EncryptPayload) => string;
  
type Dencrypter = (payload: DecryptPayload) => string;
  
// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) =>
    plaintext
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) + Number(key)))
      .join("");
  
// Decryption
export const decrypt: Dencrypter = ({ ciphertext, key }) =>
    ciphertext
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0) - Number(key)))
      .join("");
