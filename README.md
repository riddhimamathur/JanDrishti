# JanDrishti

A responsive, client-side civic project tracker prototype built with HTML5, Tailwind CSS, and vanilla JavaScript. It includes an activity feed, project search and filters, a schematic India map, seven language labels, bookmarks, local browsing history, notifications, mock sign-in states, theme settings, and demo feedback forms.

All project records and updates are fictional sample data. Photos are illustrative and do not verify a listed project, place, budget, or status. See [ASSET-SOURCES.md](./ASSET-SOURCES.md) for image references. Sign-in, bookmarks, history, theme, and read notifications are local browser demo behavior; no account, government API, or backend service is connected. Geolocation is requested only after the visitor chooses “Use my location.”

## Run locally

This project pins pnpm and Tailwind. Install dependencies, compile the local Tailwind stylesheet, and start a static preview:

```sh
corepack enable
pnpm install
pnpm build
pnpm dev
```

Open `http://localhost:3000`. `pnpm dev` builds `dist/` before serving it. The generated `dist/` directory is intentionally ignored by Git; source and build configuration are tracked instead.

## Push a separate copy to GitHub

Run these steps in the folder containing the project source. Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub account and repository name. These commands are for a separate copy; the JanDrishti Manus preview already has its own managed remote.

```sh
git init
git add .
git commit -m "Build JanDrishti civic project dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
