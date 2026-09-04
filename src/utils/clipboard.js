export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return Promise.resolve()
  }
  return navigator.clipboard.writeText(text).then(
    () => undefined,
    () => undefined
  )
}
