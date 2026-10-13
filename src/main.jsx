import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, ChevronDown, Menu, MoveUpRight, X } from 'lucide-react'
import './styles.css'

const navItems = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/about', label: 'About', index: '02' },
  { href: '/work', label: 'Work', index: '03' },
  { href: '/contact', label: 'Contact', index: '04' },
]

const projects = [
  { title: 'Northstar OS', type: 'Operations platform', year: '2024', color: 'violet', number: '01' },
  { title: 'Morrow Health', type: 'Digital product', year: '2024', color: 'cyan', number: '02' },
  { title: 'Linework', type: 'Brand system', year: '2023', color: 'pink', number: '03' },
  { title: 'Atlas Finance', type: 'Data intelligence', year: '2023', color: 'blue', number: '04' },
]

const services = [
  { number: '01', title: 'Strategy & Direction', body: 'Positioning, product narratives, and the decisions that bring teams into focus.' },
  { number: '02', title: 'Digital Products', body: 'Useful interfaces, thoughtful systems, and web experiences people return to.' },
  { number: '03', title: 'Brand Systems', body: 'Identities that move beyond a logo and give every touchpoint a clear role.' },
  { number: '04', title: 'Intelligent Systems', body: 'Automation and AI that reduce friction without losing the human signal.' },
]

function updateMeta(title, description) {
  document.title = title
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', description)
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible') })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  })
}

