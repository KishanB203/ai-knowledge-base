import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import type { TokenService } from '../../application/ports/security/tokenService.js';
import type { AuthenticatedUser } from '../../domain/models/user.js';
import type { AuthConfig } from '../config/appConfig.js';

interface JwtClaims {
  sub: string;
  email: string;
  username: string;
  role: string;
  department: string;
  position: string;
}

export class JwtTokenService implements TokenService {
  constructor(private readonly config: AuthConfig) {}

  sign(user: AuthenticatedUser): string {
    const claims: Omit<JwtClaims, 'sub'> = {
      email: user.email,
      username: user.username,
      role: user.role,
      department: user.department,
      position: user.position,
    };
    const options: SignOptions = {
      subject: user.id,
      expiresIn: this.config.jwtExpiresIn as SignOptions['expiresIn'],
    };

    return jwt.sign(claims, this.config.jwtSecret as Secret, options);
  }

  verify(token: string): AuthenticatedUser | null {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret as Secret) as JwtClaims;

      return {
        id: decoded.sub,
        email: decoded.email,
        username: decoded.username,
        role: decoded.role === 'Admin' ? 'Admin' : 'Normal User',
        department: decoded.department,
        position: decoded.position,
      };
    } catch {
      return null;
    }
  }
}
