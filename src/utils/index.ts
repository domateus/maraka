import * as otp from "@cipher/otp";

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (window.crypto.getRandomValues(new Uint8Array(1))[0] &
        (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}

export function generateRsaKeys(): SessionKeyPair {
  const getRandomBigInts = (): string[] =>
    [...window.crypto.getRandomValues(new Uint16Array(2))].map((n) =>
      n.toString()
    );
  return {
    publicKey: getRandomBigInts(),
    privateKey: getRandomBigInts(),
  };
}

export function contactValidKey({
  contact,
  algorithm,
}: Omit<GenerateKeyPayload, "message">) {
  const key = (contact?.keys || []).find((key) => key.type === algorithm);
  const hour = 1000 * 60 * 60;
  if (!key || key?.timestamp < Date.now() - hour) {
    return null;
  }
  return key;
}

export function getCiphertext({
  algorithm,
  key,
  plaintext,
}: Required<EncryptMessagePayload>): string {
  switch (algorithm) {
    case "Caesar cipher":
      return plaintext;
    case "Monoalphabetic":
      return plaintext;
    case "Polyalphabetic":
      return plaintext;
    case "Hill cipher":
      return plaintext;
    case "Playfair":
      return plaintext;
    case "OTP":
      return otp.encrypt({ key, plaintext });
    case "Rail fence":
      return plaintext;
    case "Columnar":
      return plaintext;
    case "DES":
      return plaintext;
    case "AES":
      return plaintext;
    case "RC4":
      return plaintext;
    case "RSA":
      return plaintext;
    case "ECC":
      return plaintext;
    default:
      return plaintext;
  }
}

export function getPlaintext({
  algorithm,
  message,
  key,
}: Required<DecryptMessagePayload>): string {
  switch (algorithm) {
    case "Caesar cipher":
      return message;
    case "Monoalphabetic":
      return message;
    case "Polyalphabetic":
      return message;
    case "Hill cipher":
      return message;
    case "Playfair":
      return message;
    case "OTP":
      return otp.decrypt({ key, ciphertext: message });
    case "Rail fence":
      return message;
    case "Columnar":
      return message;
    case "DES":
      return message;
    case "AES":
      return message;
    case "RC4":
      return message;
    case "RSA":
      return message;
    case "ECC":
      return message;
    default:
      return message;
  }
}

export function generateKey({ algorithm, message }: GenerateKeyPayload) {
  switch (algorithm) {
    case "Caesar cipher":
      return generateCaesarCipherKey(message);
    case "Monoalphabetic":
      return generateMonoalphabeticKey(message);
    case "Polyalphabetic":
      return generateMonoalphabeticKey(message);
    case "Hill cipher":
      return generateHillCipherKey(message);
    case "Playfair":
      return generatePlayfairKey(message);
    case "OTP":
      return generateOTPKey(message);
    case "Rail fence":
      return generateRailFenceKey(message);
    case "Columnar":
      return generateColumnarKey(message);
    case "DES":
      return generateDESKey(message);
    case "AES":
      return generateAESKey(message);
    case "RC4":
      return generateRC4Key(message);
    case "RSA":
      return generateRSAKey(message);
    case "ECC":
      return generateECCKey(message);
    default:
      throw new Error("Algorithm not found");
  }
}

export function encryptKey({
  message,
  publicKey,
}: {
  message: string;
  publicKey: string[];
}) {
  return message;
}

export function decryptKey({
  message,
  privateKey,
}: {
  message: string;
  privateKey: string[];
}) {
  return message;
}

function generateCaesarCipherKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateMonoalphabeticKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateHillCipherKey(message: string) {
  throw new Error("Function not implemented.");
}

function generatePlayfairKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateOTPKey(message: string) {
  return otp.generateKey({ message });
}

function generateRailFenceKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateColumnarKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateDESKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateAESKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateRC4Key(message: string) {
  throw new Error("Function not implemented.");
}

function generateRSAKey(message: string) {
  throw new Error("Function not implemented.");
}

function generateECCKey(message: string) {
  throw new Error("Function not implemented.");
}
