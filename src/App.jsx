import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Activity,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  Check,
  Clock3,
  Compass,
  Cpu,
  Database,
  Edit3,
  FileText,
  Fingerprint,
  Gauge,
  Github,
  Globe2,
  HeartPulse,
  Image,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  SendHorizontal,
  Mic2,
  Moon,
  Orbit,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Sparkles,
  Target,
  Trash2,
  UserRound,
  Waves,
  Wrench,
  Zap
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

const platformStats = [
  ['Continuity layer', 'Long-term identity, memory, and context orchestration'],
  ['Private-first', 'User-visible memory controls and export-ready architecture'],
  ['Multimodal ready', 'Designed for voice, text, image, files, and device telemetry'],
  ['Production path', 'API, database, desktop, mobile, and embedded deployment roadmap']
]

const operatingMetrics = [
  ['Memory graph', '24 nodes', 'Session-aware recall with editable user ownership'],
  ['Response route', '4 layers', 'Intent, context, emotion, and next-action reasoning'],
  ['Data boundary', 'User owned', 'Private storage model with review and deletion controls'],
  ['Release track', 'Prototype', 'Structured path from demo to installable product']
]

const platformLayers = [
  ['Interface OS', BrainCircuit, 'A calm, premium user surface for conversation, guidance, memory review, and daily decisions.'],
  ['Cognition Router', Cpu, 'Routes user input through intent, context, tone, safety, retrieval, and next-action systems.'],
  ['Memory Graph', Database, 'Turns sessions into structured, editable memory nodes across goals, beliefs, emotions, and history.'],
  ['Trust Layer', ShieldCheck, 'Keeps memory visible, controlled, exportable, and removable so personal AI never feels hidden.']
]

