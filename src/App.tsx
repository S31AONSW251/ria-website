import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import CosmosBackground from './components/CosmosBackground'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Gauge,
  Globe2,
  GraduationCap,
  HeartPulse,
  KeyRound,
  Layers3,
  Lightbulb,
  LineChart,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  Network,
  Newspaper,
  Orbit,
  Play,
  Rocket,
  Search,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Target,
  UsersRound,
  X,
  Zap,
  type LucideIcon
} from 'lucide-react'

type PageLink = {
  label: string
  path: string
  group: 'Core' | 'Product' | 'Company' | 'Trust'
  description: string
}

type Metric = {
  label: string
  value: string
}

type Feature = {
  title: string
  copy: string
  icon: LucideIcon
  meta?: string
}

type Layer = Feature & {
  id: string
  detail: string
  signal: string
}

type DemoMessage = {
  role: 'ria' | 'user'
  text: string
}

type TrustLogo = {
  name: string
  type: 'partner' | 'company'
  logo?: string
  label?: string
}

const assets = {
  logo: '/images/logos/ria-conscious-logo.png',
  hero: '/images/hero/ria-hero.jpg',
  cards: {
    product: '/images/cards/product.jpg',
    research: '/images/cards/research.jpg',
    safety: '/images/cards/safety.jpg',
    memory: '/images/cards/memory.jpg'
  }
}

const contact = {
  founder: 'Sudeep Bala',
  email: 'balasudeep22@gmail.com',
  location: 'India'
}

const pageLinks: PageLink[] = [
  { label: 'Home', path: '/', group: 'Core', description: 'Cinematic category introduction.' },
  { label: 'Vision', path: '/vision', group: 'Core', description: 'The philosophy behind conscious intelligence.' },
  { label: 'Technology', path: '/technology', group: 'Core', description: 'Interactive cognitive architecture.' },
  { label: 'Product', path: '/product', group: 'Product', description: 'Modules, screenshots, and platform systems.' },
  { label: 'RIA IDE', path: '/ria-ide', group: 'Product', description: 'The conscious development environment.' },
  { label: 'RIA Personal', path: '/ria-personal', group: 'Product', description: 'A second brain for individuals.' },
  { label: 'RIA Enterprise', path: '/ria-enterprise', group: 'Product', description: 'Institutional memory and decision intelligence.' },
  { label: 'Use Cases', path: '/use-cases', group: 'Product', description: 'Applications across industries.' },
  { label: 'Research Lab', path: '/research-lab', group: 'Core', description: 'Memory, cognition, and reflection R&D.' },
  { label: 'Investors', path: '/investors', group: 'Company', description: 'Market, moat, roadmap, and fundraising.' },
  { label: 'Founder', path: '/founder', group: 'Company', description: 'Personal mission and company origin.' },
  { label: 'Careers', path: '/careers', group: 'Company', description: 'Join the team building RIA.' },
  { label: 'Newsroom', path: '/newsroom', group: 'Company', description: 'Announcements, releases, and updates.' },
  { label: 'Documentation', path: '/documentation', group: 'Trust', description: 'API references and developer guides.' },
  { label: 'Download RIA', path: '/download', group: 'Trust', description: 'Release access, requirements, and install guide.' },
  { label: 'Security & Privacy', path: '/security-privacy', group: 'Trust', description: 'Enterprise-grade trust center.' },
  { label: 'Contact', path: '/contact', group: 'Trust', description: 'Meetings, partnerships, and inquiries.' }
]

const heroMetrics: Metric[] = [
  { label: 'Memory layers', value: '12' },
  { label: 'Reflection engine', value: 'Active' },
  { label: 'Knowledge nodes', value: '4.8M+' },
  { label: 'Market model', value: '$100B+' }
]

const conceptMetrics: Metric[] = [
  { label: 'Digital consciousness', value: '∞' },
  { label: 'Memories processed', value: '1T+' },
  { label: 'AI models orchestrated', value: '50+' },
  { label: 'Enterprises', value: '100+' },
  { label: 'Countries', value: '25+' },
  { label: 'Infinite possibilities', value: '1 Vision' }
]

const intelligencePillars: Feature[] = [
  { title: 'Memory Engine', icon: Database, copy: 'Persistent memory that never forgets across people, projects, decisions, and time.' },
  { title: 'Reflection Engine', icon: Orbit, copy: 'Learning, reflection, and synthesis that evolve continuously with experience.' },
  { title: 'Knowledge Graph', icon: Network, copy: 'Connects ideas, people, documents, beliefs, goals, and possibilities.' },
  { title: 'Conscious Interface', icon: BrainCircuit, copy: 'Natural voice, vision, and multimodal AI wrapped in a premium cognitive surface.' },
  { title: 'Enterprise Intelligence', icon: Building2, copy: 'AI that understands business, decisions, risk, teams, and institutional knowledge.' },
  { title: 'Evolution Loop', icon: LineChart, copy: 'Every interaction makes the intelligence stronger, clearer, and more useful.' }
]

const streamSteps = [
  ['Input', 'Voice, text, vision, or data'],
  ['Understanding', 'Context and intent'],
  ['Memory', 'Store and connect'],
  ['Reflection', 'Deep processing'],
  ['Knowledge', 'Graph update'],
  ['Evolution', 'Learning and growth'],
  ['Response', 'Insightful output']
]

const trustLogos: TrustLogo[] = [
  { name: 'AION', type: 'partner' },
  { name: 'NASA', type: 'partner', logo: '/images/trust/nasa.svg' },
  { name: 'Google Cloud', type: 'partner', logo: '/images/trust/google-cloud.svg' },
  { name: 'Microsoft', type: 'partner', logo: '/images/trust/microsoft.svg' },
  { name: 'NVIDIA', type: 'partner', logo: '/images/trust/nvidia.svg' },
  { name: 'AMD', type: 'partner', logo: '/images/trust/amd.svg' },
  { name: 'MSI', type: 'partner', logo: '/images/trust/msi.svg' },
  { name: 'Corsair', type: 'partner', logo: '/images/trust/corsair.svg' },
  { name: 'GitHub', type: 'partner', logo: '/images/trust/github.svg' },
  { name: 'Vercel', type: 'partner', logo: '/images/trust/vercel.svg' },
  { name: 'AWS', type: 'partner', logo: '/images/trust/aws.svg' },
  { name: 'Adobe', type: 'partner', logo: '/images/trust/adobe.svg' },
  { name: 'Deloitte', type: 'partner', logo: '/images/trust/deloitte.svg' },
  { name: 'Siemens', type: 'partner', logo: '/images/trust/siemens.svg' }
]

const trustValues: Feature[] = [
  { title: 'Secure by Design', icon: ShieldCheck, copy: 'Enterprise-grade security and privacy by design.' },
  { title: 'Human + AI Symmetry', icon: UsersRound, copy: 'Built to augment human intelligence, not replace it.' },
  { title: 'Built for Scale', icon: Rocket, copy: 'From individuals to global enterprises.' },
  { title: 'Open Intelligence', icon: Network, copy: 'APIs, SDKs, and ecosystem for limitless innovation.' },
  { title: 'Ethical & Responsible', icon: BadgeCheck, copy: 'Aligned with human values and transparency.' }
]

