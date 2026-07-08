import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { filterRiaImages, imageLibraryFilters, type RiaImage } from './data/riaImages'
import { motion } from 'framer-motion'
import CosmosBackground from './components/CosmosBackground'
import ProductBento from './components/ProductBento'
import ArchitectureBlueprintVisual from './components/ArchitectureBlueprint'
import RiaHeroSceneFallback from './components/RiaHeroSceneFallback'
import {
  Activity,
  ArrowLeft,
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
  Palette,
  Play,
  Rocket,
  Search,
  SendHorizontal,
  Shield,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Target,
  UsersRound,
  X,
  Zap,
  type LucideIcon
} from 'lucide-react'

const RiaCinematicBackground = lazy(() => import('./components/RiaCinematicBackground'))
const SoftwareExchangePage = lazy(() => import('./pages/SoftwareExchangePage'))

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

const assets = {
  // Primary brand logo: use RIA logos folder (production-ready)
  logo: '/images/logos/ria-logo.png',
  // Page hero: strong visual using RIA orbit imagery
  hero: '/assets/ria/ria-os-orbit-hero.jpg',
  aion: {
    // AION archives (kept for historical reference)
    hero: '/images/aion-uploaded/defensecore-dashboard.png',
    command: '/images/aion-uploaded/defensecore-command.png',
    creativeWall: '/images/aion-uploaded/creative-intelligence-wall.jpg',
    creativeWallAlt: '/images/aion-uploaded/creative-intelligence-wall-alt.jpg',
    creativeStudio: '/images/aion-uploaded/creative-studio-dashboard.png',
    brainLogo: '/images/logos/ria-conscious-logo.png',
    brainStructure: '/images/aion-uploaded/ria-brain-structure.png',
    launchPoster: '/images/aion-uploaded/launch-poster.png',
    ringMark: '/images/aion-uploaded/ria-ring-mark.png'
  },
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

const riaReleaseDate = 'July 5, 2026'
const riaReleaseDateShort = '5 Jul 2026'

const pageLinks: PageLink[] = [
  { label: 'RIA Home', path: '/', group: 'Core', description: 'Premium launch experience.' },
  { label: 'Vision', path: '/vision', group: 'Core', description: 'The philosophy behind persistent intelligence.' },
  { label: 'Technology', path: '/technology', group: 'Core', description: 'Interactive cognitive architecture.' },
  { label: 'Product', path: '/product', group: 'Product', description: 'Modules, screenshots, and platform systems.' },
  { label: 'RIA Studio', path: '/ria-ide', group: 'Product', description: 'The AI-native development environment.' },
  { label: 'RIA OS', path: '/ria-personal', group: 'Product', description: 'The private intelligence operating layer.' },
  { label: 'RIA Enterprise', path: '/ria-enterprise', group: 'Product', description: 'Institutional memory and decision intelligence.' },
  { label: 'UPLOAD PROJECT', path: '/software-exchange', group: 'Product', description: 'Owner-approved tools, agents, plugins, and local software.' },
  { label: 'Use Cases', path: '/use-cases', group: 'Product', description: 'Applications across industries.' },
  { label: 'Research Lab', path: '/research-lab', group: 'Core', description: 'Memory, cognition, and reflection R&D.' },
  { label: 'Image Library', path: '/images', group: 'Core', description: 'Product visuals, brand concepts, and interface studies.' },
  { label: 'Investors', path: '/investors', group: 'Company', description: 'Market, moat, roadmap, and fundraising.' },
  { label: 'Founder', path: '/founder', group: 'Company', description: 'Personal mission and company origin.' },
  { label: 'Careers', path: '/careers', group: 'Company', description: 'Join the team building RIA.' },
  { label: 'Newsroom', path: '/newsroom', group: 'Company', description: 'Announcements, releases, and updates.' },
  { label: 'Documentation', path: '/documentation', group: 'Trust', description: 'API references and developer guides.' },
  { label: 'RIA Launch', path: '/download', group: 'Trust', description: 'Server launch status, requirements, and install guide.' },
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
  { title: 'Multimodal Interface', icon: BrainCircuit, copy: 'Natural voice, vision, and multimodal AI wrapped in a premium cognitive surface.' },
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
  { title: 'RIA IDE', icon: Code2, meta: 'Cognitive development', copy: 'An AI-native coding environment that remembers codebase intent and architecture decisions.' },
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
  { title: 'Continuity Models', icon: BrainCircuit, copy: 'Working models for memory continuity, self-reference, attention, and reflective agency.' },
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

const competitiveHeaders = [
  { label: 'Capability' },
  { label: 'ChatGPT', logo: '/images/brands/openai.svg', invert: true },
  { label: 'Claude', logo: '/images/brands/claude.svg', invert: true },
  { label: 'Notion AI', logo: '/images/brands/notion.svg', invert: true },
  { label: 'Perplexity', logo: '/images/brands/perplexity.svg', invert: true },
  { label: 'RIA', logo: assets.logo }
]

const downloads = [
  { title: 'Investor Deck', href: '/downloads/investor-deck.md', copy: 'Category thesis, market model, product lines, and use of capital.' },
  { title: 'Architecture Whitepaper', href: '/downloads/architecture-whitepaper.md', copy: 'The 12-layer cognitive system and persistent memory framework.' },
  { title: 'Security Brief', href: '/downloads/security-brief.md', copy: 'Trust center overview for memory, privacy, and enterprise controls.' },
  { title: 'RIA Release Guide', href: '/downloads/ria-release-guide.md', copy: 'Release date, requirements, one-click launcher, and local install path.' }
]


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
  ['Company', 'RIA introduces a private AI operating system', 'A category narrative for persistent memory, reflection, and decision intelligence.'],
  ['Research', 'Research lab opens technical notes on layered memory systems', 'The lab explores identity, episodic recall, semantic compression, and reflective synthesis.'],
  ['Product', 'RIA IDE concept preview connects coding context with long-term project memory', 'The development environment is designed to remember architecture, intent, and decisions.'],
  ['Security', 'RIA trust center outlines private cloud and on-device memory roadmap', 'A clear path for encryption, audit logs, governance, and enterprise readiness.']
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    let nestedFrame = 0
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        nestedFrame = window.requestAnimationFrame(() => {
          const root = document.documentElement
          const previousBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'auto', block: 'start' })
          root.style.scrollBehavior = previousBehavior
        })
      })
      return () => {
        window.cancelAnimationFrame(frame)
        window.cancelAnimationFrame(nestedFrame)
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [hash, pathname])

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
    const fullTitle = title === 'Home' ? 'RIA | Private Intelligence Company' : `${title} | RIA`
    document.title = fullTitle
    setMeta('description', 'name', description)
    setMeta('og:title', 'property', fullTitle)
    setMeta('og:description', 'property', description)
    setMeta('twitter:title', 'name', fullTitle)
    setMeta('twitter:description', 'name', description)
    const canonicalHref = new URL(pathname === '/' ? '/' : pathname, 'https://www.aiontec.co.in').href
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalHref
    setMeta('og:url', 'property', canonicalHref)
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

// Inline SVG brand mark — exact recreation of the AION "A" glyph.
// Bold geometric A: two thick angled legs, sharp apex, rectangular crossbar void.
// Uses fill="currentColor" — no background, no box. Transparent by nature.
function AionMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/*
        Single closed path tracing the full A silhouette:
        apex → right outer leg → crossbar notch → left inner leg → left outer leg → close
        The rectangular notch at (44-56, 57-67) forms the crossbar void.
      */}
      <path
        fillRule="nonzero"
        fill="currentColor"
        d="
          M 50 5
          L 93 94
          L 77 94
          L 56 57
          L 56 67
          L 44 67
          L 44 57
          L 23 94
          L 7 94
          Z
        "
      />
    </svg>
  )
}

// Pure CSS animated star field — cinematic background
function CosmicStarField() {
  return (
    <div className="cosmic-stage" aria-hidden="true">
      <div className="star-hero-glow" />
      <div className="star-layer star-layer-c" />
      <div className="star-layer star-layer-b" />
      <div className="star-layer star-layer-a" />
      <div className="star-mist" />
    </div>
  )
}

function LogoMark({ variant = 'header' }: { variant?: 'header' | 'footer' | 'badge' | 'watermark' }) {
  if (variant === 'watermark') {
    return (
      <div className="flex items-center gap-1.5 opacity-15 select-none pointer-events-none">
        <AionMark size={16} className="text-slate-500" />
        <span className="text-[9px] font-bold tracking-[0.22em] text-slate-450 uppercase">AION</span>
      </div>
    )
  }
  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-black/40 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur-md shadow-sm">
        <AionMark size={14} className="text-slate-100" />
        <span className="tracking-[0.18em] uppercase text-[10px]">Built by AION</span>
      </div>
    )
  }
  const isFooter = variant === 'footer'
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 group focus:outline-none"
      aria-label="AION home"
    >
      <AionMark
        size={isFooter ? 36 : 30}
        className={`${isFooter ? 'text-slate-100' : 'text-slate-100'} transition-opacity group-hover:opacity-70 shrink-0`}
      />
      <span className={`${isFooter ? 'text-base font-bold tracking-[0.22em]' : 'text-sm font-bold tracking-[0.18em]'} text-slate-100 group-hover:text-slate-300 transition-colors uppercase`}>
        AION
      </span>
    </Link>
  )
}

