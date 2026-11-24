import {
  ArrowUpRight,
  FileText,
  Globe,
  HardDrive,
  Lock,
  Mail,
  Shield,
  Sliders,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import {
  Eyebrow,
  PageHero,
  Reveal,
  RiaMark,
} from '../components/ui'
import {
  CONTACT,
  PRIVACY_ITEMS,
  PRODUCT,
  RELEASE,
} from '../lib/site'

const ICONS = [
  <HardDrive size={19} key="local" />,
  <Globe size={19} key="cloud" />,
  <Sliders size={19} key="controls" />,
  <FileText size={19} key="permissions" />,
  <Shield size={19} key="online" />,
  <Lock size={19} key="boundaries" />,
]

export function PrivacyPage() {
  return (
    <>
      <Seo />

      <PageHero
        eyebrow="Privacy & data"
        title={
          <>
            Private by design.
            <br />
            Clear by default.
          </>
        }
        intro={
          <>
            {PRODUCT} is designed to keep the working parts of your workspace on
            your machine. This page is a plain-language account of what is local,
            what can leave your device, and what you control.
          </>
        }
        meta={
          <>
            <span>{PRODUCT} {RELEASE.version}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>Windows desktop</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>Updated November 2026</span>
          </>
        }
        aside={
          <div className="privacy-summary">
            <div className="privacy-summary-head">
              <RiaMark size={28} />
              <span>Privacy at a glance</span>
            </div>
            <div className="privacy-summary-row">
              <span>Workspace</span>
              <span className="privacy-summary-value is-local">Local</span>
            </div>
            <div className="privacy-summary-row">
              <span>Memory</span>
              <span className="privacy-summary-value is-local">Local</span>
            </div>
            <div className="privacy-summary-row">
              <span>Cloud AI</span>
              <span className="privacy-summary-value">Your choice</span>
            </div>
            <div className="privacy-summary-row">
              <span>Local models</span>
              <span className="privacy-summary-value">Optional</span>
            </div>
            <div className="privacy-summary-row">
              <span>Public installer</span>
              <span className="privacy-summary-value">Publishing</span>
            </div>
          </div>
        }
      />

      <section className="section section--white privacy-glance" aria-labelledby="privacy-glance-title">
        <div className="container">
          <div className="section-head">
            <Eyebrow>The short version</Eyebrow>
            <h2 className="section-title" id="privacy-glance-title">
              Local where it matters.
              <br />
              Explicit everywhere else.
            </h2>
          </div>

          <div className="privacy-glance-grid">
            <Reveal>
              <article className="privacy-glance-card">
                <HardDrive size={20} aria-hidden="true" />
                <h3>Local workspace</h3>
                <p>
                  Memory, knowledge sources, settings, and application state are
                  stored in your local user directory. The workspace is built to
                  remain yours to inspect and manage.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="privacy-glance-card">
                <Globe size={20} aria-hidden="true" />
                <h3>Explicit cloud</h3>
                <p>
                  Cloud AI providers are configured by you. When you use one,
                  your prompts are processed by that provider under its terms.
                  RIA does not need a cloud provider for local features.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.12}>
              <article className="privacy-glance-card">
                <Sliders size={20} aria-hidden="true" />
                <h3>Your controls</h3>
                <p>
                  Choose which sources enter the workspace, which integrations
                  to connect, and what memory to keep. Memory is designed to
                  remain visible and manageable.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--base privacy-detail" aria-labelledby="privacy-detail-title">
        <div className="container">
          <div className="privacy-detail-head">
            <Eyebrow>In detail</Eyebrow>
            <h2 className="section-title" id="privacy-detail-title">
              What happens to your data.
            </h2>
          </div>

          <div className="privacy-blocks">
            {PRIVACY_ITEMS.map((item, index) => (
              <Reveal key={item.title}>
                <article className="privacy-block">
                  <div className="privacy-block-head">
                    <span className="privacy-block-icon" aria-hidden="true">
                      {ICONS[index] ?? <Shield size={19} />}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="privacy-block-body">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark privacy-callout-section" aria-labelledby="privacy-callout-title">
        <div className="container">
          <div className="privacy-callout">
            <div>
              <Eyebrow light>The honest version</Eyebrow>
              <h2 className="section-title" id="privacy-callout-title">
                Local-first,
                <br />
                not magic.
              </h2>
            </div>
            <div className="privacy-callout-copy">
              <p>
                {PRODUCT} is not fully offline by default. Local language models
                and image tools are optional, and they must be installed and
                configured. Cloud AI features require an internet connection.
              </p>
              <p>
                AI models can be wrong, incomplete, or outdated. {PRODUCT} is a
                tool for your work; it is not a substitute for your judgment.
              </p>
              <a href={`mailto:${CONTACT}`} className="text-link text-link--light">
                <span>Ask a privacy question</span>
                <Mail size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white privacy-contact" aria-labelledby="privacy-contact-title">
        <div className="container">
          <div className="contact-card">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="section-title" id="privacy-contact-title">
                Talk to AION.
              </h2>
              <p>
                If you have a specific question about how {PRODUCT} handles data
                in your setup, contact AION directly.
              </p>
            </div>
            <a href={`mailto:${CONTACT}`} className="btn btn-primary btn-lg">
              {CONTACT}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
