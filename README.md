# Agri-Assist

Agri-Assist is a web application that helps small-scale chili farmers identify likely plant diseases from visible symptoms and review practical treatment recommendations.

This repository currently contains:

- `agri-assist-fe`: Next.js frontend for the diagnosis flow
- `agri-assist-be`: backend placeholder for the future Go API
- `prd.md`: original product requirements document

## Frontend

The frontend is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Vitest for unit/component tests
- Playwright for end-to-end tests

### Run locally

```bash
cd agri-assist-fe
npm install
npm run dev
```

Open `http://localhost:3000`.

### Useful scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run test
npm run test:e2e
```

## Current Scope

- Frontend-only diagnosis experience for chili plants
- Interactive symptom selection
- Mock weighted diagnosis results
- Treatment recommendations grouped into 4 pillars
- Feedback capture UI

## Notes

- The backend folder is not implemented yet.
- The current frontend uses mock data behind a typed service boundary so it can be connected to the future Go API later.
