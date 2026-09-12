import { useState } from "react"
import myImage from "../assets/LuyandaShirtPP.avif"
import { copyToClipboard } from "../utils/clipboard"

const EMAIL = "lukheleluyanda@gmail.com"

const Contact = () => {
  const [copyState, setCopyState] = useState("tap to copy")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState("idle")

  const showToast = (message) => {
    setSnackbarMessage(message)
    setShowSnackbar(true)
    setTimeout(() => setShowSnackbar(false), 2200)
  }

  const handleCopy = async () => {
    await copyToClipboard(EMAIL)
    setCopyState("copied ✓")
    showToast("Email copied to clipboard")
    setTimeout(() => setCopyState("tap to copy"), 2000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("submitting")
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          "bot-field": e.target["bot-field"].value,
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })
      showToast("Message sent — thanks for reaching out")
    } catch {
      setFormStatus("error")
      showToast("Something went wrong, please try again")
    }
  }

  return (
    <div className="py-10">
      <div className="pb-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          The best ways to reach me
        </h2>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-full max-w-sm lg:max-w-[49rem] flex flex-col lg:flex-row lg:items-stretch gap-5">
          <a
            href="https://www.linkedin.com/in/luyalukhele/"
            target="_blank"
            rel="noreferrer"
            className="block w-full max-w-sm lg:max-w-none lg:flex-1 rounded-[28px] p-8 shadow-e3 text-white bg-[linear-gradient(160deg,theme(colors.navy.20),theme(colors.navy.10))] transform hover:scale-[1.02] transition duration-300"
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

          <form
            name="contact"
            onSubmit={handleSubmit}
            className="w-full max-w-sm lg:max-w-none lg:flex-1 flex flex-col gap-4 bg-surface-container border border-outline rounded-[20px] shadow-e1 p-6"
          >
            <p hidden>
              <label>
                Don't fill this out:{" "}
                <input name="bot-field" tabIndex="-1" autoComplete="off" />
              </label>
            </p>

            <h3 className="font-display font-semibold text-ink-900">
              Or send a message
            </h3>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-ink-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="rounded-xl border border-outline bg-surface px-4 py-2.5 text-ink-900 focus:outline-none focus:ring-2 focus:ring-orange-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-ink-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl border border-outline bg-surface px-4 py-2.5 text-ink-900 focus:outline-none focus:ring-2 focus:ring-orange-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-ink-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="rounded-xl border border-outline bg-surface px-4 py-2.5 text-ink-900 focus:outline-none focus:ring-2 focus:ring-orange-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="mt-1 rounded-full bg-navy-20 text-white font-semibold text-sm px-6 py-3 shadow-e1 hover:bg-navy-30 transition disabled:opacity-60"
            >
              {formStatus === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-3 w-full max-w-sm lg:max-w-[49rem] bg-surface-container rounded-full pl-4 pr-5 py-3 border border-outline shadow-e1 hover:bg-surface-container-high transition"
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
        {showSnackbar && snackbarMessage}
      </div>
    </div>
  )
}
export default Contact
