#!/usr/bin/env python3
"""Build the content-bearing Zidwix static website into dist/."""
from __future__ import annotations

import html
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DIST = ROOT / "dist"
HERO_IMAGE = "/manus-storage/async-images/pRRkrJ6gCZc40soHchDZys/image-1.webp"

NAV = [
    ("solutions", "Solutions", "/solutions/"),
    ("work", "Work", "/work/"),
    ("thinking", "Thinking", "/thinking/"),
    ("about", "About", "/about/"),
]


def e(value: str) -> str:
    return html.escape(value, quote=True)


def button(label: str, href: str, secondary: bool = False) -> str:
    cls = "button button--secondary" if secondary else "button button--light"
    return f'<a class="{cls}" href="{e(href)}">{label}<span aria-hidden="true">↗</span></a>'


def nav_markup(active: str) -> str:
    links = []
    for key, label, path in NAV:
        is_active = active == key
        class_name = 'nav-link is-active' if is_active else 'nav-link'
        current_attr = ' aria-current="page"' if is_active else ""
        links.append(f'<a class="{class_name}" href="{path}"{current_attr}>{label}</a>')
    links_html = "".join(links)
    contact_current = ' aria-current="page"' if active == "contact" else ""
    contact_active = " is-active" if active == "contact" else ""
    return f'''<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="Zidwix home">
      <img src="/assets/zidwix-mark.svg" width="38" height="38" alt="" />
      <span class="brand-word">ZIDWIX<span class="brand-dot">.</span><small>AI, automation &amp; business technology</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">
      {links_html}
      <a class="nav-cta{contact_active}" href="/contact/"{contact_current}>Start a conversation <span aria-hidden="true">↗</span></a>
    </nav>
  </div>
</header>'''


def footer_markup() -> str:
    return '''<footer class="site-footer">
  <div class="container footer-main">
    <div class="footer-brand-block">
      <a class="brand brand--footer" href="/" aria-label="Zidwix home">
        <img src="/assets/zidwix-mark.svg" width="38" height="38" alt="" />
        <span class="brand-word">ZIDWIX<span class="brand-dot">.</span><small>AI, automation &amp; business technology</small></span>
      </a>
      <p>Not just technology.<br />A better way for work to work.</p>
    </div>
    <div class="footer-links"><span class="footer-label">Explore</span>
      <a href="/solutions/">Solutions</a><a href="/work/">Work</a><a href="/thinking/">Thinking</a><a href="/about/">About</a>
    </div>
    <div class="footer-links"><span class="footer-label">Start here</span>
      <a href="/contact/">Tell us what you’re solving</a><a href="mailto:hello@zidwix.com">hello@zidwix.com</a>
    </div>
  </div>
  <div class="container footer-bottom"><span>© <span data-year>2026</span> ZIDWIX. Thoughtful technology. Practical outcomes.</span><a href="#top">Back to top ↑</a></div>
</footer>'''


def hero(kicker: str, title: str, lead: str, *, home: bool = False, actions: str = "") -> str:
    if home:
        art = f'<img class="hero-art-image" src="{HERO_IMAGE}" alt="" fetchpriority="high" />'
        return f'''<section class="home-hero">
  <div class="hero-art" aria-hidden="true">{art}<div class="hero-art-fade"></div></div>
  <div class="container home-hero-inner">
    <div class="hero-copy"><p class="eyebrow eyebrow--light">{kicker}</p><h1>{title}</h1><p class="hero-lead">{lead}</p>
      <div class="hero-actions">{actions}</div><div class="hero-note"><span class="status-dot"></span>AI · AUTOMATION · BUSINESS TECHNOLOGY</div>
    </div>
    <div class="hero-side-label" aria-hidden="true"><span>01 / A more connected way forward</span><i></i></div>
  </div>
</section>'''
    return f'''<section class="page-hero"><div class="container page-hero-inner">
  <p class="eyebrow eyebrow--light">{kicker}</p><h1>{title}</h1><p class="hero-lead">{lead}</p>{f'<div class="hero-actions">{actions}</div>' if actions else ''}
</div><div class="page-hero-line" aria-hidden="true"></div></section>'''


def section_heading(eyebrow: str, title: str, copy: str = "") -> str:
    para = f'<p class="section-intro">{copy}</p>' if copy else ""
    return f'<div class="section-heading"><p class="eyebrow">{eyebrow}</p><h2>{title}</h2>{para}</div>'


