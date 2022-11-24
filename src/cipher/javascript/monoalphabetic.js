// Monoalphabetic Cipher using UTF-16.
// with random UTF-16 key generator
const monoalphabeticCipher = {
    randomKeyGenerator: () =>
        Array.from(Array(256).keys())       // generate a sequence from 1 to 256
        .sort(() => Math.random() - 0.5)    // randomize the sequence
        .map((c) => String.fromCharCode(c)) // convert to UTF-16
        .join(""),
    
    encrypt: (plaintext, key) =>  plaintext
    .split("")
    .map((c) => String.fromCharCode(        // convert the key UTF-16 to char
        key[c.charCodeAt(0)]                // lookup the key with the UTF-16 code of the char from plaintext
        .charCodeAt(0)))                    // convert the key char to UTF-16
    .join(""),

    decrypt: (ciphertext, key) =>  ciphertext
    .split("")
    .map((c) => String.fromCharCode(        // convert the key index as UTF-16 to char
        key.indexOf(c)))                    // lookup the index of the char in the key
    .join(""),
};

let PT = "Hello World! ü";
console.log("PT:", PT);
let key = monoalphabeticCipher.randomKeyGenerator()
console.log("key:", key);
let CT = monoalphabeticCipher.encrypt(PT, key);
console.log("\nCT:", CT);
console.log("PT:", monoalphabeticCipher.decrypt(CT, key));

