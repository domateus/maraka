const { multiply } = require('mathjs')

const hillCipher = {
    KEYS: {
        // From: Stallings (p.32)
        KEY1: [[17, 17, 5], [21, 18, 21], [2, 2, 19]],
        INV1: [[4, 9, 15], [15, 17, 6], [24, 0, 17]], 
        // From: https://en.wikipedia.org/wiki/Hill_cipher
        KEY2: [[6, 24, 1], [13, 16, 10], [20, 17, 15]],
        INV2: [[8, 5, 10], [21, 8, 21], [21, 12, 8]],
        // From: https://www.cybrary.it/blog/0p3n/learn-hill-cipher-3x3-matrix-multiplicative-inverse-example/
        KEY3: [[3, 10, 20], [20, 9, 17], [9, 4, 17]],
        INV3: [[11, 22, 14], [7, 9, 21], [17, 0, 3]]
    },

    encrypt: (text, key) => {
        
        //text = text.toUpperCase();
        text = text.toUpperCase().split("").filter((c) => c.match(/[A-Z]/)).join("");

        // const textSize = text.length;

        if (text.length % 3 !== 0) {
            text += "Z".repeat(3 - (text.length % 3));
        }
        console.log("encrypt.text", text);

        const textMatrix = text
                                .match(/.{3}/g)
                                .map((row) => row.split("").map((c) => (c.charCodeAt(0) - 65)));

        console.log("encrypt.textMatrix", textMatrix);
        const productMatrix = multiply(textMatrix, key);
        console.log("encrypt.productMatrix", productMatrix);
        const moduloMatrix = productMatrix.map((row) => row.map((c) => (c % 26) + 65));
        console.log("encrypt.moduloMatrix",  moduloMatrix);

        return moduloMatrix.map((row) => row.map((c) => String.fromCharCode(c)).join("")).join("");//.slice(0, textSize);
    },

    decrypt: (text, key) => {

        // const textSize = text.length;

        if (text.length % 3 !== 0) {
            text += "Z".repeat(3 - (text.length % 3));
        }
        console.log("decrypt.text", text);

        const textMatrix = text
                                .match(/.{3}/g)
                                .map((row) => row.split("").map((c) => c.charCodeAt(0) - 65));
        console.log("decrypt.textMatrix", textMatrix);

        let invKey = []

        console.log("decrypt.key", key);
        if (key === hillCipher.KEYS.KEY1) {
            invKey = hillCipher.KEYS.INV1
        } else if (key = hillCipher.KEYS.KEY2) {
            invKey = hillCipher.KEYS.INV2
        } else if (key = hillCipher.KEYS.KEY3) {
            invKey = hillCipher.KEYS.INV3
        }
        console.log("decrypt.invKey", invKey);
        
        const productMatrix = multiply(textMatrix, invKey);
        console.log("decrypt.productMatrix", productMatrix);
        const moduloMatrix = productMatrix.map((row) => row.map((c) => (c % 26) + 65));
        console.log("decrypt.moduloMatrix",  moduloMatrix);

        return moduloMatrix.map((row) => row.map((c) => String.fromCharCode(c)).join("")).join("");//.slice(0, textSize);
    }
}

let key = hillCipher.KEYS.KEY1;
let plaintext = "paymoremoney";
console.log("==> KEY:", key);
console.log("==> PT:", plaintext);
let CT = hillCipher.encrypt(plaintext, key);
console.log("==> CT:", CT);
let PT = hillCipher.decrypt(CT, key);
console.log("==> PT:", PT);