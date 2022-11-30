import * as utils from "./utils";

function generateE(totient: bigint) {
  let e = utils.getRandomPrime() ?? 1;
  while (utils.gcd(e, totient) !== 1n) {
    e += 2n;
  }
  return e;
}

function computeD(e: bigint, totient: bigint) {
  let d = utils.extendedEuclidean(e, totient)[0];
  while (d < 1n) {
    d += totient;
  }
  return d;
}

export function generateKeys(): KeyPair {
  const prime1 = utils.getRandomPrime();
  let prime2 = utils.getRandomPrime();

  //Prime numbers should not be equal,so this loop makes a lookup for a not equal prime number
  while (prime1 === prime2) {
    prime2 = utils.getRandomPrime();
  }
  console.log("primes: ", prime1, prime2);
  //calculating n
  const n = prime1 * prime2;

  //calculating totient(n)
  const totient: bigint = (prime1 - 1n) * (prime2 - 1n);
  console.log("totient: ", totient);

  //calculating e
  const e = generateE(totient);

  //calculating d
  const d = computeD(e, totient);

  //create public key
  const publicKey = [e, n];

  //create private key
  const privateKey = [d, n];

  return {
    publicKey,
    privateKey,
  };
}

export const encrypt: RsaEncrypter = ({ plaintext, publicKey }) => {
  //get the parts of public key for encryption
  const [e, n] = publicKey;

  return utils
    .hexToXByteBigIntArray(utils.asciiToHex(plaintext), 1)
    .map((base) => utils.bigIntToXBytePaddedHex(utils.modPow(base, e, n), 4))
    .join("");
};

export const decrypt: RsaDecrypter = ({ ciphertext, privateKey }) => {
  //get the parts of private key for decryption
  const [d, n] = privateKey;

  return utils
    .hexToXByteBigIntArray(ciphertext, 4)
    .map((base) =>
      utils.hexToAscii(utils.bigIntToHex(utils.modPow(base, d, n)))
    )
    .join("");
};
