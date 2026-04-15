import { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { KnowledgeBaseHome } from './KnowledgeBaseHome';
import { LoginPage } from './LoginPage';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, refreshUser, token } = useAuth();
  const [, setRouteVersion] = useState(0);
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(token));

  useEffect(() => {
    let isMounted = true;

    async function validateStoredSession() {
      if (!token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        // AuthProvider clears invalid sessions. The login page becomes the next route.
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    }

    validateStoredSession();

    return () => {
      isMounted = false;
    };
  }, [refreshUser, token]);

  if (isCheckingSession) {
    return (
      <main className="app-shell">
        <p>Checking session...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onAuthenticated={() => setRouteVersion((version) => version + 1)} />;
  }

  return <KnowledgeBaseHome />;
}

export function SetupFallback() {
  return (
    <main className="app-shell">
      <section className="setup-panel" aria-labelledby="app-title">
        <p className="eyebrow">Knowledge Base</p>
        <h1 id="app-title">Project setup ready</h1>
        <p>
          React, TypeScript, and Vite are configured for the Knowledge Base
          policy module.
        </p>
      </section>
    </main>
  );
}
