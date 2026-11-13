const GMAIL_COMPOSE_BASE = 'https://mail.google.com/mail/u/0/?view=cm&fs=1'
const BUSINESS_EMAIL = 'hello@zidwix.com'

export function gmailComposeHref(subject = 'Project enquiry for Zidwix', body = 'Hi Zidwix,\n\nI would like to discuss a project.\n\n') {
  return `${GMAIL_COMPOSE_BASE}&to=${encodeURIComponent(BUSINESS_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function openGmailCompose(href: string) {
  // Open exactly one new tab. Do not fall back to navigating the current Zidwix tab.
  window.open(href, '_blank', 'noopener,noreferrer')
}

export { BUSINESS_EMAIL }
