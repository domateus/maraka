type Message = {
  id: string;
  text: string;
  from: string;

  // Optional fields
  timestamp?: number;

  // Optional fields with default values
  isDeleted?: boolean;

  // Optional fields with default values and type assertions
  isStarred?: boolean;
  isArchived?: boolean;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  hasUnreadMessages: boolean;
};

type EncryptPayload = {
  plaintext: string;
  key: string;
};

type DecryptPayload = {
  ciphertext: string;
  key: string;
};

type RsaEncryptPayload = {
  plaintext: string;
  publicKey: bigint[];
};

type RsaDecryptPayload = {
  ciphertext: string;
  privateKey: bigint[];
};

type Encrypter = (payload: EncryptPayload) => string;

type Decrypter = (payload: DecryptPayload) => string;

type RsaEncrypter = (payload: RsaEncryptPayload) => string;

type RsaDecrypter = (payload: RsaDecryptPayload) => string;

type KeyPair = {
  publicKey: bigint[],
  privateKey: bigint[]
}