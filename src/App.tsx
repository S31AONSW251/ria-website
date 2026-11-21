import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Footer, Header, ScrollToTop, SkipLink } from './components/Layout'
import { Eyebrow } from './components/ui'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { DownloadPage } from './pages/DownloadPage'
import { AboutPage } from './pages/AboutPage'

function NotFoundPage() {
  return (
    <section className="page-hero not-found">
      <div className="container">
        <Eyebrow>404</Eyebrow>
        <h1 className="page-title">This page isn&rsquo;t here.</h1>
        <p className="page-intro">
          The page you were looking for may have moved. Start from the product,
          or return to the AION home page.
        </p>
        <div className="download-hero-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            Back to AION
          </Link>
          <Link to="/product" className="btn btn-secondary btn-lg">
            Explore RIA
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="page-shell" key={pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Legacy routes from the previous site structure */}
          <Route path="/ria" element={<Navigate to="/" replace />} />
          <Route path="/ria-personal" element={<Navigate to="/features" replace />} />
          <Route path="/security-privacy" element={<Navigate to="/privacy" replace />} />
          <Route path="/aion" element={<Navigate to="/about" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
