'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

export default function ThreeScene() {
  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <mesh rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
