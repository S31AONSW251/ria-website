import * as THREE from 'three'

type HologramBodyOptions = {
  compact: boolean
  lowPower: boolean
  reducedMotion: boolean
}

type PulseMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: {
    curve: THREE.CatmullRomCurve3
    offset: number
    speed: number
  }
}

const createSeededRandom = () => {
  let seed = 73021
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const ellipsoidPoints = (
  target: number[],
  center: THREE.Vector3,
  scale: THREE.Vector3,
  count: number,
  random: () => number
) => {
  for (let index = 0; index < count; index += 1) {
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    const variance = 0.84 + random() * 0.24

    target.push(
      center.x + Math.sin(phi) * Math.cos(theta) * scale.x * variance,
      center.y + Math.cos(phi) * scale.y * variance,
      center.z + Math.sin(phi) * Math.sin(theta) * scale.z * variance
    )
  }
}

const tubePoints = (
  target: number[],
  curve: THREE.CatmullRomCurve3,
  radius: number,
  count: number,
  random: () => number
) => {
  const frames = curve.computeFrenetFrames(90, false)

  for (let index = 0; index < count; index += 1) {
    const t = random()
    const frameIndex = Math.min(89, Math.floor(t * 90))
    const point = curve.getPointAt(t)
    const angle = random() * Math.PI * 2
    const distance = radius * (0.66 + random() * 0.42)

    point.add(frames.normals[frameIndex].clone().multiplyScalar(Math.cos(angle) * distance))
    point.add(frames.binormals[frameIndex].clone().multiplyScalar(Math.sin(angle) * distance))
    target.push(point.x, point.y, point.z)
  }
}

const makeCurve = (points: Array<[number, number, number]>) =>
  new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, 'catmullrom', 0.5)

