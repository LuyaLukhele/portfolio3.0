# Material Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the existing CRA + Tailwind portfolio with the MD3-inspired design system from `portfolio-redesign-package/prototype.html` (tokens, nav rail / bottom nav, top bar, section-switch transition, card/chip styling), using the site's real content, images, and links — no page/route/content changes.

**Architecture:** Extend `tailwind.config.js` with the prototype's color/shadow/font tokens, rebuild the navigation shell (`navigation.jsx`) as a nav rail + top bar + bottom nav replacing `layout.jsx`, and restyle each section component (`home.jsx`, `about.jsx`, `skills.jsx`, `projects.jsx`, `contact.jsx`) in place. `projects.jsx` drops its internal tab switcher in favor of stacked cards, and `miniLayout.jsx` is deleted as a result. A small shared `src/utils/clipboard.js` backs both the top bar's copy-email icon and the contact page's tap-to-copy pill + snackbar.

**Tech Stack:** React 19 (CRA/react-scripts 5), Tailwind CSS, `@testing-library/react` + `@testing-library/user-event` (already installed), Jest (via react-scripts).

**Spec:** `docs/superpowers/specs/2026-09-04-material-redesign-design.md`

## Global Constraints

- No new npm dependencies — everything is Tailwind config + existing testing-library packages already in `package.json`.
- Only one new font is added: Inter, as `font-body`, via the existing Google Fonts `<link>` in `public/index.html` (alongside the already-loaded Space Grotesk and JetBrains Mono). `font-display` stays Space Grotesk, `font-mono` stays JetBrains Mono.
- New color tokens use the exact hex values from the spec: `navy-10 #0B111E`, `navy-20 #16223A`, `navy-30 #22314E`, `navy-40 #33456B`, `navy-90 #D9DEEA`, `navy-95 #EBEEF5`, `orange-40 #CC6F27`, `orange-50 #E8863B`, `orange-60 #EE9C5A`, `orange-90 #FBE2C7`, `orange-95 #FDF0E0`, `surface #F6F7FB`, `surface-container #FFFFFF`, `surface-container-high #F0F2F7`, `outline #E1E4EA`, `outline-strong #C9CEDA`, `ink-900 #171B24`, `ink-700 #3C4351`, `ink-500 #69707F`.
- Extending Tailwind's `colors.orange` overrides only the unused `orange-50` key (verified below); `orange-100`–`orange-900` stay the Tailwind defaults still used elsewhere. `navy`, `surface`, `outline`, `ink` are new keys with no collision risk. The existing `brand.*` tokens in `tailwind.config.js` are left untouched.
- No gradients except the contact card background (`navy-20` → `navy-10`, approved reintroduction) — everything else that was a gradient in the prototype (hero-photo, about-photo) is a real photo instead.
- Real links only, never invented ones: LinkedIn `https://www.linkedin.com/in/luyalukhele/`, email `lukheleluyanda@gmail.com`, Now Movies `https://movie-luyapp.netlify.app`, Portfolio 1.0 `https://luyalukhele.github.io/`, GitHub `https://github.com/LuyaLukhele`.
- No screenshot/browser-driver based verification — manual check is done by the user. Verification here is `npm run lint`, `npm run build`, and `npm test`.

---

## File Structure

- **Modify** `tailwind.config.js` — add MD3 color tokens, `font-body`, `boxShadow` e1/e2/e3.
- **Modify** `public/index.html` — add Inter to the existing Google Fonts link.
- **Modify** `src/index.css` — include `page-fade-in` in the existing `prefers-reduced-motion: reduce` block (currently only covers the marquee).
- **Create** `src/utils/clipboard.js` — `copyToClipboard(text)` helper.
- **Create** `src/utils/clipboard.test.js` — tests for the helper.
- **Modify** `src/components/navigation.jsx` — full rewrite: nav rail (desktop), top bar (section title + LinkedIn/copy-email icons, scroll border), bottom nav (mobile), section-switch wiring generalized to `onNavigate(id)`.
- **Create** `src/components/navigation.test.js` — nav rail navigation + active state, top bar scroll border, top bar copy-email icon.
- **Delete** `src/components/layout.jsx` — superseded by the rail/topbar/main grid built directly in `navigation.jsx`.
- **Modify** `src/components/home.jsx` — restyle hero, add `onNavigate` prop for the two CTA buttons.
- **Create** `src/components/home.test.js` — CTA buttons call `onNavigate` with the right section id.
- **Modify** `src/components/about.jsx` — real photo instead of initials block, restyle cards/banner, `onContactClick` renamed to `onNavigate`.
- **Create** `src/components/about.test.js` — banner button calls `onNavigate(4)`.
- **Modify** `src/components/skills.jsx` — restyle wrapper/heading only; marquee logic untouched.
- **Modify** `src/components/projects.jsx` — remove tab switcher, render stacked MD3 project cards from real project data.
- **Create** `src/components/projects.test.js` — renders 3 project cards with the correct real links.
- **Delete** `src/components/miniLayout.jsx` — only consumer (`projects.jsx`) no longer uses it.
- **Modify** `src/components/contact.jsx` — navy gradient card with real photo, tap-to-copy email pill + snackbar.
- **Create** `src/components/contact.test.js` — copy pill calls `copyToClipboard`, updates its own text, and toggles the snackbar visible.
- **Modify** `src/App.test.js` — replace the stale default CRA smoke test (asserts text that no longer exists in the app) with one that matches the current app.

