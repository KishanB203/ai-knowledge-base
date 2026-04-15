export type UserRole = 'Admin' | 'Normal User';

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  department: string;
  position: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  department: string;
  position: string;
}

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    department: user.department,
    position: user.position,
  };
}
