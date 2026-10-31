import { useState } from 'react'
import { Hero, ReferenceCta, Proj } from '../components/ui'
import { PR } from '../data'
import { Monitor, Settings, BarChart3 } from 'lucide-react'
const F = ['All', 'Websites', 'Web Apps', 'Dashboards', 'AI Tools', 'Mobile Apps']
export default function Work() {
  const [f, setF] = useState('All'), [tab, setTab] = useState(0)
  const tabs = [[Monitor, 'Digital Products'], [Settings, 'AI & Automation'], [BarChart3, 'Data & Intelligence']] as const
  return (<>
    <Hero eyebrow="Zidwix / Work" title="Ideas made tangible." lead="A look at the digital experiences, intelligent systems and practical solutions we build." extra={<div className="tabs" role="tablist">{tabs.map(([I, t], i) => <button key={t} role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)} style={{ background: 'none', border: 0, padding: '10px 0', display: 'flex', gap: 8, alignItems: 'center', font: 'inherit', fontSize: '.85rem' }}><I className="i" />{t}</button>)}</div>} image="/img/work-hero.webp" />
    <section><div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}><div className="chips">{F.map(c => <button key={c} className={`chip ${f === c ? 'on' : ''}`} onClick={() => setF(c)}>{c}</button>)}</div><span className="sm">Selected projects</span></div>
      <div className="grid c3">{PR.map((p, i) => (f === 'All' || p.filter === f) && <Proj key={p.title} p={p} i={i} />)}</div></section>
    <ReferenceCta /></>)
}
