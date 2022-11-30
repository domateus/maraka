import * as otp from '@cipher/otp'
import * as rsa from '@cipher/rsa'
import { useState } from "react"

const Playground = () => {
    const [plaintext, setPlainText] = useState('')
    const [ciphertext, setCipherText] = useState('')
    const [key, setKey] = useState('')

    const [encryptedText, setEncryptedText] = useState('')
    const [decryptedText, setDecryptedText] = useState('')

    const encryptOTP = () => {
        const encrypted = otp.encrypt({plaintext, key})
         setEncryptedText(encrypted)
         setDecryptedText(otp.decrypt({ciphertext: encrypted,key}))
    }

    const encryptRSA = () => {
        const keyPair = rsa.generateKeys();
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;
        // @ts-ignore
        let aha = publicKey ** privateKey
        const encrypted = rsa.encrypt({plaintext, publicKey})
        setEncryptedText(encrypted)
        setDecryptedText(rsa.decrypt({ciphertext: encrypted,privateKey}))
    }

    const decrypt = () => {
        return otp.decrypt({ciphertext, key})
    }
  return (
    <div>
      <h2>Playground</h2>

      <h3>plaintext</h3>
      <input type="text" value={plaintext} onChange={e => setPlainText(e.target.value)} />

        <h3>key</h3>
        <input name="key" type="text"value={key} onChange={(e) => setKey(e.target.value)} />


        <button onClick={encryptRSA}>encypt</button>
      <p>encrypted:</p>
      <p>{encryptedText}</p>

      <p>decrypted:</p>
        <p>{decryptedText}</p>
    </div>
  )
}

export default Playground
