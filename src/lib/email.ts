const BUSINESS_EMAIL = 'hello@zidwix.com'

export function gmailComposeHref(subject = 'Project Enquiry for Zidwix', body = 'Hi Zidwix,\n\nI would like to discuss a project.') {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: BUSINESS_EMAIL, su: subject, body })
  return `https://mail.google.com/mail/u/0/?${params.toString()}`
}

export function openGmailCompose(href: string) {
  // Retained for non-anchor fallback links; normal Email Us/footer links use native navigation.
  window.open(href, '_blank', 'noopener,noreferrer')
}

export { BUSINESS_EMAIL }
