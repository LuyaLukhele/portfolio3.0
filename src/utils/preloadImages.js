import Me from "../assets/LuyandaShirtPP.avif"
import { projects, techLogos } from "../components/projects"
import { skillGroups } from "../components/skills"

export const preloadSrcs = [
  Me,
  ...projects.map((project) => project.image),
  ...Object.values(techLogos),
  ...skillGroups.flatMap((group) => group.skills.map((skill) => skill.src)),
]

export function preloadImages() {
  preloadSrcs.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
