import type { AuthenticatedUser } from '../../../domain/models/user.js';

export interface TokenService {
  sign(user: AuthenticatedUser): string;
  verify(token: string): AuthenticatedUser | null;
}
