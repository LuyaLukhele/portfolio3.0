import { render, screen, fireEvent } from "@testing-library/react"
import Contact from "./contact"

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  })
})

test("tapping the email pill copies the real address and shows confirmation", async () => {
  render(<Contact />)

  fireEvent.click(screen.getByRole("button", { name: /tap to copy/i }))

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "lukheleluyanda@gmail.com"
  )
  await screen.findByText("copied ✓")
  expect(screen.getByTestId("snackbar").className).toMatch(/opacity-100/)
  expect(screen.getByTestId("snackbar")).toHaveTextContent(
    "Email copied to clipboard"
  )
})

test("LinkedIn card links to the real profile", () => {
  render(<Contact />)
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/luyalukhele/"
  )
})
