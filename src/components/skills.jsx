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

const Logo = ({ name, src }) => (
  <div className="flex items-center gap-2.5 bg-surface border border-outline rounded-full pl-2.5 pr-4 py-2">
    <img
      src={src}
      alt={name}
      title={name}
      loading="eager"
      width={24}
      height={24}
      className="h-6 w-6 object-contain shrink-0"
    />
    <span className="text-sm font-medium text-ink-900">{name}</span>
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
      <div className="bg-surface-container border border-outline rounded-[20px] shadow-e1 p-6 flex flex-col gap-6">
        {skillGroups.map(({ title, skills }) => (
          <div key={title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              {title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Logo key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
