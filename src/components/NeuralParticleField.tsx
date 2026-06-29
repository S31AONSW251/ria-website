import * as THREE from 'three'

type NeuralParticleFieldOptions = {
  compact: boolean
  lowPower: boolean
  reducedMotion: boolean
}

const createSeededRandom = () => {
  let seed = 11837
  return () => {
    seed = (seed * 48271) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const pushCylinderCloud = (
  target: number[],
  count: number,
  random: () => number,
  radiusRange: [number, number],
  yRange: [number, number],
  zDepth = 1
) => {
  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const radius = mix(radiusRange[0], radiusRange[1], Math.pow(random(), 0.85))
    const y = mix(yRange[0], yRange[1], random())
    target.push(
      Math.cos(angle) * radius,
      y,
      (Math.sin(angle) * radius - 0.9) * zDepth
    )
  }
}

const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

const pushOrbitalBand = (
  target: number[],
  count: number,
  random: () => number,
  radius: number,
  yCenter: number,
  ySpread: number
) => {
  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const bandRadius = radius * (0.84 + random() * 0.24)
    target.push(
      Math.cos(angle) * bandRadius,
      yCenter + (random() - 0.5) * ySpread,
      Math.sin(angle) * bandRadius * 0.72
    )
  }
}

export function createNeuralParticleField({
  compact,
  lowPower,
  reducedMotion
}: NeuralParticleFieldOptions) {
  const group = new THREE.Group()
  const random = createSeededRandom()

  const farFieldPositions: number[] = []
  const nearFieldPositions: number[] = []

  pushCylinderCloud(
    farFieldPositions,
    compact ? 320 : lowPower ? 520 : 820,
    random,
    compact ? [1.8, 4.4] : [2.4, 6.3],
    [-4.4, 5.8],
    0.88
  )

  pushOrbitalBand(nearFieldPositions, compact ? 80 : 160, random, compact ? 1.25 : 1.7, 2.5, 0.45)
  pushOrbitalBand(nearFieldPositions, compact ? 110 : 210, random, compact ? 1.7 : 2.15, 1.1, 0.8)
  pushOrbitalBand(nearFieldPositions, compact ? 60 : 140, random, compact ? 1.95 : 2.55, -1.4, 1.1)

  const farFieldGeometry = new THREE.BufferGeometry()
  farFieldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(farFieldPositions, 3))
  const farField = new THREE.Points(
    farFieldGeometry,
    new THREE.PointsMaterial({
      color: 0x7ad4e5,
      size: compact ? 0.016 : 0.014,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
  )

  const nearFieldGeometry = new THREE.BufferGeometry()
  nearFieldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nearFieldPositions, 3))
  const nearField = new THREE.Points(
    nearFieldGeometry,
    new THREE.PointsMaterial({
      color: 0xdafcff,
      size: compact ? 0.024 : 0.02,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
  )

  const orbitLines: THREE.LineLoop[] = []
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7ed4e4,
    transparent: true,
    opacity: 0.14,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  ;[
    { radiusX: compact ? 1.65 : 2.2, radiusY: compact ? 2.5 : 3.2, y: 0.35, z: -0.2 },
    { radiusX: compact ? 2.3 : 3.1, radiusY: compact ? 3.2 : 4.2, y: -0.25, z: -0.65 }
  ].forEach(({ radiusX, radiusY, y, z }, index) => {
    const points: THREE.Vector3[] = []
    const steps = 80

    for (let step = 0; step < steps; step += 1) {
      const angle = (step / steps) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radiusX, y + Math.sin(angle * 0.5) * 0.08, z + Math.sin(angle) * radiusY * 0.28))
    }

    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      lineMaterial.clone()
    )
    line.rotation.x = index === 0 ? 0.35 : 0.58
    orbitLines.push(line)
    group.add(line)
  })

  group.add(farField, nearField)

  return {
    group,
    update(elapsed: number, _delta: number, pointer: THREE.Vector2) {
      group.rotation.y = reducedMotion ? 0 : elapsed * 0.018 + pointer.x * 0.08
      group.rotation.x = reducedMotion ? 0 : pointer.y * -0.05
      nearField.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.32) * 0.05
      farField.material.opacity = 0.24 + (reducedMotion ? 0 : Math.sin(elapsed * 0.24) * 0.04)
      orbitLines.forEach((line, index) => {
        line.rotation.z = elapsed * (index === 0 ? 0.045 : -0.03)
      })
    }
  }
}
