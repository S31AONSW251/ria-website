import * as THREE from 'three'
import { createDepthDataGrid } from './DepthDataGrid'
import { createNeuralParticleField } from './NeuralParticleField'

type ParticleFieldOptions = {
  compact: boolean
  lowPower: boolean
  reducedMotion: boolean
}

export function createRiaDataParticleField(options: ParticleFieldOptions) {
  const group = new THREE.Group()
  group.name = 'RIA cinematic data field'

  const particles = createNeuralParticleField(options)
  const depthGrid = createDepthDataGrid({
    compact: options.compact,
    reducedMotion: options.reducedMotion
  })

  group.add(particles.group, depthGrid.group)

  return {
    group,
    update(elapsed: number, delta: number, pointer: THREE.Vector2) {
      particles.update(elapsed, delta, pointer)
      depthGrid.update(elapsed, delta, pointer)
    }
  }
}