export function createHologramIntelligenceBody({
  compact,
  lowPower,
  reducedMotion
}: HologramBodyOptions) {
  const group = new THREE.Group()
  const animatedRoot = new THREE.Group()
  group.add(animatedRoot)

  const glowShellMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xa1ebf4,
    emissive: 0x143744,
    emissiveIntensity: 0.44,
    transparent: true,
    opacity: 0.07,
    roughness: 0.14,
    metalness: 0.03,
    transmission: 0.72,
    thickness: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const wireShellMaterial = new THREE.MeshBasicMaterial({
    color: 0x8fe4ef,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const lineMaterial = new THREE.MeshBasicMaterial({
    color: 0xcffcff,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const lineGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x77d6e6,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const addShell = (
    geometry: THREE.BufferGeometry,
    position: [number, number, number],
    scale: [number, number, number],
    material: THREE.Material
  ) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...position)
    mesh.scale.set(...scale)
    animatedRoot.add(mesh)
    return mesh
  }

  addShell(new THREE.SphereGeometry(1, 36, 28), [0, 2.6, 0.05], [0.62, 0.78, 0.58], glowShellMaterial)
  addShell(new THREE.SphereGeometry(1, 24, 18), [0, 2.6, 0.05], [0.66, 0.82, 0.61], wireShellMaterial)
  addShell(new THREE.SphereGeometry(1, 36, 26), [0, 1.08, 0], [1.04, 1.78, 0.62], glowShellMaterial)
  addShell(new THREE.SphereGeometry(1, 24, 18), [0, 1.08, 0], [1.08, 1.82, 0.66], wireShellMaterial)
  addShell(new THREE.SphereGeometry(1, 32, 20), [0, -1.12, 0.02], [0.82, 0.95, 0.56], glowShellMaterial)

  const spineCurve = makeCurve([
    [0, 2.05, 0.06],
    [0.02, 1.48, 0.08],
    [0.01, 0.62, 0.06],
    [0, -0.22, 0.03],
    [0, -1.2, 0]
  ])

  const leftContour = makeCurve([
    [-0.18, 2.2, 0.06],
    [-0.92, 1.68, 0.18],
    [-1.08, 0.38, 0.16],
    [-0.76, -1.25, 0.08],
    [-0.34, -2.92, 0.15]
  ])

  const rightContour = makeCurve([
    [0.18, 2.2, 0.06],
    [0.92, 1.68, 0.18],
    [1.08, 0.38, 0.16],
    [0.76, -1.25, 0.08],
    [0.34, -2.92, 0.15]
  ])

  const leftArm = makeCurve([
    [-0.72, 1.7, 0.05],
    [-1.38, 1.18, 0.15],
    [-1.62, 0.22, 0.22],
    [-1.15, -0.75, 0.18]
  ])

  const rightArm = makeCurve([
    [0.72, 1.7, 0.05],
    [1.38, 1.18, 0.15],
    [1.62, 0.22, 0.22],
    [1.15, -0.75, 0.18]
  ])

  const shoulderBridge = makeCurve([
    [-0.76, 1.62, 0.08],
    [-0.24, 1.94, 0.14],
    [0.24, 1.94, 0.14],
    [0.76, 1.62, 0.08]
  ])

  const hipBridge = makeCurve([
    [-0.54, -0.42, 0.08],
    [-0.18, -0.74, 0.1],
    [0.18, -0.74, 0.1],
    [0.54, -0.42, 0.08]
  ])

  const legLeft = makeCurve([
    [-0.18, -1.18, 0.06],
    [-0.32, -1.86, 0.08],
    [-0.28, -2.56, 0.12],
    [-0.22, -3.34, 0.16]
  ])

  const legRight = makeCurve([
    [0.18, -1.18, 0.06],
    [0.32, -1.86, 0.08],
    [0.28, -2.56, 0.12],
    [0.22, -3.34, 0.16]
  ])

  const structuralCurves = [spineCurve, leftContour, rightContour, leftArm, rightArm, shoulderBridge, hipBridge, legLeft, legRight]

  structuralCurves.forEach((curve, index) => {
    const radius = index === 0 ? 0.038 : index <= 2 ? 0.028 : 0.02
    const glowRadius = index === 0 ? radius * 2.5 : radius * 2.9
    animatedRoot.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, radius, 12, false), lineMaterial))
    animatedRoot.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, glowRadius, 10, false), lineGlowMaterial))
  })

  const particlePositions: number[] = []
  const random = createSeededRandom()
  ellipsoidPoints(particlePositions, new THREE.Vector3(0, 2.6, 0.04), new THREE.Vector3(0.62, 0.8, 0.58), compact ? 240 : lowPower ? 360 : 520, random)
  ellipsoidPoints(particlePositions, new THREE.Vector3(0, 1.02, 0), new THREE.Vector3(1.04, 1.74, 0.6), compact ? 420 : lowPower ? 620 : 960, random)
  ellipsoidPoints(particlePositions, new THREE.Vector3(0, -1.05, 0.02), new THREE.Vector3(0.82, 0.95, 0.56), compact ? 150 : lowPower ? 240 : 360, random)
  ;[leftContour, rightContour, leftArm, rightArm, legLeft, legRight].forEach((curve) => {
    tubePoints(particlePositions, curve, compact ? 0.12 : 0.15, compact ? 80 : 140, random)
  })

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3))
  const bodyParticles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xd7feff,
      size: compact ? 0.02 : 0.018,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
  )
  animatedRoot.add(bodyParticles)

  const spineGlow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.13, 3.95, 14, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x9af0fb,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )
  spineGlow.position.set(0, 0.2, 0.04)
  animatedRoot.add(spineGlow)

  const brainGroup = new THREE.Group()
  brainGroup.position.set(0, 2.62, 0.06)
  animatedRoot.add(brainGroup)

  const brainCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(compact ? 0.28 : 0.32, 3),
    new THREE.MeshBasicMaterial({
      color: 0xe9ffff,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )

  const brainWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(compact ? 0.44 : 0.5, 2),
    new THREE.MeshBasicMaterial({
      color: 0x98eaf4,
      wireframe: true,
      transparent: true,
      opacity: 0.44,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )

  const brainHalo = new THREE.Mesh(
    new THREE.SphereGeometry(compact ? 0.72 : 0.86, 24, 18),
    new THREE.MeshBasicMaterial({
      color: 0x7fd9ea,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )

  const brainRingA = new THREE.Mesh(
    new THREE.TorusGeometry(compact ? 0.7 : 0.82, 0.01, 8, 96),
    new THREE.MeshBasicMaterial({
      color: 0x9beaf3,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )
  brainRingA.rotation.x = 1.38

  const brainRingB = brainRingA.clone()
  brainRingB.rotation.set(0.38, 0, 1.12)
  brainRingB.material = (brainRingA.material as THREE.MeshBasicMaterial).clone()
  ;(brainRingB.material as THREE.MeshBasicMaterial).opacity = 0.14

  brainGroup.add(brainHalo, brainCore, brainWire, brainRingA, brainRingB)

  const memoryCoreGroup = new THREE.Group()
  memoryCoreGroup.position.set(0, 1.05, 0.12)
  animatedRoot.add(memoryCoreGroup)

  const memoryGlow = new THREE.Mesh(
    new THREE.SphereGeometry(compact ? 0.44 : 0.56, 24, 18),
    new THREE.MeshBasicMaterial({
      color: 0x86dcf0,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )

  const memoryCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(compact ? 0.18 : 0.22, 1),
    new THREE.MeshBasicMaterial({
      color: 0xe8ffff,
      transparent: true,
      opacity: 0.64,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )

  const memoryRing = new THREE.Mesh(
    new THREE.TorusGeometry(compact ? 0.34 : 0.42, 0.01, 8, 80),
    new THREE.MeshBasicMaterial({
      color: 0xa3f1f7,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )
  memoryRing.rotation.x = 1.56

  const memoryRingVertical = memoryRing.clone()
  memoryRingVertical.rotation.set(0.25, 0.55, 0.9)
  memoryRingVertical.material = (memoryRing.material as THREE.MeshBasicMaterial).clone()
  ;(memoryRingVertical.material as THREE.MeshBasicMaterial).opacity = 0.12

  memoryCoreGroup.add(memoryGlow, memoryCore, memoryRing, memoryRingVertical)

  const pulses: PulseMesh[] = []
  ;[spineCurve, leftContour, rightContour, leftArm, rightArm].forEach((curve, index) => {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.042, 12, 10),
      new THREE.MeshBasicMaterial({
        color: 0xf6ffff,
        transparent: true,
        opacity: 0.84,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    ) as PulseMesh
    pulse.userData = {
      curve,
      offset: index * 0.18,
      speed: 0.05 + index * 0.006
    }
    pulses.push(pulse)
    animatedRoot.add(pulse)
  })

  const anchorNodes: THREE.Mesh[] = []
  for (let index = 0; index < 9; index += 1) {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(index === 8 ? 0.05 : 0.03, 10, 8),
      new THREE.MeshBasicMaterial({
        color: 0xdeffff,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    )
    node.position.copy(spineCurve.getPointAt(index / 8))
    anchorNodes.push(node)
    animatedRoot.add(node)
  }

  return {
    group,
    update(elapsed: number, _delta: number, pointer: THREE.Vector2) {
      const pointerX = reducedMotion ? 0 : pointer.x
      const pointerY = reducedMotion ? 0 : pointer.y

      animatedRoot.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.42) * 0.08
      animatedRoot.rotation.y = pointerX * 0.18 + (reducedMotion ? 0 : Math.sin(elapsed * 0.16) * 0.12)
      animatedRoot.rotation.x = pointerY * -0.1
      brainGroup.scale.setScalar(1 + (reducedMotion ? 0 : Math.sin(elapsed * 1.2) * 0.05))
      brainWire.rotation.y = elapsed * 0.18
      brainWire.rotation.x = elapsed * 0.08
      brainRingA.rotation.z = elapsed * 0.12
      brainRingB.rotation.y = -elapsed * 0.08

      memoryCoreGroup.rotation.y = reducedMotion ? 0 : elapsed * 0.22
      memoryCoreGroup.scale.setScalar(1 + (reducedMotion ? 0 : Math.sin(elapsed * 1.35 + 0.6) * 0.06))

      pulses.forEach((pulse) => {
        const position = pulse.userData.curve.getPointAt((elapsed * pulse.userData.speed + pulse.userData.offset) % 1)
        pulse.position.copy(position)
        pulse.scale.setScalar(0.82 + (reducedMotion ? 0 : Math.sin(elapsed * 3 + pulse.userData.offset * 8) * 0.16))
      })

      const particleMaterial = bodyParticles.material
      particleMaterial.opacity = 0.52 + (reducedMotion ? 0 : Math.sin(elapsed * 0.75) * 0.04)
      spineGlow.scale.y = 1 + (reducedMotion ? 0 : Math.sin(elapsed * 1.05) * 0.05)
    }
  }
}
