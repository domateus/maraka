// Playfair Cipher

type EncryptPayload = {
    plaintext: string;
    key: string;
  };
  
type DecryptPayload = {
    ciphertext: string;
    key: string;
  };

type KeyMatrixGenerator = (key: string) => string[][];

type Encrypter = (payload: EncryptPayload) => string;

type Dencrypter = (payload: DecryptPayload) => string;
  
// Generate the key matrix from the key string.
export const genKeyMatrix: KeyMatrixGenerator = (key) => {
  // remove non-alphabets
  let keyArray: string[] = key.toUpperCase().split("").filter((c) => c.match(/[A-Z]/));
  
  // replace J with I
  keyArray = keyArray.map((c) => (c === "J" ? "I" : c));

  // add alphabet to the key (minus J)
  keyArray = [...keyArray, ..."ABCDEFGHIKLMNOPQRSTUVWXYZ".split("")];

  // remove duplicates
  keyArray = keyArray.filter((c, i) => keyArray.indexOf(c) === i);
  
  // split into 5x5 matrix and return the matrix
  return keyArray.join("").match(/.{5}/g)!.map((c) => c.split(""));
}

// Encryption
export const encrypt: Encrypter = ({ plaintext, key }) => {
  let keyMatrix: string[][] = genKeyMatrix(key);

  let plaintextArray: string[] = plaintext.toUpperCase().split("").filter((c) => c.match(/[A-Z]/));
  plaintextArray = plaintextArray.map((c) => (c === "J" ? "I" : c));
  plaintextArray = plaintextArray.reverse();
  
  let pairArray: string[][] = [];
  while (plaintextArray.length > 0) {
    let pair: string[] = [plaintextArray.pop()!];

    if (plaintextArray.length === 0 || plaintextArray[plaintextArray.length - 1] === pair[0]) {
      pair.push("X");
    } else {
      pair.push(plaintextArray.pop()!);
    }

    pairArray.push(pair);
  }

  let ciphertextArray = [];
  for (let pair of pairArray) {
    let r1 = keyMatrix.findIndex((row) => row.includes(pair[0]));
    let c1 = keyMatrix[r1].findIndex((c) => c === pair[0]);

    let r2 = keyMatrix.findIndex((row) => row.includes(pair[1]));
    let c2 = keyMatrix[r2].findIndex((c) => c === pair[1]);

    if (r1 === r2) {
      ciphertextArray.push(keyMatrix[r1][(c1 + 1) % 5]);
      ciphertextArray.push(keyMatrix[r2][(c2 + 1) % 5]);
    } else if (c1 === c2) {
      ciphertextArray.push(keyMatrix[(r1 + 1) % 5][c1]);
      ciphertextArray.push(keyMatrix[(r2 + 1) % 5][c2]);
    } else {
      ciphertextArray.push(keyMatrix[r1][c2]);
      ciphertextArray.push(keyMatrix[r2][c1]);
    }
  }
  
  return ciphertextArray.join("");
}
  
// Decryption
export const decrypt: Dencrypter = ({ ciphertext, key }) => {
  if (ciphertext === "") return "";

  let keyMatrix: string[][] = genKeyMatrix(key);
        
  let ciphertextArray: string[][] = [];
  for (let pair of ciphertext.match(/.{2}/g)!){
      ciphertextArray.push(pair.split(""));
  };

  let plaintextArray: string[] = [];
  for (let pair of ciphertextArray) {
      let r1: number = keyMatrix.findIndex((row) => row.includes(pair[0]));
      let c1: number = keyMatrix[r1].findIndex((c) => c === pair[0]);

      let r2: number = keyMatrix.findIndex((row) => row.includes(pair[1]));
      let c2: number = keyMatrix[r2].findIndex((c) => c === pair[1]);

      if (r1 === r2) {
          plaintextArray.push(keyMatrix[r1][(c1 + 4) % 5]);
          plaintextArray.push(keyMatrix[r2][(c2 + 4) % 5]);
      } else if (c1 === c2) {
          plaintextArray.push(keyMatrix[(r1 + 4) % 5][c1]);
          plaintextArray.push(keyMatrix[(r2 + 4) % 5][c2]);
      } else {
          plaintextArray.push(keyMatrix[r1][c2]);
          plaintextArray.push(keyMatrix[r2][c1]);
      }
  }
  
  return plaintextArray.join("");
}
