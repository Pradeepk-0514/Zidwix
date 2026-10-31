import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Hero, ReferenceCta, Why, Ico } from '../components/ui'
import { SV, img } from '../data'
export default function Solutions() {
  return (<>
    <Hero eyebrow="Zidwix / Solutions" title="Technology built around your business." lead="From digital products and custom software to AI automation and data intelligence, we build practical solutions around your business needs." actions={<a className="btn" href="#svc">Explore Our Solutions <ArrowRight className="i" /></a>} image="/img/solution-hero.webp" />
    <section id="svc" className="solution-services">
      <div className="solution-shortcuts">{SV.map(s => <Link to={`/solutions#${s.slug}`} className="solution-shortcut card rv" key={s.title}><span className="solution-shortcut__icon"><Ico n={s.icon} plain /></span><span className="solution-shortcut__text"><strong>{s.title}</strong><small>{s.short}</small></span><ArrowRight className="i solution-shortcut__arrow" /></Link>)}</div>
      <div className="solution-services__heading"><div className="eyebrow">Our services</div><h2>Tailored solutions for real business needs.</h2></div>
      <div className="service-list">{SV.map((s, i) => <article className="service-card card rv" id={s.slug} key={s.title}>
        <div className="service-card__number">0{i + 1}.</div>
        <div className="service-card__content"><div className="service-card__title"><span className="solution-shortcut__icon"><Ico n={s.icon} plain /></span><h3>{s.title}</h3></div><p className="service-card__description">{s.desc}</p><div className="service-card__deliverables"><strong>Deliverables:</strong><ul>{s.items.map(item => <li key={item}>{item}</li>)}</ul></div></div>
        <div className="service-card__image"><img src={img(`${s.img}-hd`)} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = img(s.img) }} alt={`${s.title} service preview`} loading={i === 0 ? 'eager' : 'lazy'} /></div>
      </article>)}</div>
    </section>
    <Why /><ReferenceCta /></>)
}
