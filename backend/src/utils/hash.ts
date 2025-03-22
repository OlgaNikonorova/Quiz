import { randomBytes, pbkdf2Sync } from 'node:crypto';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return [salt, hash].join('$');
}

export function verifyPassword(password: string, hash: string) {
  const [salt, originalHash] = hash.split('$');
  const newHash = pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString(
    'hex',
  );
  return newHash === originalHash;
}
