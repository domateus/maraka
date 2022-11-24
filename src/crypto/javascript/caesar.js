
// Caesar Cipher Encryption using Extended ACII table
function caesarCipherEncrypt(text, shift) {
    let result = "";

    for (let i = 0; i < text.length; i++)
        result += String.fromCharCode((text.charCodeAt(i) + shift) % 255);

    return result;
};

// Caesar Cipher Decryption using Extended ACII table
function caesarCipherDecrypt(text, shift) {
    let result = "";

    for (let i = 0; i < text.length; i++)
        result += String.fromCharCode((text.charCodeAt(i) - shift) % 255);

    return result;
}

let PT = "Hello World!";
let CT = caesarCipherEncrypt(PT, 5);
console.log("CT:", CT);
console.log("PT:", caesarCipherDecrypt(CT, 5));

