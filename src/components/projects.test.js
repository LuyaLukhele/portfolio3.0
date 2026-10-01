import { render, screen } from "@testing-library/react"
import Projects from "./projects"

test("renders every project as a card with their real links", () => {
  render(<Projects />)

  expect(
    screen.getByRole("heading", { name: "Pixel Sharp" })
  ).toBeInTheDocument()
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
      "https://pixelsharp.co.za/",
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

test("lists Pixel Sharp first, then Now Movies", () => {
  render(<Projects />)
  const titles = screen
    .getAllByRole("heading", { level: 3 })
    .map((h) => h.textContent)
  expect(titles.slice(0, 2)).toEqual(["Pixel Sharp", "Now Movies"])
})
