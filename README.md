# Synapsis

Monorepo containing Synapsis website and MVP product - an AI summarisation tool that turns text into video.

## Requirements

- Node.js (v16+)
- npm

## Project Structure

- `packages/frontend`: React application built with Vite and Tailwind CSS
- `packages/backend`: Express server for API endpoints and serving the built frontend

## Installation

```bash
# Install dependencies for all packages
npm install
cd packages/frontend && npm install
cd packages/backend && npm install
```

## Development

Run both frontend and backend in development mode with hot reloading:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend (Vite dev server)
npm run dev:frontend

# Backend (Node with --watch flag)
npm run dev:backend
```

## Production

Build the frontend and start the production server:

```bash
npm run build
npm run start
```
