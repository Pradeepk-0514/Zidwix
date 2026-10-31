import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'
import { resumeSmoothScroll, stopSmoothScroll } from '../lib/smooth'

type ContactModalProps = { onClose: () => void }

export default function ContactModal({ onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const openerRef = useRef<HTMLElement | null>(document.activeElement instanceof HTMLElement
    ? document.activeElement.closest<HTMLElement>('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])') ?? document.querySelector<HTMLElement>('.nav-lets-talk')
    : document.querySelector<HTMLElement>('.nav-lets-talk'))

  useEffect(() => {
    const appRoot = document.getElementById('root')
    const hadInert = Boolean(appRoot?.inert)
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth)

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`
    if (appRoot) appRoot.inert = true
    stopSmoothScroll()

    const dialog = dialogRef.current
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
    const frame = requestAnimationFrame(() => (focusable()[0] ?? dialog)?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const controls = focusable()
      if (!controls.length) { event.preventDefault(); dialog?.focus(); return }
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      if (appRoot && !hadInert) appRoot.inert = false
      resumeSmoothScroll()
      requestAnimationFrame(() => openerRef.current?.focus())
    }
  }, [onClose])

  return createPortal(
    <div className="contact-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialogRef} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" aria-describedby="contact-modal-description" tabIndex={-1}>
        <button className="contact-modal__close" type="button" aria-label="Close contact form" onClick={onClose}><X aria-hidden="true" /></button>
        <div className="eyebrow contact-modal__eyebrow">Start a conversation</div>
        <h2 id="contact-modal-title">Let’s talk about your project.</h2>
        <p id="contact-modal-description" className="contact-modal__description">Share a few details and we’ll get back to you within 24 hours.</p>
        <ContactForm idPrefix="modal" className="contact-modal__form" />
      </section>
    </div>,
    document.body,
  )
}
