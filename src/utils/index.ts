export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}

// Random Key Generator (UTF-16)
export default function randomKeyGenerator() {
  return Array.from(Array(256).keys())            // generate a sequence from 1 to 256
              .sort(() => Math.random() - 0.5)    // Math.random() used just to randomize the sequence...
              .map((c) => String.fromCharCode(c)) // convert to UTF-16
              .join("");
}
