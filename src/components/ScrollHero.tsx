import { useEffect, useRef } from 'react'
import { Search, ClipboardList, Code2, Check } from 'lucide-react'
import { Btn, Ico } from './ui'
import { SV } from '../data'

const steps = [
  [Search, 'Understand', 'We learn about your business, identify the challenge and understand what success looks like.'],
  [ClipboardList, 'Plan', 'We define the scope, recommend a practical approach and agree on deliverables and cost.'],
  [Code2, 'Build', 'We develop the agreed solution, share progress and refine it with your feedback.'],
  [Check, 'Deliver', 'We test the solution, hand it over and agree on any ongoing support needed.'],
] as const

const VIDEO_BREAKPOINT = '(max-width: 820px)'
const FRAME_RATE = 24

export default function ScrollHero() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const panels = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = video.current
    const host = section.current
    const stickyStage = stage.current
    if (!el || !host || !stickyStage) return

    let seekRaf = 0
    let sampleRaf = 0
    let duration = 0
    let frameCount = 0
    let requestedFrame = -1
    let activePanel = -1
    let scrollProgress = 0
    let disposed = false

    const desiredFrame = () => Math.max(0, Math.min(frameCount - 1, Math.round(scrollProgress * (frameCount - 1))))

    const scheduleSeek = () => {
      if (!seekRaf && !disposed) seekRaf = requestAnimationFrame(updateVideo)
    }

    const updateVideo = () => {
      seekRaf = 0
      if (!duration || frameCount < 1 || el.readyState < HTMLMediaElement.HAVE_METADATA) return
      const frame = desiredFrame()
      if (el.seeking) return
      const currentFrame = Math.round(el.currentTime * FRAME_RATE)
      if (Math.abs(currentFrame - frame) <= 0 || requestedFrame === frame && currentFrame === frame) return
      requestedFrame = frame
      const time = Math.min(frame / FRAME_RATE, Math.max(0, duration - 1 / FRAME_RATE))
      try {
        el.currentTime = time
      } catch {
        requestedFrame = -1
      }
    }

    const renderProgress = (progress: number) => {
      scrollProgress = progress
      scheduleSeek()
      const active = Math.min(3, Math.floor(Math.min(0.999999, progress) * 4))
      if (active !== activePanel) {
        panels.current.forEach((panel, index) => {
          if (!panel) return
          panel.classList.toggle('is-active', index === active)
          panel.setAttribute('aria-hidden', index === active ? 'false' : 'true')
        })
        activePanel = active
      }
    }

    const sampleScroll = () => {
      sampleRaf = 0
      // Re-read live dimensions: split-screen changes, mobile browser chrome and zoom can
      // all alter the sticky travel distance without remounting this component.
      const travel = Math.max(1, host.scrollHeight - stickyStage.clientHeight)
      const top = host.getBoundingClientRect().top
      renderProgress(Math.max(0, Math.min(1, -top / travel)))
    }

    const onScroll = () => {
      if (!sampleRaf) sampleRaf = requestAnimationFrame(sampleScroll)
    }

    const onMetadata = () => {
      duration = Number.isFinite(el.duration) ? el.duration : 0
      frameCount = duration > 0 ? Math.max(1, Math.floor(duration * FRAME_RATE)) : 0
      requestedFrame = -1
      onScroll()
    }

    const onSeeked = () => {
      // Never treat a requested seek as complete until the browser has decoded it.
      // If scroll advanced while decoding, immediately seek to the latest target.
      if (Math.round(el.currentTime * FRAME_RATE) !== desiredFrame()) scheduleSeek()
    }

    const mediaQuery = window.matchMedia(VIDEO_BREAKPOINT)
    const setVideoSource = () => {
      const nextSource = mediaQuery.matches
        ? '/video/glasscube-scroll-mobile.mp4'
        : '/video/glasscube-scroll.mp4'
      const currentSource = el.getAttribute('src')
      if (currentSource === nextSource) {
        onScroll()
        return
      }
      duration = 0
      frameCount = 0
      requestedFrame = -1
      el.pause()
      el.src = nextSource
      el.load()
    }

    el.addEventListener('loadedmetadata', onMetadata)
    el.addEventListener('durationchange', onMetadata)
    el.addEventListener('seeked', onSeeked)
    el.addEventListener('error', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.visualViewport?.addEventListener('resize', onScroll, { passive: true })
    mediaQuery.addEventListener('change', setVideoSource)

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(onScroll)
      : null
    resizeObserver?.observe(host)
    resizeObserver?.observe(stickyStage)

    setVideoSource()
    if (el.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata()

    return () => {
      disposed = true
      el.removeEventListener('loadedmetadata', onMetadata)
      el.removeEventListener('durationchange', onMetadata)
      el.removeEventListener('seeked', onSeeked)
      el.removeEventListener('error', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.visualViewport?.removeEventListener('resize', onScroll)
      mediaQuery.removeEventListener('change', setVideoSource)
      resizeObserver?.disconnect()
      if (seekRaf) cancelAnimationFrame(seekRaf)
      if (sampleRaf) cancelAnimationFrame(sampleRaf)
    }
  }, [])

  return <section ref={section} className="scroll-story" aria-label="Zidwix introduction">
    <div ref={stage} className="scroll-story__stage">
      <video ref={video} className="scroll-story__video" muted playsInline preload="metadata" aria-hidden="true" />
      <div className="scroll-story__shade" />
      <div ref={node => { panels.current[0] = node }} className="story-panel is-active" aria-hidden="false">
        <div className="eyebrow">AI Automation &amp; Business Technology</div>
        <h1>Your business has problems. We build <span className="g">the solutions.</span></h1>
        <p className="lead">From websites and software to AI automation and data insights, we build practical technology that helps your business move forward.</p>
        <div className="row"><Btn to="/contact" variant="light">Let’s solve your problem</Btn><Btn to="/solutions" variant="ghost">Explore our solutions</Btn></div>
      </div>
      <div ref={node => { panels.current[1] = node }} className="story-panel story-panel--problem" aria-hidden="true">
        <h2>Businesses don’t have one problem. They have a chain of them.</h2>
        <p className="lead">Disconnected tools. Repetitive work. Inefficient workflows. Unclear data. Business problems rarely exist in isolation. We help you understand the bigger picture, identify what needs to change, and build the right technology to make it work better.</p>
        <Btn to="/about" variant="ghost">Discover how we work</Btn>
        <div className="story-chain">{[['gear', 'Disconnected tools'], ['chart', 'Repetitive work'], ['bolt', 'Inefficient workflows'], ['target', 'Unclear data']].map(([icon, text]) => <div className="story-chip" key={text}><Ico n={icon} plain />{text}</div>)}</div>
      </div>
      <div ref={node => { panels.current[2] = node }} className="story-panel story-panel--wide" aria-hidden="true">
        <h2>Our solutions turn complexity into opportunity.</h2>
        <p className="lead">Practical, scalable and intelligent systems built around real business needs.</p>
        <div className="story-cards story-solutions">{SV.map((s, i) => <article className="story-card story-solution" key={s.title}><div className="story-solution__visual"><img src={`/img/${s.img}.jpg`} alt="" /><span className="story-solution__index">0{i + 1}</span><span className="story-solution__glint" /></div><div className="story-solution__copy"><h3>{s.title}</h3><p>{s.desc}</p></div></article>)}</div>
      </div>
      <div ref={node => { panels.current[3] = node }} className="story-panel story-panel--wide" aria-hidden="true">
        <h2>From business challenges to working solutions.</h2>
        <p className="lead">No unnecessary complexity. Just a clear process built around your business needs.</p>
        <div className="story-cards story-cards--steps">{steps.map(([Icon, title, desc], i) => <article className="story-card story-step" key={title}><div className="story-step__number">0{i + 1}</div><span className="ico"><Icon className="i" /></span><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </div>
    </div>
  </section>
}
