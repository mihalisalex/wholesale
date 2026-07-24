import crypto from "node:crypto";

const KEY_LENGTH = 64;

/** Returns "salt:hash", both hex-encoded. */
export function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return Promise.resolve(false);
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) return reject(err);
      const expected = Buffer.from(hashHex, "hex");
      if (expected.length !== derivedKey.length) return resolve(false);
      resolve(crypto.timingSafeEqual(expected, derivedKey));
    });
  });
}
