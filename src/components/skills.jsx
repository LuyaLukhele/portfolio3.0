import { stagger } from "../utils/motion"

const logo = (name) => `${process.env.PUBLIC_URL}/logos/${name}.svg`

export const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "Java", src: logo("java") },
      { name: "Python", src: logo("python") },
      { name: "JavaScript", src: logo("javascript") },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Spring Boot", src: logo("springboot") },
      { name: "Django", src: logo("django") },
      { name: "React", src: logo("reactjs") },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", src: logo("postgresql") },
      { name: "MySQL", src: logo("mysql") },
      { name: "SQL Server", src: logo("sqlserver") },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Docker", src: logo("docker") },
      { name: "Git", src: logo("git") },
      { name: "AWS", src: logo("aws") },
      { name: "Heroku", src: logo("heroku") },
      { name: "VS Code", src: logo("vscode") },
    ],
  },
]

const Logo = ({ name, src, index }) => (
  <div
    className="pop group flex items-center gap-2.5 bg-surface border border-outline rounded-full pl-2.5 pr-4 py-2 transition duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-orange-60 [@media(hover:hover)]:hover:shadow-e1"
    style={stagger(index)}
  >
    <img
      src={src}
      alt={name}
      title={name}
      loading="eager"
      width={24}
      height={24}
      className="h-6 w-6 object-contain shrink-0 transition duration-300 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
    />
    <span className="text-sm font-medium text-ink-900">{name}</span>
  </div>
)

const allSkills = skillGroups.flatMap((group) => group.skills)

// Each group starts popping in a beat after the previous one finishes.
const groupOffsets = skillGroups.reduce(
  (offsets, group, i) => [
    ...offsets,
    i === 0 ? 0 : offsets[i - 1] + skillGroups[i - 1].skills.length + 2,
  ],
  []
)

const Marquee = () => (
  <div aria-hidden="true" className="marquee overflow-hidden mb-5">
    <div className="marquee-track flex w-max py-2">
      {[...allSkills, ...allSkills].map(({ name, src }, i) => (
        <img
          key={`${name}-${i}`}
          src={src}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 mr-8 object-contain opacity-80"
        />
      ))}
    </div>
  </div>
)

const Skills = () => {
  return (
    <section className="py-10">
      <div className="pb-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          Languages, frameworks, and tools
        </h2>
      </div>
      <Marquee />
      <div className="bg-surface-container border border-outline rounded-[20px] shadow-e1 p-6 flex flex-col gap-6">
        {skillGroups.map(({ title, skills }, g) => (
          <div key={title}>
            <h3
              className="stagger text-xs font-semibold uppercase tracking-wide text-ink-500"
              style={stagger(groupOffsets[g] * 0.6)}
            >
              {title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <Logo
                  key={skill.name}
                  index={groupOffsets[g] + i + 1}
                  {...skill}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