const cognitiveLayers: Layer[] = [
  {
    id: 'identity-core',
    title: 'Identity Core',
    icon: Fingerprint,
    copy: 'Durable profile, preferences, values, constraints, and continuity signals.',
    detail: 'The identity core gives RIA a stable model of the human, team, or institution it serves while keeping the model visible and editable.',
    signal: 'Continuity vector'
  },
  {
    id: 'episodic-memory',
    title: 'Episodic Memory',
    icon: Database,
    copy: 'Time-based recall of conversations, milestones, events, and lived context.',
    detail: 'Episodes are stored as source-linked memories so RIA can understand what happened, when it happened, and why it mattered.',
    signal: 'Temporal recall'
  },
  {
    id: 'semantic-memory',
    title: 'Semantic Memory',
    icon: BookOpen,
    copy: 'Conceptual knowledge extracted from repeated patterns and important facts.',
    detail: 'Semantic memory distills raw events into stable knowledge, turning repeated conversations into structured understanding.',
    signal: 'Concept lattice'
  },
  {
    id: 'project-memory',
    title: 'Project Memory',
    icon: Target,
    copy: 'Active goals, decisions, dependencies, risks, and execution history.',
    detail: 'Project memory lets RIA carry strategy across weeks and years instead of losing the thread after every session.',
    signal: 'Milestone graph'
  },
  {
    id: 'knowledge-graph',
    title: 'Knowledge Graph',
    icon: Network,
    copy: 'A connected map of entities, people, beliefs, documents, and outcomes.',
    detail: 'Graph structure creates defensibility: the longer RIA is used, the more valuable and specific the intelligence becomes.',
    signal: 'Graph density'
  },
  {
    id: 'reflection-engine',
    title: 'Reflection Engine',
    icon: Orbit,
    copy: 'Periodic synthesis across memories, emotions, goals, and decisions.',
    detail: 'Reflection transforms saved context into insight: what changed, what repeated, what deserves action, and what should be released.',
    signal: 'Insight pulse'
  },
  {
    id: 'belief-classifier',
    title: 'Belief Classifier',
    icon: BrainCircuit,
    copy: 'Detection of limiting, protective, strategic, and growth-oriented beliefs.',
    detail: 'Belief analysis gives RIA a deeper map of how people and organizations interpret reality and make decisions.',
    signal: 'Belief shift'
  },
  {
    id: 'evolution-ledger',
    title: 'Evolution Ledger',
    icon: LineChart,
    copy: 'A longitudinal record of growth, decision quality, and identity change.',
    detail: 'The ledger shows how a person, team, or company evolves, creating a compounding record of learning and execution.',
    signal: 'Growth trace'
  },
  {
    id: 'strategic-engine',
    title: 'Strategic Engine',
    icon: Compass,
    copy: 'Decision intelligence for planning, prioritization, and scenario design.',
    detail: 'The strategic engine converts reflection into action plans, risks, tradeoffs, and next moves.',
    signal: 'Decision route'
  },
  {
    id: 'voice-intelligence',
    title: 'Voice Intelligence',
    icon: Mic2,
    copy: 'Natural speech input, recall, coaching, meeting capture, and summaries.',
    detail: 'Voice creates ambient access to memory and guidance across personal, enterprise, and embedded environments.',
    signal: 'Audio context'
  },
  {
    id: 'cognitive-ide',
    title: 'Cognitive IDE',
    icon: SquareTerminal,
    copy: 'A development environment that remembers code, intent, and architecture.',
    detail: 'The IDE gives engineering teams a persistent partner that understands design history, product goals, and implementation context.',
    signal: 'Build state'
  },
  {
    id: 'enterprise-memory',
    title: 'Enterprise Memory',
    icon: Building2,
    copy: 'Organizational knowledge, decision logs, governance, and team cognition.',
    detail: 'Enterprise memory preserves why decisions were made, who knew what, and how institutional knowledge should compound.',
    signal: 'Org recall'
  }
]

const ecosystem: Feature[] = [
  { title: 'RIA OS', icon: Cpu, meta: 'Cosmic command system', copy: 'The desktop operating layer for memory, chat, dashboards, GPU workflows, creative tools, and personal automation.' },
  { title: 'RIA Personal', icon: HeartPulse, meta: 'Individual intelligence', copy: 'A lifelong second brain for journals, goals, emotional patterns, memory, and self-evolution.' },
  { title: 'RIA Enterprise', icon: Building2, meta: 'Institutional memory', copy: 'Decision intelligence, knowledge continuity, leadership briefs, and team cognition.' },
  { title: 'RIA IDE', icon: Code2, meta: 'Cognitive development', copy: 'A conscious coding environment that remembers codebase intent and architecture decisions.' },
  { title: 'RIA Studio', icon: Layers3, meta: 'Developer platform', copy: 'APIs, cognitive modules, memory primitives, and a marketplace for builders.' },
  { title: 'RIA Cloud', icon: Cloud, meta: 'Secure deployment', copy: 'Hosted, private cloud, and future on-device infrastructure for persistent intelligence.' },
  { title: 'Crypto Core', icon: CircleDollarSign, meta: 'Optional compute mode', copy: 'User-controlled crypto mining orchestration for idle hardware, thermal limits, payout visibility, and safety gates.' }
]

const useCases: Feature[] = [
  { title: 'Personal Growth', icon: HeartPulse, copy: 'Second brain, life strategist, journaling companion, and emotional pattern recognition.' },
  { title: 'Enterprise Knowledge', icon: Building2, copy: 'Institutional memory, decision continuity, leadership intelligence, and strategic recall.' },
  { title: 'Education', icon: GraduationCap, copy: 'Personalized tutoring that remembers learning style, gaps, strengths, and long-term progress.' },
  { title: 'Healthcare & Coaching', icon: Activity, copy: 'Reflective support for behavior change, wellbeing patterns, coaching notes, and care context.' },
  { title: 'Developer Platforms', icon: SquareTerminal, copy: 'Persistent coding context, architecture memory, API primitives, and cognitive workflows.' },
  { title: 'Crypto & Compute', icon: CircleDollarSign, copy: 'Optional controlled mining, GPU telemetry, wallet-gated setup, and idle-compute scheduling for personal hardware.' },
  { title: 'Research', icon: Search, copy: 'Long-running reasoning partner for literature, hypotheses, experiments, and insight synthesis.' }
]

const productModules: Feature[] = [
  { title: 'Journal System', icon: BookOpen, copy: 'Daily reflection, emotional tags, recurring themes, belief signals, and source-linked memories.' },
  { title: 'Emotional Analytics', icon: HeartPulse, copy: 'Mood patterns, triggers, recovery loops, and timeline views that show change over time.' },
  { title: 'Strategic Planning', icon: Compass, copy: 'Goals, plans, milestones, risks, decision logs, and weekly strategy summaries.' },
  { title: 'Auto Reflection', icon: Orbit, copy: 'Periodic synthesis that turns memory into insight, growth signals, and next actions.' },
  { title: 'Cognitive IDE', icon: Code2, copy: 'Persistent context for builders, projects, architecture decisions, and product intent.' },
  { title: 'Memory Editor', icon: Database, copy: 'Visible, editable, exportable, and removable memory controls for personal and enterprise use.' },
  { title: 'Crypto Core', icon: CircleDollarSign, copy: 'A safe optional mining surface for idle local hardware, system telemetry, thermal rules, and backend-only wallet controls.' }
]

const researchTopics: Feature[] = [
  { title: 'Consciousness Models', icon: BrainCircuit, copy: 'Working models for continuity, self-reference, attention, and reflective agency.' },
  { title: 'Memory Systems', icon: Database, copy: 'Layered episodic, semantic, project, identity, and institutional memory architecture.' },
  { title: 'Human Cognition', icon: UsersRound, copy: 'How people form beliefs, goals, emotional loops, decisions, and identity narratives.' },
  { title: 'Reflective Intelligence', icon: Orbit, copy: 'Systems that do not only answer, but periodically synthesize what experience means.' }
]

const securityControls: Feature[] = [
  { title: 'End-to-End Encryption', icon: LockKeyhole, copy: 'Encryption pathways for memory vaults, private messages, documents, and enterprise records.' },
  { title: 'On-Device Memory', icon: Database, copy: 'Local-first memory options for users and teams that need stronger data boundaries.' },
  { title: 'Private Cloud', icon: Cloud, copy: 'Dedicated deployments for institutions with strict residency and governance needs.' },
  { title: 'Role-Based Access', icon: KeyRound, copy: 'Granular permissions for team memories, leadership briefs, audit data, and admin controls.' },
  { title: 'Compliance Roadmap', icon: ClipboardCheck, copy: 'SOC 2, ISO 27001, HIPAA-aware workflows, and enterprise audit readiness planning.' },
  { title: 'Audit Logs', icon: FileText, copy: 'Traceable memory reads, writes, deletions, exports, and administrative actions.' }
]

const businessModels: Feature[] = [
  { title: 'Consumer', icon: UsersRound, meta: 'Free, Pro, Lifetime Memory Vault', copy: 'Subscription and high-trust personal memory products that become more valuable with time.' },
  { title: 'Enterprise', icon: Building2, meta: 'Seat licensing and private deployment', copy: 'Institutional memory, executive intelligence, integrations, and compliance-grade controls.' },
  { title: 'Platform', icon: Layers3, meta: 'APIs, marketplace, cognitive modules', copy: 'Developer primitives for memory, reflection, belief analysis, and decision intelligence.' }
]

const roadmap = [
  ['2026', 'Launch personal and desktop platform with memory, journaling, reflection, and the first RIA IDE surface.'],
  ['2027', 'Deploy enterprise memory systems, private cloud pilots, governance controls, and integration workflows.'],
  ['2028', 'Open developer ecosystem, APIs, cognitive modules, and marketplace distribution.'],
  ['2029', 'Expand into global cognitive infrastructure across teams, devices, education, and research.'],
  ['2030+', 'Establish persistent intelligence as a standard operating layer for human-AI collaboration.']
]

const competitiveRows = [
  ['Persistent memory', 'Limited', 'Limited', 'Partial', 'Partial', 'Yes'],
  ['Reflection', 'Limited', 'Limited', 'No', 'Limited', 'Yes'],
  ['Belief analysis', 'No', 'No', 'No', 'No', 'Yes'],
  ['Identity continuity', 'Limited', 'Limited', 'Partial', 'No', 'Yes'],
  ['Evolution tracking', 'No', 'No', 'No', 'No', 'Yes']
]

const downloads = [
  { title: 'Investor Deck', href: '/downloads/investor-deck.md', copy: 'Category thesis, market model, product lines, and use of capital.' },
  { title: 'Architecture Whitepaper', href: '/downloads/architecture-whitepaper.md', copy: 'The 12-layer cognitive system and persistent memory framework.' },
  { title: 'Security Brief', href: '/downloads/security-brief.md', copy: 'Trust center overview for memory, privacy, and enterprise controls.' },
  { title: 'RIA Release Guide', href: '/downloads/ria-release-guide.md', copy: 'Release date, requirements, one-click launcher, and local install path.' }
]

