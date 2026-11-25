# Working on JanDrishti

## Run it
Browsers do not load JavaScript modules straight from a file, so use a small local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Test and build
```bash
pnpm install --frozen-lockfile
pnpm test          # Node's built-in test runner
pnpm run build     # writes the site to public/
```

After editing `styles.input.css`, build and copy `public/styles.css` over `styles.css`. A new JavaScript file must be added to the copy list in `package.json`.

## Layout
| File | Holds |
|---|---|
| `script.js` | screens, popups and events |
| `logic.js` | filtering, sorting, distance, addresses (no page access, so it is tested) |
| `assistant.js` | the Friendly Professor chat |
| `i18n.js`, `data.js` | translations and sample data |

## Known limits
- All projects, updates and notifications are sample data. There is no server or database.
- Sign in and feedback are demos; feedback is not kept.
- The chat matches keywords. It is not AI and does not remember earlier questions.
- Translations added in 2026 are machine drafts that need review by native speakers.
- Project titles, departments, places and older updates are in English only.
- Places without projects are recognised in chat by their English names only.
- The map is a rough drawing, not to scale.
- Photos are illustrative; some do not match their project, and reuse rights are unconfirmed (see `ASSET-SOURCES.md`).
- The district lists are partial and need checking against an official source.
