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
          {"// contact"}
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
          className="block w-full max-w-sm rounded-[28px] p-8 shadow-e3 text-white bg-[linear-gradient(160deg,theme(colors.navy.20),theme(colors.navy.10))] transform hover:scale-[1.02] transition duration-300"
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
          "fixed left-1/2 bottom-20 lg:bottom-7 -translate-x-1/2 bg-navy-10 text-white text-sm font-body px-5 py-3.5 rounded-xl shadow-e3 transition-all duration-200 z-50 " +
          (showSnackbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none")
        }
      >
        {showSnackbar && "Email copied to clipboard"}
      </div>
    </div>
  )
}
export default Contact
