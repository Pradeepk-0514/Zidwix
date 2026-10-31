import { Link } from 'react-router-dom'
import { ReferenceCta, Why, Proj } from '../components/ui'
import ScrollHero from '../components/ScrollHero'
import { SV, PR } from '../data'
export default function Home() {
  return (<>
    <ScrollHero />
    <section><div className="row" style={{ justifyContent: 'space-between', alignItems: 'end', marginBottom: 34 }}><div><div className="eyebrow">Selected work</div><h2>Ideas made tangible.</h2></div><Link className="btn ghost" to="/work">Explore our work</Link></div><div className="grid c3">{[0, 2, 1].map(i => <Proj key={i} p={PR[i]} i={i} />)}</div></section>
    <Why /><ReferenceCta />
  </>)
}
