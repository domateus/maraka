import * as caesarCipher from "@cipher/caesarCipher"
import * as monoalphabeticCipher from "@cipher/monoalphabeticCipher"
import * as polyalphabeticCipher from "@cipher/polyalphabeticCipher"
import { useState } from "react"

const CaesarCipher = () => {
    const [plaintext, setPlainText] = useState('')
    let [ciphertext, setCipherText] = useState('')
    const [key, setKey] = useState(0)
  return (
    <div>
      <h2>Caesar Cipher</h2>
      
      <h3><strong>KEY:</strong></h3>
      <input name="key" type="number"value={key} onChange={(e) => setKey(parseInt(e.target.value))} />

      <h3><strong>PLAINTEXT:</strong></h3>
      <input type="text" value={plaintext} onChange={e => setPlainText(e.target.value)} />

      <p><strong>ENCRYPTED:</strong></p>
      <p>{ciphertext = caesarCipher.encrypt({plaintext, key})}</p>

      <p><strong>DECRYPTED:</strong></p>
      <p>{caesarCipher.decrypt({ciphertext, key})}</p>
    </div>
  )
}

const MonoalphabeticCipher = () => {
    const [plaintext, setPlainText] = useState('')
    let [ciphertext, setCipherText] = useState('')
    const [key, setKey] = useState('')
  return (
    <div>
      <h2>Monoalphabetic Cipher</h2>
      
      <h3><strong>KEY<br/>
        <button type="button" onClick={(e) => setKey(monoalphabeticCipher.randomKeyGenerator())}>Generate Random Key</button>
      </strong></h3>
      
      <p>{key}</p>

      <h3><strong>PLAINTEXT:</strong></h3>
      <input type="text" value={plaintext} onChange={e => setPlainText(e.target.value)} />

      <p><strong>ENCRYPTED:</strong></p>
      <p>{ciphertext = monoalphabeticCipher.encrypt({plaintext, key})}</p>

      <p><strong>DECRYPTED:</strong></p>
      <p>{monoalphabeticCipher.decrypt({ciphertext, key})}</p>
    </div>
  )
}

const PolyalphabeticCipher = () => {
  const [plaintext, setPlainText] = useState('')
  let [ciphertext, setCipherText] = useState('')
  const [key, setKey] = useState('')
return (
  <div>
    <h2>Polyalphabetic Cipher</h2>
    
    <h3><strong>KEY:</strong></h3>
    <input name="key" type="text"value={key} onChange={(e) => setKey(e.target.value)} />

    <h3><strong>PLAINTEXT:</strong></h3>
    <input type="text" value={plaintext} onChange={e => setPlainText(e.target.value)} />

    <h3><strong>ENCRYPTED:</strong></h3>
    <p>{ciphertext = polyalphabeticCipher.encrypt({plaintext, key})}</p>

    <h3><strong>DECRYPTED:</strong></h3>
    <p>{polyalphabeticCipher.decrypt({ciphertext, key})}</p>
  </div>
)
}

// export default CaesarCipher
// export default MonoalphabeticCipher
export default PolyalphabeticCipher
