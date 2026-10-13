# ZidWix implementation plan

## Outcome
Create a responsive public ZidWix creative-technology studio website that follows the supplied visual board: dark navy hero/chrome, white content panels, signal pink/orange accents, compact mono labels, editorial display typography, abstract geometric forms, and page architecture for Home, About, Work, and Contact.

## Architecture
- Use a Vite + React SPA with browser-managed routes for `/`, `/about`, `/work`, and `/contact`.
- Keep content in the client bundle because the requested experience is public and static; no server, database, auth, or third-party API is required.
- Use relative links and a static `public/manus-routes.json` route manifest.
- Serve the built `dist/` folder as static output; versioned assets can use long-lived caching and HTML remains revalidatable.

## UI structure
- Shared `Header`, `Footer`, `Logo`, `Button`, `Orb`, and `ProjectCard` components.
- Home: hero, friction/problem framing, services, process, selected work, lab banner, contact CTA.
- About: intro, studio story, approach values, reference-board visual, CTA/footer.
- Work: intro, portfolio grid, lab banner.
- Contact: intro, direct contact details, accessible inquiry form with local success state.

## Design direction
See `ideas.md`. The reference image is the ground truth for the visual system. The supplied theme image is reused in the About visual band to make the source relationship explicit without turning the page into a screenshot.

## Verification
- Install dependencies with pnpm and run the existing Vite build.
- Start the development server on port 3000 and verify the route manifest returns valid JSON.
- Use source inspection and build output checks for completion; ensure all page paths render through the route map and the form interaction is controlled and accessible.
