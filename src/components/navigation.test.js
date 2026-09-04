import { render, screen, fireEvent } from "@testing-library/react"
import Nav from "./navigation"

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } })
  window.scrollY = 0
})

test("shows Home content by default with the home section title", () => {
  render(<Nav />)
  expect(screen.getByText("// home")).toBeInTheDocument()
  expect(
    screen.getByText(/I build software across the stack/i)
  ).toBeInTheDocument()
})

test("switches section and title when a rail item is clicked", () => {
  render(<Nav />)
  // Both the desktop rail and the mobile bottom nav render a "Projects"
  // button with the same accessible name; click the first (desktop rail).
  const [projectsButton] = screen.getAllByRole("button", { name: /projects/i })
  fireEvent.click(projectsButton)
  // Both the header and the section component display "// projects"
  // Check for the section-specific title that only appears in Projects
  expect(screen.getByText("A couple of things I've shipped")).toBeInTheDocument()
})

test("marks the active rail item with aria-current", () => {
  render(<Nav />)
  const homeButtons = screen.getAllByRole("button", { name: /^home$/i })
  expect(homeButtons[0]).toHaveAttribute("aria-current", "page")
  const [aboutButton] = screen.getAllByRole("button", { name: /about/i })
  fireEvent.click(aboutButton)
  expect(homeButtons[0]).not.toHaveAttribute("aria-current")
})

test("top bar border toggles on scroll", () => {
  render(<Nav />)
  const header = screen.getByTestId("section-header")
  expect(header.className).not.toMatch(/border-outline\b/)
  window.scrollY = 10
  fireEvent.scroll(window)
  expect(header.className).toMatch(/border-outline\b/)
})

test("copy-email icon in the top bar copies the real address", () => {
  render(<Nav />)
  fireEvent.click(screen.getByTitle("Copy email"))
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "lukheleluyanda@gmail.com"
  )
})

test("LinkedIn quick link points at the real profile", () => {
  render(<Nav />)
  expect(screen.getByTitle("LinkedIn")).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/luyalukhele/"
  )
})
