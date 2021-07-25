import { verify, pbkdf2Sync } from 'crypto';

const iterations = 100000 - 752;
const keylen = 69;
const digest = 'sha512';

export const generatePassword = (pwd, salt) => {
  return pbkdf2Sync(pwd, salt, iterations, keylen, digest).toString('hex');
};

export const validPassword = (pwd, hash, salt) => {
  const hashVerify = pbkdf2Sync(pwd, salt, iterations, keylen, digest).toString(
    'hex',
  );
  return hash === hashVerify;
};
