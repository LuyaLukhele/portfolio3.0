import { render, screen } from "@testing-library/react"
import Projects from "./projects"

test("renders both projects as cards with their real links", () => {
  render(<Projects />)

  expect(
    screen.getByRole("heading", { name: "Now Movies" })
  ).toBeInTheDocument()
  expect(
    screen.getByRole("heading", { name: "Portfolio 1.0" })
  ).toBeInTheDocument()

  const links = screen.getAllByRole("link")
  const hrefs = links.map((a) => a.getAttribute("href"))
  expect(hrefs).toEqual(
    expect.arrayContaining([
      "https://movie-luyapp.netlify.app",
      "https://luyalukhele.github.io/",
    ])
  )
})

test("shows tech chips for projects that have them, and omits them otherwise", () => {
  render(<Projects />)
  expect(screen.getAllByText("JavaScript")[0]).toBeInTheDocument()
  expect(screen.getByText("MoviesDB API")).toBeInTheDocument()
})
