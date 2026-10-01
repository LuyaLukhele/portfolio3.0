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

test("submit button shows a spinner while sending, then a sent state", async () => {
  let resolveFetch
  global.fetch = jest.fn(
    () => new Promise((resolve) => (resolveFetch = resolve))
  )
  render(<Contact />)
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "A" } })
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "a@b.co" },
  })
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "Hi" },
  })
  fireEvent.submit(screen.getByRole("form", { name: "Contact form" }))

  const sending = await screen.findByRole("button", { name: /sending/i })
  expect(sending).toBeDisabled()

  resolveFetch({ ok: true })
  expect(
    await screen.findByRole("button", { name: /message sent/i })
  ).toBeInTheDocument()
})
