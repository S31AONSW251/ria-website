import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import {
  Eyebrow,
  PageHero,
  Reveal,
  RiaMark,
  SectionHead,
  StatusPill,
} from '../components/ui'
import {
  CONTACT,
  PRODUCT,
  RELEASE,
  RELEASE_MAILTO,
  SPECS,
} from '../lib/site'

const INSTALLER_STEPS = [
  {
    title: 'Download the installer',
    copy: 'The verified installer will be linked on this page when AION publishes it. No unverified build is offered here.',
  },
  {
    title: 'Run the setup',
    copy: 'Launch the downloaded file and follow the on-screen setup. The public build will be signed.',
  },
  {
    title: 'Launch RIA',
    copy: 'Open RIA from the Start menu or the desktop shortcut.',
  },
  {
    title: 'Connect your runtime',
    copy: 'Add a cloud provider or connect Ollama for local models. Local tools are optional.',
  },
]

const SOURCE_STEPS = [
  {
    title: 'Clone the repository',
    copy: 'Use the repository link provided with the release guide.',
  },
  {
    title: 'Install dependencies',
    copy: 'Run npm install, then install the backend and frontend packages.',
  },
  {
    title: 'Create the backend environment',
    copy: 'Copy backend/.env.example to backend/.env and set your local values.',
  },
  {
    title: 'Launch with the one-click script',
    copy: 'Run Start-RIA-OneClick.bat. The backend starts at 127.0.0.1:3001 and the frontend at 127.0.0.1:5173.',
  },
]

const FAQS = [
  {
    question: 'Where is the Windows installer?',
    answer:
      'AION has not published a public installer yet. The download page will link to the verified build when it is available. You can request release access by email or review the release guide for the source-based developer preview.',
  },
  {
    question: 'Node.js or npm is not recognised',
    answer:
      'Install Node.js 18 or later from nodejs.org. Restart your terminal after installation and confirm with node --version.',
  },
  {
    question: 'Local AI models are slow or unavailable',
    answer:
      'Install Ollama from ollama.com and pull the model you want, for example ollama pull llama3. An NVIDIA GPU significantly improves local inference speed.',
  },
  {
    question: 'The application does not start',
    answer:
      'Ensure all dependencies are installed and the backend environment file is correctly populated. Check the backend terminal for error messages.',
  },
  {
    question: 'Antivirus is blocking RIA',
    answer:
      'Some antivirus software may flag new applications. Add an exception for the RIA installation directory, or contact your antivirus vendor if the issue continues.',
  },
]

