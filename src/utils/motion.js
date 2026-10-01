import { useEffect, useRef, useState } from "react"

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

// Inline style for a staggered entrance: pairs with the `.stagger` class.
export const stagger = (i) => ({ "--i": i })

// Counts from 0 up to `target` once the element scrolls into view.
export function useCountUp(target, duration = 1200) {
  const ref = useRef(null)
  const canAnimate =
    typeof window !== "undefined" &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion()
  const [value, setValue] = useState(canAnimate ? 0 : target)

  useEffect(() => {
    if (!canAnimate || !ref.current) {
      setValue(target)
      return
    }
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(eased * target))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, canAnimate])

  return [ref, value]
}
