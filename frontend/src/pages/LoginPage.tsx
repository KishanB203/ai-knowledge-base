import { type FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onAuthenticated: () => void;
}

export function LoginPage({ onAuthenticated }: LoginPageProps) {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validate(identifier, password);

    if (nextError) {
      setError(nextError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await login(identifier, password);
      onAuthenticated();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="login-copy">
          <h1>Login to Knowledge Base</h1>
          <p>Organize and manage your documents efficiently.</p>
        </div>

        <label className="field">
          <span>Email or Username</span>
          <input
            autoComplete="username"
            name="identifier"
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            aria-invalid={Boolean(error) && !identifier.trim()}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(error) && !password.trim()}
          />
        </label>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}

function validate(identifier: string, password: string) {
  if (!identifier.trim() && !password.trim()) {
    return 'Email or username and password are required.';
  }

  if (!identifier.trim()) {
    return 'Email or username is required.';
  }

  if (!password.trim()) {
    return 'Password is required.';
  }

  return '';
}
