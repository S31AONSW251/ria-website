import * as THREE from 'three'
import { createScrollCameraRig, type RigPose } from './ScrollCameraRig'

type ScrollCameraOptions = {
  body: THREE.Object3D
  camera: THREE.PerspectiveCamera
  compact: boolean
  reducedMotion: boolean
}

const pose = (
  bodyPosition: [number, number, number],
  bodyRotationY: number,
  bodyScale: number,
  cameraPosition: [number, number, number],
  lookAt: [number, number, number]
): RigPose => ({ bodyPosition, bodyRotationY, bodyScale, cameraPosition, lookAt })

export function createRiaScrollCamera(options: ScrollCameraOptions) {
  const { compact } = options

  return createScrollCameraRig({
    ...options,
    waypoints: [
      {
        selector: '#chapter-hero',
        pose: compact
          ? pose([0.15, -0.92, 0], -0.06, 0.86, [0.1, 1.72, 9.2], [0.08, 1.16, 0])
          : pose([1.78, -0.38, 0], -0.17, 1.08, [0.28, 1.42, 8.8], [0.72, 1.35, 0])
      },
      {
        selector: '#chapter-knowledge',
        pose: compact
          ? pose([0.1, -0.84, 0], 0, 0.82, [0.06, 1.08, 8.2], [0.08, 0.72, 0])
          : pose([1.72, -0.5, 0], -0.08, 1.02, [0.42, 0.82, 7.2], [1.25, 0.65, 0])
      },
      {
        selector: '#chapter-memory',
        pose: compact
          ? pose([0.08, -0.72, 0], 0.04, 0.8, [0.08, 2.35, 7.5], [0.08, 2.05, 0])
          : pose([1.68, -0.42, 0], -0.02, 1.04, [0.5, 2.58, 6.85], [1.45, 2.16, 0])
      },
      {
        selector: '#chapter-reflection',
        pose: compact
          ? pose([0.06, -0.96, -0.15], 0.08, 0.76, [0, 0.25, 8.7], [0.06, 0.1, -0.2])
          : pose([1.62, -0.54, -0.18], 0.1, 0.96, [0.22, 0.34, 8.0], [1.32, 0.16, -0.2])
      },
      {
        selector: '#chapter-skin',
        pose: compact
          ? pose([0.05, -0.7, -0.25], -0.02, 0.72, [0, 1.2, 10.4], [0.08, 0.62, -0.35])
          : pose([1.64, -0.4, -0.32], -0.08, 0.9, [0, 1.28, 10.6], [1.15, 0.72, -0.35])
      },
      {
        selector: 'footer.site-footer-premium',
        pose: compact
          ? pose([0, -0.6, -1.4], 0, 0.52, [0, 1.4, 12.6], [0, 0.35, -1.4])
          : pose([1.25, -0.4, -1.7], 0, 0.6, [0, 1.5, 13.5], [0.75, 0.45, -1.8])
      }
    ]
  })
}