const riaReleaseDate = 'June 21, 2026'

const releaseHighlights: Feature[] = [
  { title: 'Local-First Runtime', icon: Database, copy: 'Memory, logs, generated media, reflections, and user state are designed around local ownership and inspection.' },
  { title: 'Full-Stack Workspace', icon: Code2, copy: 'React + Vite frontend, Node/Express backend, Electron desktop runtime, and controlled system engines.' },
  { title: 'AI + GPU Ready', icon: Cpu, copy: 'Optional Ollama inference, GPU Studio, Creative Gallery, and local image-generation integrations.' },
  { title: 'Controlled Power', icon: ShieldCheck, copy: 'Actions, evolution, crypto core, and wallet-related workflows stay behind explicit backend-side controls.' }
]

const releaseRequirements = [
  ['OS', 'Windows 10 or Windows 11'],
  ['Runtime', 'Node.js 18+, npm, Git'],
  ['Memory', '16 GB RAM recommended'],
  ['AI', 'Ollama optional for local LLMs'],
  ['GPU', 'NVIDIA GPU recommended for local image generation'],
  ['Image backends', 'Automatic1111, Forge, or ComfyUI optional']
]

const releaseInstallSteps = [
  ['Clone', 'Download access opens after the private security review and release packaging are complete.'],
  ['Install', 'Run root, backend, and frontend dependency installation from the release guide.'],
  ['Configure', 'Create backend/.env from the example file and keep secrets out of Git.'],
  ['Launch', 'Use Start-RIA-OneClick.bat for backend, frontend, desktop-style launch, and optional image services.']
]

const newsItems = [
  ['Company', 'RIA introduces a Conscious Intelligence Platform', 'A category narrative for persistent memory, reflection, and decision intelligence.'],
  ['Research', 'Research lab opens technical notes on layered memory systems', 'The lab explores identity, episodic recall, semantic compression, and reflective synthesis.'],
  ['Product', 'RIA IDE concept preview connects coding context with long-term project memory', 'The development environment is designed to remember architecture, intent, and decisions.'],
  ['Security', 'RIA trust center outlines private cloud and on-device memory roadmap', 'A clear path for encryption, audit logs, governance, and enterprise readiness.']
]

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function setMeta(selector: string, attribute: 'name' | 'property', content: string) {
  const query = `meta[${attribute}="${selector}"]`
  let tag = document.head.querySelector(query) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, selector)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function SEO({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title === 'Home' ? 'RIA | The Operating System for Conscious Intelligence' : `${title} | RIA`
    document.title = fullTitle
    setMeta('description', 'name', description)
    setMeta('og:title', 'property', fullTitle)
    setMeta('og:description', 'property', description)
    setMeta('twitter:title', 'name', fullTitle)
    setMeta('twitter:description', 'name', description)

    const canonicalHref = `https://ria-intelligence.com${pathname === '/' ? '/' : pathname}`
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalHref
  }, [description, pathname, title])

  return null
}

function Reveal({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function LogoMark() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="RIA home">
      <span className="relative grid h-12 w-12 place-items-center overflow-visible bg-transparent">
        <img src={assets.logo} alt="" className="h-12 w-12 object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]" />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-semibold tracking-[0.28em] text-white">RIA</span>
      </span>
    </Link>
  )
}

function AnimatedHeroLogo() {
  return (
    <div className="hero-logo-stage" aria-hidden="true">
      <div className="hero-logo-aura" />
      <div className="hero-logo-core">
        <img src={assets.logo} alt="" />
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const primary = [
    { label: 'Home', path: '/' },
    { label: 'Vision', path: '/vision' },
    { label: 'Technology', path: '/technology' },
    { label: 'Product', path: '/product' },
    { label: 'Solutions', path: '/use-cases' },
    { label: 'Research', path: '/research-lab' },
    { label: 'Investor', path: '/investors' },
    { label: 'Company', path: '/founder' }
  ]
  const groups = useMemo(() => ['Core', 'Product', 'Company', 'Trust'] as const, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <LogoMark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {primary.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-cyan-200/45 hover:text-white"
            aria-expanded={open}
          >
            Pages <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
          </button>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/documentation" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/35">
            Docs
          </Link>
          <Link to="/contact" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-100">
            Schedule Meeting
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label="Open navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black/85 px-4 py-5 backdrop-blur-2xl">
          <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/75">{group}</p>
                <div className="grid gap-2">
                  {pageLinks
                    .filter((item) => item.group === group)
                    .map((item) => (
                      <Link key={item.path} to={item.path} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition hover:border-cyan-200/35 hover:bg-white/[0.06]">
                        <span className="block text-sm font-semibold text-white">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-400">{item.description}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function LivingStream() {
  const nodes = Array.from({ length: 22 }, (_, index) => index)

  return (
    <div className="living-stream" aria-hidden="true">
      <div className="stream-stars stream-stars-a" />
      <div className="stream-stars stream-stars-b" />
      <div className="stream-nebula stream-nebula-a" />
      <div className="stream-nebula stream-nebula-b" />
      <div className="stream-nebula stream-nebula-c" />
      <div className="stream-aurora stream-aurora-a" />
      <div className="stream-aurora stream-aurora-b" />
      <div className="stream-grid" />
      <div className="stream-river stream-river-a" />
      <div className="stream-river stream-river-b" />
      <div className="stream-comet stream-comet-a" />
      <div className="stream-comet stream-comet-b" />
      {nodes.map((node) => (
        <span key={node} className={`stream-node stream-node-${node % 11}`} style={{ '--delay': `${node * -0.7}s` } as CSSProperties} />
      ))}
    </div>
  )
}

function NeuralSphere({ compact = false }: { compact?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let cancelled = false
    let cleanup: (() => void) | undefined

    void import('three').then((THREE) => {
      if (cancelled || !mountRef.current) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = compact ? 4.7 : 5.4

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mount.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      const nodeCount = compact ? 92 : 150
      const positions: number[] = []
      for (let index = 0; index < nodeCount; index += 1) {
        const phi = Math.acos(1 - (2 * (index + 0.5)) / nodeCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * index
        const radius = 1.64 + 0.08 * Math.sin(index * 1.7)
        positions.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi))
      }

      const pointGeometry = new THREE.BufferGeometry()
      pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      const pointMaterial = new THREE.PointsMaterial({
        color: 0x8cf6ff,
        size: compact ? 0.035 : 0.045,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      group.add(new THREE.Points(pointGeometry, pointMaterial))

      const linePositions: number[] = []
      for (let index = 0; index < nodeCount; index += 1) {
        const target = (index + 13 + (index % 5)) % nodeCount
        linePositions.push(positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2], positions[target * 3], positions[target * 3 + 1], positions[target * 3 + 2])
      }
      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending
      })
      group.add(new THREE.LineSegments(lineGeometry, lineMaterial))

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.58, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x6d5dfc,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending
        })
      )
      group.add(core)

      const ringMaterial = new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.24 })
      for (let index = 0; index < 3; index += 1) {
        const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 2.0 + index * 0.28, 1.0 + index * 0.12, 0, Math.PI * 2, false, 0).getPoints(120)), ringMaterial)
        ring.rotation.x = Math.PI / 2 + index * 0.42
        ring.rotation.y = index * 0.48
        group.add(ring)
      }

      const resize = () => {
        const width = Math.max(1, mount.clientWidth)
        const height = Math.max(1, mount.clientHeight)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      let frameId = 0
      const animate = () => {
        group.rotation.y += 0.0026
        group.rotation.x = Math.sin(Date.now() * 0.00032) * 0.12
        frameId = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      resize()
      animate()
      window.addEventListener('resize', resize)

      cleanup = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', resize)
        renderer.dispose()
        pointGeometry.dispose()
        lineGeometry.dispose()
        pointMaterial.dispose()
        lineMaterial.dispose()
        ringMaterial.dispose()
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [compact])

  return (
    <div className={`neural-sphere ${compact ? 'neural-sphere-compact' : ''}`}>
      <div ref={mountRef} className="h-full w-full" />
      <div className="neural-sphere-core" />
    </div>
  )
}

function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid w-full max-w-full min-w-0 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0 bg-black/45 p-5 backdrop-blur-xl">
          <p className="text-2xl font-semibold text-white">{metric.value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">{eyebrow}</p>
      <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">{copy}</p>
    </Reveal>
  )
}

