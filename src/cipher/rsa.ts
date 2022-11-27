import * as utils from './utils';
import playground from "../../pages/playground";

function generateE(totient:bigint) {
    let e = utils.getRandomPrime() ?? 1;
    while (utils.gcd(e, totient) !== 1n) {
        e += 2n;
    }
    return e;
}

function computeD(e:bigint, totient:bigint) {
    let d = utils.extendedEuclidean(e, totient)[0];
    while (d < 1n) {
        d += totient;
    }
    return d;
}

export function generateKeys():KeyPair{

    const prime1 = utils.getRandomPrime();
    let prime2 = utils.getRandomPrime();

    //Prime numbers should not be equal,so this loop makes a lookup for a not equal prime number
    while (prime1 === prime2){
        prime2 = utils.getRandomPrime();
    }

    //calculating n
    const n = prime1 * prime2;

    //calculating totient(n)
    const totient:bigint = (prime1-1n) * (prime2-1n);

    //calculating e
    const e = generateE(totient);

    //calculating d
    const d = computeD(e,totient);

    //create public key
    const publicKey = [e,n];

    //create private key
    const privateKey = [d,n];

    return {
        publicKey,
        privateKey
    };

}

export const encrypt: RsaEncrypter = ({plaintext, publicKey}) => {
    //get the parts of public key for encryption
    const e = BigInt(publicKey[0]);
    const n = BigInt(publicKey[1]);
    const cipher = [];

    //encryption for each ascii character
    const aha = plaintext.split("").map((c) => BigInt(c.charCodeAt(0)));
    //aha.map(v => (v ** e) % n)
    const cipherTextCodes = aha.map((v) => ((v ** e) % n));
    //converting to string (no conversion to ascii: too big!
    return cipherTextCodes.map( c => String(c)).join();
    //return plaintext.split("").map( c => String.fromCharCode((Number((BigInt(c.charCodeAt(0)) ** e ) % n)).join();
}

export const decrypt: RsaDecrypter = ({ciphertext, privateKey}) => {
    //get the parts of private key for decryption
    const d = privateKey[0];
    const n = privateKey[1];

    //decryption for each ascii character
    const plainTextCodes = ciphertext.split("").map( p => (BigInt(p.charCodeAt(0)) ** d) % n)
    //converting to ascii again
    return plainTextCodes.map(p => String.fromCharCode(Number(p))).join();

}