def card_grid(items: list[tuple[str, str, str]], *, cls: str = "service-grid") -> str:
    cards = []
    for index, (title, description, label) in enumerate(items, start=1):
        cards.append(f'''<article class="service-card"><div class="card-top"><span class="card-number">0{index:02}</span><span class="card-mark" aria-hidden="true">↗</span></div>
          <p class="card-kicker">{label}</p><h3>{title}</h3><p>{description}</p></article>''')
    return f'<div class="{cls}">{"".join(cards)}</div>'


def standard_cta(title: str = "Have a problem worth solving?", copy: str = "Tell us what’s happening. We’ll help you work out what should be built — and what can stay simple.") -> str:
    return f'''<section class="closing-cta"><div class="container closing-cta-inner"><div><p class="eyebrow eyebrow--light">A good place to start</p><h2>{title}</h2><p>{copy}</p></div><div>{button("Start a conversation", "/contact/")}</div></div></section>'''


def homepage() -> str:
    services = [
        ("AI &amp; Automation", "Agents and workflows that take repetitive work off your team — with people still in control.", "Less friction"),
        ("Business Systems", "Connected tools for the everyday work of running a business: customers, operations and decisions.", "One system"),
        ("Digital Products", "Useful web applications, portals and internal tools shaped around how your team actually works.", "Made to fit"),
        ("Data &amp; Intelligence", "Bring scattered information into a clearer view, so the next decision is easier to make.", "See clearly"),
    ]
    problems = [
        ("Manual", "Work depends on repeated tasks and hand-offs."),
        ("Disconnected", "Tools hold pieces of the process, but not the whole picture."),
        ("Slow", "Good people spend time moving information instead of using it."),
        ("Unclear", "Important signals are hard to see when data lives everywhere."),
    ]
    process = [("Understand", "Start with the real problem."), ("Design", "Shape a practical system."), ("Build", "Make the pieces work together."), ("Improve", "Learn and refine as work changes.")]
    works = [
        ("AI Sales Agent", "A considered assistant for first-response, lead context and useful next steps.", "AGENT SYSTEMS", "art-agent"),
        ("Business Intelligence", "A clearer view of the information teams need to make everyday decisions.", "DATA &amp; DECISIONS", "art-data"),
        ("Operations Platform", "A connected workspace for people, process and operational signals.", "CONNECTED WORK", "art-ops"),
    ]
    work_cards = "".join(f'''<article class="work-card"><div class="work-art {art}" aria-hidden="true"><span class="art-orbit"></span><span class="art-core"></span></div><div class="work-card-body"><p class="card-kicker">Illustrative project pattern · {label}</p><h3>{title}</h3><p>{copy}</p><a class="text-link" href="/work/">Explore this kind of work <span aria-hidden="true">↗</span></a></div></article>''' for title, copy, label, art in works)
    steps = "".join(f'<article class="process-step"><span class="step-number">0{idx}</span><h3>{title}</h3><p>{copy}</p></article>' for idx, (title, copy) in enumerate(process, 1))
    problem_cards = "".join(f'<article class="problem-card"><span class="problem-icon" aria-hidden="true">{idx:02}</span><h3>{title}</h3><p>{copy}</p></article>' for idx, (title, copy) in enumerate(problems, 1))
    insights = '''<article class="insight-card"><p class="card-kicker">A PRACTICAL POINT OF VIEW · 4 MIN READ</p><h3>Start with the work, not the technology.</h3><p>A useful system begins with a careful look at what is getting in the way.</p><a class="text-link" href="/thinking/">Read our thinking ↗</a></article>
    <article class="insight-card"><p class="card-kicker">AI &amp; AUTOMATION · 5 MIN READ</p><h3>Where should automation stop?</h3><p>Good automation makes work clearer. It does not remove judgement from the people who need it.</p><a class="text-link" href="/thinking/">More perspectives ↗</a></article>'''
    home_hero = hero(
        'AI AUTOMATION &amp; BUSINESS TECHNOLOGY',
        'Building <span class="text-soft">intelligent</span><br />business systems.',
        'We connect AI, automation, software and data to help businesses work smarter — starting with the problem, not the tool.',
        home=True,
        actions=button('Explore solutions', '/solutions/') + button('Start a conversation', '/contact/', True),
    )
    problem_title = "Most businesses don’t have one problem. They have a chain of them."
    problem_section = section_heading(
        'THE PROBLEM',
        problem_title,
        'Work gets harder when the process depends on manual steps, disconnected tools and information no one can see all at once.',
    )
    return f'''{home_hero}
<section class="section section--white"><div class="container">{problem_section}
<div class="problem-grid">{problem_cards}</div></div></section>
<section class="section section--mist"><div class="container">{section_heading("WHAT WE BUILD", "The system behind the business.", "A joined-up mix of technology that fits the way your business needs to work.")}{card_grid(services)}<div class="section-foot"><a class="text-link" href="/solutions/">Explore all solutions <span aria-hidden="true">↗</span></a></div></div></section>
<section class="section section--dark process-band"><div class="container">{section_heading("OUR APPROACH", "How a Zidwix system comes together.", "Clear thinking first. Useful technology next. Better work over time.")}<div class="process-grid">{steps}</div></div></section>
<section class="section section--white"><div class="container">{section_heading("SELECTED CAPABILITIES", "Practical systems. Real problems.", "A few illustrative project patterns show how connected technology can make work flow more naturally.")}
<div class="work-grid">{work_cards}</div><div class="section-foot"><a class="text-link" href="/work/">See project patterns <span aria-hidden="true">↗</span></a></div></div></section>
<section class="lab-band"><div class="container lab-inner"><div><p class="eyebrow eyebrow--light">ZIDWIX FIELD NOTES</p><h2>Good technology makes the next step clearer.</h2><p>Ideas on AI, automation and building systems that work for people.</p></div><a class="button button--outline" href="/thinking/">Read our thinking <span aria-hidden="true">↗</span></a></div></section>
<section class="section section--mist"><div class="container">{section_heading("THINKING", "Better questions. Better systems.", "A few starting points for looking at work differently.")}<div class="insight-grid">{insights}</div></div></section>
{standard_cta()}'''


