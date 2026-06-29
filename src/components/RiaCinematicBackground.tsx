import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createRiaDataParticleField } from './RiaDataParticleField'
import RiaHeroSceneFallback from './RiaHeroSceneFallback'
import { createRiaHolographicPresence } from './RiaHolographicPresence'
import { createRiaScrollCamera } from './RiaScrollCamera'

type PerformanceNavigator = Navigator & { deviceMemory?: number }

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const disposable = object as THREE.Mesh | THREE.Line | THREE.Points | THREE.Sprite
    disposable.geometry?.dispose()

    if (!disposable.material) return
    const materials = Array.isArray(disposable.material) ? disposable.material : [disposable.material]
    materials.forEach((material) => {
      const mapped = material as THREE.Material & { map?: THREE.Texture | null }
      mapped.map?.dispose()
      mapped.dispose()
    })
  })
}

export default function RiaCinematicBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const compact = window.innerWidth < 820
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const performanceNavigator = navigator as PerformanceNavigator
    const lowPower = compact || navigator.hardwareConcurrency <= 4 || (performanceNavigator.deviceMemory ?? 8) <= 4
    let renderer: THREE.WebGLRenderer | undefined
    let frame = 0
    let cleaned = false

    try {
      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x02070b, compact ? 0.075 : 0.048)

      const camera = new THREE.PerspectiveCamera(compact ? 42 : 36, 1, 0.1, 42)
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !lowPower,
        powerPreference: 'high-performance',
        premultipliedAlpha: true
      })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = compact ? 1.35 : 1.55
      renderer.domElement.className = 'ria-cinematic-canvas'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      scene.add(new THREE.HemisphereLight(0xcdfaff, 0x02050a, 1.3))

      const key = new THREE.DirectionalLight(0xeaffff, compact ? 3.8 : 5.2)
      key.position.set(4, 6, 7)
      const cyanRim = new THREE.PointLight(0x72e9f4, compact ? 16 : 24, 22, 2)
      cyanRim.position.set(-2.5, 2.2, 4)
      const coolFill = new THREE.PointLight(0x3b7ca8, compact ? 8 : 12, 18, 2)
      coolFill.position.set(4.5, -1.2, -2.5)
      scene.add(key, cyanRim, coolFill)

      const presence = createRiaHolographicPresence({ compact, lowPower, reducedMotion })
      const dataField = createRiaDataParticleField({ compact, lowPower, reducedMotion })
      scene.add(presence.group, dataField.group)

      const scrollCamera = createRiaScrollCamera({
        body: presence.group,
        camera,
        compact,
        reducedMotion
      })

      const pointer = new THREE.Vector2()
      const targetPointer = new THREE.Vector2()
      const onPointerMove = (event: PointerEvent) => {
        if (reducedMotion) return
        targetPointer.set(
          (event.clientX / window.innerWidth - 0.5) * 0.55,
          (event.clientY / window.innerHeight - 0.5) * 0.42
        )
      }

      const resize = () => {
        if (!renderer) return
        renderer.setSize(window.innerWidth, window.innerHeight, false)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        scrollCamera.refresh()
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('resize', resize)
      resize()

      const clock = new THREE.Clock()
      const animate = () => {
        frame = window.requestAnimationFrame(animate)
        if (document.hidden || !renderer) return

        const delta = Math.min(clock.getDelta(), 0.05)
        const elapsed = clock.elapsedTime
        pointer.lerp(targetPointer, reducedMotion ? 1 : 0.035)
        scrollCamera.update(delta)
        presence.update(elapsed, delta, pointer)
        dataField.update(elapsed, delta, pointer)
        renderer.render(scene, camera)
      }

      animate()
      setStatus('ready')

      return () => {
        cleaned = true
        window.cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', resize)
        scrollCamera.dispose()
        disposeScene(scene)
        renderer?.dispose()
        renderer?.forceContextLoss()
        renderer?.domElement.remove()
      }
    } catch {
      if (!cleaned) setStatus('fallback')
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [])

  return (
    <div className={`ria-cinematic-background is-${status}`} aria-hidden="true">
      <RiaHeroSceneFallback />
      <div ref={mountRef} className="ria-cinematic-mount" />
      <div className="ria-cinematic-readability" />
      <div className="ria-cinematic-grain" />
    </div>
  )
}
