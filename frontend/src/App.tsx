const categories = [
  {
    name: "Policy",
    description: "Create, review, and distribute organization policies.",
  },
  {
    name: "Rules",
    description: "Track day-to-day operational rules for departments and teams.",
  },
  {
    name: "Manual",
    description: "Store internal guides and training documents in one place.",
  },
];

function App() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Knowledge Base</p>
        <h1>Project foundation is ready for Sprint 8 delivery.</h1>
        <p className="lede">
          This starter UI establishes the React + TypeScript + Vite baseline for
          the policy module and references the provided Figma designs for the
          next implementation stories.
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Default categories</p>
            <h2>Initial module map</h2>
          </div>
          <span className="pill">Foundation</span>
        </div>

        <div className="card-grid">
          {categories.map((category) => (
            <article className="card" key={category.name}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