function AnimatedHeroLogo() {
  return (
    <div className="hero-logo-stage" aria-hidden="true">
      <div className="hero-logo-aura" />
      <div className="hero-logo-core">
        <img src={assets.logo} alt="RIA brain logo" />
      </div>
    </div>
  )
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', `#${id}`)
  }
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const primary = [
    { label: 'Intelligence', to: '/#chapter-brain', id: 'chapter-brain' },
    { label: 'Architecture', to: '/#chapter-memory', id: 'chapter-memory' },
    { label: 'Product proof', to: '/#chapter-knowledge', id: 'chapter-knowledge' },
    { label: 'Privacy', to: '/#chapter-reflection', id: 'chapter-reflection' },
    { label: 'Founder', to: '/#chapter-skin', id: 'chapter-skin' }
  ]
  const groups = useMemo(() => ['Core', 'Product', 'Company', 'Trust'] as const, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 18)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { to: string; id: string }) => {
    e.preventDefault()
    if (location.pathname === '/') { scrollToSection(item.id) } else { navigate(item.to) }
    setOpen(false)
  }

  const close = () => setOpen(false)

  return (
    <header className={`site-header site-header-float ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <div className="site-brand-lockup">
          <LogoMark />
          <span><strong>RIA</strong><small>Private intelligence</small></span>
        </div>
        <nav className="site-nav-primary" aria-label="Primary navigation">
          {primary.map((item) => (
            <a key={item.label} href={item.to} onClick={(e) => handleNavClick(e, item)}
              className={`site-primary-link ${location.hash === item.to.replace('/', '') ? 'is-current' : ''}`}
            >{item.label}</a>
          ))}
          <NavLink to="/software-exchange" className={({ isActive }) => `exchange-nav-link${isActive ? ' is-current' : ''}`}>
            UPLOAD PROJECT
          </NavLink>
          <button type="button" onClick={() => setOpen((v) => !v)} className="site-command-trigger"
            aria-expanded={open} aria-controls="site-desktop-index-panel">
            Index <ChevronDown className={open ? 'is-open' : ''} />
          </button>
        </nav>
        <div className="site-nav-actions">
          <span className="site-runtime-state"><i /> System private</span>
          <Link to="/contact" className="site-investor-link">Investor access <ArrowRight /></Link>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="site-menu-button"
          aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav-panel">
          <span>{open ? 'Close' : 'Menu'}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="site-nav-dropdown site-desktop-dropdown" id="site-desktop-index-panel">
          <div className="site-nav-dropdown-inner">
            <div className="site-command-menu-head">
              <div><span>RIA SYSTEM INDEX</span><strong>Explore the intelligence architecture.</strong></div>
              <Link to="/contact" onClick={close}>Request investor brief <ArrowRight /></Link>
            </div>
            <nav className="site-mobile-focus-links" aria-label="Homepage sections">
              {primary.map((item) => (
                <a key={`desktop-${item.label}`} href={item.to} onClick={(event) => handleNavClick(event, item)}>
                  <span>{item.label}</span><ArrowRight aria-hidden="true" />
                </a>
              ))}
              <Link to="/software-exchange" onClick={close}><span>UPLOAD PROJECT</span><ArrowRight aria-hidden="true" /></Link>
            </nav>
            <div className="site-command-menu-grid">
              {groups.map((group) => (
                <div className="site-command-group" key={group}>
                  <p>{group}</p>
                  <div>
                    {pageLinks.filter((item) => item.group === group).map((item) => (
                      <Link key={item.path} to={item.path} onClick={close}>
                        <span>{item.label}</span><small>{item.description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="site-command-menu-foot">
              <span><i /> Local-first direction</span>
              <span>Memory-first architecture</span>
              <span>Human-controlled autonomy</span>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE NAV PANEL */}
      {open && (
        <div className="mobile-nav-panel" id="mobile-nav-panel" role="dialog" aria-label="Mobile navigation" aria-modal="true">
          <div className="mobile-nav-panel-head">
            <span className="mobile-nav-panel-title">Navigation</span>
            <button className="mobile-nav-close" onClick={close} aria-label="Close menu"><X /></button>
          </div>
          <p className="mobile-nav-section-label">Pages</p>
          <Link className="mobile-nav-link" to="/" onClick={close}>RIA Home</Link>
          {primary.map((item) => (
            <a key={`mob-${item.label}`} className="mobile-nav-link" href={item.to}
              onClick={(e) => { handleNavClick(e, item) }}>{item.label}</a>
          ))}
          <Link className="mobile-nav-link" to="/software-exchange" onClick={close}>UPLOAD PROJECT</Link>
          <div className="mobile-nav-divider" />
          {groups.map((group) => {
            const gl = pageLinks.filter((i) => i.group === group)
            if (!gl.length) return null
            return (
              <div key={group}>
                <p className="mobile-nav-section-label">{group}</p>
                {gl.map((item) => (
                  <Link key={item.path} className="mobile-nav-link mobile-nav-link-sm" to={item.path} onClick={close}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )
          })}
          <div className="mobile-nav-divider" />
          <Link className="mobile-nav-link mobile-nav-investor" to="/contact" onClick={close}>
            Investor Access <ArrowRight style={{ width: 15, height: 15, marginLeft: 6 }} />
          </Link>
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

type NeuralSphereVariant =
  | 'default'
  | 'vision'
  | 'technology'
  | 'personal'
  | 'enterprise'
  | 'usecases'
  | 'investor'
  | 'founder'
  | 'careers'
  | 'newsroom'
  | 'documentation'
  | 'contact'

type NeuralSpherePreset = {
  nodeCount: number
  pointColor: number
  lineColor: number
  coreColor: number
  ringColor: number
  pointOpacity: number
  lineOpacity: number
  spinY: number
  spinZ: number
  waveSpeed: number
  waveAmplitude: number
  floatSpeed: number
  floatAmplitude: number
  corePulse: number
  corePulseSpeed: number
  ringCount: number
  ringTilt: number
  ringTwist: number
  connectionStride: number
  connectionOffset: number
  radius: number
  radiusJitter: number
}

const neuralSpherePresets: Record<NeuralSphereVariant, NeuralSpherePreset> = {
  default: {
    nodeCount: 150,
    pointColor: 0x8cf6ff,
    lineColor: 0x7dd3fc,
    coreColor: 0x6d5dfc,
    ringColor: 0xc4b5fd,
    pointOpacity: 0.9,
    lineOpacity: 0.16,
    spinY: 0.0026,
    spinZ: 0,
    waveSpeed: 0.58,
    waveAmplitude: 0.12,
    floatSpeed: 0.38,
    floatAmplitude: 0.06,
    corePulse: 0.08,
    corePulseSpeed: 1.1,
    ringCount: 3,
    ringTilt: 0.42,
    ringTwist: 0.48,
    connectionStride: 13,
    connectionOffset: 5,
    radius: 1.64,
    radiusJitter: 0.08
  },
  vision: {
    nodeCount: 154,
    pointColor: 0x9ee8ff,
    lineColor: 0x7dd3fc,
    coreColor: 0x6d8fff,
    ringColor: 0xa5b4fc,
    pointOpacity: 0.92,
    lineOpacity: 0.15,
    spinY: 0.002,
    spinZ: 0.0009,
    waveSpeed: 0.46,
    waveAmplitude: 0.18,
    floatSpeed: 0.25,
    floatAmplitude: 0.1,
    corePulse: 0.12,
    corePulseSpeed: 0.8,
    ringCount: 4,
    ringTilt: 0.35,
    ringTwist: 0.42,
    connectionStride: 17,
    connectionOffset: 7,
    radius: 1.72,
    radiusJitter: 0.06
  },
  technology: {
    nodeCount: 190,
    pointColor: 0x80f2ff,
    lineColor: 0x38bdf8,
    coreColor: 0x4f46e5,
    ringColor: 0x22d3ee,
    pointOpacity: 0.88,
    lineOpacity: 0.2,
    spinY: 0.0035,
    spinZ: 0.0012,
    waveSpeed: 0.8,
    waveAmplitude: 0.09,
    floatSpeed: 0.6,
    floatAmplitude: 0.05,
    corePulse: 0.07,
    corePulseSpeed: 1.5,
    ringCount: 2,
    ringTilt: 0.58,
    ringTwist: 0.72,
    connectionStride: 11,
    connectionOffset: 4,
    radius: 1.58,
    radiusJitter: 0.11
  },
  personal: {
    nodeCount: 140,
    pointColor: 0xb6f5ff,
    lineColor: 0x93c5fd,
    coreColor: 0xa855f7,
    ringColor: 0xe9d5ff,
    pointOpacity: 0.92,
    lineOpacity: 0.14,
    spinY: 0.0018,
    spinZ: 0.0005,
    waveSpeed: 0.38,
    waveAmplitude: 0.2,
    floatSpeed: 0.32,
    floatAmplitude: 0.14,
    corePulse: 0.15,
    corePulseSpeed: 0.95,
    ringCount: 3,
    ringTilt: 0.3,
    ringTwist: 0.5,
    connectionStride: 19,
    connectionOffset: 3,
    radius: 1.68,
    radiusJitter: 0.07
  },
  enterprise: {
    nodeCount: 170,
    pointColor: 0x67e8f9,
    lineColor: 0x0ea5e9,
    coreColor: 0x1d4ed8,
    ringColor: 0x60a5fa,
    pointOpacity: 0.9,
    lineOpacity: 0.14,
    spinY: 0.0024,
    spinZ: 0.0003,
    waveSpeed: 0.44,
    waveAmplitude: 0.08,
    floatSpeed: 0.24,
    floatAmplitude: 0.04,
    corePulse: 0.06,
    corePulseSpeed: 0.85,
    ringCount: 5,
    ringTilt: 0.22,
    ringTwist: 0.3,
    connectionStride: 15,
    connectionOffset: 6,
    radius: 1.6,
    radiusJitter: 0.05
  },
  usecases: {
    nodeCount: 155,
    pointColor: 0x93c5fd,
    lineColor: 0x818cf8,
    coreColor: 0x7c3aed,
    ringColor: 0xa78bfa,
    pointOpacity: 0.88,
    lineOpacity: 0.17,
    spinY: 0.0031,
    spinZ: 0.0017,
    waveSpeed: 0.92,
    waveAmplitude: 0.16,
    floatSpeed: 0.54,
    floatAmplitude: 0.09,
    corePulse: 0.09,
    corePulseSpeed: 1.35,
    ringCount: 3,
    ringTilt: 0.68,
    ringTwist: 0.94,
    connectionStride: 9,
    connectionOffset: 5,
    radius: 1.63,
    radiusJitter: 0.09
  },
  investor: {
    nodeCount: 180,
    pointColor: 0x99f6e4,
    lineColor: 0x2dd4bf,
    coreColor: 0x0f766e,
    ringColor: 0x5eead4,
    pointOpacity: 0.86,
    lineOpacity: 0.15,
    spinY: 0.0021,
    spinZ: 0.0008,
    waveSpeed: 0.52,
    waveAmplitude: 0.07,
    floatSpeed: 0.22,
    floatAmplitude: 0.03,
    corePulse: 0.05,
    corePulseSpeed: 0.72,
    ringCount: 4,
    ringTilt: 0.26,
    ringTwist: 0.36,
    connectionStride: 14,
    connectionOffset: 4,
    radius: 1.57,
    radiusJitter: 0.04
  },
  founder: {
    nodeCount: 132,
    pointColor: 0xc4b5fd,
    lineColor: 0xa78bfa,
    coreColor: 0xdb2777,
    ringColor: 0xf5d0fe,
    pointOpacity: 0.9,
    lineOpacity: 0.16,
    spinY: 0.0027,
    spinZ: 0.0015,
    waveSpeed: 0.66,
    waveAmplitude: 0.22,
    floatSpeed: 0.28,
    floatAmplitude: 0.12,
    corePulse: 0.14,
    corePulseSpeed: 1.08,
    ringCount: 2,
    ringTilt: 0.74,
    ringTwist: 1.02,
    connectionStride: 21,
    connectionOffset: 2,
    radius: 1.71,
    radiusJitter: 0.1
  },
  careers: {
    nodeCount: 165,
    pointColor: 0x86efac,
    lineColor: 0x34d399,
    coreColor: 0x22c55e,
    ringColor: 0xbbf7d0,
    pointOpacity: 0.88,
    lineOpacity: 0.18,
    spinY: 0.0033,
    spinZ: 0.001,
    waveSpeed: 0.88,
    waveAmplitude: 0.13,
    floatSpeed: 0.46,
    floatAmplitude: 0.08,
    corePulse: 0.1,
    corePulseSpeed: 1.4,
    ringCount: 3,
    ringTilt: 0.5,
    ringTwist: 0.65,
    connectionStride: 10,
    connectionOffset: 4,
    radius: 1.62,
    radiusJitter: 0.12
  },
  newsroom: {
    nodeCount: 148,
    pointColor: 0xfda4af,
    lineColor: 0xfb7185,
    coreColor: 0xbe123c,
    ringColor: 0xf9a8d4,
    pointOpacity: 0.88,
    lineOpacity: 0.15,
    spinY: 0.0029,
    spinZ: 0.0013,
    waveSpeed: 0.74,
    waveAmplitude: 0.11,
    floatSpeed: 0.4,
    floatAmplitude: 0.06,
    corePulse: 0.08,
    corePulseSpeed: 1.18,
    ringCount: 4,
    ringTilt: 0.6,
    ringTwist: 0.74,
    connectionStride: 16,
    connectionOffset: 7,
    radius: 1.59,
    radiusJitter: 0.08
  },
  documentation: {
    nodeCount: 176,
    pointColor: 0xbfdbfe,
    lineColor: 0x60a5fa,
    coreColor: 0x2563eb,
    ringColor: 0x93c5fd,
    pointOpacity: 0.9,
    lineOpacity: 0.13,
    spinY: 0.0019,
    spinZ: 0.0006,
    waveSpeed: 0.5,
    waveAmplitude: 0.06,
    floatSpeed: 0.2,
    floatAmplitude: 0.02,
    corePulse: 0.05,
    corePulseSpeed: 0.76,
    ringCount: 5,
    ringTilt: 0.18,
    ringTwist: 0.22,
    connectionStride: 12,
    connectionOffset: 5,
    radius: 1.55,
    radiusJitter: 0.03
  },
  contact: {
    nodeCount: 138,
    pointColor: 0xcffafe,
    lineColor: 0x67e8f9,
    coreColor: 0x38bdf8,
    ringColor: 0x93c5fd,
    pointOpacity: 0.9,
    lineOpacity: 0.17,
    spinY: 0.0022,
    spinZ: 0.0011,
    waveSpeed: 0.57,
    waveAmplitude: 0.17,
    floatSpeed: 0.35,
    floatAmplitude: 0.1,
    corePulse: 0.13,
    corePulseSpeed: 1.02,
    ringCount: 3,
    ringTilt: 0.46,
    ringTwist: 0.58,
    connectionStride: 18,
    connectionOffset: 3,
    radius: 1.66,
    radiusJitter: 0.08
  }
}

const pageHeroSphereVariants: Record<string, NeuralSphereVariant> = {
  Vision: 'vision',
  Technology: 'technology',
  'RIA Personal': 'personal',
  'RIA Enterprise': 'enterprise',
  'Use Cases': 'usecases',
  'Investor Relations': 'investor',
  Founder: 'founder',
  Careers: 'careers',
  Newsroom: 'newsroom',
  Documentation: 'documentation',
  Contact: 'contact'
}

function NeuralSphere({ compact = false, variant = 'default' }: { compact?: boolean; variant?: NeuralSphereVariant }) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const preset = neuralSpherePresets[variant]

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

      const nodeCount = compact ? Math.max(82, Math.round(preset.nodeCount * 0.62)) : preset.nodeCount
      const positions: number[] = []
      for (let index = 0; index < nodeCount; index += 1) {
        const phi = Math.acos(1 - (2 * (index + 0.5)) / nodeCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * index
        const radius = preset.radius + preset.radiusJitter * Math.sin(index * 1.7 + preset.waveSpeed)
        positions.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi))
      }

      const pointGeometry = new THREE.BufferGeometry()
      pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      const pointMaterial = new THREE.PointsMaterial({
        color: preset.pointColor,
        size: compact ? 0.035 : 0.045,
        transparent: true,
        opacity: preset.pointOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      group.add(new THREE.Points(pointGeometry, pointMaterial))

      const linePositions: number[] = []
      for (let index = 0; index < nodeCount; index += 1) {
        const target = (index + preset.connectionStride + (index % preset.connectionOffset)) % nodeCount
        linePositions.push(positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2], positions[target * 3], positions[target * 3 + 1], positions[target * 3 + 2])
      }
      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMaterial = new THREE.LineBasicMaterial({
        color: preset.lineColor,
        transparent: true,
        opacity: preset.lineOpacity,
        blending: THREE.AdditiveBlending
      })
      group.add(new THREE.LineSegments(lineGeometry, lineMaterial))

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.58, 32, 32),
        new THREE.MeshBasicMaterial({
          color: preset.coreColor,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending
        })
      )
      group.add(core)

      const ringMaterial = new THREE.LineBasicMaterial({ color: preset.ringColor, transparent: true, opacity: 0.24 })
      for (let index = 0; index < preset.ringCount; index += 1) {
        const ring = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(
            new THREE.EllipseCurve(0, 0, 1.92 + index * 0.24, 0.98 + index * 0.11, 0, Math.PI * 2, false, 0).getPoints(120)
          ),
          ringMaterial
        )
        ring.rotation.x = Math.PI / 2 + index * preset.ringTilt
        ring.rotation.y = index * preset.ringTwist
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
      const clockStart = performance.now()
      const animate = () => {
        const elapsed = (performance.now() - clockStart) * 0.001
        group.rotation.y += preset.spinY
        group.rotation.z += preset.spinZ
        group.rotation.x = Math.sin(elapsed * preset.waveSpeed) * preset.waveAmplitude
        group.position.y = Math.sin(elapsed * preset.floatSpeed) * preset.floatAmplitude
        const pulse = 1 + Math.sin(elapsed * preset.corePulseSpeed) * preset.corePulse
        core.scale.setScalar(pulse)
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
  }, [compact, preset])

  return (
    <div className={`neural-sphere neural-sphere-${variant} ${compact ? 'neural-sphere-compact' : ''}`}>
      <div ref={mountRef} className="h-full w-full" />
      <div className="neural-sphere-core" />
    </div>
  )
}

function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid w-full max-w-full min-w-0 gap-px overflow-hidden rounded-xl border border-white/10 bg-[rgb(255_255_255_/_0.06)] shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0 bg-[rgba(8,12,22,0.72)] p-5 backdrop-blur-md">
          <p className="text-2xl font-bold text-slate-100">{metric.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <Reveal className="section-intro-premium mx-auto max-w-3xl text-center">
      <p className="section-intro-eyebrow text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">{eyebrow}</p>
      <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">{copy}</p>
    </Reveal>
  )
}

function FeatureGrid({ items, columns = 'lg:grid-cols-3' }: { items: Feature[]; columns?: string }) {
  return (
    <div className={`feature-grid-premium grid gap-4 md:grid-cols-2 ${columns}`}>
      {items.map((item) => (
        <Reveal key={item.title} className="feature-card-premium group dark-glass-card p-6 transition hover:-translate-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="icon-shell grid h-12 w-12 place-items-center rounded-lg">
              <item.icon className="h-5 w-5" />
            </span>
            {item.meta && <span className="rounded-full border border-white/10 bg-[rgb(255_255_255_/_0.05)] px-3 py-1 text-xs font-semibold text-slate-400">{item.meta}</span>}
          </div>
          <h3 className="mt-8 text-xl font-bold text-slate-100">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{item.copy}</p>
        </Reveal>
      ))}
    </div>
  )
}

function PageHero({ eyebrow, title, copy, metrics, children }: { eyebrow: string; title: string; copy: string; metrics?: Metric[]; children?: ReactNode }) {
  const sphereVariant = pageHeroSphereVariants[eyebrow] ?? 'default'

  return (
    <section className="interior-page-hero relative overflow-hidden pt-32">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,100,200,0.08),transparent_32rem)]" />
      <div className="interior-page-hero-grid mx-auto grid max-w-[1500px] min-w-0 gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28">
        <Reveal className="relative z-10 min-w-0">
          <p className="interior-page-eyebrow text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">{eyebrow}</p>
          <h1 className="interior-page-title mt-6 max-w-[21rem] break-words text-5xl font-bold leading-[1.02] text-slate-100 sm:max-w-5xl sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="interior-page-copy mt-7 max-w-[21rem] break-words text-base leading-8 text-slate-400 sm:max-w-2xl sm:text-lg">{copy}</p>
          {metrics && (
            <div className="mt-10 max-w-[21rem] sm:max-w-none">
              <MetricStrip metrics={metrics} />
            </div>
          )}
        </Reveal>
        <Reveal className="relative min-h-[24rem] min-w-0 lg:min-h-[34rem]">
          {children ?? <NeuralSphere variant={sphereVariant} />}
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
              ? 'Investor brief: RIA creates a private AI operating system category by combining persistent memory, reflection, identity continuity, and enterprise decision intelligence. The moat compounds as the memory graph grows.'
              : 'Memory retrieval complete. I found three durable patterns: you are moving from reactive execution to strategic systems, your strongest work happens when goals are visible, and unresolved emotional loops reduce decision clarity. Recommended next action: convert the next 7 days into one measurable milestone and one reflection checkpoint.'
        }
      ])
      setThinking(false)
    }, 650)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
      <div className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Live RIA Simulation</p>
        <h3 className="mt-5 text-2xl font-bold text-slate-100">Talk to the persistent intelligence layer.</h3>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          This front-end simulation demonstrates memory retrieval, reflection summaries, and investor-grade product explanation while the production backend is prepared.
        </p>
        <div className="mt-6 grid gap-2">
          {[
            'Summarize my growth from the last 6 months',
            'Explain RIA to an investor',
            'Show my recurring beliefs',
            'Create a strategic plan for next week'
          ].map((prompt) => (
            <button key={prompt} type="button" onClick={() => send(prompt)} className="rounded-lg border border-white/10 bg-[rgb(255_255_255_/_0.04)] px-4 py-3 text-left text-sm text-slate-300 shadow-sm transition hover:border-cyan-300/25 hover:bg-[rgb(255_255_255_/_0.08)] hover:text-slate-100">
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[rgba(10,16,30,0.78)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.08] text-cyan-300">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-slate-100">RIA Cognitive Session</p>
              <p className="text-xs text-slate-500">Memory, reflection, belief, strategy</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 text-xs font-semibold text-emerald-300">Active</span>
        </div>
        <div className="mt-5 h-[24rem] overflow-y-auto pr-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-lg border p-4 text-sm leading-7 ${message.role === 'user' ? 'ml-auto border-cyan-300/20 bg-cyan-300/[0.08] text-slate-200 shadow-sm' : 'border-white/10 bg-[rgb(255_255_255_/_0.05)] text-slate-300 shadow-sm'}`}>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">{message.role === 'user' ? 'Visitor' : 'RIA'}</p>
                {message.text}
              </div>
            ))}
            {thinking && <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-sm text-slate-400 animate-pulse">Routing through memory, reflection, belief classification, and strategy...</div>}
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            send()
          }}
          className="mt-4 flex gap-3 rounded-lg border border-white/10 bg-black/30 p-3 shadow-sm"
        >
          <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-100 outline-none placeholder:text-slate-500" placeholder="Ask RIA..." />
          <button type="submit" className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.10] text-cyan-200 transition hover:bg-cyan-300/[0.16]" aria-label="Send message">
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
            className={`rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${selected.id === layer.id ? 'border-cyan-300/30 bg-cyan-300/[0.08]' : 'border-white/10 bg-[rgb(255_255_255_/_0.04)] hover:border-cyan-300/20 hover:bg-[rgb(255_255_255_/_0.07)]'}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300">
                <layer.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Layer {index + 1}</span>
            </div>
            <p className="mt-5 font-bold text-slate-100">{layer.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{layer.copy}</p>
          </button>
        ))}
      </div>
      <div className="architecture-console rounded-xl border border-white/10 bg-[rgba(10,16,30,0.78)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:sticky lg:top-28 lg:self-start">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <NeuralSphere compact />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Active Module</p>
            <h3 className="mt-4 text-2xl font-bold text-slate-100">{selected.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{selected.detail}</p>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-[rgb(255_255_255_/_0.06)]">
              {[
                ['System signal', selected.signal],
                ['Memory policy', 'Visible and editable'],
                ['Deployment path', 'Cloud, private, device'],
                ['Moat effect', 'Compounding context']
              ].map(([label, value]) => (
                <div key={label} className="bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Market Opportunity</p>
        <h3 className="mt-5 text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">Persistent intelligence can become a platform market.</h3>
        <p className="mt-5 text-base leading-8 text-slate-400">
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
          <div key={label as string} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.70)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
            <p className="text-4xl font-bold text-slate-100">
              <CountUp value={value as number} suffix={suffix as string} />
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">RIA OS Preview</p>
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

function ProblemSection() {
  const cards = [
    ['Category Thesis', 'Private intelligence should remember.', 'RIA is designed around persistent context, reflective reasoning, private execution, and long-term continuity.'],
    ['Product Proof', 'The system is visible.', 'Orbit dashboards, RIA Brain architecture, DefenseCore, Creative Studio, robotics, and infrastructure concepts show a real product universe.'],
    ['Launch Discipline', 'Access opens through a controlled gate.', `RIA keeps the ${riaReleaseDateShort} release path clear for users, partners, and early investor conversations.`],
    ['Company Focus', 'RIA is the product brand.', 'AION is the company identity while RIA carries the public app, OS layer, memory system, and product roadmap.']
  ]

  return (
    <section className="ria-section" id="problem">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">Company Thesis</p>
          <h2 className="ria-section-title">RIA is the app. RIA OS is the intelligence system inside it.</h2>
          <p className="ria-section-copy">RIA presents one clear product story: a private AI operating layer with memory, tools, command surfaces, launch discipline, and a roadmap big enough for personal, enterprise, creative, and embodied intelligence.</p>
        </Reveal>

        <div className="ria-problem-grid">
          {cards.map(([setup, title, copy]) => (
            <Reveal key={title} className="ria-glass-card ria-problem-card">
              <p>{setup}</p>
              <h3>{title}</h3>
              <span>{copy}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatIsSection() {
  const modules: Feature[] = [
    { title: 'RIA App', icon: Globe2, copy: 'The public entry point for launch access, product proof, investor inquiry, and future user onboarding.' },
    { title: 'RIA OS Lab', icon: Cpu, copy: 'The private operating system layer for memory, commands, dashboards, and local intelligence.' },
    { title: 'DefenseCore', icon: ShieldCheck, copy: 'A serious command surface with maps, intelligence panels, telemetry, and operational dashboards.' },
    { title: 'Creative Studio', icon: Sparkles, copy: 'A visual production layer for AI imagery, concepts, media, and product storytelling.' },
    { title: 'RIA Brain', icon: BrainCircuit, copy: 'The brain-structure identity asset for memory, reasoning, action, reflection, and evolution.' },
    { title: 'Launch Gate', icon: LockKeyhole, copy: `Controlled server availability begins after ${riaReleaseDateShort}.` },
    { title: 'Investor Surface', icon: Briefcase, copy: 'A premium studio presentation for partners, early users, and future investors.' },
    { title: 'Private Runtime', icon: Database, copy: 'A controlled private server and future desktop pathway instead of a toy landing page.' },
    { title: 'RIA Brand', icon: Building2, copy: 'A cleaner parent-company story: made in India, built for a global AI product category.' }
  ]

  return (
    <section className="ria-section" id="what-is">
      <div className="premium-container">
        <SectionIntro
          eyebrow="What RIA Is"
          title="A premium AI app and studio operating layer."
          copy="RIA is the public product experience from AION. RIA OS, RIA Brain, DefenseCore, Creative Studio, and the private server launch sit inside one coherent ecosystem."
        />
        <div className="ria-module-grid">
          <FeatureGrid items={modules} />
        </div>
      </div>
    </section>
  )
}

function ArchitectureBlueprint() {
  const nodes = [
    ['RIA User', 'The person entering through the public app and launch gateway.'],
    ['RIA Interface', 'Investor request path, server gate, dashboard, app shell, and product navigation.'],
    ['RIA Brain', 'Memory, reasoning, emotion, action, reflection, and evolution modules.'],
    ['RIA OS Runtime', 'Private intelligence workspace for commands, tools, and local systems.'],
    ['DefenseCore', 'Operational maps, intelligence streams, alerts, and command workflows.'],
    ['Creative Studio', 'Image, video, media, UI, code, and campaign production surface.'],
    ['Launch System', `${riaReleaseDate} gate, release notice, install path, and controlled access.`],
    ['AION Studio', 'Brand, investor surface, roadmap, and long-term category direction.']
  ]

  return (
    <section className="ria-section" id="architecture">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">RIA Brain Architecture</p>
          <h2 className="ria-section-title">The brain system becomes a premium visual asset.</h2>
          <p className="ria-section-copy">The uploaded RIA Brain structure is now part of the site narrative: RIA is the app, RIA Brain is the intelligence diagram, and RIA OS is the deeper operating layer.</p>
        </Reveal>

        <div className="aion-brain-layout">
          <Reveal className="aion-brain-media">
            <ImageShowcase image={aionVisuals.brainStructure} supportingImages={[aionVisuals.brainLogo, aionVisuals.ringMark]} />
          </Reveal>
          <div className="ria-blueprint">
            {nodes.map(([title, copy], index) => (
              <Reveal key={title} className="ria-blueprint-step">
                <div className="ria-blueprint-node">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                {index < nodes.length - 1 && <ArrowRight className="ria-blueprint-arrow" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TryRiaNow() {
  const cards: Feature[] = [
    { title: 'Investor Access', icon: Briefcase, copy: 'Before launch, serious inquiries move through the founder contact path.' },
    { title: 'Server Launch Gate', icon: LockKeyhole, copy: `Access starts after ${riaReleaseDateShort} with a clear private-build status and release path.` },
    { title: 'Product Proof', icon: Cloud, copy: 'RIA OS visuals, architecture, and module previews show the depth behind the public product.' },
    { title: 'Launch Assets', icon: Sparkles, copy: `${riaReleaseDate} materials support the release narrative without overwhelming the core product message.` },
    { title: 'RIA OS Preview', icon: Download, copy: 'Screenshots stay visible as product proof and future desktop direction.' }
  ]

  return (
    <section className="ria-section" id="try-now">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">Investor Access</p>
          <h2 className="ria-section-title">Request RIA access before the July 5 server opening.</h2>
          <p className="ria-section-copy">RIA stays gated until launch. Investors, partners, and early collaborators can request a direct founder conversation while the release path remains visible.</p>
        </Reveal>

        <div className="ria-try-grid">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} className="ria-glass-card ria-try-card">
                <Icon className="h-5 w-5" />
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="ria-section-actions">
          <Link to="/contact" className="premium-button premium-button-primary">
            Request Investor Access <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/download" className="premium-button premium-button-secondary">
            Launch Details <FileText className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function RiaOrbitSection() {
  const features = [
    'Private local memory',
    'Project-aware intelligence',
    'Teach-once memory',
    'Avatar and voice',
    'Software Studio',
    'Safe self-upgrade system',
    'Windows desktop build'
  ]

  return (
    <section className="ria-section" id="ria-orbit">
      <div className="premium-container ria-orbit-layout">
        <Reveal>
          <p className="premium-eyebrow">RIA Orbit</p>
          <h2 className="ria-section-title">RIA Orbit — Desktop Intelligence for Windows</h2>
          <p className="ria-section-copy">RIA Orbit is the first desktop body of RIA: a private AI workspace designed to run on your own machine with memory, tools, avatar, and local intelligence.</p>
          <div className="ria-orbit-features">
            {features.map((feature) => (
              <span key={feature}>
                <Check className="h-4 w-4" />
                {feature}
              </span>
            ))}
          </div>
          <div className="ria-section-actions">
            <Link to="/download" className="premium-button premium-button-primary">
              Download RIA Orbit <Download className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal className="ria-orbit-visual">
          <ImageShowcase image={riaVisuals.riaOsOrbitHero} supportingImages={[riaVisuals.orbitDashboard]} />
        </Reveal>
      </div>
    </section>
  )
}

function ProductJourney() {
  const steps = ['RIA Web App', 'RIA Orbit Desktop', 'Memory Universe', 'Avatar Intelligence', 'Full RIA OS Ecosystem']

  return (
    <section className="ria-section" id="product-journey">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">Product Journey</p>
          <h2 className="ria-section-title">From Web Preview to RIA OS</h2>
          <p className="ria-section-copy">The web app is the public entry point. RIA Orbit is the deeper desktop intelligence system with local memory, software studio, avatar, and private runtime.</p>
        </Reveal>

        <div className="ria-journey-flow">
          {steps.map((step, index) => (
            <Reveal key={step} className="ria-journey-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              {index < steps.length - 1 && <ArrowRight className="ria-journey-arrow" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function InvestorResearchSection() {
  const cards: Feature[] = [
    { title: 'Market Direction', icon: LineChart, copy: 'Personal intelligence is moving from disposable chat to persistent operating systems.' },
    { title: 'Technical Direction', icon: Cpu, copy: 'Memory, reasoning, autonomy, local AI, and knowledge graphs become one architecture.' },
    { title: 'Product Direction', icon: Rocket, copy: 'Web preview, desktop Orbit, avatar, voice, software tools, and safe evolution.' },
    { title: 'Long-Term Vision', icon: Globe2, copy: 'A private intelligence ecosystem for life, work, research, creativity, and growth.' }
  ]

  return (
    <section className="ria-section" id="investor-research">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">Investor / Research</p>
          <h2 className="ria-section-title">A New Category of Memory-Driven Personal Intelligence</h2>
          <p className="ria-section-copy">RIA is not another chatbot. It is a persistent intelligence ecosystem combining memory, reasoning, autonomy, local AI, knowledge graphs, software tools, and safe evolution.</p>
        </Reveal>

        <FeatureGrid items={cards} columns="lg:grid-cols-4" />
        <div className="ria-section-actions">
          <Link to="/investors" className="premium-button premium-button-primary">
            Request Investor Brief <FileText className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function TrustNote() {
  return (
    <section className="ria-trust-note" id="trust-note">
      <div className="premium-container">
        <div>
          <strong>Early public preview.</strong>
          <span>This is an early public preview. Features may evolve as RIA grows toward the full RIA OS ecosystem.</span>
        </div>
      </div>
    </section>
  )
}

function PublicDownloadSection() {
  return (
    <section className="ria-section" id="public-download">
      <div className="premium-container">
        <Reveal className="ria-download-callout">
          <div>
            <p className="premium-eyebrow">Release Gate</p>
            <h2 className="ria-section-title">RIA Orbit public desktop release.</h2>
            <p className="ria-section-copy">The public desktop package is positioned as a controlled launch: clear date, private build status, local-first runtime notes, and direct access requests for serious partners before release.</p>
          </div>
          <div className="ria-release-date">
            <span>Server Opens</span>
            <strong>{riaReleaseDate}</strong>
            <p>Made in India. Built for the World.</p>
            <Link to="/download" className="premium-button premium-button-primary">
              View Launch Gate <Download className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function RoadmapSection() {
  const steps = [
    ['Phase 1', 'RIA Orbit Desktop'],
    ['Phase 2', 'Memory Universe'],
    ['Phase 3', 'Avatar Intelligence'],
    ['Phase 4', 'Software Studio'],
    ['Phase 5', 'Autonomous Personal Intelligence'],
    ['Phase 6', 'RIA OS Ecosystem']
  ]

  return (
    <section className="ria-section" id="roadmap">
      <div className="premium-container">
        <Reveal>
          <p className="premium-eyebrow">Roadmap</p>
          <h2 className="ria-section-title">RIA OS Roadmap</h2>
          <p className="ria-section-copy">A clean staged path from desktop intelligence to a full private personal intelligence operating system.</p>
        </Reveal>

        <div className="ria-roadmap-grid">
          {steps.map(([phase, title]) => (
            <Reveal key={phase} className="ria-glass-card ria-roadmap-card">
              <p>{phase}</p>
              <h3>{title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand({ title, copy, primary = 'Request Investor Brief', secondary = 'Schedule Meeting' }: { title: string; copy: string; primary?: string; secondary?: string }) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-xl border border-white/10 bg-[rgba(8,12,22,0.76)] p-8 shadow-[0_26px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.10),transparent_24rem),radial-gradient(circle_at_20%_70%,rgba(59,130,246,0.08),transparent_22rem)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">RIA</p>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-100 sm:text-5xl">{title}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">{copy}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.10] px-5 py-3 text-sm font-semibold text-cyan-100 shadow-md transition hover:bg-cyan-300/[0.16]">
                {primary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/download" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[rgb(255_255_255_/_0.05)] px-5 py-3 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-white/20 hover:bg-[rgb(255_255_255_/_0.08)]">
                {secondary} <Download className="h-4 w-4" />
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
        <a key={item.title} href={item.href} className="group dark-glass-card p-6 transition hover:-translate-y-1 block">
          <span className="icon-shell grid h-12 w-12 place-items-center rounded-lg">
            <FileText className="h-5 w-5" />
          </span>
          <h3 className="mt-8 text-lg font-bold text-slate-100">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{item.copy}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300">
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
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-400">Download & Run RIA</p>
              <h2>Download & Run RIA</h2>
              <p>
                RIA is not a simple chatbot. It is a local-first cognitive workspace for memory, reasoning, web research, creative generation, goals, tools, and system awareness. Developers can clone the repository, install dependencies, and run the frontend and backend locally.
              </p>
              <div className="ria-download-actions">
                <span className="ria-download-badge">Local First</span>
                <span className="ria-download-badge">GitHub</span>
                <span className="ria-download-badge">Developer Preview</span>
                <span className="ria-download-badge">Windows Ready</span>
              </div>
            </div>
            <div className="ria-release-status" aria-label="RIA developer install guide">
              <span>Developer Guide</span>
              <strong>GitHub source install</strong>
              <p>Clone the RIA repository, install dependencies, and run the backend and frontend locally with standard Node and Vite tooling.</p>
            </div>
          </div>

          <div className="ria-download-grid">
            <div className="ria-download-card">
              <Download className="h-5 w-5 text-cyan-400" />
              <strong>Requirements</strong>
              <span>Windows 10/11 recommended</span>
              <span>Node.js 20+ or latest LTS</span>
              <span>Git installed</span>
              <span>8 GB RAM minimum, 16 GB+ recommended</span>
              <span>NVIDIA GPU optional for local AI acceleration</span>
              <span>Internet required only for setup and updates</span>
            </div>
            <div className="ria-download-card ria-download-terminal-card">
              <Download className="h-5 w-5 text-cyan-400" />
              <strong>Download from GitHub</strong>
              <div className="code-block">git clone https://github.com/S31AONSW251/RIA.git</div>
              <div className="code-block">cd RIA</div>
            </div>
            <div className="ria-download-card ria-download-terminal-card">
              <Download className="h-5 w-5 text-cyan-400" />
              <strong>Install Backend</strong>
              <div className="code-block">cd backend</div>
              <div className="code-block">npm install</div>
              <div className="code-block">npm run dev</div>
              <span>Backend usually runs on local API port such as 3001.</span>
            </div>
            <div className="ria-download-card ria-download-terminal-card">
              <Download className="h-5 w-5 text-cyan-400" />
              <strong>Install Frontend</strong>
              <div className="code-block">cd frontend</div>
              <div className="code-block">npm install</div>
              <div className="code-block">npm run dev</div>
              <span>Open the local Vite URL shown in the terminal, usually:</span>
              <span>http://localhost:5173</span>
            </div>
          </div>

          <div className="ria-release-body">
            <div className="ria-release-console">
              <div className="code-console-bar">
                <span />
                <span />
                <span />
              </div>
              <pre>{`# GitHub source install
git clone https://github.com/S31AONSW251/RIA.git
cd RIA

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

# One-click launcher
Start-RIA-OneClick.bat
Stop-RIA-OneClick.bat`}</pre>
            </div>
            <div className="ria-release-list">
              <p>Install Notes</p>
              <div>
                <strong>One-Click Launcher</strong>
                <span>If available, users can run Start-RIA-OneClick.bat and stop it with Stop-RIA-OneClick.bat.</span>
              </div>
              <div>
                <strong>GitHub Repository</strong>
                <span>View RIA on GitHub to inspect source, contribute, and track updates.</span>
                <a href="https://github.com/S31AONSW251/RIA" target="_blank" rel="noreferrer" className="ria-download-link secondary">View RIA on GitHub</a>
              </div>
              <div>
                <strong>Developer Note</strong>
                <span>RIA is local-first. Some advanced features may require local models, API keys, GPU tools, or additional setup depending on the module.</span>
              </div>
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
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const organization = String(data.get('organization') || '').trim()
    const type = String(data.get('type') || intent).trim()
    const message = String(data.get('message') || '').trim()
    const subject = encodeURIComponent(`RIA inquiry: ${type || intent}`)
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : 'Organization: Not provided',
      `Inquiry type: ${type || intent}`,
      '',
      message
    ].join('\n'))

    setSubmitted(true)
    const mailto = `mailto:${contact.email}?subject=${subject}&body=${body}`
    const opened = window.open(mailto, '_blank', 'noopener,noreferrer')
    if (!opened) window.location.href = mailto
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-white/10 bg-[rgba(8,12,22,0.76)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.40)] backdrop-blur-2xl sm:p-6">
      <input type="hidden" name="intent" value={intent} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Name
          <input required name="name" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/30 focus:bg-black/40" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Email
          <input required type="email" name="email" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/30 focus:bg-black/40" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Organization
          <input name="organization" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/30 focus:bg-black/40" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Inquiry Type
          <select name="type" defaultValue={intent} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/30 focus:bg-black/40">
            <option>Investor meeting</option>
            <option>Enterprise inquiry</option>
            <option>Partnership</option>
            <option>Careers</option>
            <option>General inquiry</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-300">
        Message
        <textarea required name="message" rows={5} className="resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/30 focus:bg-black/40" />
      </label>
      <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.10] px-5 py-3 text-sm font-semibold text-cyan-100 shadow-md transition hover:bg-cyan-300/[0.16]">
        Prepare Email Request <SendHorizontal className="h-4 w-4" />
      </button>
      {submitted && (
        <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm text-emerald-300 font-semibold shadow-sm">
          Your email draft is prepared for direct founder contact. Send it from your mail app so the request reaches RIA.
        </p>
      )}
    </form>
  )
}

type PremiumImageAsset = {
  src: string
  alt: string
  srcSet?: string
  sizes?: string
}

type PremiumFeature = {
  title: string
  copy: string
  icon: LucideIcon
}

type PremiumProductSection = {
  id: string
  eyebrow: string
  title: string
  copy: string
  image: PremiumImageAsset
  cards: PremiumFeature[]
  supportingImages?: PremiumImageAsset[]
  reverse?: boolean
}

const riaVisuals = {
  humanoidPortrait: {
    src: '/assets/ria/humanoid-portrait.jpg',
    alt: 'White RIA humanoid robotics concept with interface overlays'
  },
  chipInfrastructure: {
    src: '/assets/ria/chip-infrastructure-vision.jpg',
    alt: 'RIA AI infrastructure chip concept with dark technical interface'
  },
  officeLabWide: {
    src: '/assets/ria/ria-office-lab-wide.jpg',
    alt: 'RIA office and robotics laboratory with engineers working'
  },
  roboticsWorkshopDesk: {
    src: '/assets/ria/robotics-workshop-desk.jpg',
    alt: 'RIA robotics workshop desk with humanoid prototype and development hardware'
  },
  companyHeroHumanoid: {
    src: '/assets/ria/company-hero-humanoid.jpg',
    alt: 'RIA company hero page with humanoid robot and dark lab environment'
  },
  companyHeroHumanoidAlt: {
    src: '/assets/ria/company-hero-humanoid-alt.jpg',
    alt: 'Alternative RIA company hero visual with humanoid robot and laboratory'
  },
  roboticsLabBench: {
    src: '/assets/ria/robotics-lab-bench.jpg',
    alt: 'RIA robotics lab bench with humanoid robot, monitors, and tools'
  },
  humanoidSystemBoard: {
    src: '/assets/ria/humanoid-system-board.jpg',
    alt: 'RIA humanoid robotics system board with modular technical views'
  },
  humanoidSystemBoardAlt: {
    src: '/assets/ria/humanoid-system-board-alt.jpg',
    alt: 'RIA humanoid robotics system board with engineering panels'
  },
  commandGrid: {
    src: '/assets/ria/ria-command-grid.jpg',
    alt: 'RIA command grid interface showing multi-panel operations'
  },
  riaOsOrbitHero: {
    src: '/assets/ria/ria-os-orbit-hero.jpg',
    alt: 'RIA OS Orbit dashboard hero screen in a premium dark interface'
  },
  cryptoCore: {
    src: '/assets/ria/crypto-core-dashboard.jpg',
    alt: 'RIA Crypto Core dashboard showing private compute monitoring'
  },
  missionControl: {
    src: '/assets/ria/mission-control-orbit-room.jpg',
    alt: 'RIA Orbit mission control dashboard in a cinematic command room'
  },
  orbitDashboard: {
    src: '/assets/ria/orbit-dashboard-desktop.jpg',
    alt: 'RIA Orbit desktop dashboard with telemetry and mission panels'
  },
  companyMosaic: {
    src: '/assets/ria/ria-os-company-mosaic.jpg',
    alt: 'RIA OS company website mosaic with product panels and brand visuals'
  },
  companyMosaicAlt: {
    src: '/assets/ria/ria-os-company-mosaic-alt.jpg',
    alt: 'Alternative RIA OS company mosaic with operating system panels'
  },
  companyMosaicDetail: {
    src: '/assets/ria/ria-os-company-mosaic-detail.jpg',
    alt: 'Detailed RIA OS mosaic showing dashboard modules and premium sections'
  },
  automotive: {
    src: '/assets/ria/automotive-engineering-dashboard.jpg',
    alt: 'RIA automotive and engineering dashboard with vehicle design intelligence'
  },
  automotiveAlt: {
    src: '/assets/ria/automotive-engineering-dashboard-alt.jpg',
    alt: 'Alternative RIA automotive engineering dashboard with simulation panels'
  },
  villageImpact: {
    src: '/assets/ria/village-impact-transformation.jpg',
    alt: 'RIA village transformation concept showing real-world infrastructure impact'
  },
  creativeStudio: {
    src: '/assets/ria/creative-studio-grid.jpg',
    alt: 'RIA Creative Studio with generated image, video, and asset panels'
  },
  creativeStudioAlt: {
    src: '/assets/ria/creative-studio-grid-alt.jpg',
    alt: 'Alternative RIA Creative Studio command center with media panels'
  },
  softwareStudio: {
    src: '/assets/ria/software-studio-command-center.jpg',
    alt: 'RIA Software Studio command center with agent workspaces and build panels'
  }
} satisfies Record<string, PremiumImageAsset>

const aionVisuals = {
  defensecoreDashboard: {
    src: assets.aion.hero,
    alt: 'AION DefenseCore dashboard with satellite intelligence and command panels'
  },
  defensecoreCommand: {
    src: assets.aion.command,
    alt: 'AION DefenseCore command screen with operational metrics and intelligence cards'
  },
  creativeWall: {
    src: assets.aion.creativeWall,
    alt: 'RIA cinematic creative intelligence wall with generated visual assets'
  },
  creativeStudio: {
    src: assets.aion.creativeStudio,
    alt: 'RIA Creative Studio dashboard with media generation panels'
  },
  brainLogo: {
    src: assets.aion.brainLogo,
    alt: 'RIA brain logo designed for the RIA intelligence system'
  },
  brainStructure: {
    src: assets.aion.brainStructure,
    alt: 'RIA brain structure poster with intelligence modules and system diagram'
  },
  launchPoster: {
    src: assets.aion.launchPoster,
    alt: 'RIA launch poster announcing July 5, 2026'
  },
  ringMark: {
    src: assets.aion.ringMark,
    alt: 'RIA ring mark on a dark energy field'
  }
} satisfies Record<string, PremiumImageAsset>

const heroBadges = ['Private AI', 'Persistent Memory', 'RIA OS Lab', 'DefenseCore', 'Creative Studio', 'Founder-Led', '5 Jul', 'AION']
const riaCoreLabels = ['Memory', 'Reasoning', 'Reflection', 'Autonomy', 'Knowledge', 'Software', 'Avatar', 'Evolution']

const premiumSections: PremiumProductSection[] = [
  {
    id: 'ria-orbit-command',
    eyebrow: 'RIA Orbit',
    title: 'The command layer of RIA OS.',
    copy: 'Orbit is where memory, tools, agents, telemetry, missions, and intelligence operate together.',
    image: riaVisuals.orbitDashboard,
    supportingImages: [riaVisuals.missionControl, riaVisuals.commandGrid],
    cards: [
      { title: 'Ask RIA', copy: 'A direct command line for questions, tasks, plans, and project state.', icon: MessageCircle },
      { title: 'Mission Control', copy: 'Plan and supervise complex work from a single operational surface.', icon: Target },
      { title: 'Memory Center', copy: 'Keep project context, decisions, logs, and knowledge available.', icon: Database },
      { title: 'GPU Studio', copy: 'Monitor creative and model workloads with hardware-aware settings.', icon: Cpu },
      { title: 'Tools', copy: 'Connect builders, files, workflows, and local automation modules.', icon: SquareTerminal },
      { title: 'Evolution History', copy: 'Track changes, reflections, and system improvements over time.', icon: LineChart },
      { title: 'System Telemetry', copy: 'See health, resources, queue state, and operating signals clearly.', icon: Gauge }
    ]
  },
  {
    id: 'mission-control',
    eyebrow: 'Mission Control',
    title: 'Plan, approve, execute, and track complex missions.',
    copy: 'RIA keeps autonomy structured around review, context, safety, and visible progress.',
    image: riaVisuals.missionControl,
    supportingImages: [riaVisuals.companyMosaic],
    reverse: true,
    cards: [
      { title: 'Autonomous Strategy', copy: 'Generate practical plans from goals, files, history, and constraints.', icon: Compass },
      { title: 'Approval First', copy: 'Keep the human in control before sensitive actions are taken.', icon: ClipboardCheck },
      { title: 'Activity Stream', copy: 'Show what changed, what ran, what failed, and what needs review.', icon: Activity },
      { title: 'Workspace Awareness', copy: 'Understand the active project without losing local context.', icon: Layers3 },
      { title: 'Safe Command Loop', copy: 'Route actions through visible checks and recoverable steps.', icon: ShieldCheck },
      { title: 'Human Control', copy: 'Use autonomy as a supervised operating mode, not a black box.', icon: UsersRound }
    ]
  },
  {
    id: 'software-studio',
    eyebrow: 'Software Studio',
    title: 'From command to creation.',
    copy: 'Tell RIA what to build. RIA plans, edits, tests, reviews, and ships software with agent collaboration.',
    image: riaVisuals.softwareStudio,
    supportingImages: [riaVisuals.commandGrid, riaVisuals.companyMosaicDetail],
    cards: [
      { title: 'Architect Agent', copy: 'Break the request into architecture, risks, and implementation phases.', icon: Layers3 },
      { title: 'Backend Agent', copy: 'Design APIs, data paths, services, and integration behavior.', icon: Database },
      { title: 'Frontend Agent', copy: 'Build responsive interfaces with product-grade states and flows.', icon: Sparkles },
      { title: 'QA Agent', copy: 'Run checks, inspect failures, and protect working behavior.', icon: ClipboardCheck },
      { title: 'Security Agent', copy: 'Surface risky changes, secrets, permissions, and unsafe assumptions.', icon: ShieldCheck },
      { title: 'Compiler Output', copy: 'Keep build, test, and review results visible beside the mission.', icon: SquareTerminal },
      { title: 'Project Health', copy: 'Summarize readiness, debt, blockers, and next decisions.', icon: Gauge },
      { title: 'Risk Signals', copy: 'Call out uncertainty before it becomes production damage.', icon: Eye }
    ]
  },
  {
    id: 'creative-studio',
    eyebrow: 'Creative Studio',
    title: 'A creative command center for media and product work.',
    copy: 'Generate hyperrealistic images, video concepts, 3D assets, audio, UI, code, and publish-ready assets from one workspace.',
    image: riaVisuals.creativeStudio,
    supportingImages: [riaVisuals.creativeStudioAlt],
    reverse: true,
    cards: [
      { title: 'Image Generation', copy: 'Create visual directions, scenes, assets, and product imagery.', icon: Sparkles },
      { title: 'Video Generation', copy: 'Shape concepts, storyboards, shots, and moving-image workflows.', icon: Play },
      { title: '3D Creation', copy: 'Prepare asset ideas, model briefs, and scene structure.', icon: Layers3 },
      { title: 'Audio Generation', copy: 'Design voice, sound, and media production prompts.', icon: Mic2 },
      { title: 'Code Generation', copy: 'Turn creative intent into UI, scripts, and working software.', icon: Code2 },
      { title: 'Asset Library', copy: 'Organize generated media into reusable project context.', icon: BookOpen },
      { title: 'Publish Workflow', copy: 'Move from prompt to review to delivery with fewer handoffs.', icon: Rocket }
    ]
  },
  {
    id: 'memory-core',
    eyebrow: 'Memory And Knowledge',
    title: 'A living knowledge universe for long-running work.',
    copy: 'RIA remembers context, learns from projects, and connects knowledge across missions, people, and decisions.',
    image: riaVisuals.companyMosaicAlt,
    supportingImages: [riaVisuals.companyMosaicDetail, riaVisuals.riaOsOrbitHero],
    cards: [
      { title: 'Core Memory', copy: 'Persist important context with visible user control.', icon: Database },
      { title: 'Knowledge Sources', copy: 'Connect documents, logs, notes, projects, and system state.', icon: BookOpen },
      { title: 'Reflection', copy: 'Turn activity into summaries, decisions, and next moves.', icon: Orbit },
      { title: 'Journal / Logs', copy: 'Track what happened and why it mattered.', icon: FileText },
      { title: 'Project Memory', copy: 'Carry product intent and constraints across sessions.', icon: Target },
      { title: 'AI Continuity', copy: 'Keep a consistent private operating context over time.', icon: Fingerprint }
    ]
  },
  {
    id: 'humanoid-robotics',
    eyebrow: 'Humanoid + Robotics',
    title: 'Embodied intelligence beyond the screen.',
    copy: 'RIA extends into robotics, automation, perception, and real-world task execution as a research and control layer.',
    image: riaVisuals.humanoidPortrait,
    supportingImages: [
      riaVisuals.humanoidSystemBoard,
      riaVisuals.humanoidSystemBoardAlt,
      riaVisuals.roboticsLabBench,
      riaVisuals.roboticsWorkshopDesk,
      riaVisuals.companyHeroHumanoid,
      riaVisuals.companyHeroHumanoidAlt
    ],
    reverse: true,
    cards: [
      { title: 'Human Interaction', copy: 'Design natural interaction loops for embodied systems.', icon: UsersRound },
      { title: 'Real-Time Perception', copy: 'Connect sensors, vision, and context-aware feedback.', icon: Eye },
      { title: 'Adaptive Movement', copy: 'Support motion planning concepts and control research.', icon: Activity },
      { title: 'Robot Control Layer', copy: 'Bridge commands, policies, tools, and physical execution.', icon: SquareTerminal },
      { title: 'Industrial Automation', copy: 'Coordinate repetitive work with supervision and telemetry.', icon: Building2 },
      { title: 'Research Platform', copy: 'Keep prototypes, experiments, and observations organized.', icon: Lightbulb }
    ]
  },
  {
    id: 'automotive-engineering',
    eyebrow: 'Automotive & Engineering',
    title: 'Vehicle engineering from concept to optimization.',
    copy: 'RIA supports simulation, design intelligence, digital twins, testing, production planning, and maintenance insight.',
    image: riaVisuals.automotive,
    supportingImages: [riaVisuals.automotiveAlt],
    cards: [
      { title: 'Concept & Design', copy: 'Shape vehicle ideas, systems, and product requirements.', icon: Lightbulb },
      { title: 'Engineering Simulation', copy: 'Organize models, constraints, and technical tradeoffs.', icon: Cpu },
      { title: 'Validation & Testing', copy: 'Track experiments, evidence, and readiness signals.', icon: ClipboardCheck },
      { title: 'Production Optimization', copy: 'Improve processes, schedules, and resource planning.', icon: Gauge },
      { title: 'Aftermarket Insights', copy: 'Connect usage data and customer feedback loops.', icon: BarChart3 },
      { title: 'Predictive Maintenance', copy: 'Spot service patterns and risk before failure.', icon: Activity }
    ]
  },
  {
    id: 'ai-infrastructure',
    eyebrow: 'AI Infrastructure / Chip Vision',
    title: 'A full-stack AI roadmap with hardware-aware architecture.',
    copy: 'RIA is designed as a software, model, GPU workflow, infrastructure, robotics, and future silicon concept ecosystem.',
    image: riaVisuals.chipInfrastructure,
    supportingImages: [riaVisuals.officeLabWide],
    reverse: true,
    cards: [
      { title: 'AI Models', copy: 'Coordinate private model workflows and capability modules.', icon: BrainCircuit },
      { title: 'GPU Compute', copy: 'Plan generation, inference, and optimization around real hardware.', icon: Cpu },
      { title: 'Secure Infrastructure', copy: 'Keep private deployments, access, and auditability in the design.', icon: ShieldCheck },
      { title: 'Edge-to-Cloud', copy: 'Support local-first systems with scalable deployment options.', icon: Cloud },
      { title: 'Robotics Stack', copy: 'Connect software intelligence to future embodied control layers.', icon: Network },
      { title: 'Future Silicon Design', copy: 'Explore chip design vision and hardware-aware AI architecture.', icon: Cpu }
    ]
  },
  {
    id: 'real-world-impact',
    eyebrow: 'Real-World Impact',
    title: 'Built to solve problems outside the dashboard.',
    copy: 'RIA is aimed at education, healthcare, agriculture, infrastructure, governance, and local economy workflows.',
    image: riaVisuals.villageImpact,
    supportingImages: [riaVisuals.officeLabWide],
    cards: [
      { title: 'AI Education', copy: 'Personalized learning, tutoring, and skill development.', icon: GraduationCap },
      { title: 'Smart Farming', copy: 'Planning support for crops, soil, weather, and resources.', icon: Globe2 },
      { title: 'Healthcare Access', copy: 'Organize knowledge, triage workflows, and care coordination.', icon: HeartPulse },
      { title: 'Clean Energy', copy: 'Support local planning, monitoring, and optimization.', icon: Zap },
      { title: 'Digital Connectivity', copy: 'Bring tools, knowledge, and services into one local layer.', icon: Network },
      { title: 'Local Business Growth', copy: 'Help small teams plan, market, operate, and learn.', icon: Briefcase }
    ]
  },
  {
    id: 'crypto-core',
    eyebrow: 'Crypto Core',
    title: 'Optional private resource control, not financial hype.',
    copy: 'Crypto Core is an optional resource module for controlled, private, user-owned compute contribution and system optimization.',
    image: riaVisuals.cryptoCore,
    reverse: true,
    cards: [
      { title: 'Optional Module', copy: 'Keep the feature separate and user controlled.', icon: CircleDollarSign },
      { title: 'Transparent Monitoring', copy: 'Show load, temperature, status, and resource state.', icon: Gauge },
      { title: 'Privacy-First Control', copy: 'Keep configuration user-owned and explicit.', icon: LockKeyhole },
      { title: 'System-Aware Compute', copy: 'Respect local performance and safety constraints.', icon: Cpu },
      { title: 'User-Owned Settings', copy: 'Avoid hidden behavior and investment-style promises.', icon: KeyRound },
      { title: 'Safety Gates', copy: 'Pause, review, and monitor before running heavy workloads.', icon: ShieldCheck }
    ]
  },
  {
    id: 'company-investor',
    eyebrow: 'Company / Investor',
    title: 'A private AI operating system for serious builders.',
    copy: 'RIA is building the next layer of intelligence for creators, builders, researchers, businesses, and future robotics.',
    image: riaVisuals.officeLabWide,
    supportingImages: [riaVisuals.roboticsLabBench, riaVisuals.companyHeroHumanoid],
    cards: [
      { title: 'Founder', copy: 'Founded by Sudeep Bala around the Beyond Intelligence mission.', icon: Fingerprint },
      { title: 'Private AI', copy: 'Designed for local ownership, controlled deployments, and inspectable systems.', icon: ShieldCheck },
      { title: 'AI OS Category', copy: 'Positioned as a multi-domain operating layer, not a single chatbot.', icon: Cpu },
      { title: 'Research Direction', copy: 'Memory, agents, media, software, robotics, and infrastructure.', icon: Lightbulb },
      { title: 'Partner Ready', copy: 'Prepared for investor, enterprise, and research conversations.', icon: Briefcase },
      { title: 'Built To Evolve', copy: 'Roadmap language stays ambitious without claiming finished hardware or impossible guarantees.', icon: Rocket }
    ]
  }
]

function PremiumImage({
  image,
  className = '',
  loading = 'lazy',
  sizes,
  fetchPriority
}: {
  image: PremiumImageAsset
  className?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes || image.sizes || '(max-width: 767px) 92vw, 50vw'}
      alt={image.alt}
      className={className}
      loading={loading}
      decoding={loading === 'eager' ? 'sync' : 'async'}
      fetchPriority={fetchPriority}
      onError={(event) => {
        const img = event.currentTarget
        if (img.dataset.fallbackApplied === 'true') return
        img.dataset.fallbackApplied = 'true'
        img.src = assets.hero
      }}
    />
  )
}

function ProductProofSection() {
  return (
    <section className="home-section product-proof-section" id="chapter-knowledge">
      <div className="premium-container">
        <Reveal className="home-section-heading">
          <p className="premium-eyebrow">Chapter 03 / Knowledge Universe</p>
          <h2>Eyes / Knowledge Universe</h2>
          <p>
            Connects context, documents, learned information, and external knowledge into one searchable intelligence field.
          </p>
        </Reveal>

        <Reveal><ProductBento /></Reveal>
      </div>
    </section>
  )
}

function PremiumArchitectureSection() {
  return (
    <section className="home-section architecture-loop-section" id="chapter-memory">
      <div className="premium-container">
        <Reveal className="home-section-heading home-section-heading-split">
          <div>
            <p className="premium-eyebrow">Chapter 04 / Memory Core</p>
            <h2 className="holograph-brain-title">Chest / Memory Core</h2>
          </div>
          <p>
            Stores durable context across projects, decisions, identity, goals, and time.
          </p>
        </Reveal>

        <Reveal><ArchitectureBlueprintVisual /></Reveal>
      </div>
    </section>
  )
}

function IntelligenceDefinitionSection() {
  const capabilities = [
    ['Memory', 'Builds durable context across goals, projects, decisions, and time.', Database],
    ['Reasoning', 'Connects evidence, constraints, and intent before proposing a path.', BrainCircuit],
    ['Action', 'Routes approved work through tools and visible execution states.', Zap],
    ['Reflection', 'Reviews outcomes and improves future decisions without hiding the process.', Orbit]
  ] as const

  const comparisons = [
    ['Responds to prompts', 'Builds memory over time'],
    ['Forgets long-term context', 'Connects projects, goals, and knowledge'],
    ['Cloud-first by default', 'Local-first and private-focused'],
    ['Mostly passive', 'Plans and proposes action'],
    ['One chat window', 'Works as an intelligence workspace'],
    ['Generic assistant', 'Personal intelligence architecture']
  ]

  return (
    <section className="home-section intelligence-definition" id="chapter-brain">
      <div className="premium-container">
        <Reveal className="home-section-heading home-section-heading-split">
          <div>
            <p className="premium-eyebrow">Chapter 02 / Executive Cortex</p>
            <h2>Brain / Executive Cortex</h2>
          </div>
          <p>Plans, prioritizes, and coordinates reasoning across goals, memory, tools, and constraints.</p>
        </Reveal>

        <div className="intelligence-capability-grid">
          {capabilities.map(([title, copy, Icon], index) => (
            <Reveal className="intelligence-capability glass-card" key={title} style={{ '--item-index': index } as CSSProperties}>
              <span><Icon className="h-4 w-4" /></span>
              <small>0{index + 1}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="comparison-system">
          <div className="comparison-system-head">
            <p className="premium-eyebrow">Comparison / Category shift</p>
            <h3>A chatbot answers. RIA compounds intelligence.</h3>
            <span>Two fundamentally different system models.</span>
          </div>
          <div className="comparison-panel-grid">
            <article className="comparison-panel comparison-panel-chatbot">
              <div className="comparison-panel-head"><span>STANDARD MODEL</span><strong>AI Chatbot</strong><small>Session-based assistant</small></div>
              <div className="comparison-panel-list">
                {comparisons.map(([standard], index) => <p key={standard}><i>{String(index + 1).padStart(2, '0')}</i><X />{standard}</p>)}
              </div>
              <div className="comparison-panel-state"><i /> Context expires with the session</div>
            </article>
            <article className="comparison-panel comparison-panel-ria">
              <div className="comparison-panel-aura" aria-hidden="true" />
              <div className="comparison-panel-head"><span>INTELLIGENCE ARCHITECTURE</span><strong>RIA</strong><small>Persistent private system</small></div>
              <div className="comparison-panel-list">
                {comparisons.map(([, ria], index) => <p key={ria}><i>{String(index + 1).padStart(2, '0')}</i><Check />{ria}</p>)}
              </div>
              <div className="comparison-panel-state"><i /> Intelligence compounds over time</div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PrivacyAutonomySection() {
  const pillars = [
    ['Local-first direction', 'Designed to keep intelligence close to the owner and reduce unnecessary dependence on remote infrastructure.', Cpu],
    ['Private memory architecture', 'Personal and project memory is treated as protected context, not disposable chat history.', LockKeyhole],
    ['Approval-based autonomy', 'Important actions stay behind visible permission and review gates.', ShieldCheck]
  ] as const
  const flow = ['Observe', 'Think', 'Propose', 'Ask permission', 'Act', 'Reflect']

  return (
    <>
      <section className="home-section privacy-autonomy-section" id="chapter-reflection">
        <div className="premium-container">
          <div className="privacy-grid">
            <Reveal className="privacy-copy">
              <p className="premium-eyebrow">Chapter 05 / Reflection Loop</p>
              <h2>Heart / Reflection Loop</h2>
              <p>Reviews outcomes, learns from mistakes, and improves future behavior without hiding the process.</p>
              <div className="privacy-assurance">
                <Fingerprint className="h-5 w-5" />
                <span>
                  <strong>Constant Self-Correction</strong>
                  <small>Outcome reviews, temporal memory classification, and system alignment operate transparently.</small>
                </span>
              </div>
            </Reveal>
            <div className="privacy-pillars">
              {pillars.map(([title, copy, Icon], index) => (
                <Reveal className="privacy-pillar glass-card" key={title}>
                  <span>0{index + 1}</span>
                  <Icon className="h-5 w-5" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section autonomy-section" id="chapter-reasoning">
        <div className="premium-container">
          <Reveal className="autonomy-flow-panel glass-panel">
            <div className="autonomy-flow-copy">
              <p className="premium-eyebrow">Chapter 06 / Reasoning Pipeline</p>
              <h3>Spine / Reasoning Pipeline</h3>
              <p>Moves intent through planning, evaluation, tool choice, and execution readiness.</p>
            </div>
            <div className="autonomy-flow" aria-label="RIA controlled autonomy flow">
              {flow.map((step, index) => (
                <div className={step === 'Ask permission' ? 'is-gate' : ''} key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                  {index < flow.length - 1 && <ArrowRight className="h-4 w-4" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FounderVisionSection() {
  return (
    <section className="home-section founder-vision-section" id="chapter-skin">
      <div className="premium-container">
        <Reveal className="founder-vision-panel glass-panel">
          <div className="founder-vision-index" aria-hidden="true">AION / 2026</div>
          <div className="founder-vision-copy">
            <p className="premium-eyebrow">Chapter 08 / Skin & Shield</p>
            <h2>Skin / Owner Control</h2>
            <blockquote>“I am building RIA as a private intelligence system that can grow with a person — remembering their work, understanding their goals, helping them think, and supporting action without taking control away from them.”</blockquote>
            <div className="founder-signature">
              <span>SB</span>
              <div><strong>Sudeep Bala</strong><small>Founder, AION · Built in India</small></div>
            </div>
          </div>
          <div className="founder-principles">
            <span>01 <strong>Human agency</strong></span>
            <span>02 <strong>Private memory</strong></span>
            <span>03 <strong>Long-term intelligence</strong></span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function VisualSystemPreview() {
  return (
    <section className="home-section visual-system-preview" id="visual-system">
      <div className="premium-container">
        <Reveal className="visual-system-preview-panel">
          <p className="premium-eyebrow">RIA / System atlas</p>
          <h2>A visual language for private intelligence.</h2>
          <p>
            Interface studies, product systems, operating concepts, and architecture views document how RIA turns complex intelligence into an understandable working environment.
          </p>
          <Link to="/images" className="premium-button premium-button-primary">
            Explore System Atlas <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function CreativeCommandSection() {
  const features = [
    ['Creative Memory', 'Keep visual direction, style decisions, and production context available across sessions.'],
    ['Media Workflow', 'Coordinate generated imagery, UI concepts, product assets, and launch materials from one surface.'],
    ['Builder Output', 'Connect creative intent to code, interfaces, scripts, and reusable product systems.']
  ]

  return (
    <section className="home-section creative-command-section" id="chapter-action">
      <div className="premium-container creative-command-grid">
        <Reveal className="creative-command-image glass-card">
          <PremiumImage image={riaVisuals.creativeStudio} sizes="(max-width: 900px) 92vw, 46vw" />
        </Reveal>

        <Reveal className="creative-command-copy">
          <p className="premium-eyebrow">Chapter 07 / Action Tools</p>
          <h2>Hands / Action Tools</h2>
          <p>
            Executes only through visible, permissioned, owner-approved action pathways.
          </p>
          <div className="creative-feature-list">
            {features.map(([title, copy]) => (
              <article className="glass-card" key={title}>
                <Sparkles className="h-4 w-4" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <Link to="/images" className="premium-button premium-button-primary">
            Explore System Atlas <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ImageLibraryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<RiaImage | null>(null)
  const filteredImages = useMemo(() => filterRiaImages(activeFilter), [activeFilter])

  useEffect(() => {
    if (!selectedImage) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedImage])

  return (
    <>
      <SEO
        title="Image Library"
        description="RIA visual system media library with product screens, brand concepts, interface studies, and launch assets."
      />
      <section className="image-library-page">
        <div className="premium-container">
          <PageHero
            eyebrow="RIA Visual System"
            title="RIA Image Library"
            copy="A professional media library for product visuals, brand concepts, interface studies, investor assets, and archived concepts."
          />

          <div className="image-library-filters" role="tablist" aria-label="Image categories">
            {imageLibraryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={activeFilter === filter.id ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <p className="image-library-count">{filteredImages.length} visuals</p>

          <div className="image-library-masonry">
            {filteredImages.map((image) => (
              <button
                key={image.src}
                type="button"
                className={`image-library-card image-library-card-${image.ratio === 'square' ? 'square' : 'wide'}`}
                onClick={() => setSelectedImage(image)}
              >
                <div className="image-library-card-media">
                  <img src={image.src} alt={image.title} loading="lazy" decoding="async" />
                </div>
                <div className="image-library-card-body">
                  <span>{image.category}</span>
                  <strong>{image.title}</strong>
                  <p>{image.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="image-library-lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title}>
          <button type="button" className="image-library-lightbox-backdrop" aria-label="Close preview" onClick={() => setSelectedImage(null)} />
          <div className="image-library-lightbox-panel">
            <button type="button" className="image-library-lightbox-close" aria-label="Close" onClick={() => setSelectedImage(null)}>
              <X className="h-5 w-5" />
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="image-library-lightbox-copy">
              <span>{selectedImage.category}</span>
              <strong>{selectedImage.title}</strong>
              <p>{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function InvestorInfrastructureSection() {
  const roadmap = [
    ['Phase 01', 'Memory-first assistant', 'Durable context, project memory, and source-linked recall.'],
    ['Phase 02', 'Intelligence workspace', 'One operating surface for knowledge, tools, goals, and decisions.'],
    ['Phase 03', 'Autonomous CoreX', 'Supervised planning, proposals, approval gates, and execution.'],
    ['Phase 04', 'Voice and avatar interface', 'Natural private interaction across voice and embodied presence.'],
    ['Phase 05', 'Local-first intelligence ecosystem', 'Private runtimes, connected tools, and owner-controlled infrastructure.'],
    ['Phase 06', 'Human digital twin layer', 'Long-term models of goals, preferences, workflows, and context.']
  ]

  return (
    <section className="home-section investor-infrastructure-section" id="chapter-investor">
      <div className="premium-container investor-grid">
        <Reveal className="investor-panel glass-panel">
          <p className="premium-eyebrow">Chapter 10 / Infrastructure Capital</p>
          <h2>Private intelligence is becoming infrastructure.</h2>
          <p>
            AION is building the operating layer for people who need memory, reasoning, and action without surrendering control.
          </p>
          <div className="investor-actions">
            <Link to="/contact" className="premium-button premium-button-primary">
              Request Investor Brief <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#chapter-memory" className="premium-button premium-button-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('chapter-memory') }}>
              Read the Architecture <Network className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal className="investor-roadmap glass-card">
          <h3>Six-phase system roadmap</h3>
          <div>
            {roadmap.map(([phase, title, copy]) => (
              <article key={phase}>
                <span>{phase}</span>
                <div><strong>{title}</strong><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function HeroSection() {
  const heroMetrics = [
    ['Memory', 'Persistent'],
    ['Reasoning', 'Active'],
    ['Control', 'Owner-approved']
  ]

  return (
    <section className="home-hero" id="chapter-hero">
      <div className="premium-container home-hero-grid">
        <Reveal className="home-hero-panel">
          <div className="hero-system-label"><i /> AION / RIA PRIVATE INTELLIGENCE SYSTEM</div>
          <h1 className="home-hero-headline">
            <span>RIA OrBiT</span>
          </h1>
          <p className="home-hero-sub">
            RIA connects memory, reasoning, reflection, knowledge, tools, and owner-approved action inside one private intelligence architecture.
          </p>
          <div className="hero-trust-pills" aria-label="System principles">
            {['Local-first memory', 'Owner-approved action', 'Private runtime', 'Built by AION', 'Software Exchange', 'Intelligence architecture'].map((badge) => (
              <span key={badge}><i /> {badge}</span>
            ))}
          </div>

          <div className="home-hero-actions">
            <Link
              to="/download"
              className="premium-button premium-button-primary"
            >
              Explore RIA <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#chapter-memory"
              className="premium-button premium-button-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection('chapter-memory') }}
            >
              View Architecture <Network className="h-4 w-4" />
            </a>
          </div>
          <div className="home-hero-metrics" aria-label="RIA system principles">
            {heroMetrics.map(([label, value]) => (
              <span key={label}>
                <strong>{value}</strong>
                {label}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="home-hero-visual-stage" aria-hidden="true">
          <div className="home-hero-stage-grid" />
          <div className="home-hero-stage-halo" />
          <div className="home-hero-stage-ring ring-one" />
          <div className="home-hero-stage-ring ring-two" />
          <img className="home-hero-mobile-brain" src="/assets/ria/ria-4k-neural-brain.png" alt="" decoding="async" />
          <span className="home-hero-stage-index">RIA / COGNITIVE CORE</span>
          <span className="home-hero-stage-signal signal-a"><i /> Memory continuity</span>
          <span className="home-hero-stage-signal signal-b"><i /> Private runtime</span>
          <span className="home-hero-stage-signal signal-c"><i /> Owner approval</span>
        </div>
      </div>
    </section>
  )
}

function ImageShowcase({
  image,
  supportingImages = [],
  loading = 'lazy',
  priority = false
}: {
  image: PremiumImageAsset
  supportingImages?: PremiumImageAsset[]
  loading?: 'eager' | 'lazy'
  priority?: boolean
}) {
  return (
    <div className="premium-image-showcase">
      <div className="premium-image-frame">
        <PremiumImage image={image} className="premium-image-main" loading={loading} fetchPriority={priority ? 'high' : 'auto'} sizes="(max-width: 767px) 96vw, 46vw" />
      </div>
      {supportingImages.length > 0 && (
        <div className="premium-image-strip">
          {supportingImages.map((item) => (
            <div className="premium-image-chip" key={item.src}>
              <PremiumImage image={item} sizes="(max-width: 767px) 45vw, 14vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductSection({ id, eyebrow, title, copy, image, cards, supportingImages, reverse = false }: PremiumProductSection) {
  return (
    <section className={`premium-product-section ${reverse ? 'premium-product-section-reverse' : ''}`} id={id}>
      <div className="premium-container premium-product-grid">
        <Reveal className="premium-product-copy">
          <p className="premium-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{copy}</p>
          <div className="premium-card-grid">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <article className="premium-feature-card" key={card.title}>
                  <Icon className="h-5 w-5" />
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              )
            })}
          </div>
        </Reveal>
        <Reveal className="premium-product-media">
          <ImageShowcase image={image} supportingImages={supportingImages} />
        </Reveal>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="premium-cta-section" id="chapter-download">
      <div className="premium-container">
        <Reveal className="premium-cta-panel">
          <div>
            <p className="premium-eyebrow">Chapter 09 / Launch & Gate</p>
            <p>
              AION is building a private intelligence architecture for memory, reasoning, tools, and owner-controlled autonomy. Built in India for the world.
            </p>
          </div>
          <div className="premium-cta-actions">
            <Link to="/contact" className="premium-button premium-button-primary">
              Request Investor Brief <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/download" className="premium-button premium-button-secondary">
              Download locked until July 5, 2026 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="premium-button premium-button-ghost">
              Contact Founder <Mail className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function AionPage() {
  return (
    <>
      <SEO
        title="AION | Private AI Studio"
        description="AION is an advanced creative intelligence and defense AI system. Explore AION's private AI studio foundation built for production work."
      />
      <section className="ria-hero min-h-screen pt-32">
        <div className="premium-container py-20">
          <Reveal>
            <p className="premium-eyebrow">AION Legacy</p>
            <h1 className="ria-hero-title text-6xl">AION: The Creative Intelligence System</h1>
            <h2 className="ria-hero-subtitle">Advanced creative dashboards, DefenseCore intelligence, and production-grade creative studios.</h2>
            <p className="ria-hero-copy max-w-3xl text-lg">
              AION began as the foundational studio for creative intelligence and defense systems. While development has shifted to RIA OS, AION remains a powerful reference for the creative and intelligence architecture that powers modern AI studios.
            </p>
            <div className="flex flex-wrap gap-4 pt-8">
              <a
                href="https://aion-aiontype1.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="premium-button premium-button-primary"
              >
                Try AION Studio <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/" className="premium-button premium-button-ghost">
                Back to RIA <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal className="premium-hero-visual aion-hero-visual mt-12">
            <ImageShowcase
              image={aionVisuals.defensecoreDashboard}
              supportingImages={[aionVisuals.creativeStudio, aionVisuals.brainStructure]}
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      <section className="ria-section">
        <div className="premium-container">
          <Reveal>
            <p className="premium-eyebrow">AION Systems</p>
            <h2 className="ria-section-title">Three Core Intelligence Layers</h2>
            <p className="ria-section-copy">DefenseCore, Creative Studio, and Brain Architecture formed the foundation of AION's intelligent systems.</p>
          </Reveal>

          <div className="ria-try-grid">
            {[
              {
                icon: Shield,
                title: 'DefenseCore',
                copy: 'Advanced satellite intelligence, threat detection, and command-level decision support systems.'
              },
              {
                icon: Sparkles,
                title: 'Creative Studio',
                copy: 'AI-native creative dashboards for image generation, video concepts, and asset design workflows.'
              },
              {
                icon: BrainCircuit,
                title: 'Brain Architecture',
                copy: 'Sophisticated neural architecture for reasoning, memory, and multi-modal intelligence synthesis.'
              }
            ].map((card) => {
              const Icon = card.icon
              return (
                <Reveal key={card.title} className="ria-glass-card ria-try-card">
                  <Icon className="h-5 w-5" />
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="ria-section">
        <div className="premium-container">
          <Reveal>
            <p className="premium-eyebrow">AION Dashboards</p>
            <h2 className="ria-section-title">Production-Grade Interfaces</h2>
            <p className="ria-section-copy">AION pioneered cinematic dashboards for intelligence operations and creative workflows.</p>
          </Reveal>

          <div className="ria-try-grid">
            {[
              {
                icon: Gauge,
                title: 'DefenseCore Command',
                copy: 'Real-time operational dashboard with satellite views, threat intelligence, and command controls.'
              },
              {
                icon: Palette,
                title: 'Creative Intelligence Wall',
                copy: 'Multi-panel creative workspace for visual generation, asset management, and creative direction.'
              },
              {
                icon: Database,
                title: 'Brain System Visualization',
                copy: 'System architecture dashboard showing memory layers, reasoning networks, and intelligence flows.'
              }
            ].map((card) => {
              const Icon = card.icon
              return (
                <Reveal key={card.title} className="ria-glass-card ria-try-card">
                  <Icon className="h-5 w-5" />
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="ria-section">
        <div className="premium-container">
          <Reveal>
            <p className="premium-eyebrow">AION and RIA</p>
            <h2 className="ria-section-title">The Evolution of Intelligent Systems</h2>
            <p className="ria-section-copy">AION's creative and defense intelligence systems inform the next generation of persistent AI architecture in RIA OS.</p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                title: 'AION Era',
                items: [
                  'Creative Intelligence dashboards',
                  'DefenseCore operations systems',
                  'Cinematic UI design language',
                  'Multi-modal intelligence synthesis',
                  'Production-grade security'
                ]
              },
              {
                title: 'RIA OS Direction',
                items: [
                  'Persistent memory architecture',
                  'Reflective intelligence systems',
                  'Desktop operating system layer',
                  'Private local-first deployment',
                  'Institutional memory and knowledge graphs'
                ]
              }
            ].map((section) => (
              <Reveal key={section.title} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
                <h3 className="mb-6 text-2xl font-bold text-slate-100">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                      <span className="text-base text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ria-section">
        <div className="premium-container">
          <Reveal>
            <p className="premium-eyebrow">What's Next</p>
            <h2 className="ria-section-title">From AION to RIA OS</h2>
            <p className="ria-section-copy">AION demonstrated the power of intelligent dashboards. RIA OS expands that vision to persistent memory, reflection, and lifelong intelligence.</p>
          </Reveal>

          <div className="flex flex-col gap-6 py-8">
            {[
              ['July 5, 2026', 'RIA OS launches with persistent memory, voice, and local-first architecture'],
              ['2027', 'Enterprise memory systems and institutional knowledge foundations'],
              ['2028+', 'Global cognitive infrastructure across teams, education, and research']
            ].map(([date, description]) => (
              <Reveal key={date} className="grid gap-4 rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl lg:grid-cols-[200px_1fr]">
                <span className="text-lg font-bold text-cyan-300">{date}</span>
                <p className="text-base text-slate-400">{description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <a
              href="https://aion-aiontype1.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="premium-button premium-button-primary"
            >
              Explore AION <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/" className="premium-button premium-button-secondary">
              Learn About RIA <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function HomePage() {
  return (
    <>
      <SEO title="From Assistant to Intelligence" description="RIA is a private intelligence architecture designed to remember, reason, plan, reflect, and act under human control." />
      <Suspense fallback={<div className="ria-cinematic-background is-loading" aria-hidden="true"><RiaHeroSceneFallback /></div>}>
        <RiaCinematicBackground />
      </Suspense>
      <HeroSection />
      <IntelligenceDefinitionSection />
      <ProductProofSection />
      <PremiumArchitectureSection />
      <PrivacyAutonomySection />
      <VisualSystemPreview />
      <CreativeCommandSection />
      <FounderVisionSection />
      <InvestorInfrastructureSection />
    </>
  )
}

function VisionPage() {
  return (
    <>
      <SEO title="Vision" description="RIA's philosophy for persistent memory, multi-domain intelligence, and human-AI collaboration." />
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
            ['Persistent intelligence matters', 'Reflection, identity continuity, belief awareness, and strategic synthesis make AI feel less like a short-lived tool and more like a durable partner.'],
            ['Human-AI co-evolution', 'The long-term goal is not replacement. It is an intelligence layer that helps humans preserve experience, clarify goals, and evolve deliberately.']
          ].map(([title, copy]) => (
            <Reveal key={title} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
              <h2 className="text-xl font-bold text-slate-100">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="prose-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Philosophy</p>
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
            <Reveal key={title} className="overflow-hidden rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition hover:border-cyan-300/20">
              <img src={src} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p>
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
      <SEO title="RIA IDE" description="RIA IDE is an AI-native development environment that remembers codebase intent, architecture decisions, and product context." />
      <PageHero eyebrow="RIA IDE" title="The AI-native development environment." copy="RIA IDE gives software teams persistent context across code, architecture, decisions, product goals, and team memory." metrics={[
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
            {['Private company, public-company governance roadmap', 'SOC 2 and ISO 27001 planning', 'Ecosystem roadmap in formation', 'Design partner deployment target'].map((item) => (
              <Reveal key={item} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
                <BadgeCheck className="h-5 w-5 text-cyan-300" />
                <p className="mt-6 text-sm font-semibold leading-6 text-slate-300">{item}</p>
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
      <PageHero eyebrow="Investor Relations" title="Building the infrastructure for persistent intelligence." copy="RIA is positioned as a category-defining private AI operating system with large market potential, compounding memory defensibility, and multi-product revenue paths." metrics={[
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
            <Reveal key={title} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
              <h2 className="text-xl font-bold text-slate-100">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Competitive Matrix" title="RIA is designed to win on continuity." copy="The wedge is not generic generation. It is memory, reflection, belief analysis, identity continuity, and evolution tracking." />
          <div className="mt-12 space-y-3 md:hidden">
            {competitiveRows.map((row) => (
              <Reveal key={`mobile-${row[0]}`} className="rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{row[0]}</p>
                <div className="mt-3 space-y-2">
                  {competitiveHeaders.slice(1).map((heading, index) => {
                    const cell = row[index + 1]
                    const isRia = heading.label === 'RIA'
                    return (
                      <div key={`${row[0]}-${heading.label}`} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[rgb(255_255_255_/_0.04)] px-3 py-2.5">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                          {heading.logo ? (
                            <img
                              src={heading.logo}
                              alt=""
                              className="h-3.5 w-3.5 shrink-0 object-contain opacity-95"
                              loading="lazy"
                            />
                          ) : null}
                          {heading.label}
                        </span>
                        <span className={`text-xs font-bold ${isRia ? 'text-cyan-300' : 'text-slate-300'}`}>{cell}</span>
                      </div>
                    )
                  })}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 hidden overflow-x-auto rounded-xl border border-white/10 bg-[rgba(8,12,22,0.72)] shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:block">
            <table className="w-full min-w-[760px] border-collapse bg-transparent text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[rgb(255_255_255_/_0.04)] text-slate-500">
                  {competitiveHeaders.map((heading) => (
                    <th key={heading.label} className="px-6 py-4.5 font-bold tracking-wide text-xs uppercase text-slate-300">
                      {heading.logo ? (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap">
                          <img
                            src={heading.logo}
                            alt=""
                            className="h-4 w-4 shrink-0 object-contain opacity-95"
                            loading="lazy"
                          />
                          <span>{heading.label}</span>
                        </span>
                      ) : (
                        heading.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitiveRows.map((row) => (
                  <tr key={row[0]} className="border-b border-white/10 transition-colors last:border-0 hover:bg-[rgb(255_255_255_/_0.05)]">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}-${cell}`} className={`px-6 py-4.5 ${index === row.length - 1 ? 'font-bold text-cyan-300' : 'text-slate-400'}`}>
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
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Roadmap</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-100 sm:text-5xl">From personal platform to global cognitive infrastructure.</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">Capital accelerates core engineering, memory infrastructure, research, security, product design, and enterprise sales.</p>
          </Reveal>
          <Reveal className="timeline-line">
            {roadmap.map(([year, copy]) => (
              <div key={year} className="timeline-item">
                <span className="font-bold">{year}</span>
                <p className="text-slate-400">{copy}</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">Why I Built RIA</p>
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
              ['Category', 'Private AI operating system becomes the long-term market position.']
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
      <SEO title="Careers" description="Join RIA in building the future of persistent intelligence, memory systems, and reflective AI." />
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
            <Reveal key={title} className="dark-glass-card p-7 transition hover:-translate-y-1">
              <Newspaper className="h-5 w-5 text-cyan-400" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{type}</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{copy}</p>
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
      <PageHero eyebrow="Download RIA" title="Download & Run RIA" copy="RIA is available from GitHub for developers and early builders who want to run the private intelligence workspace locally." metrics={[
        { label: 'Runtime', value: 'Local-first' },
        { label: 'Launcher', value: 'One-click' },
        { label: 'Status', value: 'Developer preview' }
      ]} />

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
                <BadgeCheck className="h-5 w-5 text-cyan-400" />
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
              <Reveal key={item} className="dark-glass-card p-6 text-center transition hover:-translate-y-1">
                <ShieldCheck className="mx-auto h-6 w-6 text-cyan-400" />
                <p className="mt-5 text-sm font-semibold text-slate-100">{item}</p>
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
          <Reveal className="dark-glass-card p-7">
            <Mail className="h-6 w-6 text-cyan-400" />
            <h2 className="mt-6 text-3xl font-semibold text-slate-100">Direct founder contact</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              For investment, partnership, or product funding, contact the founder directly through the form or email.
            </p>
            <div className="mt-8 grid gap-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-lg border border-white/8 bg-[rgb(255_255_255_/_0.04)] p-4 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-[rgb(255_255_255_/_0.07)]">
                <Mail className="h-4 w-4 text-cyan-400" /> {contact.email}
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-[rgb(255_255_255_/_0.04)] p-4 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-400" /> {contact.location}
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
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">404</p>
          <h1 className="mt-5 text-5xl font-semibold text-slate-100">This memory node does not exist.</h1>
          <p className="mt-5 text-slate-400">Return to the main intelligence stream and continue exploring RIA.</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/14 bg-[rgb(255_255_255_/_0.10)] px-5 py-3 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-[rgb(255_255_255_/_0.16)]">
            Back Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer-premium">
      <div className="premium-container">
        <div className="footer-command-shell">
          <div className="footer-command-head">
            <div className="site-footer-brand">
              <LogoMark variant="footer" />
              <span><strong>RIA</strong> Reactive Intelligent Architecture</span>
            </div>
            <p>Private intelligence for memory, reasoning, planning, reflection, and owner-controlled action.</p>
          </div>
          <div className="footer-system-strip">
            <span><i /> System direction: local-first</span><span>Memory architecture: persistent</span><span>Action boundary: owner approval</span>
          </div>
          <div className="site-footer-grid">
            <div className="footer-manifesto"><span>AION / INDIA</span><strong>From assistant<br />to intelligence.</strong><small>Built in India. Built for the world.</small></div>
            <div className="site-footer-links">
              {(['Core', 'Product', 'Company', 'Trust'] as const).map((group) => (
                <div key={group}>
                  <p>{group}</p>
                  {pageLinks.filter((item) => item.group === group).map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}
                </div>
              ))}
            </div>
          </div>
          <div className="site-footer-bottom">
            <span>© 2026 AION. RIA — From Assistant to Intelligence.</span>
            <div><Link to="/security-privacy">Privacy</Link><Link to="/contact">Contact</Link><Link to="/download">Launch status</Link></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const routeClass = isHomePage ? 'route-home' : `route-interior route-${location.pathname.slice(1).replace(/[^a-z0-9]+/gi, '-') || 'home'}`

  // Redirect workspace route to homepage
  useEffect(() => {
    if (location.pathname === '/workspace') {
      window.location.hash = '#/'
    }
  }, [location.pathname])

  return (
    <main className={`ria-site cosmos glass-theme min-h-screen ${routeClass}`}>
      <ScrollToTop />
      <a className="skip-to-content" href="#ria-page-content">Skip to page content</a>
      {!isHomePage && <CosmicStarField />}
      {!isHomePage && <CosmosBackground />}
      <Header />
      <div id="ria-page-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aion" element={<AionPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/ria-ide" element={<RiaIdePage />} />
        <Route path="/ria-personal" element={<RiaPersonalPage />} />
        <Route path="/ria-enterprise" element={<RiaEnterprisePage />} />
        <Route path="/software-exchange" element={<Suspense fallback={<div className="exchange-state" role="status">Loading RIA Software Exchange…</div>}><SoftwareExchangePage /></Suspense>} />
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
        <Route path="/images" element={<ImageLibraryPage />} />
        <Route path="/demo" element={<ProductPage />} />
        <Route path="/workspace" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
      <Footer />
    </main>
  )
}
