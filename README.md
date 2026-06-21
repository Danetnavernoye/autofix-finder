# AutoFix Finder

A smart platform that connects vehicle owners with trusted auto repair shops. Search, compare, and book services with real-time availability, ratings, and price estimates.

This repository contains the **AutoFix Finder web portal** — a React + Vite app for repair shop admins, platform admins, and super admins.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- Supabase
- Google Maps

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Danetnavernoye/autofix-finder.git
   cd autofix-finder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and fill in your values:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Environment variables

See `.env.example` for all required variables. At minimum you need Firebase, Supabase, and Google Maps credentials configured for full functionality.

## Deploy to GitHub Pages

This app is deployed at [https://danetnavernoye.github.io/autofix-finder/](https://danetnavernoye.github.io/autofix-finder/).

### One-time setup

1. In GitHub repo **Settings → Pages**, set **Source** to **GitHub Actions**.
2. In **Settings → Secrets and variables → Actions**, add these repository secrets (copy values from your local `.env`):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (optional)
3. In [Firebase Console](https://console.firebase.google.com/) → Authentication → Settings → **Authorized domains**, add:
   - `danetnavernoye.github.io`

Pushes to `main` automatically build and deploy via GitHub Actions.

> **Note:** You do not need Vercel for Firebase. Firebase runs in the browser on any static host (GitHub Pages, Vercel, Netlify, or Firebase Hosting). Vercel is optional if you prefer easier env var management.

## License

MIT — see [LICENSE](LICENSE).
