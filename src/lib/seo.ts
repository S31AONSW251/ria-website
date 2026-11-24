import datasetJson from '../data/seo.json'
import { buildPageMeta, findPage, normalizePath } from './seo-core.js'

export interface SeoSite {
  name: string
  alternateName: string
  url: string
  locale: string
  language: string
  product: string
  company: string
  founded: string
  founder: string
  email: string
  country: string
  themeColor: string
  organizationLogo: string
  productLogo: string
  softwareVersion: string
  softwareDescription: string
}

export interface SeoPage {
  path: string
  name: string
  title: string
  description: string
  ogImage: string
  ogImageAlt: string
  priority: string
  changeFrequency: string
  indexable: boolean
  includeProduct: boolean
  breadcrumb: string | null
}

export interface SeoDataset {
  site: SeoSite
  pages: SeoPage[]
}

export interface SeoMeta {
  path: string
  title: string
  description: string
  canonical: string
  robots: string
  image: string
  imageAlt: string
  og: Record<string, string>
  twitter: Record<string, string>
  jsonLd: Record<string, unknown>
}

/** Single source of truth shared with the Node prerender script. */
export const SEO_DATA = datasetJson as unknown as SeoDataset
export const SITE_SEO = SEO_DATA.site
export const SEO_PAGES = SEO_DATA.pages

export const NOT_FOUND_PAGE: SeoPage = {
  path: '/404',
  name: 'Page not found',
  title: 'Page not found — AION',
  description:
    'The page you were looking for is not available. Return to the AION home page or explore RIA.',
  ogImage: SEO_DATA.pages[0].ogImage,
  ogImageAlt: SEO_DATA.pages[0].ogImageAlt,
  priority: '0.0',
  changeFrequency: 'yearly',
  indexable: false,
  includeProduct: false,
  breadcrumb: null,
}

export function isKnownPath(pathname: string): boolean {
  const wanted = normalizePath(pathname)
  return SEO_PAGES.some((page) => page.path === wanted)
}

export function getPage(pathname: string): SeoPage {
  return isKnownPath(pathname) ? findPage(SEO_DATA, pathname) : NOT_FOUND_PAGE
}

export function getPageMeta(pathname: string): SeoMeta {
  return buildPageMeta(SEO_DATA, getPage(pathname)) as SeoMeta
}

export { buildPageMeta, findPage, normalizePath, buildJsonLd } from './seo-core.js'