def solutions_page() -> str:
    categories = [
        ("AI &amp; Automation", "Put AI to work where it can make a real difference — handling repeatable steps, surfacing useful context and supporting the people doing the work.", "01 / INTELLIGENT WORKFLOWS"),
        ("Business Systems", "Bring customer, team and operations workflows into a clearer, more connected way of working.", "02 / CONNECTED OPERATIONS"),
        ("Digital Products", "Build web applications and internal tools around the people, process and decisions they need to support.", "03 / PURPOSE-BUILT SOFTWARE"),
        ("Data &amp; Intelligence", "Make scattered information easier to understand, explore and use in everyday decisions.", "04 / DATA THAT HELPS"),
    ]
    details = card_grid(categories, cls="solution-grid")
    bullets = '''<div class="solution-detail"><span class="card-number">01</span><div><h3>AI &amp; Automation</h3><p>Agent assistants · Workflow automation · Lead and support triage · Document processing · Human-in-the-loop review</p></div></div>
    <div class="solution-detail"><span class="card-number">02</span><div><h3>Business Systems</h3><p>CRM and operations · Inventory and vendor flows · Workflow orchestration · Team workspaces · System integrations</p></div></div>
    <div class="solution-detail"><span class="card-number">03</span><div><h3>Digital Products</h3><p>Web applications · Customer portals · Internal tools · Product prototypes · E-commerce foundations</p></div></div>
    <div class="solution-detail"><span class="card-number">04</span><div><h3>Data &amp; Intelligence</h3><p>Dashboards · Reporting · Data pipelines · Decision support · Business-ready AI</p></div></div>'''
    return f'''{hero("SOLUTIONS", "Technology is only useful when it solves something.", "We design and build solutions that help you automate, connect and make better decisions — with the right level of technology for the job.", actions=button("Talk through a problem", "/contact/"))}
<section class="section section--white"><div class="container">{section_heading("WHAT WE DO", "A system for the work that matters.", "Our capabilities can stand alone or come together as one practical, connected system.")}{details}</div></section>
<section class="section section--mist"><div class="container solution-list-layout"><div>{section_heading("CAPABILITIES", "From a first idea to everyday use.", "We meet your team where it is and shape the smallest useful next step.")}</div><div class="solution-list">{bullets}</div></div></section>
<section class="section section--dark"><div class="container">{section_heading("THE RIGHT START", "First, understand the work.", "We ask what is happening, who it affects and what would be better. Then we decide what to build — and what not to.")}<div class="principle-row"><span>01 — Listen</span><span>02 — Frame the problem</span><span>03 — Build with purpose</span><span>04 — Improve together</span></div></div></section>
{standard_cta("Let’s find the useful next step.", "A short conversation can help turn a tangled workflow into a clear first move.")}'''


