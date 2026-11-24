/**
 * Shared SEO core.
 *
 * This module is deliberately plain JavaScript so that the browser bundle, the
 * type-checked React code and the Node prerender script can all use the exact
 * same metadata logic. There is no DOM access here: it only builds values.
 */

/**
 * @typedef {Object} SeoPage
 * @property {string} path
 * @property {string} name
 * @property {string} title
 * @property {string} description
 * @property {string} ogImage
 * @property {string} ogImageAlt
 * @property {string} priority
 * @property {string} changeFrequency
 * @property {boolean} indexable
 * @property {boolean} includeProduct
 * @property {string|null} breadcrumb
 */

/**
 * @typedef {Object} SeoSite
 * @property {string} name
 * @property {string} alternateName
 * @property {string} url
 * @property {string} locale
 * @property {string} language
 * @property {string} product
 * @property {string} company
 * @property {string} founded
 * @property {string} founder
 * @property {string} email
 * @property {string} country
 * @property {string} themeColor
 * @property {string} organizationLogo
 * @property {string} productLogo
 * @property {string} softwareVersion
 * @property {string} softwareDescription
 */

/**
 * @typedef {Object} SeoDataset
 * @property {SeoSite} site
 * @property {SeoPage[]} pages
 */

const trimTrailingSlash = (value) => value.replace(/\/+$/, '')

/**
 * Absolute URL for a site-relative path.
 * @param {string} siteUrl
 * @param {string} pathname
 */
export function absoluteUrl(siteUrl, pathname) {
  const base = trimTrailingSlash(siteUrl)
  if (!pathname || pathname === '/') return `${base}/`
  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

/**
 * Normalises a pathname so that `/product/`, `product` and `/product` all match
 * the same page entry.
 * @param {string} pathname
 */
export function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  const clean = pathname.split('?')[0].split('#')[0]
  const withSlash = clean.startsWith('/') ? clean : `/${clean}`
  return trimTrailingSlash(withSlash) || '/'
}

/**
 * @param {SeoDataset} dataset
 * @param {string} pathname
 * @returns {SeoPage}
 */
export function findPage(dataset, pathname) {
  const wanted = normalizePath(pathname)
  return (
    dataset.pages.find((page) => page.path === wanted) ?? dataset.pages[0]
  )
}

/**
 * Resolves the full metadata contract for one page.
 * @param {SeoDataset} dataset
 * @param {SeoPage} page
 */
export function buildPageMeta(dataset, page) {
  const { site } = dataset
  const canonical = absoluteUrl(site.url, page.path)
  const image = absoluteUrl(site.url, page.ogImage)
  const robots = page.indexable
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow'

  return {
    path: page.path,
    title: page.title,
    description: page.description,
    canonical,
    robots,
    image,
    imageAlt: page.ogImageAlt,
    og: {
      type: 'website',
      site_name: site.name,
      locale: site.locale,
      title: page.title,
      description: page.description,
      url: canonical,
      image,
      'image:width': '1200',
      'image:height': '630',
      'image:alt': page.ogImageAlt,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      image,
      'image:alt': page.ogImageAlt,
    },
    jsonLd: buildJsonLd(dataset, page),
  }
}

/**
 * Structured data graph. Only verifiable, on-site facts are used: no invented
 * ratings, reviews, awards, employee counts or certifications.
 * @param {SeoDataset} dataset
 * @param {SeoPage} page
 */
export function buildJsonLd(dataset, page) {
  const { site } = dataset
  const base = trimTrailingSlash(site.url)
  const orgId = `${base}/#organization`
  const websiteId = `${base}/#website`
  const softwareId = `${base}/#software`
  const pageUrl = absoluteUrl(site.url, page.path)
  const webpageId = `${pageUrl}#webpage`
  const imageId = `${pageUrl}#primaryimage`
  const breadcrumbId = `${pageUrl}#breadcrumb`
  const image = absoluteUrl(site.url, page.ogImage)

  /** @type {Record<string, unknown>[]} */
  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.company,
      alternateName: site.alternateName,
      url: `${base}/`,
      slogan: 'Advancing the future of personal intelligence.',
      description:
        'AION is an independent software company building RIA, a personal intelligence workspace for Windows.',
      email: site.email,
      logo: {
        '@type': 'ImageObject',
        '@id': `${base}/#logo`,
        url: absoluteUrl(site.url, site.organizationLogo),
        contentUrl: absoluteUrl(site.url, site.organizationLogo),
        width: 512,
        height: 512,
        caption: 'AION',
      },
      image: { '@id': `${base}/#logo` },
      founder: { '@type': 'Person', name: site.founder },
      foundingDate: site.founded,
      foundingLocation: { '@type': 'Country', name: site.country },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${base}/`,
      name: site.name,
      alternateName: site.alternateName,
      description:
        'The official home of AION and RIA — a private intelligence system for persistent memory, intelligent automation, advanced reasoning and personal computing.',
      publisher: { '@id': orgId },
      inLanguage: site.language,
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: pageUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': page.includeProduct ? softwareId : orgId },
      primaryImageOfPage: { '@id': imageId },
      breadcrumb: page.breadcrumb ? { '@id': breadcrumbId } : undefined,
      inLanguage: site.language,
    },
    {
      '@type': 'ImageObject',
      '@id': imageId,
      url: image,
      contentUrl: image,
      width: 1200,
      height: 630,
      caption: page.ogImageAlt,
    },
  ]

  if (page.includeProduct) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      name: site.product,
      alternateName: `${site.product} by ${site.company}`,
      description: site.softwareDescription,
      applicationCategory: 'ProductivityApplication',
      applicationSubCategory: 'Personal intelligence workspace',
      operatingSystem: 'Windows 10, Windows 11',
      softwareVersion: site.softwareVersion,
      url: absoluteUrl(site.url, '/product'),
      image: absoluteUrl(site.url, '/assets/brand/og/ria-product.png'),
      publisher: { '@id': orgId },
      author: { '@id': orgId },
      inLanguage: site.language,
    })
  }

  if (page.breadcrumb) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${base}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.breadcrumb,
          item: pageUrl,
        },
      ],
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
