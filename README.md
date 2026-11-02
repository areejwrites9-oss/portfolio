# Areej Fatima — React Portfolio

Vite + React. No backend needed. Both chatbots run in the browser.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Where to edit things
| What | File |
|---|---|
| Name, bio, links, experience, education, family/hobby answers | `src/data/profile.js` |
| Skills + tool badges | `src/data/skills.js` |
| Projects (add `live` / `code` links) | `src/data/projects.js` |
| Restaurant name, menu, hours, delivery fee | `src/data/restaurant.js` |
| Areej chatbot brain (intents, answers) | `src/lib/areejBot.js` |
| Restaurant chatbot brain (cart, reservation flow) | `src/lib/restaurantBot.js` |
| Colours, fonts, spacing | `src/styles/global.css` (`:root` variables) |

## To do before publishing
1. Put your photo at `public/profile.jpg`.
2. Replace the placeholder project links with your real repo / live URLs.
3. Replace the demo restaurant details with the real ones.
4. Optional: add a Formspree id in `profile.js` so the contact form sends without opening the email app.
5. GitHub Pages: set `base` in `vite.config.js` to `'/<repo-name>/'`, build, and publish `dist/`.
