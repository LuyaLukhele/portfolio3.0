import { render, screen, fireEvent, waitFor } from "@testing-library/react"
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
  await waitFor(() =>
    expect(screen.getByText("copied ✓")).toBeInTheDocument()
  )
  expect(screen.getByTestId("snackbar").className).toMatch(/opacity-100/)
})

test("LinkedIn card links to the real profile", () => {
  render(<Contact />)
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/luyalukhele/"
  )
})