def work_page() -> str:
    cards = [
        ("AI Sales Agent", "AGENT SYSTEMS", "An assistant that gathers context, helps route an enquiry and gives a team a more considered place to start.", "art-agent"),
        ("Business Intelligence", "DATA &amp; DECISIONS", "A practical view of scattered business information, shaped around the decisions a team makes every day.", "art-data"),
        ("Operations Platform", "CONNECTED WORK", "A shared operational workspace that helps people see what is happening and what needs attention.", "art-ops"),
        ("Customer Portal", "DIGITAL PRODUCTS", "A focused digital front door for common requests, useful information and self-service workflows.", "art-portal"),
    ]
    work_cards = "".join(f'''<article class="work-card work-card--large"><div class="work-art {art}" aria-hidden="true"><span class="art-orbit"></span><span class="art-core"></span></div><div class="work-card-body"><p class="card-kicker">{label}</p><h3>{title}</h3><p>{copy}</p><span class="case-note">Illustrative project pattern — a way of describing the kind of system Zidwix can build.</span></div></article>''' for title, label, copy, art in cards)
    return f'''{hero("WORK", "Real problems. Practical systems.", "We focus on the work a business needs to do — and the software, automation and intelligence that can make it flow better.")}
<section class="section section--white"><div class="container">{section_heading("PROJECT PATTERNS", "A glimpse of what connected can look like.", "These are illustrative examples of the kind of systems we can shape. They are project concepts, not claims about named clients or measured results.")}<div class="work-grid work-grid--two">{work_cards}</div></div></section>
<section class="section section--mist"><div class="container two-column"><div>{section_heading("A BETTER MEASURE", "Useful is the point.")}</div><div class="body-copy"><p>We do not start with a technology in search of a problem. We look at the people, process and information involved, then build what helps the work move forward.</p><p>The result might be a focused automation, a connected application or a clearer way to use data. The right solution is the one that earns its place in the day-to-day.</p><a class="text-link" href="/solutions/">Explore our capabilities ↗</a></div></div></section>
{standard_cta("Have a project in mind?")}'''


def thinking_page() -> str:
    articles = [
        ("Start with the work, not the technology.", "A PRACTICAL POINT OF VIEW · 4 MIN READ", "When a process feels slow or frustrating, it is tempting to reach for a new tool straight away. A better first step is to trace the work: where it begins, what information it needs, where people have to wait and what a useful outcome looks like.", "Once the problem is visible, technology becomes a choice rather than a starting assumption. Sometimes the best change is an integration or a clearer hand-off. Sometimes it is automation. The point is to make the work better, not to make the system more elaborate."),
        ("Where should automation stop?", "AI &amp; AUTOMATION · 5 MIN READ", "Automation works best when the task is repeatable and the rules are understandable. That does not mean every decision should be automated. Context, exceptions and accountability still matter.", "Design for a person to stay informed and step in when judgement is needed. Make the system's limits visible, keep a useful record of what happened and improve the workflow as real cases teach you more."),
        ("Connected data is a team habit.", "DATA &amp; DECISIONS · 3 MIN READ", "A dashboard cannot repair a process on its own. Information becomes useful when people agree what it means, when it is updated and which decision it is meant to support.", "Start with a small set of questions people genuinely ask. Make their source and context clear. Then build a view that gives the team a shared place to think — instead of one more screen to maintain."),
    ]
    cards = "".join(f'''<details class="insight-card insight-card--expand"><summary><span class="card-kicker">{tag}</span><h2>{title}</h2><span class="text-link">Read the note <span aria-hidden="true">+</span></span></summary><div class="insight-body"><p>{p1}</p><p>{p2}</p></div></details>''' for title, tag, p1, p2 in articles)
    return f'''{hero("THINKING", "Better questions. Better systems.", "Ideas, observations and practical perspectives for making technology work harder for people.")}
<section class="section section--white"><div class="container">{section_heading("FIELD NOTES", "A point of view for a smarter tomorrow.", "We believe good systems start with curiosity, improve with evidence and stay useful by keeping people in the loop.")}<div class="insight-list">{cards}</div></div></section>
<section class="section section--dark"><div class="container two-column"><div>{section_heading("OUR STARTING POINT", "We don’t start with technology.", "We start with the problem.")}</div><div class="body-copy"><p>The right technology depends on the context around it: the people doing the work, the information they can trust and the decisions they need to make.</p><p>That is why listening and clear thinking come first. The useful system follows from there.</p><a class="text-link text-link--light" href="/about/">How we think ↗</a></div></div></section>
{standard_cta("Curious about a problem?")}'''