---

## Task 1: Design tokens, font, and reduced-motion fix

**Files:**
- Modify: `tailwind.config.js`
- Modify: `public/index.html`
- Modify: `src/index.css:98-102` (the `prefers-reduced-motion` block)

**Interfaces:**
- Produces: Tailwind utility classes used by every later task — `bg-navy-{10,20,30,40,90,95}`, `text-navy-*`, `bg-orange-{40,50,60,90,95}`, `text-orange-*`, `bg-surface`, `bg-surface-container`, `bg-surface-container-high`, `border-outline`, `border-outline-strong`, `text-ink-{900,700,500}`, `font-body`, `shadow-e1`, `shadow-e2`, `shadow-e3`.

- [ ] **Step 1: Confirm no existing use of `orange-50` would be affected**

Run: `grep -rn "orange-50\b" src`
Expected: no matches (the codebase only uses `orange-100`–`orange-500`, confirmed during design). If this turns up matches, stop and re-check the color key choice with the spec before continuing — do not silently overwrite an in-use class.

- [ ] **Step 2: Edit `tailwind.config.js`**

Replace the file's `theme.extend` block with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      colors: {
        brand: {
          accent: "#E8823E",
          navy: "#1B1E24",
          "navy-light": "#20354b",
          border: "#DADFE6",
        },
        navy: {
          10: "#0B111E",
          20: "#16223A",
          30: "#22314E",
          40: "#33456B",
          90: "#D9DEEA",
          95: "#EBEEF5",
        },
        orange: {
          40: "#CC6F27",
          50: "#E8863B",
          60: "#EE9C5A",
          90: "#FBE2C7",
          95: "#FDF0E0",
        },
        surface: {
          DEFAULT: "#F6F7FB",
          container: "#FFFFFF",
          "container-high": "#F0F2F7",
        },
        outline: {
          DEFAULT: "#E1E4EA",
          strong: "#C9CEDA",
        },
        ink: {
          900: "#171B24",
          700: "#3C4351",
          500: "#69707F",
        },
      },
      boxShadow: {
        e1: "0 1px 2px rgba(23,27,36,0.06), 0 1px 3px rgba(23,27,36,0.10)",
        e2: "0 2px 6px rgba(23,27,36,0.08), 0 4px 12px rgba(23,27,36,0.10)",
        e3: "0 8px 24px rgba(23,27,36,0.14)",
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Add Inter to the Google Fonts link in `public/index.html`**

Find:
```html
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
```

Replace with:
```html
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 4: Use Inter as the default body font**

In `src/index.css`, find:
```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Replace with:
```css
body {
  font-family:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 5: Make the section-switch transition respect reduced motion**

In `src/index.css`, find the existing reduced-motion block:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track,
  .marquee-track-reverse {
    animation: none;
  }
}
```

Replace with:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track,
  .marquee-track-reverse,
  .page-transition {
    animation: none;
  }
}
```

- [ ] **Step 6: Verify the build picks up the new config**

Run: `npm run build`
Expected: build succeeds (no Tailwind config errors). This won't yet show visual changes since no component uses the new classes.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.js public/index.html src/index.css
git commit -m "feat: add MD3 design tokens, Inter font, reduced-motion fix"
```

---

## Task 2: Shared clipboard utility

**Files:**
- Create: `src/utils/clipboard.js`
- Test: `src/utils/clipboard.test.js`

**Interfaces:**
- Produces: `copyToClipboard(text: string) => Promise<void>` — used by Task 3 (top bar) and Task 8 (contact pill).

- [ ] **Step 1: Write the failing tests**

