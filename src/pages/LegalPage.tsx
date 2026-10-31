import { Link } from 'react-router-dom'

type LegalPageProps = { type: 'privacy' | 'terms' }
const updated = '30 October 2026'

export default function LegalPage({ type }: LegalPageProps) {
  const privacy = type === 'privacy'
  return <section className="legal-page">
    <div className="legal-shell">
      <div className="eyebrow">Zidwix / Legal</div>
      <h1>{privacy ? 'Privacy Policy' : 'Terms of Service'}</h1>
      <p className="lead">Last updated {updated}</p>
      {privacy ? <div className="legal-copy">
        <p>This notice explains how information is handled when you visit the Zidwix website. It describes the website as currently implemented and is not a substitute for advice about your particular legal obligations.</p>
        <h2>Information you enter on this site</h2>
        <p>The contact form asks for your name, business email, optional business name, project category, an optional budget range, and a project description. At present, the form validates those fields in your browser only: it does not send them to Zidwix, store them in a database, or transmit them to a form-processing service. The confirmation displayed after submission is an on-page message, not confirmation that an enquiry was received.</p>
        <p>If you contact Zidwix by email, the information in that message is delivered to the email service you use and to the Zidwix mailbox. It may be retained as needed to respond to you and manage the conversation. You can contact <a href="mailto:hello@zidwix.com">hello@zidwix.com</a> with a privacy question or request concerning an email you sent.</p>
        <h2>Technical information</h2>
        <p>Like most websites, the hosting and network services used to serve this site may process basic technical information in server or security logs, such as a request time, requested page, browser information, or IP address. The site code does not currently include analytics or advertising trackers.</p>
        <h2>Links and security</h2>
        <p>This site may link to third-party services, including LinkedIn. Their privacy practices are governed by their own notices. Zidwix takes reasonable care with the site, but no website or method of transmission can be guaranteed completely secure.</p>
        <h2>Changes to this notice</h2>
        <p>This notice may be updated if the site’s features or information practices change. The date above indicates the latest revision shown on this page.</p>
      </div> : <div className="legal-copy">
        <p>These terms apply to your use of the Zidwix website. By using the site, you agree to use it lawfully and in accordance with these terms. If you do not agree, please do not use the site.</p>
        <h2>Website information</h2>
        <p>Website copy, examples, project descriptions, and service information are provided for general information. They do not by themselves create a client relationship, guarantee a particular result, or constitute a binding project proposal. Any work for a client is subject to a separate written agreement.</p>
        <h2>Acceptable use</h2>
        <p>Do not misuse the site, attempt to interfere with its operation or security, or use it in a way that violates applicable law or the rights of others. Please provide accurate information when contacting Zidwix.</p>
        <h2>Intellectual property</h2>
        <p>Unless otherwise stated, the site’s original text, design, and branding are owned by or used with permission by Zidwix. You may view the site for personal or business evaluation; you may not reproduce or commercially use its original materials without prior written permission. Project names and third-party marks remain the property of their respective owners.</p>
        <h2>Third-party services and availability</h2>
        <p>Links to third-party websites are provided for convenience; Zidwix does not control or endorse their content or practices. The site is provided on an “as available” basis and may be changed, interrupted, or withdrawn. To the extent permitted by applicable law, Zidwix disclaims implied warranties and liability for losses arising from use of this informational website. Nothing here limits rights or liability that cannot legally be excluded.</p>
        <h2>Questions</h2>
        <p>For questions about these terms, contact <a href="mailto:hello@zidwix.com">hello@zidwix.com</a>. These terms may be revised from time to time; the date above identifies the latest revision shown.</p>
      </div>}
      <Link className="btn ghost legal-back" to="/">Back to Home</Link>
    </div>
  </section>
}
