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

export default Skills