function Logo({ inverse = false }) {
  return <a className={`logo ${inverse ? 'logo-inverse' : ''}`} href="/" aria-label="ZidWix home"><span className="logo-mark">Z<span>/</span>X</span><span className="logo-word">ZIDWIX</span></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const path = window.location.pathname
  return <header className="site-header">
    <div className="header-inner">
      <Logo inverse />
      <nav className={`primary-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} className={path === item.href ? 'active' : ''} href={item.href} onClick={() => setOpen(false)}><span>{item.index}</span>{item.label}</a>)}
      </nav>
      <a className="header-cta" href="/contact">Start a conversation <ArrowUpRight size={15} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
  </header>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><Logo /><p className="footer-note">AI automation & business technology<br />for people with better questions.</p></div><div className="footer-links"><div><span className="footer-label">Explore</span><a href="/about">About</a><a href="/work">Work</a><a href="/contact">Contact</a></div><div><span className="footer-label">Follow</span><a href="#">Instagram <MoveUpRight size={12} /></a><a href="#">LinkedIn <MoveUpRight size={12} /></a></div></div></div>
    <div className="footer-bottom"><span>© 2024 ZidWix Studio</span><span>Made for the next useful thing.</span></div>
  </footer>
}

function Button({ children, href = '/contact', secondary = false }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>{children}<ArrowUpRight size={16} /></a>
}

function Orb({ variant = 'violet', small = false }) {
  return <div className={`orb orb-${variant} ${small ? 'orb-small' : ''}`}><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-core" /><i className="orb-spark spark-one" /><i className="orb-spark spark-two" /><i className="orb-spark spark-three" /></div>
}

function DarkIntro({ eyebrow, title, children, image = false }) {
  return <section className="dark-intro"><div className="container dark-intro-grid"><div><span className="eyebrow eyebrow-light">{eyebrow}</span><h1 className="page-title" dangerouslySetInnerHTML={{ __html: title }} />{children}</div>{image && <div className="intro-art"><Orb variant="violet" /><span className="art-label">ZIDWIX / 04</span></div>}</div></section>
}

function Home() {
  updateMeta('ZidWix — Creative Technology Studio', 'ZidWix builds intelligent systems, digital products, and brands for businesses ready to move with intention.')
  return <><Header /><main>
    <section className="hero dark-surface"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow eyebrow-light">01 / Home</span><h1>Building <em>intelligent</em><br />business systems<span className="dot">.</span></h1><p>We connect AI, automation, software, and data to help businesses work smarter — and make better decisions.</p><div className="hero-actions"><Button>Explore what we do</Button><Button secondary href="/work">See our work</Button></div></div><div className="hero-art"><div className="hero-art-caption"><span>Systems / Design / Direction</span><span>01—04</span></div><Orb variant="violet" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-scanline" /><span className="floating-label label-a">AI agents</span><span className="floating-label label-b">Automation</span><span className="floating-label label-c">Business</span></div></div><div className="hero-scroll">Scroll to explore <ChevronDown size={16} /></div></section>
    <section className="paper-section intro-section"><div className="container two-col"><div><span className="eyebrow">The real problem</span><h2>Businesses don’t have one problem.<br /><strong>They have a chain of them.</strong></h2></div><div className="intro-text"><p className="lead">Complexity compounds. We help you see the whole system — then build the parts that make it work better.</p><a className="text-link" href="/about">Meet ZidWix <ArrowUpRight size={15} /></a></div></div><div className="container friction-grid">{['Manual', 'Disconnected', 'Slow', 'Blind', 'Complex'].map((item, i) => <div className="friction-card" key={item} data-reveal><span className="friction-icon">{['↗', '↔', '◌', '◉', '⌘'][i]}</span><h3>{item}</h3><p>{['Too much repetitive work.', 'Tools don’t communicate.', 'Processes depend on people.', 'Data exists, but is trapped.', 'Too many systems. Too little clarity.'][i]}</p></div>)}</div></section>
    <section className="systems-section paper-section"><div className="container section-heading"><div><span className="eyebrow">What we build</span><h2>So we build the system<br /><strong>behind the business.</strong></h2></div><p>From first principle to final interface, we make the moving pieces make sense.</p></div><div className="container service-grid">{services.map((service) => <article className="service-card" key={service.number} data-reveal><span className="card-index">{service.number}</span><div className="service-icon"><span /></div><h3>{service.title}</h3><p>{service.body}</p><a href="/contact" className="card-link">Learn more <ArrowUpRight size={14} /></a></article>)}</div></section>
    <section className="dark-band process-section"><div className="container"><div className="section-heading section-heading-light"><div><span className="eyebrow eyebrow-light">How we work</span><h2>Good work is a system,<br /><strong>not a sprint.</strong></h2></div><p>Clear thinking. Practical making. Less theatre.</p></div><div className="process-grid">{['Understand', 'Design', 'Build', 'Connect', 'Automate', 'Improve'].map((item, i) => <div className={`process-step step-${i + 1}`} key={item} data-reveal><span>{String(i + 1).padStart(2, '0')}</span><b>{item}</b></div>)}</div></div></section>
    <section className="paper-section work-preview"><div className="container section-heading"><div><span className="eyebrow">Selected work</span><h2>Systems we’ve<br /><strong>built.</strong></h2></div><a className="text-link" href="/work">View all work <ArrowUpRight size={15} /></a></div><div className="container project-grid">{projects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.title} />)}</div></section>
    <section className="lab-band dark-surface"><div className="container lab-content"><div><span className="eyebrow eyebrow-light">ZidWix Lab</span><h2>We test what’s<br /><em>possible.</em></h2><p>Small experiments. Useful futures. No jargon required.</p><Button href="/work">Explore the lab</Button></div><div className="lab-window"><div className="window-top"><span>● ● ●</span><span>zidwix / lab</span></div><div className="window-body"><div className="window-pulse" /><div className="window-orb"><Orb variant="cyan" small /></div><div><span>EXPERIMENT 04</span><strong>Signal / Noise</strong><small>Decision support system</small></div></div></div></div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">Start a conversation</span><h2>Have a problem<br /><strong>worth solving?</strong></h2><p>Tell us what’s happening. We’ll figure out what can be built.</p></div><Button>Let’s talk</Button><div className="cta-orb"><Orb variant="pink" small /></div></div></section>
  </main><Footer /></>
}

function ProjectCard({ project, featured = false }) { return <a className={`project-card project-${project.color} ${featured ? 'featured' : ''}`} href="/work" data-reveal><div className="project-visual"><span className="project-number">{project.number}</span><div className="project-shape"><div /><div /><div /></div><span className="project-arrow"><ArrowUpRight size={18} /></span></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.type}</p></div><span>{project.year}</span></div></a> }

function About() { updateMeta('About — ZidWix', 'ZidWix is a creative technology studio for teams building a more useful future.'); return <><Header /><main><DarkIntro eyebrow="02 / About" title={'We didn’t start with <em>technology.</em><br />We started with a way<br />of looking at problems.'} image /><section className="paper-section about-story"><div className="container about-grid"><div><span className="eyebrow">Why ZidWix exists</span><h2>Make the complex<br /><strong>useful again.</strong></h2></div><div><p className="lead">ZidWix exists for the teams who know there is a better way — but need a clear system to find it.</p><p>We bring strategy, design, and intelligent technology into the same room. Not to make more noise, but to create the clarity that lets good businesses move.</p><a className="text-link" href="/contact">Work with us <ArrowUpRight size={15} /></a></div></div></section><section className="paper-section approach-section"><div className="container section-heading"><div><span className="eyebrow">Our approach</span><h2>Thoughtful.<br /><strong>Practical. Lasting.</strong></h2></div><p>We keep asking the useful question: what should be easier after we’re done?</p></div><div className="container values-grid">{['Start with the problem', 'Make the invisible visible', 'Build for the next step'].map((item, i) => <article key={item} data-reveal><span>0{i + 1}</span><h3>{item}</h3><p>{['The most effective solution is usually hiding inside the real tension.', 'Maps, models, prototypes — we turn ambiguity into something you can hold.', 'A good system creates momentum, not dependency.'][i]}</p></article>)}</div></section><section className="image-band"><div className="container image-band-inner"><div className="reference-frame"><img src="/zidwix-theme.jpeg" alt="ZidWix visual system reference board" /></div><div><span className="eyebrow eyebrow-light">A living system</span><h2>Not just a website.<br /><em>A way of working.</em></h2><p>Every project becomes a small operating system for better decisions.</p></div></div></section></main><Footer /></> }

function Work() { updateMeta('Work — ZidWix', 'Selected ZidWix work across AI systems, digital products, and brand experiences.'); return <><Header /><main><DarkIntro eyebrow="03 / Work" title={'Real projects.<br /><em>Practical solutions.</em>'}><p className="intro-support">From AI agents to business systems, we build what matters.</p></DarkIntro><section className="paper-section work-page"><div className="container work-intro"><span className="eyebrow">Selected case studies</span><h2>Useful things,<br /><strong>beautifully made.</strong></h2><p>We partner with ambitious teams to turn hard problems into clear, useful experiences.</p></div><div className="container work-grid">{projects.map((project, i) => <ProjectCard project={project} featured={i === 0} key={project.title} />)}</div></section><section className="lab-band dark-surface"><div className="container lab-content"><div><span className="eyebrow eyebrow-light">Try our experiments</span><h2>Ideas are better<br /><em>when tested.</em></h2><p>See what we’re building in the ZidWix Lab.</p></div><Button href="/contact">Start a conversation</Button></div></section></main><Footer /></> }

function Contact() { updateMeta('Contact — ZidWix', 'Start a conversation with ZidWix about your next intelligent business system.'); const [sent, setSent] = useState(false); return <><Header /><main><DarkIntro eyebrow="04 / Start a conversation" title={'Have a problem<br /><em>worth solving?</em>'}><p className="intro-support">Tell us what’s happening. We’ll figure out what can be built.</p></DarkIntro><section className="paper-section contact-section"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow">Get in touch</span><h2>Let’s make<br /><strong>something useful.</strong></h2><p>Tell us a little about the problem you’re trying to solve. We’ll reply within two working days.</p><div className="direct-contact"><a href="mailto:hello@zidwix.studio">hello@zidwix.studio <ArrowUpRight size={14} /></a><a href="tel:+919876543210">+91 98765 43210 <ArrowUpRight size={14} /></a><span>New Delhi, India</span></div></div><form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>{sent ? <div className="form-success"><span>✦</span><h3>Message received.</h3><p>We’ll be in touch soon. Until then, keep asking better questions.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Send another <ArrowUpRight size={14} /></button></div> : <><label>What are you looking to build?<select defaultValue=""><option value="" disabled>Select an option</option><option>Brand system</option><option>Digital product</option><option>AI & automation</option><option>Something else</option></select></label><label>What problem are you trying to solve?<textarea required placeholder="A few sentences is perfect." rows="4" /></label><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@company.com" /></label></div><button className="button" type="submit">Send message <ArrowUpRight size={16} /></button></>}</form></div></section></main><Footer /></> }

function App() { useReveal(); const path = window.location.pathname.replace(/\/$/, '') || '/'; const Page = useMemo(() => ({ '/': Home, '/about': About, '/work': Work, '/contact': Contact }[path] || Home), [path]); return <Page /> }

createRoot(document.getElementById('root')).render(<App />)
