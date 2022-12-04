import { BigInteger } from "jsbn";
import { bigIntegerToXBytePaddedHex } from "./utils";

type DSASignPayload = {
  m: string;
  g: string;
  k: string;
  p: string;
  x: string;
  q: string;
};
type DSASign = (payload: DSASignPayload) => string[];

type DSAVerifyPayload = {
  m: string;
  g: string;
  p: string;
  q: string;
  y: string;
  r: string;
  s: string;
};

type DSAVerify = (payload: DSAVerifyPayload) => boolean;

export const sign: DSASign = ({ m, g, k, p, x, q }) => {
  const m1 = new BigInteger(m, 16);
  const g1 = new BigInteger(g, 16);
  const k1 = new BigInteger(k, 16);
  const p1 = new BigInteger(p, 16);
  const x1 = new BigInteger(x, 16);
  const q1 = new BigInteger(q, 16);
  console.log("m1", m1.toString());
  console.log("g1", g1.toString());
  console.log("k1", k1.toString());
  console.log("p1", p1.toString());
  console.log("x1", x1.toString());
  console.log("q1", q1.toString());
  const r = g1.modPow(k1, p1).mod(q1);
  console.log("r", r.toString(), g1.modPow(k1, p1));
  const s = k1
    .modInverse(q1)
    .multiply(m1.add(x1.multiply(r)))
    .mod(q1);
  console.log("k⁻¹", k1.modInverse(q1).toString());
  console.log("s", s.toString());
  return [r, s].map((v) => bigIntegerToXBytePaddedHex(v, 256));
};

export const verify: DSAVerify = ({ m, g, p, q, y, r, s }) => {
  const m1 = new BigInteger(m, 16);
  const g1 = new BigInteger(g, 16);
  const p1 = new BigInteger(p, 16);
  const q1 = new BigInteger(q, 16);
  const y1 = new BigInteger(y, 16);
  const r1 = new BigInteger(r, 16);
  const s1 = new BigInteger(s, 16);
  if (r1.compareTo(BigInteger.ONE) < 0 || r1.compareTo(q1) >= 0) {
    console.log("r1 return");
    return false;
  }
  if (s1.compareTo(BigInteger.ONE) < 0 || s1.compareTo(q1) >= 0) {
    console.log("s1 return");
    return false;
  }
  console.log("g1", g1.toString());
  console.log("p1", p1.toString());
  console.log("m1", m1.toString());
  console.log("r1", r1.toString());
  const w = s1.modInverse(q1);
  console.log("s1", s1.toString());
  console.log("s1⁻¹", w.toString());
  console.log("w", w.toString());
  const u1 = m1.multiply(w).mod(q1);
  console.log("u1", u1.toString());
  const u2 = r1.multiply(w).mod(q1);
  console.log("u2", u2.toString());
  console.log("y1", y1.toString());
  const v1 = g1.modPow(u1, p1);
  const v2 = y1.modPow(u2, p1);
  const v3 = v1.multiply(v2).mod(p1);
  const v = v3.mod(q1);
  console.log("q1", q1.toString());
  // const v = g1.modPow(u1, p1).multiply(y1.modPow(u2, p1)).mod(p1).mod(q1);
  console.log("v", v.toString());
  console.log("v - 1", v1.toString());
  console.log("v - 2", v2.toString());
  console.log("v - 3", v3.toString());
  console.log("equals", v.toString(16), r1.toString(16));
  return v.equals(r1);
};
