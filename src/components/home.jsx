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

      <div className="relative isolate mx-auto lg:mx-0 shrink-0 w-fit">
        <div className="absolute inset-0 translate-x-6 translate-y-6 bg-orange-50 rounded-[28px_28px_28px_8px] -z-10" />
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
