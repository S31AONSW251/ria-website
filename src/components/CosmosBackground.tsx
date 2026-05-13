import { useEffect, useRef } from 'react'

export default function CosmosBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    void import('three').then((THREE) => {
      if (cancelled || !mountRef.current) return

      const mount = mountRef.current
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 1800)
      camera.position.z = 520

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const root = new THREE.Group()
      scene.add(root)

      function makeStarSprite() {
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        const ctx = canvas.getContext('2d')!
        const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
        glow.addColorStop(0, 'rgba(255,255,255,0.95)')
        glow.addColorStop(0.16, 'rgba(220,246,255,0.82)')
        glow.addColorStop(0.36, 'rgba(125,211,252,0.2)')
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, 128, 128)
        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
      }

      const starSprite = makeStarSprite()

      function createStarLayer(count: number, radiusMin: number, radiusMax: number, size: number, opacity: number) {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i += 1) {
          const radius = radiusMin + Math.random() * (radiusMax - radiusMin)
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i * 3 + 2] = radius * Math.cos(phi)

          const color = new THREE.Color()
          color.setHSL(0.57 + Math.random() * 0.12, 0.18 + Math.random() * 0.34, 0.58 + Math.random() * 0.32)
          colors[i * 3] = color.r
          colors[i * 3 + 1] = color.g
          colors[i * 3 + 2] = color.b
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
          size,
          map: starSprite,
          vertexColors: true,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true
        })

        const points = new THREE.Points(geometry, material)
        root.add(points)
        return { points, geometry, material }
      }

      function makeNebulaTexture(width: number, height: number) {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'lighter'

        const fields: Array<[number, number, number, string, string]> = [
          [0.24, 0.32, 0.72, 'rgba(34,211,238,0.12)', 'rgba(14,165,233,0.035)'],
          [0.72, 0.22, 0.62, 'rgba(168,85,247,0.1)', 'rgba(59,130,246,0.026)'],
          [0.52, 0.78, 0.82, 'rgba(45,212,191,0.07)', 'rgba(2,6,23,0)']
        ]

        fields.forEach(([x, y, scale, inner, outer]) => {
          const cx = width * x
          const cy = height * y
          const radius = Math.max(width, height) * scale
          const gradient = ctx.createRadialGradient(cx, cy, radius * 0.02, cx, cy, radius)
          gradient.addColorStop(0, inner)
          gradient.addColorStop(0.48, outer)
          gradient.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, width, height)
        })

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
      }

      const nearStars = createStarLayer(1900, 360, 980, 2.2, 0.34)
      const farStars = createStarLayer(2600, 640, 1300, 1.25, 0.2)

      const nebulaTexture = makeNebulaTexture(1800, 1100)
      const nebula = new THREE.Mesh(
        new THREE.PlaneGeometry(1800, 1100),
        new THREE.MeshBasicMaterial({
          map: nebulaTexture,
          transparent: true,
          opacity: 0.42,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
      nebula.position.set(0, 0, -180)
      nebula.scale.set(1.35, 1.35, 1)
      root.add(nebula)

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const resize = () => {
        const width = Math.max(1, mount.clientWidth)
        const height = Math.max(1, mount.clientHeight)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      let frameId = 0
      const render = () => {
        renderer.render(scene, camera)
      }

      const animate = () => {
        root.rotation.y += 0.00008
        nearStars.points.rotation.z += 0.000025
        farStars.points.rotation.z -= 0.000015
        nebula.rotation.z += 0.00001
        frameId = requestAnimationFrame(animate)
        render()
      }

      resize()
      if (reducedMotion) {
        render()
      } else {
        animate()
      }
      window.addEventListener('resize', resize)

      cleanup = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', resize)
        nearStars.geometry.dispose()
        farStars.geometry.dispose()
        nearStars.material.dispose()
        farStars.material.dispose()
        starSprite.dispose()
        nebula.geometry.dispose()
        ;(nebula.material as any).map?.dispose()
        ;(nebula.material as any).dispose?.()
        renderer.dispose()
        if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement)
      }
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return <div ref={mountRef} className="cosmos-canvas" aria-hidden="true" />
}
