import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Clock3,
  Code2,
  Download,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Github,
  LockKeyhole,
  Inbox,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  UserCheck
} from 'lucide-react'
import { exchangeProjects, exchangeReviewSteps, softwareCategories, type ExchangeProject, type SoftwareCategory } from '../data/softwareExchange'
import ExchangeSubmissionDialog from '../components/software-exchange/ExchangeSubmissionDialog'
import { getPendingSubmissions, removePendingSubmission, type PendingSubmission, type SubmissionResult } from '../services/softwareExchangeService'
import '../software-exchange.css'

const formatCount = (value: number) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)

function setPageMeta(name: string, content: string, property = false) {
  const attribute = property ? 'property' : 'name'
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.content = content
}

function VerifiedBadge() {
  return <span className="exchange-verified"><BadgeCheck aria-hidden="true" /> Example review profile</span>
}

function ProjectCard({ project }: { project: ExchangeProject }) {
  return (
    <article className="exchange-project-card">
      <div className="exchange-project-head">
        <span className="exchange-project-icon"><Box aria-hidden="true" /></span>
        <div>
          <span className="exchange-repository-label">FEATURED ECOSYSTEM EXAMPLE</span>
          <h3>{project.title}</h3>
        </div>
        {project.verified && <VerifiedBadge />}
      </div>
      <p>{project.description}</p>
      <div className="exchange-tag-row" aria-label={`${project.title} tags`}>
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <dl className="exchange-project-specs">
        <div><dt>Author</dt><dd>{project.author}</dd></div>
        <div><dt>Category</dt><dd>{project.category}</dd></div>
        <div><dt>Version</dt><dd>v{project.version}</dd></div>
        <div><dt>License</dt><dd>{project.license}</dd></div>
      </dl>
      <div className="exchange-project-compatibility"><PackageCheck aria-hidden="true" /> {project.compatibility}</div>
      <footer className="exchange-project-footer">
        <span><Star aria-hidden="true" /> {formatCount(project.stars)}</span>
        <span><Download aria-hidden="true" /> {formatCount(project.downloads)}</span>
        <span><Clock3 aria-hidden="true" /> {project.updated}</span>
      </footer>
    </article>
  )
}

function PendingSubmissionCard({ submission, onRemove }: { submission: PendingSubmission; onRemove: (id: string) => void }) {
  const title = submission.kind === 'software' ? submission.projectName : submission.repositoryUrl.replace(/^https?:\/\//, '')
  const repositoryUrl = submission.repositoryUrl
  return (
    <article className="exchange-pending-card">
      <div className="exchange-pending-head">
        <span><Inbox aria-hidden="true" /> Pending review</span>
        <button type="button" onClick={() => onRemove(submission.id)} aria-label={`Remove ${title} from local pending review`}><Trash2 aria-hidden="true" /></button>
      </div>
      <h3>{title}</h3>
      <p>{submission.kind === 'software' ? submission.shortDescription : `${submission.packageType} · ${submission.branch} · ${submission.manifestPath}`}</p>
      <dl>
        <div><dt>Type</dt><dd>{submission.kind}</dd></div>
        <div><dt>Delivery</dt><dd>{submission.delivery.replace(/-/g, ' ')}</dd></div>
        <div><dt>Submitted</dt><dd>{new Date(submission.submittedAt).toLocaleString()}</dd></div>
      </dl>
      <a href={repositoryUrl} target="_blank" rel="noreferrer">Inspect repository <ExternalLink aria-hidden="true" /></a>
      <small>Stored only in this browser. Not public and not AION verified.</small>
    </article>
  )
}

function ExchangeLoadingState() {
  return (
    <div className="exchange-state" role="status" aria-live="polite">
      <span className="exchange-state-orbit" aria-hidden="true" />
      <strong>Loading software registry</strong>
      <p>Resolving verified manifests, compatibility, and release metadata.</p>
    </div>
  )
}

function ExchangeEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="exchange-state">
      <Search aria-hidden="true" />
      <strong>No software matches this query</strong>
      <p>Change the category or search across project names, authors, descriptions, and tags.</p>
      <button type="button" onClick={onReset}>Reset catalog</button>
    </div>
  )
}

