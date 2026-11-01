import { useState } from 'react'
import { ArrowRight, Copy, Linkedin, Mail } from 'lucide-react'
import { Hero, Ico } from '../components/ui'
import ContactForm from '../components/ContactForm'

const BENEFITS = [
  ['bolt', 'Quick Response', 'We usually reply within 24 hours.'],
  ['shield', 'Your Information is Safe', 'We respect your privacy and keep your details confidential.'],
  ['users', 'Business Focused', 'We work with businesses of all sizes, from startups to established companies.'],
] as const

const EMAIL_HREF = `mailto:hello@zidwix.com?subject=${encodeURIComponent('Project enquiry for Zidwix')}&body=${encodeURIComponent('Hi Zidwix,\n\nI would like to discuss a project.\n\n')}`

export default function Contact() {
  const [copied, setCopied] = useState(false)
  return (<>
    <div className="contact-flow"><div className="contact-sticky-bg" aria-hidden="true" />
    <Hero eyebrow="Get in touch" title="Let’s build something great." lead="Have a project in mind or just want to say hello? We’d love to hear from you. Fill out the form below or reach us through our other channels." image="/img/contact-hero.webp" />
    <section className="contact-form-section"><div className="card split contact-glass" style={{ alignItems: 'start', padding: 'clamp(22px,4vw,56px)' }}>
      <div className="contact-intro"><div className="eyebrow">Your project starts here</div><h2>What can we help you build?</h2><p className="lead">Share a few details about your project. We’ll use them to understand your needs.</p>
        <div className="contact-benefit-list" aria-label="Why work with Zidwix">
          {BENEFITS.map(([icon, title, description]) => <article className="contact-benefit" key={title}>
            <span className="contact-benefit__icon" aria-hidden="true"><Ico n={icon} /></span>
            <div className="contact-benefit__copy"><h3>{title}</h3><p className="sm">{description}</p></div>
          </article>)}
        </div>
      </div>
      <ContactForm idPrefix="contact" />
    </div></section></div>
    <section className="contact-questions-wrap"><div className="contact-questions">
      <div className="contact-questions__copy"><div className="eyebrow contact-questions__eyebrow">Still have questions?</div><h2>Let’s connect,<br /><span>your way.</span></h2><p>Not ready to fill out the form? Reach out through one of our official channels. We’re happy to hear about your ideas and challenges.</p></div>
      <div className="contact-questions__channels" aria-label="Contact options">
        <div className="contact-channel"><span className="contact-channel__icon"><Mail className="i" /></span><div className="contact-channel__body"><h3>Email us</h3><p>For project enquiries and business discussions.</p><div className="contact-channel__actions"><a href={EMAIL_HREF}>hello@zidwix.com</a><button type="button" aria-label={copied ? 'Email copied' : 'Copy email'} onClick={() => { navigator.clipboard?.writeText('hello@zidwix.com'); setCopied(true) }}>{copied ? 'Copied' : <Copy className="i" />}</button></div></div><a className="contact-channel__arrow" href={EMAIL_HREF} aria-label="Email Zidwix"><ArrowRight className="i" /></a></div>
        <div className="contact-channel"><span className="contact-channel__icon"><Linkedin className="i" /></span><div className="contact-channel__body"><h3>Connect on LinkedIn</h3><p>Follow Zidwix and connect with us professionally.</p><a href="https://www.linkedin.com/company/zidwix/" target="_blank" rel="noopener noreferrer">linkedin.com/company/zidwix ↗</a></div><a className="contact-channel__arrow" href="https://www.linkedin.com/company/zidwix/" target="_blank" rel="noopener noreferrer" aria-label="Open Zidwix on LinkedIn"><ArrowRight className="i" /></a></div>
      </div>
    </div></section>
  </>)
}
