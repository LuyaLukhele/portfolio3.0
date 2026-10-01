import { useEffect, useRef, useState } from "react"
import Me from "../assets/LuyandaShirtPP.avif"
import { prefersReducedMotion, stagger } from "../utils/motion"

const ROLES = ["Software Engineer", "Back-End Developer", "Front-End Developer"]
const MAX_TILT = 6

const Home = ({ onNavigate }) => {
  const [roleIndex, setRoleIndex] = useState(0)
  const tiltRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      3200
    )
    return () => clearInterval(id)
  }, [])

  function handlePointerMove(e) {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return
    const el = tiltRef.current
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty("--rx", `${(-y * MAX_TILT).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${(x * MAX_TILT).toFixed(2)}deg`)
  }

  function resetTilt() {
    tiltRef.current.style.setProperty("--rx", "0deg")
    tiltRef.current.style.setProperty("--ry", "0deg")
  }

  return (
    <div className="relative isolate flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="blob absolute -top-10 right-0 h-64 w-64 rounded-full bg-orange-60/30 blur-3xl" />
        <div
          className="blob absolute bottom-0 left-0 h-56 w-56 rounded-full bg-navy-40/20 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1
          aria-label="Software Engineer"
          className="font-display font-semibold tracking-tight text-4xl lg:text-5xl text-ink-900"
        >
          <span key={roleIndex} className="word-in" aria-hidden="true">
            {ROLES[roleIndex]}
          </span>
          <span className="blink text-orange-50" aria-hidden="true">
            .
          </span>
        </h1>
        <p
          className="stagger mt-4 max-w-md text-ink-700 leading-relaxed"
          style={stagger(1)}
        >
          I design and maintain web applications across the{" "}
          <span className="text-orange-50 font-semibold">front-end</span>,{" "}
          <span className="text-orange-50 font-semibold">back-end</span>, APIs,
          and the databases that hold it together.
        </p>
        <div
          className="stagger mt-7 flex flex-wrap justify-center lg:justify-start gap-3"
          style={stagger(2)}
        >
          <button
            type="button"
            onClick={() => onNavigate(3)}
            className="rounded-full bg-navy-20 text-white font-semibold text-sm px-6 py-3 shadow-e1 hover:bg-navy-30 hover:-translate-y-0.5 hover:shadow-e2 transition"
          >
            View projects
          </button>
          <button
            type="button"
            onClick={() => onNavigate(4)}
            className="rounded-full border border-outline-strong text-ink-900 font-semibold text-sm px-6 py-3 hover:bg-surface-container-high hover:-translate-y-0.5 transition"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div
        ref={tiltRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="tilt relative isolate shrink-0 w-fit"
      >
        <div className="hero-offset absolute inset-0 bg-orange-50 rounded-[28px_28px_28px_8px] -z-10" />
        <img
          alt="Luyanda Lukhele"
          className="relative block h-64 aspect-[4/5] rounded-[28px_28px_28px_8px] shadow-e3 object-cover bg-surface-container-high"
          src={Me}
        />
      </div>
    </div>
  )
}

export default Home
