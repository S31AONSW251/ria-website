import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createDepthDataGrid } from './DepthDataGrid'
import { createFemaleIntelligenceBody } from './FemaleIntelligenceBody'
import { createNeuralParticleField } from './NeuralParticleField'
import { createScrollCameraRig, type RigPose } from './ScrollCameraRig'

type PerformanceNavigator = Navigator & {
  deviceMemory?: number
}

const disposeScene = (scene: THREE.Scene) => {
  scene.traverse((object) => {
    const geometryOwner = object as THREE.Mesh | THREE.Line | THREE.Points | THREE.Sprite
    if ('geometry' in geometryOwner && geometryOwner.geometry) {
      geometryOwner.geometry.dispose()
    }

    if ('material' in geometryOwner && geometryOwner.material) {
      const materials = Array.isArray(geometryOwner.material) ? geometryOwner.material : [geometryOwner.material]
      materials.forEach((material) => {
        const mappedMaterial = material as THREE.Material & {
          alphaMap?: THREE.Texture | null
          emissiveMap?: THREE.Texture | null
          map?: THREE.Texture | null
        }

        mappedMaterial.map?.dispose()
        mappedMaterial.alphaMap?.dispose()
        mappedMaterial.emissiveMap?.dispose()
        mappedMaterial.dispose()
      })
    }
  })
}

