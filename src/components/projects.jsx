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
