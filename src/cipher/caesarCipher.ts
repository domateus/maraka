// Caesar Cipher using UTF-16.

import { asciiToHex, hexToAscii } from "./utils";

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) => {
  console.log(
    "KEY: ",
    key,
    parseInt(key, 16),
    plaintext,
    hexToAscii(plaintext)
  );
  const result = hexToAscii(plaintext)
    .split("")
    .map((c) =>
      asciiToHex(String.fromCharCode(c.charCodeAt(0) + parseInt(key, 16)))
    )
    .join("");
  console.log("ceaser encrypt result: ", result);
  return result;
};

// Decryption
export const decrypt: Decrypter = ({ ciphertext, key }) => {
  console.log(
    "KEY: ",
    key,
    parseInt(key, 16),
    ciphertext,
    hexToAscii(ciphertext)
  );
  return hexToAscii(ciphertext)
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) - parseInt(key, 16)))
    .join("");
};