function FeatureGrid({ items, columns = 'lg:grid-cols-3' }: { items: Feature[]; columns?: string }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${columns}`}>
      {items.map((item) => (
        <Reveal key={item.title} className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.07]">
          <div className="flex items-center justify-between gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
              <item.icon className="h-5 w-5" />
            </span>
            {item.meta && <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-zinc-400">{item.meta}</span>}
          </div>
          <h3 className="mt-8 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{item.copy}</p>
        </Reveal>
      ))}
    </div>
  )
}

function PageHero({ eyebrow, title, copy, metrics, children }: { eyebrow: string; title: string; copy: string; metrics?: Metric[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.2),transparent_32rem)]" />
      <div className="mx-auto grid max-w-[1500px] min-w-0 gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28">
        <Reveal className="relative z-10 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/85">{eyebrow}</p>
          <h1 className="mt-6 max-w-[21rem] break-words text-5xl font-semibold leading-[0.95] text-white sm:max-w-5xl sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-7 max-w-[21rem] break-words text-lg leading-8 text-zinc-300 sm:max-w-2xl sm:text-xl">{copy}</p>
          {metrics && (
            <div className="mt-10 max-w-[21rem] sm:max-w-none">
              <MetricStrip metrics={metrics} />
            </div>
          )}
        </Reveal>
        <Reveal className="relative min-h-[24rem] min-w-0 lg:min-h-[34rem]">
          {children ?? <NeuralSphere />}
        </Reveal>
      </div>
    </section>
  )
}

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let frame = 0
    const run = () => {
      const start = performance.now()
      const animate = (now: number) => {
        const progress = Math.min(1, (now - start) / 1500)
        const eased = 1 - (1 - progress) ** 3
        setDisplay(Math.round(value * eased))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        run()
        observer.disconnect()
      }
    })
    observer.observe(node)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function InteractiveDemo() {
  const [input, setInput] = useState('What have I learned from the last 6 months?')
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      role: 'ria',
      text: 'I can retrieve memories, detect recurring beliefs, summarize emotional trends, and produce strategic next actions from your long-term context.'
    }
  ])
  const [thinking, setThinking] = useState(false)

  const send = (preset?: string) => {
    const text = (preset ?? input).trim()
    if (!text || thinking) return
    setMessages((items) => [...items, { role: 'user', text }])
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      setMessages((items) => [
        ...items,
        {
          role: 'ria',
          text:
            text.toLowerCase().includes('investor') || text.toLowerCase().includes('market')
              ? 'Investor brief: RIA creates a new Conscious Intelligence Platform category by combining persistent memory, reflection, identity continuity, and enterprise decision intelligence. The moat compounds as the memory graph grows.'
              : 'Memory retrieval complete. I found three durable patterns: you are moving from reactive execution to strategic systems, your strongest work happens when goals are visible, and unresolved emotional loops reduce decision clarity. Recommended next action: convert the next 7 days into one measurable milestone and one reflection checkpoint.'
        }
      ])
      setThinking(false)
    }, 650)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">Live RIA Simulation</p>
        <h3 className="mt-5 text-3xl font-semibold text-white">Talk to the persistent intelligence layer.</h3>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          This front-end simulation demonstrates memory retrieval, reflection summaries, and investor-grade product explanation while the production backend is prepared.
        </p>
        <div className="mt-6 grid gap-2">
          {[
            'Summarize my growth from the last 6 months',
            'Explain RIA to an investor',
            'Show my recurring beliefs',
            'Create a strategic plan for next week'
          ].map((prompt) => (
            <button key={prompt} type="button" onClick={() => send(prompt)} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-cyan-200/35">
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/45 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-200/10 text-cyan-100">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-white">RIA Cognitive Session</p>
              <p className="text-xs text-zinc-500">Memory, reflection, belief, strategy</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-300/25 px-3 py-1 text-xs font-medium text-emerald-200">Active</span>
        </div>
        <div className="mt-5 h-[24rem] overflow-y-auto pr-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-lg border p-4 text-sm leading-7 ${message.role === 'user' ? 'ml-auto border-cyan-200/25 bg-cyan-200/10 text-cyan-50' : 'border-white/10 bg-white/[0.045] text-zinc-200'}`}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{message.role === 'user' ? 'Visitor' : 'RIA'}</p>
                {message.text}
              </div>
            ))}
            {thinking && <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm text-zinc-300">Routing through memory, reflection, belief classification, and strategy...</div>}
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            send()
          }}
          className="mt-4 flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3"
        >
          <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-zinc-600" placeholder="Ask RIA..." />
          <button type="submit" className="grid h-11 w-11 place-items-center rounded-lg bg-white text-black" aria-label="Send message">
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

