import * as THREE from 'three'

export type RigPose = {
  bodyPosition: [number, number, number]
  bodyRotationY: number
  bodyScale: number
  cameraPosition: [number, number, number]
  lookAt: [number, number, number]
}

type RigWaypoint = {
  selector: string
  pose: RigPose
}

type ScrollCameraRigOptions = {
  body: THREE.Object3D
  camera: THREE.PerspectiveCamera
  compact: boolean
  reducedMotion: boolean
  waypoints: RigWaypoint[]
}

type SampledWaypoint = {
  pose: RigPose
  y: number
}

const smoothstep = (value: number) => value * value * (3 - 2 * value)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const mixNumber = (from: number, to: number, progress: number) => from + (to - from) * progress

const mixVector = (from: [number, number, number], to: [number, number, number], progress: number): [number, number, number] => [
  mixNumber(from[0], to[0], progress),
  mixNumber(from[1], to[1], progress),
  mixNumber(from[2], to[2], progress)
]

const mixPose = (from: RigPose, to: RigPose, progress: number): RigPose => ({
  bodyPosition: mixVector(from.bodyPosition, to.bodyPosition, progress),
  bodyRotationY: mixNumber(from.bodyRotationY, to.bodyRotationY, progress),
  bodyScale: mixNumber(from.bodyScale, to.bodyScale, progress),
  cameraPosition: mixVector(from.cameraPosition, to.cameraPosition, progress),
  lookAt: mixVector(from.lookAt, to.lookAt, progress)
})

export function createScrollCameraRig({
  body,
  camera,
  compact,
  reducedMotion,
  waypoints
}: ScrollCameraRigOptions) {
  const sampledWaypoints: SampledWaypoint[] = []
  const targetCamera = new THREE.Vector3()
  const currentCamera = new THREE.Vector3()
  const targetLookAt = new THREE.Vector3()
  const currentLookAt = new THREE.Vector3()
  const targetBody = new THREE.Vector3()
  const currentBody = new THREE.Vector3()

  let currentBodyScale = 1
  let targetBodyScale = 1
  let currentBodyRotationY = 0
  let targetBodyRotationY = 0

  const refresh = () => {
    sampledWaypoints.length = 0

    waypoints.forEach(({ selector, pose }) => {
      const element = document.querySelector<HTMLElement>(selector)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const pageY = window.scrollY + rect.top + Math.min(rect.height * 0.24, window.innerHeight * 0.22)

      sampledWaypoints.push({ pose, y: pageY })
    })

    sampledWaypoints.sort((left, right) => left.y - right.y)
  }

  const samplePose = (): RigPose => {
    if (sampledWaypoints.length === 0) return waypoints[0].pose
    if (reducedMotion) return sampledWaypoints[0].pose
    if (sampledWaypoints.length === 1) return sampledWaypoints[0].pose

    const anchorY = window.scrollY + window.innerHeight * (compact ? 0.42 : 0.48)

    if (anchorY <= sampledWaypoints[0].y) return sampledWaypoints[0].pose

    for (let index = 0; index < sampledWaypoints.length - 1; index += 1) {
      const current = sampledWaypoints[index]
      const next = sampledWaypoints[index + 1]

      if (anchorY <= next.y) {
        const span = Math.max(next.y - current.y, 1)
        const progress = smoothstep(clamp01((anchorY - current.y) / span))
        return mixPose(current.pose, next.pose, progress)
      }
    }

    return sampledWaypoints[sampledWaypoints.length - 1].pose
  }

  const applyPose = (pose: RigPose) => {
    targetCamera.set(...pose.cameraPosition)
    targetLookAt.set(...pose.lookAt)
    targetBody.set(...pose.bodyPosition)
    targetBodyScale = pose.bodyScale
    targetBodyRotationY = pose.bodyRotationY
  }

  refresh()
  applyPose(samplePose())
  currentCamera.copy(targetCamera)
  currentLookAt.copy(targetLookAt)
  currentBody.copy(targetBody)
  currentBodyScale = targetBodyScale
  currentBodyRotationY = targetBodyRotationY
  camera.position.copy(currentCamera)
  camera.lookAt(currentLookAt)
  body.position.copy(currentBody)
  body.scale.setScalar(currentBodyScale)
  body.rotation.y = currentBodyRotationY

  const resizeHandler = () => refresh()
  const loadHandler = () => refresh()

  window.addEventListener('resize', resizeHandler)
  window.addEventListener('load', loadHandler)

  return {
    refresh,
    update(delta: number) {
      applyPose(samplePose())

      const damping = reducedMotion ? 1 : 1 - Math.exp(-delta * 3.2)

      currentCamera.lerp(targetCamera, damping)
      currentLookAt.lerp(targetLookAt, damping)
      currentBody.lerp(targetBody, damping)
      currentBodyScale = mixNumber(currentBodyScale, targetBodyScale, damping)
      currentBodyRotationY = mixNumber(currentBodyRotationY, targetBodyRotationY, damping)

      camera.position.copy(currentCamera)
      camera.lookAt(currentLookAt)
      body.position.copy(currentBody)
      body.scale.setScalar(currentBodyScale)
      body.rotation.y = currentBodyRotationY
    },
    dispose() {
      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('load', loadHandler)
    }
  }
}
