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
  key?: string;
};

type AlgorithmPSKPayload = {
  type: "ALGORITHM_PSK";
  encryption: EncryptionAlgorithm;
  psk: string;
};

type Contact = {
  id: number;
  name: string;
  publicKey: string[];
  hasUnreadMessages: boolean;
  canScrollToNewMessages: boolean;
  keys: AlgorithmKey[];
};

type AlgorithmKey = {
  timestamp: number;
  type: EncryptionAlgorithm;
  value: string | bigint[];
};

type AddKeyPayload = {
  contactName: name;
  key: AlgorithmKey;
};

type EncryptPayload = {
  plaintext: string;
  key: string;
};

type DecryptPayload = {
  ciphertext: string;
  key: string;
};

type GenerateKeyPayload = {
  algorithm?: EncryptionAlgorithm;
  message: string;
  contact?: Contact;
};

type DecryptMessagePayload = {
  algorithm?: EncryptionAlgorithm;
  message: string;
  key?: string;
};

type EncryptMessagePayload = {
  algorithm?: EncryptionAlgorithm;
  plaintext: string;
  key?: string;
};

type Encrypter = (payload: EncryptPayload) => string;

type Decrypter = (payload: DecryptPayload) => string;

type KeyGenerator = (payload: GenerateKeyPayload) => string;

type SessionKeyPair = {
  privateKey: string[];
  publicKey: string[];
};
