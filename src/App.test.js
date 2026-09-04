import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders the portfolio nav and defaults to the Home section", () => {
  render(<App />)
  const navs = screen.getAllByRole("navigation", { name: /primary/i })
  expect(navs.length).toBeGreaterThan(0)
  expect(screen.getByText("// home")).toBeInTheDocument()
  expect(
    screen.getByText(/I build software across the stack/i)
  ).toBeInTheDocument()
})
