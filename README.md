# AI Knowledge Base

Foundation scaffold for the Knowledge Base policy module.

## Structure

- `frontend` - React + TypeScript + Vite application scaffold
- `backend` - Express + TypeScript + MySQL API scaffold
- `figma` - design references provided for the module

## Setup Notes

- Frontend targets React + TypeScript + Vite.
- Backend targets Node.js + Express + TypeScript.
- Database configuration defaults to MySQL on `localhost:3306` with `root/root`.
- The repository is prepared for offline-friendly scaffolding. Dependencies may still need to be installed in a network-enabled environment or from a local cache.

## Commands

At the repository root:

- `npm run install:all`
- `npm run dev:frontend`
- `npm run dev:backend`
- `npm run build`

## Environment

Copy `backend/.env.example` to `backend/.env` and adjust values if needed.
