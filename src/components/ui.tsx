import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Cpu, BarChart3, Zap, ShieldCheck, Users, Target, Settings, Linkedin, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Stage from './Stage'
import type { Kind } from './Scene'
import { img, WHY, SV, type Project } from '../data'
export const ICONS: Record<string, LucideIcon> = { code: Code2, cpu: Cpu, chart: BarChart3, bolt: Zap, shield: ShieldCheck, users: Users, target: Target, gear: Settings }
export const Ico = ({ n, plain }: { n: string; plain?: boolean }) => { const I = ICONS[n] ?? Settings; return plain ? <I className="i" /> : <span className="ico"><I className="i" /></span> }
export const Btn = ({ to, children, variant = '' }: { to: string; children: ReactNode; variant?: string }) => (<Link className={`btn ${variant}`} to={to}>{children} <ArrowRight className="i" /></Link>)
export const Hero = ({ eyebrow, title, lead, actions, kind = 'cubes', extra, image }: { eyebrow: string; title: ReactNode; lead: string; actions?: ReactNode; kind?: Kind; extra?: ReactNode; image?: string }) => (
  <section className={`hero${image ? ' hero--image' : ''}`} style={image ? { backgroundImage: `linear-gradient(90deg,rgba(10,13,18,.78),rgba(10,13,18,.5) 52%,rgba(10,13,18,.25)),linear-gradient(0deg,rgba(10,13,18,.34),transparent 58%),url(${image})` } : undefined}>
    <div className="hero__content"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead">{lead}</p><div className="row">{actions}</div>{extra}</div>
    {!image && <Stage kind={kind} />}
  </section>)
export const ReferenceCta = () => (
  <section className="ctaw"><div className="cta cta--reference">
    <div className="cta__content"><div className="eyebrow">Have an idea? Let’s build it.</div><h2>Let’s build something that <span className="cta-word">moves</span> your business forward.</h2><p>Tell us what’s holding your business back. We’ll explore the problem with you and identify a practical next step.</p><Btn to="/contact" variant="light">Be a Part of us</Btn></div></div></section>)
export const Why = () => (<section className="why-section"><div className="why-layout"><div className="why-intro"><div className="eyebrow">Why Zidwix</div><h2>Technology should solve problems, not create more of them.</h2><p className="lead">We focus on what your business actually needs — not technology for the sake of technology.</p></div>
    <div className="why-grid">{WHY.map((w, i) => <article className="why-card" key={w.t}><div className="why-card__top"><span className="why-card__number">0{i + 1}</span><Ico n={w.icon} plain /></div><h3>{w.t}</h3><p>{w.d}</p><span className="why-card__corner" aria-hidden="true" /></article>)}</div></div></section>)
export const Proj = ({ p, i }: { p: Project; i: number }) => (<article className="card proj rv"><div className="th"><img src={img(`${p.img}-hd`)} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = img(p.img) }} alt={p.title} loading="lazy" decoding="async" /></div><div className="eyebrow" style={{ marginBottom: 6 }}>0{i + 1} / {p.cat}</div><h3>{p.title}</h3><p className="sm" style={{ marginTop: 6 }}>{p.desc}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></article>)
export const Footer = () => {
  const footer = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const node = footer.current
    if (!node) return
    if (!('IntersectionObserver' in window)) { setRevealed(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); observer.disconnect() }
    }, { rootMargin: '0px 0px 10% 0px', threshold: 0.04 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (<footer ref={footer} className={revealed ? 'is-revealed' : ''}>
  <div className="fg">
    <div className="footer-brand">
      <Link to="/" className="logo footer-logo" aria-label="Zidwix home"><img src="/img/zidwix-logo-light.png" alt="Zidwix" /></Link>
      <p className="footer-tagline">AI AUTOMATION &amp; BUSINESS TECHNOLOGY</p>
      <p className="footer-description">Building practical technology for real business challenges.</p>
    </div>
    <div className="footer-column"><h4>EXPLORE</h4><Link to="/">Home</Link><Link to="/solutions">Solutions</Link><Link to="/about">About</Link><Link to="/work">Work</Link><Link to="/contact">Contact</Link></div>
    <div className="footer-column"><h4>SOLUTIONS</h4>{SV.map(service => <Link key={service.slug} to={`/solutions#${service.slug}`}>{service.title}</Link>)}</div>
    <div className="footer-connect">
      <h4>LET’S TALK</h4>
      <p>Have a challenge to solve? Tell us what you’re working on.</p>
      <Link className="footer-contact-link" to="/contact">Contact Zidwix <ArrowRight className="i" /></Link>
      <a className="footer-social" href="https://www.linkedin.com/company/zidwix/" target="_blank" rel="noreferrer" aria-label="Zidwix on LinkedIn"><Linkedin className="i" /><span>LinkedIn</span><span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div className="fb"><span>© {new Date().getFullYear()} Zidwix. All rights reserved.</span><nav className="footer-legal-links" aria-label="Legal"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-of-service">Terms of Service</Link></nav></div>
	</footer>)
}
