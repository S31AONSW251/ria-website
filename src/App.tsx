import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { motion } from 'framer-motion'
import {
  Brain,
  Clock,
  Cpu,
  FileText,
  Lock,
  Menu,
  Monitor,
  Network,
  Shield,
  ShieldCheck,
  Sliders,
  Workflow,
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Globe,
  ArrowUpRight
} from 'lucide-react'

// ─── Brand data ───────────────────────────────────────────────────────────────
const COMPANY = 'AION'
const PRODUCT  = 'RIA'
const SITE_URL = 'https://www.aiontec.co.in'
const CONTACT  = 'balasudeep22@gmail.com'
const FOUNDER  = 'Sudeep Bala'

// ─── Release info (verified) ──────────────────────────────────────────────────
const RELEASE = {
  version:     '1.0.0',
  date:        'July 5, 2026',
  dateShort:   '5 Jul 2026',
  platform:    'Windows',
  // Set to null until a real public installer URL is confirmed
  installerUrl: null as string | null,
  status:      'available' as 'available' | 'coming-soon',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function AionMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size} height={size}
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

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
}

function SEO({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const full = title === PRODUCT ? `${PRODUCT} — Personal AI by ${COMPANY}` : `${title} | ${PRODUCT}`
    document.title = full
    const setMeta = (sel: string, attr: 'name' | 'property', val: string) => {
      let el = document.head.querySelector(`meta[${attr}="${sel}"]`) as HTMLMetaElement | null
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, sel); document.head.appendChild(el) }
      el.content = val
    }
    setMeta('description', 'name', description)
    setMeta('og:title', 'property', full)
    setMeta('og:description', 'property', description)
    setMeta('og:url', 'property', `${SITE_URL}${pathname}`)
    setMeta('twitter:title', 'name', full)
    setMeta('twitter:description', 'name', description)
  }, [title, description, pathname])
  return null
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navItems = [
    { label: 'RIA',      to: '/' },
    { label: 'Features', to: '/features' },
    { label: 'Privacy',  to: '/privacy' },
    { label: 'Download', to: '/download' },
    { label: 'About',    to: '/about' },
  ]

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="site-header-inner">
        {/* Logo */}
        <Link to="/" className="site-logo" aria-label={`${COMPANY} — ${PRODUCT}`}>
          <AionMark size={22} />
          <span className="site-logo-name">{COMPANY}</span>
          <span className="site-logo-badge">{PRODUCT}</span>
        </Link>

        {/* Desktop nav (centered) */}
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="site-header-actions">
          <Link to="/download" className="btn btn-primary btn-sm">
            <Download size={14} />
            Download RIA
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="mobile-nav-link">
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-cta">
            <Link to="/download" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={15} />
              Download RIA for Windows
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand col */}
          <div className="footer-brand">
            <Link to="/" className="site-logo" aria-label={`${COMPANY} home`}>
              <AionMark size={20} />
              <span className="site-logo-name">{COMPANY}</span>
            </Link>
            <p className="footer-brand-desc">
              {COMPANY} builds {PRODUCT}, a personal AI workspace for Windows.
            </p>
          </div>

          {/* Product col */}
          <div>
            <p className="footer-col-title">Product</p>
            <div className="footer-links">
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/privacy"  className="footer-link">Privacy</Link>
              <Link to="/download" className="footer-link">Download</Link>
            </div>
          </div>

          {/* Company col */}
          <div>
            <p className="footer-col-title">Company</p>
            <div className="footer-links">
              <Link to="/about" className="footer-link">About {COMPANY}</Link>
              <a href={`mailto:${CONTACT}`} className="footer-link">Contact</a>
            </div>
          </div>

          {/* Contact col */}
          <div>
            <p className="footer-col-title">Contact</p>
            <div className="footer-links">
              <a href={`mailto:${CONTACT}`} className="footer-link">{CONTACT}</a>
              <a href={SITE_URL} className="footer-link" target="_blank" rel="noopener noreferrer">
                aiontec.co.in
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} {COMPANY}. All rights reserved.</p>
          <p className="footer-copy">{PRODUCT} is developed by {COMPANY}. Founded by {FOUNDER}.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <SEO
        title={PRODUCT}
        description="RIA is a personal AI workspace for Windows — bringing knowledge, memory, and intelligent assistance to your desktop."
      />
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <Reveal>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Introducing {PRODUCT}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="hero-headline">
              Your intelligence.<br />Your computer.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="hero-subtext">
              Meet {PRODUCT}, a personal AI workspace designed to bring knowledge, memory,
              and intelligent assistance closer to you — running directly on your Windows desktop.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="hero-actions">
              <Link to="/download" className="btn btn-primary btn-lg">
                <Download size={16} />
                Download {PRODUCT} for Windows
              </Link>
              <Link to="/features" className="btn btn-secondary btn-lg">
                Explore {PRODUCT}
                <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Product screenshot */}
          <Reveal delay={0.2}>
            <div className="hero-screenshot">
              <img
                src="/assets/ria/orbit-dashboard-desktop.jpg"
                alt="RIA desktop application interface"
                loading="lazy"
                width={1200}
                height={675}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const placeholder = e.currentTarget.nextSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="hero-screenshot-placeholder" style={{ display: 'none' }}>
                <Monitor size={48} strokeWidth={1} />
                <span className="t-caption">RIA Desktop Application — Screenshot coming soon</span>
              </div>
              <div className="hero-screenshot-label">RIA Desktop Application · Windows</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature highlight strip */}
      <section className="section-sm section-bg-white">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: <Brain size={22} />,    title: 'Personal AI Assistance', copy: 'An intelligent assistant that understands your work, preferences, and goals — without sending your data elsewhere.' },
              { icon: <Clock size={22} />,     title: 'Long-Term Memory',      copy: 'RIA remembers across sessions. Projects, decisions, context — preserved and accessible when you need them.' },
              { icon: <Cpu size={22} />,       title: 'Local AI Models',       copy: 'Run AI models directly on your hardware with Ollama. Your data stays on your machine.' },
              { icon: <Network size={22} />,   title: 'Knowledge Organisation',copy: 'Connect notes, documents, and ideas into a personal knowledge base that grows with you.' },
              { icon: <Workflow size={22} />,  title: 'Intelligent Workflows', copy: 'Automate repetitive tasks and design AI-powered workflows tailored to how you actually work.' },
              { icon: <Sliders size={22} />,   title: 'User-Controlled',       copy: 'You decide what RIA can access, remember, and act on. Full transparency and control at every step.' },
            ].map((f, i) => (
              <div key={i} className="feature-cell">
                <div className="feature-cell-icon">{f.icon}</div>
                <p className="feature-cell-title">{f.title}</p>
                <p className="feature-cell-copy">{f.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section section-bg-base">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '16px' }}>Get started</p>
              <h2 className="t-h2" style={{ marginBottom: '20px' }}>
                Ready to bring AI to your desktop?
              </h2>
              <p className="t-body" style={{ marginBottom: '36px' }}>
                {PRODUCT} is available for Windows 10 and Windows 11. Download the installer,
                follow the setup guide, and have your personal AI workspace running in minutes.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/download" className="btn btn-primary">
                  <Download size={15} />
                  Download {PRODUCT}
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  About {COMPANY}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── FEATURES PAGE ────────────────────────────────────────────────────────────
function FeaturesPage() {
  const features = [
    {
      icon: <Brain size={24} />,
      title: 'Personal AI Assistance',
      copy: 'RIA acts as your intelligent personal assistant — understanding context, answering questions, and helping you think through complex problems. It learns how you work and adapts over time.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Long-Term Memory',
      copy: 'Unlike chat applications that forget everything after each session, RIA maintains persistent memory. It remembers your projects, decisions, conversations, and preferences across every session.',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Local AI Models',
      copy: 'RIA supports local language models via Ollama, meaning your most sensitive work never has to leave your computer. GPU-accelerated inference keeps responses fast.',
    },
    {
      icon: <Network size={24} />,
      title: 'Knowledge Organisation',
      copy: 'Build a connected knowledge base from your notes, documents, and conversations. RIA surfaces relevant information when you need it and helps you see connections you might have missed.',
    },
    {
      icon: <Workflow size={24} />,
      title: 'Intelligent Workflows',
      copy: 'Design repeatable AI-powered workflows for the tasks you do regularly — research pipelines, writing routines, project summaries. RIA executes them consistently and transparently.',
    },
    {
      icon: <Sliders size={24} />,
      title: 'User-Controlled Autonomy',
      copy: 'Every action RIA can take requires explicit permission. You decide what it can read, remember, and act on. No background processes without your knowledge.',
    },
  ]

  const specs = [
    ['Platform', 'Windows 10, Windows 11'],
    ['Runtime',  'Desktop application (Electron-based)'],
    ['AI Models','Cloud API + local models via Ollama (optional)'],
    ['GPU',      'NVIDIA GPU recommended for local inference'],
    ['Storage',  'Variable — knowledge base grows with use'],
    ['Internet', 'Required for cloud features; local models work offline'],
  ]

  return (
    <>
      <SEO
        title="Features"
        description="Explore RIA's features: personal AI assistance, long-term memory, local AI models, knowledge organisation, and user-controlled workflows."
      />
      <div className="page-top" />

      {/* Page hero */}
      <section className="section section-bg-white">
        <div className="container">
          <Reveal>
            <p className="t-overline" style={{ marginBottom: '14px' }}>What {PRODUCT} can do</p>
            <h1 className="t-h1" style={{ marginBottom: '20px' }}>
              Built for how<br />you actually work.
            </h1>
            <p className="t-body-lg" style={{ maxWidth: '54ch' }}>
              {PRODUCT} is a personal AI workspace that combines intelligent assistance,
              persistent memory, and powerful automation — all running on your Windows desktop.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Features grid */}
      <section className="section section-bg-base">
        <div className="container">
          <div className="features-grid">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="feature-cell" style={{ height: '100%' }}>
                  <div className="feature-cell-icon">{f.icon}</div>
                  <p className="feature-cell-title">{f.title}</p>
                  <p className="feature-cell-copy">{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform specs */}
      <section className="section section-bg-white">
        <div className="container">
          <div style={{ maxWidth: '760px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '14px' }}>Platform</p>
              <h2 className="t-h2" style={{ marginBottom: '40px' }}>Technical specifications</h2>
            </Reveal>
            <table className="requirements-table">
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm section-bg-base">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/download" className="btn btn-primary">
                <Download size={15} />
                Download {PRODUCT}
              </Link>
              <Link to="/privacy" className="btn btn-secondary">
                Privacy & data
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── PRIVACY PAGE ─────────────────────────────────────────────────────────────
function PrivacyPage() {
  const items = [
    {
      icon: <Cpu size={20} />,
      title: 'Local Processing',
      subtitle: 'What stays on your machine',
      content: [
        'When you use local AI models through Ollama, all inference happens on your computer. Your prompts and responses never leave your machine during those interactions.',
        'Your knowledge base, memory files, and personal notes are stored locally on your Windows device. RIA does not upload your documents or conversation history to external servers by default.',
        'GPU-accelerated local inference is available for users with compatible NVIDIA hardware, keeping performance high without cloud dependency.',
      ],
    },
    {
      icon: <FileText size={20} />,
      title: 'Your Data',
      subtitle: 'What is stored and where',
      content: [
        'RIA stores its data — memory files, knowledge base, settings, and application state — in your local user directory. You can inspect, export, or delete this data at any time.',
        'When using cloud-based AI features (such as API-connected language models), your prompts are sent to the respective AI provider under their terms of service. RIA does not retain copies of these on its servers.',
        'RIA does not collect analytics about your personal AI usage, the content of your conversations, or the contents of your knowledge base.',
      ],
    },
    {
      icon: <Globe size={20} />,
      title: 'Online Dependencies',
      subtitle: 'When internet access is used',
      content: [
        'Cloud AI features require an internet connection and use third-party AI APIs (such as OpenAI-compatible endpoints). These interactions are governed by those providers\' privacy policies.',
        'Software updates, model downloads for Ollama, and telemetry (if enabled) may use internet connections.',
        'Core local functionality — including local AI models, memory, and knowledge base — is designed to work without an internet connection.',
      ],
    },
    {
      icon: <Shield size={20} />,
      title: 'Permissions',
      subtitle: 'What access RIA requires',
      content: [
        'RIA requests only the filesystem access needed to read documents you explicitly add to your knowledge base. It does not scan your entire drive.',
        'Microphone access, if requested, is used only for voice interaction features and is never recorded without active user initiation.',
        'Network access is used to connect to AI APIs you configure, download model updates, and check for application updates.',
      ],
    },
    {
      icon: <ShieldCheck size={20} />,
      title: 'Your Control',
      subtitle: 'What you can manage',
      content: [
        'You can clear RIA\'s memory, delete your knowledge base, and reset the application to defaults at any time from within the application settings.',
        'You choose which AI providers to connect, what files to include in your knowledge base, and what automated actions RIA is permitted to take.',
        'RIA is designed around explicit user consent — it does not take actions in the background without your permission.',
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Privacy"
        description="How RIA handles your data: local processing, what is stored, online dependencies, and your controls."
      />
      <div className="page-top" />

      <section className="section section-bg-white">
        <div className="container">
          <Reveal>
            <p className="t-overline" style={{ marginBottom: '14px' }}>Privacy & data</p>
            <h1 className="t-h1" style={{ marginBottom: '20px' }}>
              Your data.<br />Your control.
            </h1>
            <p className="t-body-lg" style={{ maxWidth: '52ch' }}>
              {PRODUCT} is designed to keep sensitive personal data local by default.
              Here is a clear account of what is stored, where, and what you can control.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-bg-base">
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="privacy-item">
                  <div className="privacy-item-label">
                    <div className="privacy-item-label-icon">{item.icon}</div>
                    <div className="privacy-item-label-text">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="privacy-item-content">
                    {item.content.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm section-bg-white">
        <div className="container">
          <Reveal>
            <div className="card" style={{ maxWidth: '640px' }}>
              <p className="t-h4" style={{ marginBottom: '10px' }}>Questions about privacy?</p>
              <p className="t-body" style={{ marginBottom: '20px' }}>
                If you have questions about how {PRODUCT} handles your data, contact {COMPANY} directly.
              </p>
              <a href={`mailto:${CONTACT}`} className="btn btn-secondary btn-sm">
                {CONTACT}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── DOWNLOAD PAGE ────────────────────────────────────────────────────────────
function DownloadPage() {
  const isAvailable = RELEASE.status === 'available'

  const requirements = [
    ['Operating system', 'Windows 10 (64-bit) or Windows 11'],
    ['Runtime',          'Node.js 18 or later, npm, Git'],
    ['Memory',           '16 GB RAM recommended (8 GB minimum)'],
    ['Storage',          '5 GB available disk space'],
    ['GPU',              'NVIDIA GPU recommended for local AI model acceleration'],
    ['AI backend',       'Ollama (optional) for local language models'],
    ['Image generation', 'Automatic1111, Forge, or ComfyUI (optional)'],
  ]

  const steps = [
    {
      title: 'Download the installer',
      desc: isAvailable && RELEASE.installerUrl
        ? `Download the RIA ${RELEASE.version} installer from the link above and run it on your Windows system.`
        : 'The RIA installer package will be linked here once the public release is available.',
    },
    {
      title: 'Install dependencies',
      desc: 'Ensure Node.js 18+ and Git are installed on your system. Run the dependency installation from the included setup guide.',
    },
    {
      title: 'Configure your environment',
      desc: 'Create your environment configuration from the included example file. Keep your API keys and secrets out of version control.',
    },
    {
      title: 'Launch RIA',
      desc: 'Use the included Start-RIA launcher to start the backend, frontend, and desktop runtime. RIA will be ready in your browser or the desktop window.',
    },
  ]

  return (
    <>
      <SEO
        title="Download"
        description={`Download RIA ${RELEASE.version} for Windows. Personal AI workspace with local models, persistent memory, and intelligent workflows.`}
      />

      {/* Download hero */}
      <div className="download-hero">
        <div className="container">
          <Reveal>
            <div
              className={`download-status-badge${!isAvailable ? ' unavailable' : ''}`}
            >
              <span className="download-status-dot" />
              {isAvailable ? `Released · ${RELEASE.dateShort}` : 'Coming soon'}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="t-h1" style={{ marginBottom: '16px' }}>
              Download {PRODUCT}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body-lg" style={{ maxWidth: '50ch', marginBottom: '36px' }}>
              {PRODUCT} {RELEASE.version} for {RELEASE.platform}.
              A personal AI workspace with long-term memory, local AI model support,
              and intelligent workflows — running on your desktop.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {isAvailable && RELEASE.installerUrl ? (
              <a href={RELEASE.installerUrl} className="btn btn-primary btn-lg" download>
                <Download size={17} />
                Download {PRODUCT} {RELEASE.version} for Windows
              </a>
            ) : (
              <div>
                <div className="btn btn-primary btn-lg btn-disabled" aria-disabled="true">
                  <Download size={17} />
                  Download {PRODUCT} for Windows
                </div>
                <p className="t-caption" style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={14} style={{ flexShrink: 0 }} />
                  The public installer is not yet linked. Contact{' '}
                  <a href={`mailto:${CONTACT}`} style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    {CONTACT}
                  </a>{' '}
                  for early access.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      {/* Release info */}
      <section className="section section-bg-base">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
            }}
          >
            {/* System requirements */}
            <div>
              <Reveal>
                <h2 className="t-h3" style={{ marginBottom: '24px' }}>System requirements</h2>
                <table className="requirements-table">
                  <tbody>
                    {requirements.map(([label, value]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>

            {/* Release notes */}
            <div>
              <Reveal delay={0.05}>
                <h2 className="t-h3" style={{ marginBottom: '24px' }}>Release information</h2>
                <div className="info-row">
                  <span className="info-row-label">Version</span>
                  <span className="info-row-value">{RELEASE.version}</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Release date</span>
                  <span className="info-row-value">{RELEASE.date}</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Platform</span>
                  <span className="info-row-value">Windows 10 / 11 (64-bit)</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Architecture</span>
                  <span className="info-row-value">x86-64</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">License</span>
                  <span className="info-row-value">Proprietary — {COMPANY}</span>
                </div>
                <div className="info-row">
                  <span className="info-row-label">Status</span>
                  <span className="info-row-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isAvailable
                      ? <><CheckCircle2 size={14} style={{ color: '#16a34a' }} /> Available</>
                      : <><AlertCircle  size={14} style={{ color: '#d97706' }} /> Coming soon</>
                    }
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Installation steps */}
      <section className="section section-bg-white">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '14px' }}>Setup</p>
              <h2 className="t-h2" style={{ marginBottom: '40px' }}>How to install</h2>
            </Reveal>
            <div className="install-steps">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="install-step">
                    <div className="install-step-num">{i + 1}</div>
                    <div>
                      <p className="install-step-title">{step.title}</p>
                      <p className="install-step-desc">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="section section-bg-base">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '14px' }}>Troubleshooting</p>
              <h2 className="t-h2" style={{ marginBottom: '32px' }}>Common issues</h2>
            </Reveal>
            {[
              {
                q: 'Node.js or npm is not recognised',
                a: 'Install Node.js 18 or later from nodejs.org. Restart your terminal after installation and confirm with node --version.',
              },
              {
                q: 'Local AI models are slow or unavailable',
                a: 'Install Ollama from ollama.com and pull the model you want (e.g. ollama pull llama3). An NVIDIA GPU significantly improves inference speed.',
              },
              {
                q: 'The application does not start',
                a: 'Ensure all dependencies are installed and the environment configuration file (.env) is correctly populated. Check the backend terminal for error messages.',
              },
              {
                q: 'Antivirus is blocking RIA',
                a: 'Some antivirus software may flag new applications. Add an exception for the RIA installation directory or contact your antivirus vendor.',
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {item.q}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.a}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div style={{ marginTop: '32px' }}>
                <p className="t-body" style={{ marginBottom: '16px' }}>
                  Need more help? Contact the {COMPANY} team directly.
                </p>
                <a href={`mailto:${CONTACT}`} className="btn btn-secondary btn-sm">
                  {CONTACT}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const values = [
    {
      title: 'Software that respects you',
      copy: 'RIA is designed to be transparent about what it does, what it stores, and what it can access. Users control their data and their AI — not the other way around.',
    },
    {
      title: 'Intelligence that compounds',
      copy: 'The most useful AI is one that gets better the longer you use it. RIA is built around persistent memory and long-term context — not stateless chat sessions.',
    },
    {
      title: 'Local-first by design',
      copy: 'Sensitive personal data belongs on your machine. RIA is architected to run locally wherever possible, minimising unnecessary cloud dependency.',
    },
    {
      title: 'Precision over spectacle',
      copy: 'We build software that solves real problems in straightforward ways. No feature exists for its own sake — every capability earns its place.',
    },
  ]

  return (
    <>
      <SEO
        title={`About ${COMPANY}`}
        description={`${COMPANY} is developing ${PRODUCT}, a personal AI workspace for Windows. Learn about the company, its mission, and the team.`}
      />

      {/* Page hero */}
      <section className="about-hero section-bg-base">
        <div className="container">
          <Reveal>
            <p className="t-overline" style={{ marginBottom: '14px' }}>About {COMPANY}</p>
            <h1 className="t-h1" style={{ marginBottom: '20px', maxWidth: '14ch' }}>
              Building intelligence<br />you own.
            </h1>
            <p className="t-body-lg" style={{ maxWidth: '54ch' }}>
              {COMPANY} is a software company developing {PRODUCT}, a personal AI workspace
              for Windows. Our mission is to make intelligent, memory-aware AI assistance
              genuinely useful — and genuinely yours.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="stat-row">
            {[
              { value: '2026',    label: 'Year founded' },
              { value: 'India',   label: 'Headquarters' },
              { value: 'Windows', label: 'Platform' },
              { value: '1',       label: 'Product' },
            ].map((s, i) => (
              <div key={i} className="stat-cell">
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section section-bg-white">
        <div className="container">
          <div style={{ maxWidth: '760px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '14px' }}>Mission</p>
              <h2 className="t-h2" style={{ marginBottom: '24px' }}>
                Personal AI that works for you.
              </h2>
              <p className="t-body-lg" style={{ marginBottom: '20px' }}>
                Most AI tools are designed around cloud services, subscriptions, and data
                collection. {COMPANY} believes there is a better model: AI software that runs
                on your hardware, respects your privacy, and becomes more useful the longer you use it.
              </p>
              <p className="t-body-lg">
                {PRODUCT} is our first product — a personal AI workspace for Windows that
                combines intelligent assistance, persistent memory, local AI models, and
                user-controlled automation. It is built to be a serious tool for people who
                do serious work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-bg-base">
        <div className="container">
          <Reveal>
            <p className="t-overline" style={{ marginBottom: '14px' }}>Philosophy</p>
            <h2 className="t-h2" style={{ marginBottom: '48px' }}>What we believe</h2>
          </Reveal>
          <div className="values-list">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="value-cell">
                  <p className="value-cell-title">{v.title}</p>
                  <p className="value-cell-copy">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section section-bg-white">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <Reveal>
              <p className="t-overline" style={{ marginBottom: '14px' }}>Founder</p>
              <h2 className="t-h2" style={{ marginBottom: '24px' }}>{FOUNDER}</h2>
              <p className="t-body-lg" style={{ marginBottom: '20px' }}>
                {FOUNDER} founded {COMPANY} in India with the goal of building a personal AI
                system that respects user privacy, runs locally where possible, and delivers
                genuine long-term utility.
              </p>
              <p className="t-body">
                {PRODUCT} represents {COMPANY}'s first public release — a focused, honest
                piece of software built to do what it says and nothing it doesn't.
              </p>
              <div style={{ marginTop: '28px' }}>
                <a href={`mailto:${CONTACT}`} className="btn btn-secondary btn-sm">
                  Contact {FOUNDER}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm section-bg-base">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/download" className="btn btn-primary">
                <Download size={15} />
                Download {PRODUCT}
              </Link>
              <Link to="/features" className="btn btn-secondary">
                See what {PRODUCT} can do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/"         element={<HomePage />}     />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/privacy"  element={<PrivacyPage />}  />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/about"    element={<AboutPage />}    />
          {/* Legacy redirects */}
          <Route path="/ria"              element={<HomePage />}     />
          <Route path="/ria-personal"     element={<FeaturesPage />} />
          <Route path="/security-privacy" element={<PrivacyPage />}  />
          <Route path="*"                 element={<HomePage />}     />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
