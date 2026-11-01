import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
let lenis: Lenis | null = null
export const scrollTop = () => (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0))
export const refreshSmoothScroll = () => {
  lenis?.resize()
  ScrollTrigger.refresh()
}
export function stopSmoothScroll() {
  lenis?.stop()
}
export function resumeSmoothScroll() {
  lenis?.start()
}
export const scrollToTarget = (target: HTMLElement) => {
  const top = target.getBoundingClientRect().top + window.scrollY - 80
  if (lenis) lenis.scrollTo(top, { immediate: true })
  // Native positioning is a reliable fallback for route/hash navigation through lazy-loaded pages.
  window.scrollTo(0, top)
  ScrollTrigger.update()
}
// One Lenis instance, driven by GSAP's ticker (no second rAF loop).
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const l = new Lenis({ lerp: 0.22, smoothWheel: true, syncTouch: false, wheelMultiplier: 1, autoResize: true })
    lenis = l
    l.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => l.resize()) : null
    resizeObserver?.observe(document.documentElement)
    resizeObserver?.observe(document.body)
    return () => { resizeObserver?.disconnect(); gsap.ticker.remove(tick); l.destroy(); lenis = null }
  }, [])
}
export { gsap, ScrollTrigger }
