import { Seo } from '../components/Seo'
import {
  ControlSection,
  FinalCta,
  MemorySection,
  WorkflowSection,
} from '../components/sections'
import {
  Eyebrow,
  PageHero,
  ProductFrame,
  Reveal,
  RiaMark,
  StatusPill,
} from '../components/ui'
import {
  PRINCIPLES,
  PRODUCT,
  PRODUCT_IMAGES,
  RELEASE,
} from '../lib/site'

const WORKSPACE_AREAS = [
  'Overview',
  'Talk to RIA',
  'Conversation',
  'Dashboard',
  'Goals',
  'Personal assistant',
  'Memory',
  'Core memory',
  'Knowledge sources',
  'Web explorer',
  'Teach RIA',
  'Creative gallery',
  'GPU studio',
  'Journal',
]

export function ProductPage() {
  return (
    <>
      <Seo
        title="Product"
        description="RIA is a personal intelligence workspace for Windows: conversation, memory, knowledge, goals, creative tools, and an optional local runtime. Built by AION."
      />

      <PageHero
        eyebrow="The product"
        title={
          <>
            A personal intelligence
            <br />
            workspace.
          </>
        }
        intro={
          <>
            RIA is a Windows desktop application that brings conversation,
            memory, knowledge, and local tools into one place. It is built for
            work that continues — not a single prompt that disappears.
          </>
        }
        meta={
          <>
            <span>{RELEASE.version}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>{RELEASE.platform}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>Built by AION</span>
          </>
        }
        aside={
          <div className="product-facts">
            <div className="product-facts-head">
              <RiaMark size={30} />
              <div>
                <p className="product-facts-name">{PRODUCT}</p>
                <p className="product-facts-sub">Personal intelligence</p>
              </div>
            </div>
            <div className="product-facts-row">
              <span>Platform</span>
              <span>Windows 10 / 11</span>
            </div>
            <div className="product-facts-row">
              <span>Runtime</span>
              <span>Local, optional</span>
            </div>
            <div className="product-facts-row">
              <span>Memory</span>
              <span>Persistent</span>
            </div>
            <div className="product-facts-row">
              <span>Status</span>
              <StatusPill tone="warning">Installer publishing</StatusPill>
            </div>
          </div>
        }
      />

      <section className="page-visual">
        <div className="container">
          <Reveal>
            <ProductFrame
              image={PRODUCT_IMAGES.workspaceMain}
              priority
              caption="RIA Workspace on Windows · the current build"
              label="Actual product interface"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--white product-intro" aria-labelledby="product-intro-title">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-lead">
              <Eyebrow>What RIA is</Eyebrow>
              <h2 className="section-title" id="product-intro-title">
                Three ideas,
                <br />
                one workspace.
              </h2>
            </div>
            <div className="intro-body">
              <p className="lead">
                RIA is not a single feature or a thin wrapper around a model. It
                is a working environment built around three ideas: a place to
                think, a memory that persists, and a runtime that stays close to
                your machine.
              </p>
            </div>
          </div>

          <div className="product-pillars">
            <Reveal>
              <article className="pillar">
                <span className="pillar-number">01</span>
                <h3>A workspace</h3>
                <p>
                  Conversation, knowledge, goals, creative tools, and a personal
                  assistant share one desktop surface. The overview keeps the
                  current state of your work in view.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="pillar">
                <span className="pillar-number">02</span>
                <h3>A memory</h3>
                <p>
                  Memory, core memory, and knowledge sources are visible parts
                  of the product. RIA is designed to carry context across
                  sessions instead of starting over.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.12}>
              <article className="pillar">
                <span className="pillar-number">03</span>
                <h3>A runtime</h3>
                <p>
                  The local runtime panel shows the state of the machine running
                  RIA. Local models are optional, and cloud features are choices
                  you configure.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <WorkflowSection
        intro="The workflow is deliberately simple: understand the problem, keep the context, do the work, and make something from it. Each part of RIA supports one of those movements."
      />

      <MemorySection />

      <section
        className="section section--white interface"
        aria-labelledby="interface-title"
      >
        <div className="container">
          <div className="interface-grid">
            <div className="interface-copy">
              <Eyebrow>The interface</Eyebrow>
              <h2 className="section-title" id="interface-title">
                A desktop surface,
                <br />
                not a chat box.
              </h2>
              <p className="lead">
                The workspace is organised around the things you return to:
                conversations, memory, knowledge, goals, and the tools that turn
                thought into output.
              </p>
              <p>
                The sidebar keeps the deeper systems one step away. The overview
                shows what matters now. A search field and quick-jump make the
                rest reachable without breaking the thread.
              </p>
              <div className="interface-note">
                <span className="status-dot" aria-hidden="true" />
                The workspace in the current build includes the areas below.
              </div>
            </div>

            <div className="interface-index" aria-label="Workspace areas">
              {WORKSPACE_AREAS.map((area, index) => (
                <div className="interface-index-item" key={area}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ControlSection />

      <section
        className="section section--base product-principles"
        aria-labelledby="product-principles-title"
      >
        <div className="container">
          <div className="section-head section-head--split">
            <div className="section-head-main">
              <Eyebrow>Product principles</Eyebrow>
              <h2 className="section-title" id="product-principles-title">
                What shapes
                <br />
                the product.
              </h2>
            </div>
            <div className="section-head-intro">
              <p>
                RIA is built with a small set of commitments. They are not
                slogans; they determine what the product does and what it
                refuses to do.
              </p>
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

      <FinalCta />
    </>
  )
}
