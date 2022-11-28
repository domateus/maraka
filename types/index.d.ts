type Message<T = MessagePayloadTypes> = {
  id: string;
  from: string;
  to: string;
  timestamp: number;
  payload: T;
};

type MessagePayloadTypes =
  | KeyExchangePayload
  | TextPayload
  | AlgorithmPSKPayload;

type EncryptionAlgorithm =
  | "Caesar cipher"
  | "Monoalphabetic"
  | "Polyalphabetic"
  | "Hill cipher"
  | "Playfair"
  | "OTP"
  | "Rail fence"
  | "Columnar"
  | "DES"
  | "AES"
  | "RC4"
  | "RSA"
  | "ECC";

type KeyExchangePayload = {
  type: "KEY_EXCHANGE";
  publicKey: string;
};

type TextPayload = {
  type: "MESSAGE";
  text: string;
  encryption: EncryptionAlgorithm;
};

type AlgorithmPSKPayload = {
  type: "ALGORITHM_PSK";
  encryption: EncryptionAlgorithm;
  psk: string;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  hasUnreadMessages: boolean;
  canScrollToNewMessages: boolean;
};

type EncryptPayload = {
  plaintext: string;
  key: string;
};

type DecryptPayload = {
  ciphertext: string;
  key: string;
};

type Encrypter = (payload: EncryptPayload) => string;

type Decrypter = (payload: DecryptPayload) => string;

type MonoalphabeticRandomKeyGenerator = () => string;

type PlayfairKeyMatrixGeneratorPayload = { key: string };

type PlayfairKeyMatrixGenerator = (payload: PlayfairKeyMatrixGeneratorPayload) => string[][];
