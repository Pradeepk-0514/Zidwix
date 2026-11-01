type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (payload: unknown) => void
  setHeader: (name: string, value: string) => void
  end: () => void
}

type Enquiry = {
  name?: unknown
  email?: unknown
  company?: unknown
  need?: unknown
  budget?: unknown
  message?: unknown
}

const recipient = 'hello@zidwix.com'

function text(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.status(204).end()
    return
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  let payload: Enquiry
  try {
    payload = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}) as Enquiry
  } catch {
    res.status(400).json({ error: 'Invalid request body.' })
    return
  }
  const name = text(payload.name, 120)
  const email = text(payload.email, 240)
  const company = text(payload.company, 160)
  const need = text(payload.need, 160)
  const budget = text(payload.budget, 120)
  const message = text(payload.message, 4000)

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: 'Please provide a valid name, email, and project description.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    res.status(503).json({ error: 'Email delivery is not configured yet. Please use the pre-filled email draft.' })
    return
  }

  const subject = `Website enquiry from ${name}`
  const details = [
    ['Name', name],
    ['Business email', email],
    ['Company / Business', company || 'Not provided'],
    ['What they need', need || 'Not selected'],
    ['Estimated budget', budget || 'Not specified'],
  ] as const
  const textBody = [
    'New enquiry from the Zidwix website',
    '',
    ...details.map(([label, value]) => `${label}: ${value}`),
    '',
    'Project details:',
    message,
  ].join('\n')
  const htmlBody = `<h2>New enquiry from the Zidwix website</h2><dl>${details.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl><h3>Project details</h3><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [recipient], reply_to: email, subject, text: textBody, html: htmlBody }),
    })
    if (!response.ok) {
      res.status(502).json({ error: 'The enquiry service could not deliver the message. Please use the pre-filled email draft.' })
      return
    }
    res.status(200).json({ ok: true })
  } catch {
    res.status(502).json({ error: 'The enquiry service could not be reached. Please use the pre-filled email draft.' })
  }
}
