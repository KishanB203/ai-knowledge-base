import { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type DocumentCategory = 'Policy' | 'Rules' | 'Manual';
type ViewMode = 'list' | 'minimize';

interface KnowledgeBaseDocument {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
  createdDate: string;
  unit: string;
  assignedDepartments: string[];
  assignedPositions: string[];
}

const documents: KnowledgeBaseDocument[] = [
  {
    id: 'policy-001',
    title: 'Daily Reporting Policy',
    description: 'Daily updates submitted on time.',
    category: 'Policy',
    createdDate: '2025/03/28',
    unit: 'Management',
    assignedDepartments: ['Management', 'Development'],
    assignedPositions: ['Manager', 'Developer'],
  },
  {
    id: 'policy-002',
    title: 'Time Accuracy Policy',
    description: 'Time accuracy of file policy.',
    category: 'Policy',
    createdDate: '2025/03/28',
    unit: 'Management',
    assignedDepartments: ['Management', 'Design'],
    assignedPositions: ['Manager', 'Team Leader'],
  },
  {
    id: 'policy-003',
    title: 'Missed Report Policy',
    description: 'Handling overdue or absent reports.',
    category: 'Policy',
    createdDate: '2025/03/28',
    unit: 'HR',
    assignedDepartments: ['HR', 'Management'],
    assignedPositions: ['Manager', 'CEO'],
  },
  {
    id: 'policy-004',
    title: 'Auto Fill Usage Policy',
    description: 'Automated data entry tool usage.',
    category: 'Policy',
    createdDate: '2025/03/28',
    unit: 'Development',
    assignedDepartments: ['Development'],
    assignedPositions: ['Developer'],
  },
  {
    id: 'rule-001',
    title: 'Weekly Review Rule',
    description: 'Review cadence for team updates.',
    category: 'Rules',
    createdDate: '2025/03/22',
    unit: 'Management',
    assignedDepartments: ['Management'],
    assignedPositions: ['Manager'],
  },
  {
    id: 'manual-001',
    title: 'Project Tagging Manual',
    description: 'Project document naming and tagging guide.',
    category: 'Manual',
    createdDate: '2025/03/21',
    unit: 'Development',
    assignedDepartments: ['Development', 'Design'],
    assignedPositions: ['Developer', 'Team Leader'],
  },
];

const categoryDescriptions: Record<DocumentCategory, string> = {
  Policy: 'Guidelines and organizational standards for day-to-day operations.',
  Rules: 'Working rules that keep teams aligned on process and accountability.',
  Manual: 'Step-by-step references and how-to documents for common workflows.',
};

export function KnowledgeBaseHome() {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitFilter, setUnitFilter] = useState('All Units');

  const accessibleDocuments = useMemo(() => {
    if (!user) {
      return [];
    }

    if (user.role === 'Admin') {
      return documents;
    }

    return documents.filter(
      (document) =>
        document.assignedDepartments.includes(user.department) &&
        document.assignedPositions.includes(user.position),
    );
  }, [user]);

  const visibleCategories = useMemo(
    () =>
      (['Policy', 'Rules', 'Manual'] as DocumentCategory[]).filter((category) =>
        accessibleDocuments.some((document) => document.category === category),
      ),
    [accessibleDocuments],
  );

  const filteredDocuments = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    return accessibleDocuments
      .filter((document) => document.category === selectedCategory)
      .filter((document) =>
        searchQuery
          ? `${document.title} ${document.description}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true,
      )
      .filter((document) => (unitFilter === 'All Units' ? true : document.unit === unitFilter));
  }, [accessibleDocuments, searchQuery, selectedCategory, unitFilter]);

  const unitOptions = useMemo(
    () => ['All Units', ...new Set(accessibleDocuments.map((document) => document.unit))],
    [accessibleDocuments],
  );

  const selectedDocument = filteredDocuments[0] ?? null;

  return (
    <main className="kb-shell">
      <header className="kb-header">
        <button
          className="brand-button"
          type="button"
          onClick={() => setSelectedCategory(null)}
          aria-label="Go to Knowledge Base home"
        >
          Jugaad
        </button>

        <div className="header-meta">
          <button className="help-button" type="button">
            Help
          </button>
          <div className="user-pill" aria-label="Signed in user">
            <span className="user-avatar">{user?.username.slice(0, 1).toUpperCase()}</span>
            <span>
              <strong>{user?.username}</strong>
              <small>{user?.role}</small>
            </span>
          </div>
          <button className="logout-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {selectedCategory ? (
        <section className="kb-content">
          <div className="content-head">
            <div>
              <button className="back-link" type="button" onClick={() => setSelectedCategory(null)}>
                Back
              </button>
              <p className="breadcrumb">Home / Knowledge Base / {selectedCategory}</p>
              <h1>{selectedCategory}</h1>
              <p className="section-copy">{categoryDescriptions[selectedCategory]}</p>
            </div>

            {user?.role === 'Admin' ? (
              <button className="toolbar-button toolbar-button-primary" type="button">
                Create Policy
              </button>
            ) : null}
          </div>

          <div className="toolbar" aria-label="Policy filters">
            <label className="search-field">
              <span className="sr-only">Search policy</span>
              <input
                type="search"
                value={searchQuery}
                placeholder="Search policy"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>

            <label className="select-field">
              <span className="sr-only">Filter by unit</span>
              <select
                value={unitFilter}
                onChange={(event) => setUnitFilter(event.target.value)}
              >
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="view-toggle" role="tablist" aria-label="Document view mode">
              <button
                className={viewMode === 'list' ? 'is-active' : ''}
                type="button"
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                className={viewMode === 'minimize' ? 'is-active' : ''}
                type="button"
                onClick={() => setViewMode('minimize')}
              >
                Minimize
              </button>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <section className="empty-state" aria-live="polite">
              <div className="empty-illustration" aria-hidden="true">
                <div />
              </div>
              <h2>No policies have been added yet.</h2>
              {user?.role === 'Admin' ? (
                <button className="toolbar-button toolbar-button-primary" type="button">
                  Create {selectedCategory}
                </button>
              ) : null}
            </section>
          ) : viewMode === 'list' ? (
            <section className="list-layout">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created Date</th>
                    {user?.role === 'Admin' ? <th scope="col">Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document, index) => (
                    <tr key={document.id}>
                      <td>{index + 1}</td>
                      <td>
                        <button
                          className="table-link"
                          type="button"
                          onClick={() => setViewMode('minimize')}
                        >
                          {document.title}
                        </button>
                      </td>
                      <td>{document.description}</td>
                      <td>{document.createdDate}</td>
                      {user?.role === 'Admin' ? (
                        <td>
                          <div className="row-actions">
                            <button type="button">Edit</button>
                            <button type="button">Delete</button>
                            <button type="button">Copy URL</button>
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <span>
                  Showing 1-{filteredDocuments.length} of {filteredDocuments.length} records
                </span>
                <label className="entries-select">
                  Go to page
                  <select defaultValue="10">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>
            </section>
          ) : (
            <section className="minimize-layout">
              <aside className="doc-list" aria-label="Available policies">
                {filteredDocuments.map((document) => (
                  <button key={document.id} className="doc-list-item is-selected" type="button">
                    <strong>{document.title}</strong>
                    <span>{document.createdDate}</span>
                  </button>
                ))}
              </aside>

              <section className="doc-preview" aria-label="Document preview">
                <div className="preview-toolbar">
                  <span>{selectedDocument?.title}</span>
                  <small>Preview</small>
                </div>
                <div className="preview-surface">
                  <div className="preview-sheet">
                    <h2>{selectedDocument?.title}</h2>
                    <p>{selectedDocument?.description}</p>
                    <ul>
                      <li>Unit: {selectedDocument?.unit}</li>
                      <li>Department access follows exact role mapping.</li>
                      <li>Created date: {selectedDocument?.createdDate}</li>
                    </ul>
                  </div>
                </div>
              </section>

              <aside className="doc-details">
                <h2>{selectedDocument?.title}</h2>
                <p>{selectedDocument?.description}</p>
                <dl>
                  <div>
                    <dt>Unit</dt>
                    <dd>{selectedDocument?.unit}</dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{selectedDocument?.createdDate}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{user?.role}</dd>
                  </div>
                </dl>
                <button className="toolbar-button" type="button">
                  {user?.role === 'Admin' ? 'Copy URL' : 'Download'}
                </button>
              </aside>
            </section>
          )}
        </section>
      ) : (
        <section className="dashboard" aria-label="Knowledge Base categories">
          <div className="dashboard-copy">
            <p className="eyebrow">Welcome {user?.username}</p>
            <h1>Knowledge Base</h1>
            <p>
              Signed in as {user?.role}. Department: {user?.department}. Position: {user?.position}.
            </p>
          </div>

          <div className="category-grid">
            {visibleCategories.map((category) => (
              <button
                key={category}
                className="category-card"
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setViewMode('list');
                  setSearchQuery('');
                  setUnitFilter('All Units');
                }}
              >
                <strong>{category}</strong>
                <span>{categoryDescriptions[category]}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