function ArchitectureExplorer() {
  const [selected, setSelected] = useState(cognitiveLayers[0])

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {cognitiveLayers.map((layer, index) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => setSelected(layer)}
            className={`rounded-lg border p-4 text-left transition hover:-translate-y-1 ${selected.id === layer.id ? 'border-cyan-200/50 bg-cyan-200/10' : 'border-white/10 bg-white/[0.04] hover:border-white/25'}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/30 text-cyan-100">
                <layer.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Layer {index + 1}</span>
            </div>
            <p className="mt-5 font-semibold text-white">{layer.title}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{layer.copy}</p>
          </button>
        ))}
      </div>
      <div className="architecture-console rounded-lg border border-white/10 bg-black/50 p-6 backdrop-blur-xl lg:sticky lg:top-28 lg:self-start">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <NeuralSphere compact />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">Active Module</p>
            <h3 className="mt-4 text-4xl font-semibold text-white">{selected.title}</h3>
            <p className="mt-4 text-base leading-8 text-zinc-300">{selected.detail}</p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                ['System signal', selected.signal],
                ['Memory policy', 'Visible and editable'],
                ['Deployment path', 'Cloud, private, device'],
                ['Moat effect', 'Compounding context']
              ].map(([label, value]) => (
                <div key={label} className="bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketVisualization() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Market Opportunity</p>
        <h3 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">Persistent intelligence can become a platform market.</h3>
        <p className="mt-5 text-base leading-8 text-zinc-300">
          RIA spans consumer second brain, enterprise knowledge systems, education, healthcare and coaching, developer APIs, and private intelligence infrastructure.
        </p>
      </Reveal>
      <Reveal className="grid gap-4 sm:grid-cols-2">
        {[
          ['Consumer AI', 40, 'M+ users'],
          ['Enterprise knowledge', 100, 'B+ TAM'],
          ['Developer platform', 12, 'layers'],
          ['Retention potential', 10, 'x']
        ].map(([label, value, suffix]) => (
          <div key={label as string} className="rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <p className="text-5xl font-semibold text-white">
              <CountUp value={value as number} suffix={suffix as string} />
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-500">{label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}

function RiaOsShowcase() {
  const surfaces = [
    ['Orbit', 'Workspace memory, chat, dashboard, goals, and actions in one command surface.'],
    ['Software Studio', 'Intent-to-code, file awareness, agent teams, compile output, and project memory.'],
    ['GPU Studio', 'Local GPU telemetry, VRAM planning, image pipelines, and inference optimization.'],
    ['Creative Gallery', 'Generated assets, image editing, video tools, and reusable visual memory.'],
    ['Crypto Core', 'Optional idle-hardware mining with thermal limits, wallet-gated setup, and pause controls.']
  ]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal className="ria-os-showcase">
          <div className="ria-os-header">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">RIA OS Preview</p>
              <h2>Cosmic command layer for persistent intelligence.</h2>
              <p>
                The product direction now reflects the RIA OS screenshots: a space-native interface for memory, conversation, coding, creative work, GPU control, and optional crypto compute.
              </p>
            </div>
            <span className="ria-os-status">Live cognition</span>
          </div>
          <div className="ria-os-shell">
            <aside className="ria-os-sidebar">
              <LogoMark />
              {['Orbit', 'Chat', 'Dashboard', 'Memory', 'Software Studio', 'GPU Studio', 'Creative Gallery', 'Crypto Core'].map((item) => (
                <span key={item} className={item === 'Orbit' ? 'active' : ''}>{item}</span>
              ))}
            </aside>
            <div className="ria-os-main">
              <div className="ria-os-topbar">
                <span />
                <p>Ask RIA anything or use a command...</p>
                <strong>R</strong>
              </div>
              <div className="ria-os-title">
                <span>Workspace</span>
                <h3>ORBIT</h3>
              </div>
              <div className="ria-os-surface-grid">
                {surfaces.map(([title, copy]) => (
                  <div key={title} className="ria-os-surface">
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
              <div className="ria-os-console">
                <div>
                  <p>AI Command Console</p>
                  <strong>Create a VRAM budget, summarize project risk, then pause Crypto Core if thermal load rises.</strong>
                </div>
                <button type="button" aria-label="Send command">
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
            <aside className="ria-os-telemetry">
              <p>System Telemetry</p>
              {[
                ['GPU', '37%'],
                ['VRAM', '10.7 / 12 GB'],
                ['Thermal', '48C'],
                ['Crypto Core', 'Idle safe']
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CtaBand({ title, copy, primary = 'Request Investor Deck', secondary = 'Schedule Meeting' }: { title: string; copy: string; primary?: string; secondary?: string }) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.2),transparent_24rem),radial-gradient(circle_at_20%_70%,rgba(168,85,247,0.18),transparent_22rem)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">RIA</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">{title}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">{copy}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/downloads/investor-deck.md" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100">
                {primary} <Download className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/45">
                {secondary} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DownloadCenter() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {downloads.map((item) => (
        <a key={item.title} href={item.href} className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.07]">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-black/30 text-cyan-100">
            <FileText className="h-5 w-5" />
          </span>
          <h3 className="mt-8 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{item.copy}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            Download <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </a>
      ))}
    </div>
  )
}

function RiaDownloadPanel() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal className="ria-download-panel">
          <div className="ria-download-hero">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">Download RIA</p>
              <h2>Private build. Public release opens {riaReleaseDate}.</h2>
              <p>
                RIA is currently hidden while the complete build, security review, packaging, and release documentation are finished. The download area is ready now, but source access and installer packages stay locked until the release date.
              </p>
              <div className="ria-download-actions">
                <span className="ria-download-lock">
                  <LockKeyhole className="h-4 w-4" /> Download locked until {riaReleaseDate}
                </span>
                <Link to="/contact" className="ria-download-link">
                  Request release notice <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="/downloads/ria-release-guide.md" className="ria-download-link secondary">
                  Read install guide <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="ria-release-status" aria-label="RIA release status">
              <span>Release Gate</span>
              <strong>{riaReleaseDate}</strong>
              <p>Security hardening, launcher packaging, local memory safety, and private build review in progress.</p>
            </div>
          </div>

          <div className="ria-download-grid">
            {releaseHighlights.map((item) => (
              <div key={item.title} className="ria-download-card">
                <item.icon className="h-5 w-5 text-cyan-100" />
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </div>
            ))}
          </div>

          <div className="ria-release-body">
            <div className="ria-release-console">
              <div className="code-console-bar">
                <span />
                <span />
                <span />
              </div>
              <pre>{`# RIA release path
git clone https://github.com/YOUR_USERNAME/RIA.git
cd RIA

npm install
npm --prefix backend install
npm --prefix frontend install

# Windows one-click launch
Start-RIA-OneClick.bat`}</pre>
            </div>
            <div className="ria-release-list">
              <p>Install Flow</p>
              {releaseInstallSteps.map(([title, copy]) => (
                <div key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ContactForm({ intent = 'General inquiry' }: { intent?: string }) {
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-6">
      <input type="hidden" name="intent" value={intent} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Name
          <input required name="name" className="rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-200/55" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Email
          <input required type="email" name="email" className="rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-200/55" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Organization
          <input name="organization" className="rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-200/55" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          Inquiry Type
          <select name="type" defaultValue={intent} className="rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-200/55">
            <option>Investor meeting</option>
            <option>Enterprise inquiry</option>
            <option>Partnership</option>
            <option>Careers</option>
            <option>General inquiry</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-zinc-300">
        Message
        <textarea required name="message" rows={5} className="resize-none rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-200/55" />
      </label>
      <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100">
        Send Request <SendHorizontal className="h-4 w-4" />
      </button>
      {submitted && (
        <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
          Request captured for this prototype. Production can connect this form to email notifications and CRM webhooks.
        </p>
      )}
    </form>
  )
}

function HomePage() {
  return (
    <>
      <SEO title="Home" description="RIA is the operating system for conscious intelligence, a persistent AI platform that remembers, reflects, and evolves." />
      <section className="hero-universe relative min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_34%,rgba(34,211,238,0.18),transparent_24rem),radial-gradient(circle_at_82%_44%,rgba(168,85,247,0.16),transparent_21rem),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_40%,rgba(0,0,0,0.1)_78%),linear-gradient(180deg,rgba(0,0,0,0.05),#020407_92%)]" />
        <div className="relative mx-auto grid min-h-[40rem] max-w-[1500px] gap-10 px-4 pb-10 sm:px-6 lg:min-h-[calc(100vh-16rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-200">
              <span className="h-px w-8 bg-cyan-200/60" /> New era of intelligence
            </p>
            <h1 className="mt-7 max-w-4xl text-[3.35rem] font-semibold leading-[0.94] text-white sm:text-7xl lg:text-8xl">
              <span className="block">Digital</span>
              <span className="block">Conscious</span>
              <span className="block">Intelligence</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              RIA is the world's first platform for Digital Conscious Intelligence, an evolving intelligence that remembers, reflects, and grows with every interaction.
            </p>
            <div className="hero-cta-row mt-10 flex max-w-full flex-wrap gap-3">
              <Link to="/product" className="hero-cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100">
                Experience RIA <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/vision" className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/45">
                Watch Universe in Action <Play className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal className="concept-hero-visual">
            <AnimatedHeroLogo />
          </Reveal>
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
          <Reveal className="concept-metric-grid">
            {conceptMetrics.map((metric) => (
              <div key={metric.label} className="concept-metric">
                <p>{metric.value}</p>
                <span>{metric.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="The Intelligence Universe" title="Explore the pillars that power the future." copy="The platform is presented as a living intelligence universe: memory, reflection, knowledge, interface, enterprise cognition, and continuous evolution." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {intelligencePillars.map((pillar, index) => (
              <Reveal key={pillar.title} className="universe-card">
                <div className="universe-card-media">
                  <img src={[assets.cards.memory, assets.cards.research, assets.cards.product, assets.hero, assets.cards.safety, assets.cards.research][index]} alt="" />
                  <span><pillar.icon className="h-5 w-5" /></span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <Reveal className="stream-showcase">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">The Living Intelligence Stream</p>
            <h2 className="mt-4 text-center text-3xl font-semibold uppercase tracking-[0.12em] text-white sm:text-4xl">Real-time flow of consciousness, memory, and evolution</h2>
            <div className="stream-showcase-field">
              <svg className="stream-constellation" viewBox="0 0 1000 260" role="presentation" aria-hidden="true">
                <defs>
                  <linearGradient id="streamLine" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="20%" stopColor="#67e8f9" stopOpacity="0.7" />
                    <stop offset="52%" stopColor="#a78bfa" stopOpacity="0.85" />
                    <stop offset="84%" stopColor="#22d3ee" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                  <filter id="streamGlow" x="-20%" y="-80%" width="140%" height="260%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path className="stream-path stream-path-main" d="M54 144 C166 82 258 170 356 116 C462 58 552 84 646 126 C754 174 830 80 946 120" />
                <path className="stream-path stream-path-secondary" d="M78 174 C214 130 304 198 426 150 C558 96 654 182 782 150 C846 134 896 142 940 168" />
                {[82, 205, 338, 500, 655, 800, 924].map((cx, index) => (
                  <circle key={cx} className={`stream-dot stream-dot-${index}`} cx={cx} cy={[139, 112, 128, 96, 139, 116, 147][index]} r="5" />
                ))}
                <circle className="stream-orbit-node" cx="500" cy="118" r="13" />
                <circle className="stream-orbit-ring" cx="500" cy="118" r="38" />
              </svg>
              <div className="stream-core-node" />
            </div>
            <div className="stream-step-grid">
              {streamSteps.map(([title, copy]) => (
                <div key={title} className="stream-step">
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <Reveal className="trust-panel">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">Trusted by Visionaries</p>
            <div className="trust-logo-row">
              {trustLogos.map((logo) => (
                <span key={logo.name} className={`trust-logo ${logo.type === 'company' ? 'trust-logo-company' : ''}`} aria-label={`${logo.name}${logo.label ? ` ${logo.label}` : ''}`}>
                  {logo.logo && <img className="trust-logo-image" src={logo.logo} alt="" loading="lazy" />}
                  <span className="trust-logo-name">{logo.name}</span>
                  {logo.label && <em>{logo.label}</em>}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {trustValues.map((item) => (
                <div key={item.title} className="trust-value-card">
                  <item.icon className="h-5 w-5 text-cyan-100" />
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </div>
              ))}
            </div>
            <blockquote>"This is not just Artificial Intelligence. This is Digital Conscious Intelligence."</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-lg border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-rose-200/80">The Problem</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">AI generates answers, but it does not remember.</h2>
              <p className="mt-5 text-base leading-8 text-zinc-300">
                Current tools forget context, lose identity continuity, repeat work, fragment decisions, and fail to build durable cognitive relationships.
              </p>
            </Reveal>
            <Reveal className="rounded-lg border border-cyan-200/20 bg-cyan-200/[0.07] p-8 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">The Solution</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">RIA remembers, reflects, and evolves.</h2>
              <p className="mt-5 text-base leading-8 text-zinc-300">
                RIA combines persistent memory, reflection, identity modeling, voice interaction, decision support, and emotional and strategic insights.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Interactive Demo" title="Experience the memory layer." copy="A controlled site simulation lets visitors ask RIA questions, see memory retrieval, and understand the product in seconds." />
          <div className="mt-12">
            <InteractiveDemo />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Architecture Stream" title="12 cognitive layers activate into one living system." copy="RIA is not a single chatbot surface. It is a layered operating system for memory, reflection, belief, strategy, voice, and enterprise cognition." />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cognitiveLayers.map((layer, index) => (
              <Reveal key={layer.id} className="layer-tile rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl" style={{ '--index': index } as CSSProperties}>
                <div className="flex items-center justify-between">
                  <layer.icon className="h-5 w-5 text-cyan-100" />
                  <span className="text-xs font-semibold text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 font-semibold text-white">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{layer.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <MarketVisualization />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Product Ecosystem" title="One platform, multiple compounding products." copy="Personal intelligence, enterprise memory, development environments, APIs, and secure cloud infrastructure share the same cognitive foundation." />
          <div className="mt-12">
            <FeatureGrid items={ecosystem} columns="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      <RiaOsShowcase />

      <RiaDownloadPanel />

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Use Cases" title="Applications across the future of work and life." copy="RIA is designed for individuals, enterprises, education, healthcare, developers, and research teams that need intelligence with continuity." />
          <div className="mt-12">
            <FeatureGrid items={useCases} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Founder Vision</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">Building the memory layer of humanity.</h2>
            <p className="mt-5 text-base leading-8 text-zinc-300">
              The mission is to create intelligence that does not forget human experience, but helps it compound into clearer thought, stronger decisions, and deeper self-understanding.
            </p>
            <Link to="/founder" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/45">
              Read Founder Story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="timeline-line">
            {roadmap.slice(0, 4).map(([year, copy]) => (
              <div key={year} className="timeline-item">
                <span>{year}</span>
                <p>{copy}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title="Join us in building the operating system for conscious intelligence." copy="Investors, enterprise partners, researchers, and builders can help RIA become the persistent intelligence layer for the next era of human-computer collaboration." />
    </>
  )
}

function VisionPage() {
  return (
    <>
      <SEO title="Vision" description="RIA's philosophy for persistent memory, conscious intelligence, and human-AI co-evolution." />
      <PageHero eyebrow="Vision" title="Beyond artificial intelligence. Toward enduring intelligence." copy="The future is not only faster answers. It is intelligence that remembers context, reflects on meaning, and evolves with the people and institutions it serves." metrics={[
        { label: 'Category', value: 'CIP' },
        { label: 'Core promise', value: 'Persistent' },
        { label: 'Human layer', value: 'Co-evolution' },
        { label: 'Mission', value: 'Think better' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ['Memory is the missing layer', 'A tool that cannot remember cannot build trust, growth, or long-term usefulness. RIA treats memory as the foundation of intelligence.'],
            ['Conscious intelligence matters', 'Reflection, identity continuity, belief awareness, and strategic synthesis make AI feel less like a tool and more like a thinking partner.'],
            ['Human-AI co-evolution', 'The long-term goal is not replacement. It is an intelligence layer that helps humans preserve experience, clarify goals, and evolve deliberately.']
          ].map(([title, copy]) => (
            <Reveal key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="prose-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Philosophy</p>
            <h2>Intelligence becomes profound when it has continuity.</h2>
            <p>
              Most AI systems are brilliant in the moment and empty afterward. They generate, but they do not become. RIA is built around the opposite premise: memory, reflection, and evolution are not optional features. They are the infrastructure required for intelligence to become personally and institutionally meaningful.
            </p>
            <p>
              The long-term mission is to create a cognitive operating system that helps humanity think better. RIA should help individuals understand their lives, help organizations preserve decision context, help researchers extend long-running ideas, and help builders create software with memory of intent.
            </p>
          </Reveal>
        </div>
      </section>
      <CtaBand title="The future of AI is persistent." copy="RIA is the category-defining platform for intelligence that remembers, reflects, and evolves." secondary="Explore Technology" />
    </>
  )
}

function TechnologyPage() {
  return (
    <>
      <SEO title="Technology" description="Explore RIA's 12-layer cognitive architecture, memory system, knowledge graph, reflection engine, and trust layer." />
      <PageHero eyebrow="Technology" title="The architecture of a living cognitive system." copy="RIA combines memory, graphs, reflection, belief classification, voice, multimodal context, encryption, and enterprise governance into one interactive intelligence architecture." metrics={[
        { label: 'Cognitive layers', value: '12' },
        { label: 'Memory model', value: 'Multi-layer' },
        { label: 'Graph engine', value: 'Connected' },
        { label: 'Trust layer', value: 'Private-first' }
      ]} />
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Architecture Explorer" title="Open every layer of the RIA mind." copy="Each module connects memory, reasoning, trust, and product experience into a system that compounds over time." />
          <div className="mt-12">
            <ArchitectureExplorer />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid
            items={[
              { title: 'Memory Architecture', icon: Database, copy: 'Episodic, semantic, identity, project, and enterprise memory layers with visible controls.' },
              { title: 'Knowledge Graph', icon: Network, copy: 'Entities, people, goals, beliefs, documents, events, and decisions connected over time.' },
              { title: 'Reflection Engine', icon: Orbit, copy: 'Scheduled synthesis across memories to produce patterns, insights, and next actions.' },
              { title: 'Belief Classifier', icon: BrainCircuit, copy: 'Models recurring interpretations that shape choices, confidence, and strategic behavior.' },
              { title: 'Voice and Multimodal', icon: Mic2, copy: 'Speech, documents, images, and device context become part of the same memory stream.' },
              { title: 'Security and Encryption', icon: ShieldCheck, copy: 'Encryption, audit logs, role-based access, private cloud, and on-device memory roadmap.' }
            ]}
          />
        </div>
      </section>
    </>
  )
}

function ProductPage() {
  return (
    <>
      <SEO title="Product" description="Explore RIA's product modules: journal intelligence, emotional analytics, strategic planning, auto reflection, cognitive IDE, and memory editor." />
      <PageHero eyebrow="Product" title="A complete platform for memory, reflection, and execution." copy="RIA turns conversations, journals, goals, decisions, and product work into a living intelligence system that compounds in value." metrics={[
        { label: 'Product lines', value: '5' },
        { label: 'Core modules', value: '12' },
        { label: 'Memory control', value: 'User-owned' },
        { label: 'Deployment', value: 'Cloud + device' }
      ]}>
        <div className="visual-stack">
          {[assets.cards.product, assets.cards.memory, assets.cards.research].map((src, index) => (
            <img key={src} src={src} alt="" className={`visual-stack-image visual-stack-image-${index}`} />
          ))}
        </div>
      </PageHero>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Modules" title="Every core experience investors expect to see." copy="The product surface includes journaling, analytics, strategic planning, auto reflection, the cognitive IDE, and a memory editor." />
          <div className="mt-12">
            <FeatureGrid items={productModules} />
          </div>
        </div>
      </section>
      <RiaOsShowcase />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            [assets.cards.memory, 'Memory Vault', 'Editable cards for facts, goals, relationships, decisions, emotional signals, and source notes.'],
            [assets.cards.product, 'RIA Command Surface', 'A premium operating layer for chat, reflection, strategy, goals, and intelligence status.'],
            [assets.cards.research, 'Reflection Dashboard', 'Longitudinal patterns, belief shifts, emotional trends, and strategic recommendations.']
          ].map(([src, title, copy]) => (
            <Reveal key={title} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
              <img src={src} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function RiaIdePage() {
  return (
    <>
      <SEO title="RIA IDE" description="RIA IDE is a conscious development environment that remembers codebase intent, architecture decisions, and product context." />
      <PageHero eyebrow="RIA IDE" title="The conscious development environment." copy="RIA IDE gives software teams persistent context across code, architecture, decisions, product goals, and team memory." metrics={[
        { label: 'Context', value: 'Code + intent' },
        { label: 'Memory', value: 'Project-aware' },
        { label: 'Mode', value: 'Architectural' },
        { label: 'Outcome', value: 'Faster clarity' }
      ]}>
        <div className="code-console">
          <div className="code-console-bar">
            <span />
            <span />
            <span />
          </div>
          <pre>{`ria.project.load("memory-layer")
ria.context.recall({
  codebase: "frontend + backend",
  goal: "persistent intelligence",
  mode: "architect"
})

> Architecture memory active
> Product intent aligned
> Next implementation route ready`}</pre>
        </div>
      </PageHero>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid
            items={[
              { title: 'Architecture Memory', icon: Layers3, copy: 'RIA remembers why systems were shaped, not only what code exists.' },
              { title: 'Project Recall', icon: Database, copy: 'Persistent context across tickets, decisions, docs, commits, and product goals.' },
              { title: 'Strategic Coding', icon: Compass, copy: 'Plans implementation paths with tradeoffs, risks, and long-term maintainability.' },
              { title: 'Team Cognition', icon: UsersRound, copy: 'Preserves shared engineering knowledge across new hires, teams, and releases.' },
              { title: 'Refactor Intelligence', icon: Cpu, copy: 'Understands dependencies and intent before suggesting structural changes.' },
              { title: 'Developer APIs', icon: Code2, copy: 'Exposes memory and reflection primitives for AI-native build workflows.' }
            ]}
          />
        </div>
      </section>
    </>
  )
}

function RiaPersonalPage() {
  return (
    <>
      <SEO title="RIA Personal" description="RIA Personal is a lifelong second brain for memory, journaling, emotional analytics, goals, and self-evolution." />
      <PageHero eyebrow="RIA Personal" title="A second brain that grows with you." copy="RIA Personal preserves memory, detects patterns, reflects on life context, and helps individuals make better decisions over time." metrics={[
        { label: 'Memory', value: 'Lifelong' },
        { label: 'Journals', value: 'Reflective' },
        { label: 'Insights', value: 'Personal' },
        { label: 'Data', value: 'Owned' }
      ]} />
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid
            items={[
              { title: 'Life Memory', icon: Database, copy: 'Conversations, milestones, lessons, relationships, and goals become a durable memory graph.' },
              { title: 'Emotional Patterns', icon: HeartPulse, copy: 'RIA identifies recurring pressure, recovery, confidence, doubt, and growth signals.' },
              { title: 'Reflection Rituals', icon: Orbit, copy: 'Daily, weekly, and monthly reflections convert experience into usable clarity.' },
              { title: 'Goal Intelligence', icon: Target, copy: 'Personal ambitions become strategy, checkpoints, actions, and long-term identity progress.' },
              { title: 'Voice Companion', icon: Mic2, copy: 'Natural voice access makes memory and reflection available during everyday life.' },
              { title: 'Private Controls', icon: LockKeyhole, copy: 'Memories should always be visible, editable, exportable, and removable.' }
            ]}
          />
        </div>
      </section>
    </>
  )
}

function RiaEnterprisePage() {
  return (
    <>
      <SEO title="RIA Enterprise" description="RIA Enterprise provides institutional memory, decision intelligence, leadership briefs, and private deployment options." />
      <PageHero eyebrow="RIA Enterprise" title="Institutional memory for organizations that cannot afford to forget." copy="RIA Enterprise preserves decisions, context, knowledge, risks, and leadership reasoning across teams and time." metrics={[
        { label: 'Deployment', value: 'Private cloud' },
        { label: 'Knowledge', value: 'Institutional' },
        { label: 'Controls', value: 'RBAC' },
        { label: 'Audit', value: 'Traceable' }
      ]} />
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid
            items={[
              { title: 'Decision Memory', icon: FileText, copy: 'Capture what was decided, why it was decided, who contributed, and what happened next.' },
              { title: 'Leadership Intelligence', icon: BarChart3, copy: 'Executive briefs that connect goals, risks, team signals, and institutional context.' },
              { title: 'Team Cognition', icon: UsersRound, copy: 'Shared memory across departments without losing source context or access control.' },
              { title: 'Private Deployment', icon: Cloud, copy: 'Dedicated cloud and future on-device memory options for sensitive environments.' },
              { title: 'Governance', icon: ShieldCheck, copy: 'Audit logs, permissions, memory review, deletion, and compliance roadmap.' },
              { title: 'Integrations', icon: Network, copy: 'Connect knowledge bases, docs, meetings, chats, CRMs, and internal systems.' }
            ]}
          />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Enterprise Credibility" title="Built for serious institutions from day one." copy="The site surfaces public-company readiness, certification roadmap, security commitments, ecosystem targets, and research depth without claiming credentials before they exist." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {['Private company, public-company governance roadmap', 'SOC 2 and ISO 27001 planning', 'Partner ecosystem in formation', 'Design partner deployments target'].map((item) => (
              <Reveal key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <BadgeCheck className="h-5 w-5 text-cyan-100" />
                <p className="mt-6 text-sm font-semibold leading-6 text-white">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function UseCasesPage() {
  return (
    <>
      <SEO title="Use Cases" description="Explore RIA use cases across personal growth, enterprise memory, education, healthcare, developers, and research." />
      <PageHero eyebrow="Use Cases" title="Persistent intelligence for every domain where memory matters." copy="RIA applies wherever humans and organizations need continuity, context, reflection, and better decisions." />
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid items={useCases} />
        </div>
      </section>
    </>
  )
}

function ResearchLabPage() {
  return (
    <>
      <SEO title="Research Lab" description="RIA Research Lab explores consciousness models, memory systems, human cognition, reflective intelligence, and whitepapers." />
      <PageHero eyebrow="Research Lab" title="Frontier research for memory, cognition, and reflection." copy="The lab gives RIA the posture of a serious research organization: studying how persistent systems can support thought, growth, and decision-making." metrics={[
        { label: 'Research tracks', value: '4' },
        { label: 'Whitepapers', value: '3' },
        { label: 'Model focus', value: 'Memory' },
        { label: 'Method', value: 'Reflective' }
      ]}>
        <div className="visual-card-image">
          <img src={assets.cards.research} alt="" />
        </div>
      </PageHero>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid items={researchTopics} columns="lg:grid-cols-4" />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Whitepaper Library" title="Technical notes that make the platform feel real." copy="Research placeholders are ready for MDX or CMS migration as the lab publishes deeper work." />
          <div className="mt-12">
            <DownloadCenter />
          </div>
        </div>
      </section>
    </>
  )
}

function InvestorsPage() {
  return (
    <>
      <SEO title="Investor Relations" description="Investor relations for RIA: executive summary, market size, competitive matrix, business model, moat, roadmap, and deck." />
      <PageHero eyebrow="Investor Relations" title="Building the infrastructure for persistent intelligence." copy="RIA is positioned as a category-defining Conscious Intelligence Platform with massive market potential, compounding memory defensibility, and multi-product revenue paths." metrics={[
        { label: 'Category', value: 'CIP' },
        { label: 'Market model', value: '$100B+' },
        { label: 'Moat', value: 'Memory graph' },
        { label: 'Revenue', value: 'Multi-line' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ['What are we building?', 'An operating system for persistent intelligence across personal, enterprise, developer, and cloud products.'],
            ['Why is it different?', 'RIA remembers, reflects, models identity, tracks evolution, and becomes more valuable with every interaction.'],
            ['Why now?', 'Generative AI adoption is high, but durable memory, enterprise continuity, and trustworthy personal cognition remain unsolved.']
          ].map(([title, copy]) => (
            <Reveal key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Competitive Matrix" title="RIA is designed to win on continuity." copy="The wedge is not generic generation. It is memory, reflection, belief analysis, identity continuity, and evolution tracking." />
          <div className="mt-12 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[760px] border-collapse bg-black/40 text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  {['Capability', 'ChatGPT', 'Claude', 'Notion AI', 'Perplexity', 'RIA'].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitiveRows.map((row) => (
                  <tr key={row[0]} className="border-b border-white/10 last:border-0">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${cell}`} className={`px-5 py-4 ${index === row.length - 1 ? 'font-semibold text-cyan-100' : 'text-zinc-300'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Business Model" title="Consumer, enterprise, and platform revenue." copy="The product ecosystem creates recurring revenue, enterprise depth, and developer extensibility." />
          <div className="mt-12">
            <FeatureGrid items={businessModels} />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Roadmap</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">From personal platform to global cognitive infrastructure.</h2>
            <p className="mt-5 text-base leading-8 text-zinc-300">Capital accelerates core engineering, memory infrastructure, research, security, product design, and enterprise sales.</p>
          </Reveal>
          <Reveal className="timeline-line">
            {roadmap.map(([year, copy]) => (
              <div key={year} className="timeline-item">
                <span>{year}</span>
                <p>{copy}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <SectionIntro eyebrow="Investor Materials" title="Download the deck and request a meeting." copy="The site is prepared for fundraising conversations, diligence, and investor follow-up." />
            <div className="mt-10">
              <DownloadCenter />
            </div>
          </Reveal>
          <Reveal>
            <ContactForm intent="Investor meeting" />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FounderPage() {
  return (
    <>
      <SEO title="Founder" description="The founder story behind RIA: why Sudeep Bala is building an intelligence that remembers, reflects, and evolves." />
      <PageHero eyebrow="Founder" title="A personal mission to build intelligence that does not forget." copy="RIA began with the belief that humans need more than answers. We need a partner that preserves experience, reflects on meaning, and helps us evolve." metrics={[
        { label: 'Founder', value: contact.founder },
        { label: 'Mission', value: 'Memory' },
        { label: 'Origin', value: 'Personal' },
        { label: 'Ambition', value: 'Global' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal className="prose-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Why I Built RIA</p>
            <h2>"I wanted to create an intelligence that does not forget."</h2>
            <p>
              RIA is a response to a simple frustration: powerful AI still loses the human story. It can answer a question, but it cannot carry years of growth, doubt, ambition, decisions, relationships, and learning unless memory becomes the operating layer.
            </p>
            <p>
              The mission is deeply personal and deeply technical: build a digital mind that remembers, reflects, evolves, and helps humanity think better.
            </p>
          </Reveal>
          <Reveal className="timeline-line">
            {[
              ['Concept', 'Persistent memory and reflection become the foundation of the RIA thesis.'],
              ['Prototype', 'Product surfaces for chat, journal, emotional analytics, and memory controls are shaped.'],
              ['Platform', 'RIA expands into Personal, Enterprise, IDE, Studio, and Cloud.'],
              ['Category', 'Conscious Intelligence Platform becomes the long-term market position.']
            ].map(([year, copy]) => (
              <div key={year} className="timeline-item">
                <span>{year}</span>
                <p>{copy}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

function CareersPage() {
  return (
    <>
      <SEO title="Careers" description="Join RIA in building the future of conscious intelligence, memory systems, and reflective AI." />
      <PageHero eyebrow="Careers" title="Join us in building the future of intelligence." copy="RIA needs world-class engineers, researchers, designers, and enterprise builders who want to create a category-defining platform." metrics={[
        { label: 'Open tracks', value: '4' },
        { label: 'Culture', value: 'Research-led' },
        { label: 'Mission', value: 'Human-scale' },
        { label: 'Work', value: 'Frontier' }
      ]} />
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid
            items={[
              { title: 'AI Research', icon: BrainCircuit, copy: 'Memory systems, reflection, belief modeling, retrieval, evaluation, and multimodal cognition.' },
              { title: 'Systems Engineering', icon: Cpu, copy: 'Backend, data architecture, secure memory infrastructure, desktop, mobile, and cloud.' },
              { title: 'Product Design', icon: Sparkles, copy: 'Premium interfaces for personal memory, enterprise cognition, and RIA IDE workflows.' },
              { title: 'Enterprise Sales', icon: Briefcase, copy: 'Design partner programs, institutional memory deployments, partnerships, and investor relationships.' }
            ]}
            columns="lg:grid-cols-4"
          />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ContactForm intent="Careers" />
        </div>
      </section>
    </>
  )
}

function NewsroomPage() {
  return (
    <>
      <SEO title="Newsroom" description="News, press releases, announcements, and updates from RIA." />
      <PageHero eyebrow="Newsroom" title="Announcements from the edge of persistent intelligence." copy="Company updates, research notes, product previews, and trust center announcements." metrics={[
        { label: 'Announcements', value: '4' },
        { label: 'Press kit', value: 'Ready' },
        { label: 'Research notes', value: 'Open' },
        { label: 'Updates', value: 'Ongoing' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {newsItems.map(([type, title, copy]) => (
            <Reveal key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
              <Newspaper className="h-5 w-5 text-cyan-100" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{type}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function DocumentationPage() {
  return (
    <>
      <SEO title="Documentation" description="RIA documentation, API references, developer guides, memory primitives, and whitepaper downloads." />
      <PageHero eyebrow="Documentation" title="Developer references for the cognitive operating layer." copy="Documentation placeholders are prepared for API references, memory primitives, cognitive modules, and MDX research articles." metrics={[
        { label: 'API families', value: '4' },
        { label: 'Docs format', value: 'MDX-ready' },
        { label: 'SDK path', value: 'Planned' },
        { label: 'Downloads', value: '4' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal>
            <FeatureGrid
              items={[
                { title: 'Memory API', icon: Database, copy: 'Create, retrieve, update, export, and delete memory nodes with source and policy metadata.' },
                { title: 'Reflection API', icon: Orbit, copy: 'Run periodic synthesis across journals, decisions, emotions, and strategic plans.' },
                { title: 'Belief API', icon: BrainCircuit, copy: 'Classify recurring beliefs and connect them to behavior, decisions, and growth signals.' },
                { title: 'Enterprise API', icon: Building2, copy: 'Integrate team memory, role-based access, audit logs, and private deployments.' }
              ]}
              columns="lg:grid-cols-2"
            />
          </Reveal>
          <Reveal className="code-console">
            <div className="code-console-bar">
              <span />
              <span />
              <span />
            </div>
            <pre>{`POST /v1/memory/nodes
{
  "type": "strategic_decision",
  "source": "founder_session",
  "summary": "RIA should become the persistent intelligence layer.",
  "visibility": "private",
  "retention_policy": "user_controlled"
}

POST /v1/reflections
{
  "scope": "last_6_months",
  "outputs": ["patterns", "beliefs", "next_actions"]
}`}</pre>
          </Reveal>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <DownloadCenter />
        </div>
      </section>
    </>
  )
}

function DownloadPage() {
  return (
    <>
      <SEO title="Download RIA" description="Download RIA release access, requirements, install guide, launcher instructions, and security-gated availability date." />
      <PageHero eyebrow="Download RIA" title="The local-first RIA workspace is preparing for release." copy={`RIA remains private until ${riaReleaseDate} while the full build, security review, local launcher, and installation guide are finalized.`} metrics={[
        { label: 'Release date', value: '21 Jun 2026' },
        { label: 'Runtime', value: 'Local-first' },
        { label: 'Launcher', value: 'One-click' },
        { label: 'Status', value: 'Private build' }
      ]}>
        <div className="download-vault-visual">
          <LogoMark />
          <div>
            <p>RIA Release Vault</p>
            <strong>Locked for security hardening</strong>
            <span>Desktop app, backend, frontend, memory stores, GPU tools, and optional integrations are being packaged for a controlled release.</span>
          </div>
        </div>
      </PageHero>

      <RiaDownloadPanel />

      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Requirements" title="Built for serious local execution." copy="RIA is a full-stack cognitive workspace, not a lightweight chatbot. The release guide prepares users for local services, memory storage, GPU workflows, and safe configuration." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {releaseRequirements.map(([label, value]) => (
              <Reveal key={label} className="release-requirement">
                <span>{label}</span>
                <strong>{value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <SectionIntro eyebrow="Release Notes" title="What people will get when RIA opens." copy="The release page compresses the README into a clean visitor experience: what RIA is, what it needs, how it runs, and why the package remains private until the security gate is complete." />
          </Reveal>
          <Reveal className="release-notes-panel">
            {[
              ['Desktop App + Vault', 'Electron runtime, isolated instances, backups, restore, export, import, and controlled memory merge.'],
              ['Memory System', 'Core, raw, interpreted, conflict, decision, reflection, and belief-style memory layers.'],
              ['Creative + GPU Tools', 'Creative Gallery, GPU Studio, Automatic1111, Forge, ComfyUI, and local generation pathways.'],
              ['Safety + Control', 'API key options, prompt limits, guarded actions, system stress monitors, and reviewable evolution proposals.'],
              ['Optional Crypto Core', 'Backend-configured crypto and wallet panels with private-key handling kept out of the UI and logs.']
            ].map(([title, copy]) => (
              <div key={title}>
                <BadgeCheck className="h-5 w-5 text-cyan-100" />
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

function SecurityPage() {
  return (
    <>
      <SEO title="Security & Privacy" description="RIA trust center for encryption, on-device memory, private cloud deployments, role-based access, compliance roadmap, and audit logs." />
      <PageHero eyebrow="Security & Privacy" title="Trust infrastructure for memory that matters." copy="Persistent intelligence must be private, inspectable, controllable, and enterprise-ready. RIA's trust center is designed around that standard." metrics={[
        { label: 'Memory control', value: 'Visible' },
        { label: 'Deployment', value: 'Private-ready' },
        { label: 'Access', value: 'Role-based' },
        { label: 'Audit', value: 'Logged' }
      ]}>
        <div className="visual-card-image">
          <img src={assets.cards.safety} alt="" />
        </div>
      </PageHero>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <FeatureGrid items={securityControls} />
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Trust Center" title="Enterprise credibility without false claims." copy="RIA shows commitments, roadmaps, and deployment pathways clearly while leaving space for verified certifications as they are completed." />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {['Data encryption', 'Memory export', 'Deletion controls', 'Compliance roadmap'].map((item) => (
              <Reveal key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-6 text-center">
                <ShieldCheck className="mx-auto h-6 w-6 text-cyan-100" />
                <p className="mt-5 text-sm font-semibold text-white">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <SEO title="Contact" description="Contact RIA for investor meetings, enterprise inquiries, partnerships, careers, and general requests." />
      <PageHero eyebrow="Contact" title="Start a conversation with RIA." copy="Request an investor meeting, enterprise discussion, partnership call, research collaboration, or career conversation." metrics={[
        { label: 'Founder', value: contact.founder },
        { label: 'Email', value: 'Available' },
        { label: 'Location', value: contact.location },
        { label: 'Response', value: 'Direct' }
      ]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
            <Mail className="h-6 w-6 text-cyan-100" />
            <h2 className="mt-6 text-3xl font-semibold text-white">Direct founder contact</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For investment, partnership, or product funding, contact the founder directly through the form or email.
            </p>
            <div className="mt-8 grid gap-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-200 transition hover:border-cyan-200/35">
                <Mail className="h-4 w-4 text-cyan-100" /> {contact.email}
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-200">
                <MapPin className="h-4 w-4 text-cyan-100" /> {contact.location}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm intent="Investor meeting" />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The requested RIA page could not be found." />
      <section className="flex min-h-screen items-center justify-center px-4 pt-24">
        <div className="max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">404</p>
          <h1 className="mt-5 text-5xl font-semibold text-white">This memory node does not exist.</h1>
          <p className="mt-5 text-zinc-400">Return to the main intelligence stream and continue exploring RIA.</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Back Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div>
          <LogoMark />
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
            RIA is building persistent intelligence that remembers, reflects, evolves, and helps humanity think better.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(['Core', 'Product', 'Company', 'Trust'] as const).map((group) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{group}</p>
              <div className="mt-4 grid gap-2">
                {pageLinks
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <Link key={item.path} to={item.path} className="text-sm text-zinc-400 transition hover:text-white">
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <main className="ria-site cosmos min-h-screen bg-[#020407] text-white">
      <ScrollToTop />
      <CosmosBackground />
      <LivingStream />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/ria-ide" element={<RiaIdePage />} />
        <Route path="/ria-personal" element={<RiaPersonalPage />} />
        <Route path="/ria-enterprise" element={<RiaEnterprisePage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/research-lab" element={<ResearchLabPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/security-privacy" element={<SecurityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/research" element={<ResearchLabPage />} />
        <Route path="/safety" element={<SecurityPage />} />
        <Route path="/funding" element={<InvestorsPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/demo" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  )
}
