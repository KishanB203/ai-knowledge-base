import type { AuthenticatedUser } from './user.js';

export interface AuthSession {
  token: string;
  user: AuthenticatedUser;
}

export interface TokenPayload {
  sub: string;
  role: string;
  department: string;
  position: string;
}
