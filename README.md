# Knowledge Base

Knowledge Base policy module setup for React, TypeScript, Vite, Node.js,
Express, TypeScript, and MySQL.

## Project Structure

```text
frontend/
  src/
    components/
    context/
    hooks/
    pages/
    services/
    styles/
    utils/
backend/
  src/
    application/
    domain/
    infrastructure/
    interface/
```

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- MySQL running locally

Default MySQL configuration:

```text
Host: localhost
Port: 3306
User: root
Password: root
Database: knowledge_base
```

## Setup

```bash
npm install
```

Create local environment files from the examples:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

## Scripts

Run all workspaces:

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run typecheck
```

Run one workspace:

```bash
npm run dev --workspace frontend
npm run dev --workspace backend
```

## Setup Notes

- Frontend is configured with React, TypeScript, Vite, ESLint, Prettier, and
  Vitest.
- Backend is configured with Express, TypeScript, ESLint, Prettier, Vitest,
  Supertest, and MySQL connection helpers.
- The backend follows the required clean architecture folder layout.
- The frontend follows the required modular folder layout.
- Development servers may be started for testing, but should be stopped before
  finishing a task.
