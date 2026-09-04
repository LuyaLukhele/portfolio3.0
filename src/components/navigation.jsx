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
          data-testid="section-header"
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
        aria-label="Primary (mobile)"
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
