# anush jayanthan — portfolio

A personal portfolio site built with React, Vite, and Tailwind CSS. Focused on
showcasing RTL design, FPGA, digital hardware, firmware, and embedded systems
work for recruiters.

## Tech stack

- **React** — UI components
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — styling (theme colors defined in `src/index.css`)

No routing library, no state management library, no UI kit — just plain
React components and Tailwind classes, kept intentionally simple.

---

## Running it locally

You need [Node.js](https://nodejs.org/) (v18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your
browser. The page hot-reloads as you edit files.

Other commands:

```bash
npm run build    # builds the production site into dist/
npm run preview  # locally preview the production build
```

---

## Folder structure

```
src/
  components/     # One file per section/UI piece (Navbar, Hero, Me, ...)
  data/           # Plain JS files with your content — edit these, not the components
  App.jsx         # Composes all the sections in order
  index.css       # Tailwind import + theme colors (blue accent) + animations
  main.jsx        # React entry point (you shouldn't need to touch this)
public/
  images/         # Put your real images here (see below)
```

The idea: **components handle layout, `src/data/*.js` files hold your
content.** To change what's on the page, you'll almost always edit a file in
`src/data/`, not a component.

---

## Editing your content

### Links (email, GitHub, LinkedIn)

Edit `src/data/siteConfig.js` — every component reads from this one file:

```js
const siteConfig = {
  email: 'your.email@example.com',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
}
```

### Profile photo

1. Put your photo in `public/images/` (e.g. `public/images/profile.jpg`).
2. Open `src/components/Me.jsx` and set the `src` prop:

```jsx
<ImagePlaceholder src="/images/profile.jpg" label="your professional photo" />
```

Until you add a real `src`, a labeled placeholder box is shown automatically
— the layout won't break.

### Projects

Everything about your projects lives in **`src/data/projects.js`** — one
array, one object per project. To add, remove, or edit a project, edit this
file only; the card layout and modal update automatically.

Each project has:
- `title`, `shortDescription`, `technologies`, `accomplishments` — shown on the card
- `image` / `imageLabel` — the card's image (see "Adding project images" below)
- `github` — link to the repo
- `details` — shown in the "view details" modal: `overview`, `features`,
  `architecture`, `challenges`, `testing`, `learned`, and a gallery `images` array

The file already contains draft content for your four resume projects with
`TODO:` comments marking anything you should double-check or fill in against
your actual project notes (exact wording, dates, GitHub links, etc.).

### Adding project images

1. Put the image in `public/images/` (e.g. `public/images/riscv-pipeline.png`).
2. In `src/data/projects.js`, set that project's `image` field:

```js
image: '/images/riscv-pipeline.png',
```

Same pattern for gallery images inside a project's `details.images` array —
set the `src` field on the relevant entry.

### Experience

Edit `src/data/experience.js`. Each entry has `title`, `company`, `logo`,
`dates`, `location`, `bullets` (3 accomplishment points), and `technologies`.
Draft entries are pre-filled for Skyjack, UW Formula Electric, and WATurbine
with `TODO:` placeholders for exact dates/locations/bullet wording — swap
those for the exact text from your resume.

To add a company/team logo, put the image in `public/images/` (e.g.
`public/images/skyjack-logo.png`) and set that entry's `logo` field to
`'/images/skyjack-logo.png'`. Until you do, a small placeholder icon is
shown automatically.

### Skills

Edit `src/data/skills.js` — an array of `{ category, items }` groups. Add or
remove strings from any `items` array.

### Me (bio, hobbies, education)

All of it lives in `src/components/Me.jsx`:
- the bio paragraph — keep it short
- the `HOBBIES` array near the top — each one is just an emoji + label, and
  the page automatically cycles through them one at a time
- the education block at the bottom — school, degree, graduation date

---

## Light / dark mode

There's a toggle button in the navbar (sun/moon icon). It defaults to the
visitor's OS preference, and remembers whichever mode they pick (stored in
`localStorage`). Dark-mode colors live in the `@theme` block in
`src/index.css`; light-mode overrides live right below it in the
`:root[data-theme="light"]` block — if you change a color, check whether the
other theme needs updating too.

---

## Deploying

The site builds to a static `dist/` folder, so any static host works.

### Vercel (easiest)

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), "Add New Project", import the repo.
3. Vercel auto-detects Vite — leave the defaults and click Deploy.

### Netlify

1. Push this project to a GitHub repo.
2. Go to [netlify.com](https://netlify.com), "Add new site" → "Import an existing project".
3. Build command: `npm run build`. Publish directory: `dist`.

### GitHub Pages

1. Install the gh-pages helper: `npm install -D gh-pages`
2. In `vite.config.js`, add your repo name as the `base`:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react(), tailwindcss()],
   })
   ```
3. Add to `package.json` `scripts`:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
4. Run `npm run deploy`, then enable GitHub Pages for the `gh-pages` branch
   in your repo settings.

---

## Notes

- Colors: to change the accent color site-wide, edit the `--color-accent*`
  values in `src/index.css` (once for dark mode, once for light mode).
- Font: Space Grotesk, self-hosted (not loaded from Google Fonts at runtime)
  so the page never waits on an external request for it. The file lives at
  `public/fonts/space-grotesk.woff2` and is wired up via `@font-face` near
  the top of `src/index.css`. To use a different font, download its `.woff2`,
  replace that file, and update the `@font-face` and `--font-body` rule to
  match.
- All image placeholders (project cards, profile photo, modal gallery) fall
  back to a labeled dashed box automatically until you add a real image —
  nothing breaks if you leave them unset.
