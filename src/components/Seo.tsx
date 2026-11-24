import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta } from '../lib/seo'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector(
    `meta[${attr}="${key}"]`,
  ) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', value)
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

function setJsonLd(data: Record<string, unknown>) {
  const id = 'aion-structured-data'
  let element = document.getElementById(id) as HTMLScriptElement | null

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

/**
 * Keeps document metadata in sync after client-side navigation. The same values
 * are written into each static HTML file at build time by scripts/prerender.mjs,
 * so crawlers see them without running JavaScript.
 */
export function Seo() {
  const { pathname } = useLocation()
  const meta = useMemo(() => getPageMeta(pathname), [pathname])

  useEffect(() => {
    document.title = meta.title

    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', meta.robots)
    setLink('canonical', meta.canonical)

    for (const [key, value] of Object.entries(meta.og)) {
      setMeta('property', `og:${key}`, value)
    }
    for (const [key, value] of Object.entries(meta.twitter)) {
      setMeta('name', `twitter:${key}`, value)
    }

    setJsonLd(meta.jsonLd)
  }, [meta])

  return null
}
