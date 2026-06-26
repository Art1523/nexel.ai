# Nexel — Data automation, engineered by agents

Marketing site for **Nexel**, an enterprise data‑automation platform powered by a fleet of self‑improving AI agents. Built as a single‑page TanStack Start app with a custom design system (no Radix, no shadcn, no Framer Motion) and pure CSS / Web Animations API for all motion.

Live preview: see your Render URL after deploy.

---

## Tech stack

| Layer        | Choice                                                |
| ------------ | ----------------------------------------------------- |
| Framework    | [TanStack Start](https://tanstack.com/start) v1 (SSR) |
| Build        | Vite 7                                                |
| UI           | React 19 + custom components (no UI library)          |
| Styling      | Tailwind CSS v4 (CSS‑first config in `src/styles.css`)|
| Type system  | TypeScript (strict)                                   |
| Icons        | Custom SVG set in `src/components/Icons.tsx`          |
| Fonts        | JetBrains Mono (display) + Inter (body)               |
| Runtime      | Node 20 / Edge‑compatible                             |

---

## Features

- **Cinematic hero** — word‑stagger headline reveal, stamped highlight pill, mouse‑parallax agent core with pulse rings, animated sparkline, blinking caret, fluctuating accuracy meter.
- **Animated stat strip** — eased count‑up numbers (`requestAnimationFrame`) with `prefers-reduced-motion` fallback.
- **Bento ↔ Accordion** feature section with shared active‑index state across breakpoints.
- **Pricing matrix** — currency × region × billing toggles isolated via `useSyncExternalStore` so only price text re‑renders.
- **Full SEO surface** — semantic HTML, JSON‑LD, `sitemap.xml`, `robots.txt`, `llms.txt`, OG + Twitter cards, per‑route titles & descriptions.
- **A11y** — visible focus rings, reduced‑motion support, semantic landmarks, alt text.

---

## Getting started

```bash
# install (uses bun, but npm/pnpm also work)
bun install

# dev server on http://localhost:8080
bun dev

# typecheck
bunx tsgo --noEmit

# production build
bun run build

# run the production server
node .output/server/index.mjs
```

---

## Project structure

```
src/
├─ routes/               # File‑based routes (TanStack Router)
│  ├─ __root.tsx         # HTML shell, head, SEO meta
│  ├─ index.tsx          # Home page
│  └─ sitemap[.]xml.ts   # Dynamic sitemap
├─ components/           # All UI (Hero, Navbar, Features, Pricing, Footer, …)
├─ hooks/                # useIsMobile, etc.
├─ styles.css            # Tailwind v4 + design tokens + keyframes
└─ router.tsx            # Router bootstrap

public/
├─ robots.txt
└─ llms.txt
```

Routes are auto‑registered by the TanStack Router Vite plugin — **do not edit `src/routeTree.gen.ts`**.

---

## Design tokens

Defined in `src/styles.css` as CSS variables and exposed to Tailwind via `@theme inline`:

```
--ink       #0E2129   Oceanic Noir (background)
--paper     #F1F6F4   Arctic Powder (foreground)
--yellow    #FFC801   Forsythia (primary accent)
--saffron   #FF9932   Deep Saffron (secondary accent)
--mint      #D9E8E2   Mystic Mint (soft surface)
--teal      #114C5A   Deep teal (atmospheric glow)
```

Never hard‑code colors in components — always use `var(--token)` or the Tailwind class derived from the token (e.g. `bg-[var(--yellow)]`).

---

## Deploy on Render

This is a **Web Service** (SSR), not a static site.

1. New + → **Web Service** → connect this repo.
2. **Runtime:** Node.
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `node .output/server/index.mjs`
5. **Environment:** add `NODE_VERSION=20` plus any app env vars.
6. Create. Every push to `main` auto‑deploys.

---

## Scripts

| Command              | Purpose                          |
| -------------------- | -------------------------------- |
| `bun dev`            | Vite dev server (port 8080)      |
| `bun run build`      | Production build (`.output/`)    |
| `bunx tsgo --noEmit` | Strict TypeScript typecheck      |

---

## License

Proprietary — © Nexel. All rights reserved.
