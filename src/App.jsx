import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  BookOpen,
  BrainCircuit,
  Check,
  Database,
  Fingerprint,
  Github,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic2,
  Moon,
  Orbit,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Waves
} from 'lucide-react'

const images = {
  logo: '/images/logos/ria-logo.png',
  hero: '/images/hero/ria-hero.jpg',
  cards: {
    product: '/images/cards/product.jpg',
    research: '/images/cards/research.jpg',
    safety: '/images/cards/safety.jpg',
    memory: '/images/cards/memory.jpg'
  }
}

const contactDetails = {
  founderName: 'Sudeep Bala',
  companyName: 'AIONTEC / RIA',
  email: 'balasudeep22@gmail.com',
  phone: '+91 9279786052',
  whatsapp: '+91 9279786052',
  whatsappLink: 'https://wa.me/919279786052?text=Hi%20Sudeep%2C%20I%20am%20interested%20in%20RIA.',
  location: 'India',
  linkedin: ''
}

const nav = [
  ['Research', '/research'],
  ['Product', '/product'],
  ['Safety', '/safety'],
  ['Roadmap', '/roadmap'],
  ['Download', '/download'],
  ['Funding', '/funding']
]

const featured = [
  {
    type: 'Product',
    title: 'Introducing RIA, personal cognitive intelligence',
    copy: 'A persistent digital second brain designed for memory, reflection, emotional tracking, journaling, and personal growth.',
    to: '/product'
  },
  {
    type: 'Research',
    title: 'Building memory continuity for personal AI',
    copy: 'RIA’s architecture combines short-term context, long-term identity, belief classification, and reflective summaries.',
    to: '/research'
  },
  {
    type: 'Safety',
    title: 'User-owned memory and emotional privacy',
    copy: 'A personal AI system must make memory visible, editable, exportable, and controlled by the user.',
    to: '/safety'
  }
]

const accentByType = {
  Product: 'from-violet-500 via-fuchsia-400 to-cyan-300',
  Research: 'from-cyan-300 via-sky-500 to-violet-500',
  Safety: 'from-emerald-300 via-cyan-300 to-violet-400',
  Company: 'from-amber-200 via-fuchsia-300 to-violet-500'
}

const productCards = [
  ['Memory System', Database, 'Persistent memory that stores conversations, emotions, beliefs, goals, and personal history.'],
  ['Reflection Engine', Orbit, 'Pattern detection and insight generation for recurring thoughts, stress cycles, and behavior.'],
  ['Journal & Beliefs', BookOpen, 'Auto-journals your day and classifies limiting or growth-oriented beliefs over time.'],
  ['Emotional Intelligence', HeartPulse, 'Mood tracking, emotional timelines, trigger correlation, and calm recovery insights.'],
  ['Calm Mode', Moon, 'Breathing guidance, affirmations, grounding, and spiritual reset flows.'],
  ['Voice Interaction', Mic2, 'Natural voice input and spoken responses for a more human companion experience.']
]

const news = [
  ['Research', 'How RIA detects recurring emotional patterns'],
  ['Product', 'Designing an editable memory vault'],
  ['Safety', 'Why personal AI memory must stay user-controlled'],
  ['Company', 'AIONTEC’s roadmap for cognitive AI systems']
]

const roadmap = [
  ['Phase 1', 'RIA web prototype', 'Premium website, interactive demo, product architecture, and funding page.'],
  ['Phase 2', 'Memory and journal backend', 'Persistent memory vault, auto-journal engine, identity file, and data controls.'],
  ['Phase 3', 'Reflection intelligence', 'Belief classification, pattern detection, emotional trend reports, and insight generation.'],
  ['Phase 4', 'Voice and calm mode', 'Voice interaction, affirmations, breathing, and guided emotional recovery.']
]

const replies = {
  memory: 'Memory saved locally for this demo.',
  journal: 'Journal note created.',
  belief: 'Belief pattern marked.',
  emotion: 'Emotion noted.',
  calm: 'Breathe in. Hold. Breathe out.',
  funding: 'Funding supports the prototype.'
}

