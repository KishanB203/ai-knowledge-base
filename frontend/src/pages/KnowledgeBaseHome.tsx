import { useAuth } from '../hooks/useAuth';

export function KnowledgeBaseHome() {
  const { user, logout } = useAuth();

  return (
    <main className="kb-page">
      <header className="top-bar">
        <strong>Jugaad</strong>
        <nav aria-label="Account actions">
          <span>{user?.username}</span>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="welcome-panel">
        <p className="eyebrow">Welcome {user?.username}</p>
        <h1>Knowledge Base</h1>
        <p>
          Signed in as {user?.role}. Department: {user?.department}. Position: {user?.position}.
        </p>

        <div className="category-grid" aria-label="Knowledge Base categories">
          <article>
            <h2>Policy</h2>
            <p>Access organizational standards, notices, content, and accountability reporting.</p>
          </article>
          <article>
            <h2>Rules</h2>
            <p>Stay aligned with expectations and daily work practices.</p>
          </article>
          <article>
            <h2>Manual</h2>
            <p>Use step-by-step guides for application, log actions, and workflow support.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
