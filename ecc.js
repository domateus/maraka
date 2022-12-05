"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var jsbn_1 = require("jsbn");
var a = jsbn_1.BigInteger.ZERO;
var prime = new jsbn_1.BigInteger("257");
var three = new jsbn_1.BigInteger("3");
var two = new jsbn_1.BigInteger("2");
var G = { x: two, y: two };
var getPrivateKey = function () {
    return Math.floor(Math.random() * parseInt(prime.toString()) + 1) % 128;
};
var GENERATOR = { x: new jsbn_1.BigInteger("2"), y: new jsbn_1.BigInteger("2") };
var GENERATOR_POINTS = [GENERATOR];
function init() {
    var generatorPoint = { x: new jsbn_1.BigInteger("2"), y: new jsbn_1.BigInteger("2") };
    var addedPoint = add({ p: generatorPoint, q: generatorPoint });
    GENERATOR_POINTS.push(addedPoint);
    ASCII_ENCODED.set(1, GENERATOR);
    ASCII_ENCODED.set(2, addedPoint);
    for (var i = 0; i < 128; i++) {
        //TODO checkup double val
        addedPoint = add({ p: generatorPoint, q: addedPoint });
        GENERATOR_POINTS.push(addedPoint);
        ASCII_ENCODED.set(i + 3, addedPoint);
    }
}
exports.init = init;
var ASCII_ENCODED = new Map();
var findMapKey = function (point, map) {
    var e_1, _a;
    var result = null;
    try {
        for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
            var _b = __read(map_1_1.value, 2), key = _b[0], value = _b[1];
            if (value.x === point.x && value.y === point.y) {
                result = key;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (map_1_1 && !map_1_1.done && (_a = map_1["return"])) _a.call(map_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
function plaintextToPoint(plaintext) {
    init();
    var plaintextArray = plaintext.split("");
    var pointArray = plaintextArray.map(function (l) { return ASCII_ENCODED.get(l.charCodeAt(0)); });
    return pointArray;
}
exports.plaintextToPoint = plaintextToPoint;
function pointToPlaintext(pointArray) {
    // console.log(ASCII_ENCODED);
    var charCodeArray = pointArray.map(function (c) { return findMapKey(c, ASCII_ENCODED); });
    var plaintext = charCodeArray.map(function (c) { return String.fromCharCode(c); }).join("");
    return plaintext;
}
exports.pointToPlaintext = pointToPlaintext;
var add = function (_a) {
    var p = _a.p, q = _a.q;
    var lambda = getLambda({ p: p, q: q });
    if (lambda === null)
        return { x: jsbn_1.BigInteger.ZERO, y: jsbn_1.BigInteger.ZERO };
    var x = lambda.multiply(lambda).subtract(p.x).subtract(q.x).mod(prime);
    var y = lambda.multiply(p.x.subtract(x)).subtract(p.y).mod(prime);
    return { x: x, y: y };
};
var getLambda = function (_a) {
    var p = _a.p, q = _a.q;
    if (!p.x.compareTo(q.x) && !p.y.compareTo(q.y)) {
        var numerator_1 = three.multiply(p.x.pow(2)).add(a);
        var denominator_1 = p.y.multiply(two);
        if (numerator_1.equals(jsbn_1.BigInteger.ZERO)) {
            return jsbn_1.BigInteger.ZERO;
        }
        if (denominator_1.equals(jsbn_1.BigInteger.ZERO)) {
            return null;
        }
        if (denominator_1.compareTo(jsbn_1.BigInteger.ZERO) < 0) {
            while (denominator_1.compareTo(jsbn_1.BigInteger.ZERO) < 0) {
                denominator_1 = denominator_1.add(prime);
            }
        }
        else {
            denominator_1 = denominator_1.modInverse(prime);
        }
        return numerator_1.multiply(denominator_1).mod(prime);
    }
    var numerator = q.y.subtract(p.y);
    var denominator = q.x.subtract(p.x);
    if (numerator.equals(jsbn_1.BigInteger.ZERO)) {
        return jsbn_1.BigInteger.ZERO;
    }
    if (denominator.equals(jsbn_1.BigInteger.ZERO)) {
        return null;
    }
    while (numerator.compareTo(jsbn_1.BigInteger.ZERO) < 0) {
        numerator = numerator.add(prime);
    }
    while (denominator.compareTo(jsbn_1.BigInteger.ZERO) < 0) {
        denominator = denominator.add(prime);
    }
    denominator = denominator.modInverse(prime);
    return numerator.multiply(denominator).mod(prime);
};
var multiply = function (_a) {
    var p = _a.p, n = _a.n;
    var result = p;
    for (var i = 1; i < n; i++) {
        result = add({ p: result, q: p });
    }
    return result;
};
var negate = function (p) {
    return { x: p.x, y: p.y.multiply(new jsbn_1.BigInteger("-1")) };
};
var subtract = function (_a) {
    var p = _a.p, q = _a.q;
    return add({ p: p, q: negate(q) });
};
var Apk = getPrivateKey();
var Apublic = multiply({ p: G, n: Apk });
var primes = [
    29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107,
    109, 113, 127,
];
var Bpk = primes[Math.floor(Math.random() * primes.length)];
var Bpublic = multiply({ p: G, n: Bpk });
console.log("nb", Bpk);
console.log("pb", Bpublic.x.toString(), Bpublic.y.toString());
var message = "Hi katha, I love you so much";
var asciiToPointMap1 = [G];
for (var i = 1; i < 140; i++) {
    var point = add({ p: asciiToPointMap1[i - 1], q: G });
    asciiToPointMap1.push(point);
}
var asciiToPointMap = asciiToPointMap1.map(function (_a, i) {
    var x = _a.x, y = _a.y;
    return {
        x: x.toString(16).padStart(4, "0"),
        y: y.toString(16).padStart(4, "0")
    };
});
var asciiToBigIntegerPoint = function (message) {
    var points = [];
    for (var i = 0; i < message.length; i++) {
        points.push(asciiToPointMap1[message.charCodeAt(i)]);
    }
    return points;
};
var asciiToStringPoint = function (message) {
    var points = [];
    for (var i = 0; i < message.length; i++) {
        points.push(asciiToPointMap[message.charCodeAt(i)]);
    }
    return points;
};
var encrypt = function (_a) {
    var m = _a.m, k = _a.k, publicB = _a.publicB;
    var kg = multiply({ p: G, n: k });
    console.log("kg", kg.x.toString(), kg.y.toString()); // (136, 128)
    var kpb = multiply({ p: publicB, n: k });
    console.log("kpb", kpb.x.toString(), kpb.y.toString()); // (68, 84)
    return m.map(function (pm) {
        var p = add({ p: pm, q: kpb });
        return [
            {
                x: kg.x.toString(16).padStart(4, "0"),
                y: kg.y.toString(16).padStart(4, "0")
            },
            {
                x: p.x.toString(16).padStart(4, "0"),
                y: p.y.toString(16).padStart(4, "0")
            },
        ];
    });
};
var computeK = function (pb) {
    var k = primes[Math.floor(Math.random() * primes.length)];
    var kpb = multiply({ p: pb, n: k });
    var kg = multiply({ p: G, n: k });
    while (kg.x.compareTo(jsbn_1.BigInteger.ZERO) === 0 ||
        kg.y.compareTo(jsbn_1.BigInteger.ZERO) === 0 ||
        (!kpb.x.compareTo(jsbn_1.BigInteger.ZERO) && !kpb.y.compareTo(jsbn_1.BigInteger.ZERO))) {
        k = primes[Math.floor(Math.random() * primes.length)];
        kpb = multiply({ p: pb, n: k });
    }
    return k;
};
var decrypt = function (_a) {
    var c = _a.c, privateB = _a.privateB;
    var m = c.map(function (_a) {
        var _b = __read(_a, 2), kg = _b[0], p = _b[1];
        var kgp = multiply({
            p: { x: new jsbn_1.BigInteger(kg.x, 16), y: new jsbn_1.BigInteger(kg.y, 16) },
            n: privateB
        });
        var p1 = subtract({
            p: { x: new jsbn_1.BigInteger(p.x, 16), y: new jsbn_1.BigInteger(p.y, 16) },
            q: kgp
        });
        return p1;
    });
    return m;
};
var m = plaintextToPoint(message);
m.forEach(function (p) {
    console.log("encrypted", p.x.toString(), p.y.toString());
});
for (var i = 0; i < 10; i++) {
    var k = computeK(Bpublic);
    console.log("k", k);
    var publicB = multiply({ p: G, n: Bpk });
    var ciphertext = encrypt({ m: m, k: k, publicB: publicB });
    var plaintext = decrypt({ c: ciphertext, privateB: Bpk });
    plaintext.forEach(function (p) {
        console.log("decrypted", p.x.toString(), p.y.toString());
    });
}
// console.log("plaintext", pointToPlaintext(plaintext));
//////////////////////////////////////////////////
// const nb = 101;
// const pb = multiply({ p: G, n: nb });
// console.log("pb", pb.x.toString(), pb.y.toString()); // (197, 167)
// const pm = { x: new BigInteger("112"), y: new BigInteger("26") };
// const k = 41;
// // const kg = multiply({ p: G, n: k });
// // const kpb = multiply({ p: pb, n: k });
// const cm = encrypt({ m: [pm], k, publicB: pb });
// console.log(
//   "cm",
//   parseInt(cm[0][0].x, 16),
//   parseInt(cm[0][0].y, 16), // (136, 128)
//   parseInt(cm[0][1].x, 16),
//   parseInt(cm[0][1].y, 16) // (246, 174)
// );
// const decrypted = decrypt({ c: cm, privateB: nb });
// console.log("decrypted", decrypted[0].x.toString(), decrypted[0].y.toString()); // (112, 26)
