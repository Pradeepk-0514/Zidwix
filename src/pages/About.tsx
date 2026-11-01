import { useState, type ReactNode } from 'react'
import { Btn, Hero, ReferenceCta, Ico } from '../components/ui'
import { Github, Linkedin, Link2 } from 'lucide-react'

const P = [['target', 'Problem First', 'We start by understanding your business, your goals and the real problem you want to solve.'], ['gear', 'Practical Solutions', 'We design solutions that are simple, scalable and easy to manage — no unnecessary complexity.'], ['users', 'Transparent Process', 'Clear scope, agreed deliverables and pricing before development begins.'], ['link', 'Long-Term Partnership', 'We stay involved through feedback, testing and support when you need it.']]
const TEAM = [
  { name: 'Pradeep K', role: 'CEO & Founder', image: '/img/pradeep.png', linkedin: 'https://www.linkedin.com/in/pradeep-k-287602293/', github: 'https://github.com/Pradeepk-0514' },
  { name: 'Darshan G', role: 'Co-Founder & Developer', image: '/img/darshan.png', linkedin: 'https://www.linkedin.com/in/darshan-g-5923b7291/', github: 'https://github.com/Darsh200618' },
]

function PurposeCard({ variant, eyebrow, title, image, children }: { variant: 'vision' | 'mission'; eyebrow: string; title: string; image: string; children: ReactNode }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <button type="button" className={`purpose-card purpose-card--${variant}${revealed ? ' is-revealed' : ''}`} aria-pressed={revealed} onClick={() => setRevealed(value => !value)}>
      <span className="purpose-card__front" aria-hidden={revealed}>
        <img className="purpose-card__cover" src={image} alt="" aria-hidden="true" />
        <span className="purpose-card__grid" aria-hidden="true" />
        <span className="purpose-card__nodes" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        <span className="purpose-card__front-copy"><span className="purpose-card__eyebrow">{eyebrow}</span><strong>{title}</strong></span>
      </span>
      <span className="purpose-card__back" aria-hidden={!revealed}>
        <span className="purpose-card__eyebrow">{eyebrow}</span>
        <strong>{title}</strong>
        <span className="purpose-card__rule" aria-hidden="true" />
        <span className="purpose-card__copy">{children}</span>
      </span>
    </button>
  )
}

export default function About() {
  return (<>
    <Hero eyebrow="About Zidwix" title="Technology with purpose." lead="We’re a team of creators, problem-solvers and builders. Zidwix exists to turn real business challenges into practical technology — websites, automation and data solutions that make a difference." actions={<><Btn to="/solutions">Our Solutions</Btn><Btn to="/contact" variant="ghost">Get in Touch</Btn></>} image="/img/about-hero.webp" />
    <section className="purpose-section"><div className="purpose-section__heading"><div className="eyebrow">Why Zidwix exists</div><h2>Two commitments guide everything we build.</h2></div><div className="purpose-grid"><PurposeCard variant="vision" eyebrow="OUR DECISION" title="Our Vision" image="/img/s1-hd.webp">A future where technology moves every business forward. To become a trusted technology partner, making businesses smarter, more efficient, and ready for the future.</PurposeCard><PurposeCard variant="mission" eyebrow="OUR PURPOSE" title="Our Mission" image="/img/s2-hd.webp">Turning business challenges into practical technology solutions. We build digital products, intelligent automation, and data-driven solutions that simplify operations and create meaningful business impact.</PurposeCard></div></section>
    <section><div className="eyebrow">Our philosophy</div><h2>Built on practical thinking.</h2><p className="lead" style={{ marginBottom: 34 }}>We believe in simple ideas, clear processes and technology that actually works for your business.</p>
      <div className="grid c4">{P.map(([icon, title, description]) => <div className="rv" key={title}>{icon === 'link' ? <span className="ico"><Link2 className="i" /></span> : <Ico n={icon} />}<h3>{title}</h3><p className="sm" style={{ marginTop: 8 }}>{description}</p></div>)}</div></section>
    <section><div className="split about-team-layout"><div><div className="eyebrow">The minds behind Zidwix</div><h2>A small team with big ideas.</h2><p className="lead">We’re a focused team of developers and problem-solvers, passionate about building technology that helps businesses grow.</p><Btn to="/contact">Meet Our Team</Btn></div>
      <div className="grid about-team-grid">{TEAM.map(member => <article className="card person rv" key={member.name}>
        <img className="person__portrait" src={member.image} alt={member.name} loading="lazy" decoding="async" />
        <div className="person__details"><h3>{member.name}</h3><p className="sm">{member.role}</p>
          <nav className="person__social" aria-label={`${member.name} social profiles`}>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin aria-hidden="true" /><span>LinkedIn</span></a>
            <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`}><Github aria-hidden="true" /><span>GitHub</span></a>
          </nav>
        </div>
      </article>)}</div></div></section>
    <ReferenceCta />
  </>)
}
