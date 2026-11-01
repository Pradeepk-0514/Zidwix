# Zidwix
React + TypeScript + Vite + Tailwind + React Three Fiber/Drei + GSAP ScrollTrigger + Lenis + Lucide + React Router.

    npm install
    npm run dev
    npm run build

Deploy on Vercel (vercel.json rewrites all routes to index.html). Images live in public/img.

## Enquiry email delivery

The contact form posts securely to `/api/contact`, which sends the complete enquiry to `hello@zidwix.com` through Resend. Before deploying, create a Resend API key, verify the sender domain, and add `RESEND_API_KEY` and `RESEND_FROM` as Vercel project environment variables. See `.env.example` for the required names. If the endpoint is not configured, the form shows a pre-filled email-draft fallback instead of silently losing the enquiry.
