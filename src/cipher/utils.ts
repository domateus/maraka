export const LIST_PRIMES = [7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 
    61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n, 113n, 127n, 131n, 137n, 139n,
    149n, 151n, 157n, 163n, 167n, 173n, 179n, 181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 
    229n, 233n, 239n, 241n, 251n, 257n, 263n, 269n, 271n, 277n, 281n, 283n, 293n, 307n, 311n, 313n,
    317n, 331n, 337n, 347n, 349n, 353n, 359n, 367n, 373n, 379n, 383n, 389n, 397n];

export const LIST_PRIMES_SIZE = LIST_PRIMES.length;
export const ASCII_TABLE_SIZE = 127n;
export const number_ASCII_TABLE_SIZE = Number(
  ASCII_TABLE_SIZE.toString().replace("n", "")
);

export function getAsciiCodes(s: string): bigint[] {
  return s.split("").map((c) => BigInt(c.charCodeAt(0)));
}

export const zip = <T, U = T>(a: T[], b: U[]) => a.map((k, i) => [k, b[i]]);

export function generateRandomString(length: number): string {
  const getRandomBigInts = (): string[] =>
    [].slice.call(window.crypto.getRandomValues(new Uint8Array(length))).map((n) =>
      String.fromCharCode(n % number_ASCII_TABLE_SIZE)
    );
  return getRandomBigInts().join("");
}