Create `src/utils/clipboard.test.js`:
```js
import { copyToClipboard } from "./clipboard"

describe("copyToClipboard", () => {
  afterEach(() => {
    delete navigator.clipboard
  })

  test("writes the given text to the clipboard", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    await copyToClipboard("lukheleluyanda@gmail.com")

    expect(writeText).toHaveBeenCalledWith("lukheleluyanda@gmail.com")
  })

  test("resolves without throwing when the clipboard API is unavailable", async () => {
    Object.assign(navigator, { clipboard: undefined })

    await expect(
      copyToClipboard("lukheleluyanda@gmail.com")
    ).resolves.toBeUndefined()
  })

  test("resolves without throwing when writeText rejects", async () => {
    const writeText = jest.fn().mockRejectedValue(new Error("denied"))
    Object.assign(navigator, { clipboard: { writeText } })

    await expect(
      copyToClipboard("lukheleluyanda@gmail.com")
    ).resolves.toBeUndefined()
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx react-scripts test src/utils/clipboard.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './clipboard'`

- [ ] **Step 3: Implement the helper**

Create `src/utils/clipboard.js`:
```js
export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return Promise.resolve()
  }
  return navigator.clipboard.writeText(text).then(
    () => undefined,
    () => undefined
  )
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx react-scripts test src/utils/clipboard.test.js --watchAll=false`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/utils/clipboard.js src/utils/clipboard.test.js
git commit -m "feat: add shared copyToClipboard utility"
```

---

## Task 3: Navigation shell — nav rail, top bar, bottom nav

**Files:**
- Modify: `src/components/navigation.jsx` (full rewrite)
- Delete: `src/components/layout.jsx`
- Test: `src/components/navigation.test.js`

**Interfaces:**
- Consumes: `copyToClipboard(text)` from `src/utils/clipboard.js` (Task 2).
- Produces: `Nav` (default export) — the top-level component `App.js` renders. Internally, each section's `place` function now has the uniform signature `place: (navigate: (id: number) => void) => ReactNode`, and `navigate(id)` is what Home/About (Tasks 4–5) call via their `onNavigate` prop.

- [ ] **Step 1: Write the failing tests**

Create `src/components/navigation.test.js`:
```jsx
import { render, screen, fireEvent } from "@testing-library/react"
import Nav from "./navigation"

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } })
  window.scrollY = 0
})

test("shows Home content by default with the home section title", () => {
  render(<Nav />)
  expect(screen.getByText("// home")).toBeInTheDocument()
  expect(
    screen.getByText(/I build software across the stack/i)
  ).toBeInTheDocument()
})

test("switches section and title when a rail item is clicked", () => {
  render(<Nav />)
  fireEvent.click(screen.getByRole("button", { name: /projects/i }))
  expect(screen.getByText("// projects")).toBeInTheDocument()
})

test("marks the active rail item with aria-current", () => {
  render(<Nav />)
  const homeButtons = screen.getAllByRole("button", { name: /^home$/i })
  expect(homeButtons[0]).toHaveAttribute("aria-current", "page")
  fireEvent.click(screen.getByRole("button", { name: /about/i }))
  expect(homeButtons[0]).not.toHaveAttribute("aria-current")
})

test("top bar border toggles on scroll", () => {
  render(<Nav />)
  const header = screen.getByText("// home").closest("header")
  expect(header.className).not.toMatch(/border-outline\b/)
  window.scrollY = 10
  fireEvent.scroll(window)
  expect(header.className).toMatch(/border-outline\b/)
})

test("copy-email icon in the top bar copies the real address", () => {
  render(<Nav />)
  fireEvent.click(screen.getByTitle("Copy email"))
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "lukheleluyanda@gmail.com"
  )
})

