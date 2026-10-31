import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
export type Kind = 'cubes' | 'orbit' | 'sphere'
const rng = (s: number) => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  const { size } = useThree()
  useFrame(({ pointer, clock, camera }) => {
    camera.position.z = size.width / size.height < 1 ? 15 : 11
    if (!g.current) return
    g.current.rotation.y = (still ? 0.6 : clock.elapsedTime * 0.15) + pointer.x * 1.1
    g.current.rotation.x = 0.25 - pointer.y * 0.4
  })
  return <group ref={g}>{children}</group>
}
const Ring = ({ r, t = 0.02, rot, o = 0.9 }: { r: number; t?: number; rot: [number, number, number]; o?: number }) => (
  <mesh rotation={rot}><torusGeometry args={[r, t, 8, 120]} /><meshStandardMaterial color="#8d97a6" transparent opacity={o} metalness={0.5} roughness={0.3} /></mesh>
)
function Cubes() {
  const items = useMemo(() => { const r = rng(42); return Array.from({ length: 22 }, () => { const a = r() * 6.28, d = 2 + r() * 2.2; return { s: 0.35 + r() * 0.9, p: [Math.cos(a) * d * 1.2, (r() - 0.5) * 3.6, Math.sin(a) * d * 0.6] as [number, number, number], dark: r() < 0.2, o: r() < 0.5 ? 0.45 : 0.95, rot: [r() * 0.4, r() * 0.6, 0] as [number, number, number] } }) }, [])
  return (<>
    <mesh><boxGeometry args={[2.3, 2.3, 2.3]} /><meshStandardMaterial color="#1a1f27" metalness={0.7} roughness={0.25} /></mesh>
    {items.map((c, i) => (<Float key={i} speed={1.2} floatIntensity={0.6} rotationIntensity={0.4}><mesh position={c.p} rotation={c.rot}><boxGeometry args={[c.s, c.s, c.s]} /><meshStandardMaterial color={c.dark ? '#232a35' : '#f2f5f9'} transparent opacity={c.o} roughness={0.2} metalness={0.2} /></mesh></Float>))}
    <Ring r={5.2} t={0.015} rot={[1.35, 0.1, -0.15]} />
  </>)
}
function Sphere() {
  return (<>
    <mesh><sphereGeometry args={[1.9, 48, 48]} /><meshStandardMaterial color="#dfe6ef" transparent opacity={0.55} roughness={0.08} metalness={0.6} /></mesh>
    <mesh><sphereGeometry args={[1.1, 32, 32]} /><meshStandardMaterial color="#1b212b" metalness={0.7} roughness={0.25} /></mesh>
    <Ring r={3} rot={[0.4, 0, 0]} /><Ring r={3.5} t={0.018} rot={[1.2, 0, 0.6]} />
    <Float><mesh position={[-2.6, -1.2, 1]}><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial color="#cdd4de" metalness={0.8} roughness={0.2} /></mesh></Float>
  </>)
}
function Orbit() {
  return (<>{[1, 2, 3, 4].map(i => <Ring key={i} r={i * 0.7} t={0.008} rot={[Math.PI / 2.3, 0, 0]} o={0.7} />)}<mesh><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial color="#12161d" roughness={0.3} /></mesh></>)
}
export default function Scene({ kind, active, still, onReady }: { kind: Kind; active: boolean; still: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.2, 11], fov: 35 }} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} onCreated={onReady}>
      <ambientLight intensity={0.75} /><directionalLight position={[5, 8, 6]} intensity={1.1} /><pointLight position={[-6, -2, 4]} intensity={0.6} />
      <Environment resolution={64}><Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 4, 1]} /><Lightformer intensity={1} position={[-5, 1, 2]} scale={[4, 6, 1]} /></Environment>
      <Rig still={still}>{kind === 'cubes' ? <Cubes /> : kind === 'sphere' ? <Sphere /> : <Orbit />}</Rig>
    </Canvas>
  )
}
