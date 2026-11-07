# Alan Xiao — Portfolio v12

A complete rebuild: new layout, refined type (Newsreader serif headings, Geist body), a stone / navy / steel-blue palette (no orange, nothing neon or pastel), and a full motion system built on GSAP + ScrollTrigger + SplitText and Lenis smooth scrolling.

## Deploy on Vercel
1. Put the contents of this folder in a GitHub repo.
2. Vercel → Add New Project → import the repo.
3. Framework preset: **Other** · Build command: `npm run build` · Output directory: `dist`.

No dependencies to install, no API keys. The animation libraries are bundled in `public/vendor/`.

## Local preview
```bash
npm run dev      # builds and serves on http://localhost:4173
npm run check    # verifies every local image/script reference resolves
```

## What moves
- Intro loader with a count-up, then the name rises in letter by letter
- Hero: 16 images burst out from the centre on load, float and follow the cursor, then fly outward past the camera as you scroll while the name splits apart and the page fades from navy to paper
- Statement paragraph fills in word by word as you scroll; stats count up
- Marquees speed up and skew with scroll velocity
- Projects: pinned horizontal scroll (desktop), animated candle chart, self-drawing civic building, orbiting CYFA logo
- Research: pinned sideways gallery — cards fly in tilted from above and below, images pan inside each card, giant outlined text drifts behind, progress line along the bottom
- Experience: cards stack and scale as you scroll
- Competitions: rows sweep in, subtle fill on hover
- Off the clock: 3D tilting books, a second sideways reel (tennis, badminton, Suits, Game of Thrones, carbonara) with wipe reveals and parallax, Churchill vs Commodus slide-in
- Contact: huge sideways "Let's talk" band tied to scroll, cursor spotlight, big email that copies on click, live Toronto clock, image strip
- Custom cursor with context labels, magnetic buttons, auto-hiding nav, scroll progress bar
- Everything falls back gracefully with `prefers-reduced-motion` and on touch devices

## Editing content
- `src/data.js` — papers, projects, experience, awards, involvement, learning, books
- `src/render.js` — page structure and the personal-section copy
- `src/styles.css` — design tokens at the top (`:root`)
- `src/main.js` — all animation
- Images live in `public/images/`

Projects: CYFA, Civory, SpendLeak, CYFA Trading.