export function DownloadPage() {
  const installerAvailable = Boolean(RELEASE.installerUrl)

  return (
    <>
      <Seo />

      <PageHero
        eyebrow="Download RIA"
        title={
          <>
            <svg
              width="34"
              height="34"
              viewBox="0 0 88 88"
              aria-hidden="true"
              style={{ marginBottom: '12px', display: 'block' }}
            >
              <path
                fill="#0078D4"
                d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.686zm4.326-39.025L87.314 0v41.524l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.067-34.737z"
              />
            </svg>
            RIA for
            <br />
            Windows.
          </>
        }
        intro={
          <>
            Version {RELEASE.version} for {RELEASE.platform}. A personal
            intelligence workspace with memory, knowledge, conversation, and an
            optional local runtime.
          </>
        }
        meta={
          <>
            <span>{RELEASE.version}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>Windows 10 / 11</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>x86-64</span>
          </>
        }
        aside={
          <div className="release-card release-card--download">
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
        }
      >
        <div className="download-hero-actions">
          {installerAvailable ? (
            <a
              href={RELEASE.installerUrl as string}
              className="btn btn-primary btn-lg"
              download
            >
              <Download size={16} aria-hidden="true" />
              Download {PRODUCT} {RELEASE.version}
            </a>
          ) : (
            <a href={RELEASE_MAILTO} className="btn btn-primary btn-lg">
              <ArrowUpRight size={16} aria-hidden="true" />
              Request release access
            </a>
          )}
          <a
            href="/downloads/ria-release-guide.md"
            className="btn btn-secondary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the release guide
          </a>
        </div>

        <p className="download-hero-note">
          <AlertCircle size={15} aria-hidden="true" />
          {installerAvailable
            ? 'The verified installer is available above.'
            : 'The public installer is not yet linked. AION will publish the verified Windows build here when it is ready.'}
        </p>
      </PageHero>

      <section
        className="section section--base download-requirements"
        id="requirements"
        aria-labelledby="requirements-title"
      >
        <div className="container">
          <div className="specs-grid">
            <div className="specs-copy">
              <Eyebrow>System requirements</Eyebrow>
              <h2 className="section-title" id="requirements-title">
                What you
                <br />
                will need.
              </h2>
              <p>
                These are the recommended requirements for the Windows desktop
                build. Local AI features depend on the models and tools you
                install.
              </p>
              <p className="specs-note">
                A verified installer is not yet published. Requirements may be
                updated with the signed build.
              </p>
            </div>

            <div className="specs-table" role="table" aria-label="System requirements">
              {SPECS.map(([label, value]) => (
                <div className="specs-row" role="row" key={label}>
                  <span className="specs-label" role="cell">
                    {label}
                  </span>
                  <span className="specs-value" role="cell">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white install" aria-labelledby="install-title">
        <div className="container">
          <SectionHead
            split
            eyebrow="Installation"
            title={<span id="install-title">Two ways in.</span>}
            intro={
              <p>
                The signed Windows installer is the primary path once published.
                The developer preview is available from the release guide for
                source-based setup.
              </p>
            }
          />

          <div className="install-grid">
            <Reveal>
              <article className="install-track">
                <div className="install-track-head">
                  <div>
                    <span className="install-track-kicker">Primary path</span>
                    <h3>Windows installer</h3>
                  </div>
                  <StatusPill tone="warning">Publishing</StatusPill>
                </div>
                <p className="install-track-intro">
                  The signed installer is being finalised. These are the steps
                  the public build will follow.
                </p>
                <ol className="install-steps">
                  {INSTALLER_STEPS.map((step, index) => (
                    <li className="install-step" key={step.title}>
                      <span className="install-step-num">{index + 1}</span>
                      <div>
                        <p className="install-step-title">{step.title}</p>
                        <p className="install-step-copy">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="install-track install-track--muted">
                <div className="install-track-head">
                  <div>
                    <span className="install-track-kicker">Developer preview</span>
                    <h3>Source setup</h3>
                  </div>
                  <StatusPill tone="neutral">Release guide</StatusPill>
                </div>
                <p className="install-track-intro">
                  The release guide documents the current source-based setup.
                  Follow it exactly; keep secrets and local data out of version
                  control.
                </p>
                <ol className="install-steps">
                  {SOURCE_STEPS.map((step, index) => (
                    <li className="install-step" key={step.title}>
                      <span className="install-step-num">{index + 1}</span>
                      <div>
                        <p className="install-step-title">{step.title}</p>
                        <p className="install-step-copy">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <a
                  href="/downloads/ria-release-guide.md"
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open the release guide</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--base release-notes" aria-labelledby="release-notes-title">
        <div className="container">
          <SectionHead
            split
            eyebrow="Release notes"
            title={<span id="release-notes-title">{PRODUCT} {RELEASE.version}.</span>}
            intro={
              <p>
                The public installer is not yet linked. Release notes will be
                published with the signed build. Here is what the current
                workspace includes.
              </p>
            }
          />

          <div className="release-notes-grid">
            <Reveal>
              <article className="release-note-card">
                <h3>Included in the current build</h3>
                <ul className="check-list">
                  <li><Check size={15} aria-hidden="true" />Workspace overview and quick jump</li>
                  <li><Check size={15} aria-hidden="true" />Conversation, Talk to RIA, and live conversation</li>
                  <li><Check size={15} aria-hidden="true" />Memory, core memory, and knowledge sources</li>
                  <li><Check size={15} aria-hidden="true" />Goals, personal assistant, and dashboard</li>
                  <li><Check size={15} aria-hidden="true" />Creative gallery, GPU studio, and journal</li>
                  <li><Check size={15} aria-hidden="true" />Local runtime status and optional local models</li>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="release-note-card">
                <h3>Release facts</h3>
                <div className="release-rows">
                  <div className="release-row">
                    <span>Version</span>
                    <span>{RELEASE.version}</span>
                  </div>
                  <div className="release-row">
                    <span>Channel</span>
                    <span>{RELEASE.channel}</span>
                  </div>
                  <div className="release-row">
                    <span>Status</span>
                    <span>Installer publishing</span>
                  </div>
                  <div className="release-row">
                    <span>Platform</span>
                    <span>{RELEASE.platform}</span>
                  </div>
                  <div className="release-row">
                    <span>Architecture</span>
                    <span>{RELEASE.architecture}</span>
                  </div>
                  <div className="release-row">
                    <span>License</span>
                    <span>{RELEASE.license}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--white troubleshooting" aria-labelledby="troubleshooting-title">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-copy">
              <Eyebrow>Troubleshooting</Eyebrow>
              <h2 className="section-title" id="troubleshooting-title">
                Common issues.
              </h2>
              <p>
                Most setup problems come down to dependencies, local model
                configuration, or antivirus software. If none of these help,
                contact AION directly.
              </p>
              <a href={`mailto:${CONTACT}`} className="text-link">
                <span>Contact AION</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="faq-list">
              {FAQS.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--base download-contact" aria-labelledby="download-contact-title">
        <div className="container">
          <div className="contact-card">
            <div>
              <Eyebrow>Release access</Eyebrow>
              <h2 className="section-title" id="download-contact-title">
                Want the build?
              </h2>
              <p>
                Request release access and AION will share the verified Windows
                installer when it is published.
              </p>
            </div>
            <div className="contact-card-actions">
              <a href={RELEASE_MAILTO} className="btn btn-primary btn-lg">
                Request release access
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <Link to="/privacy" className="btn btn-secondary btn-lg">
                Privacy &amp; data
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