def about_page() -> str:
    values = [
        ("Thoughtful", "Understand the people, process and context before choosing a tool.", "HOW WE THINK"),
        ("Practical", "Keep the solution clear, usable and connected to a real need.", "HOW WE BUILD"),
        ("Built to last", "Make room for maintenance, learning and change after launch.", "HOW WE IMPROVE"),
    ]
    value_cards = card_grid(values, cls="value-grid")
    steps = [("Listen closely", "We learn how the work happens today."), ("Make it clear", "We agree on the problem and the useful outcome."), ("Build thoughtfully", "We bring the right software and systems together."), ("Keep improving", "We learn from use and help the system evolve.")]
    step_markup = "".join(f'<article class="process-step"><span class="step-number">0{i}</span><h3>{t}</h3><p>{d}</p></article>' for i, (t, d) in enumerate(steps, 1))
    return f'''{hero("ABOUT ZIDWIX", "We didn’t start with technology. We started with a way of looking at problems.", "Zidwix brings AI, automation, software and data together to help businesses make work more connected and more useful.")}
<section class="section section--white"><div class="container two-column"><div>{section_heading("WHY ZIDWIX EXISTS", "Make the complex feel workable.")}</div><div class="body-copy"><p>Businesses rarely need another layer of tools for its own sake. They need the right pieces to work together: the information, the decisions and the people moving the work forward.</p><p>Zidwix exists to help find that fit. We bring curiosity, systems thinking and practical technology to problems that deserve a considered answer.</p></div></div></section>
<section class="section section--mist"><div class="container">{section_heading("WHAT GUIDES US", "Thoughtful. Practical. Lasting.", "A few principles shape how we work — and what we choose to build.")}{value_cards}</div></section>
<section class="section section--dark"><div class="container">{section_heading("OUR APPROACH", "A clear path from problem to progress.", "We keep the work collaborative, the decisions visible and the next step grounded in what we learn.")}<div class="process-grid">{step_markup}</div></div></section>
<section class="section section--white"><div class="container two-column"><div>{section_heading("OUR BELIEF", "Technology should earn its place.")}</div><div class="body-copy"><p>The best system is not necessarily the biggest or newest. It is the one that helps a team do the important work with more clarity and less friction.</p><p>That is the standard we bring to every conversation — whether the answer is an AI agent, a new workflow, a better application or a simpler process.</p><a class="text-link" href="/solutions/">See what we build ↗</a></div></div></section>
{standard_cta("Let’s understand the problem together.")}'''


