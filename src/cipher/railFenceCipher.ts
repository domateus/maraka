// Rail Fence Cipher

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
export const encrypt: Encrypter = ({ plaintext, key }) => {
        
  if (key < 2) return plaintext;

  let plaintextArray: string[] = plaintext.toUpperCase().replace(/[^A-Z]/gi, "").split("")

  // Padding until it's a multiple of 'k'
  // https://en.wikipedia.org/wiki/Rail_fence_cipher#Decryption
  while ((plaintextArray.length % (2*(key-1))) !== 0) plaintextArray.push("X");

  plaintextArray = plaintextArray.reverse();

  let rails: string[][] = [];
  for (let i = 0; i < key; i++) {
      rails.push([]);
  }

  let i: number = 0;
  let step: number = 1;

  while (plaintextArray.length > 0) {
      rails[i].push(plaintextArray.pop()!);
      i += step;
      if (i < 0 || i >= key) {
          step *= -1;
          i += step * 2;
      }
  }

  let ciphertext: string = rails.map((row) => row.join("")).join("");

  return ciphertext
  
};
  
// Decryption
export const decrypt: Dencrypter = ({ ciphertext, key }) => {
            
  if (key < 2) return ciphertext;

  let ciphertextArray: string[] = ciphertext.split("");
  const size: number = ciphertext.length

  const k: number = size / (2*(key-1)); // https://en.wikipedia.org/wiki/Rail_fence_cipher#Decryption

  let rails: string[][] = [];

  // Push first rail
  rails.push(ciphertextArray.splice(0, k));
  // Push middle rails (if any)
  for (let i = 1; i < key-1; i++)
      rails.push(ciphertextArray.splice(0, 2*k));
  // Push last rail
  rails.push(ciphertextArray);

  let i: number = 0;
  let step: number = 1; // 1 or -1
  let plaintext: string = ""
      
  while(plaintext.length < size) {
      plaintext += rails[i].shift();
      i += step;
      if (i < 0 || i >= key) {
          step *= -1;
          i += step * 2;
      }
  }

  return plaintext;
};
