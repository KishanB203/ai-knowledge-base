import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import type { AuthenticatedUser } from '../services/authService';
import { getCurrentUser, login as loginRequest } from '../services/authService';
import { AuthContext, type AuthContextValue } from './authContextValue';

const STORAGE_KEY = 'knowledgeBaseAuth';

interface StoredAuth {
  token: string;
  user: AuthenticatedUser;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<StoredAuth | null>(() => readStoredAuth());

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const result = await loginRequest(identifier, password);

    if (!result.success || !result.data) {
      throw new Error(result.message ?? 'Invalid email, username, or password.');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
    setSession(result.data);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!session?.token) {
      return;
    }

    const result = await getCurrentUser(session.token);
    if (!result.success || !result.data) {
      logout();
      throw new Error(result.message ?? 'Session expired or invalid. Please log in again.');
    }

    const nextSession = {
      token: session.token,
      user: result.data.user,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, [logout, session?.token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: session?.token ?? null,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.token && session.user),
      login,
      logout,
      refreshUser,
    }),
    [login, logout, refreshUser, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function readStoredAuth(): StoredAuth | null {
  const storedAuth = localStorage.getItem(STORAGE_KEY);
  if (!storedAuth) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedAuth) as StoredAuth;
    return parsed.token && parsed.user ? parsed : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
