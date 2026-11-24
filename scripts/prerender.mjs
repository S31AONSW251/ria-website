/**
 * Static prerender for the AION / RIA site.
 *
 * Runs after `vite build`. It takes the built single-page app shell and writes a
 * per-route HTML file with the page's real title, description, canonical, Open
 * Graph, Twitter and JSON-LD metadata already in the initial HTML. The React app
 * still boots on top of it (SPA navigation keeps working), but crawlers and
 * social scrapers no longer need JavaScript to read the metadata.
 *
 * Also emits: dist/404.html, dist/sitemap.xml, public/sitemap.xml.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPageMeta, absoluteUrl } from '../src/lib/seo-core.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dist = path.join(root, 'dist')

const dataset = JSON.parse(
  await readFile(path.join(root, 'src', 'data', 'seo.json'), 'utf8'),
)

const { site } = dataset
const today = new Date().toISOString().slice(0, 10)

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const jsonLdScript = (data) =>
  `<script type="application/ld+json" id="aion-structured-data">${JSON.stringify(
    data,
    null,
    2,
  ).replace(/</g, '\\u003c')}</script>`

const metaTag = (attr, key, value) =>
  `<meta ${attr}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`

function renderHead(meta) {
  const lines = [
    `<title>${escapeHtml(meta.title)}</title>`,
    metaTag('name', 'description', meta.description),
    metaTag('name', 'robots', meta.robots),
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
  ]

  for (const [key, value] of Object.entries(meta.og)) {
    lines.push(metaTag('property', `og:${key}`, value))
  }
  for (const [key, value] of Object.entries(meta.twitter)) {
    lines.push(metaTag('name', `twitter:${key}`, value))
  }

  lines.push(jsonLdScript(meta.jsonLd))
  return lines.map((line) => `    ${line}`).join('\n')
}

function injectHead(template, headHtml) {
  const start = '<!-- seo:start -->'
  const end = '<!-- seo:end -->'
  const startIndex = template.indexOf(start)
  const endIndex = template.indexOf(end)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(
      'index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers.',
    )
  }

  return (
    template.slice(0, startIndex + start.length) +
    '\n' +
    headHtml +
    '\n' +
    template.slice(endIndex)
  )
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

/* -------------------------------------------------------------------------- */
/*  Per-route HTML                                                            */
/* -------------------------------------------------------------------------- */

for (const page of dataset.pages) {
  const meta = buildPageMeta(dataset, page)
  const html = injectHead(template, renderHead(meta))
  const target =
    page.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, page.path.replace(/^\//, ''), 'index.html')

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html, 'utf8')
  console.log(`prerendered ${page.path} -> ${path.relative(root, target)}`)
}

/* -------------------------------------------------------------------------- */
/*  404 page (real HTTP 404, branded and self-contained)                      */
/* -------------------------------------------------------------------------- */

const notFoundMeta = buildPageMeta(dataset, {
  ...dataset.pages[0],
  path: '/404',
  name: 'Page not found',
  title: 'Page not found — AION',
  description:
    'The page you were looking for is not available. Return to the AION home page or explore RIA.',
  indexable: false,
  includeProduct: false,
  breadcrumb: null,
})

const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(notFoundMeta.title)}</title>
    <meta name="description" content="${escapeHtml(notFoundMeta.description)}" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="${escapeHtml(site.themeColor)}" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f7f7f5;
        color: #171717;
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
        padding: 32px;
      }
      main { max-width: 560px; }
      .brand { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 40px; }
      .brand img { width: 26px; height: 26px; border-radius: 22%; display: block; }
      .brand span {
        font-size: 13px; font-weight: 700; letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .rule { width: 1px; height: 20px; background: #d6d6d1; }
      .eyebrow {
        display: inline-flex; align-items: center; gap: 8px;
        font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
        color: #686868; margin: 0 0 18px;
      }
      .dot { width: 6px; height: 6px; border-radius: 50%; background: #3d5a49; }
      h1 {
        font-size: clamp(2rem, 6vw, 3rem); line-height: 1.06;
        letter-spacing: -0.03em; margin: 0 0 18px; font-weight: 600;
      }
      p { color: #686868; font-size: 1rem; line-height: 1.65; margin: 0 0 32px; max-width: 44ch; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; }
      a.btn {
        display: inline-flex; align-items: center; justify-content: center;
        padding: 13px 22px; border-radius: 999px; font-size: 0.9375rem;
        font-weight: 500; text-decoration: none; border: 1px solid transparent;
        transition: background 180ms ease, color 180ms ease;
      }
      a.btn-primary { background: #171717; color: #f4f4f0; }
      a.btn-primary:hover { background: #2b2b29; }
      a.btn-secondary { background: transparent; color: #171717; border-color: #d6d6d1; }
      a.btn-secondary:hover { background: #ffffff; }
      footer { margin-top: 56px; font-size: 0.8125rem; color: #8c8c88; }
    </style>
  </head>
  <body>
    <main>
      <a class="brand" href="/" aria-label="AION home">
        <svg width="26" height="26" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path fill="#171717" d="M 50 5 L 93 94 L 77 94 L 56 57 L 56 67 L 44 67 L 44 57 L 23 94 L 7 94 Z" />
        </svg>
        <span>AION</span>
        <span class="rule" aria-hidden="true"></span>
        <img src="/assets/brand/ria-mark-128.png" alt="" width="26" height="26" />
        <span>RIA</span>
      </a>
      <p class="eyebrow"><span class="dot" aria-hidden="true"></span>404 — Page not found</p>
      <h1>This page isn&rsquo;t here.</h1>
      <p>
        The page you were looking for may have moved. Start from the product, or
        return to the AION home page.
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="/">Back to AION</a>
        <a class="btn btn-secondary" href="/product">Explore RIA</a>
      </div>
      <footer>&copy; ${new Date().getFullYear()} AION. RIA is a product of AION.</footer>
    </main>
  </body>
</html>
`

await writeFile(path.join(dist, '404.html'), notFoundHtml, 'utf8')
console.log('prerendered /404 -> dist/404.html')

/* -------------------------------------------------------------------------- */
/*  Sitemap                                                                   */
/* -------------------------------------------------------------------------- */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${dataset.pages
  .map(
    (page) => `  <url>
    <loc>${escapeHtml(absoluteUrl(site.url, page.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')
console.log(`sitemap written with ${dataset.pages.length} canonical URLs`)

console.log('Prerender complete.')
