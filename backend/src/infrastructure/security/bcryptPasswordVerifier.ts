import bcrypt from 'bcryptjs';
import type { PasswordVerifier } from '../../application/ports/security/passwordVerifier.js';

export class BcryptPasswordVerifier implements PasswordVerifier {
  verify(plainTextPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, passwordHash);
  }
}
