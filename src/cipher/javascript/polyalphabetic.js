// Polyalphabetic Cipher using Vigenère Cipher (UTF-16).

const polyalphabeticCipher = {
    encrypt: (plaintext, key) =>  plaintext
        .split("")
        .map((c, i) => String.fromCharCode(c.charCodeAt(0) + key[i % key.length].charCodeAt(0)))
        .join(""),

    decrypt: (ciphertext, key) =>  ciphertext
        .split("")
        .map((c, i) => String.fromCharCode(c.charCodeAt(0) - key[i % key.length].charCodeAt(0)))
        .join(""),
};

let PT = "Hello World! ü";
console.log("PT:", PT);
let key = "zykw"
console.log("key:", key);
let CT = polyalphabeticCipher.encrypt(PT, key);
console.log("CT:", CT);
console.log("PT:", polyalphabeticCipher.decrypt(CT, key));

