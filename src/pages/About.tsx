import { Btn, Hero, ReferenceCta, Ico } from '../components/ui'
import { Github, Linkedin, Link2 } from 'lucide-react'

const P = [['target', 'Problem First', 'We start by understanding your business, your goals and the real problem you want to solve.'], ['gear', 'Practical Solutions', 'We design solutions that are simple, scalable and easy to manage — no unnecessary complexity.'], ['users', 'Transparent Process', 'Clear scope, agreed deliverables and pricing before development begins.'], ['link', 'Long-Term Partnership', 'We stay involved through feedback, testing and support when you need it.']]
const TEAM = [
  { name: 'Pradeep K', role: 'CEO & Founder', image: '/img/pradeep.png', linkedin: 'https://www.linkedin.com/in/pradeep-k-287602293/', github: 'https://github.com/Pradeepk-0514' },
  { name: 'Darshan G', role: 'Co-Founder & Developer', image: '/img/darshan.png', linkedin: 'https://www.linkedin.com/in/darshan-g-5923b7291/', github: 'https://github.com/Darsh200618' },
]

export default function About() {
  return (<>
    <Hero eyebrow="About Zidwix" title="Technology with purpose." lead="We’re a team of creators, problem-solvers and builders. Zidwix exists to turn real business challenges into practical technology — websites, automation and data solutions that make a difference." actions={<><Btn to="/solutions">Our Solutions</Btn><Btn to="/contact" variant="ghost">Get in Touch</Btn></>} image="/img/about-hero.webp" />
    <section><div className="split about-exists-layout"><div><div className="eyebrow">Why Zidwix exists</div><h2>Technology should solve problems, not create more of them.</h2><p className="lead">We focus on what your business actually needs — not technology for the sake of technology.</p></div><img src="/img/about-why.webp" alt="A modern business workspace using practical technology and analytics" loading="lazy" decoding="async" /></div></section>
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
