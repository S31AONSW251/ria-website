import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  Database,
  Download as DownloadIcon,
  Fingerprint,
  Github,
  Handshake,
  HeartPulse,
  Layers3,
  LineChart,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic2,
  Moon,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap
} from 'lucide-react'

const contactDetails = {
  founderName: 'Sudeep Bala',
  companyName: 'AIONTEC / RIA',
  email: 'balasudeep22@gmail.com',
  location: 'India',
  whatsappLink: 'https://wa.me/919279786052?text=Hi%20Sudeep%2C%20I%20am%20interested%20in%20RIA.'
}

const nav = [
  ['Product', '/product'],
  ['Research', '/research'],
  ['Company', '/company'],
  ['Safety', '/safety'],
  ['Support', '/support'],
  ['Funding', '/funding']
]

const productSystems = [
  ['Memory Vault', Database, 'Stores important context, user-selected facts, personal history, goals, emotions, and recurring themes.'],
  ['Reflection Engine', Orbit, 'Turns conversations and journals into patterns, summaries, questions, and next-step insight.'],
  ['Belief Graph', Fingerprint, 'Classifies limiting beliefs, growth beliefs, values, confidence signals, and mindset shifts.'],
  ['Emotional Timeline', HeartPulse, 'Maps mood, triggers, intensity, recovery time, and emotional loops across days and weeks.'],
  ['Calm Mode', Moon, 'Guided breathing, grounding, affirmations, spiritual reset flows, and low-pressure support moments.'],
  ['Voice Layer', Mic2, 'Designed for natural spoken interaction, daily check-ins, reflective prompts, and audio companionship.']
]

const researchTracks = [
  ['Memory Continuity', 'How a personal AI should remember without becoming intrusive, confusing, or opaque.'],
  ['Reflective Reasoning', 'How RIA can detect repeated themes and create useful summaries instead of generic advice.'],
  ['Emotional Intelligence', 'How mood, triggers, intensity, and recovery patterns can become visible and actionable.'],
  ['Belief Classification', 'How language can reveal limiting beliefs, growth beliefs, identity statements, and values.'],
  ['User Control', 'How memory editing, export, deletion, and consent should work in a trusted AI companion.'],
  ['Human Trust', 'How RIA communicates honestly about uncertainty, limitations, and system behavior.']
]

const companyPillars = [
  ['Mission', 'Build a private cognitive intelligence layer that helps people understand themselves with continuity.'],
  ['Product Focus', 'Memory, journaling, reflection, emotional intelligence, calm mode, and user-owned data.'],
  ['Audience', 'Students, creators, founders, professionals, and anyone building self-awareness through daily reflection.'],
  ['Positioning', 'Not a chatbot. RIA is a personal cognitive operating system built around the user’s inner life.']
]

const roadmap = [
  ['Phase 01', 'Premium web presence', 'Complete website, investor-ready product story, demo interface, and public roadmap.'],
  ['Phase 02', 'Prototype backend', 'Memory vault, journal records, user profile, semantic retrieval, and secure storage.'],
  ['Phase 03', 'Insight systems', 'Belief classifier, emotional reports, reflection summaries, and weekly pattern reviews.'],
  ['Phase 04', 'Companion release', 'Voice, calm mode, onboarding, privacy controls, early access, and user feedback loop.']
]

const supportItems = [
  ['Early Access', 'Request access to prototype builds, demos, and private product walkthroughs.'],
  ['Partnership', 'Discuss integrations, mental wellness pilots, student programs, or creator workflows.'],
  ['Investor Contact', 'Support the first working prototype and help move RIA from concept to product.'],
  ['Product Feedback', 'Share what you need from memory, journaling, emotional tracking, and personal AI.']
]

