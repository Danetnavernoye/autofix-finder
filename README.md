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

## License

MIT — see [LICENSE](LICENSE).
