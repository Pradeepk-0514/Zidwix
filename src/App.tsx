import { Component, useCallback, useLayoutEffect, useRef, useState, lazy, Suspense, type ReactNode } from 'react'
import { NavLink, Link, Routes, Route, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger, reduced, scrollTop, scrollToTarget, useSmoothScroll } from './lib/smooth'
import { Footer } from './components/ui'
import ContactModal from './components/ContactModal'
import Home from './pages/Home'
const Solutions = lazy(() => import('./pages/Solutions')), Work = lazy(() => import('./pages/Work')), About = lazy(() => import('./pages/About')), Contact = lazy(() => import('./pages/Contact')), LegalPage = lazy(() => import('./pages/LegalPage'))

function Header({ onOpenContactModal }: { onOpenContactModal: () => void }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useLayoutEffect(() => setOpen(false), [pathname])
  const L = ({ to, children }: { to: string; children: string }) => <NavLink to={to} end className={({ isActive }) => (isActive ? 'on' : '')}>{children}</NavLink>
  return (<header><Link to="/" className="logo" aria-label="Zidwix home"><img src="/img/zidwix-logo-dark.png" alt="Zidwix" /></Link>
    <nav className={open ? 'open' : ''} aria-label="Main"><L to="/">Home</L><L to="/solutions">Solutions</L><L to="/work">Work</L><L to="/about">About</L><L to="/contact">Contact</L></nav>
    <button className="btn nav-lets-talk" type="button" onClick={onOpenContactModal}>Let’s Talk <ArrowRight className="i" /></button>
    <button id="menu" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X className="i" /> : <Menu className="i" />}</button></header>)
}

function PageReveals() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if (reduced()) return
    const main = document.querySelector('main')
    if (!main) return
    let context: gsap.Context | undefined
    const frame = requestAnimationFrame(() => {
      context = gsap.context(() => {
        const targets = main.querySelectorAll('.rv')
        if (!targets.length) return
        gsap.set(targets, { opacity: 0, y: 24 })
        ScrollTrigger.batch(targets, {
          start: 'top 94%', once: true,
          onEnter: els => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.62, stagger: 0.045, ease: 'power2.out', overwrite: true }),
        })
      }, main)
      ScrollTrigger.refresh()
    })
    return () => { cancelAnimationFrame(frame); context?.revert() }
  }, [pathname])
  return null
}

class RouteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <section className="route-state route-state--error" role="alert"><div className="eyebrow">Page unavailable</div><h2>This page didn’t load.</h2><p className="lead">Please retry. Your other Zidwix pages are still available.</p><button className="btn" onClick={() => window.location.reload()}>Retry page</button></section>
    return this.props.children
  }
}
function PageLoading() {
  return <div className="route-loading" role="status" aria-live="polite" aria-label="Loading page"><span className="route-loading__bar" /><span className="route-loading__bar" /><span className="route-loading__bar" /></div>
}

export default function App() {
  useSmoothScroll()
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const openContactModal = useCallback(() => setContactModalOpen(true), [])
  const closeContactModal = useCallback(() => setContactModalOpen(false), [])
  const { pathname, hash } = useLocation(), main = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    let anchorRaf = 0
    let attempts = 0
    if (hash) {
      const locateAnchor = () => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          scrollToTarget(target)
          if (target.classList.contains('rv')) gsap.set(target, { opacity: 1, y: 0 })
          requestAnimationFrame(() => { ScrollTrigger.refresh(); ScrollTrigger.update() })
        }
        else if (attempts++ < 60) anchorRaf = requestAnimationFrame(locateAnchor)
      }
      anchorRaf = requestAnimationFrame(locateAnchor)
    } else scrollTop()
    return () => cancelAnimationFrame(anchorRaf)
  }, [pathname, hash])
  return (<><Header onOpenContactModal={openContactModal} />{contactModalOpen && <ContactModal onClose={closeContactModal} />}<main ref={main}><RouteErrorBoundary key={pathname}><Suspense fallback={<PageLoading />}><Routes>
    <Route path="/" element={<Home />} /><Route path="/solutions" element={<Solutions />} /><Route path="/work" element={<Work />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy-policy" element={<LegalPage type="privacy" />} /><Route path="/terms-of-service" element={<LegalPage type="terms" />} /><Route path="*" element={<Home />} />
  </Routes><PageReveals key={pathname} /></Suspense></RouteErrorBoundary><Footer /></main></>)
}
