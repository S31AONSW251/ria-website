import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { COMPANY, PRODUCT, SITE_URL } from '../lib/site'

const OG_IMAGE = `${SITE_URL}/assets/ria/product/ria-workspace-og.png`

function setMeta(
  selector: string,
  attr: 'name' | 'property',
  value: string,
) {
  let element = document.head.querySelector(
    `meta[${attr}="${selector}"]`,
  ) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, selector)
    document.head.appendChild(element)
  }

  element.content = value
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

export function Seo({
  title,
  description,
  noIndex = false,
}: {
  title: string
  description: string
  noIndex?: boolean
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = `${title} — ${PRODUCT} by ${COMPANY}`
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

    document.title = fullTitle

    setMeta('description', 'name', description)
    setMeta('robots', 'name', noIndex ? 'noindex, nofollow' : 'index, follow')

    setMeta('og:type', 'property', 'website')
    setMeta('og:site_name', 'property', COMPANY)
    setMeta('og:title', 'property', fullTitle)
    setMeta('og:description', 'property', description)
    setMeta('og:url', 'property', url)
    setMeta('og:image', 'property', OG_IMAGE)
    setMeta('og:image:width', 'property', '1200')
    setMeta('og:image:height', 'property', '630')

    setMeta('twitter:card', 'name', 'summary_large_image')
    setMeta('twitter:title', 'name', fullTitle)
    setMeta('twitter:description', 'name', description)
    setMeta('twitter:image', 'name', OG_IMAGE)

    setLink('canonical', url)
  }, [title, description, noIndex, pathname])

  return null
}
