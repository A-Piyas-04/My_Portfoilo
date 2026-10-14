let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToId(id, offset = 72) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.4 })
    return
  }
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
