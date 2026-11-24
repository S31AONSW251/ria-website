import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, X } from 'lucide-react'
import { Seo } from '../components/Seo'
import {
  CompanySection,
  ControlSection,
  DownloadSection,
  FinalCta,
  GallerySection,
  MemorySection,
  RobotAssistantSection,
  WorkflowSection,
} from '../components/sections'
import {
  Eyebrow,
  ProductFrame,
  Reveal,
  TextLink,
} from '../components/ui'
import { PRINCIPLES, PRODUCT_IMAGES, RELEASE } from '../lib/site'

export function HomePage() {
  const [robotDismissed, setRobotDismissed] = useState(false)

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ria-robot-dismissed') === '1') {
      setRobotDismissed(true)
    }
  }, [])

  return (
    <>
      <Seo
        title="AION — RIA | Private Intelligence for Everyone"
        description="Discover RIA, the private, local-first intelligence system by AION. Built for persistent memory, intelligent automation, reasoning and personal computing."
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container">
          <div className="hero-top">
            <Reveal>
              <div className="hero-copy">
                <Eyebrow dot>AION presents RIA</Eyebrow>
                <h1 className="hero-title" id="hero-title">
                  <span>Meet RIA.</span>
                  <span className="hero-title-muted">Intelligence,</span>
                  <span>made personal.</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="hero-aside">
                <p className="hero-subtext">
                  A personal intelligence workspace designed to help you think,
                  create, organize knowledge, and work with AI on your own
                  computer.
                </p>
                <div className="hero-actions">
                  <Link to="/download" className="btn btn-primary btn-lg">
                    <Download size={16} aria-hidden="true" />
                    Download RIA for Windows
                  </Link>
                  <Link to="/product" className="btn btn-secondary btn-lg">
                    Explore RIA
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <div className="hero-meta" aria-label="Product details">
                  <span>Windows 10 / 11</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span>Version {RELEASE.version}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span>Built by AION</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="hero-stage">
              <ProductFrame
                image={PRODUCT_IMAGES.workspaceMain}
                priority
                caption="RIA Workspace — conversation, memory, knowledge, and local runtime in one place."
                label="Actual product interface"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="section section--white intro"
        aria-labelledby="intro-title"
      >
        <div className="container">
          <div className="intro-grid">
            <div className="intro-lead">
              <Eyebrow>Introducing RIA</Eyebrow>
              <h2 className="section-title" id="intro-title">
                Not another chat window.
                <br />
                A place to think.
              </h2>
            </div>
            <div className="intro-body">
              <p className="lead">
                RIA brings conversation, memory, knowledge, and local tools into
                one desktop workspace — so your work has continuity instead of
                starting from zero.
              </p>
              <p>
                Most AI tools are built around a single conversation. RIA is
                built around your work: the pages you keep, the things you
                return to, and the context that accumulates over time.
              </p>
              <TextLink to="/product">See how RIA works</TextLink>
            </div>
          </div>

          <div className="principles">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 0.06}>
                <article className="principle">
                  <span className="principle-number">{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WorkflowSection />
      <MemorySection />
      <ControlSection />
      <GallerySection />
      <RobotAssistantSection />
      <DownloadSection />
      <CompanySection />
      <FinalCta />

      {robotDismissed ? null : (
        <div className="robot-float" id="robot-float">
          <button
            type="button"
            className="robot-float-dismiss"
            onClick={() => {
              setRobotDismissed(true)
              sessionStorage.setItem('ria-robot-dismissed', '1')
            }}
            aria-label="Dismiss assistant preview"
          >
            <X size={12} aria-hidden="true" />
          </button>
          <img
            src={PRODUCT_IMAGES.robotAssistant.src}
            alt="RIA assistant preview"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </>
  )
}
