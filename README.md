# Benson Agala — Portfolio

Single-page developer portfolio built with **Angular 21** (standalone, zoneless, signals), **Tailwind CSS v4**, and **SSR with prerendering**.

## Quick start

```bash
npm install
npm start                 # dev server at http://localhost:4200
npm run build             # production build + prerendered HTML in dist/Agala
npm run serve:ssr:Agala   # serve the SSR build at http://localhost:4000
npm test                  # unit tests (Vitest)
```

## Editing content

All copy lives in two files, so you rarely need to touch the components:

| File | What it holds |
| --- | --- |
| `src/app/data/profile.ts` | Name, headline, email, social links, portrait, roles you're open to, CV link, form endpoint |
| `src/app/data/content.ts` | Nav links, hero, the two disciplines, skills, projects, services, experience |

Images live in `public/images/` (portrait) and `public/images/projects/` (case-study screenshots).

Before deploying:

1. **Email**: set `PROFILE.email` (currently a placeholder).
2. **CV**: put your CV PDF in `public/` and set `PROFILE.cvUrl` (e.g. `/benson-agala-cv.pdf`) to show "Download CV" buttons.
3. **Experience**: replace the entries in `EXPERIENCE` with your real roles and dates.
4. **Skills**: trim the security list in `SKILL_GROUPS` to what you can speak to in an interview.
5. **Project links**: set `demoUrl` and `sourceUrl` per project. With no `demoUrl`, the card shows a "Request a Demo" button that links to the contact page.
6. **Contact form**: the form posts to this app's own `POST /api/contact` endpoint (`src/contact-api.ts`), which validates, rate-limits and emails the message to you over SMTP. Copy `.env.example` to `.env` and fill in your SMTP details (on your host, set the same variables in its environment settings). The visitor sees a success toast on delivery and an error toast otherwise. This needs the Node server (`npm run serve:ssr:Agala`); it won't work on static-only hosting such as GitHub Pages.
7. **PWA**: the service worker (`ngsw-config.json`) is active in production builds only. Icons live in `public/icons/`, the manifest in `public/manifest.webmanifest`. Serve over HTTPS for the site to be installable.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, roles open to, Frontend + Security disciplines, featured work, call to action |
| `/projects` | Full case studies (each has an anchor, e.g. `/projects#inventory-dashboard`) |
| `/about` | About, principles, skills & stack |
| `/services` | Frontend, integration, Shopify, AppSec/DevSecOps and Detection & Response services |
| `/experience` | Timeline |
| `/contact` | Contact form, copy-email, LinkedIn & GitHub |

Every route is lazy-loaded and prerendered to static HTML at build time.

## Structure

```
src/app/
├── core/theme.service.ts        Dark/light theme (SSR-safe, persisted)
├── data/                        All site content
├── layout/navbar, footer        Sticky nav with active-page highlighting + mobile menu, footer
├── pages/home, about            Pages composed from several sections
├── sections/                    hero, projects, about, skills, services, experience, contact
└── shared/icon, section-heading Inline SVG icon set, reusable section heading
```

## Theming

Colors are CSS variables in `src/styles.css` (`:root` = light, `.dark` = dark), exposed as Tailwind utilities (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, `bg-invert`, …). Dark is the default. An inline script in `src/index.html` applies a saved "light" preference before first paint, so there is no theme flash.

## Notes

- No component touches `window`/`document` during server rendering: browser-only logic runs in `afterNextRender` or behind `isPlatformBrowser`.
- Navigation uses the Angular router with lazy-loaded pages; the scroll position resets to the top on each page change.
- If `npm test` fails with "Vitest failed to find the runner", a VS Code extension (e.g. Console Ninja) has patched files in `node_modules`. Disable it for this workspace and reinstall with `npm ci`.
