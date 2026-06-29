import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Math helpers ─────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// ─── Shaders ──────────────────────────────────────────────────────────────────

/** Glass intelligence core – outer shell */
const CORE_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos    = (modelMatrix * vec4(position,1.)).xyz;
    vUv     = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
  }
`
const CORE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uBreath;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec2 vUv;

  void main(){
    vec3 viewDir = normalize(cameraPosition - vPos);
    float NdV = max(dot(vNormal,viewDir),0.);

    // Fresnel edge – ice-cyan rim
    float fresnel = pow(1.-NdV, 3.2);

    // Neural scan rings on surface
    float ring = sin(vUv.y*28. - uTime*1.1) * .5+.5;
    ring = pow(ring, 9.) * .18;
    float ring2 = sin(vUv.x*22. - uTime*0.7) * .5+.5;
    ring2 = pow(ring2, 12.) * .10;

    // Subsurface-like center brightness
    float core = NdV * NdV * .45;

    // Breathing
    float breath = sin(uBreath)*.06+.94;

    vec3 col  = vec3(0.,.07,.15) * breath;
    col += vec3(.1,.65,1.) * fresnel * 1.1;
    col += vec3(.15,.7,1.) * core;
    col += vec3(.05,.4,.9) * ring;
    col += vec3(.02,.3,.7) * ring2;

    float a = fresnel*.78 + core*.4 + .08;
    gl_FragColor = vec4(col, clamp(a,0.,1.));
  }
`

/** Inner mind – the glowing core */
const MIND_VERT = /* glsl */ `
  varying vec3 vNormal;
  void main(){
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
  }
`
const MIND_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uBreath;
  varying vec3 vNormal;
  void main(){
    float pulse = sin(uBreath)*.12 + .88;
    float rim   = pow(max(dot(vNormal, normalize(vec3(-1.,1.,1.))),0.),2.) * .4;
    vec3 col = vec3(.01,.06,.18)*pulse + vec3(.05,.4,.9)*rim*.6;
    gl_FragColor = vec4(col,1.);
  }
