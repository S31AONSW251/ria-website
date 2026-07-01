import { useCallback, useRef, useState } from 'react'

const fallbackNodes = [
  [180, 170, 3.2], [245, 108, 2.5], [330, 116, 2.8], [420, 108, 2.4],
  [500, 170, 3.1], [148, 256, 2.4], [254, 242, 2.8], [345, 220, 3.4],
  [438, 244, 2.6], [548, 260, 2.4], [194, 356, 2.8], [306, 350, 2.5],
  [394, 350, 2.8], [506, 356, 2.7], [258, 446, 2.4], [350, 470, 3.2],
  [456, 446, 2.4],
]

const fallbackLinks = [
  'M180 170 C220 132 270 114 330 116 C382 118 432 132 500 170',
  'M148 256 C214 230 281 224 345 220 C412 222 478 234 548 260',
  'M194 356 C254 326 306 326 350 470 C392 326 448 326 506 356',
  'M245 108 C254 180 254 214 254 242 C244 302 234 340 194 356',
  'M420 108 C438 166 438 212 438 244 C454 302 472 340 506 356',
  'M180 170 C178 246 188 304 258 446 M500 170 C514 246 506 304 456 446',
  'M148 256 C206 284 254 314 306 350 C336 382 348 424 350 470',
  'M548 260 C496 286 448 316 394 350 C366 382 352 424 350 470',
]

export default function RiaBrainPresence() {
  const warnedRef = useRef(false)
  const [imageReady, setImageReady] = useState(false)
  const [imageMissing, setImageMissing] = useState(false)

  const handleImageError = useCallback(() => {
    setImageMissing(true)
    setImageReady(false)

    if (!warnedRef.current) {
      warnedRef.current = true
      console.warn('RIA brain image missing: place ria-4k-neural-brain.png in public/assets/ria/')
    }
  }, [])

  return (
    <div className="ria-hero-scene-fallback" aria-hidden="true">
      <div className="ria-brain-presence" data-image-state={imageMissing ? 'fallback' : imageReady ? 'loaded' : 'loading'}>
        <div className="ria-brain-depth-shell">
          {!imageMissing && (
            <img
              src="/assets/ria/ria-4k-neural-brain.png"
              alt=""
              className={`ria-brain-image${imageReady ? ' is-loaded' : ''}`}
              loading="eager"
              decoding="async"
              onLoad={() => setImageReady(true)}
              onError={handleImageError}
            />
          )}

          {(imageMissing || !imageReady) && (
            <svg className="ria-brain-fallback-svg" viewBox="0 0 700 620" preserveAspectRatio="xMidYMid meet" role="img">
              <defs>
                <radialGradient id="riaBrainFallbackVolume" cx="50%" cy="46%" r="58%">
                  <stop offset="0%" stopColor="#dffcff" stopOpacity="0.44" />
                  <stop offset="34%" stopColor="#7de7f5" stopOpacity="0.18" />
                  <stop offset="72%" stopColor="#1b86a6" stopOpacity="0.055" />
                  <stop offset="100%" stopColor="#05131a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="riaBrainFallbackEdge" x1="12%" y1="8%" x2="88%" y2="92%">
                  <stop offset="0%" stopColor="#ecfeff" stopOpacity="0.82" />
                  <stop offset="42%" stopColor="#86edf8" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#22a6c7" stopOpacity="0.16" />
                </linearGradient>
                <filter id="riaBrainFallbackGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <ellipse className="ria-brain-fallback-aura" cx="350" cy="308" rx="316" ry="252" />
              <path
                className="ria-brain-fallback-volume"
                d="M126 282 C87 217 118 143 186 116 C220 57 301 63 350 100 C404 59 485 57 520 116 C596 148 626 224 580 292 C615 356 580 436 505 458 C466 526 389 534 350 492 C304 535 224 525 190 462 C112 440 82 352 126 282 Z"
              />
              <path
                className="ria-brain-fallback-midline"
                d="M350 100 C323 166 335 228 350 292 C372 382 369 448 350 492"
              />

              <g className="ria-brain-fallback-folds">
                <path d="M186 116 C206 164 236 180 288 170 C316 168 333 184 345 218" />
                <path d="M520 116 C494 166 462 184 414 170 C388 166 366 184 354 218" />
                <path d="M126 282 C185 258 230 260 278 292 C305 310 329 310 350 292" />
                <path d="M580 292 C524 262 472 262 422 294 C394 312 371 311 350 292" />
                <path d="M190 462 C222 416 260 396 308 404 C331 408 344 434 350 470" />
                <path d="M505 458 C470 414 430 396 392 404 C366 409 354 434 350 470" />
                <path d="M148 256 C196 320 224 354 194 356 C169 358 140 334 126 282" />
                <path d="M548 260 C506 316 482 350 506 356 C535 363 566 336 580 292" />
              </g>

              <g className="ria-brain-fallback-links">
                {fallbackLinks.map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>

              <g className="ria-brain-fallback-nodes">
                {fallbackNodes.map(([cx, cy, r], index) => (
                  <circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={r}
                    style={{ animationDelay: `${index * -0.28}s` }}
                  />
                ))}
              </g>
            </svg>
          )}

          <div className="ria-brain-glow" />
          <div className="ria-brain-particle-field" />
          <div className="ria-brain-scanline" />
          <div className="ria-brain-orbit-ring ring-1" />
          <div className="ria-brain-orbit-ring ring-2" />
        </div>
      </div>
    </div>
  )
}
