import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*  Brand                                                                     */
/* -------------------------------------------------------------------------- */

export function AionMark({
  size = 24,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="nonzero"
        fill="currentColor"
        d="M 50 5 L 93 94 L 77 94 L 56 57 L 56 67 L 44 67 L 44 57 L 23 94 L 7 94 Z"
      />
    </svg>
  )
}

export function AionWordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="aion-wordmark">
      <AionMark size={size} />
      <span>AION</span>
    </span>
  )
}

export function RiaMark({
  size = 26,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <img
      src="/assets/brand/ria-mark-128.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={`ria-mark ${className}`}
    />
  )
}

export function RiaProductLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`ria-product-lockup${compact ? ' is-compact' : ''}`}>
      <RiaMark size={compact ? 20 : 24} />
      <span className="ria-product-name">RIA</span>
      {!compact && <span className="ria-product-sub">Personal intelligence</span>}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Type & links                                                              */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  light = false,
  dot = false,
}: {
  children: ReactNode
  light?: boolean
  dot?: boolean
}) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      {dot && <span className="status-dot" aria-hidden="true" />}
      {children}
    </p>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  split = false,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  split?: boolean
  className?: string
}) {
  return (
    <div className={`section-head${split ? ' section-head--split' : ''} ${className}`.trim()}>
      <div className="section-head-main">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="section-title">{title}</h2>
      </div>
      {intro && <div className="section-head-intro">{intro}</div>}
    </div>
  )
}

export function TextLink({
  to,
  children,
  light = false,
}: {
  to: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <Link to={to} className={`text-link${light ? ' text-link--light' : ''}`}>
      <span>{children}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  )
}

export function ExternalTextLink({
  href,
  children,
  light = false,
}: {
  href: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <a
      href={href}
      className={`text-link${light ? ' text-link--light' : ''}`}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <span>{children}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*  Motion                                                                    */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Product imagery                                                           */
/* -------------------------------------------------------------------------- */

export type ProductImage = {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
}

export function ProductFrame({
  image,
  sizes = '(max-width: 767px) 100vw, (max-width: 1200px) 92vw, 1160px',
  caption,
  label,
  priority = false,
  className = '',
}: {
  image: ProductImage
  sizes?: string
  caption?: ReactNode
  label?: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure className={`product-frame ${className}`.trim()}>
      <div className="product-frame-media">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
      {(caption || label) && (
        <figcaption className="product-frame-caption">
          <span>{caption}</span>
          {label && <span className="product-frame-label">{label}</span>}
        </figcaption>
      )}
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page hero                                                                 */
/* -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
  meta,
  children,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  aside?: ReactNode
  meta?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container">
        <div className={`page-hero-grid${aside ? ' has-aside' : ''}`}>
          <div className="page-hero-copy">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="page-title">{title}</h1>
            <p className="page-intro">{intro}</p>
            {meta && <div className="page-meta">{meta}</div>}
            {children}
          </div>
          {aside && <div className="page-hero-aside">{aside}</div>}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Small primitives                                                          */
/* -------------------------------------------------------------------------- */

export function StatusPill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'positive' | 'warning'
}) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>
}

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`divider ${className}`.trim()} aria-hidden="true" />
}
