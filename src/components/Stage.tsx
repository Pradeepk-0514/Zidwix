import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Kind } from './Scene'
import { reduced } from '../lib/smooth'
const Scene = lazy(() => import('./Scene'))
const hasGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }
export default function Stage({ kind, className = '' }: { kind: Kind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false), [ready, setReady] = useState(false)
  const gl = useMemo(hasGL, []), still = useMemo(reduced, [])
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(e => setActive(e[0].isIntersecting), { rootMargin: '100px' }); io.observe(el); return () => io.disconnect() }, [])
  return (
    <div ref={ref} className={`stage ${ready ? 'ready' : ''} ${gl ? '' : 'nogl'} ${className}`} aria-hidden="true">
      {gl && <Suspense fallback={null}><Scene kind={kind} active={active} still={still} onReady={() => setReady(true)} /></Suspense>}
    </div>
  )
}