export default function SoftwareExchangePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SoftwareCategory>('All')
  const [isLoading] = useState(false)
  const [dialogMode, setDialogMode] = useState<'software' | 'repository' | null>(null)
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>(() => getPendingSubmissions())
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const title = 'UPLOAD PROJECT | AION'
    const description = 'Discover owner-approved agents, plugins, automations, memory tools, robotics modules, and local software for the RIA ecosystem.'
    document.title = title
    setPageMeta('description', description)
    setPageMeta('og:title', title, true)
    setPageMeta('og:description', description, true)
    setPageMeta('og:url', 'https://www.aiontec.co.in/software-exchange', true)
    setPageMeta('twitter:title', title)
    setPageMeta('twitter:description', description)
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = 'https://www.aiontec.co.in/software-exchange'
  }, [])

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, [contenteditable="true"]')) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return exchangeProjects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category
      const searchable = [project.title, project.description, project.author, project.category, ...project.tags].join(' ').toLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, query])

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const recentProjects = filteredProjects.slice(0, 7)
  const resetCatalog = () => { setQuery(''); setCategory('All') }
  const handleSubmitted = (_result: SubmissionResult) => {
    setPendingSubmissions(getPendingSubmissions())
  }
  const handleRemovePending = (id: string) => {
    removePendingSubmission(id)
    setPendingSubmissions(getPendingSubmissions())
  }
  const viewPendingSubmissions = () => {
    setDialogMode(null)
    window.requestAnimationFrame(() => document.getElementById('pending-review-title')?.scrollIntoView({ block: 'start' }))
  }

  return (
    <div className="software-exchange-page">
      <section className="exchange-hero" aria-labelledby="exchange-title">
        <div className="exchange-hero-grid" aria-hidden="true" />
        <div className="exchange-orb exchange-orb-one" aria-hidden="true" />
        <div className="exchange-orb exchange-orb-two" aria-hidden="true" />
        <div className="exchange-container exchange-hero-layout">
          <div className="exchange-hero-copy">
            <p className="exchange-eyebrow"><span /> AION BUILDER NETWORK / FRONTEND MVP</p>
            <h1 id="exchange-title">UPLOAD <em>PROJECT</em></h1>
            <p className="exchange-hero-subtitle">Publish tools into the private intelligence ecosystem. UPLOAD PROJECT is the builder layer for agents, plugins, automations, memory tools, UI modules, robotics connectors, and local applications.</p>
            <div className="exchange-hero-actions">
              <button type="button" className="exchange-button exchange-button-primary" onClick={() => setDialogMode('software')}>
                <UploadCloud aria-hidden="true" /> Submit Software <ArrowRight aria-hidden="true" />
              </button>
              <button type="button" className="exchange-button exchange-button-secondary" onClick={() => setDialogMode('repository')}>
                <Github aria-hidden="true" /> Connect Repository
              </button>
            </div>
            <p className="exchange-hero-disclosure">Repository-based intake · local draft recovery · review email fallback · no direct package upload</p>
          </div>
          <aside className="exchange-hero-console" aria-label="Exchange registry status">
            <div className="exchange-console-bar"><span /><span /><span /><small>registry.ria / public-preview</small></div>
            <div className="exchange-console-body">
              <div><span>Registry state</span><strong><i /> Submission MVP</strong></div>
              <div><span>Review boundary</span><strong>Owner-approved</strong></div>
              <div><span>Execution policy</span><strong>Local-first</strong></div>
              <div><span>Public listings</span><strong>0 · backend not connected</strong></div>
              <div><span>Local pending</span><strong>{pendingSubmissions.length} in this browser</strong></div>
              <div className="exchange-console-command"><code>ria exchange inspect --manifest</code><small>Review metadata before any installation.</small></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="exchange-trust-rail" aria-label="Exchange trust principles">
        <div className="exchange-container">
          <span><LockKeyhole aria-hidden="true" /><strong>Local-first</strong> data ownership</span>
          <span><UserCheck aria-hidden="true" /><strong>Owner-approved</strong> installation</span>
          <span><ShieldCheck aria-hidden="true" /><strong>Safe execution</strong> boundaries</span>
          <span><FileCheck2 aria-hidden="true" /><strong>Visible manifests</strong> and licensing</span>
        </div>
      </section>

      <section className="exchange-registry-stats" aria-label="Software Exchange MVP status">
        <div className="exchange-container">
          <div><span>Public catalog</span><strong>0 listings</strong></div>
          <div><span>Pending review</span><strong>{pendingSubmissions.length} local</strong></div>
          <div><span>Verified modules</span><strong>0 confirmed</strong></div>
          <div><span>Categories</span><strong>{softwareCategories.length - 1}</strong></div>
        </div>
      </section>

      <section className="exchange-pending" aria-labelledby="pending-review-title">
        <div className="exchange-container">
          <header className="exchange-section-heading exchange-section-heading-compact">
            <div><p className="exchange-eyebrow"><span /> LOCAL REVIEW QUEUE</p><h2 id="pending-review-title">Pending Review.</h2></div>
            <p>Real submissions prepared on this device appear here. They remain private to this browser until the review email is sent or a configured backend endpoint accepts the JSON payload.</p>
          </header>
          {pendingSubmissions.length > 0 ? (
            <div className="exchange-pending-grid">{pendingSubmissions.map((submission) => <PendingSubmissionCard key={submission.id} submission={submission} onRemove={handleRemovePending} />)}</div>
          ) : (
            <div className="exchange-community-empty"><Inbox aria-hidden="true" /><div><strong>No local submissions are pending.</strong><p>Submit software or connect a repository to create the first private review record in this browser.</p></div><button type="button" className="exchange-button exchange-button-secondary" onClick={() => setDialogMode('software')}>Prepare submission</button></div>
          )}
          <div className="exchange-storage-disclosure"><LockKeyhole aria-hidden="true" /><p><strong>Storage boundary:</strong> localStorage on this device. Clearing browser data removes these records. Pending items are not visible to other users and are not public listings.</p></div>
        </div>
      </section>

      <section className="exchange-catalog" aria-labelledby="catalog-title">
        <div className="exchange-container">
          <header className="exchange-section-heading">
            <div><p className="exchange-eyebrow"><span /> FEATURED ECOSYSTEM EXAMPLES</p><h2 id="catalog-title">What the reviewed catalog can become.</h2></div>
            <p>These are design examples—not public uploads or confirmed community projects. They demonstrate the metadata, compatibility, licensing, provenance, and review states planned for the connected catalog.</p>
          </header>
          <div className="exchange-search-shell">
            <label className="exchange-search-field">
              <span className="sr-only">Search software</span>
              <Search aria-hidden="true" />
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, builders, capabilities, or tags…" />
              <kbd>/</kbd>
            </label>
            <span className="exchange-result-count" aria-live="polite">{filteredProjects.length} modules</span>
          </div>
          <div className="exchange-filters" role="group" aria-label="Software categories">
            {softwareCategories.map((item) => (
              <button key={item} type="button" className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          {isLoading ? <ExchangeLoadingState /> : filteredProjects.length === 0 ? <ExchangeEmptyState onReset={resetCatalog} /> : (
            <>
              <div className="exchange-grid-label"><span>Featured ecosystem examples</span><small>Demonstration records · not public submissions</small></div>
              <div className="exchange-project-grid">
                {(featuredProjects.length ? featuredProjects : filteredProjects).map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            </>
          )}
          <div className="exchange-community-callout"><div><Inbox aria-hidden="true" /><span><strong>Community submissions will appear here after review.</strong><small>A persistent backend registry and approval workflow must be connected before anything is published.</small></span></div><button type="button" className="exchange-button exchange-button-secondary" onClick={() => setDialogMode('repository')}>Connect repository</button></div>
        </div>
      </section>

      <section className="exchange-recent" aria-labelledby="recent-title">
        <div className="exchange-container">
          <header className="exchange-section-heading exchange-section-heading-compact">
            <div><p className="exchange-eyebrow"><span /> EXAMPLE REGISTRY VIEW</p><h2 id="recent-title">Repository metadata, made reviewable.</h2></div>
            <p>This table is an example presentation of catalog metadata. It is not a live activity feed and does not represent real public submissions.</p>
          </header>
          <div className="exchange-table-wrap">
            <table>
              <thead><tr><th>Project</th><th>Category</th><th>Release</th><th>Compatibility</th><th>Signals</th><th>Updated</th></tr></thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={`recent-${project.id}`}>
                    <td><strong>{project.title}{project.verified && <BadgeCheck aria-label="Example review profile" />}</strong><span>by {project.author}</span></td>
                    <td><span className="exchange-table-category">{project.category}</span></td>
                    <td><strong>v{project.version}</strong><span>{project.license}</span></td>
                    <td>{project.compatibility}</td>
                    <td><span className="exchange-table-signal"><Star aria-hidden="true" />{formatCount(project.stars)}</span><span className="exchange-table-signal"><Download aria-hidden="true" />{formatCount(project.downloads)}</span></td>
                    <td>{project.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="exchange-guidelines" id="developer-guidelines" aria-labelledby="guidelines-title">
        <div className="exchange-container exchange-guidelines-grid">
          <div className="exchange-guidelines-copy">
            <p className="exchange-eyebrow"><span /> DEVELOPER STANDARD</p>
            <h2 id="guidelines-title">Publish software people can inspect and trust.</h2>
            <p>Exchange submissions should make ownership, permissions, data movement, model access, compatibility, and failure behavior explicit. Verification is a review signal—not permission to execute without owner approval.</p>
            <Link to="/documentation" className="exchange-inline-link">Read developer documentation <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="exchange-guideline-cards">
            {[
              [Code2, 'Declare the interface', 'Provide a typed manifest, stable entrypoint, compatibility range, and clear configuration contract.'],
              [LockKeyhole, 'Minimize permissions', 'Request only the local resources, tools, models, and network access required for the module.'],
              [GitBranch, 'Preserve provenance', 'Publish source, release history, license, dependency lockfiles, and reproducible review evidence.'],
              [Sparkles, 'Design for recovery', 'Expose dry-run modes, meaningful errors, rollback paths, and owner-visible execution state.']
            ].map(([Icon, title, copy]) => {
              const GuidelineIcon = Icon as typeof Code2
              return <article key={title as string}><GuidelineIcon aria-hidden="true" /><h3>{title as string}</h3><p>{copy as string}</p></article>
            })}
          </div>
        </div>
      </section>

      <section className="exchange-requirements" aria-labelledby="review-requirements-title">
        <div className="exchange-container exchange-requirements-grid">
          <article>
            <span><FileCheck2 aria-hidden="true" /> REVIEW REQUIREMENTS</span>
            <h2 id="review-requirements-title">Evidence before listing.</h2>
            <p>Every candidate should make its operating contract inspectable before a reviewer considers publication.</p>
            <ul>
              <li>Public or reviewer-accessible repository and release provenance</li>
              <li>Declared license, version, runtime, dependencies, and compatibility</li>
              <li>Reproducible installation, configuration, failure, and rollback notes</li>
              <li>Accurate screenshots and product claims without fabricated adoption metrics</li>
            </ul>
          </article>
          <article>
            <span><ShieldCheck aria-hidden="true" /> SECURITY & OWNERSHIP</span>
            <h2>Permission defines the boundary.</h2>
            <p>Submission does not grant execution rights, verification, publication, or access to private repositories.</p>
            <ul>
              <li>Ownership or explicit submission permission is mandatory</li>
              <li>Network, filesystem, model, secret, and device permissions must be disclosed</li>
              <li>AION verification remains a human review decision</li>
              <li>Installation and execution always remain owner-approved</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="exchange-review" aria-labelledby="review-title">
        <div className="exchange-container">
          <header className="exchange-section-heading">
            <div><p className="exchange-eyebrow"><span /> HOW PUBLISHING WORKS</p><h2 id="review-title">Review before trust. Approve before action.</h2></div>
            <p>Submitted → Security Review → Compatibility Check → AION Verified → Published. Publication remains unavailable until a persistent review backend is connected.</p>
          </header>
          <ol className="exchange-review-steps">
            {exchangeReviewSteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
          </ol>
          <div className="exchange-final-cta">
            <div><span><ShieldCheck aria-hidden="true" /> AION EXCHANGE PRINCIPLE</span><h2>Software expands intelligence. Ownership defines the boundary.</h2></div>
            <button type="button" className="exchange-button exchange-button-primary" onClick={() => setDialogMode('software')}>Prepare a submission <ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </section>
      {dialogMode && <ExchangeSubmissionDialog mode={dialogMode} onClose={() => setDialogMode(null)} onViewPending={viewPendingSubmissions} onSubmitted={handleSubmitted} />}
    </div>
  )
}
