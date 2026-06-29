import * as THREE from 'three'

type DepthDataGridOptions = {
  compact: boolean
  reducedMotion: boolean
}

const applyTransparentMaterialSettings = (material: THREE.Material | THREE.Material[]) => {
  const materials = Array.isArray(material) ? material : [material]
  materials.forEach((item) => {
    if ('transparent' in item) {
      item.transparent = true
    }

    if ('opacity' in item) {
      item.opacity = 0.18
    }

    item.depthWrite = false
    item.blending = THREE.AdditiveBlending
  })
}

const createGlowTexture = (innerColor: string, outerColor: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) return undefined

  const gradient = context.createRadialGradient(128, 128, 8, 128, 128, 128)
  gradient.addColorStop(0, innerColor)
  gradient.addColorStop(0.42, 'rgba(167, 242, 250, 0.22)')
  gradient.addColorStop(1, outerColor)

  context.fillStyle = gradient
  context.fillRect(0, 0, 256, 256)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createDepthDataGrid({
  compact,
  reducedMotion
}: DepthDataGridOptions) {
  const group = new THREE.Group()

  const floorGrid = new THREE.GridHelper(compact ? 11 : 16, compact ? 16 : 24, 0x1e5160, 0x0c2430)
  applyTransparentMaterialSettings(floorGrid.material)
  floorGrid.position.set(0, -3.45, -1.4)
  floorGrid.rotation.x = Math.PI / 2
  group.add(floorGrid)

  const rearGrid = new THREE.GridHelper(compact ? 8 : 12, compact ? 12 : 18, 0x143a48, 0x081a22)
  applyTransparentMaterialSettings(rearGrid.material)
  rearGrid.position.set(0, 0.4, -5.8)
  group.add(rearGrid)

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x86d8e8,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  const rings: THREE.Mesh[] = []
  ;[
    { radius: compact ? 1.45 : 1.85, tube: 0.012, y: 2.45, x: 1.45, z: 0.05 },
    { radius: compact ? 1.9 : 2.55, tube: 0.013, y: 0.8, x: 1.52, z: 0.15 },
    { radius: compact ? 2.4 : 3.25, tube: 0.013, y: -1.55, x: 1.58, z: 0.12 }
  ].forEach(({ radius, tube, y, x, z }) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 120), ringMaterial.clone())
    ring.position.y = y
    ring.rotation.x = x
    ring.rotation.z = z
    rings.push(ring)
    group.add(ring)
  })

  const texture = createGlowTexture('rgba(223, 252, 255, 0.92)', 'rgba(87, 182, 203, 0)')
  const sprites: THREE.Sprite[] = []

  if (texture) {
    ;[
      { position: new THREE.Vector3(0.2, 2.55, -1.9), scale: compact ? 3.8 : 5.3 },
      { position: new THREE.Vector3(0.45, 1.05, -1.4), scale: compact ? 3.2 : 4.5 },
      { position: new THREE.Vector3(-0.25, -1.15, -1.2), scale: compact ? 4.4 : 6.3 }
    ].forEach(({ position, scale }) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          color: 0xaef7ff,
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      )
      sprite.position.copy(position)
      sprite.scale.setScalar(scale)
      sprites.push(sprite)
      group.add(sprite)
    })
  }

  const spineColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.18, compact ? 5.3 : 6.6, 16, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x9ee7f4,
      transparent: true,
      opacity: 0.045,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  )
  spineColumn.position.set(0, 0.35, -1.05)
  group.add(spineColumn)

  return {
    group,
    update(elapsed: number, _delta: number, pointer: THREE.Vector2) {
      rings.forEach((ring, index) => {
        ring.rotation.y = reducedMotion ? 0.2 : elapsed * (0.03 + index * 0.016) * (index % 2 === 0 ? 1 : -1)
      })

      sprites.forEach((sprite, index) => {
        const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * (0.35 + index * 0.15)) * 0.06
        sprite.scale.setScalar((compact ? [3.8, 3.2, 4.4][index] : [5.3, 4.5, 6.3][index]) * pulse)
      })

      group.rotation.y = reducedMotion ? 0 : pointer.x * 0.04
    }
  }
}
