import { copyToClipboard } from "./clipboard"

describe("copyToClipboard", () => {
  afterEach(() => {
    delete navigator.clipboard
  })

  test("writes the given text to the clipboard", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    await copyToClipboard("lukheleluyanda@gmail.com")

    expect(writeText).toHaveBeenCalledWith("lukheleluyanda@gmail.com")
  })

  test("resolves without throwing when the clipboard API is unavailable", async () => {
    Object.assign(navigator, { clipboard: undefined })

    await expect(
      copyToClipboard("lukheleluyanda@gmail.com")
    ).resolves.toBeUndefined()
  })

  test("resolves without throwing when writeText rejects", async () => {
    const writeText = jest.fn().mockRejectedValue(new Error("denied"))
    Object.assign(navigator, { clipboard: { writeText } })

    await expect(
      copyToClipboard("lukheleluyanda@gmail.com")
    ).resolves.toBeUndefined()
  })
})
