import { useState, type FormEvent } from 'react'
import { ArrowRight, Send } from 'lucide-react'

const NEED = ['Digital Products & Software', 'AI & Business Automation', 'Data & Intelligence', 'Not sure yet — help me decide']
const BUDGET = ['Under ₹10,000', '₹10,000 – ₹25,000', '₹25,000+', 'Not sure yet']

type ContactFormProps = {
  idPrefix: string
  className?: string
}

function Radios({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="rad">
      {options.map((option, index) => (
        <label key={option}>
          <input type="radio" name={name} value={option} defaultChecked={index === 0} />
          {option}
        </label>
      ))}
    </div>
  )
}

export default function ContactForm({ idPrefix, className = '' }: ContactFormProps) {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [invalid, setInvalid] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [draftHref, setDraftHref] = useState('')
  const ids = {
    name: `${idPrefix}-full-name`,
    email: `${idPrefix}-business-email`,
    company: `${idPrefix}-company`,
    message: `${idPrefix}-project-message`,
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const errors = {
      name: !values.name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(values.email.trim()),
      message: !values.message.trim(),
    }
    setInvalid(errors)
    if (Object.values(errors).some(Boolean)) return

    const formData = new FormData(form)
    const company = String(formData.get(ids.company) ?? '').trim()
    const need = String(formData.get(`${idPrefix}-need`) ?? 'Not selected')
    const budget = String(formData.get(`${idPrefix}-budget`) ?? 'Not specified')
    const subject = `Website enquiry from ${values.name.trim()}`
    const body = [
      'New enquiry from the Zidwix website',
      '',
      `Name: ${values.name.trim()}`,
      `Business email: ${values.email.trim()}`,
      ...(company ? [`Company / Business: ${company}`] : []),
      `What do you need?: ${need}`,
      `Estimated budget: ${budget}`,
      '',
      'Project details:',
      values.message.trim(),
    ].join('\n')
    const href = `mailto:hello@zidwix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDraftHref(href)
    setSubmitted(true)
    // Use the visitor's email client; they review and send the message themselves.
    window.location.href = href
  }

  return (
    <form className={`contact-form-fields ${className}`.trim()} onSubmit={submit} noValidate>
      <div className="grid c2">
        <div>
          <label htmlFor={ids.name}>Full name *</label>
          <input id={ids.name} type="text" autoComplete="name" placeholder="Your name" className={invalid.name ? 'bad' : ''} aria-invalid={invalid.name || undefined} aria-describedby={invalid.name ? `${ids.name}-error` : undefined} value={values.name} onChange={event => setValues({ ...values, name: event.target.value })} />
          <span id={`${ids.name}-error`} className="err">Please enter your name.</span>
        </div>
        <div>
          <label htmlFor={ids.email}>Business email *</label>
          <input id={ids.email} type="email" autoComplete="email" placeholder="you@company.com" className={invalid.email ? 'bad' : ''} aria-invalid={invalid.email || undefined} aria-describedby={invalid.email ? `${ids.email}-error` : undefined} value={values.email} onChange={event => setValues({ ...values, email: event.target.value })} />
          <span id={`${ids.email}-error`} className="err">Please enter a valid email.</span>
        </div>
      </div>
      <div>
        <label htmlFor={ids.company}>Company / Business <span className="sm">(optional)</span></label>
        <input id={ids.company} name={ids.company} type="text" autoComplete="organization" placeholder="Your company name" />
      </div>
      <fieldset className="contact-form__choice">
        <legend>What do you need? *</legend>
        <Radios name={`${idPrefix}-need`} options={NEED} />
      </fieldset>
      <fieldset className="contact-form__choice">
        <legend>Estimated budget <span className="sm">(optional)</span></legend>
        <Radios name={`${idPrefix}-budget`} options={BUDGET} />
      </fieldset>
      <div>
        <label htmlFor={ids.message}>Tell us about your project *</label>
        <textarea id={ids.message} maxLength={500} className={invalid.message ? 'bad' : ''} aria-invalid={invalid.message || undefined} aria-describedby={invalid.message ? `${ids.message}-error` : undefined} placeholder="What problem are you trying to solve, or what would you like to build?" value={values.message} onChange={event => setValues({ ...values, message: event.target.value })} />
        <span id={`${ids.message}-error`} className="err">Please tell us about your project.</span>
        <div className="sm contact-form__counter" aria-live="polite">{values.message.length}/500</div>
      </div>
      <div className="contact-form__submit">
        <button className="btn" type="submit"><Send className="i" /> Send Enquiry <ArrowRight className="i" /></button>
        {submitted && <p className="sm contact-form__success" role="status">Your enquiry is ready in your email app. Review it and press Send to deliver it. If the draft didn’t open, <a href={draftHref}>open it again</a> or email <a href="mailto:hello@zidwix.com">hello@zidwix.com</a>.</p>}
      </div>
    </form>
  )
}
