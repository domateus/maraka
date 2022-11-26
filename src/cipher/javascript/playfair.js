// Playfair cipher

const genKeyMatrix = (key) => {
    let keyArray = key.toUpperCase().split("").filter((c) => c.match(/[A-Z]/)); // Filter out non-alphabetic characters
    keyArray = keyArray.map((c) => (c === "J" ? "I" : c));                      // Replace J with I
    keyArray = [...keyArray, ..."ABCDEFGHIKLMNOPQRSTUVWXYZ".split("")];         // Add the rest of the alphabet, minus J
    // keyArray = [...new Set(keyArray)];                                          // Remove duplicates
    keyArray = keyArray.filter((c, i) => keyArray.indexOf(c) === i);
    return keyArray.join("").match(/.{5}/g).map((c) => c.split(""));            // Split into 5x5 matrix
}

const playfairCipher = {
    encrypt: (plaintext, key) => {
        let keyMatrix = genKeyMatrix(key);
        console.log(keyMatrix);

        let plaintextArray = plaintext.toUpperCase().split("").filter((c) => c.match(/[A-Z]/));
        plaintextArray = plaintextArray.map((c) => (c === "J" ? "I" : c));
        plaintextArray = plaintextArray.reverse();
        
        let pairArray = [];
        while (plaintextArray.length > 0) {
            let pair = [plaintextArray.pop()];
            if (plaintextArray.length === 0 || plaintextArray[plaintextArray.length - 1] === pair[0]) {
                pair.push("X");
            } else {
                pair.push(plaintextArray.pop());
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

    },

    decrypt: (ciphertext, key) =>  {
        let keyMatrix = genKeyMatrix(key);
        
        let ciphertextArray = [];
        for (let pair of ciphertext.match(/.{2}/g)){
            ciphertextArray.push(pair.split(""));
        };

        let plaintextArray = [];
        for (let pair of ciphertextArray) {
            let r1 = keyMatrix.findIndex((row) => row.includes(pair[0]));
            let c1 = keyMatrix[r1].findIndex((c) => c === pair[0]);

            let r2 = keyMatrix.findIndex((row) => row.includes(pair[1]));
            let c2 = keyMatrix[r2].findIndex((c) => c === pair[1]);

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
};

let key = "charles";
console.log("Key:", key);
let PT = "The scheme really works!";
console.log("PT:", PT);
let CT = playfairCipher.encrypt(PT, key);
console.log("CT:", CT);
console.log("PT:", playfairCipher.decrypt(CT, key));

