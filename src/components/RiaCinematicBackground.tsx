import { useEffect, useRef } from 'react'
import RiaBrainPresence from './RiaBrainPresence'

export default function RiaCinematicBackground() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const presence = scene?.querySelector<HTMLElement>('.ria-brain-presence')
    if (!presence || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let currentX = 0
    let currentY = 0
    let scrollY = window.scrollY
    let currentScroll = scrollY

    const queueFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion)
    }

    const updateMotion = () => {
      frame = 0
      currentX += (pointerX - currentX) * 0.075
      currentY += (pointerY - currentY) * 0.075
      currentScroll += (scrollY - currentScroll) * 0.09

      const viewportHeight = Math.max(window.innerHeight, 1)
      const scrollProgress = Math.min(currentScroll / 900, 1)
      const scrollPhase = currentScroll / viewportHeight
      const scrollShift = Math.sin(scrollPhase * 0.9) * 10 - scrollProgress * 44
      const scrollScale = 1 + scrollProgress * 0.035
      const scrollOpacity = 0.92 - scrollProgress * 0.12

      presence.style.setProperty('--brain-scroll', scrollProgress.toFixed(4))
      presence.style.setProperty('--brain-scroll-y', `${scrollShift.toFixed(2)}px`)
      presence.style.setProperty('--brain-scroll-scale', scrollScale.toFixed(4))
      presence.style.setProperty('--brain-depth-opacity', scrollOpacity.toFixed(4))
      presence.style.setProperty('--brain-tilt-x', `${(currentY * -4).toFixed(3)}deg`)
      presence.style.setProperty('--brain-tilt-y', `${(currentX * 5).toFixed(3)}deg`)
      presence.style.setProperty('--brain-parallax-x', `${(currentX * 12).toFixed(2)}px`)
      presence.style.setProperty('--brain-parallax-y', `${(currentY * 8).toFixed(2)}px`)

      const pointerSettled = Math.abs(pointerX - currentX) < 0.002 && Math.abs(pointerY - currentY) < 0.002
      const scrollSettled = Math.abs(scrollY - currentScroll) < 0.25
      if (!pointerSettled || !scrollSettled) queueFrame()
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2
      pointerY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2
      queueFrame()
    }

    const onPointerLeave = () => {
      pointerX = 0
      pointerY = 0
      queueFrame()
    }

    const onScroll = () => {
      scrollY = window.scrollY
      queueFrame()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    queueFrame()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={sceneRef} className="ria-cinematic-background is-brain-presence" aria-hidden="true">
      <RiaBrainPresence />
      <div className="ria-cinematic-readability" />
      <div className="ria-cinematic-grain" />
    </div>
  )
}
