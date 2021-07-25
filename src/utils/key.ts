import crypto, { generateKeyPairSync } from 'crypto';
import fs, { readFileSync, writeFileSync } from 'fs';
import path, { join } from 'path';

const genKeyPair = () => {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  });

  // Create the public key file
  writeFileSync(
    join(__dirname, '../auth/keys') + '/pub.pem',
    keyPair.publicKey,
  );

  // Create the private key file
  writeFileSync(
    join(__dirname, '../auth/keys') + '/priv.pem',
    keyPair.privateKey,
  );
};

genKeyPair();

export const getKeyFile = (keyname) => {
  const pathToKey = join(__dirname, '../auth/keys', keyname);
  const KEY = readFileSync(pathToKey, 'utf8');

  return KEY;
};
