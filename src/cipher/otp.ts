import * as utils from "./utils";

export const encrypt: Encrypter = ({ plaintext, key }) => {
  console.log("plaintext:", plaintext);
  if (plaintext.length !== key.length) {
    throw new Error("OTP key should have the same length like the message!");
  }

  const asciiPlaintext = plaintext
    .split("")
    .map((c) => BigInt(c.charCodeAt(0)));
  const asciiKey = key.split("").map((c) => BigInt(c.charCodeAt(0)));
  const applyOtpEncryption = ([p, k]: bigint[]) => {
    const result = String.fromCharCode(
      Number((p + k) % utils.ASCII_TABLE_SIZE)
    );
    console.log(result);
    return result;
  };

  return utils.zip(asciiPlaintext, asciiKey).map(applyOtpEncryption).join("");
};

export const decrypt: Decrypter = ({ ciphertext, key }) => {
  if (ciphertext.length !== key.length) {
    throw new Error("OTP key should have the same length like the message!");
  }

  const asciiPlaintext = ciphertext
    .split("")
    .map((c) => BigInt(c.charCodeAt(0)));
  const asciiKey = key.split("").map((c) => BigInt(c.charCodeAt(0)));
  const applyOtpDecryption = ([c, k]: bigint[]) =>
    String.fromCharCode(
      Number((c - k + utils.ASCII_TABLE_SIZE) % utils.ASCII_TABLE_SIZE)
    );

  return utils.zip(asciiPlaintext, asciiKey).map(applyOtpDecryption).join("");
};

export const generateKey: KeyGenerator = ({ message }) => {
  return utils.generateRandomString(message.length);
};