test("LinkedIn quick link points at the real profile", () => {
  render(<Nav />)
  expect(screen.getByTitle("LinkedIn")).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/luyalukhele/"
  )
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx react-scripts test src/components/navigation.test.js --watchAll=false`
Expected: FAIL (current `navigation.jsx` has no `// home` title, no `title="Copy email"` button, etc.)

- [ ] **Step 3: Delete `src/components/layout.jsx`**

```bash
rm src/components/layout.jsx
```

- [ ] **Step 4: Rewrite `src/components/navigation.jsx`**

```jsx
import { useEffect, useState } from "react"
import Contact from "./contact"
import About from "./about"
import Projects from "./projects"
import Skills from "./skills"
import Home from "./home"
import { copyToClipboard } from "../utils/clipboard"

const EMAIL = "lukheleluyanda@gmail.com"
const LINKEDIN_URL = "https://www.linkedin.com/in/luyalukhele/"

const links = [
  {
    id: 0,
    link: "Home",
    place: (navigate) => <Home onNavigate={navigate} />,
    icon: homeIcon(),
  },
  {
    id: 1,
    link: "About",
    place: (navigate) => <About onNavigate={navigate} />,
    icon: aboutIcon(),
  },
  {
    id: 2,
    link: "Skills",
    place: () => <Skills />,
    icon: skillIcon(),
  },
  {
    id: 3,
    link: "Projects",
    place: () => <Projects />,
    icon: projectIcon(),
  },
  {
    id: 4,
    link: "Contact",
    place: () => <Contact />,
    icon: cotactIcon(),
  },
]

function Nav() {
  const [open, setOpen] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function navigate(id) {
    setOpen(id)
  }

  const active = links.find((l) => l.id === open)

  const indicatorClasses = (id) =>
    "flex items-center justify-center w-11 h-7 rounded-[14px] transition-colors duration-150 " +
    (id === open
      ? "bg-orange-90 text-orange-40"
      : "text-ink-500 hover:bg-surface-container-high")

  return (
    <div className="lg:grid lg:grid-cols-[88px_1fr] min-h-screen bg-surface font-body">
      <nav
        aria-label="Primary"
        className="hidden lg:flex lg:flex-col lg:items-center lg:sticky lg:top-0 lg:h-screen bg-surface-container border-r border-outline py-7 gap-1.5"
      >
        <div className="w-10 h-10 rounded-xl bg-navy-20 text-orange-60 flex items-center justify-center font-mono text-[13px] font-medium mb-7">
          LL
        </div>
        {links.map(({ id, link, icon }) => (
          <button
            key={id}
            type="button"
            aria-current={id === open ? "page" : undefined}
            className={
              "flex flex-col items-center gap-1 w-14 py-2 font-body text-[11px] font-medium " +
              (id === open ? "text-ink-900" : "text-ink-500")
            }
            onClick={() => navigate(id)}
          >
            <span className={indicatorClasses(id)}>{icon}</span>
            {link}
          </button>
        ))}
      </nav>

      <div className="flex flex-col min-h-screen">
        <header
          className={
            "flex items-center justify-between px-5 lg:px-10 py-4 sticky top-0 z-10 bg-surface/90 backdrop-blur-sm border-b transition-colors " +
            (scrolled ? "border-outline" : "border-transparent")
          }
        >
          <span className="font-mono text-[13px] text-ink-500 tracking-wide">
            {`// ${active.link.toLowerCase()}`}
          </span>
          <div className="flex gap-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container border border-outline text-ink-700 hover:bg-surface-container-high"
            >
              {linkedinIcon()}
            </a>
            <button
              type="button"
              title="Copy email"
              onClick={() => copyToClipboard(EMAIL)}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container border border-outline text-ink-700 hover:bg-surface-container-high"
            >
              {mailIcon()}
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-10 pb-24 lg:pb-10 max-w-3xl">
          <div key={open} className="page-transition">
            {active.place(navigate)}
          </div>
        </main>
      </div>

      <nav
        aria-label="Primary"
        className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-between px-3 py-2 bg-surface-container border-t border-outline z-10"
      >
        {links.map(({ id, link, icon }) => (
          <button
            key={id}
            type="button"
            aria-label={link}
            aria-current={id === open ? "page" : undefined}
            className={indicatorClasses(id)}
            onClick={() => navigate(id)}
          >
            {icon}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Nav

function homeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  )
}

function aboutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function skillIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  )
}

function projectIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
      />
    </svg>
  )
}

function cotactIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  )
}

function linkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
      />
    </svg>
  )
}

function mailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  )
}
```

Note: `App.js` imports `./components/navigation` unchanged — no edit needed there.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx react-scripts test src/components/navigation.test.js --watchAll=false`
Expected: PASS (6 tests). Note this will still show failures from `about.jsx`/`home.jsx` rendering with their old `onContactClick` prop until Tasks 4–5 land — that's expected and resolved by those tasks.

- [ ] **Step 6: Commit**

```bash
git add src/components/navigation.jsx src/components/navigation.test.js
git rm src/components/layout.jsx
git commit -m "feat: rebuild navigation as MD3 nav rail / top bar / bottom nav"
```

---

## Task 4: Home section restyle

**Files:**
- Modify: `src/components/home.jsx`
- Test: `src/components/home.test.js`

**Interfaces:**
- Consumes: `onNavigate(id: number)` prop, passed by `navigation.jsx` (Task 3).
- Produces: `Home` (default export), rendered as `<Home onNavigate={navigate} />`.

- [ ] **Step 1: Write the failing tests**

Create `src/components/home.test.js`:
```jsx
import { render, screen, fireEvent } from "@testing-library/react"
import Home from "./home"

test("View projects button navigates to the Projects section (id 3)", () => {
  const onNavigate = jest.fn()
  render(<Home onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /view projects/i }))
  expect(onNavigate).toHaveBeenCalledWith(3)
})

test("Get in touch button navigates to the Contact section (id 4)", () => {
  const onNavigate = jest.fn()
  render(<Home onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /get in touch/i }))
  expect(onNavigate).toHaveBeenCalledWith(4)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx react-scripts test src/components/home.test.js --watchAll=false`