const featured = [
  {
    type: 'Product',
    title: 'RIA Cognitive Intelligence Platform',
    copy: 'A premium personal AI operating layer for memory continuity, reflection, emotional context, and private user control.',
    to: '/product'
  },
  {
    type: 'Research',
    title: 'Architecture for persistent personal intelligence',
    copy: 'RIA combines short-term reasoning, long-term memory, identity context, belief signals, and reflective summaries.',
    to: '/research'
  },
  {
    type: 'Safety',
    title: 'User-owned cognition and data boundaries',
    copy: 'A serious personal AI must make memory visible, editable, exportable, removable, and understandable.',
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
  ['Memory Graph', Database, 'Structured long-term memory for conversations, emotions, goals, beliefs, preferences, and personal history.'],
  ['Reflection Engine', Orbit, 'Pattern detection and insight generation for recurring thoughts, stress cycles, priorities, and decisions.'],
  ['Journal Intelligence', BookOpen, 'Daily summaries, belief signals, mood annotations, and private self-review workflows.'],
  ['Emotional Context', HeartPulse, 'Mood-aware reasoning, emotional timelines, trigger correlation, and recovery recommendations.'],
  ['Calm Protocols', Moon, 'Grounding, breathing, affirmations, and emotional reset flows designed as controlled product experiences.'],
  ['Voice + Device Layer', Mic2, 'Natural voice interaction and a roadmap for desktop, mobile, embedded, and wearable access.']
]

const differentiators = [
  ['Persistent by design', Database, 'Most AI tools optimize for one prompt. RIA is organized around continuity: memory, identity, journals, user state, and reflective summaries that compound over time.'],
  ['Personal operating layer', HeartPulse, 'RIA is not positioned as a generic chatbot. It is a private intelligence layer for emotions, goals, routines, decisions, beliefs, and long-term self-understanding.'],
  ['User-owned intelligence', LockKeyhole, 'Memory must be visible, editable, exportable, and removable. The product should feel trusted because the user can inspect what RIA knows and change it.'],
  ['Built for deployment', Cpu, 'The architecture is shaped for web, desktop, mobile, embedded devices, voice, local model orchestration, and future advanced compute environments.']
]

const installSteps = [
  ['Choose your platform', 'Select the installer for Windows, macOS, Linux, Android, or the future web/mobile build once early access opens.'],
  ['Request early access', 'Until public installers are released, use the early access contact button so the founder can share prototype availability and onboarding details.'],
  ['Install and sign in', 'Run the installer, open RIA, and connect your private profile. The first release will focus on memory, journaling, reflection, and calm mode.'],
  ['Control your data', 'Review memory, edit saved details, export important notes, and remove anything you do not want RIA to keep.']
]

const deviceTargets = [
  ['Desktop', 'Windows, macOS, and Linux for focused daily work.'],
  ['Mobile', 'Android and future mobile builds for always-available personal support.'],
  ['Embedded', 'Designed for future integration with electronic devices, wearables, and smart environments.'],
  ['Future compute', 'Architected with long-term portability in mind, including advanced and quantum-assisted computing platforms as they become practical.']
]

const news = [
  ['Research', 'How RIA detects recurring emotional patterns'],
  ['Product', 'Designing an editable memory vault'],
  ['Safety', 'Why personal AI memory must stay user-controlled'],
  ['Company', 'AIONTEC’s roadmap for cognitive AI systems']
]

const roadmap = [
  ['Phase 1', 'Premium platform surface', 'Website, product narrative, RIA Orbit demo, architecture pages, and investor-ready positioning.'],
  ['Phase 2', 'Private memory backend', 'Persistent memory vault, auto-journal engine, identity file, retrieval, and user-owned data controls.'],
  ['Phase 3', 'Cognitive analytics', 'Belief classification, pattern detection, emotional trend reporting, and structured insight generation.'],
  ['Phase 4', 'Multimodal release', 'Voice, files, images, calm protocols, desktop/mobile packaging, and controlled early-access onboarding.']
]

const demoTopics = [
  'memory',
  'journal',
  'emotion',
  'belief',
  'calm',
  'focus',
  'goals',
  'privacy',
  'funding',
  'download'
]

const demoCapabilities = [
  ['Intent', 'Active', Gauge],
  ['Memory', 'Session', Database],
  ['Emotion', 'Aware', HeartPulse],
  ['Privacy', 'Controlled', KeyRound]
]

const demoPromptCards = [
  ['Daily reflection', 'Turn today into a journal note with mood and next action.', 'Create a journal note for my day'],
  ['Emotional reset', 'Calm pressure, anxiety, stress, or overwhelm with grounding.', 'I feel overwhelmed and need calm mode'],
  ['Goal planning', 'Convert a dream or startup idea into practical checkpoints.', 'Help me plan my next RIA milestone'],
  ['Investor answer', 'Explain RIA professionally for funding or partnership talks.', 'Explain RIA to an investor']
]

const demoActivity = [
  ['Memory capture', 'Ready for user-owned recall'],
  ['Reflection pass', 'Prepared for journaling'],
  ['Tone reading', 'Listening for emotional context']
]

const osTabs = [
  ['core', 'Command Center', Sparkles],
  ['chat', 'Conversation', MessageCircle],
  ['dashboard', 'Telemetry', BarChart3],
  ['memory', 'Memory Graph', Database],
  ['reflection', 'Reflection Engine', ShieldCheck],
  ['knowledge', 'Knowledge Sources', Globe2],
  ['web', 'Research Browser', Globe2],
  ['teach', 'Model Training', BookOpen],
  ['gallery', 'Creative Studio', Image],
  ['desktop', 'Desktop Vault', FileText],
  ['games', 'Focus Modes', Target],
  ['behavior', 'Behavior Controls', SlidersHorizontal],
  ['emotion', 'Emotional Signals', BarChart3],
  ['guidance', 'Guidance Layer', Compass],
  ['tools', 'Tools', Wrench],
  ['wellness', 'Wellness Protocols', HeartPulse],
  ['goals', 'Goal Graph', Target],
  ['actions', 'Actions', ArrowRight]
]

const orbitCards = [
  ['Ask RIA', 'Start a high-context session', MessageCircle, 'Give me an executive summary of my current goals and risks'],
  ['Inference Layer', 'Inspect compute readiness', Cpu, 'Open inference and model routing status'],
  ['Optimize', 'Review controlled upgrades', Sparkles, 'Optimize my daily reflection and memory flow'],
  ['Memory Graph', 'Browse owned context', Database, 'Open my memory graph summary'],
  ['Action System', 'Convert insight to execution', Wrench, 'Show available RIA action tools']
]

const premiumActivity = [
  ['Context package prepared for next response route', '05:42 PM'],
  ['Memory graph integrity check complete: 4 signals indexed', '05:32 PM'],
  ['Reflection model selected adaptive reasoning mode', '05:02 PM'],
  ['User-owned memory policy verified for session', '05:02 PM'],
  ['Private guidance protocol approved', '05:02 PM']
]

const gpuPulse = [
  ['GPU USAGE', '93%', 'bg-white', 93],
  ['GPU TEMPERATURE', '58c', 'bg-white', 58],
  ['VRAM USAGE', '65%', 'bg-white', 65],
  ['POWER DRAW', 'n/a', 'bg-zinc-700', 0]
]

const demoSystemHealth = [
  ['Memory graph', 'Online', Database, 'Editable continuity nodes active'],
  ['Reasoning route', 'Adaptive', BrainCircuit, 'Intent, context, tone, and action'],
  ['Privacy layer', 'Protected', LockKeyhole, 'User-owned session boundary'],
  ['Model state', 'Simulated', Cpu, 'Frontend demo without production backend']
]

const demoCommandRows = [
  ['/memory', 'Open owned context, saved signals, source notes, and memory controls.'],
  ['/reflect', 'Generate a daily journal, belief reframe, and pattern summary.'],
  ['/plan', 'Convert goals into milestones, next actions, and review checkpoints.'],
  ['/calm', 'Run emotional recovery, grounding, and pressure reduction protocols.']
]

const demoModuleInsights = [
  ['Retrieval', 'Session memory + product knowledge'],
  ['Reasoning', 'Intent, tone, context, next action'],
  ['Controls', 'Edit, delete, export, pause memory'],
  ['Output', 'Answer, journal, plan, image fallback']
]

const homeOrbitModules = [
  ['Memory', Database, 'Core memories + user timeline'],
  ['Reflection', Search, 'Recurring thoughts + insight loops'],
  ['Goals', Target, 'Life direction + execution path'],
  ['Insights', Sparkles, 'Pattern synthesis + next action'],
  ['Chat', MessageCircle, 'Continuous conversation stream']
]

const cognitionStream = [
  'analyzing memory continuity',
  'updating emotional context',
  'forming response strategy',
  'checking belief patterns',
  'mapping next useful action'
]

const memoryField = [
  ['Core memories', 'RIA tracks durable personal signals that should remain visible and editable.', Database],
  ['Emotional states', 'Mood shifts become a living timeline instead of disappearing after chat.', HeartPulse],
  ['Recurring thoughts', 'Repeated worries, dreams, doubts, and patterns become reflection material.', Orbit],
  ['Life goals', 'Goals are treated as evolving identity anchors, not simple to-do items.', Target]
]

const proactiveSignals = [
  'Goal review is overdue. RIA can compress the current direction into a 3-step execution plan.',
  'Emotional pressure is trending upward. RIA can shift the session into a grounded recovery protocol.',
  'A repeated belief signal is forming. RIA can classify it before it becomes a durable constraint.'
]

const evolutionSignals = [
  ['Thinking pattern', 'reactive -> structured'],
  ['Decision style', 'unclear -> prioritized'],
  ['Emotional loop', 'pressure -> recovery'],
  ['Belief shift', 'doubt -> directed action']
]

const initialOsMemory = {
  nodes: [
    { id: 'seed-goal', type: 'goal', title: 'Build RIA into a cognitive companion system', detail: 'Long-term product vision focused on memory, reflection, emotional intelligence, and private user control.', createdAt: '2026-05-07T00:00:00.000Z' },
    { id: 'seed-belief', type: 'belief', title: 'RIA should feel alive, not like a static website', detail: 'The interface should behave like a living AI operating system with continuous state and adaptive guidance.', createdAt: '2026-05-07T00:00:00.000Z' }
  ],
  timeline: [
    { id: 'seed-event', label: 'RIA Interface OS initialized', detail: 'Core mind, memory vault, reflection engine, emotional graph, and guidance mode are ready.', createdAt: '2026-05-07T00:00:00.000Z' }
  ],
  settings: {
    reasoning: 'adaptive',
    tone: 'warm',
    proactive: true,
    memoryWrite: true
  },
  personaLevel: 1
}

const themeByEmotion = {
  calm: {
    label: 'Soft blue calm',
    shell: 'from-[#050816] via-[#071827] to-[#04131d]',
    glow: 'rgba(34,211,238,0.22)',
    accent: 'text-cyan-200',
    chip: 'border-cyan-200/30 bg-cyan-200/10 text-cyan-100'
  },
  stressed: {
    label: 'Warm grounded',
    shell: 'from-[#140b08] via-[#21120b] to-[#090606]',
    glow: 'rgba(251,146,60,0.20)',
    accent: 'text-amber-200',
    chip: 'border-amber-200/30 bg-amber-200/10 text-amber-100'
  },
  deep: {
    label: 'Dark neural mode',
    shell: 'from-[#05030d] via-[#0b0716] to-[#02030a]',
    glow: 'rgba(168,85,247,0.22)',
    accent: 'text-violet-200',
    chip: 'border-violet-200/30 bg-violet-200/10 text-violet-100'
  }
}

const riaKnowledge = [
  {
    intent: 'greeting',
    matches: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
    reply: () => 'Hi, I am RIA. This is demo mode, but I can still explain the product clearly, answer questions about features, memory, privacy, funding, roadmap, downloads, image generation, and help you think through goals or emotions.'
  },
  {
    intent: 'demo',
    matches: ['demo', 'prototype', 'preview', 'real or demo', 'is this real', 'simulation', 'simulated'],
    reply: () => 'RIA Orbit is an interactive product demo. The interface shows how the future RIA experience will feel: chat, memory, journaling, goals, emotional awareness, image fallback, and system-style controls. Some parts are simulated in the browser until the full backend, model connection, account system, and real memory storage are released.'
  },
  {
    intent: 'features',
    matches: ['feature', 'features', 'can you do', 'what can ria do', 'capability', 'capabilities', 'function', 'functions'],
    reply: () => 'RIA is planned as a personal cognitive OS. Core features include long-term memory, editable memory vault, journaling, emotional check-ins, belief tracking, goal planning, calm mode, reflection summaries, private data controls, voice interaction, and cross-device access. In this demo, I simulate those workflows so visitors can understand the product direction.'
  },
  {
    intent: 'how-it-works',
    matches: ['how work', 'how does it work', 'architecture', 'backend', 'model', 'ai model', 'system design', 'technology', 'tech stack'],
    reply: () => 'The planned RIA system has four layers: a conversation layer for chat and voice, a memory layer for saved user context, a reflection layer for journals/goals/beliefs/emotions, and a control layer where users can edit, export, or delete what RIA knows. This website currently runs as a frontend demo, so the production AI backend and persistent database are represented as interface behavior.'
  },
  {
    intent: 'memory',
    matches: ['memory', 'remember', 'recall', 'store', 'save', 'history', 'past'],
    reply: ({ text }) => `I can treat that as a memory signal. In the full RIA product, this would become an editable memory card with source context, emotional tone, category, and user control. In this demo session, the important detail I noticed is: "${text}". You should always be able to see, edit, export, or delete memory.`
  },
  {
    intent: 'journal',
    matches: ['journal', 'diary', 'write', 'note', 'today', 'summary', 'day'],
    reply: ({ text }) => `Here is a clean journal-style reflection: Today carried something worth recording. The core note is "${text}". A useful next step is to name what happened, how it felt, what it taught you, and what you want to do differently tomorrow.`
  },
  {
    intent: 'emotion',
    matches: ['sad', 'angry', 'stress', 'stressed', 'anxiety', 'anxious', 'happy', 'overwhelmed', 'emotion', 'feeling', 'feel', 'mood', 'lonely', 'tired'],
    reply: ({ tone }) => `I hear the emotional layer here. Your message sounds ${tone}. Start by separating the event from the feeling: what happened, what it made you believe for a moment, and what your body needs now. You do not have to solve the whole life pattern in one breath.`
  },
  {
    intent: 'belief',
    matches: ['belief', 'mindset', 'thought', 'negative', 'positive', 'confidence', 'fear', 'doubt', 'growth'],
    reply: () => 'This looks like a belief-pattern question. RIA would classify the thought as limiting, protective, or growth-oriented, then help rewrite it into something more useful. A stronger frame is: "This is information, not a final verdict about me."'
  },
  {
    intent: 'calm',
    matches: ['calm', 'breathe', 'breathing', 'relax', 'panic', 'peace', 'meditate', 'ground'],
    reply: () => 'Calm mode: inhale for 4, hold for 2, exhale for 6. Do that three times. Then name five things you can see, four things you can feel, and one small action you can take in the next five minutes.'
  },
  {
    intent: 'focus',
    matches: ['focus', 'study', 'work', 'productive', 'productivity', 'task', 'plan', 'routine'],
    reply: () => 'For focus, choose one outcome, one timer, and one visible finish line. Put the next action into a sentence: "For the next 25 minutes, I will..." RIA works best when it turns vague pressure into a small concrete step.'
  },
  {
    intent: 'goals',
    matches: ['goal', 'dream', 'roadmap', 'future', 'build', 'startup', 'career', 'learn'],
    reply: () => 'A goal becomes easier when it has a next checkpoint. I would split it into three layers: the long-term direction, this month’s measurable milestone, and today’s smallest useful action. Momentum likes clarity.'
  },
  {
    intent: 'privacy',
    matches: ['privacy', 'private', 'secure', 'security', 'data', 'delete', 'editable', 'control'],
    reply: () => 'RIA is designed around user-owned memory: visible, editable, exportable, and removable. A personal AI should never make memory feel mysterious. The user should know what is stored, why it matters, and how to delete it. Production RIA should use clear account controls, secure storage, and privacy-first defaults.'
  },
  {
    intent: 'funding',
    matches: ['funding', 'invest', 'investor', 'money', 'support', 'partner', 'partnership', 'business', 'startup'],
    reply: () => 'Funding helps turn RIA from a polished prototype into a working product with model integration, memory storage, journaling, emotional dashboards, voice, privacy controls, mobile support, and real user testing. The funding page is meant for investors, partners, and early supporters who want to help build the first real release.'
  },
  {
    intent: 'download',
    matches: ['download', 'app', 'install', 'apk', 'windows', 'mac', 'android', 'release', 'ios', 'mobile', 'desktop'],
    reply: () => 'RIA is preparing for early access. The download page is structured for future Windows, macOS, Linux, Android, and web/mobile builds. Right now, the website demo is the safest way to try the concept while the real installers and app accounts are prepared.'
  },
  {
    intent: 'image',
    matches: ['image', 'picture', 'photo', 'visual', 'art', 'poster', 'generate image', 'draw', 'render'],
    reply: () => 'RIA can handle image requests in demo mode with a no-GPU fallback renderer. It creates a browser-generated SVG visual and gives you a download button. It is not full AI image generation yet, but it prevents the feature from failing when there is no GPU, backend, or image API available.'
  },
  {
    intent: 'creator',
    matches: ['founder', 'creator', 'owner', 'who made', 'made ria', 'sudeep', 'contact', 'email', 'phone', 'whatsapp'],
    reply: () => `RIA is being built by ${contactDetails.founderName} under ${contactDetails.companyName}. For funding, partnership, or early access, use email ${contactDetails.email} or WhatsApp ${contactDetails.whatsapp}.`
  },
  {
    intent: 'price',
    matches: ['price', 'pricing', 'cost', 'paid', 'free', 'subscription', 'plan'],
    reply: () => 'Pricing is not finalized yet. The current website is a demo and early product concept. A sensible future model could include a free demo, early-access testing, and paid plans for private memory, voice, storage, advanced reflection, and cross-device sync.'
  },
  {
    intent: 'identity',
    matches: ['who are you', 'what are you', 'about ria', 'what is ria', 'ria', 'explain ria'],
    reply: () => 'RIA is personal cognitive intelligence: a digital second brain for memory continuity, reflection, journaling, emotional awareness, belief tracking, and growth. The goal is not just another chatbot, but a private companion system that helps people understand themselves and organize their life over time.'
  }
]

function matchesKnowledge(clean, matches) {
  return matches.some((item) => {
    const target = item.toLowerCase()
    if (target.length <= 3) {
      return new RegExp(`(^|\\W)${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\W|$)`).test(clean)
    }
    return clean.includes(target)
  })
}

function getTone(text) {
  const clean = text.toLowerCase()
  if (/(sad|lonely|hurt|cry|empty|lost)/.test(clean)) return 'heavy and tender'
  if (/(angry|mad|frustrated|irritated)/.test(clean)) return 'charged and frustrated'
  if (/(anxious|stress|stressed|panic|overwhelmed|worried)/.test(clean)) return 'pressured and anxious'
  if (/(happy|excited|good|great|proud)/.test(clean)) return 'positive and energized'
  return 'important'
}

function getDetectedIntent(text = '') {
  const clean = text.toLowerCase()
  const topic = riaKnowledge.find(({ matches }) => matchesKnowledge(clean, matches))
  if (topic) return topic.intent
  if (clean.endsWith('?')) return 'question'
  if (clean.length > 120) return 'reflection'
  return 'general'
}

function detectEmotionMode(text = '') {
  const clean = text.toLowerCase()
  if (/(stress|stressed|anxious|panic|overwhelmed|angry|pressure|worried|tired)/.test(clean)) return 'stressed'
  if (/(think|deep|why|meaning|purpose|identity|future|strategy|reflect|understand)/.test(clean)) return 'deep'
  return 'calm'
}

function createMemoryNode(text, intent) {
  const now = new Date().toISOString()
  const title = intent === 'goal'
    ? 'Goal signal'
    : intent === 'belief'
      ? 'Belief pattern'
      : intent === 'emotion'
        ? 'Emotional state'
        : intent === 'journal'
          ? 'Journal memory'
          : 'Conversation memory'

  return {
    id: `${intent}-${Date.now()}`,
    type: ['goal', 'belief', 'emotion', 'journal'].includes(intent) ? intent : 'conversation',
    title,
    detail: text,
    createdAt: now
  }
}

function getActiveSuggestion(memory) {
  const goals = memory.nodes.filter((node) => node.type === 'goal')
  const emotions = memory.nodes.filter((node) => node.type === 'emotion')
  const beliefs = memory.nodes.filter((node) => node.type === 'belief')
  if (goals.length >= 3) return 'You have multiple goal signals. Want me to break the strongest one into a smaller next action?'
  if (emotions.length >= 3) return 'I notice repeated emotional entries. A short reflection could reveal the trigger pattern.'
  if (beliefs.length >= 2) return 'There are belief patterns forming. I can help separate protective thoughts from limiting thoughts.'
  return 'RIA is watching for useful patterns across goals, emotions, beliefs, and conversations.'
}

function formatAdvancedReply(text, baseReply, intent, tone) {
  const clean = text.trim()
  const focus = intent === 'general' ? 'context' : intent
  return [
    baseReply,
    '',
    `Signal read: ${focus} request with ${tone} tone.`,
    `Reasoning route: I separated the message into intention, emotional pressure, memory value, and the smallest useful next action.`,
    `Memory update: I treated "${clean.slice(0, 110)}${clean.length > 110 ? '...' : ''}" as a live continuity signal for this session.`,
    'Next action: answer one layer deeper, or ask me to convert this into a goal, journal entry, belief reframe, or execution plan.'
  ].join('\n')
}

function getGeneralAnswer(text, tone) {
  const clean = text.trim()
  if (!clean) return 'Ask me anything about RIA, the demo, memory, privacy, funding, downloads, image generation, or your own goals and emotions.'
  return [
    `I can help with that. In this demo, I do not browse the internet or call a production AI backend, so I will answer from the RIA product knowledge built into this website and be clear about limits.`,
    '',
    `Your question: "${clean}"`,
    '',
    'Best answer:',
    'RIA is designed to turn a normal chat into a structured personal intelligence flow. If your question is about the product, I can explain the feature, the roadmap, how the demo works, what is simulated, and what will need a real backend later. If your question is personal, I can help break it into memory, emotion, belief, goal, and next-action layers.',
    '',
    `What I would do next: ask one specific follow-up, or say "explain RIA", "show roadmap", "privacy", "download", "funding", "generate image of ...", or "help me plan a goal".`
  ].join('\n')
}

function getRiaReply(text) {
  const clean = text.toLowerCase()
  const topic = riaKnowledge.find(({ matches }) => matchesKnowledge(clean, matches))
  const intent = topic?.intent || getDetectedIntent(text)
  const tone = getTone(text)
  if (topic) return formatAdvancedReply(text, topic.reply({ text, tone }), intent, tone)
  if (clean.endsWith('?')) {
    return formatAdvancedReply(text, getGeneralAnswer(text, tone), intent, tone)
  }
  if (clean.length > 120) {
    return formatAdvancedReply(text, 'I understand the main shape of what you shared. The strongest signal is that this matters to you, and it may need reflection instead of a quick reaction. I would summarize it, identify the emotion under it, then choose one grounded next action.', intent, tone)
  }
  return formatAdvancedReply(text, getGeneralAnswer(text, tone), intent, tone)
}

function isImageRequest(text = '') {
  return /(generate|create|make|draw|render|design).{0,28}(image|picture|photo|visual|art|poster|scene)|image of|picture of|photo of/i.test(text)
}

function getImagePrompt(text = '') {
  return text
    .replace(/^(please\s+)?(generate|create|make|draw|render|design)\s+(an?\s+)?(image|picture|photo|visual|art|poster|scene)\s+(of|for)?\s*/i, '')
    .trim() || text.trim() || 'RIA generated visual'
}

function createFallbackImage(prompt) {
  const cleanPrompt = getImagePrompt(prompt)
  const seed = cleanPrompt.split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  const hueA = seed % 360
  const hueB = (seed * 7 + 120) % 360
  const hueC = (seed * 13 + 230) % 360
  const title = cleanPrompt.length > 54 ? `${cleanPrompt.slice(0, 54)}...` : cleanPrompt
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="768" viewBox="0 0 1280 768">
      <defs>
        <radialGradient id="core" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stop-color="hsl(${hueA}, 92%, 78%)"/>
          <stop offset="42%" stop-color="hsl(${hueB}, 76%, 54%)"/>
          <stop offset="100%" stop-color="#05070d"/>
        </radialGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.34)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.06)"/>
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="28"/></filter>
      </defs>
      <rect width="1280" height="768" fill="#05070d"/>
      <rect width="1280" height="768" fill="url(#core)" opacity="0.86"/>
      <circle cx="230" cy="180" r="210" fill="hsl(${hueC}, 90%, 65%)" opacity="0.32" filter="url(#blur)"/>
      <circle cx="1020" cy="160" r="260" fill="white" opacity="0.18" filter="url(#blur)"/>
      <circle cx="930" cy="620" r="250" fill="hsl(${hueB}, 86%, 62%)" opacity="0.26" filter="url(#blur)"/>
      <g opacity="0.28" stroke="white" fill="none">
        <ellipse cx="640" cy="384" rx="440" ry="120" transform="rotate(-12 640 384)"/>
        <ellipse cx="640" cy="384" rx="360" ry="90" transform="rotate(18 640 384)"/>
        <ellipse cx="640" cy="384" rx="250" ry="62" transform="rotate(-38 640 384)"/>
      </g>
      <g opacity="0.6">
        ${Array.from({ length: 42 }).map((_, index) => {
          const x = (seed * (index + 11) * 17) % 1280
          const y = (seed * (index + 7) * 23) % 768
          const r = 1 + ((seed + index) % 3)
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${0.28 + (index % 5) * 0.09}"/>`
        }).join('')}
      </g>
      <rect x="72" y="78" width="1136" height="612" rx="38" fill="rgba(0,0,0,0.30)" stroke="rgba(255,255,255,0.32)"/>
      <text x="104" y="132" fill="rgba(255,255,255,0.72)" font-family="Inter, Arial, sans-serif" font-size="20" letter-spacing="6">RIA FALLBACK RENDER</text>
      <text x="104" y="596" fill="white" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700">${escapeSvg(title)}</text>
      <text x="104" y="642" fill="rgba(255,255,255,0.72)" font-family="Inter, Arial, sans-serif" font-size="24">Generated in-browser without GPU acceleration</text>
    </svg>
  `
  return {
    src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    alt: `Generated visual for ${cleanPrompt}`,
    prompt: cleanPrompt
  }
}

function escapeSvg(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030407]/88 text-white shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={images.logo} alt="" className="h-7 w-7 rounded-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/20 bg-white/10 text-cyan-100">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold text-white">RIA</span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.24em] text-zinc-600 lg:inline">Cognitive Systems</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {nav.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'text-white' : 'transition hover:text-white'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-4 text-sm sm:flex">
          <Link to="/download" className="hidden text-zinc-400 transition hover:text-white sm:inline">Early access</Link>
          <Link to="/demo" className="rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-cyan-100">Launch Demo</Link>
        </div>
      </Container>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030407] text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="mb-6 flex items-center gap-2 text-white">
            <BrainCircuit className="h-5 w-5" />
            <span className="font-semibold">RIA</span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500">Premium cognitive intelligence infrastructure for private memory, adaptive reasoning, and personal AI operating systems.</p>
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
      className="mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <Search className="h-5 w-5 text-zinc-500" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask RIA for an executive memory and goal summary"
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      />
      <button className="grid h-8 w-8 place-items-center rounded-full bg-white text-black" aria-label="Ask RIA">
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 text-white">
        <div className="void-stars pointer-events-none absolute inset-0 opacity-30" />
        <div className="thought-stream thought-stream-a pointer-events-none absolute inset-0 opacity-30" />
        <Container className="py-8 sm:py-12">
          <motion.div className="relative" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">AIONTEC + RIA Cognitive Systems</p>
            <h1 className="mt-8 text-[4.2rem] font-semibold leading-[0.88] tracking-normal text-white sm:text-[9rem] lg:text-[13rem]">
              RIA
            </h1>
            <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <h2 className="max-w-[21rem] text-[1.75rem] font-semibold leading-[1.08] tracking-normal sm:max-w-4xl sm:text-6xl">
                Private cognitive intelligence for memory, reasoning, and adaptive AI workflows.
              </h2>
              <div>
                <p className="max-w-[21rem] text-base leading-8 text-zinc-400 sm:max-w-2xl">
                  RIA is a premium personal AI operating layer: memory graph, reflection engine, emotional context, data controls, and a production roadmap across web, desktop, mobile, and devices.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/demo" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Launch RIA Orbit</Link>
                  <Link to="/product" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white">View platform</Link>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {platformStats.map(([label, copy]) => (
              <div key={label} className="bg-[#05070b]/92 p-5">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{copy}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Link to="/demo" className="group min-h-[30rem] overflow-hidden rounded-lg border border-white/10 bg-black text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <div className="flex h-full min-h-[30rem] flex-col justify-between bg-[linear-gradient(135deg,rgba(2,6,23,0.9),rgba(4,4,5,0.96)),url('/images/hero/ria-hero.jpg')] bg-cover bg-center p-6 sm:p-8">
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span>RIA Orbit command center</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="mb-4 inline-flex rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-300">Production demo</p>
                  <h3 className="max-w-xl text-3xl font-semibold leading-[1] tracking-normal sm:text-5xl">A premium operating surface for personal AI.</h3>
                  <div className="mt-8 grid max-w-2xl gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                    {operatingMetrics.slice(0, 4).map(([label, value]) => (
                      <div key={label} className="bg-black/45 p-4 backdrop-blur">
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featured.slice(0, 2).map((card) => (
                <Link key={card.title} to={card.to} className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 transition hover:border-cyan-200/30 hover:bg-white/[0.07]">
                  <p className="text-sm text-zinc-500">{card.type}</p>
                  <h3 className="mt-16 text-2xl font-semibold leading-[1.05] tracking-normal text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-500">{card.copy}</p>
                  <ArrowRight className="mt-6 h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-16 text-white">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-normal">Platform focus</h2>
            <Link to="/research" className="text-sm text-zinc-400 hover:text-white">View all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {news.map(([type, title]) => (
              <Link key={title} to="/research" className="group border-t border-white/10 pt-5">
                <p className="text-sm text-zinc-500">{type}</p>
                <h3 className="mt-2 min-h-20 text-xl font-semibold leading-[1.08] tracking-normal text-white">{title}</h3>
                <p className="mt-6 text-sm text-zinc-400">Read update</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-white/[0.035] py-16 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Executive prompt</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-normal sm:text-6xl">Ask RIA like a command layer.</h2>
            </div>
            <HeroSearch />
          </div>
        </Container>
      </section>
      <HomeSystemPanels />
      <DifferenceSection />
    </>
  )
}

function HomeSystemPanels() {
  return (
    <section className="void-cosmos relative overflow-hidden border-t border-white/10 bg-transparent py-20 text-white">
      <div className="void-stars absolute inset-0 opacity-35" />
      <Container>
        <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="cosmos-glass rounded-lg border border-white/10 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Adaptive operation</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-normal">RIA turns personal context into controlled intelligence.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">The product direction is not another chat window. RIA is a private operating surface for memory, reasoning, reflection, goals, and action.</p>
            <div className="mt-8 space-y-3">
              {proactiveSignals.map((signal) => (
                <div key={signal} className="rounded-md border border-white/10 bg-black/30 p-4 text-sm leading-7 text-zinc-300">
                  {signal}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
            {platformLayers.map(([title, Icon, copy]) => (
              <div key={title} className="cosmos-glass p-7">
                <Icon className="h-6 w-6 text-cyan-200" />
                <h3 className="mt-12 text-2xl font-semibold tracking-normal">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Featured() {
  return (
    <section className="border-t border-white/10 bg-transparent py-16 text-white">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((card, index) => (
            <Link key={card.title} to={card.to} className={index === 0 ? 'group lg:col-span-2' : 'group'}>
              <div className="aspect-[1.65/1] overflow-hidden bg-zinc-900">
                <CardImage type={card.type} />
              </div>
              <p className="mt-4 text-sm text-zinc-500">{card.type}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-normal text-white">{card.title}</h2>
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
    <section className="border-t border-white/10 bg-transparent py-20 text-white">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Platform modules</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">RIA production architecture</h2>
            <p className="mt-3 max-w-2xl text-zinc-400">A full personal cognitive system organized into product-ready layers.</p>
          </div>
          <Link to="/product" className="hidden text-sm text-zinc-300 hover:text-white sm:block">View product</Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {productCards.map(([title, Icon, copy]) => (
            <div key={title} className="bg-[#05070b]/86 p-6 transition hover:bg-[#0d1017]">
              <Icon className="h-7 w-7 text-violet-200" />
              <h3 className="mt-16 text-2xl font-semibold tracking-normal text-white">{title}</h3>
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
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-normal">Recent updates</h2>
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
      <section className="border-t border-white/10 bg-white/[0.035] py-20 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <h2 className="text-5xl font-semibold leading-[0.98] tracking-normal sm:text-7xl">Get started with RIA</h2>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400">Start with the demo, explore the product architecture, or support the build through the funding page.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/download" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Download RIA</Link>
                <Link to="/demo" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">Try demo</Link>
                <Link to="/funding" className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white">Support RIA</Link>
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
    <section className="relative overflow-hidden bg-transparent pt-32 text-white">
      <div className="void-stars pointer-events-none absolute inset-0 opacity-20" />
      <Container className="pb-20">
        <p className="relative text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">{label}</p>
        <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-normal sm:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">{copy}</p>
      </Container>
    </section>
  )
}

function Research() {
  return (
    <>
      <PageHero label="Research" title="Researching persistent cognition for personal AI" copy="RIA explores memory continuity, reflective summarization, emotional context, belief classification, and user-owned cognition as one integrated product architecture." />
      <ProductGrid />
    </>
  )
}

function Product() {
  return (
    <>
      <PageHero label="Product" title="RIA is a private cognitive operating system" copy="A premium AI interface designed for memory continuity, reflection, journaling, emotional context, private data control, and long-term device portability." />
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <Dashboard />
        </Container>
      </section>
      <DifferenceSection />
    </>
  )
}

function Dashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">RIA console</p>
            <h2 className="mt-2 text-3xl font-semibold">Operating dashboard</h2>
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-200">READY</span>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 md:grid-cols-2">
          {operatingMetrics.map(([label, value, copy]) => (
            <div key={label} className="bg-[#05070b] p-5">
              <Gauge className="h-5 w-5 text-cyan-200" />
              <p className="mt-8 text-sm text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 md:grid-cols-2">
          {[
            ['Private retrieval', Database],
            ['Reasoning route', Cpu],
            ['Trust boundary', LockKeyhole],
            ['Action output', ArrowRight]
          ].map(([label, Icon]) => (
            <div key={label} className="flex items-center gap-3 bg-white/[0.035] p-4">
              <Icon className="h-5 w-5" />
              <p className="text-sm font-medium text-zinc-300">{label}</p>
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
    <div className="rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-5">
        <p className="font-semibold">RIA response pipeline</p>
        <p className="mt-1 text-sm text-zinc-500">Session context converted into memory, reflection, and next action.</p>
      </div>
      <div className="space-y-4 p-5">
        <div className="ml-auto max-w-[82%] rounded-lg bg-white p-4 text-sm text-black">Summarize my current priorities and risks.</div>
        <div className="max-w-[86%] rounded-lg bg-white/[0.08] p-4 text-sm leading-6 text-zinc-200">RIA identifies the strongest goal signal, compares it with emotional pressure, then creates a private memory update and a focused next action.</div>
        <div className="ml-auto max-w-[82%] rounded-lg bg-white p-4 text-sm text-black">Turn that into an execution plan.</div>
      </div>
    </div>
  )
}

function DifferenceSection() {
  return (
    <section className="border-t border-white/10 bg-transparent py-20 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Why RIA is different</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-normal sm:text-6xl">Not a chatbot. A private intelligence infrastructure layer.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              RIA is being built as software that understands a person over time. Conversation becomes structured memory, emotional context, private journaling, belief signals, and execution guidance.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
              The target experience is premium and controlled: an AI system that helps users think clearly, recover emotionally, organize decisions, and keep ownership of the data that makes it useful.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
            {differentiators.map(([title, Icon, copy]) => (
              <div key={title} className="bg-[#05070b]/90 p-7">
                <Icon className="h-6 w-6 text-violet-200" />
                <h3 className="mt-12 text-2xl font-semibold tracking-normal">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Safety() {
  return (
    <>
      <PageHero label="Safety" title="Personal AI requires production-grade control" copy="RIA is designed around visible memory, editable data, clear privacy boundaries, and honest communication about what the system can and cannot do." />
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Editable memory', Database],
              ['Private by default', LockKeyhole],
              ['No false consciousness', ShieldCheck],
              ['User-owned data', Check]
            ].map(([title, Icon]) => (
              <div key={title} className="bg-[#05070b] p-7">
                <Icon className="h-7 w-7" />
                <h3 className="mt-16 text-2xl font-semibold tracking-normal">{title}</h3>
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
      <PageHero label="Roadmap" title="RIA is becoming a private cognitive operating system" copy="The roadmap moves from premium web platform and RIA Orbit demo into a working product with memory, retrieval, journaling, reflection, emotional intelligence, voice, privacy, and early-access distribution." />
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <div className="grid gap-5 lg:grid-cols-4">
            {roadmap.map(([phase, title, copy]) => (
              <div key={phase} className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                <p className="text-sm text-zinc-500">{phase}</p>
                <h3 className="mt-10 text-2xl font-semibold tracking-normal">{title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-8 text-white">
              <p className="text-sm text-zinc-500">Vision</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-normal">A private AI system that compounds personal context.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">RIA is built for personal continuity: memory, emotion, reflection, journaling, goals, and decisions in one trusted product surface.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
              <Target className="h-8 w-8" />
              <h3 className="mt-10 text-3xl font-semibold tracking-normal">What success looks like</h3>
              <p className="mt-5 leading-7 text-zinc-400">A working RIA product users can trust every day, with persistent memory, emotional trend visibility, journal summaries, and user-owned data controls.</p>
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
      <PageHero label="Funding" title="Build RIA into a premium AI product" copy="Funding moves RIA from platform demo to functional product: private memory backend, model API, retrieval, journaling engine, emotional dashboard, voice, privacy controls, and early-access packaging." />
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-8 text-white">
              <Banknote className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Founder contact</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-normal">Invest in the first premium RIA release</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-400">For funding, partnership, or investor conversations, contact Sudeep Bala directly.</p>
              <a href="mailto:balasudeep22@gmail.com?subject=Funding%20RIA" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Email Sudeep</a>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
              {['Model/API integration', 'Memory vault', 'Journal engine', 'Emotion dashboard', 'Voice layer', 'Privacy controls'].map((item) => (
                <div key={item} className="bg-[#05070b] p-6">
                  <Check className="h-5 w-5" />
                  <p className="mt-10 text-xl font-semibold tracking-normal">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
              <Mail className="h-7 w-7 text-cyan-200" />
              <p className="mt-8 text-sm text-zinc-500">Investor contact</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-normal text-white">Contact the founder directly</h2>
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
      <PageHero label="Download" title="Prepare for RIA early access" copy="RIA is preparing for controlled early access across web, desktop, mobile, and future device environments. Public installers will appear here after the secure prototype release is approved." />
      <section className="border-t border-white/10 bg-transparent py-20 text-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-8 text-white">
              <Sparkles className="h-8 w-8" />
              <p className="mt-10 text-sm text-zinc-500">Early access</p>
              <h2 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-normal">RIA is preparing for controlled product access.</h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-400">The first RIA release will focus on a trusted personal AI experience: memory, journaling, reflection, emotional support, calm mode, and privacy-first data controls. Until the public installer is ready, investors and early users can request direct prototype access.</p>
              <a href="mailto:balasudeep22@gmail.com?subject=RIA%20Early%20Access" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Request early access</a>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
              {[
                ['Windows', 'Coming soon', '/downloads/ria-windows.exe'],
                ['macOS', 'Coming soon', '/downloads/ria-mac.dmg'],
                ['Linux', 'Coming soon', '/downloads/ria-linux.AppImage'],
                ['Android', 'Coming soon', '/downloads/ria-android.apk']
              ].map(([platform, status, href]) => (
                <div key={platform} className="bg-[#05070b] p-7">
                  <p className="text-sm text-zinc-500">{platform}</p>
                  <h3 className="mt-10 text-2xl font-semibold tracking-normal">{status}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-500">The installer will appear here when the early access package is approved for release.</p>
                  <a href={href} className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white">Installer coming soon</a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm text-cyan-200">How to download and install RIA</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1] tracking-normal text-white">A clear release path from prototype access to public installers.</h2>
              <div className="mt-8 grid gap-4">
                {installSteps.map(([title, copy], index) => (
                  <div key={title} className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-[3rem_1fr]">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-black">{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-normal">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-zinc-400">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8">
              <Cpu className="h-7 w-7 text-violet-200" />
              <p className="mt-8 text-sm text-zinc-500">Device vision</p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1] tracking-normal">Designed for every generation of personal computing.</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-400">RIA is being designed as portable intelligence software. The long-term ambition is for RIA to run across ordinary electronic devices first, then expand into advanced computing environments as hardware, security, and platform standards evolve.</p>
              <div className="mt-7 grid gap-3">
                {deviceTargets.map(([title, copy]) => (
                  <div key={title} className="border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">{copy}</p>
                  </div>
                ))}
              </div>
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
  const [messages, setMessages] = useState(() => {
    const saved = window.localStorage.getItem('ria-os-messages')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        window.localStorage.removeItem('ria-os-messages')
      }
    }
    return [{ role: 'ria', text: 'RIA Orbit is online. This premium demo simulates the future RIA command center: conversation, memory graph, reflection engine, emotional context, private controls, image fallback, roadmap, funding, downloads, and goal planning. Ask for an executive summary, a memory review, a journal entry, a calm protocol, or a product explanation.' }]
  })
  const [memory, setMemory] = useState(() => {
    const saved = window.localStorage.getItem('ria-os-memory')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        window.localStorage.removeItem('ria-os-memory')
      }
    }
    return initialOsMemory
  })
  const [activeTab, setActiveTab] = useState('core')
  const [surface, setSurface] = useState('workspace')
  const [visualMode, setVisualMode] = useState(() => {
    const themeParam = new URLSearchParams(window.location.search).get('theme')
    if (themeParam === 'light' || themeParam === 'dark') return themeParam
    return window.localStorage.getItem('ria-os-visual-mode') || 'dark'
  })
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const loadedUrlMessage = useRef(false)
  const scrollRef = useRef(null)
  const userMessages = messages.filter((message) => message.role === 'user')
  const lastUserMessage = userMessages[userMessages.length - 1]?.text || ''
  const detectedIntent = getDetectedIntent(lastUserMessage)
  const emotionMode = detectEmotionMode(lastUserMessage)
  const emotionTheme = themeByEmotion[emotionMode]
  const isLight = visualMode === 'light'
  const theme = {
    ...emotionTheme,
    accent: isLight ? 'text-sky-700' : emotionTheme.accent,
    chip: isLight ? 'border-sky-300/70 bg-sky-50 text-sky-950 shadow-sm shadow-sky-100/70' : emotionTheme.chip
  }
  const skin = {
    page: isLight ? 'bg-[#eaf8ff] text-slate-950' : 'bg-[#050505] text-white',
    shell: isLight ? 'bg-white/62 border-blue-200/80 shadow-[0_24px_80px_rgba(59,130,246,0.13)] backdrop-blur-2xl' : 'bg-white/[0.055] border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl',
    panel: isLight ? 'bg-white/58 border-blue-200/80 shadow-sm shadow-blue-100/70 backdrop-blur-xl' : 'bg-white/[0.06] border-white/10 shadow-inner shadow-white/[0.03]',
    module: isLight ? 'border-blue-200/80 bg-white/64 shadow-sm shadow-blue-100/70 backdrop-blur-xl' : 'border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
    field: isLight ? 'border-blue-200/80 bg-white/58 text-slate-800 focus:border-blue-400' : 'border-white/10 bg-black/25 text-zinc-300 focus:border-white/30',
    divider: isLight ? 'border-blue-200/70' : 'border-white/10',
    muted: isLight ? 'text-slate-500' : 'text-zinc-500',
    text: isLight ? 'text-slate-950' : 'text-white',
    soft: isLight ? 'text-slate-700' : 'text-zinc-300',
    active: isLight ? 'bg-blue-50/90 text-slate-950 border-blue-300 shadow-sm shadow-blue-200/80' : 'bg-white text-black border-white'
  }
  const memoryCounts = {
    goals: memory.nodes.filter((node) => node.type === 'goal').length,
    emotions: memory.nodes.filter((node) => node.type === 'emotion').length,
    beliefs: memory.nodes.filter((node) => node.type === 'belief').length,
    conversations: memory.nodes.filter((node) => node.type === 'conversation' || node.type === 'journal').length
  }
  const activeSuggestion = getActiveSuggestion(memory)
  const displayActivity = [
    ...memory.timeline.slice(0, 2).map((event) => [event.label, new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]),
    ...premiumActivity
  ].slice(0, 6)
  const mobileTelemetry = [
    ['Mode', detectedIntent, Zap],
    ['Memory', `${memory.nodes.length} nodes`, Database],
    ['Persona', `${Math.round(memory.personaLevel * 10)}%`, BrainCircuit]
  ]

  const updateMemoryNode = (id, detail) => {
    setMemory((current) => ({
      ...current,
      nodes: current.nodes.map((node) => node.id === id ? { ...node, detail } : node)
    }))
  }

  const deleteMemoryNode = (id) => {
    setMemory((current) => ({
      ...current,
      nodes: current.nodes.filter((node) => node.id !== id)
    }))
  }

  const send = (value = input) => {
    const clean = value.trim()
    if (!clean || isThinking) return
    const intent = getDetectedIntent(clean)
    const imageRequest = isImageRequest(clean)
    const now = new Date().toISOString()
    const memoryNode = createMemoryNode(clean, intent)
    setMessages((current) => [...current, { role: 'user', text: clean }])
    setMemory((current) => ({
      ...current,
      personaLevel: Math.min(9, current.personaLevel + 0.1),
      nodes: current.settings.memoryWrite ? [memoryNode, ...current.nodes].slice(0, 24) : current.nodes,
      timeline: [
        { id: `event-${Date.now()}`, label: `${intent} detected`, detail: clean, createdAt: now },
        ...current.timeline
      ].slice(0, 18)
    }))
    setInput('')
    setIsThinking(true)
    window.setTimeout(() => {
      if (imageRequest) {
        const image = createFallbackImage(clean)
        setMessages((current) => [
          ...current,
          {
            role: 'ria',
            text: `I generated a no-GPU fallback visual for "${image.prompt}". This runs fully in the browser, so users can still create and download an image even when GPU or AI image services are unavailable.\n\nActive behavior: ${activeSuggestion}`,
            image
          }
        ])
      } else {
        const reply = `${getRiaReply(clean)}\n\nActive behavior: ${activeSuggestion}`
        setMessages((current) => [...current, { role: 'ria', text: reply }])
      }
      setIsThinking(false)
    }, 520)
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

  useEffect(() => {
    window.localStorage.setItem('ria-os-messages', JSON.stringify(messages.slice(-50)))
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isThinking])

  useEffect(() => {
    window.localStorage.setItem('ria-os-memory', JSON.stringify(memory))
  }, [memory])

  useEffect(() => {
    window.localStorage.setItem('ria-os-visual-mode', visualMode)
  }, [visualMode])

  const renderActiveModule = () => {
    if (activeTab === 'memory') {
      return (
        <div className="grid gap-5">
          <div>
            <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>Private memory graph</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">Editable memory nodes</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-7 ${skin.muted}`}>Every saved signal stays visible and user-controlled. This demo stores only local browser session memory.</p>
          </div>
          <div className="grid gap-3">
            {memory.nodes.map((node) => (
              <div key={node.id} className={`rounded-lg border p-4 ${skin.module}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs capitalize ${theme.chip}`}>{node.type}</span>
                  <button onClick={() => deleteMemoryNode(node.id)} className={`grid h-8 w-8 place-items-center rounded-full border transition ${skin.panel} ${skin.muted} ${isLight ? 'hover:text-slate-950' : 'hover:text-white'}`} aria-label="Delete memory">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className={`text-sm font-semibold ${skin.text}`}>{node.title}</p>
                <textarea value={node.detail} onChange={(event) => updateMemoryNode(node.id, event.target.value)} className={`mt-3 min-h-20 w-full resize-none rounded-md border p-3 text-sm leading-6 outline-none ${skin.field}`} />
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'reflection') {
      return (
        <div>
          <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>Reflection engine</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Patterns RIA is detecting</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Auto journaling', `${memoryCounts.conversations} entries are ready for daily summaries.`],
              ['Belief detection', `${memoryCounts.beliefs} belief signals are available for reframing.`],
              ['Pattern detection', activeSuggestion]
            ].map(([title, copy]) => (
              <div key={title} className={`rounded-lg border p-5 ${skin.module}`}>
                <Sparkles className={`h-5 w-5 ${isLight ? 'text-violet-700' : 'text-violet-200'}`} />
                <h3 className="mt-8 text-xl font-semibold tracking-normal">{title}</h3>
                <p className={`mt-3 text-sm leading-7 ${skin.soft}`}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'behavior') {
      return (
        <div>
          <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>Behavior controls</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Adaptive reasoning style</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['Proactive suggestions', 'proactive'],
              ['Write memories automatically', 'memoryWrite']
            ].map(([label, key]) => (
              <button key={key} onClick={() => setMemory((current) => ({ ...current, settings: { ...current.settings, [key]: !current.settings[key] } }))} className={`flex items-center justify-between rounded-lg border p-5 text-left ${skin.module}`}>
                <span>
                  <span className={`block text-sm font-semibold ${skin.text}`}>{label}</span>
                  <span className={`mt-1 block text-xs ${skin.muted}`}>{memory.settings[key] ? 'Enabled' : 'Paused'}</span>
                </span>
                <span className={`h-6 w-11 rounded-full p-1 transition ${memory.settings[key] ? 'bg-cyan-300' : isLight ? 'bg-slate-300' : 'bg-white/15'}`}>
                  <span className={`block h-4 w-4 rounded-full bg-black transition ${memory.settings[key] ? 'translate-x-5' : ''}`} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'emotion') {
      const graph = [memoryCounts.emotions, memoryCounts.goals, memoryCounts.beliefs, userMessages.length].map((value) => Math.max(14, Math.min(100, value * 18 + 18)))
      return (
        <div>
          <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>Emotional signals</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Mood-responsive interface</h2>
          <div className={`mt-8 flex h-56 items-end gap-4 rounded-lg border p-5 ${skin.module}`}>
            {graph.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <motion.div initial={{ height: 20 }} animate={{ height }} className="w-full bg-gradient-to-t from-cyan-300/30 to-white/80" />
                <span className={`text-xs ${skin.muted}`}>{['Emotion', 'Goals', 'Beliefs', 'Chats'][index]}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'guidance') {
      return (
        <div>
          <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>Guidance layer</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Proactive next step</h2>
          <div className={`mt-6 rounded-lg border p-6 ${skin.module}`}>
            <Compass className={`h-7 w-7 ${isLight ? 'text-sky-700' : 'text-cyan-200'}`} />
            <p className={`mt-8 max-w-2xl text-lg leading-8 ${skin.soft}`}>{activeSuggestion}</p>
            <button onClick={() => send('Break my strongest goal into a smaller next step')} className={`mt-6 rounded-full px-5 py-3 text-sm font-medium ${skin.active}`}>Ask RIA to guide me</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <p className={`text-sm font-medium uppercase tracking-[0.18em] ${theme.accent}`}>RIA command center</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">Production demo system state</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
          {demoSystemHealth.map(([label, value, Icon, copy]) => (
            <div key={label} className={`p-5 ${isLight ? 'bg-white/70' : 'bg-[#05070b]'}`}>
              <Icon className={`h-5 w-5 ${isLight ? 'text-sky-700' : 'text-cyan-200'}`} />
              <p className="mt-8 text-2xl font-semibold">{value}</p>
              <p className={`mt-1 text-xs uppercase tracking-[0.16em] ${skin.muted}`}>{label}</p>
              <p className={`mt-4 text-sm leading-6 ${skin.soft}`}>{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
          {[
            ['Goals', memoryCounts.goals, Target],
            ['Emotions', memoryCounts.emotions, HeartPulse],
            ['Beliefs', memoryCounts.beliefs, Fingerprint],
            ['Memory nodes', memory.nodes.length, Database]
          ].map(([label, value, Icon]) => (
            <div key={label} className={`p-5 ${isLight ? 'bg-white/70' : 'bg-white/[0.035]'}`}>
              <Icon className={`h-5 w-5 ${isLight ? 'text-sky-700' : 'text-zinc-300'}`} />
              <p className="mt-8 text-3xl font-semibold">{value}</p>
              <p className={`mt-1 text-xs ${skin.muted}`}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderConversationSurface = () => (
    <div className={`mx-auto mt-5 max-w-[78rem] rounded-lg border p-4 sm:mt-6 sm:p-6 ${skin.shell}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border sm:h-14 sm:w-14 ${skin.panel}`}>
            <BrainCircuit className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className={`text-xs font-semibold tracking-[0.22em] ${skin.muted}`}>HIGH-CONTEXT SESSION</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal sm:text-5xl sm:tracking-normal">RIA Conversation Layer</h2>
            <p className={`mt-3 text-sm ${skin.muted}`}>Memory graph · Reflection engine · Private response routing</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className={`rounded-full border px-4 py-2 ${skin.panel}`}>{isThinking ? 'Processing' : 'Ready'}</span>
          <span className={`rounded-full border px-4 py-2 ${skin.panel}`}>{messages.length} messages</span>
          <button onClick={() => { setMessages([{ role: 'ria', text: 'RIA conversation restarted. I am ready for a clear, high-level conversation.' }]); setInput('') }} className={`grid h-11 w-11 place-items-center rounded-full border ${skin.panel}`} aria-label="Restart conversation">
            <Activity className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 h-[58vh] min-h-[24rem] space-y-6 overflow-y-auto pr-1 sm:mt-8 sm:h-[560px] sm:space-y-8 sm:pr-2">
        {messages.map((message, index) => (
          <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 sm:gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'ria' && <span className={`mt-7 hidden h-9 w-9 shrink-0 place-items-center rounded-full border sm:grid ${skin.panel}`}>R</span>}
            <div className={`max-w-[92%] sm:max-w-[78%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`mb-2 flex items-center gap-2 text-xs ${message.role === 'user' ? 'justify-end' : ''}`}>
                <span className={skin.muted}>{message.role === 'user' ? 'You' : 'RIA'}</span>
                <span className={`rounded-full border px-3 py-1 ${skin.panel}`}>{message.role === 'user' ? 'Input' : 'Advanced AI response'}</span>
              </div>
              <div className={`rounded-lg border px-4 py-4 text-sm leading-7 shadow-xl sm:px-6 sm:py-5 sm:text-base sm:leading-8 ${message.role === 'user' ? skin.active : skin.panel}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
                {message.image && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <img src={message.image.src} alt={message.image.alt} className="aspect-[5/3] w-full object-cover" />
                    <div className="flex items-center justify-between gap-3 p-3 text-xs">
                      <span className={skin.muted}>No-GPU fallback render</span>
                      <a href={message.image.src} download="ria-fallback-render.svg" className={`rounded-full border px-3 py-1 font-semibold ${skin.panel}`}>Download</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {message.role === 'user' && <span className={`mt-7 hidden h-9 w-9 shrink-0 place-items-center rounded-full border sm:grid ${skin.active}`}>Y</span>}
          </motion.div>
        ))}
        {isThinking && (
          <div className={`max-w-[92%] rounded-lg border px-4 py-4 text-sm sm:max-w-[78%] sm:px-6 sm:py-5 sm:text-base ${skin.panel}`}>
            RIA is routing context through memory, intent, emotional signal, and next-action policy...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={(event) => { event.preventDefault(); send() }} className={`mt-6 flex gap-2 rounded-lg border p-3 sm:gap-3 sm:p-4 ${skin.panel}`}>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send() } }} rows={2} className={`min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-base leading-7 outline-none ${skin.text}`} placeholder="Ask RIA for a memory review, executive plan, or calm protocol..." />
        <button disabled={!input.trim() || isThinking} className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg sm:h-14 sm:w-14 ${skin.active} disabled:opacity-40`} aria-label="Send">
          <SendHorizontal className="h-5 w-5" />
        </button>
      </form>
    </div>
  )

  return (
    <section className={`ria-demo relative min-h-screen overflow-hidden ${skin.page} pt-20`}>
      <div className={`void-stars absolute inset-0 ${isLight ? 'opacity-20' : 'opacity-50'}`} />
      <div className={`absolute inset-0 ${isLight ? 'opacity-100' : 'opacity-45'}`}>
        <div className={`thought-stream thought-stream-a ${isLight ? 'hidden' : ''}`} />
        <div className={`thought-stream thought-stream-b ${isLight ? 'hidden' : ''}`} />
        <div className={`absolute inset-0 bg-[size:72px_72px] ${isLight ? 'bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.045)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]'}`} />
      </div>
      {isLight && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.38),transparent_24%),radial-gradient(circle_at_72%_14%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_43%_48%,rgba(255,255,255,0.92),transparent_22%),linear-gradient(135deg,rgba(240,249,255,0.88),rgba(239,246,255,0.74)_45%,rgba(238,242,255,0.9))]" />
      )}
      {!isLight && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.10),transparent_16%),radial-gradient(circle_at_86%_6%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.82))]" />
      )}
      <div className="relative grid min-h-[calc(100vh-5rem)] grid-cols-1 xl:grid-cols-[17rem_1fr]">
        <aside className={`hidden border-r p-5 xl:block ${skin.panel}`}>
          <div className="flex items-center gap-3">
            <Orbit className="h-7 w-7" />
            <div>
              <p className="text-xl font-semibold tracking-normal">RIA ORBIT</p>
              <p className={`text-sm ${skin.muted}`}>Cognitive command center</p>
            </div>
          </div>
          <div className={`mt-10 rounded-lg border px-4 py-3 text-xs font-semibold tracking-[0.12em] ${skin.shell}`}>
            <div className="flex items-center justify-between">
              <span>PRODUCT DEMO</span>
              <span className={isLight ? 'text-slate-700' : 'text-zinc-400'}>SECURE</span>
            </div>
          </div>
          <p className={`mt-10 text-xs font-semibold tracking-[0.18em] ${skin.muted}`}>COMMAND CENTER</p>
          <div className="mt-4 grid gap-2">
            {osTabs.map(([id, label, Icon]) => (
              <button key={id} onClick={() => { setActiveTab(id); if (id === 'chat') setSurface('conversation') }} className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${activeTab === id ? skin.active : `${skin.panel} ${skin.soft} ${isLight ? 'hover:border-slate-500' : 'hover:border-white/30'}`}`}>
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
          <div className={`mx-auto flex max-w-[98rem] flex-wrap items-center gap-2 rounded-lg border p-2 backdrop-blur-xl sm:gap-3 sm:p-3 ${skin.shell}`}>
            <button className={`grid h-11 w-11 place-items-center rounded-full border ${skin.panel}`} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
            <div className={`order-2 flex min-w-0 basis-full items-center gap-3 rounded-lg border px-4 py-3 sm:order-none sm:basis-auto sm:flex-1 sm:px-5 ${skin.panel}`}>
              <Search className={`h-5 w-5 ${skin.muted}`} />
              <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') send() }} className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${skin.text} placeholder:${isLight ? 'text-slate-400' : 'text-zinc-600'}`} placeholder="Ask RIA for memory, planning, reflection, or product strategy..." />
              <span className={`hidden rounded-full border px-3 py-1 text-xs sm:inline ${skin.muted}`}>⌘ K</span>
            </div>
            <span className={`hidden rounded-full border px-4 py-3 text-xs font-semibold tracking-[0.12em] lg:inline-flex ${theme.chip}`}>CONTROLLED DEMO</span>
            <span className={`hidden rounded-full border px-4 py-3 text-xs font-semibold tracking-[0.12em] lg:inline-flex ${theme.chip}`}>ROUTER {isThinking ? 'PROCESSING' : 'STANDBY'}</span>
            <button onClick={() => setVisualMode(isLight ? 'dark' : 'light')} className={`grid h-11 w-11 place-items-center rounded-full border ${skin.panel}`} aria-label="Toggle light and dark mode">
              {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button className={`hidden h-11 w-11 place-items-center rounded-full border sm:grid ${skin.panel}`} aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
            <span className={`hidden h-12 w-12 place-items-center rounded-full border text-lg font-semibold sm:grid ${skin.shell}`}>R</span>
          </div>

          <div className="mt-4 xl:hidden">
            <div className={`flex gap-2 overflow-x-auto rounded-lg border p-2 ${skin.panel}`}>
              {osTabs.map(([id, label, Icon]) => (
                <button key={id} onClick={() => { setActiveTab(id); if (id === 'chat') setSurface('conversation') }} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${activeTab === id ? skin.active : `${skin.panel} ${skin.soft}`}`}>
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={`mx-auto mt-5 flex w-fit rounded-full border p-1 sm:mt-7 ${isLight ? 'border-blue-200 bg-white/60 shadow-sm shadow-blue-100' : 'border-white/10 bg-black/40'}`}>
            {[
              ['workspace', 'Workspace'],
              ['conversation', 'Conversation']
            ].map(([id, item]) => (
              <button key={id} onClick={() => { setSurface(id); if (id === 'conversation') setActiveTab('chat') }} className={`rounded-full px-5 py-2.5 text-sm font-medium sm:px-8 sm:py-3 ${surface === id ? skin.active : skin.soft}`}>{item}</button>
            ))}
          </div>

          <div className={`mx-auto mt-4 max-w-[78rem] rounded-lg border px-5 py-4 text-sm leading-6 ${skin.panel}`}>
            <span className="font-semibold">Product preview:</span> RIA Orbit demonstrates the intended production flow. Memory, inference, activity, and image generation are simulated locally until the full backend and account system ship.
          </div>

          {surface === 'conversation' ? renderConversationSurface() : (
            <>
              <div className={`relative mx-auto mt-5 max-w-[78rem] overflow-hidden rounded-lg border p-5 backdrop-blur-xl sm:mt-6 sm:p-8 ${skin.shell}`}>
                <div className={`pointer-events-none absolute inset-0 ${isLight ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.85),rgba(219,234,254,0.45))]' : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]'}`} />
                <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                  <div>
                    <p className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] ${theme.chip}`}>RIA ORBIT</p>
                    <h1 className={`mt-8 text-5xl font-semibold leading-[0.96] sm:text-7xl ${isLight ? 'text-slate-950' : 'text-white'}`}>Cognitive command center.</h1>
                    <p className={`mt-6 max-w-xl text-base leading-8 ${skin.soft}`}>A production-style preview for memory, reflection, emotional context, model routing, private controls, and action planning.</p>
                  </div>
                  <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
                    {demoSystemHealth.map(([label, value, Icon, copy]) => (
                      <div key={label} className={`p-5 ${isLight ? 'bg-white/70' : 'bg-black/38'}`}>
                        <Icon className={`h-5 w-5 ${isLight ? 'text-sky-700' : 'text-cyan-200'}`} />
                        <p className="mt-8 text-2xl font-semibold">{value}</p>
                        <p className={`mt-1 text-xs uppercase tracking-[0.18em] ${skin.muted}`}>{label}</p>
                        <p className={`mt-4 text-sm leading-6 ${skin.soft}`}>{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-4 grid max-w-[78rem] grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
                {orbitCards.map(([title, copy, Icon, prompt]) => (
                  <button key={title} onClick={() => send(prompt)} className={`group rounded-lg border p-4 text-left transition hover:-translate-y-1 sm:p-5 ${skin.shell}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <span className={`grid h-12 w-12 place-items-center rounded-xl border ${skin.panel}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold">{title}</p>
                        <p className={`mt-1 text-sm ${skin.muted}`}>{copy}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mx-auto mt-4 grid max-w-[78rem] gap-4 lg:grid-cols-[1.05fr_0.75fr]">
                <div className={`rounded-lg border p-4 sm:p-5 ${skin.shell}`}>
              <div className="mb-4 flex items-center justify-between">
                <p className={`text-xs font-semibold tracking-[0.2em] ${skin.muted}`}>COMMAND INPUT</p>
                <span className={`inline-flex items-center gap-2 text-xs font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}><span className="h-2 w-2 rounded-full bg-emerald-400" />ONLINE</span>
              </div>
              <form onSubmit={(event) => { event.preventDefault(); send() }} className={`flex gap-2 rounded-lg border p-3 sm:gap-3 ${skin.panel}`}>
                <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={2} className={`min-w-0 flex-1 resize-none bg-transparent p-3 text-base outline-none ${skin.text}`} placeholder="Ask RIA to summarize, reflect, plan, calm, or explain the product..." />
                <button disabled={!input.trim() || isThinking} className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg ${skin.active} disabled:opacity-40`} aria-label="Send">
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ['Reason', '/reason'],
                  ['Analyze', '/analyze'],
                  ['Evolve', '/evolve'],
                  ['GPU', '/gpu'],
                  ['Memory', '/memory'],
                  ['Reflect', '/reflect'],
                  ['Optimize', '/optimize']
                ].map(([cmd, slash]) => (
                  <button key={cmd} onClick={() => send(cmd)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${skin.panel}`}>
                    {cmd} <span className={`ml-1 text-xs font-normal ${skin.muted}`}>{slash}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 xl:hidden">
                {demoCapabilities.slice(0, 3).map(([label, value, Icon]) => (
                  <div key={label} className={`rounded-lg border p-3 ${skin.panel}`}>
                    <Icon className="h-4 w-4" />
                    <p className="mt-4 text-sm font-semibold">{value}</p>
                    <p className={`mt-1 text-[0.65rem] uppercase tracking-[0.16em] ${skin.muted}`}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
                {demoCommandRows.map(([command, copy]) => (
                  <button key={command} onClick={() => send(command)} className={`p-4 text-left ${isLight ? 'bg-white/70' : 'bg-black/25'}`}>
                    <p className="font-semibold">{command}</p>
                    <p className={`mt-2 text-xs leading-5 ${skin.muted}`}>{copy}</p>
                  </button>
                ))}
              </div>
              <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-2">
                {messages.slice(-6).map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`max-w-[94%] rounded-lg border p-4 text-sm leading-6 sm:max-w-[80%] ${message.role === 'user' ? `ml-auto ${skin.active}` : skin.panel}`}>
                    <p className={`mb-1 text-[10px] font-semibold tracking-[0.18em] ${message.role === 'user' ? '' : skin.muted}`}>{message.role === 'user' ? 'YOU' : 'RIA'}</p>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.image && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                        <img src={message.image.src} alt={message.image.alt} className="aspect-[5/3] w-full object-cover" />
                        <div className="flex items-center justify-between gap-3 p-3 text-xs">
                          <span className={skin.muted}>No-GPU fallback</span>
                          <a href={message.image.src} download="ria-fallback-render.svg" className={`rounded-full border px-3 py-1 font-semibold ${skin.panel}`}>Download</a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isThinking && <div className={`rounded-lg border p-4 text-sm ${skin.panel}`}>RIA is processing protected memory, routing, and next action...</div>}
                <div ref={scrollRef} />
              </div>
            </div>

            <div className={`rounded-lg border p-5 ${skin.shell}`}>
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold tracking-[0.2em] ${skin.muted}`}>SYSTEM ACTIVITY</p>
                <span className={`text-xs ${skin.muted}`}>{memory.timeline.length} SIGNALS</span>
              </div>
              <div className="mt-5 space-y-4">
                {displayActivity.map(([label, time]) => (
                  <div key={`${label}-${time}`} className={`flex items-start justify-between gap-4 border-b pb-3 ${skin.divider}`}>
                    <div className="min-w-0">
                      <p className={`line-clamp-2 text-sm ${skin.soft}`}>{label}</p>
                    </div>
                    <span className={`shrink-0 text-xs ${skin.muted}`}>{time}</span>
                    <ArrowRight className={`h-4 w-4 ${skin.muted}`} />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
                {demoModuleInsights.map(([label, copy]) => (
                  <div key={label} className={`p-3 ${isLight ? 'bg-white/70' : 'bg-black/20'}`}>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className={`mt-1 text-xs ${skin.muted}`}>{copy}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('memory')} className={`mt-5 w-full rounded-full border px-5 py-3 text-sm font-medium ${skin.panel}`}>Open memory graph</button>
            </div>
              </div>
            </>
          )}

          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`mx-auto mt-4 max-w-[78rem] rounded-lg border p-4 sm:p-6 ${skin.shell}`}>
            {renderActiveModule()}
          </motion.div>
        </main>

      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="ria-site min-h-screen bg-[#050505] text-white">
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