const replies = {
  memory: 'RIA is designed to remember important context through a visible memory vault: goals, emotions, beliefs, personal history, and user-approved facts.',
  journal: 'RIA can turn daily conversations into structured journal entries with mood tags, themes, unresolved thoughts, and reflection prompts.',
  belief: 'RIA classifies limiting beliefs, growth beliefs, identity statements, and confidence signals so mindset patterns become easier to understand.',
  emotion: 'RIA tracks moods, triggers, intensity, recovery patterns, and emotional timelines to make repeated inner patterns visible.',
  calm: 'Calm Mode supports breathing, grounding, affirmations, and low-pressure reset routines when stress or confusion appears.',
  funding: 'Funding supports model/API integration, secure memory storage, journaling, emotional dashboards, voice, privacy controls, and launch readiness.'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1480px] px-5 sm:px-8 xl:px-10 ${className}`}>{children}</div>
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/82 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-white/15 bg-white text-black shadow-[0_0_28px_rgba(255,255,255,0.16)]">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block text-base font-semibold text-white">RIA</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-zinc-500">AIONTEC</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex">
          {nav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'text-white' : 'transition hover:text-white'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/download" className="hidden text-zinc-400 transition hover:text-white sm:inline">Download</Link>
          <Link to="/demo" className="inline-flex items-center gap-2 border border-white/15 bg-white px-4 py-2 font-semibold text-black transition hover:bg-zinc-200">
            Start RIA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3 text-white">
            <BrainCircuit className="h-5 w-5" />
            <span className="font-semibold">RIA by AIONTEC</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Premium personal cognitive intelligence for memory continuity, reflection, emotional awareness, journaling, and growth.
          </p>
        </div>
        {[
          ['Product', ['Memory vault', 'Reflection engine', 'Belief graph', 'Calm mode']],
          ['Research', ['Memory continuity', 'Emotional AI', 'User control', 'Trust']],
          ['Company', ['Mission', 'Roadmap', 'Founder', 'Partners']],
          ['Support', ['Funding', 'Early access', 'Contact', 'Download']]
        ].map(([title, links]) => (
          <div key={title}>
            <p className="mb-4 text-sm font-semibold text-white">{title}</p>
            {links.map((item) => (
              <p key={item} className="mb-3 text-sm text-zinc-500">{item}</p>
            ))}
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>RIA by AIONTEC © 2026. Built in India.</p>
        <div className="flex gap-4">
          <Github className="h-4 w-4" />
          <Mail className="h-4 w-4" />
          <Layers3 className="h-4 w-4" />
        </div>
      </Container>
    </footer>
  )
}

function SectionIntro({ eyebrow, title, copy, action, to }) {
  return (
    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{eyebrow}</p>
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.055em] text-white sm:text-5xl">{title}</h2>
        {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">{copy}</p>}
      </div>
      {action && (
        <Link to={to} className="inline-flex w-fit items-center gap-2 border border-white/15 px-4 py-3 text-sm text-zinc-200 transition hover:border-white hover:text-white">
          {action}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

function HeroSearch() {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        window.location.href = '/demo'
      }}
      className="mx-auto mt-9 flex max-w-2xl items-center gap-3 border border-white/12 bg-white/[0.06] px-4 py-3 text-left shadow-[0_28px_120px_rgba(255,255,255,0.06)] backdrop-blur-xl"
    >
      <MessageCircle className="h-5 w-5 text-zinc-500" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask RIA about memory, emotion, journal, calm mode, or funding"
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      />
      <button className="grid h-9 w-9 place-items-center bg-white text-black" aria-label="Ask RIA">
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black pt-28 text-white">
        <div className="absolute inset-0 premium-grid opacity-55" />
        <Container className="relative grid min-h-[calc(100vh-4rem)] gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-6 inline-flex border border-white/14 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-zinc-300">Personal cognitive intelligence</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl xl:text-8xl">
              RIA remembers, reflects, and grows with you.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              A premium black AI company website for AIONTEC’s RIA: a personal cognitive operating system for memory continuity, journaling, emotional intelligence, belief mapping, calm mode, and user-owned data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/product" className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                Explore product
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/funding" className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white">
                Support build
                <Banknote className="h-4 w-4" />
              </Link>
            </div>
            <HeroSearch />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative">
            <HeroConsole />
          </motion.div>
        </Container>
      </section>
      <MetricsBand />
      <ProductGrid />
      <ResearchPreview />
      <CompanyPreview />
      <SupportCta />
    </>
  )
}

function HeroConsole() {
  return (
    <div className="relative border border-white/12 bg-[#050505] p-4 shadow-[0_40px_160px_rgba(255,255,255,0.06)]">
      <div className="border border-white/10 bg-black">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-emerald-300" />
            <p className="text-sm font-semibold text-white">RIA Cognitive Core</p>
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">Prototype</p>
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {[
            ['Memory integrity', 'Editable', Database],
            ['Mood signal', 'Balanced', HeartPulse],
            ['Journal state', 'Ready', BookOpen],
            ['Trust boundary', 'User-owned', ShieldCheck]
          ].map(([label, value, Icon]) => (
            <div key={label} className="bg-black p-6">
              <Icon className="h-5 w-5 text-zinc-300" />
              <p className="mt-10 text-xs uppercase tracking-[0.2em] text-zinc-600">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 p-5">
          {[
            ['User', 'I keep repeating the same stress pattern.'],
            ['RIA', 'I found three recurring triggers: deadline pressure, unclear expectations, and skipped rest. Want a calm reset or a reflection summary?']
          ].map(([speaker, text]) => (
            <div key={speaker} className="border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-zinc-600">{speaker}</p>
              <p className="text-sm leading-6 text-zinc-200">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricsBand() {
  return (
    <section className="border-b border-white/10 bg-black py-8 text-white">
      <Container className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
        {[
          ['06', 'Core product systems'],
          ['04', 'Prototype roadmap phases'],
          ['100%', 'Black premium interface'],
          ['User', 'Owned memory model']
        ].map(([value, label]) => (
          <div key={label} className="bg-black p-6">
            <p className="text-3xl font-semibold tracking-[-0.05em]">{value}</p>
            <p className="mt-2 text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}

function ProductGrid() {
  return (
    <section className="border-b border-white/10 bg-black py-20 text-white">
      <Container>
        <SectionIntro
          eyebrow="Product"
          title="A complete personal cognitive system, separated into advanced modules."
          copy="Each layer has a clear role: remember context, reflect on patterns, structure journals, understand emotion, protect privacy, and support calm recovery."
          action="View product"
          to="/product"
        />
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {productSystems.map(([title, Icon, copy]) => (
            <div key={title} className="group bg-black p-7 transition hover:bg-[#070707]">
              <div className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/[0.04]">
                <Icon className="h-5 w-5 text-zinc-200" />
              </div>
              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ResearchPreview() {
  return (
    <section className="border-b border-white/10 bg-black py-20 text-white">
      <Container>
        <SectionIntro
          eyebrow="Research"
          title="RIA’s research direction is memory, emotion, trust, and reflection."
          copy="The research program focuses on personal AI systems that create continuity without hiding data from the user."
          action="Open research"
          to="/research"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {researchTracks.slice(0, 3).map(([title, copy], index) => (
            <ArticleCard key={title} index={index + 1} title={title} copy={copy} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ArticleCard({ index, title, copy }) {
  return (
    <div className="border border-white/10 bg-[#050505] p-6">
      <div className="flex aspect-[1.45/1] items-end border border-white/10 bg-black p-5 premium-grid">
        <p className="text-6xl font-semibold tracking-[-0.07em] text-white/12">0{index}</p>
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p>
    </div>
  )
}

function CompanyPreview() {
  return (
    <section className="border-b border-white/10 bg-black py-20 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Company</p>
            <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">AIONTEC is building RIA as a personal AI company.</h2>
            <p className="mt-6 text-base leading-7 text-zinc-400">The company story is now separated from the product story, with mission, audience, roadmap, funding, and support details easy to find.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {companyPillars.map(([title, copy]) => (
              <div key={title} className="bg-black p-7">
                <p className="text-sm text-zinc-500">{title}</p>
                <p className="mt-10 text-xl font-semibold leading-7 tracking-[-0.035em] text-white">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function SupportCta() {
  return (
    <section className="bg-black py-20 text-white">
      <Container>
        <div className="border border-white/10 bg-[#050505] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Support RIA</p>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.055em] text-white sm:text-6xl">Help turn the concept into a working private cognitive AI prototype.</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-zinc-400">Funding and partnership support will help build model integration, memory infrastructure, journal intelligence, emotional dashboards, voice, privacy controls, and launch readiness.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/funding" className="bg-white px-5 py-3 text-sm font-semibold text-black">Funding details</Link>
                <Link to="/support" className="border border-white/15 px-5 py-3 text-sm font-semibold text-white">Contact support</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PageHero({ label, title, copy, icon: Icon = BrainCircuit }) {
  return (
    <section className="border-b border-white/10 bg-black pt-32 text-white">
      <Container className="pb-20">
        <div className="flex h-12 w-12 items-center justify-center border border-white/12 bg-white/[0.04]">
          <Icon className="h-6 w-6" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{label}</p>
        <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">{title}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-300">{copy}</p>
      </Container>
    </section>
  )
}

function Product() {
  return (
    <>
      <PageHero icon={Workflow} label="Product" title="RIA is a private cognitive operating system." copy="A modular personal AI product with persistent memory, journals, emotional intelligence, belief mapping, calm mode, voice, and transparent user controls." />
      <ProductGrid />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <SectionIntro eyebrow="Interface" title="A premium dashboard for memory, mood, journal, and belief signals." copy="This product view shows how RIA can bring advanced personal context into one calm, readable workspace." />
          <Dashboard />
        </Container>
      </section>
    </>
  )
}

function Dashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="border border-white/10 bg-[#050505] p-5">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          {[
            ['Current mood', 'Calm', HeartPulse],
            ['Memory status', 'Linked', Database],
            ['Journal summary', 'Ready', BookOpen],
            ['Belief insight', '3 growth beliefs', Fingerprint],
            ['Privacy state', 'User controlled', LockKeyhole],
            ['Weekly pattern', 'Improving', LineChart]
          ].map(([label, value, Icon]) => (
            <div key={label} className="bg-black p-6">
              <Icon className="h-5 w-5 text-zinc-300" />
              <p className="mt-9 text-sm text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <ChatPanel />
    </div>
  )
}

function ChatPanel() {
  return (
    <div className="border border-white/10 bg-[#050505]">
      <div className="border-b border-white/10 p-5">
        <p className="font-semibold">Chat with RIA</p>
        <p className="mt-1 text-sm text-zinc-500">Memory-aware reflection preview</p>
      </div>
      <div className="space-y-4 p-5">
        <div className="ml-auto max-w-[82%] bg-white p-4 text-sm text-black">I felt overwhelmed today.</div>
        <div className="max-w-[82%] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-zinc-200">I see the same pattern from your last two entries: pressure rises when plans are unclear. Want me to create a short recovery plan?</div>
        <div className="ml-auto max-w-[82%] bg-white p-4 text-sm text-black">Yes, and save this to my journal.</div>
      </div>
    </div>
  )
}

function Research() {
  return (
    <>
      <PageHero icon={Network} label="Research" title="Researching memory continuity for personal AI." copy="RIA explores how long-term memory, emotional context, journaling, belief classification, and transparent user controls can become a trusted personal intelligence layer." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <SectionIntro eyebrow="Tracks" title="Separate research areas for the product’s most important intelligence systems." />
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {researchTracks.map(([title, copy], index) => (
              <div key={title} className="bg-black p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">Research 0{index + 1}</p>
                <h3 className="mt-12 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <SupportCta />
    </>
  )
}

function Safety() {
  return (
    <>
      <PageHero icon={ShieldCheck} label="Safety" title="Personal AI requires personal control." copy="RIA is designed around visible memory, editable data, privacy boundaries, honest communication, and user-owned exports from the beginning." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Editable memory', Database, 'Users should see, correct, delete, and export memory.'],
              ['Private by default', LockKeyhole, 'Sensitive personal context should be handled with strict boundaries.'],
              ['Honest system limits', BadgeCheck, 'RIA should not pretend certainty where it has uncertainty.'],
              ['User-owned data', Check, 'Personal AI memory should belong to the person using it.']
            ].map(([title, Icon, copy]) => (
              <div key={title} className="bg-black p-7">
                <Icon className="h-7 w-7" />
                <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

function Company() {
  return (
    <>
      <PageHero icon={BriefcaseBusiness} label="Company" title="AIONTEC is building RIA into a premium personal AI company." copy="This company page separates mission, market, roadmap, product vision, founder contact, and support paths for investors, partners, and early users." />
      <CompanyPreview />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <SectionIntro eyebrow="Roadmap" title="A practical path from premium concept to working cognitive AI prototype." />
          <div className="grid gap-5 lg:grid-cols-4">
            {roadmap.map(([phase, title, copy]) => (
              <div key={phase} className="border border-white/10 bg-[#050505] p-7">
                <p className="text-sm text-zinc-500">{phase}</p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

function Support() {
  return (
    <>
      <PageHero icon={CircleHelp} label="Support" title="Support, contact, partnership, and early access are now separated." copy="A clear support page for people who want to try RIA, fund the prototype, partner with AIONTEC, or send product feedback." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {supportItems.map(([title, copy]) => (
              <div key={title} className="bg-black p-7">
                <Handshake className="h-7 w-7 text-zinc-300" />
                <h3 className="mt-14 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
          <ContactPanel />
        </Container>
      </section>
    </>
  )
}

function Funding() {
  return (
    <>
      <PageHero icon={Banknote} label="Funding" title="Help build the first working RIA prototype." copy="RIA needs support for model/API integration, memory infrastructure, journaling intelligence, emotional dashboards, privacy controls, voice interaction, and launch materials." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border border-white/10 bg-[#050505] p-8">
              <Banknote className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Founder contact</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.06em]">Invest in RIA’s prototype build.</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-400">For funding, partnership, or investor conversations, contact Sudeep Bala directly.</p>
              <a href={`mailto:${contactDetails.email}?subject=RIA%20Investment%20or%20Partnership`} className="mt-8 inline-flex bg-white px-5 py-3 text-sm font-semibold text-black">Email founder</a>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {['Model/API integration', 'Memory vault', 'Journal engine', 'Emotion dashboard', 'Voice layer', 'Privacy controls'].map((item) => (
                <div key={item} className="bg-black p-6">
                  <Check className="h-5 w-5" />
                  <p className="mt-10 text-xl font-semibold tracking-[-0.03em]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactPanel />
        </Container>
      </section>
    </>
  )
}

function Download() {
  return (
    <>
      <PageHero icon={DownloadIcon} label="Download" title="Download RIA when the first build is ready." copy="RIA is currently in prototype development. This page is prepared for early access, desktop installers, mobile builds, and private demos." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border border-white/10 bg-[#050505] p-8">
              <Sparkles className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Early access</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.06em]">RIA is preparing for release.</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-400">Until the installer is ready, investors and early users can contact the founder for prototype access.</p>
              <a href={`mailto:${contactDetails.email}?subject=RIA%20Early%20Access`} className="mt-8 inline-flex bg-white px-5 py-3 text-sm font-semibold text-black">Request early access</a>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {[
                ['Windows', 'Coming soon', '/downloads/ria-windows.exe'],
                ['macOS', 'Coming soon', '/downloads/ria-mac.dmg'],
                ['Linux', 'Coming soon', '/downloads/ria-linux.AppImage'],
                ['Android', 'Coming soon', '/downloads/ria-android.apk']
              ].map(([platform, status, href]) => (
                <div key={platform} className="bg-black p-7">
                  <Terminal className="h-6 w-6 text-zinc-300" />
                  <p className="mt-10 text-sm text-zinc-500">{platform}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{status}</h3>
                  <a href={href} className="mt-6 inline-flex border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white">Installer placeholder</a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function ContactPanel() {
  return (
    <div className="mt-8 border border-white/10 bg-[#050505] p-8">
      <Mail className="h-7 w-7 text-zinc-300" />
      <p className="mt-8 text-sm text-zinc-500">Direct contact</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white">Contact the founder directly.</h2>
      <div className="mt-8 grid gap-3 text-sm">
        <ContactRow label="Founder" value={contactDetails.founderName} />
        <ContactRow label="Company" value={contactDetails.companyName} />
        <ContactRow label="Location" value={contactDetails.location} />
        <ContactRow label="Email" value={contactDetails.email} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${contactDetails.email}?subject=RIA%20Contact`} className="bg-white px-5 py-3 text-sm font-semibold text-black">Email founder</a>
        <a href={contactDetails.whatsappLink} target="_blank" rel="noreferrer" className="border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white">WhatsApp founder</a>
      </div>
    </div>
  )
}