Expected: FAIL — no "View projects" / "Get in touch" buttons in the current `home.jsx`.

- [ ] **Step 3: Rewrite `src/components/home.jsx`**

```jsx
import Me from "../assets/LuyandaShirtPP.avif"

const Home = ({ onNavigate }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-10 lg:gap-14 py-10">
      <div>
        <h1 className="font-display font-semibold tracking-tight text-4xl lg:text-5xl text-ink-900">
          I build software across the stack
          <span className="text-orange-50">.</span>
        </h1>
        <span className="mt-3 block font-mono text-orange-40 text-sm">
          Software Engineer
        </span>
        <p className="mt-4 max-w-md text-ink-700 leading-relaxed">
          I design and maintain web applications across the{" "}
          <span className="text-orange-50 font-semibold">front-end</span>,{" "}
          <span className="text-orange-50 font-semibold">back-end</span>,
          APIs, and the databases that hold it together.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate(3)}
            className="rounded-full bg-navy-20 text-white font-semibold text-sm px-6 py-3 shadow-e1 hover:bg-navy-30 transition"
          >
            View projects
          </button>
          <button
            type="button"
            onClick={() => onNavigate(4)}
            className="rounded-full border border-outline-strong text-ink-900 font-semibold text-sm px-6 py-3 hover:bg-surface-container-high transition"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div className="relative mx-auto lg:mx-0 shrink-0">
        <div className="absolute -bottom-4 -right-4 h-64 w-full bg-orange-50 rounded-[28px_28px_28px_8px] -z-10" />
        <img
          alt="Luyanda Lukhele"
          className="h-64 rounded-[28px_28px_28px_8px] shadow-e3 object-cover"
          src={Me}
        />
      </div>
    </div>
  )
}

export default Home
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx react-scripts test src/components/home.test.js --watchAll=false`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/home.jsx src/components/home.test.js
git commit -m "feat: restyle Home section with MD3 tokens and onNavigate CTAs"
```

---

## Task 5: About section restyle

**Files:**
- Modify: `src/components/about.jsx`
- Test: `src/components/about.test.js`

**Interfaces:**
- Consumes: `onNavigate(id: number)` prop, passed by `navigation.jsx` (Task 3).
- Produces: `About` (default export), rendered as `<About onNavigate={navigate} />`.

- [ ] **Step 1: Write the failing test**

Create `src/components/about.test.js`:
```jsx
import { render, screen, fireEvent } from "@testing-library/react"
import About from "./about"

test("Get in touch banner button navigates to the Contact section (id 4)", () => {
  const onNavigate = jest.fn()
  render(<About onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /get in touch/i }))
  expect(onNavigate).toHaveBeenCalledWith(4)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx react-scripts test src/components/about.test.js --watchAll=false`
Expected: FAIL — current component expects an `onContactClick` prop, not `onNavigate`, so the click handler never fires `onNavigate`.

- [ ] **Step 3: Rewrite `src/components/about.jsx`**

Keep the `cards` array (lines 1–68 of the current file) exactly as-is. Replace everything from the component definition down:

```jsx
import Me from "../assets/LuyandaShirtPP.avif"

const cards = [
  // ...unchanged, keep the existing three entries (Back-End, Front-End, Engineering Approach)
]