def contact_page() -> str:
    return f'''{hero("START A CONVERSATION", "Have a problem worth solving?", "Tell us what is happening. We’ll help you think through what can be built — and what a useful first step might be.")}
<section class="section section--white contact-section"><div class="container contact-layout"><div class="contact-copy"><p class="eyebrow">A GOOD FIRST STEP</p><h2>Start with the part that feels stuck.</h2><p>You do not need a polished brief. A little context is enough to start a thoughtful conversation.</p><div class="contact-direct"><span class="contact-icon" aria-hidden="true">@</span><div><span class="footer-label">Email</span><a href="mailto:hello@zidwix.com">hello@zidwix.com</a></div></div><div class="contact-direct"><span class="contact-icon" aria-hidden="true">↗</span><div><span class="footer-label">What happens next?</span><p>We’ll read your note and follow up by email to understand the problem and the people it affects.</p></div></div></div>
<form class="contact-form" id="contact-form">
  <p class="eyebrow">YOUR PROJECT · 1 / 1</p><h2>Tell us a little about it.</h2>
  <label for="interest">What are you looking to build?</label><select id="interest" name="interest" required><option value="" disabled selected>Select an area</option><option>AI &amp; automation</option><option>Business systems</option><option>Digital product or application</option><option>Data &amp; intelligence</option><option>Not sure yet</option></select>
  <label for="challenge">What problem are you trying to solve?</label><textarea id="challenge" name="challenge" rows="4" placeholder="A few sentences is plenty." required></textarea>
  <div class="form-row"><div><label for="name">Name</label><input id="name" name="name" autocomplete="name" placeholder="Your name" required /></div><div><label for="company">Company <span class="optional">Optional</span></label><input id="company" name="company" autocomplete="organization" placeholder="Company" /></div></div>
  <label for="email">Email</label><input type="email" id="email" name="email" autocomplete="email" placeholder="you@example.com" required />
  <button class="button button--dark button--submit" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
  <p class="form-note">This opens an email draft addressed to hello@zidwix.com. The static website does not store or send your information.</p><p class="form-status" id="form-status" role="status" aria-live="polite"></p>
</form></div></section>
<section class="section section--mist"><div class="container short-note"><p class="eyebrow">NO PRESSURE</p><h2>A clear conversation. No assumptions.</h2><p>We’ll listen first, ask useful questions and help you find a sensible way forward.</p></div></section>'''


PAGES = [
    {"slug": "", "key": "home", "title": "Home", "description": "Zidwix connects AI, automation, software and data to help businesses work smarter. Thoughtful technology. Practical outcomes.", "keywords": "Zidwix, AI automation, business technology, intelligent systems, workflow automation", "content": homepage()},
    {"slug": "solutions", "key": "solutions", "title": "Solutions", "description": "Explore Zidwix solutions in AI automation, connected business systems, digital products and data intelligence.", "keywords": "AI solutions, business automation, digital products, business systems, data intelligence", "content": solutions_page()},
    {"slug": "work", "key": "work", "title": "Work", "description": "Explore illustrative Zidwix project patterns for agent systems, business intelligence, operations platforms and digital products.", "keywords": "Zidwix work, AI projects, business intelligence, operations platforms, digital products", "content": work_page()},
    {"slug": "thinking", "key": "thinking", "title": "Thinking", "description": "Practical perspectives from Zidwix on AI, automation, connected data and building technology around real work.", "keywords": "AI thinking, workflow design, responsible automation, connected data, business systems", "content": thinking_page()},
    {"slug": "about", "key": "about", "title": "About", "description": "Learn about Zidwix and its thoughtful, practical approach to AI, automation and business technology.", "keywords": "about Zidwix, business technology, practical AI, thoughtful automation, systems thinking", "content": about_page()},
    {"slug": "contact", "key": "contact", "title": "Start a Conversation", "description": "Tell Zidwix what your business is trying to solve. Start a thoughtful conversation about AI, automation and useful systems.", "keywords": "contact Zidwix, AI consultation, automation project, business technology, start a conversation", "content": contact_page()},
]


def render(page: dict) -> str:
    title = f'{page["title"]} | ZIDWIX'
    head = f'''<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#050505" />
<title>{e(title)}</title>
<meta name="description" content="{e(page['description'])}" />
<meta name="keywords" content="{e(page['keywords'])}" />
<meta property="og:type" content="website" /><meta property="og:site_name" content="ZIDWIX" />
<meta property="og:title" content="{e(title)}" /><meta property="og:description" content="{e(page['description'])}" />
<meta name="twitter:card" content="summary" /><meta name="twitter:title" content="{e(title)}" /><meta name="twitter:description" content="{e(page['description'])}" />
<link rel="icon" href="/assets/zidwix-mark.svg" type="image/svg+xml" />
<link rel="stylesheet" href="/assets/styles.css" />
<script src="/assets/site.js" defer></script>'''
    return f'''<!doctype html>
<html lang="en"><head>{head}</head><body id="top">
{nav_markup(page['key'])}
<main id="main">{page['content']}</main>
{footer_markup()}
</body></html>
'''


def build() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    shutil.copytree(PUBLIC, DIST, dirs_exist_ok=True)
    for page in PAGES:
        page_dir = DIST / page["slug"]
        page_dir.mkdir(parents=True, exist_ok=True)
        (page_dir / "index.html").write_text(render(page), encoding="utf-8")
    print(f"Built {len(PAGES)} Zidwix pages to {DIST}")


if __name__ == "__main__":
    build()
