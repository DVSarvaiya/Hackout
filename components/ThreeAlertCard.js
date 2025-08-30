'use client'

import { Html } from '@react-three/drei'

export default function ThreeAlertCard({ position, alert }) {
  const colors = {
    high: '#dc2626',    // red
    medium: '#f59e0b',  // amber
    low: '#10b981'      // green
  }

  return (
    <group position={position}>
      {/* Cuboid */}
      <mesh>
        <boxGeometry args={[4, 2.2, 0.4]} />
        <meshStandardMaterial color={colors[alert.priority] || '#3b82f6'} />
      </mesh>

      {/* Label on front */}
      <Html
        position={[0, 0, 0.21]} // slightly in front of the cuboid
        center
        distanceFactor={5} // scales HTML size based on camera
        transform
      >
        <div className="text-white text-sm font-medium p-2 text-center w-48 leading-tight">
          <div className="text-lg font-bold">{alert.title}</div>
          <div>{alert.type}</div>
          <div className="text-xs italic mt-1">{alert.location}</div>
        </div>
      </Html>
    </group>
  )
}
