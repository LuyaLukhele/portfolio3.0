import { useState, useRef, useLayoutEffect } from "react"
import { stagger } from "../utils/motion"
import PixelSharpPP from "../assets/pixelsharp.avif"
import PixelSharpMobilePP from "../assets/pixelsharp-mobile.avif"
import MoviePP from "../assets/movie.avif"
import Portfolio1PP from "../assets/portfolio1.avif"

const logo = (name) => `${process.env.PUBLIC_URL}/logos/${name}.svg`

export const techLogos = {
  React: logo("reactjs"),
  JavaScript: logo("javascript"),
  JQuery: logo("jquery"),
  HTML: logo("html5"),
  CSS: logo("css3"),
  Git: logo("git"),
}

const loadedImageSrcs = new Set()

// Phones get a taller crop when one is provided; the wide card on larger
// screens uses the main image.
function ProjectImage({ src, mobileSrc, alt, className }) {
  const [loaded, setLoaded] = useState(loadedImageSrcs.has(src))
  const imgRef = useRef(null)

  useLayoutEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      loadedImageSrcs.add(src)
      setLoaded(true)
    }
  }, [src])

  return (
    <div className="relative w-full">
      <div
        className={
          "absolute inset-0 bg-surface-container-high pointer-events-none transition-opacity duration-300" +
          (loaded ? " opacity-0" : " opacity-100 animate-pulse")
        }
      />
      <picture className="block">
        {mobileSrc && <source media="(min-width: 640px)" srcSet={src} />}
        <img
          ref={imgRef}
          src={mobileSrc ?? src}
          alt={alt}
          className={
            className +
            " transition-opacity duration-500 ease-out" +
            (loaded ? " opacity-100" : " opacity-0")
          }
          onLoad={() => {
            loadedImageSrcs.add(src)
            setLoaded(true)
          }}
        />
      </picture>
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

export const projects = [
  {
    title: "Pixel Sharp",
    description:
      "A site for a website-facelift studio. Its hero dissolves a dated, pixelated page tile by tile into the sharp redesign underneath.",
    image: PixelSharpPP,
    imageAlt: "Pixel Sharp live site",
    imageMobile: PixelSharpMobilePP,
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    linkLabel: "Live site",
    linkUrl: "https://pixelsharp.co.za/",
  },
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
]

function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  imageMobile,
  tech,
  linkLabel,
  linkUrl,
  index,
}) {
  return (
    <article
      className="stagger group bg-surface-container border border-outline rounded-[24px] shadow-e1 overflow-hidden mb-6 transition duration-300 [@media(hover:hover)]:hover:shadow-e3 [@media(hover:hover)]:hover:-translate-y-1"
      style={stagger(index)}
    >
      <a
        href={linkUrl}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden"
      >
        <ProjectImage
          className="w-full h-48 object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-105"
          src={image}
          mobileSrc={imageMobile}
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
          className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-outline-strong hover:bg-surface-container-high transition"
        >
          {linkLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          >
            ↗
          </span>
        </a>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <div className="py-10">
      <div className="pb-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          A few things I've shipped
        </h2>
      </div>
      {projects.map((project, i) => (
        <ProjectCard key={project.title} index={i} {...project} />
      ))}
    </div>
  )
}

export default Projects
