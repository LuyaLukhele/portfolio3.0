import { render, screen, fireEvent } from "@testing-library/react"
import About from "./about"

test("Get in touch banner button navigates to the Contact section (id 4)", () => {
  const onNavigate = jest.fn()
  render(<About onNavigate={onNavigate} />)
  fireEvent.click(screen.getByRole("button", { name: /get in touch/i }))
  expect(onNavigate).toHaveBeenCalledWith(4)
})
