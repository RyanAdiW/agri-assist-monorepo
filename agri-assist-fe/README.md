# Agri-Assist Frontend

Frontend for Agri-Assist, a web app that helps chili farmers identify likely plant diseases from visible symptoms.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Vitest
- Playwright

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Set API base URL in `.env.local` when needed:

```bash
cp .env.example .env.local
```

By default the frontend expects the backend API at `http://localhost:8080`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run test
npm run test:e2e
npm run test:e2e:real
```

## E2E with Real Backend

Default E2E runs mock the API in Playwright. To run the browser flow against the real backend instead:

1. Start PostgreSQL and make sure the backend `.env` is configured.
2. Start the backend on `http://localhost:8080`.
3. Run the frontend E2E in real-backend mode.

Example:

```bash
# terminal 1
cd ../agri-assist-be
cp .env.example .env
go run ./cmd/api
```

```bash
# terminal 2
source "$HOME/.nvm/nvm.sh"
nvm use
cd /home/ryanadi/projects/agri-assist/agri-assist-fe
npx playwright install chromium
npm run test:e2e:real
```

The frontend still uses `NEXT_PUBLIC_API_BASE_URL`, so if your backend runs on a different host or port, set that before running Playwright.

## Current Scope

- Landing page
- Symptom selection flow
- Backend-powered symptom lookup and diagnosis results
- Recommendation pillars
- Feedback submission to backend API
