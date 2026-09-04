const logo = (name) => `${process.env.PUBLIC_URL}/logos/${name}.svg`

const skillsList = [
  { name: "Python", src: logo("python") },
  { name: "Django", src: logo("django") },
  { name: "React", src: logo("reactjs") },
  { name: "JavaScript", src: logo("javascript") },
  { name: "PostgreSQL", src: logo("postgresql") },
  { name: "MySQL", src: logo("mysql") },
  { name: "Docker", src: logo("docker") },
  { name: "Git", src: logo("git") },
  { name: "AWS", src: logo("aws") },
  { name: "VS Code", src: logo("vscode") },
  { name: "npm", src: logo("npm") },
  { name: "JSON", src: logo("json") },
]

const Logo = ({ name, src }) => (
  <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-24 sm:w-28">
    <img
      src={src}
      alt={name}
      title={name}
      loading="eager"
      width={48}
      height={48}
      className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition duration-300 hover:grayscale hover:opacity-70"
    />
    <span className="text-xs text-gray-500">{name}</span>
  </div>
)

const half = Math.ceil(skillsList.length / 2)
const rows = [skillsList.slice(0, half), skillsList.slice(half)]

const MarqueeRow = ({ items, reverse }) => (
  <div
    className="relative w-full max-w-5xl overflow-hidden"
    style={{
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
  >
    <div
      className={
        "flex w-max gap-10 sm:gap-14 " +
        (reverse ? "marquee-track-reverse" : "marquee-track")
      }
    >
      {[...items, ...items].map((skill, i) => (
        <Logo key={`${skill.name}-${i}`} {...skill} />
      ))}
    </div>
  </div>
)

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

export default Skills
