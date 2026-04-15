import { getJson, postJson } from './apiClient';

export type UserRole = 'Admin' | 'Normal User';

export interface AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  department: string;
  position: string;
}

export interface AuthSession {
  token: string;
  user: AuthenticatedUser;
}

export interface CurrentUserResponse {
  user: AuthenticatedUser;
}

export function login(identifier: string, password: string) {
  return postJson<AuthSession>('/auth/login', {
    identifier,
    password,
  });
}

export function getCurrentUser(token: string) {
  return getJson<CurrentUserResponse>('/auth/me', token);
}
