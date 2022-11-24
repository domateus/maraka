
// Caesar Cipher using UTF-16.
const caesarCipher = {
    encrypt: (plaintext, key) =>  plaintext
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) + Number(key)))
    .join(""),

    decrypt: (ciphertext, key) =>  ciphertext
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) - Number(key)))
    .join(""),
};

let PT = "Hello World! ü";
console.log("PT:", PT);
let CT = caesarCipher.encrypt(PT, 8);
console.log("CT:", CT);
console.log("PT:", caesarCipher.decrypt(CT, 8));

