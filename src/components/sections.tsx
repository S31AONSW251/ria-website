import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Database,
  HardDrive,
  Lock,
} from 'lucide-react'
import {
  CONTACT,
  PRODUCT,
  PRODUCT_IMAGES,
  RELEASE,
  RELEASE_MAILTO,
  WORKFLOW,
} from '../lib/site'
import {
  AionMark,
  Eyebrow,
  ProductFrame,
  Reveal,
  RiaMark,
  SectionHead,
  StatusPill,
  TextLink,
} from './ui'

/* -------------------------------------------------------------------------- */
/*  Workflow                                                                  */
/* -------------------------------------------------------------------------- */

export function WorkflowSection({ intro }: { intro?: string }) {
  return (
    <section
      className="section section--white workflow"
      aria-labelledby="workflow-title"
    >
      <div className="container">
        <SectionHead
          split
          eyebrow="Built for your workflow"
          title={
            <span id="workflow-title">
              Understand. Remember.
              <br />
              Work. Create.
            </span>
          }
          intro={
            <p>
              {intro ??
                'RIA is organised around the way real work moves: understanding a problem, keeping the context, doing the work, and making something from it.'}
            </p>
          }
        />

        <div className="workflow-grid">
          {WORKFLOW.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.06}>
              <article className="workflow-card">
                <div className="workflow-card-top">
                  <span className="workflow-number">{item.number}</span>
                  <span className="workflow-rule" aria-hidden="true" />
                </div>
                <h3 className="workflow-title">{item.title}</h3>
                <p className="workflow-copy">{item.copy}</p>
                <ul className="workflow-tags" aria-label={`${item.title} features`}>
                  {item.items.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Memory                                                                    */
/* -------------------------------------------------------------------------- */

export function MemorySection() {
  const layers = [
    {
      number: '01',
      title: 'Conversation',
      copy: 'The current thread and the context around it.',
    },
    {
      number: '02',
      title: 'Memory',
      copy: 'What RIA retains across sessions.',
    },
    {
      number: '03',
      title: 'Core memory',
      copy: 'The details that matter most to your work.',
      core: true,
    },
    {
      number: '04',
      title: 'Knowledge sources',
      copy: 'Documents and pages you explicitly add.',
    },
  ]

  return (
    <section
      className="section section--base memory"
      id="memory"
      aria-labelledby="memory-title"
    >
      <div className="container">
        <div className="split">
          <div className="split-copy">
            <Eyebrow>Intelligence &amp; memory</Eyebrow>
            <h2 className="section-title" id="memory-title">
              Context that stays
              <br />
              with you.
            </h2>
            <p className="lead">
              Most AI tools reset when the conversation ends. RIA is built
              around continuity: a visible memory system, a place for the
              knowledge you rely on, and conversations that keep their thread.
            </p>
            <ul className="check-list">
              <li>
                <Check size={15} aria-hidden="true" />
                Memory and core memory for what you want RIA to retain.
              </li>
              <li>
                <Check size={15} aria-hidden="true" />
                Knowledge sources for the documents and pages you add.
              </li>
              <li>
                <Check size={15} aria-hidden="true" />
                Conversation history that keeps the context intact.
              </li>
            </ul>
            <TextLink to="/features#memory">Explore memory</TextLink>
          </div>

          <div className="split-visual">
            <div
              className="memory-card"
              aria-label="The four visible layers of the RIA memory workspace"
            >
              <div className="memory-card-head">
                <span className="memory-card-title">
                  <span className="status-dot" aria-hidden="true" />
                  Memory workspace
                </span>
                <span className="memory-card-badge">Visible</span>
              </div>

              <div className="memory-layers">
                {layers.map((layer) => (
                  <div
                    key={layer.number}
                    className={`memory-layer${layer.core ? ' is-core' : ''}`}
                  >
                    <span className="memory-layer-number">{layer.number}</span>
                    <div>
                      <p className="memory-layer-title">{layer.title}</p>
                      <p className="memory-layer-copy">{layer.copy}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="memory-card-foot">
                <span>Inspect</span>
                <span>Export</span>
                <span>Clear</span>
              </div>
            </div>
            <p className="visual-note">
              Labels mirror the current RIA workspace. Memory is designed to
              remain visible and under your control.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Control / local runtime                                                   */
/* -------------------------------------------------------------------------- */

export function ControlSection() {
  return (
    <section
      className="section section--dark control"
      id="local"
      aria-labelledby="control-title"
    >
      <div className="container">
        <div className="split split--dark">
          <div className="split-copy">
            <Eyebrow light>Your computer, your control</Eyebrow>
            <h2 className="section-title" id="control-title">
              Local intelligence.
              <br />
              Clear boundaries.
            </h2>
            <p className="lead lead--light">
              RIA is designed to run close to your work. The local runtime
              connects to your machine, your memory stays on your device, and
              cloud features are explicit choices rather than hidden defaults.
            </p>
            <div className="control-actions">
              <Link to="/privacy" className="btn btn-light">
                Read about privacy
              </Link>
              <TextLink to="/features#runtime" light>
                See the local runtime
              </TextLink>
            </div>
          </div>

          <div className="split-visual">
            <div className="runtime-panel">
              <div className="runtime-panel-head">
                <span className="runtime-panel-title">
                  <span className="status-dot" aria-hidden="true" />
                  Local runtime connected
                </span>
                <span className="runtime-panel-badge">Live</span>
              </div>

              <div className="runtime-rows">
                <div className="runtime-row">
                  <span className="runtime-row-icon">
                    <Cpu size={16} aria-hidden="true" />
                  </span>
                  <span className="runtime-row-label">Inference</span>
                  <span className="runtime-row-value">Local when configured</span>
                </div>
                <div className="runtime-row">
                  <span className="runtime-row-icon">
                    <Database size={16} aria-hidden="true" />
                  </span>
                  <span className="runtime-row-label">Memory</span>
                  <span className="runtime-row-value">Stored on this device</span>
                </div>
                <div className="runtime-row">
                  <span className="runtime-row-icon">
                    <HardDrive size={16} aria-hidden="true" />
                  </span>
                  <span className="runtime-row-label">Workspace</span>
                  <span className="runtime-row-value">Your local user directory</span>
                </div>
                <div className="runtime-row">
                  <span className="runtime-row-icon">
                    <Lock size={16} aria-hidden="true" />
                  </span>
                  <span className="runtime-row-label">Cloud features</span>
                  <span className="runtime-row-value">Only when you choose</span>
                </div>
              </div>

              <div className="runtime-panel-foot">
                <span>Private by design</span>
                <span>On your machine</span>
              </div>
            </div>
            <p className="visual-note visual-note--dark">
              Status labels mirror the current RIA workspace. Availability
              depends on your hardware and configuration.
            </p>
          </div>
        </div>

        <div className="control-points">
          <div className="control-point">
            <span className="control-point-number">01</span>
            <h3>Local models, optional</h3>
            <p>
              Connect Ollama for local language model inference. RIA can also
              work with cloud providers you configure.
            </p>
          </div>
          <div className="control-point">
            <span className="control-point-number">02</span>
            <h3>Your files, your sources</h3>
            <p>
              Add the documents and pages you choose. RIA does not need to scan
              your entire drive to be useful.
            </p>
          </div>
          <div className="control-point">
            <span className="control-point-number">03</span>
            <h3>Honest boundaries</h3>
            <p>
              Cloud AI requires an internet connection. Local functionality
              depends on the models and tools you install.
            </p>
          </div>
        </div>

        <p className="control-note">
          RIA is not fully offline by default. Local models and dependencies
          must be installed and configured.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

export function GallerySection() {
  return (
    <section
      className="section section--base gallery"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <SectionHead
          split
          eyebrow="Product experience"
          title={
            <span id="gallery-title">
              A workspace that
              <br />
              shows its work.
            </span>
          }
          intro={
            <p>
              These are views from the current Windows build — the same
              workspace shown above, not a concept render or a fictional
              dashboard.
            </p>
          }
        />

        <Reveal>
          <ProductFrame
            image={PRODUCT_IMAGES.conversation}
            className="product-frame--wide"
            sizes="(max-width: 767px) 100vw, 1160px"
            caption="Conversation and workspace · the current RIA build"
            label="Actual product interface"
          />
        </Reveal>

        <div className="gallery-grid">
          <Reveal delay={0.06}>
            <figure className="gallery-card">
              <div className="gallery-media">
                <img
                  src={PRODUCT_IMAGES.memory.src}
                  width={PRODUCT_IMAGES.memory.width}
                  height={PRODUCT_IMAGES.memory.height}
                  alt={PRODUCT_IMAGES.memory.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="gallery-caption">
                <span className="gallery-caption-title">
                  Memory, knowledge &amp; goals
                </span>
                <span className="gallery-caption-copy">
                  Recent threads and the deeper systems sit together in the
                  workspace.
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.12}>
            <figure className="gallery-card">
              <div className="gallery-media">
                <img
                  src={PRODUCT_IMAGES.runtime.src}
                  width={PRODUCT_IMAGES.runtime.width}
                  height={PRODUCT_IMAGES.runtime.height}
                  alt={PRODUCT_IMAGES.runtime.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="gallery-caption">
                <span className="gallery-caption-title">
                  Conversation &amp; local runtime
                </span>
                <span className="gallery-caption-copy">
                  Talk to RIA and see the state of the local machine at a
                  glance.
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Robot assistant                                                           */
/* -------------------------------------------------------------------------- */

export function RobotAssistantSection() {
  return (
    <section
      className="section section--white robot-assistant"
      id="robot-assistant"
      aria-labelledby="robot-assistant-title"
    >
      <div className="container">
        <div className="robot-grid">
          <div className="robot-copy">
            <Eyebrow>Meet your RIA assistant</Eyebrow>
            <h2 className="section-title" id="robot-assistant-title">
              A familiar presence
              <br />
              within your workspace.
            </h2>
            <p className="lead">
              The RIA assistant appears across the desktop application as a
              calm, consistent presence — ready when you need it, out of the
              way when you do not.
            </p>
            <p className="robot-note">
              Product preview. The assistant is part of the RIA desktop
              application, not a separate chatbot.
            </p>
          </div>
          <div className="robot-visual">
            <Reveal delay={0.06}>
              <ProductFrame
                image={PRODUCT_IMAGES.robotAssistant}
                className="robot-frame"
                sizes="(max-width: 960px) 80vw, 460px"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Download                                                                  */
/* -------------------------------------------------------------------------- */

export function DownloadSection() {
  const installerAvailable = Boolean(RELEASE.installerUrl)

  return (
    <section
      className="section section--white download-section"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="container">
        <div className="download-panel">
          <div className="download-copy">
            <Eyebrow>Download {PRODUCT}</Eyebrow>
            <h2 className="section-title" id="download-title">
              {PRODUCT} for Windows.
            </h2>
            <p className="lead">
              Version {RELEASE.version} for {RELEASE.platform}. A personal
              intelligence workspace with memory, knowledge, conversation, and
              an optional local runtime.
            </p>

            <div className="download-actions">
              {installerAvailable ? (
                <a
                  href={RELEASE.installerUrl as string}
                  className="btn btn-primary btn-lg"
                  download
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                  Download {PRODUCT} {RELEASE.version}
                </a>
              ) : (
                <a href={RELEASE_MAILTO} className="btn btn-primary btn-lg">
                  <ArrowUpRight size={16} aria-hidden="true" />
                  Request release access
                </a>
              )}
              <Link to="/download" className="btn btn-secondary btn-lg">
                Download details
              </Link>
            </div>

            <p className="download-note">
              <AlertCircle size={14} aria-hidden="true" />
              {installerAvailable
                ? 'The verified installer is published on the download page.'
                : `AION has not published a public installer yet. The download page will link to the verified build when it is available. Questions: ${CONTACT}.`}
            </p>
          </div>

          <div className="release-card">
            <div className="release-card-head">
              <div className="release-card-brand">
                <RiaMark size={30} />
                <div>
                  <p className="release-card-name">{PRODUCT}</p>
                  <p className="release-card-channel">{RELEASE.channel}</p>
                </div>
              </div>
              <StatusPill tone="warning">Publishing</StatusPill>
            </div>

            <div className="release-rows">
              <div className="release-row">
                <span>Version</span>
                <span>{RELEASE.version}</span>
              </div>
              <div className="release-row">
                <span>Platform</span>
                <span>Windows 10 / 11</span>
              </div>
              <div className="release-row">
                <span>Architecture</span>
                <span>{RELEASE.architecture}</span>
              </div>
              <div className="release-row">
                <span>Installer size</span>
                <span>{RELEASE.installerSize ?? 'Published with the build'}</span>
              </div>
              <div className="release-row">
                <span>License</span>
                <span>{RELEASE.license}</span>
              </div>
            </div>

            <div className="release-card-foot">
              <span>Built by AION</span>
              <span>{PRODUCT} {RELEASE.version}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Company                                                                   */
/* -------------------------------------------------------------------------- */

export function CompanySection() {
  return (
    <section
      className="section section--base company"
      aria-labelledby="company-title"
    >
      <div className="container">
        <div className="company-grid">
          <div className="company-copy">
            <Eyebrow>Built by AION</Eyebrow>
            <h2 className="section-title" id="company-title">
              A company for
              <br />
              personal intelligence.
            </h2>
            <p className="lead">
              AION is an independent software company based in India. {PRODUCT}{' '}
              is our first product: a desktop intelligence system built around
              memory, local computation, and user control.
            </p>
            <p>
              We are interested in software that becomes more useful over time
              without asking you to hand over the context that makes it useful.
              That idea shapes every part of RIA.
            </p>
            <TextLink to="/about">About AION</TextLink>
          </div>

          <div className="company-mark" aria-hidden="true">
            <div className="company-mark-inner">
              <AionMark size={58} />
              <span className="company-wordmark">AION</span>
              <span className="company-statement">
                Personal intelligence systems.
              </span>
            </div>
            <div className="company-mark-meta">
              <span>Independent</span>
              <span>India</span>
              <span>{PRODUCT} {RELEASE.version}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Final CTA                                                                 */
/* -------------------------------------------------------------------------- */

export function FinalCta() {
  return (
    <section className="section section--base final-cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="final-cta-panel">
          <div className="final-cta-copy">
            <Eyebrow light>Get started</Eyebrow>
            <h2 className="final-cta-title" id="cta-title">
              Bring RIA to your desktop.
            </h2>
            <p>
              A calmer way to work with AI: your conversation, memory, knowledge,
              and local tools in one place.
            </p>
          </div>
          <div className="final-cta-actions">
            <a href={RELEASE_MAILTO} className="btn btn-light btn-lg">
              <ArrowUpRight size={16} aria-hidden="true" />
              Request release access
            </a>
            <Link to="/product" className="btn btn-outline-light btn-lg">
              Explore {PRODUCT}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