function getRiaReply(text) {
  const clean = text.toLowerCase()
  const key = Object.keys(replies).find((item) => clean.includes(item))
  if (key) return replies[key]
  if (clean.includes('hello') || clean.includes('hi')) return 'Hi. I am RIA.'
  if (clean.includes('help')) return 'Ask about memory, journal, belief, emotion, or calm.'
  if (clean.includes('who')) return 'RIA is your personal cognitive AI.'
  return 'Noted. I will remember this in the demo chat.'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1500px] px-5 sm:px-8 xl:px-10 ${className}`}>{children}</div>
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05030d]/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={images.logo} alt="" className="h-7 w-7 rounded-full object-cover invert grayscale" onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/20 bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.12)]">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-[-0.02em] text-white">RIA</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {nav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'text-white' : 'transition hover:text-white'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/download" className="hidden text-zinc-300 transition hover:text-white sm:inline">Download</Link>
          <Link to="/demo" className="rounded-full bg-gradient-to-r from-violet-300 to-cyan-200 px-4 py-2 font-semibold text-black shadow-[0_0_24px_rgba(103,232,249,0.18)] transition hover:brightness-110">Start RIA</Link>
        </div>
      </Container>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05030d]">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="mb-6 flex items-center gap-2 text-white">
            <BrainCircuit className="h-5 w-5 text-violet-300" />
            <span className="font-semibold">RIA</span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500">Personal cognitive intelligence for memory continuity, reflection, emotional awareness, and growth.</p>
        </div>
        {[
          ['Research', ['Memory continuity', 'Reflection engine', 'Belief classification', 'Emotional AI']],
          ['Product', ['Explore RIA', 'Demo', 'Memory system', 'Calm mode']],
          ['Company', ['About', 'Roadmap', 'Vision', 'Contact']],
          ['Support', ['Funding', 'Partner', 'Privacy', 'Terms']]
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
        <p>RIA by AIONTEC © 2026</p>
        <div className="flex gap-4">
          <Github className="h-4 w-4" />
          <Mail className="h-4 w-4" />
          <Layers3 className="h-4 w-4" />
        </div>
      </Container>
    </footer>
  )
}

function HeroSearch() {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const clean = value.trim()
        window.location.href = clean ? `/demo?message=${encodeURIComponent(clean)}` : '/demo'
      }}
      className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-left shadow-2xl shadow-violet-950/30 backdrop-blur-xl"
    >
      <Search className="h-5 w-5 text-zinc-500" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask RIA about your memory, journal, or emotions"
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      />
      <button className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 text-black" aria-label="Ask RIA">
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function Home() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#05030d] pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(139,92,246,0.24),transparent_32%),radial-gradient(circle_at_72%_40%,rgba(34,211,238,0.13),transparent_28%),linear-gradient(180deg,rgba(5,3,13,0),#05030d_92%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />
        <Container className="relative flex min-h-[calc(100vh-7rem)] flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-5xl text-center">
            <p className="mb-7 inline-flex rounded-full border border-white/16 bg-white/[0.07] px-7 py-3 text-base font-semibold tracking-[-0.02em] text-white shadow-[0_0_34px_rgba(139,92,246,0.18)]">RIA</p>
            <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Personal cognitive <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">intelligence</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              RIA is a persistent digital second brain that remembers, reflects, journals, tracks emotion, classifies beliefs, and grows with you over time.
            </p>
            <HeroSearch />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Talk with RIA', 'Research', 'Memory', 'Download', 'Demo', 'Funding'].map((item) => (
                <Link key={item} to={item === 'Talk with RIA' ? '/demo' : item === 'Funding' ? '/funding' : item === 'Download' ? '/download' : `/${item.toLowerCase()}`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white hover:text-white">
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
      <Featured />
      <ProductGrid />
      <EditorialSections />
    </>
  )
}

function Featured() {
  return (
    <section className="border-t border-white/10 bg-[#05030d] py-16 text-white">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((card, index) => (
            <Link key={card.title} to={card.to} className={index === 0 ? 'group lg:col-span-2' : 'group'}>
              <div className="aspect-[1.65/1] overflow-hidden bg-zinc-900">
                <CardImage type={card.type} />
              </div>
              <p className="mt-4 text-sm text-zinc-500">{card.type}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">{card.title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">{card.copy}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

function CardImage({ type }) {
  const key = type.toLowerCase()
  const src = images.cards[key] || images.cards.product
  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentByType[type] || accentByType.Product} opacity-80`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),transparent_24%),linear-gradient(135deg,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
      <img src={src} alt="" className="relative h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.style.display = 'none' }} />
    </div>
  )
}

