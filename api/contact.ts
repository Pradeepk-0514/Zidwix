
import type { VercelRequest, VercelResponse } from '@vercel/node'

const RESEND_API = 'https://api.resend.com/emails'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM

  if (!apiKey || !from) {
    return res.status(503).json({
      error: 'Email delivery is not configured.',
    })
  }

  const {
    name,
    email,
    company = '',
    need,
    budget = 'Not specified',
    message,
  } = req.body ?? {}

  const cleanName = String(name ?? '').trim()
  const cleanEmail = String(email ?? '').trim()
  const cleanCompany = String(company ?? '').trim()
  const cleanNeed = String(need ?? '').trim()
  const cleanBudget = String(budget ?? '').trim()
  const cleanMessage = String(message ?? '').trim()

  if (
    !cleanName ||
    !/^\S+@\S+\.\S+$/.test(cleanEmail) ||
    !cleanNeed ||
    !cleanMessage ||
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanCompany.length > 150 ||
    cleanMessage.length > 500
  ) {
    return res.status(400).json({
      error: 'Please check the submitted enquiry details.',
    })
  }

  try {
    // 1. Send enquiry notification to Zidwix.

    const enquiry = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: ['hello@zidwix.com'],
        reply_to: cleanEmail,
        subject: `Website enquiry from ${cleanName}`,
        text: [
          'New enquiry from the Zidwix website',
          '',
          `Name: ${cleanName}`,
          `Business email: ${cleanEmail}`,
          `Company / Business: ${cleanCompany || 'Not provided'}`,
          `What do you need?: ${cleanNeed}`,
          `Estimated budget: ${cleanBudget}`,
          '',
          'Project details:',
          cleanMessage,
        ].join('\n'),
      }),
    })

    const enquiryResult = await enquiry.json()

    console.log('Enquiry HTTP status:', enquiry.status)
    console.log('Enquiry response:', enquiryResult)

    if (!enquiry.ok) {
      console.error('Resend enquiry error:', enquiryResult)

      return res.status(502).json({
        error: 'We could not deliver your enquiry. Please try again.',
      })
    }

    // 2. Send automatic acknowledgement to the client.

    const acknowledgement = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [cleanEmail],
        reply_to: 'hello@zidwix.com',
        subject: 'We received your enquiry – Zidwix',
        text: [
          `Hi ${cleanName},`,
          '',
          'Thank you for contacting Zidwix.',
          'We have received your project enquiry and will review the details.',
          'Our team will get back to you within 24 hours.',
          '',
          'Regards,',
          'Zidwix Team',
          'hello@zidwix.com',
        ].join('\n'),
      }),
    })

    const acknowledgementResult = await acknowledgement.json()

    console.log(
      'Acknowledgement HTTP status:',
      acknowledgement.status,
    )
    console.log(
      'Acknowledgement response:',
      acknowledgementResult,
    )

    if (!acknowledgement.ok) {
      console.error(
        'Resend acknowledgement error:',
        acknowledgementResult,
      )
    }

    return res.status(200).json({
      success: true,
      acknowledgementSent: acknowledgement.ok,
    })

  } catch (error) {
    console.error('Contact API error:', error)

    return res.status(500).json({
      error: 'Something went wrong. Please try again.',
    })
  }
}
