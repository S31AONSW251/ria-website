import * as THREE from 'three'

type FemaleBodyOptions = {
  compact: boolean
  lowPower: boolean
  reducedMotion: boolean
}

type OrbitNode = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: {
    radius: number
    y: number
    speed: number
    offset: number
    zScale: number
  }
}

type MemoryFlowParticle = {
  mesh: THREE.Mesh
  speed: number
  progress: number
  origin: THREE.Vector3
  target: THREE.Vector3
}

type ActionFlowParticle = {
  mesh: THREE.Mesh
  speed: number
  progress: number
  direction: THREE.Vector3
  origin: THREE.Vector3
}

const makeCurve = (points: Array<[number, number, number]>) =>
  new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, 'catmullrom', 0.48)

const createSeededRandom = () => {
  let seed = 92173
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const addScaledMesh = (
  parent: THREE.Group,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: [number, number, number],
  scale: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0]
) => {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...position)
  mesh.scale.set(...scale)
  mesh.rotation.set(...rotation)
  parent.add(mesh)
  return mesh
}

const addTube = (
  parent: THREE.Group,
  curve: THREE.CatmullRomCurve3,
  radius: number,
  material: THREE.Material,
  segments = 90
) => {
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, 14, false), material)
  parent.add(mesh)
  return mesh
}

const pushEllipsoidPoints = (
  target: number[],
  center: THREE.Vector3,
  scale: THREE.Vector3,
  count: number,
  random: () => number
) => {
  for (let index = 0; index < count; index += 1) {
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    const variance = 0.86 + random() * 0.2
    target.push(
      center.x + Math.sin(phi) * Math.cos(theta) * scale.x * variance,
      center.y + Math.cos(phi) * scale.y * variance,
      center.z + Math.sin(phi) * Math.sin(theta) * scale.z * variance
    )
  }
}

const pushTorsoSurfacePoints = (target: number[], count: number, random: () => number) => {
  for (let index = 0; index < count; index += 1) {
    const y = -1.18 + random() * 2.98
    const waist = Math.exp(-((y - 0.12) ** 2) / 0.55) * 0.22
    const chest = Math.exp(-((y - 1.05) ** 2) / 0.34) * 0.18
    const hip = Math.exp(-((y + 0.9) ** 2) / 0.35) * 0.18
    const shoulder = Math.exp(-((y - 1.58) ** 2) / 0.18) * 0.24
    const radius = 0.52 - waist + chest + hip + shoulder
    const angle = random() * Math.PI * 2
    const depthScale = 0.54

    target.push(
      Math.cos(angle) * radius * (0.94 + random() * 0.12),
      y,
      Math.sin(angle) * radius * depthScale * (0.9 + random() * 0.16)
    )
  }
}

