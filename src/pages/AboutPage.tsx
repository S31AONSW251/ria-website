import {
  ArrowUpRight,
  Cpu,
  Database,
  Lock,
  Mail,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import {
  AionMark,
  Eyebrow,
  PageHero,
  Reveal,
  SectionHead,
  TextLink,
} from '../components/ui'
import {
  COMPANY,
  CONTACT,
  FOUNDER,
  PRODUCT,
} from '../lib/site'

const VALUES = [
  {
    number: '01',
    title: 'Software that respects you',
    copy: 'RIA is designed to be transparent about what it does, what it stores, and what it can access. You control your data and your AI, not the other way around.',
  },
  {
    number: '02',
    title: 'Intelligence that compounds',
    copy: 'The most useful AI is one that gets better the longer you use it. RIA is built around persistent memory and long-term context, not stateless chat sessions.',
  },
  {
    number: '03',
    title: 'Local-first by design',
    copy: 'Sensitive personal data belongs on your machine. RIA is architected to run locally wherever possible, minimising unnecessary cloud dependency.',
  },
  {
    number: '04',
    title: 'Precision over spectacle',
    copy: 'We build software that solves real problems in straightforward ways. No feature exists for its own sake; every capability earns its place.',
  },
]

const DIRECTION = [
  {
    icon: <Database size={19} aria-hidden="true" />,
    title: 'Memory as a first-class system',
    copy: 'RIA treats memory as part of the workspace, not a hidden cache. The direction is visible, manageable memory that makes long-running work possible.',
  },
  {
    icon: <Cpu size={19} aria-hidden="true" />,
    title: 'A local runtime that earns its place',
    copy: 'Local models and GPU tools are optional, but they matter. They let sensitive work stay close to the machine when the hardware and setup allow it.',
  },
  {
    icon: <Lock size={19} aria-hidden="true" />,
    title: 'Clear boundaries, by default',
    copy: 'Cloud features are explicit. Local functionality is documented honestly. The product should never require you to guess where your data is going.',
  },
]

export function AboutPage() {
  return (
    <>
      <Seo />

      <PageHero
        eyebrow={`About ${COMPANY}`}
        title={
          <>
            Building intelligence
            <br />
            you can call your own.
          </>
        }
        intro={
          <>
            {COMPANY} is an independent software company based in India. We build{' '}
            {PRODUCT}, a personal intelligence workspace for Windows, around a
            simple conviction: useful AI should stay close to the person using
            it.
          </>
        }
        meta={
          <>
            <span>Founded 2026</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>India</span>
            <span className="meta-dot" aria-hidden="true" />
            <span>One product: {PRODUCT}</span>
          </>
        }
        aside={
          <div className="about-facts">
            <div className="about-facts-head">
              <AionMark size={30} />
              <span>{COMPANY}</span>
            </div>
            <div className="about-facts-row">
              <span>Founded</span>
              <span>2026</span>
            </div>
            <div className="about-facts-row">
              <span>Based</span>
              <span>India</span>
            </div>
            <div className="about-facts-row">
              <span>Focus</span>
              <span>Personal intelligence</span>
            </div>
            <div className="about-facts-row">
              <span>Product</span>
              <span>{PRODUCT}</span>
            </div>
            <div className="about-facts-row">
              <span>Platform</span>
              <span>Windows</span>
            </div>
          </div>
        }
      />

      <section className="section section--white about-mission" aria-labelledby="about-mission-title">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-lead">
              <Eyebrow>Mission</Eyebrow>
              <h2 className="section-title" id="about-mission-title">
                Personal AI that
                <br />
                works for you.
              </h2>
            </div>
            <div className="intro-body">
              <p className="lead">
                Most AI tools are designed around cloud services, subscriptions,
                and data collection. {COMPANY} believes there is a better model:
                AI software that runs on your hardware, respects your privacy,
                and becomes more useful the longer you use it.
              </p>
              <p>
                {PRODUCT} is our first product: a personal intelligence workspace
                for Windows that combines conversation, persistent memory,
                knowledge sources, creative tools, and user-controlled local
                runtime. It is built to be a serious tool for people who do
                serious work.
              </p>
              <TextLink to="/product">Explore the product</TextLink>
            </div>
          </div>

          <div className="stat-grid">
            <div className="stat">
              <p className="stat-value">2026</p>
              <p className="stat-label">Founded</p>
            </div>
            <div className="stat">
              <p className="stat-value">India</p>
              <p className="stat-label">Based</p>
            </div>
            <div className="stat">
              <p className="stat-value">Windows</p>
              <p className="stat-label">Platform</p>
            </div>
            <div className="stat">
              <p className="stat-value">1</p>
              <p className="stat-label">Product</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--base about-values" aria-labelledby="about-values-title">
        <div className="container">
          <SectionHead
            split
            eyebrow="What we believe"
            title={
              <span id="about-values-title">
                Four commitments,
                <br />
                taken seriously.
              </span>
            }
            intro={
              <p>
                These are not brand statements. They are the constraints we use
                when deciding what {PRODUCT} should do, and what it should leave
                out.
              </p>
            }
          />

          <div className="values-grid">
            {VALUES.map((value, index) => (
              <Reveal key={value.number} delay={index * 0.06}>
                <article className="value">
                  <span className="value-number">{value.number}</span>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white about-founder" aria-labelledby="founder-title">
        <div className="container">
          <div className="founder-card">
            <div className="founder-avatar" aria-hidden="true">
              <span>SB</span>
              <span className="founder-avatar-label">{COMPANY}</span>
            </div>
            <div className="founder-copy">
              <Eyebrow>Founder</Eyebrow>
              <h2 className="section-title" id="founder-title">
                {FOUNDER}
              </h2>
              <p className="lead">
                {FOUNDER} founded {COMPANY} in India with the goal of building a
                personal intelligence system that respects user privacy, runs
                locally where possible, and delivers genuine long-term utility.
              </p>
              <p>
                {PRODUCT} represents {COMPANY}'s first public product: a focused,
                honest piece of software built to do what it says and nothing it
                does not.
              </p>
              <a href={`mailto:${CONTACT}`} className="text-link">
                <span>Contact {FOUNDER}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--base about-direction" aria-labelledby="direction-title">
        <div className="container">
          <SectionHead
            split
            eyebrow="Technology direction"
            title={
              <span id="direction-title">
                Local-first,
                <br />
                by intention.
              </span>
            }
            intro={
              <p>
                {PRODUCT} is being built in public increments, with the product
                itself as the clearest statement of the direction. These are the
                areas that matter most.
              </p>
            }
          />

          <div className="direction-grid">
            {DIRECTION.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="direction-card">
                  <span className="direction-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white about-contact" aria-labelledby="about-contact-title">
        <div className="container">
          <div className="contact-card">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="section-title" id="about-contact-title">
                Talk to AION.
              </h2>
              <p>
                Questions about {PRODUCT}, the release, or the company are
                welcome. Write to us directly.
              </p>
            </div>
            <a href={`mailto:${CONTACT}`} className="btn btn-primary btn-lg">
              <Mail size={16} aria-hidden="true" />
              {CONTACT}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
