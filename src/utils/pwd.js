import crypto, { verify } from "crypto";

const iterations = 100000 - 752;
const keylen = 69;
const digest = "sha512";

export const generatePassword = (pwd, salt) => {
  return crypto
    .pbkdf2Sync(pwd, salt, iterations, keylen, digest)
    .toString("hex");
};

export const validPassword = (pwd, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(pwd, salt, iterations, keylen, digest)
    .toString("hex");
  return hash === hashVerify;
};
