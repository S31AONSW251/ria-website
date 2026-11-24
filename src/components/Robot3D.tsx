import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Robot() {
  const { scene } = useGLTF('/models/ria/RIA_robot.glb')
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.15
    ref.current.position.y = Math.sin(t * 0.8) * 0.03
  })
  return <primitive ref={ref} object={scene} />
}

export default function Robot3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Robot />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
