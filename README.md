# 🇮🇳 JanDrishti — Civic Project Tracker

**A responsive, multilingual dashboard prototype for exploring civic projects and their updates.**

JanDrishti is built using HTML5, Tailwind CSS, and Vanilla JavaScript to make civic project information easier to explore and understand.

## ✨ Features

- 📊 Activity feed with project updates
- 🔍 Project search and filters
- 🗺️ Schematic India map
- 🌐 8 Indian language options
- 🔖 Bookmarks and browsing history
- 🔔 Notifications and mock sign-in
- 🎨 Theme settings
- 🤖 Friendly Professor chatbot
- 💬 Full-screen chat and floating widget
- 📝 Feedback forms
- 📱 Responsive interface

## 🔄 Project Workflow

```mermaid
flowchart TD
    A([Start]) --> B[Open JanDrishti]
    B --> C[Explore Dashboard]
    C --> D{Select Feature}
    D --> E[Search Projects]
    D --> F[View Updates]
    D --> G[Save Bookmarks]
    D --> H[Change Language or Theme]
    D --> I[Ask Friendly Professor]
    I --> J[Search Sample Records]
    J --> K[Display Answer]
    E --> L([Continue Exploring])
    F --> L
    G --> L
    H --> L
    K --> L
```

## 🛠️ Tech Stack

```mermaid
flowchart LR
    A[JanDrishti] --> B[HTML5]
    A --> C[Tailwind CSS]
    A --> D[Vanilla JavaScript]
    D --> E[UI Interactions]
    D --> F[Local Storage]
    D --> G[Chatbot Logic]
```

- **HTML5:** Page structure
- **Tailwind CSS:** Responsive styling
- **Vanilla JavaScript:** Interactions, localization, and chatbot logic
- **Local Storage:** Demo preferences and user activity

## 🤖 Friendly Professor

```mermaid
flowchart TD
    A[User Question] --> B[Search Sample Project Records]
    B --> C{Matching Information?}
    C -->|Yes| D[Prepare Answer]
    C -->|No| E[Show Fallback Response]
    D --> F[Display Response]
    E --> F
```

The assistant uses predefined lookup logic, not a live AI model.

## 🚀 Run Locally

**Prerequisites:** Node.js, Corepack, and Git.

```bash
git clone https://github.com/riddhimamathur/JanDrishti.git
cd JanDrishti
corepack enable
pnpm install
pnpm build
pnpm dev
```

Open **http://localhost:3000** in your browser.

## ⚠️ Disclaimer

- All project records and updates are fictional sample data.
- Images are illustrative and do not verify real projects.
- Sign-in, bookmarks, history, and settings are demo features.
- No backend, government API, or live AI provider is connected.
- Geolocation is requested only when the user selects **Use my location**.

See [ASSET-SOURCES.md](./ASSET-SOURCES.md) for image references.

---

**JanDrishti 🇮🇳 — Explore. Understand. Stay Informed.**