const About = ({ onNavigate }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <img
          src={Me}
          alt="Luyanda Lukhele"
          className="w-32 h-32 lg:w-56 lg:h-56 rounded-3xl object-cover shadow-e2 shrink-0"
        />
        <p className="font-display text-2xl lg:text-3xl font-semibold text-ink-900">
          I'm a Software Engineer who builds and maintains web applications
          across the{" "}
          <span className="text-orange-50 font-bold">front-end</span>,{" "}
          <span className="text-orange-50 font-bold">back-end</span>, APIs,
          and databases.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map(({ title, description, icon, fullWidth }) => (
          <div
            key={title}
            className={
              "bg-surface-container border border-outline rounded-[20px] shadow-e1 p-5" +
              (fullWidth ? " sm:col-span-2" : "")
            }
          >
            <div className="h-9 w-9 rounded-md flex items-center justify-center bg-navy-20">
              {icon}
            </div>
            <h3 className="mt-4 font-display font-semibold text-ink-900">
              {title}
            </h3>
            <p className="mt-2 text-ink-700 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[20px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-navy-20 py-6 px-6">
        <div>
          <h3 className="text-white font-display font-semibold text-lg">
            Open to new opportunities
          </h3>
          <p className="mt-1 text-white/70">
            If you're looking for a engineer with front-end and back-end
            experience, I'd love to hear from you.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(4)}
          className="shrink-0 rounded-full px-5 py-2.5 text-white font-semibold self-start sm:self-auto bg-orange-50 hover:bg-orange-40 transition"
        >
          Get in touch
        </button>
      </div>
    </div>
  )
}
export default About
```

(The `cards` array's icon `className` props still say `text-white` — leave those untouched; they still render correctly on the `bg-navy-20` icon tile.)

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx react-scripts test src/components/about.test.js --watchAll=false`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/about.jsx src/components/about.test.js
git commit -m "feat: restyle About section, rename onContactClick to onNavigate"
```

---

## Task 6: Skills section wrapper restyle

**Files:**
- Modify: `src/components/skills.jsx`

**Interfaces:**
- No prop/interface changes. `logo()`, `skillsList`, `Logo`, `half`, `rows`, `MarqueeRow` all stay exactly as they are — only the outer `<section>` markup changes.

- [ ] **Step 1: Edit the `Skills` component's outer markup**

Find:
```jsx
const Skills = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-50 h-3/5 m-2 flex flex-col justify-center items-center overflow-hidden border-solid border-2 rounded-sm border-stone-300">
      <div className="sm:mt-24 container px-5 py-24 mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col gap-8 sm:gap-10">
          <MarqueeRow items={rows[0]} />
          <MarqueeRow items={rows[1]} reverse />
        </div>
      </div>
    </section>
  )
}
```

Replace with:
```jsx
const Skills = () => {
  return (
    <section className="py-10">
      <div className="pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-500">
          // skills
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink-900">
          Languages, frameworks, and tools
        </h2>
      </div>
      <div className="bg-surface-container border border-outline rounded-[20px] shadow-e1 py-10 flex flex-col items-center overflow-hidden">
        <div className="w-full flex flex-col gap-8 sm:gap-10 px-5">
          <MarqueeRow items={rows[0]} />
          <MarqueeRow items={rows[1]} reverse />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run the existing test suite to confirm nothing broke**

Run: `npx react-scripts test src/components/navigation.test.js --watchAll=false`
Expected: PASS (Skills isn't the default view, but this confirms `navigation.jsx` still renders cleanly with the edited `skills.jsx` in the tree).

- [ ] **Step 3: Commit**

```bash
git add src/components/skills.jsx
git commit -m "feat: restyle Skills section wrapper with MD3 tokens"
```

---

## Task 7: Projects section — stacked MD3 cards

**Files:**
- Modify: `src/components/projects.jsx` (full rewrite)
- Delete: `src/components/miniLayout.jsx`
- Test: `src/components/projects.test.js`

**Interfaces:**
- Produces: `Projects` (default export), no props. Internal `TechBadge`/`ProjectImage` are no longer exported (they weren't before either — only used internally).

- [ ] **Step 1: Write the failing test**

Create `src/components/projects.test.js`:
```jsx
import { render, screen } from "@testing-library/react"
import Projects from "./projects"

test("renders all three projects as cards with their real links", () => {
  render(<Projects />)

  expect(
    screen.getByRole("heading", { name: "Now Movies" })
  ).toBeInTheDocument()
  expect(
    screen.getByRole("heading", { name: "Portfolio 1.0" })
  ).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "GitHub" })).toBeInTheDocument()

  const links = screen.getAllByRole("link")
  const hrefs = links.map((a) => a.getAttribute("href"))
  expect(hrefs).toEqual(
    expect.arrayContaining([
      "https://movie-luyapp.netlify.app",
      "https://luyalukhele.github.io/",
      "https://github.com/LuyaLukhele",
    ])
  )
})

test("shows tech chips for projects that have them, and omits them otherwise", () => {
  render(<Projects />)
  expect(screen.getByText("JavaScript")).toBeInTheDocument()
  expect(screen.getByText("MoviesDB API")).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx react-scripts test src/components/projects.test.js --watchAll=false`
Expected: FAIL — current component renders a tab switcher, not headings for all three projects at once.

- [ ] **Step 3: Rewrite `src/components/projects.jsx`**

```jsx
import { useState } from "react"
import MoviePP from "../assets/movie.avif"
import Portfolio1PP from "../assets/portfolio1.avif"
import Github from "../assets/Git.avif"

const logo = (name) => `${process.env.PUBLIC_URL}/logos/${name}.svg`

const techLogos = {
  JavaScript: logo("javascript"),
  JQuery: logo("jquery"),
  HTML: logo("html5"),
  CSS: logo("css3"),
  Git: logo("git"),
}

function ProjectImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full">
      <div
        className={
          "absolute inset-0 bg-gray-200 animate-pulse pointer-events-none transition-opacity duration-300" +
          (loaded ? " opacity-0" : " opacity-100")
        }
      />
      <img
        src={src}
        alt={alt}
        className={
          className +
          " transition-opacity duration-500 ease-out" +
          (loaded ? " opacity-100" : " opacity-0")
        }
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function TechBadge({ name }) {
  const badgeLogo = techLogos[name]
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full bg-surface-container-high text-ink-700">
      {badgeLogo ? (
        <img src={badgeLogo} alt="" className="h-4 w-4 object-contain" />
      ) : (
        <svg
          className="h-4 w-4 text-orange-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      )}
      {name}
    </span>
  )
}

const projects = [
  {
    title: "Now Movies",
    description: "Discover current movies and TV shows and their ratings.",
    image: MoviePP,
    imageAlt: "Now Movies live site",
    tech: ["JavaScript", "JQuery", "MoviesDB API"],
    linkLabel: "Live site",
    linkUrl: "https://movie-luyapp.netlify.app",
  },
  {
    title: "Portfolio 1.0",
    description:
      "An earlier version of this portfolio, built to bring my projects, skills, and contact details together in one place.",
    image: Portfolio1PP,
    imageAlt: "First Portfolio live site",
    tech: ["JavaScript", "HTML", "CSS"],
    linkLabel: "Live site",
    linkUrl: "https://luyalukhele.github.io/",
  },
  {
    title: "GitHub",
    description: "This is the repository to all my personal projects.",
    image: Github,
    imageAlt: "Luyanda's GitHub profile",
    tech: [],
    linkLabel: "View profile",
    linkUrl: "https://github.com/LuyaLukhele",
  },
]

function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  tech,
  linkLabel,
  linkUrl,
}) {
  return (
    <article className="bg-surface-container border border-outline rounded-[24px] shadow-e1 overflow-hidden mb-6">
      <a href={linkUrl} target="_blank" rel="noreferrer">
        <ProjectImage
          className="w-full h-48 object-cover"
          src={image}
          alt={imageAlt}
        />
      </a>
      <div className="p-7">
        <h3 className="font-display text-xl font-semibold text-ink-900">
          {title}
        </h3>
        <p className="mt-2 text-ink-700 leading-relaxed">{description}</p>
        {tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((name) => (
              <TechBadge key={name} name={name} />
            ))}
          </div>
        )}
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-outline-strong hover:bg-surface-container-high transition"
        >
          {linkLabel}
        </a>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <div className="py-10">
      <div className="pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-500">
          // projects
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink-900">
          A couple of things I've shipped
        </h2>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  )
}

export default Projects
```

- [ ] **Step 4: Delete the now-unused `miniLayout.jsx`**

Run: `grep -rn "miniLayout" src` to confirm no remaining imports, then:
```bash
rm src/components/miniLayout.jsx
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx react-scripts test src/components/projects.test.js --watchAll=false`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add src/components/projects.jsx src/components/projects.test.js
git rm src/components/miniLayout.jsx
git commit -m "feat: replace Projects tab switcher with stacked MD3 project cards"
```

---

## Task 8: Contact section — gradient card + tap-to-copy pill

**Files:**
- Modify: `src/components/contact.jsx` (full rewrite)
- Test: `src/components/contact.test.js`

**Interfaces:**
- Consumes: `copyToClipboard(text)` from `src/utils/clipboard.js` (Task 2).
- Produces: `Contact` (default export), no props.

- [ ] **Step 1: Write the failing tests**

Create `src/components/contact.test.js`:
```jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Contact from "./contact"

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  })
})

