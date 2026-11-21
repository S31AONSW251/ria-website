import { Seo } from '../components/Seo'
import { FinalCta } from '../components/sections'
import {
  Eyebrow,
  PageHero,
  ProductFrame,
  Reveal,
  RiaMark,
  StatusPill,
} from '../components/ui'
import {
  FEATURES,
  PRODUCT_IMAGES,
  RELEASE,
  SPECS,
} from '../lib/site'

const IMAGE_MAP = {
  workspace: PRODUCT_IMAGES.workspace,
  conversation: PRODUCT_IMAGES.conversation,
  memory: PRODUCT_IMAGES.memory,
  runtime: PRODUCT_IMAGES.runtime,
} as const

export function FeaturesPage() {
  return (
    <>
      <Seo
        title="Features"
        description="Explore RIA's features: a unified workspace, persistent memory, knowledge sources, conversation, goals, creative tools, and an optional local runtime. Built by AION."
      />

      <PageHero
        eyebrow="Features"
        title={
          <>
            Every capability,
            <br />
            in service of your work.
          </>
        }
        intro={
          <>
            RIA is a set of connected systems, not a list of isolated tricks.
            Conversation, memory, knowledge, goals, creative tools, and the local
            runtime are designed to work together.
          </>
        }
        meta={
          <>
            <span>{RELEASE.version}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>{RELEASE.platform}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>Current Windows build</span>
          </>
        }
        aside={
          <nav className="feature-index" aria-label="Feature sections">
            {FEATURES.map((feature) => (
              <a key={feature.id} href={`#${feature.id}`} className="feature-index-link">
                <span>{feature.kicker}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        }
      />

      <div className="container">
        <div className="feature-rows">
          {FEATURES.map((feature, index) => {
            const image = feature.image ? IMAGE_MAP[feature.image] : null

            return (
              <section
                key={feature.id}
                id={feature.id}
                className={`feature-row${feature.reverse ? ' feature-row--reverse' : ''}`}
                aria-labelledby={`${feature.id}-title`}
              >
                <Reveal className="feature-copy">
                  <Eyebrow>{feature.kicker}</Eyebrow>
                  <h2 className="feature-title" id={`${feature.id}-title`}>
                    {feature.title}
                  </h2>
                  <p className="lead">{feature.copy}</p>
                  <ul className="feature-list">
                    {feature.items.map((item) => (
                      <li key={item}>
                        <span className="feature-list-dot" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.06} className="feature-visual">
                  {image ? (
                    <ProductFrame
                      image={image}
                      sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 560px"
                      caption={`${feature.kicker} · RIA ${RELEASE.version}`}
                      label="Actual product interface"
                    />
                  ) : (
                    <div className="feature-label-card">
                      <div className="feature-label-card-head">
                        <RiaMark size={28} />
                        <div>
                          <p className="feature-label-card-name">RIA</p>
                          <p className="feature-label-card-sub">
                            Workspace area
                          </p>
                        </div>
                        <StatusPill tone="neutral">In the build</StatusPill>
                      </div>
                      <div className="feature-label-grid">
                        {feature.items.map((item, itemIndex) => (
                          <div className="feature-label" key={item}>
                            <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="feature-label-note">
                        These areas are part of the current RIA workspace.
                        Screenshots are shown only where the interface can be
                        represented faithfully.
                      </p>
                    </div>
                  )}
                </Reveal>
              </section>
            )
          })}
        </div>
      </div>

      <section
        className="section section--white specs"
        id="specifications"
        aria-labelledby="specs-title"
      >
        <div className="container">
          <div className="specs-grid">
            <div className="specs-copy">
              <Eyebrow>Technical specifications</Eyebrow>
              <h2 className="section-title" id="specs-title">
                What the current
                <br />
                build expects.
              </h2>
              <p>
                Specifications describe the Windows desktop build. Local AI
                features depend on the models and tools you install and
                configure.
              </p>
              <p className="specs-note">
                The public installer is not yet linked. See the download page for
                release status and verified setup guidance.
              </p>
            </div>

            <div className="specs-table" role="table" aria-label="Technical specifications">
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

      <FinalCta />
    </>
  )
}