const createWaypoints = (compact: boolean): Array<{ pose: RigPose; selector: string }> => [
  {
    selector: '#chapter-hero', // Hero starts at full body
    pose: compact
      ? {
          bodyPosition: [0, -0.62, 0],
          bodyRotationY: -0.08,
          bodyScale: 0.94,
          cameraPosition: [0.25, 2.9, 8.8],
          lookAt: [0, 2.05, 0.12]
        }
      : {
          bodyPosition: [1.44, -0.16, 0],
          bodyRotationY: -0.2,
          bodyScale: 0.96,
          cameraPosition: [0.92, 1.42, 9.75],
          lookAt: [0.18, 0.76, 0.06]
        }
  },
  {
    selector: '#chapter-brain', // Executive Cortex: focus head/brain
    pose: compact
      ? {
          bodyPosition: [0, -2.1, 0],
          bodyRotationY: -0.04,
          bodyScale: 1.1,
          cameraPosition: [0.15, 2.2, 5.8],
          lookAt: [0, 2.58, 0.1]
        }
      : {
          bodyPosition: [1.4, -2.1, 0],
          bodyRotationY: -0.15,
          bodyScale: 1.15,
          cameraPosition: [0.75, 2.2, 5.8],
          lookAt: [0.1, 2.58, 0.1]
        }
  },
  {
    selector: '#chapter-knowledge', // Knowledge Universe: focus eyes
    pose: compact
      ? {
          bodyPosition: [0, -2.2, 0],
          bodyRotationY: 0,
          bodyScale: 1.25,
          cameraPosition: [0.1, 2.3, 5.0],
          lookAt: [0, 2.55, 0.2]
        }
      : {
          bodyPosition: [1.35, -2.2, 0],
          bodyRotationY: -0.1,
          bodyScale: 1.3,
          cameraPosition: [0.65, 2.3, 4.8],
          lookAt: [0.05, 2.55, 0.2]
        }
  },
  {
    selector: '#chapter-memory', // Memory Core: focus chest
    pose: compact
      ? {
          bodyPosition: [0, -0.9, 0],
          bodyRotationY: 0.04,
          bodyScale: 1.05,
          cameraPosition: [0.08, 1.0, 5.5],
          lookAt: [0, 1.07, 0.15]
        }
      : {
          bodyPosition: [1.3, -0.9, 0],
          bodyRotationY: -0.05,
          bodyScale: 1.1,
          cameraPosition: [0.6, 1.0, 5.5],
          lookAt: [0.05, 1.07, 0.15]
        }
  },
  {
    selector: '#chapter-reflection', // Reflection Loop: focus heart (left chest)
    pose: compact
      ? {
          bodyPosition: [0.15, -0.9, 0],
          bodyRotationY: 0.08,
          bodyScale: 1.1,
          cameraPosition: [0.05, 1.0, 5.0],
          lookAt: [-0.15, 1.07, 0.2]
        }
      : {
          bodyPosition: [1.45, -0.9, 0],
          bodyRotationY: 0,
          bodyScale: 1.15,
          cameraPosition: [0.55, 1.0, 4.8],
          lookAt: [-0.15, 1.07, 0.2]
        }
  },
  {
    selector: '#chapter-reasoning', // Reasoning Pipeline: focus spine
    pose: compact
      ? {
          bodyPosition: [0, -0.3, 0],
          bodyRotationY: 0.02,
          bodyScale: 0.95,
          cameraPosition: [0.02, 0.3, 5.8],
          lookAt: [0, 0.4, 0.05]
        }
      : {
          bodyPosition: [1.25, -0.3, 0],
          bodyRotationY: 0.02,
          bodyScale: 1.0,
          cameraPosition: [0.35, 0.3, 5.6],
          lookAt: [0, 0.4, 0.05]
        }
  },
  {
    selector: '#chapter-action', // Action Tools: focus hands
    pose: compact
      ? {
          bodyPosition: [0.3, 0.3, 0],
          bodyRotationY: 0.08,
          bodyScale: 1.0,
          cameraPosition: [0.0, -0.2, 5.4],
          lookAt: [-0.58, -0.67, 0.15]
        }
      : {
          bodyPosition: [1.5, 0.3, 0],
          bodyRotationY: 0.1,
          bodyScale: 1.05,
          cameraPosition: [0.4, -0.2, 5.2],
          lookAt: [-0.58, -0.67, 0.15]
        }
  },
  {
    selector: '#chapter-skin', // Owner Control: pull back to privacy shell
    pose: compact
      ? {
          bodyPosition: [0, -0.5, -0.15],
          bodyRotationY: 0,
          bodyScale: 0.88,
          cameraPosition: [0, 1.2, 8.8],
          lookAt: [0, 0.5, -0.1]
        }
      : {
          bodyPosition: [1.2, -0.25, -0.2],
          bodyRotationY: 0.05,
          bodyScale: 0.94,
          cameraPosition: [0.4, 1.4, 8.8],
          lookAt: [0, 0.6, -0.15]
        }
  },
  {
    selector: '#chapter-download', // Download: pull back/fade
    pose: compact
      ? {
          bodyPosition: [0, -0.4, -0.3],
          bodyRotationY: 0,
          bodyScale: 0.8,
          cameraPosition: [0, 1.5, 10.5],
          lookAt: [0, 0.3, -1.0]
        }
      : {
          bodyPosition: [1.0, -0.2, -0.4],
          bodyRotationY: 0.08,
          bodyScale: 0.85,
          cameraPosition: [0, 1.6, 11.2],
          lookAt: [0, 0.5, -1.2]
        }
  },
  {
    selector: '#chapter-investor', // Investor: full view
    pose: compact
      ? {
          bodyPosition: [0, -0.3, -0.4],
          bodyRotationY: 0,
          bodyScale: 0.75,
          cameraPosition: [0, 1.8, 12.0],
          lookAt: [0, 0.2, -1.5]
        }
      : {
          bodyPosition: [0.9, -0.1, -0.5],
          bodyRotationY: 0.12,
          bodyScale: 0.8,
          cameraPosition: [0, 1.9, 12.5],
          lookAt: [0, 0.4, -1.6]
        }
  }
]

