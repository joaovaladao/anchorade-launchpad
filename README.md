# Anchor

A modern product discovery application built with React, Vite, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd anchorade-launchpad
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Handle the lovable-tagger dependency (for local development):**
   
   The `lovable-tagger` package is a Lovable-specific dependency that's not available on npm. To run locally, you need to temporarily modify `vite.config.ts`:

   Open `vite.config.ts` and comment out/remove the tagger:
   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import path from "path";
   // import { componentTagger } from "lovable-tagger"; // Comment this out

   export default defineConfig(({ mode }) => ({
     server: {
       host: "::",
       port: 8080,
     },
     plugins: [
       react(),
       // mode === 'development' && componentTagger(), // Comment this out
     ].filter(Boolean),
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
     optimizeDeps: {
       exclude: ["lucide-react"],
     },
   }));
   ```

   > ⚠️ **Important:** Do not commit this change! The `lovable-tagger` is required for the Lovable platform to work correctly.

## Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

```bash
npm run build
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Lucide React** - Icon library
- **Supabase** - Backend services

## Project Structure

```
src/
├── components/       # React components
├── data/            # Static data files
├── hooks/           # Custom React hooks
├── services/        # API services
├── types/           # TypeScript types
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## License

MIT
