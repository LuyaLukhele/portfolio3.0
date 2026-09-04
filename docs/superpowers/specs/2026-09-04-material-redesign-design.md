# Material redesign — design spec

## Context

`portfolio-redesign-package/prototype.html` is a static MD3-inspired visual/interaction
reference (`portfolio-redesign-package/CLAUDE_CODE_INSTRUCTIONS.md`). The goal is to
reproduce its design system inside the existing CRA + Tailwind React app, using real
content/routes/images already in the repo instead of the prototype's placeholders. This is
a visual/interaction layer change — the app's pages, links, and content stay the same.

**Prior feedback on file** ([[feedback_section_styling]] memory): the user previously
rejected a gradient hero background and a dark navy contact-card treatment on this site,
preferring the flat `bg-gray-50`/`border-stone-300` wrapper across sections. For this
redesign the user explicitly approved reintroducing the navy gradient and dark surfaces
*where the prototype specifies them as a deliberate design element* (contact card
background, nav rail brand mark) — not as blanket per-section color differentiation.
Gradients that exist in the prototype purely to stand in for a missing photo (hero-photo,
about-photo) are dropped, since real photos are used instead.

## Tokens

Add to `tailwind.config.js` `theme.extend`:

- **Colors** — full MD3 scale from the prototype: `navy-10/20/30/40/90/95`,
  `orange-40/50/60/90/95`, `surface`, `surface-container`, `surface-container-high`,
  `outline`, `outline-strong`, `ink-900/700/500`. The existing `brand.*` tokens
  (`brand.accent`, `brand.navy`, `brand.navy-light`, `brand.border`) stay defined
  (still referenced by unaffected code) but new components use the new scale directly.
- **Fonts** — `font-display` (Space Grotesk) and `font-mono` (JetBrains Mono) stay as
  currently configured. Add `font-body` → Inter. Add the Inter Google Fonts request to
  `public/index.html`'s existing font `<link>` (alongside Space Grotesk/JetBrains Mono),
  weights 400/500/600/700.
- **boxShadow** — add `e1`, `e2`, `e3` matching the prototype's elevation values.
- **borderRadius** — no new global scale; use arbitrary values (`rounded-[28px]` etc.,
  and `rounded-[28px_28px_28px_8px]` for the asymmetric hero-photo corner) inline per
  component, matching prototype shapes.

## Navigation shell

Replace `layout.jsx` (`SplitScreenLayout`) and the `Rightside` nav block in
`navigation.jsx` with:

- **Nav rail** (`lg:` and up): fixed left, 88px wide, `surface-container` background,
  `outline` right border. Flat `navy-20` rounded-square brand mark ("LL") at top — no
  gradient. Each of the 5 existing sections (Home/About/Skills/Projects/Contact) keeps
  its current SVG icon + label; active item gets an orange tonal pill indicator
  (44×28px, 14px radius, `orange-90` bg / `orange-40` text) instead of today's
  bounce/border-color treatment.
- **Top bar**: new, sticky, `// <section>` in mono (`ink-500`), quick-action icons for
  LinkedIn (real URL, opens in new tab) and copy-email (see Contact section — same
  clipboard action). Bottom border appears only once the page has scrolled
  (`scroll` listener toggling a class/state, matching prototype behavior).
- **Bottom nav** (below `lg:`): fixed to viewport bottom, icon-only, same active-pill
  styling as the rail. Replaces the current horizontal top-of-page pill row.
- **Section-switch transition**: keep the existing `key={open}` remount pattern.
  Implement the currently-referenced-but-undefined `page-transition` class as a fade +
  6px upward slide, ~320ms ease, wrapped in `@media (prefers-reduced-motion: no-preference)`
  so reduced-motion users get an instant swap.
- `miniLayout.jsx` becomes unused (Projects drops its internal tab switcher — see below)
  and is deleted.

## Sections

### Home (`home.jsx`)
Hero grid (stacks on mobile, matching prototype's `<900px` collapse — reuse the existing
`sm:`/`lg:` breakpoints already used elsewhere in this codebase rather than introducing a
custom 900px breakpoint). Real photo (`LuyandaShirtPP.avif`) keeps its current orange
offset accent block; photo wrapper gets the asymmetric rounded corner + `e3` shadow. Role
label restyled in mono/orange. CTA row: filled pill button ("View projects", navigates to
Projects) + outline pill button ("Get in touch", navigates to Contact) — reusing the
existing `navigate(id)` callback pattern already in `miniLayout`'s sibling `Nav` usage
(`onContactClick`) generalized to accept a target section id.

### About (`about.jsx`)
Real photo replaces the placeholder initials block, sized/rounded like the prototype's
about-photo slot (no gradient — real photo now fills that role). Three info cards
(Back-End / Front-End / Engineering Approach — content unchanged) restyled with the new
radius/shadow/border tokens. "Open to new opportunities" banner stays flat `navy` solid
(no gradient added — not specified by the prototype for this element, and consistent with
prior feedback where no gradient is explicitly called for).

### Skills (`skills.jsx`)
No structural change — user chose to keep the existing logo marquee. Restyle the section
wrapper/heading only: mono section label + heading matching the prototype's
`.section-head` typography, card surface/border/shadow tokens on the wrapper.

### Projects (`projects.jsx`)
Remove the `miniLayout`-based tab switcher (`Top`/`Bottom` state toggle). Render all three
projects (Now Movies, Portfolio 1.0, GitHub) as stacked MD3 project cards in a fixed list:
real screenshot as card media (existing `ProjectImage` component, no gradient poster
strip), title + description, tech chips (existing `TechBadge` content restyled as pill
chips), and Source/Live-site pill links using the real hrefs already present
(`movie-luyapp.netlify.app`, `luyalukhele.github.io`, `github.com/LuyaLukhele`).

### Contact (`contact.jsx`)
Navy gradient card (`linear-gradient(160deg, navy-20, navy-10)`, `e3` shadow, `28px`
radius) — approved reintroduction of the gradient/dark surface for this element
specifically. Real photo instead of initials avatar. Real LinkedIn URL (already present)
as the card's link. Replace the current plain `mailto:` link with a tap-to-copy pill:
`navigator.clipboard.writeText('lukheleluyanda@gmail.com')` on click, pill text flips to
"copied ✓" for ~2s, plus a snackbar toast (fixed bottom-center, `navy-10` bg, fades
in/out) confirming the copy. Falls back silently if clipboard API is unavailable (matches
prototype's `.catch(()=>{})`).

## Data flow / state

No new global state. Section selection stays a local `useState` in `navigation.jsx`
(`open`, 0–4) as today. Top bar's section title derives from the same `open`/`links`
lookup already used to render content, so it doesn't need separate state. Scroll-based
top-bar border and copy-email "copied" state are local `useState`s in their respective
components.

## Testing

- `npm run lint` and `npm run build` after implementation.
- Manual check (by the user — no screenshot/browser-driver verification per standing
  preference): desktop nav rail vs. mobile bottom nav at the breakpoint boundary,
  section-switch fade/slide transition (and with `prefers-reduced-motion` on), copy-email
  pill + snackbar, all existing links (LinkedIn, GitHub, live project sites, mailto
  fallback removed) still resolve correctly.

## Explicitly out of scope

- No new icon library — reuse existing inline SVGs.
- No routing changes — stays a single-page section-switch app.
- No content changes beyond what's needed to fill prototype placeholders with existing
  real assets/links (no new copy, no new images).
- No changes to `App.js`, `App.test.js`, or build tooling beyond the Tailwind config and
  one font `<link>` addition.