export default function RiaLivingBodyExperience() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer: THREE.WebGLRenderer | undefined
    let animationFrame = 0

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reducedMotion = mediaQuery.matches
    const compact = window.innerWidth < 900
    const performanceNavigator = navigator as PerformanceNavigator
    const lowPower =
      compact ||
      window.devicePixelRatio > 1.5 ||
      navigator.hardwareConcurrency <= 4 ||
      (performanceNavigator.deviceMemory ?? 8) <= 4

    try {
      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x020305, compact ? 0.08 : 0.056)

      const camera = new THREE.PerspectiveCamera(compact ? 42 : 34, 1, 0.1, 40)
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !lowPower,
        powerPreference: 'high-performance'
      })
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = compact ? 1.06 : 1.14
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.className = 'cinematic-hologram-canvas ria-human-scene-canvas'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      const ambient = new THREE.AmbientLight(0x84bdcc, 0.48)
      const keyLight = new THREE.PointLight(0xdffeff, compact ? 12 : 16, 24, 2)
      keyLight.position.set(2.8, 4.8, 6.8)
      const fillLight = new THREE.PointLight(0x80d7e4, 10, 18, 2)
      fillLight.position.set(-4.6, 1.1, 0.4)
      const rimLight = new THREE.PointLight(0x4d7e9f, 7, 22, 2)
      rimLight.position.set(-1.6, -1.8, -5.2)
      scene.add(ambient, keyLight, fillLight, rimLight)

      const body = createFemaleIntelligenceBody({ compact, lowPower, reducedMotion })
      scene.add(body.group)

      const particleField = createNeuralParticleField({ compact, lowPower, reducedMotion })
      scene.add(particleField.group)

      const dataGrid = createDepthDataGrid({ compact, reducedMotion })
      scene.add(dataGrid.group)

      const rig = createScrollCameraRig({
        body: body.group,
        camera,
        compact,
        reducedMotion,
        waypoints: createWaypoints(compact)
      })

      let pointerX = 0
      let pointerY = 0
      let targetPointerX = 0
      let targetPointerY = 0

      const updatePointer = (event: PointerEvent) => {
        targetPointerX = ((event.clientX / window.innerWidth) - 0.5) * (compact ? 0.18 : 0.24)
        targetPointerY = ((event.clientY / window.innerHeight) - 0.5) * (compact ? 0.16 : 0.2)
      }

      const resetPointer = () => {
        targetPointerX = 0
        targetPointerY = 0
      }

      const resize = () => {
        if (!renderer) return
        renderer.setSize(window.innerWidth, window.innerHeight, false)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        rig.refresh()
      }

      window.addEventListener('pointermove', updatePointer, { passive: true })
      window.addEventListener('blur', resetPointer)
      window.addEventListener('resize', resize)
      resize()

      const clock = new THREE.Clock()
      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate)

        if (!renderer || document.hidden) return

        const delta = Math.min(clock.getDelta(), 0.05)
        const elapsed = clock.elapsedTime
        const pointerLerp = reducedMotion ? 1 : 0.03

        pointerX += (targetPointerX - pointerX) * pointerLerp
        pointerY += (targetPointerY - pointerY) * pointerLerp

        const pointer = new THREE.Vector2(pointerX, pointerY)

        rig.update(delta)
        body.update(elapsed, delta, pointer)
        particleField.update(elapsed, delta, pointer)
        dataGrid.update(elapsed, delta, pointer)

        renderer.render(scene, camera)
      }

      animate()
      setReady(true)
      setFallback(false)

      return () => {
        setReady(false)
        window.cancelAnimationFrame(animationFrame)
        window.removeEventListener('pointermove', updatePointer)
        window.removeEventListener('blur', resetPointer)
        window.removeEventListener('resize', resize)
        rig.dispose()
        disposeScene(scene)
        renderer?.dispose()
        renderer?.forceContextLoss?.()
        renderer?.domElement.remove()
      }
    } catch {
      setFallback(true)
      setReady(false)
      renderer?.dispose()
      renderer?.domElement.remove()
      return undefined
    }
  }, [])

  return (
    <div className={`ria-human-intelligence-scene cinematic-hologram-stage ${ready ? 'is-ready' : ''} ${fallback ? 'is-fallback' : ''}`} aria-hidden="true">
      <div ref={mountRef} className="cinematic-hologram-stage-mount ria-human-scene-mount" />
      <div className="cinematic-hologram-stage-vignette ria-human-scene-vignette" />
      <div className="cinematic-hologram-stage-noise ria-human-scene-noise" />

      <div className="cinematic-hologram-stage-fallback ria-human-scene-fallback">
        <div className="cinematic-hologram-fallback-core">
          <i className="is-ring-a" />
          <i className="is-ring-b" />
          <i className="is-ring-c" />
          <span />
        </div>
      </div>
    </div>
  )
}
