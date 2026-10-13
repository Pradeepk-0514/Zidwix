# Zidwix website

A dependency-free, responsive static website following the supplied Zidwix reference and the requested charcoal / white / black palette.

## Pages

- `/` — Home
- `/solutions/` — Solutions
- `/work/` — illustrative project patterns (not claimed client case studies)
- `/thinking/` — expandable editorial notes
- `/about/` — Zidwix approach and principles
- `/contact/` — validated client-side form that opens an email draft; it does not send or store form data

## Build and preview

Run `python3 scripts/build.py` to create content-bearing HTML pages in `dist/`. To preview locally on port 3000, run `python3 -m http.server 3000 --bind 0.0.0.0 --directory dist`.

The site has no backend, user accounts or database. The contact form currently opens a draft to `hello@zidwix.com`; confirm or replace that address before public launch. The hero image is the approved reserved managed-storage image URL and will resolve when its generation completes.
