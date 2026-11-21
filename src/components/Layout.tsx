import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import {
  COMPANY,
  CONTACT,
  NAV_ITEMS,
  PRODUCT,
  RELEASE,
  SITE_URL,
} from '../lib/site'
import { AionMark, RiaMark } from './ui'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })
  }, [pathname])

  return null
}

export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to content
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-brand">
          <Link to="/" className="aion-logo" aria-label={`${COMPANY} — home`}>
            <AionMark size={20} />
            <span className="aion-logo-text">{COMPANY}</span>
          </Link>

          <span className="brand-divider" aria-hidden="true" />

          <Link
            to="/product"
            className="ria-product"
            aria-label={`${PRODUCT} — product overview`}
          >
            <RiaMark size={22} />
            <span>{PRODUCT}</span>
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/download" className="btn btn-primary btn-sm">
            <Download size={14} aria-hidden="true" />
            Download {PRODUCT}
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="mobile-menu"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="container mobile-menu-inner">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? ' is-active' : ''}`
                  }
                >
                  <span className="mobile-nav-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            <div className="mobile-product-card">
              <div className="mobile-product-head">
                <RiaMark size={34} />
                <div>
                  <p className="mobile-product-name">{PRODUCT}</p>
                  <p className="mobile-product-desc">
                    Personal intelligence for Windows.
                  </p>
                </div>
                <span className="status-pill status-pill--neutral">
                  {RELEASE.version}
                </span>
              </div>
              <Link
                to="/download"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={15} aria-hidden="true" />
                Download {PRODUCT} for Windows
              </Link>
            </div>

            <div className="mobile-menu-foot">
              <a href={`mailto:${CONTACT}`} className="mobile-contact">
                <Mail size={15} aria-hidden="true" />
                {CONTACT}
              </a>
              <span>{SITE_URL.replace('https://', '')}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="aion-logo" aria-label={`${COMPANY} — home`}>
              <AionMark size={20} />
              <span className="aion-logo-text">{COMPANY}</span>
            </Link>
            <p className="footer-desc">
              {COMPANY} builds {PRODUCT}, a personal intelligence workspace for
              Windows. Memory, knowledge, and local tools in one desktop system.
            </p>
            <div className="footer-product">
              <RiaMark size={22} />
              <span>{PRODUCT}</span>
              <span className="footer-product-version">
                {RELEASE.version} · {RELEASE.channel}
              </span>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Product</p>
            <div className="footer-links">
              <Link to="/product" className="footer-link">Overview</Link>
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/download" className="footer-link">Download</Link>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Company</p>
            <div className="footer-links">
              <Link to="/about" className="footer-link">About {COMPANY}</Link>
              <a href={`mailto:${CONTACT}`} className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Resources</p>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy & data</Link>
              <Link to="/download#requirements" className="footer-link">
                System requirements
              </Link>
              <a
                href="/downloads/ria-release-guide.md"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Release guide
              </a>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-title">Contact</p>
            <div className="footer-links">
              <a href={`mailto:${CONTACT}`} className="footer-link footer-link--email">
                {CONTACT}
              </a>
              <a
                href={SITE_URL}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                aiontec.co.in
              </a>
              <span className="footer-location">India</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {COMPANY}. All rights reserved.
          </p>
          <p className="footer-copy footer-copy--statement">
            {COMPANY} is the company. {PRODUCT} is the product.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
            <Link to="/download" className="footer-bottom-link">Download</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