function ProductGrid() {
  return (
    <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Explore RIA</h2>
            <p className="mt-3 max-w-2xl text-zinc-400">A full personal cognitive system in modular layers.</p>
          </div>
          <Link to="/product" className="hidden text-sm text-zinc-300 hover:text-white sm:block">View product</Link>
        </div>
        <div className="grid gap-px overflow-hidden bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {productCards.map(([title, Icon, copy]) => (
            <div key={title} className="bg-[#05030d] p-6 transition hover:bg-[#0d0820]">
              <Icon className="h-7 w-7 text-violet-200" />
              <h3 className="mt-16 text-2xl font-semibold tracking-[-0.045em] text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function EditorialSections() {
  return (
    <>
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-[-0.045em]">Recent updates</h2>
            <Link to="/research" className="text-sm text-zinc-400 hover:text-white">View all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {news.map(([type, title]) => (
              <Link key={title} to="/research" className="group">
                <div className="aspect-square bg-zinc-900">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_25%,rgba(139,92,246,0.42),transparent_26%),radial-gradient(circle_at_72%_70%,rgba(34,211,238,0.22),transparent_28%),linear-gradient(135deg,#171124,#050505)] transition group-hover:opacity-80" />
                </div>
                <p className="mt-4 text-sm text-zinc-500">{type}</p>
                <h3 className="mt-1 text-lg font-semibold leading-6 text-white">{title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-white/10 bg-white py-20 text-black">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <h2 className="text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl">Get started with RIA</h2>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-700">Start with the demo, explore the product architecture, or support the build through the funding page.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/download" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white">Download RIA</Link>
                <Link to="/demo" className="rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black">Try demo</Link>
                <Link to="/funding" className="rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black">Support RIA</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function PageHero({ title, copy, label }) {
  return (
    <section className="bg-[#05030d] pt-32 text-white">
      <Container className="pb-20">
        <p className="text-sm text-zinc-500">{label}</p>
        <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">{copy}</p>
      </Container>
    </section>
  )
}

function Research() {
  return (
    <>
      <PageHero label="Research" title="Researching memory continuity for personal AI" copy="RIA explores how memory, reflection, emotional tracking, and belief classification can create a more useful personal cognitive system." />
      <ProductGrid />
    </>
  )
}

function Product() {
  return (
    <>
      <PageHero label="Product" title="RIA is a digital second brain" copy="A personal AI companion that remembers, reflects, journals, understands emotion, and helps the user grow over time." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <Dashboard />
        </Container>
      </section>
    </>
  )
}

function Dashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="border border-white/10 bg-[#0a0714] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Current mood', 'Calm', HeartPulse],
            ['Memory status', 'Linked', Database],
            ['Journal summary', 'Ready', BookOpen],
            ['Belief insight', '3 growth beliefs', Fingerprint]
          ].map(([label, value, Icon]) => (
            <div key={label} className="border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-5 w-5" />
              <p className="mt-8 text-sm text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
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
    <div className="border border-white/10 bg-[#0a0714]">
      <div className="border-b border-white/10 p-5">
        <p className="font-semibold">Chat with RIA</p>
      </div>
      <div className="space-y-4 p-5">
        <div className="ml-auto max-w-[82%] rounded-xl bg-white p-4 text-sm text-black">I felt overwhelmed today.</div>
        <div className="max-w-[82%] rounded-xl bg-white/[0.08] p-4 text-sm leading-6 text-zinc-200">Let’s understand what triggered it. You had a lot on your plate today.</div>
        <div className="ml-auto max-w-[82%] rounded-xl bg-white p-4 text-sm text-black">Thanks RIA.</div>
      </div>
    </div>
  )
}

function Safety() {
  return (
    <>
      <PageHero label="Safety" title="Personal AI requires personal control" copy="RIA is designed around visible memory, editable data, privacy boundaries, and honest communication about what the system can and cannot do." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Editable memory', Database],
              ['Private by default', LockKeyhole],
              ['No false consciousness', ShieldCheck],
              ['User-owned data', Check]
            ].map(([title, Icon]) => (
              <div key={title} className="bg-[#05030d] p-7">
                <Icon className="h-7 w-7" />
                <h3 className="mt-16 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
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
      <PageHero label="Roadmap" title="RIA is becoming a personal cognitive operating system" copy="The roadmap focuses on turning RIA from a concept website into a real product with memory, journaling, reflection, emotional intelligence, voice, calm mode, privacy, and funding support." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="grid gap-5 lg:grid-cols-4">
            {roadmap.map(([phase, title, copy]) => (
              <div key={phase} className="border border-white/10 bg-[#0a0714] p-7">
                <p className="text-sm text-zinc-500">{phase}</p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="bg-white p-8 text-black">
              <p className="text-sm text-zinc-500">Vision</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em]">A private AI that helps people understand themselves.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">RIA is not a generic assistant. It is built for personal continuity: memory, emotion, reflection, journaling, and self-growth in one trusted system.</p>
            </div>
            <div className="border border-white/10 bg-[#0a0714] p-8">
              <Target className="h-8 w-8" />
              <h3 className="mt-10 text-3xl font-semibold tracking-[-0.05em]">What success looks like</h3>
              <p className="mt-5 leading-7 text-zinc-400">A working RIA prototype users can talk to every day, with persistent memory, visible emotional trends, journal summaries, and user-owned data controls.</p>
              <Link to="/funding" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Support RIA</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function Funding() {
  return (
    <>
      <PageHero label="Funding" title="Help build the first RIA prototype" copy="RIA needs funding to move from concept to functional product: memory backend, model API, journaling engine, emotional dashboard, voice, privacy controls, and launch materials." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-white p-8 text-black">
              <Banknote className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Founder contact</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.06em]">Invest in the first RIA prototype</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-700">For funding, partnership, or investor conversations, contact Sudeep Bala directly.</p>
              <a href="mailto:balasudeep22@gmail.com?subject=Funding%20RIA" className="mt-8 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white">Email Sudeep</a>
            </div>
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {['Model/API integration', 'Memory vault', 'Journal engine', 'Emotion dashboard', 'Voice layer', 'Privacy controls'].map((item) => (
                <div key={item} className="bg-[#05030d] p-6">
                  <Check className="h-5 w-5" />
                  <p className="mt-10 text-xl font-semibold tracking-[-0.03em]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="border border-white/10 bg-[#0a0714] p-8">
              <Mail className="h-7 w-7 text-cyan-200" />
              <p className="mt-8 text-sm text-zinc-500">Investor contact</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white">Contact the founder directly</h2>
              <div className="mt-8 grid gap-3 text-sm">
                <ContactRow label="Founder" value={contactDetails.founderName} />
                <ContactRow label="Company" value={contactDetails.companyName} />
                <ContactRow label="Location" value={contactDetails.location} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${contactDetails.email}?subject=RIA%20Investment%20or%20Partnership`} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Email founder</a>
                <a href={contactDetails.whatsappLink} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white hover:border-white">WhatsApp founder</a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function Download() {
  return (
    <>
      <PageHero label="Download" title="Download RIA" copy="RIA is currently in prototype development. This page is ready for the first public installer, early access build, or waitlist release." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-white p-8 text-black">
              <Sparkles className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Early access</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-[-0.06em]">RIA is preparing for release.</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-700">Until the app installer is ready, investors and early users can contact Sudeep Bala for prototype access.</p>
              <a href="mailto:balasudeep22@gmail.com?subject=RIA%20Early%20Access" className="mt-8 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white">Request early access</a>
            </div>
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {[
                ['Windows', 'Coming soon', '/downloads/ria-windows.exe'],
                ['macOS', 'Coming soon', '/downloads/ria-mac.dmg'],
                ['Linux', 'Coming soon', '/downloads/ria-linux.AppImage'],
                ['Android', 'Coming soon', '/downloads/ria-android.apk']
              ].map(([platform, status, href]) => (
                <div key={platform} className="bg-[#05030d] p-7">
                  <p className="text-sm text-zinc-500">{platform}</p>
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">{status}</h3>
                  <a href={href} className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white">Installer placeholder</a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
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
  const [messages, setMessages] = useState([{ role: 'ria', text: 'RIA online. Ask about memory, journal, belief, emotion, or calm mode.' }])
  const [input, setInput] = useState('')
  const loadedUrlMessage = useRef(false)
  const send = (value = input) => {
    const clean = value.trim()
    if (!clean) return
    setMessages((current) => [...current, { role: 'user', text: clean }, { role: 'ria', text: getRiaReply(clean) }])
    setInput('')
  }

  useEffect(() => {
    if (loadedUrlMessage.current) return
    loadedUrlMessage.current = true
    const params = new URLSearchParams(window.location.search)
    const message = params.get('message')
    if (message) {
      send(message)
      window.history.replaceState({}, '', '/demo')
    }
  }, [])

  return (
    <>
      <PageHero label="Demo" title="Talk with RIA" copy="A mock interface showing how RIA can respond through memory, reflection, journaling, emotion, and calm guidance." />
      <section className="border-t border-white/10 bg-[#05030d] py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl border border-white/10 bg-[#0a0714]">
            <div className="border-b border-white/10 p-5">
              <p className="font-semibold">RIA Cognitive Chat</p>
            </div>
            <div className="h-[430px] space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[86%] rounded-xl px-5 py-4 text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-white text-black' : 'bg-white/[0.08] text-zinc-200'}`}>
                  {message.text}
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 p-5 pb-0">
              {['memory system', 'auto journal', 'belief classifier', 'emotion tracking', 'calm mode'].map((prompt) => (
                <button key={prompt} onClick={() => send(prompt)} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:text-white">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); send() }} className="flex gap-3 p-5">
              <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 rounded-full bg-[#1f1f1f] px-5 py-3 text-white outline-none placeholder:text-zinc-500" placeholder="Message RIA..." />
              <button className="grid h-12 w-12 place-items-center rounded-full bg-white text-black" aria-label="Send">
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
    <main className="min-h-screen bg-[#05030d] text-white">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/product" element={<Product />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/roadmap" element={<Company />} />
        <Route path="/company" element={<Company />} />
        <Route path="/download" element={<Download />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/memory" element={<Research />} />
      </Routes>
      <Footer />
    </main>
  )
}