test("tapping the email pill copies the real address and shows confirmation", async () => {
  render(<Contact />)

  fireEvent.click(screen.getByRole("button", { name: /tap to copy/i }))

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "lukheleluyanda@gmail.com"
  )
  await waitFor(() =>
    expect(screen.getByText("copied ✓")).toBeInTheDocument()
  )
  expect(screen.getByTestId("snackbar").className).toMatch(/opacity-100/)
})

test("LinkedIn card links to the real profile", () => {
  render(<Contact />)
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/luyalukhele/"
  )
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx react-scripts test src/components/contact.test.js --watchAll=false`
Expected: FAIL — current component is a plain `mailto:` link with no copy/snackbar behavior.

- [ ] **Step 3: Rewrite `src/components/contact.jsx`**

```jsx
import { useState } from "react"
import myImage from "../assets/LuyandaShirtPP.avif"
import { copyToClipboard } from "../utils/clipboard"

const EMAIL = "lukheleluyanda@gmail.com"

const Contact = () => {
  const [copyState, setCopyState] = useState("tap to copy")
  const [showSnackbar, setShowSnackbar] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(EMAIL)
    setCopyState("copied ✓")
    setShowSnackbar(true)
    setTimeout(() => setCopyState("tap to copy"), 2000)
    setTimeout(() => setShowSnackbar(false), 2200)
  }

  return (
    <div className="py-10">
      <div className="pb-6">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-500">
          // contact
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink-900">
          The best ways to reach me
        </h2>
      </div>

      <div className="flex flex-col items-start gap-5">
        <a
          href="https://www.linkedin.com/in/luyalukhele/"
          target="_blank"
          rel="noreferrer"
          className="block w-full max-w-sm rounded-[28px] p-8 shadow-e3 text-white bg-[linear-gradient(160deg,#16223A,#0B111E)] transform hover:scale-[1.02] transition duration-300"
        >
          <img
            src={myImage}
            className="rounded-2xl w-24 h-24 object-cover"
            alt="Luyanda Lukhele"
          />
          <h3 className="mt-6 font-display font-semibold text-2xl">
            Luyanda Lukhele
          </h3>
          <span className="mt-1 block font-mono text-orange-60 text-sm">
            Software Engineer
          </span>
          <span className="mt-4 inline-block text-orange-60 font-semibold text-sm border-b border-orange-40 pb-0.5">
            LinkedIn ↗
          </span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-3 w-full max-w-sm bg-surface-container rounded-full pl-4 pr-5 py-3 border border-outline shadow-e1 hover:bg-surface-container-high transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6 shrink-0"
          >
            <path
              fill="#4285F4"
              d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
            />
            <path
              fill="#FBBC05"
              d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
            />
            <path
              fill="#EA4335"
              d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
            />
          </svg>
          <span className="font-mono text-sm text-ink-900">{EMAIL}</span>
          <span className="ml-auto font-mono text-xs text-ink-500">
            {copyState}
          </span>
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        data-testid="snackbar"
        className={
          "fixed left-1/2 bottom-7 -translate-x-1/2 bg-navy-10 text-white text-sm font-body px-5 py-3.5 rounded-xl shadow-e3 transition-all duration-200 z-50 " +
          (showSnackbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none")
        }
      >
        Email copied to clipboard
      </div>
    </div>
  )
}
export default Contact
```

Note: the copy pill's accessible name comes from its own text content (email + "tap to copy"), which is why the test above uses `name: /tap to copy/i`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx react-scripts test src/components/contact.test.js --watchAll=false`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/contact.jsx src/components/contact.test.js
git commit -m "feat: restyle Contact with navy gradient card and tap-to-copy pill"
```

---

## Task 9: Fix stale App smoke test and final verification

**Files:**
- Modify: `src/App.test.js`

**Interfaces:**
- None — this is the final integration check, exercising everything built in Tasks 1–8 together.

- [ ] **Step 1: Replace the stale smoke test**

The current `src/App.test.js` asserts `getByText(/learn react/i)`, which hasn't existed in this app since it stopped being the CRA starter page. Replace its contents with:

```jsx
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders the portfolio nav and defaults to the Home section", () => {
  render(<App />)
  expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument()
  expect(screen.getByText("// home")).toBeInTheDocument()
  expect(
    screen.getByText(/I build software across the stack/i)
  ).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the full test suite**

Run: `CI=true npm test`
Expected: all test files pass — `App.test.js`, `src/utils/clipboard.test.js`, `src/components/navigation.test.js`, `src/components/home.test.js`, `src/components/about.test.js`, `src/components/projects.test.js`, `src/components/contact.test.js`.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors. Fix any that surface (e.g. unused imports left over from the `miniLayout`/tab-switcher removal) before moving on.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: production build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.test.js
git commit -m "test: fix stale App smoke test to match the redesigned app"
```

- [ ] **Step 6: Manual check (by the user)**

Run `npm start` and check, per the spec's testing section: desktop nav rail vs. mobile bottom nav at the breakpoint boundary, the section-switch fade/slide transition (and with OS-level reduced-motion on), the copy-email pill + snackbar on Contact, and that all links (LinkedIn, GitHub, live project sites) resolve correctly. This step is not run by the implementer — hand off to the user for this part per their standing preference against browser-driver verification.

---

## Self-Review Notes

- **Spec coverage:** tokens/typography (Task 1), nav rail/top bar/bottom nav/section-switch transition (Task 3), Home (Task 4), About (Task 5), Skills — marquee kept per user decision (Task 6), Projects cards (Task 7), Contact gradient card + copy pill + snackbar (Task 8). `layout.jsx` and `miniLayout.jsx` removals are covered in Tasks 3 and 7 respectively.
- **Type/interface consistency checked:** `onNavigate(id)` is the one prop name used everywhere a section triggers navigation (Home's two buttons, About's banner button, `navigation.jsx`'s `place` functions) — no leftover `onContactClick` references after Task 5. `copyToClipboard` has the same signature and import path (`../utils/clipboard`) in both its Task 3 and Task 8 usages.
- **No placeholders:** every task contains complete, real code and real project data (URLs, email, hex values) sourced directly from the current codebase or the committed spec — nothing invented.
