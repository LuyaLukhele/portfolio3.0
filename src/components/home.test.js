import { render, screen, fireEvent } from "@testing-library/react"
import Home from "./home"

test("View projects button navigates to the Projects section (id 3)", () => {
  const onNavigate = jest.fn()
  render(<Home onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /view projects/i }))
  expect(onNavigate).toHaveBeenCalledWith(3)
})

test("Get in touch button navigates to the Contact section (id 4)", () => {
  const onNavigate = jest.fn()
  render(<Home onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /get in touch/i }))
  expect(onNavigate).toHaveBeenCalledWith(4)
})