function ContactRow({ label, value }) {
  return (
    <div className="grid gap-2 border-t border-white/10 py-3 sm:grid-cols-[0.3fr_0.7fr]">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  )
}

function Demo() {
  const [messages, setMessages] = useState([{ role: 'ria', text: 'RIA online. Ask about memory, journal, belief, emotion, calm mode, or funding.' }])
  const [input, setInput] = useState('')
  const send = (value = input) => {
    const clean = value.trim()
    if (!clean) return
    const key = Object.keys(replies).find((item) => clean.toLowerCase().includes(item))
    setMessages((current) => [...current, { role: 'user', text: clean }, { role: 'ria', text: replies[key] || 'I would connect that to your memory, journal, emotional history, and belief map before responding.' }])
    setInput('')
  }

  return (
    <>
      <PageHero icon={Zap} label="Demo" title="Talk with RIA." copy="A premium mock interface showing how RIA can respond through memory, reflection, journaling, emotion, calm guidance, and funding context." />
      <section className="border-b border-white/10 bg-black py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl border border-white/10 bg-[#050505]">
            <div className="border-b border-white/10 p-5">
              <p className="font-semibold">RIA Cognitive Chat</p>
              <p className="mt-1 text-sm text-zinc-500">Prototype response simulator</p>
            </div>
            <div className="h-[430px] space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[86%] px-5 py-4 text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-white text-black' : 'border border-white/10 bg-white/[0.06] text-zinc-200'}`}>
                  {message.text}
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 p-5 pb-0">
              {['memory system', 'auto journal', 'belief classifier', 'emotion tracking', 'calm mode', 'funding plan'].map((prompt) => (
                <button key={prompt} onClick={() => send(prompt)} className="border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:text-white">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); send() }} className="flex gap-3 p-5">
              <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 border border-white/10 bg-black px-5 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Message RIA..." />
              <button className="grid h-12 w-12 place-items-center bg-white text-black" aria-label="Send">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  )
}

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/research" element={<Research />} />
        <Route path="/company" element={<Company />} />
        <Route path="/roadmap" element={<Company />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/support" element={<Support />} />
        <Route path="/download" element={<Download />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/memory" element={<Research />} />
      </Routes>
      <Footer />
    </main>
  )
}
