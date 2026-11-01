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
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [draftHref, setDraftHref] = useState('')
  const ids = {
    name: `${idPrefix}-full-name`,
    email: `${idPrefix}-business-email`,
    company: `${idPrefix}-company`,
    message: `${idPrefix}-project-message`,
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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
    setSubmitError('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company,
          need,
          budget,
          message: values.message.trim(),
        }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => ({})) as { error?: string }
        throw new Error(result.error || 'The enquiry could not be delivered.')
      }
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The enquiry could not be delivered. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
        <button className="btn" type="submit" disabled={submitting}><Send className="i" /> {submitting ? 'Sending…' : 'Send Enquiry'} <ArrowRight className="i" /></button>
        {submitted && <p className="sm contact-form__success" role="status">Your enquiry has been sent to Zidwix. We’ll get back to you within 24 hours.</p>}
        {submitError && <p className="sm contact-form__error" role="alert">{submitError} <a href={draftHref}>Open a pre-filled email draft instead.</a></p>}
      </div>
    </form>
  )
}
