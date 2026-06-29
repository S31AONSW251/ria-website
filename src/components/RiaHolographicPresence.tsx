import * as THREE from 'three'
import { createFemaleIntelligenceBody } from './FemaleIntelligenceBody'

type PresenceOptions = {
  compact: boolean
  lowPower: boolean
  reducedMotion: boolean
}

export function createRiaHolographicPresence(options: PresenceOptions) {
  const body = createFemaleIntelligenceBody(options)
  const group = new THREE.Group()
  group.name = 'RIA holographic intelligence presence'
  group.add(body.group)

  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: 0xa8f5ff,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    wireframe: true
  })

  const neuralField = new THREE.Mesh(
    new THREE.IcosahedronGeometry(options.compact ? 0.24 : 0.29, options.lowPower ? 2 : 3),
    fieldMaterial
  )
  neuralField.position.set(0, 2.58, 0.06)
  group.add(neuralField)

  const memoryLight = new THREE.PointLight(0xb8f8ff, options.compact ? 4 : 6, 4.2, 2)
  memoryLight.position.set(0, 1.06, 0.6)
  group.add(memoryLight)

  const brainLight = new THREE.PointLight(0x8deeff, options.compact ? 4 : 6, 3.8, 2)
  brainLight.position.set(0, 2.58, 0.42)
  group.add(brainLight)

  return {
    group,
    update(elapsed: number, delta: number, pointer: THREE.Vector2) {
      body.update(elapsed, delta, pointer)
      neuralField.rotation.x = elapsed * 0.045
      neuralField.rotation.y = elapsed * 0.075

      if (!options.reducedMotion) {
        const pulse = 1 + Math.sin(elapsed * 0.82) * 0.035
        neuralField.scale.setScalar(pulse)
        memoryLight.intensity = (options.compact ? 4 : 6) + Math.sin(elapsed * 1.1) * 0.55
        brainLight.intensity = (options.compact ? 4 : 6) + Math.sin(elapsed * 0.74) * 0.45
      }
    }
  }
}
