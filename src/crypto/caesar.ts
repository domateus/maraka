
// Caesar Cipher Encryption using Extended ACII table
export function caesarCipherEncrypt(plain_text: string, shift: number): string {
    let result = "";

    for (let i = 0; i < plain_text.length; i++)
        result += String.fromCharCode((plain_text.charCodeAt(i) + shift) % 255);

    return result;
};

// Caesar Cipher Decryption using Extended ACII table
export function caesarCipherDecrypt(cipher_text: string, shift: number): string {
    let result = "";

    for (let i = 0; i < cipher_text.length; i++)
        result += String.fromCharCode((cipher_text.charCodeAt(i) - shift) % 255);

    return result;
}