`

// ─── Component ────────────────────────────────────────────────────────────────
export default function RiaHyperRealAvatarScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Scene ──────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020408)
    scene.fog = new THREE.FogExp2(0x030610, 0.028)

    // ── Camera ─────────────────────────────────────────────────────────────────
    const W = Math.max(mount.clientWidth,  window.innerWidth)
    const H = Math.max(mount.clientHeight, window.innerHeight)
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.01, 80)
    camera.position.set(0.5, 0.1, 5.8)
    camera.lookAt(0.5, 0.1, 0)

    // ── Renderer ───────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;'
    mount.appendChild(renderer.domElement)

    // ── Lighting ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x050a14, 1))

    const keyLight  = new THREE.SpotLight(0xfff4e8, 4, 16, Math.PI / 7, 0.6)
    keyLight.position.set(2, 3, 4)
    scene.add(keyLight)

    const rimLight = new THREE.SpotLight(0x55aaff, 3.5, 14, Math.PI / 6, 0.5)
    rimLight.position.set(-2.5, 1, 2)
    scene.add(rimLight)

    const topLight = new THREE.PointLight(0x0066aa, 2, 8)
    topLight.position.set(0, 4, 0)
    scene.add(topLight)

    // ── Master group (right-side presence) ────────────────────────────────────
    const G = new THREE.Group()
    G.position.set(0.8, 0.05, 0)
    scene.add(G)

    // ── 1. OUTER GLASS SHELL ───────────────────────────────────────────────────
    const shellGeo = new THREE.SphereGeometry(1.55, 96, 96)
    const shellMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uBreath: { value: 0 },
      },
      vertexShader:   CORE_VERT,
      fragmentShader: CORE_FRAG,
      transparent: true,
      depthWrite:  false,
      side: THREE.FrontSide,
    })
    G.add(new THREE.Mesh(shellGeo, shellMat))

    // Back-face inner shell
    const innerShellMat = shellMat.clone()
    innerShellMat.side = THREE.BackSide
    innerShellMat.uniforms.uBreath.value = 0
    const innerShell = new THREE.Mesh(shellGeo.clone(), innerShellMat)
    G.add(innerShell)

    // ── 2. MIND CORE (visible bright inner sphere) ────────────────────────────
    const mindGeo = new THREE.SphereGeometry(0.92, 64, 64)
    const mindMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uBreath: { value: 0 },
      },
      vertexShader:   MIND_VERT,
      fragmentShader: MIND_FRAG,
      transparent: false,
    })
    G.add(new THREE.Mesh(mindGeo, mindMat))

    // Deep core emissive glow
    const deepGeo = new THREE.SphereGeometry(0.52, 32, 32)
    const deepMat = new THREE.MeshBasicMaterial({ color: 0x0a3560 })
    G.add(new THREE.Mesh(deepGeo, deepMat))

    // ── 3. CONCENTRIC ORBIT RINGS ─────────────────────────────────────────────
    const rings: THREE.Mesh[] = []
    const ringDefs = [
      { r: 1.82, tube: 0.0045, color: 0x0077bb, opacity: 0.55, tiltX: 0.2, tiltZ: 0   },
      { r: 2.10, tube: 0.003,  color: 0x004488, opacity: 0.35, tiltX: 0.8, tiltZ: 0.3 },
      { r: 2.40, tube: 0.002,  color: 0x002244, opacity: 0.22, tiltX: 1.2, tiltZ: 0.6 },
    ]
    for (const d of ringDefs) {
      const rGeo = new THREE.TorusGeometry(d.r, d.tube, 4, 160)
      const rMat = new THREE.MeshBasicMaterial({
        color: d.color,
        transparent: true,
        opacity: d.opacity,
      })
      const ring = new THREE.Mesh(rGeo, rMat)
      ring.rotation.x = d.tiltX
      ring.rotation.z = d.tiltZ
      rings.push(ring)
      G.add(ring)
    }

    // ── 4. INTELLIGENCE PARTICLE MANTLE ───────────────────────────────────────
    // Distributed in a loose head/shoulders density field — NOT skeletal geometry
    function silhouetteDensity(x: number, y: number, z: number): number {
      // Head ellipsoid centred at y=1.2
      const hx = x / 0.85, hy = (y - 1.2) / 0.95, hz = z / 0.7
      const headSq = hx*hx + hy*hy + hz*hz
      const head = headSq < 1 ? (1 - headSq) * 1.0 : 0

      // Neck column
      const nx = x / 0.32, ny = (y - 0.35) / 0.45
      const neckSq = nx*nx + ny*ny + (z*z) / (0.26*0.26)
      const neck = neckSq < 1 ? (1 - neckSq) * 0.65 : 0

      // Shoulder band
      const sx = x / 1.55, sy = (y + 0.0) / 0.38
      const shoulderSq = sx*sx + sy*sy + (z*z)/(0.5*0.5)
      const shoulder = shoulderSq < 1 ? (1 - shoulderSq) * 0.55 : 0

      // Upper chest
      const cx = x / 1.15, cy = (y - 0.65) / 0.62
      const chestSq = cx*cx + cy*cy + (z*z)/(0.58*0.58)
      const chest = chestSq < 1 ? (1 - chestSq) * 0.45 : 0

      return Math.max(head, neck, shoulder, chest)
    }

    const maxP = isMobile ? 1400 : 3800
    const pPos: number[] = []
    let tries = 0
    while (pPos.length / 3 < maxP && tries < maxP * 30) {
      tries++
      const x = (Math.random() - 0.5) * 3.8
      const y = (Math.random() - 0.5) * 4.2
      const z = (Math.random() - 0.5) * 2.4
      const d = silhouetteDensity(x, y, z)
      if (d > 0.01 && Math.random() < d * 0.8 + 0.12) {
        pPos.push(x, y, z)
      }
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x66bbee,
      size: isMobile ? 0.022 : 0.018,
      transparent: true,
      opacity: 0.48,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const mantleParticles = new THREE.Points(pGeo, pMat)
    mantleParticles.position.set(-0.8, 0.15, 0.7) // offset so it wraps the core
    G.add(mantleParticles)

    // ── 5. NEURAL DATA STREAMS (CatmullRom curves) ────────────────────────────
    const streamCount = isMobile ? 7 : 16
    for (let i = 0; i < streamCount; i++) {
      const t = (i / streamCount) * Math.PI * 2
      const baseR = 1.7 + Math.random() * 0.9
      const pts: THREE.Vector3[] = []
      for (let j = 0; j <= 14; j++) {
        const f = j / 14
        const a = t + f * (Math.PI * 0.28 + Math.random() * 0.1)
        const r = baseR * (1 - f * 0.42)
        pts.push(new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a * 0.6) * 0.5 + (Math.random() - 0.5) * 2.0 * f,
          Math.sin(a) * r * 0.38
        ))
      }
      const curve   = new THREE.CatmullRomCurve3(pts)
      const tGeo    = new THREE.TubeGeometry(curve, 18, 0.0045, 3, false)
      const tMat    = new THREE.MeshBasicMaterial({
        color: 0x004477,
        transparent: true,
        opacity: 0.25 + Math.random() * 0.3,
      })
      G.add(new THREE.Mesh(tGeo, tMat))
    }

    // ── 6. AMBIENT DEPTH PARTICLES ────────────────────────────────────────────
    const bgCount = isMobile ? 280 : 650
    const bgPos = new Float32Array(bgCount * 3)
    for (let i = 0; i < bgCount; i++) {
      bgPos[i*3  ] = (Math.random() - 0.5) * 14
      bgPos[i*3+1] = (Math.random() - 0.5) * 11
      bgPos[i*3+2] = (Math.random() - 0.5) * 9 - 2
    }
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3))
    const bgMat = new THREE.PointsMaterial({
      color: 0x223344,
      size: 0.014,
      transparent: true,
      opacity: 0.22,
      sizeAttenuation: true,
      depthWrite: false,
    })
    scene.add(new THREE.Points(bgGeo, bgMat))

    // ── Scroll waypoints ───────────────────────────────────────────────────────
    // Camera moves slowly through RIA's presence as user scrolls
    const waypoints = [
      { p: new THREE.Vector3(0.5, 0.10, 5.8),  t: new THREE.Vector3(0.5, 0.1,  0) }, // hero
      { p: new THREE.Vector3(0.3, 0.50, 5.0),  t: new THREE.Vector3(0.3, 0.4,  0) }, // architecture
      { p: new THREE.Vector3(0.2, 0.10, 5.3),  t: new THREE.Vector3(0.2, 0.0,  0) }, // product
      { p: new THREE.Vector3(-0.1,-0.20, 5.5), t: new THREE.Vector3(0.0,-0.2,  0) }, // privacy
      { p: new THREE.Vector3(0.0, 0.05, 6.8),  t: new THREE.Vector3(0.0, 0.05, 0) }, // pullback
    ]

    // ── Animation state ────────────────────────────────────────────────────────
    let time = 0, breath = 0
    let scroll = 0, targetScroll = 0
    let mX = 0, mY = 0, cMX = 0, cMY = 0
    let rafId = 0

    const onMouse = (e: MouseEvent) => {
      if (reduced) return
      mX = (e.clientX / window.innerWidth  - 0.5) * 2
      mY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      targetScroll = Math.min(window.scrollY / (window.innerHeight * 2.5), 1)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll, { passive: true })

    function animate() {
      rafId = requestAnimationFrame(animate)
      const dt = 1 / 60
      time   += dt
      breath += reduced ? 0 : dt * 0.40

      // Smooth scroll
      scroll = lerp(scroll, targetScroll, 0.045)

      // Mouse
      cMX = lerp(cMX, mX * 0.18, 0.05)
      cMY = lerp(cMY, mY * 0.10, 0.05)

      // Camera from waypoints
      const raw = scroll * (waypoints.length - 1)
      const ia  = Math.min(Math.floor(raw), waypoints.length - 2)
      const ib  = ia + 1
      const it  = raw - ia

      const wa = waypoints[ia], wb = waypoints[ib]
      camera.position.lerpVectors(wa.p, wb.p, it)
      camera.position.x += cMX
      camera.position.y -= cMY

      const lookTarget = new THREE.Vector3()
      lookTarget.lerpVectors(wa.t, wb.t, it)
      camera.lookAt(lookTarget)

      // Presence subtle rotation (mouse parallax + gentle drift)
      G.rotation.y = cMX * 0.45 + Math.sin(time * 0.11) * 0.04
      G.rotation.x = cMY * 0.28 + Math.sin(time * 0.08) * 0.025

      // Particle mantle drift
      mantleParticles.rotation.y = time * 0.016
      mantleParticles.rotation.x = Math.sin(time * 0.09) * 0.035

      // Rings orbit
      rings.forEach((r, i) => {
        r.rotation.z = time * (0.10 + i * 0.03) * (i % 2 === 0 ? 1 : -1)
      })

      // Data streams rotate
      // (they're children of G which already rotates)

      // Shader uniforms
      shellMat.uniforms.uTime.value    = time
      shellMat.uniforms.uBreath.value  = breath
      innerShellMat.uniforms.uTime.value   = time
      innerShellMat.uniforms.uBreath.value = breath
      mindMat.uniforms.uTime.value   = time
      mindMat.uniforms.uBreath.value = breath

      // Key light subtle pulse for life
      keyLight.intensity = 4 + Math.sin(time * 0.9) * 0.2

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ─────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth  || window.innerWidth
      const h = mount.clientHeight || window.innerHeight
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose()
          const m = obj.material as THREE.Material | THREE.Material[]
          if (Array.isArray(m)) m.forEach(x => x.dispose())
          else m.dispose()
        }
      })
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