export function createFemaleIntelligenceBody({
  compact,
  lowPower,
  reducedMotion
}: FemaleBodyOptions) {
  const group = new THREE.Group()
  const figure = new THREE.Group()
  group.add(figure)

  const random = createSeededRandom()

  // Premium, glass-like physical material for body shell
  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x214f5d,
    emissive: 0x0b2731,
    emissiveIntensity: 0.62,
    transparent: true,
    opacity: 0.56,
    roughness: 0.28,
    metalness: 0.04,
    transmission: 0.34,
    thickness: 1.15,
    ior: 1.2,
    side: THREE.DoubleSide,
    depthWrite: false
  })

  const skinInnerMaterial = new THREE.MeshBasicMaterial({
    color: 0xe6fdff,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  })

  const lineMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8fbff,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const softLineMaterial = new THREE.MeshBasicMaterial({
    color: 0x5ee7f0,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const hairMaterial = new THREE.MeshBasicMaterial({
    color: 0x5ee7f0,
    transparent: true,
    opacity: 0.085,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8fbff,
    transparent: true,
    opacity: 0.44,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x8cebf5,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const faceMaterial = skinMaterial.clone()
  faceMaterial.color.setHex(0x376f7d)
  faceMaterial.opacity = 0.44
  faceMaterial.transmission = 0.2

  // 1. Human silhouette body shell
  const head = addScaledMesh(
    figure,
    new THREE.SphereGeometry(1, 64, 42),
    skinMaterial,
    [0, 2.58, 0.08],
    [0.42, 0.54, 0.37]
  )

  addScaledMesh(
    figure,
    new THREE.SphereGeometry(1, 32, 22),
    faceMaterial,
    [0, 2.58, 0.08],
    [0.52, 0.66, 0.48]
  )

  addScaledMesh(
    figure,
    new THREE.CylinderGeometry(0.16, 0.2, 0.46, 32, 1, true),
    skinMaterial,
    [0, 2.03, 0.02],
    [1, 1, 0.82]
  )

  const torsoProfile = [
    [0.48, -1.18],
    [0.68, -0.92],
    [0.76, -0.58],
    [0.52, -0.1],
    [0.44, 0.32],
    [0.62, 0.82],
    [0.78, 1.12],
    [0.96, 1.45],
    [0.62, 1.72],
    [0.28, 1.88]
  ].map(([x, y]) => new THREE.Vector2(x, y))

  const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 96), skinMaterial)
  torso.scale.z = 0.52
  torso.position.set(0, 0, 0)
  figure.add(torso)

  const torsoGlow = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 64), skinInnerMaterial)
  torsoGlow.scale.set(1.06, 1.02, 0.6)
  figure.add(torsoGlow)

  const facePlane = addScaledMesh(
    figure,
    new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.54),
    skinInnerMaterial,
    [0, 2.52, 0.3],
    [0.34, 0.36, 0.12],
    [Math.PI * 0.08, 0, 0]
  )
  facePlane.rotation.x = -0.06

  addTube(figure, makeCurve([[-0.18, 2.63, 0.43], [-0.06, 2.66, 0.47], [0.08, 2.65, 0.47], [0.2, 2.63, 0.43]]), 0.007, glowMaterial, 30)
  addTube(figure, makeCurve([[0, 2.58, 0.45], [0.03, 2.48, 0.48], [0, 2.39, 0.45]]), 0.006, softLineMaterial, 24)
  addTube(figure, makeCurve([[-0.1, 2.34, 0.42], [0, 2.31, 0.44], [0.1, 2.34, 0.42]]), 0.005, softLineMaterial, 24)

  const shoulderCurve = makeCurve([[-0.98, 1.5, 0.02], [-0.48, 1.67, 0.08], [0, 1.72, 0.1], [0.48, 1.67, 0.08], [0.98, 1.5, 0.02]])
  addTube(figure, shoulderCurve, 0.045, lineMaterial)
  addTube(figure, shoulderCurve, 0.105, softLineMaterial)

  // 6. Spine reasoning pipeline
  const spineCurve = makeCurve([
    [0, 2.03, 0.02],
    [0.02, 1.4, 0.08],
    [0.01, 0.6, 0.06],
    [0, -0.22, 0.03],
    [0, -1.15, 0]
  ])
  addTube(figure, spineCurve, 0.025, glowMaterial)
  addTube(figure, spineCurve, 0.08, softLineMaterial)

  // 9. Nervous system glowing curves
  const limbCurves = [
    makeCurve([[-0.86, 1.44, 0.04], [-1.08, 0.72, 0.08], [-0.92, -0.08, 0.05], [-0.58, -0.62, 0.1]]),
    makeCurve([[0.86, 1.44, 0.04], [1.08, 0.72, 0.08], [0.92, -0.08, 0.05], [0.58, -0.62, 0.1]]),
    makeCurve([[-0.33, -1.03, 0.04], [-0.44, -1.78, 0.06], [-0.37, -2.52, 0.08], [-0.24, -3.16, 0.16]]),
    makeCurve([[0.33, -1.03, 0.04], [0.44, -1.78, 0.06], [0.37, -2.52, 0.08], [0.24, -3.16, 0.16]])
  ]

  limbCurves.forEach((curve, index) => {
    addTube(figure, curve, index < 2 ? 0.09 : 0.11, skinMaterial)
    addTube(figure, curve, index < 2 ? 0.018 : 0.02, lineMaterial)
  })

  // 7. Hands nodes
  const leftHandPos = new THREE.Vector3(-0.58, -0.67, 0.1)
  const rightHandPos = new THREE.Vector3(0.58, -0.67, 0.1)
  addScaledMesh(figure, new THREE.SphereGeometry(0.04, 24, 24), glowMaterial, [leftHandPos.x, leftHandPos.y, leftHandPos.z], [1, 1, 1])
  addScaledMesh(figure, new THREE.SphereGeometry(0.04, 24, 24), glowMaterial, [rightHandPos.x, rightHandPos.y, rightHandPos.z], [1, 1, 1])

  const hairStrands: THREE.Mesh[] = []
  const hairCount = compact ? 18 : lowPower ? 26 : 38
  for (let index = 0; index < hairCount; index += 1) {
    const side = index % 2 === 0 ? -1 : 1
    const spread = 0.18 + random() * 0.38
    const length = 1.25 + random() * 0.62
    const curve = makeCurve([
      [side * (0.12 + random() * 0.16), 2.98 - random() * 0.12, -0.05],
      [side * (0.32 + spread * 0.5), 2.48 - random() * 0.18, -0.12 - random() * 0.18],
      [side * (0.42 + spread), 1.86 - random() * 0.22, -0.2 - random() * 0.22],
      [side * (0.5 + spread * 0.8), 1.28 - length * 0.25, -0.16 - random() * 0.24]
    ])
    const strand = addTube(figure, curve, 0.006 + random() * 0.004, hairMaterial, 42)
    hairStrands.push(strand)
  }

  // 2. Brain core
  const brainCenter = new THREE.Vector3(0, 2.58, 0.11)
  const brainGlow = addScaledMesh(
    figure,
    new THREE.SphereGeometry(1, 32, 22),
    softLineMaterial,
    [brainCenter.x, brainCenter.y, brainCenter.z],
    [0.32, 0.39, 0.3]
  )

  const brainSphereCore = addScaledMesh(
    figure,
    new THREE.IcosahedronGeometry(0.09, 2),
    coreMaterial,
    [brainCenter.x, brainCenter.y, brainCenter.z],
    [1, 1, 1]
  )

  // 3. Eyes / knowledge layer (subtle glowing cyan points)
  const eyeL = addScaledMesh(
    figure,
    new THREE.SphereGeometry(0.016, 16, 16),
    glowMaterial,
    [-0.08, 2.56, 0.44],
    [1, 1, 1]
  )
  const eyeR = addScaledMesh(
    figure,
    new THREE.SphereGeometry(0.016, 16, 16),
    glowMaterial,
    [0.08, 2.56, 0.44],
    [1, 1, 1]
  )

  // 4. Chest memory core
  const chestCenter = new THREE.Vector3(0, 1.07, 0.2)
  const memoryCore = addScaledMesh(
    figure,
    new THREE.IcosahedronGeometry(compact ? 0.12 : 0.15, 2),
    coreMaterial,
    [chestCenter.x, chestCenter.y, chestCenter.z],
    [1, 1, 1]
  )
  const memoryHalo = addScaledMesh(
    figure,
    new THREE.SphereGeometry(1, 32, 18),
    softLineMaterial,
    [chestCenter.x, chestCenter.y, chestCenter.z],
    [0.34, 0.34, 0.34]
  )

  // 5. Heart reflection loop (smaller loop slightly to the left, y = 1.07)
  const heartCenter = new THREE.Vector3(-0.16, 1.07, 0.23)
  const heartLoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.008, 8, 48),
    softLineMaterial.clone()
  )
  heartLoop.position.copy(heartCenter)
  heartLoop.rotation.set(Math.PI * 0.15, Math.PI * 0.2, 0)
  figure.add(heartLoop)

  const heartCore = addScaledMesh(
    figure,
    new THREE.SphereGeometry(0.03, 16, 16),
    glowMaterial,
    [heartCenter.x, heartCenter.y, heartCenter.z],
    [1, 1, 1]
  )

  // 8. Privacy shell (large calm outer shield)
  const privacyShell = addScaledMesh(
    figure,
    new THREE.SphereGeometry(2.3, 40, 40),
    new THREE.MeshPhysicalMaterial({
    color: 0xc8fbff,
      transparent: true,
      opacity: 0.025,
      side: THREE.DoubleSide,
      depthWrite: false,
      roughness: 0.22,
      transmission: 0.85,
      thickness: 0.8
    }),
    [0, 0.6, 0.05],
    [1.0, 1.45, 0.85]
  )

  ;[
    { y: 2.58, radius: 0.58, z: 0.68 },
    { y: 1.08, radius: 0.64, z: 0.48 },
    { y: -0.58, radius: 0.76, z: 0.42 }
  ].forEach(({ y, radius, z }) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.008, 8, 128),
      softLineMaterial.clone()
    )
    ring.position.set(0, y, 0.05)
    ring.scale.z = z
    ring.rotation.x = Math.PI * 0.52
    figure.add(ring)
  })

  // Body particles
  const particlePositions: number[] = []
  pushEllipsoidPoints(
    particlePositions,
    new THREE.Vector3(0, 2.58, 0.08),
    new THREE.Vector3(0.42, 0.54, 0.36),
    compact ? 100 : lowPower ? 160 : 240,
    random
  )
  pushTorsoSurfacePoints(particlePositions, compact ? 260 : lowPower ? 420 : 660, random)
  ;[
    [-0.82, 1.18, 0.05],
    [0.82, 1.18, 0.05],
    [-0.36, -1.95, 0.08],
    [0.36, -1.95, 0.08]
  ].forEach(([x, y, z]) => {
    pushEllipsoidPoints(
      particlePositions,
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(0.14, 0.72, 0.12),
      compact ? 36 : 72,
      random
    )
  })

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3))
  const bodyParticles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xc8fbff,
      size: compact ? 0.016 : 0.012,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
  )
  figure.add(bodyParticles)

  const orbitNodes: OrbitNode[] = []
  const nodeCount = compact ? 8 : 13
  for (let index = 0; index < nodeCount; index += 1) {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(index % 3 === 0 ? 0.03 : 0.02, 14, 10),
      new THREE.MeshBasicMaterial({
        color: 0xc8fbff,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    ) as OrbitNode
    node.userData = {
      radius: 1.1 + random() * 1.35,
      y: -0.6 + random() * 3.3,
      speed: 0.04 + random() * 0.04,
      offset: random() * Math.PI * 2,
      zScale: 0.34 + random() * 0.22
    }
    orbitNodes.push(node)
    figure.add(node)
  }

  // Action flow particles moving outward from hands
  const actionParticlesList: ActionFlowParticle[] = []
  const actionParticleCount = compact ? 12 : 24
  const actionGeom = new THREE.SphereGeometry(0.015, 8, 8)
  const actionMat = new THREE.MeshBasicMaterial({
    color: 0xc8fbff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  for (let index = 0; index < actionParticleCount; index += 1) {
    const isLeft = index % 2 === 0
    const mesh = new THREE.Mesh(actionGeom, actionMat)
    const origin = isLeft ? leftHandPos : rightHandPos
    mesh.position.copy(origin)
    figure.add(mesh)

    const angle = random() * Math.PI * 2
    const direction = new THREE.Vector3(
      Math.cos(angle) * (1.2 + random() * 0.8),
      -0.5 - random() * 1.5,
      Math.sin(angle) * (0.8 + random() * 0.5)
    ).normalize()

    actionParticlesList.push({
      mesh,
      speed: 0.4 + random() * 0.8,
      progress: random(),
      direction,
      origin: new THREE.Vector3().copy(origin)
    })
  }

  // Memory core flow particles (orbiting and entering/leaving chest core)
  const memoryFlowList: MemoryFlowParticle[] = []
  const memoryFlowCount = compact ? 8 : 16
  const memParticleGeom = new THREE.SphereGeometry(0.012, 8, 8)
  for (let index = 0; index < memoryFlowCount; index += 1) {
    const mesh = new THREE.Mesh(memParticleGeom, actionMat)
    figure.add(mesh)

    const angle = random() * Math.PI * 2
    const radius = 0.5 + random() * 0.8
    const origin = new THREE.Vector3(
      chestCenter.x + Math.cos(angle) * radius,
      chestCenter.y + (-0.4 + random() * 0.8),
      chestCenter.z + Math.sin(angle) * radius * 0.5
    )

    memoryFlowList.push({
      mesh,
      speed: 0.3 + random() * 0.5,
      progress: random(),
      origin,
      target: new THREE.Vector3().copy(chestCenter)
    })
  }

  // Spine and limb pulses
  const pulseCurves = [spineCurve, shoulderCurve, ...limbCurves.slice(0, 2)]
  const pulses = pulseCurves.map((curve, index) => {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.034, 12, 10),
      glowMaterial.clone()
    )
    pulse.userData = { curve, offset: index * 0.2, speed: 0.05 + index * 0.008 }
    figure.add(pulse)
    return pulse as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
      userData: { curve: THREE.CatmullRomCurve3; offset: number; speed: number }
    }
  })

  return {
    group,
    update(elapsed: number, delta: number, pointer: THREE.Vector2) {
      const pointerX = reducedMotion ? 0 : pointer.x
      const pointerY = reducedMotion ? 0 : pointer.y
      const breathe = reducedMotion ? 0 : Math.sin(elapsed * 0.8) * 0.015

      figure.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.28) * 0.035
      figure.rotation.y = pointerX * 0.14 + (reducedMotion ? 0 : Math.sin(elapsed * 0.12) * 0.06)
      figure.rotation.x = pointerY * -0.06

      torso.scale.y = 1 + breathe
      torsoGlow.scale.y = 1.02 + breathe
      head.scale.y = 0.54 + breathe * 0.4
      
      brainGlow.scale.setScalar(1 + (reducedMotion ? 0 : Math.sin(elapsed * 0.95) * 0.035))
      brainSphereCore.rotation.y = elapsed * 0.3
      brainSphereCore.rotation.z = elapsed * 0.15

      // Pulsing chest memory core
      memoryCore.rotation.y = elapsed * 0.2
      memoryCore.rotation.x = elapsed * 0.1
      memoryCore.scale.setScalar(1 + breathe * 0.8)
      memoryHalo.scale.setScalar(1.05 + (reducedMotion ? 0 : Math.sin(elapsed * 1.1) * 0.04))

      // Pulsing heart reflection loop
      heartLoop.rotation.z = elapsed * 0.18
      heartLoop.scale.setScalar(1 + (reducedMotion ? 0 : Math.sin(elapsed * 1.5) * 0.05))
      heartCore.scale.setScalar(1.1 + (reducedMotion ? 0 : Math.sin(elapsed * 2.1) * 0.1))

      // Slowly breathing privacy shell
      privacyShell.scale.set(
        1.0 + breathe * 0.4,
        1.45 + breathe * 0.6,
        0.85 + breathe * 0.3
      )

      bodyParticles.material.opacity = 0.42 + (reducedMotion ? 0 : Math.sin(elapsed * 0.45) * 0.03)

      hairStrands.forEach((strand, index) => {
        strand.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.22 + index) * 0.008
      })

      // Orbiting nodes
      orbitNodes.forEach((node) => {
        const angle = elapsed * node.userData.speed + node.userData.offset
        node.position.set(
          Math.cos(angle) * node.userData.radius,
          node.userData.y + Math.sin(angle * 0.5) * 0.06,
          Math.sin(angle) * node.userData.radius * node.userData.zScale
        )
        node.scale.setScalar(0.8 + (reducedMotion ? 0 : Math.sin(elapsed * 1.3 + node.userData.offset) * 0.14))
      })

      // Action particles flowing outward from hands
      actionParticlesList.forEach((p) => {
        if (reducedMotion) {
          p.mesh.visible = false
          return
        }
        p.progress += delta * p.speed
        if (p.progress > 1) {
          p.progress = 0
          p.mesh.position.copy(p.origin)
        }
        p.mesh.position.copy(p.origin).addScaledVector(p.direction, p.progress * 1.2)
        const scale = 1.0 - p.progress
        p.mesh.scale.setScalar(scale)
      })

      // Memory particles flowing towards core
      memoryFlowList.forEach((p) => {
        if (reducedMotion) {
          p.mesh.visible = false
          return
        }
        p.progress += delta * p.speed
        if (p.progress > 1) {
          p.progress = 0
          p.mesh.position.copy(p.origin)
        }
        p.mesh.position.lerpVectors(p.origin, p.target, p.progress)
        const scale = 1.0 - p.progress * 0.5
        p.mesh.scale.setScalar(scale)
      })

      // Pulse traveling along spine and nervous system
      pulses.forEach((pulse) => {
        pulse.position.copy(pulse.userData.curve.getPointAt((elapsed * pulse.userData.speed + pulse.userData.offset) % 1))
      })
    }
  }
}
