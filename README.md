# JanDrishti

A responsive, client-side civic project tracker prototype built with HTML5, Tailwind CSS, and vanilla JavaScript. It includes an activity feed, project search and filters, a schematic India map, eight language choices (English, Hindi, Gujarati, Marathi, Odia, Bengali, Telugu, Kannada), bookmarks, local browsing history, notifications, mock sign-in, theme settings, and demo feedback forms. Navigation, common dialogs, sample explanations, and the persistent **Friendly Professor** assistant follow the selected language. The assistant offers a full-screen bot or a small floating widget and answers questions from the included sample project records.

All project records and updates are fictional sample data. Photos are illustrative and do not verify any listed project, place, budget, or status. Project names, places, and official department names are preserved as source identifiers; descriptive summaries and the latest update are localized. See [ASSET-SOURCES.md](./ASSET-SOURCES.md) for image references. Sign-in, bookmarks, history, theme, chat history, and read notifications are local browser demo behavior; no account, live AI provider, government API, or backend service is connected. Assistant answers are deterministic lookups over the sample records, not generated or official statements. Geolocation is requested only after a visitor chooses “Use my location.”

## Run locally

This project pins pnpm and Tailwind. Install dependencies, compile the local Tailwind stylesheet, and start a static preview:

```sh
corepack enable
pnpm install
pnpm build
pnpm dev
```

Open `http://localhost:3000`. `pnpm dev` builds `dist/` before serving it. Each build writes the compiled Tailwind stylesheet both to `styles.css` at the project root and to `dist/styles.css`. The root stylesheet is committed so the exact files pushed by the GitHub commands below can also be served directly from a GitHub Pages repository root. The generated `dist/` directory is intentionally ignored by Git; source and build configuration are tracked instead.

## Push a separate copy to the requested GitHub repository

Run these commands from a fresh folder containing the project source (not the Manus-managed working copy, which has its own Git remote):

```sh
git init
git add .
git commit -m "Build JanDrishti civic project dashboard"
git branch -M main
git remote add origin https://github.com/riddhimamathur/JanDrishti.git
git push -u origin main --force
```

**Caution:** `--force` replaces the remote `main` branch history with the local `main` history and can discard remote-only commits. Use it only when that overwrite is intentional. If `origin` already exists in your separate checkout, update it with `git remote set-url origin https://github.com/riddhimamathur/JanDrishti.git` instead of adding it again.
