export const COMPANY = 'AION'
export const PRODUCT = 'RIA'
export const SITE_URL = 'https://www.aiontec.co.in'
export const CONTACT = 'balasudeep22@gmail.com'
export const FOUNDER = 'Sudeep Bala'
export const FOUNDED = '2026'

export type ReleaseStatus = 'available' | 'publishing' | 'coming-soon'

/**
 * Release facts are intentionally centralised so the site never presents an
 * unverified installer. Set `installerUrl` only after a signed public build is
 * published; every download affordance will switch over automatically.
 */
export const RELEASE = {
  version: '0.0.2',
  platform: 'Windows 10 / 11 (64-bit)',
  architecture: 'x86-64',
  channel: 'Windows desktop',
  license: 'Proprietary — AION',
  status: 'publishing' as ReleaseStatus,
  installerUrl: null as string | null,
  installerSize: null as string | null,
}

export const RELEASE_MAILTO = `mailto:${CONTACT}?subject=${encodeURIComponent(
  'RIA release access request',
)}`

export const NAV_ITEMS = [
  { label: 'Product', to: '/product' },
  { label: 'Features', to: '/features' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Download', to: '/download' },
  { label: 'About', to: '/about' },
] as const

export const PRODUCT_IMAGES = {
  workspace: {
    src: '/assets/ria/product/ria-workspace-1600.png',
    srcSet:
      '/assets/ria/product/ria-workspace-960.png 960w, /assets/ria/product/ria-workspace-1600.png 1600w, /assets/ria/product/ria-workspace-2560.png 2560w',
    width: 2560,
    height: 1380,
    alt: 'RIA Workspace on Windows showing conversation, memory, knowledge, and local runtime',
  },
  conversation: {
    src: '/assets/ria/product/ria-detail-conversation-1600.png',
    srcSet:
      '/assets/ria/product/ria-detail-conversation-960.png 960w, /assets/ria/product/ria-detail-conversation-1600.png 1600w, /assets/ria/product/ria-detail-conversation.png 2000w',
    width: 2000,
    height: 700,
    alt: 'RIA conversation workspace with the Ask RIA composer and conversation shortcuts',
  },
  memory: {
    src: '/assets/ria/product/ria-detail-memory.png',
    srcSet: '/assets/ria/product/ria-detail-memory.png 1000w',
    width: 1000,
    height: 430,
    alt: 'RIA workspace showing recent conversation, memory, knowledge, and goals',
  },
  runtime: {
    src: '/assets/ria/product/ria-detail-runtime.png',
    srcSet: '/assets/ria/product/ria-detail-runtime.png 1060w',
    width: 1060,
    height: 430,
    alt: 'RIA live conversation card and local runtime status panel',
  },
  workspaceMain: {
    src: '/assets/ria/product/Screenshot%202026-11-21%20130532.png',
    srcSet: '/assets/ria/product/Screenshot%202026-11-21%20130532.png 2560w',
    width: 2560,
    height: 1380,
    alt: 'RIA desktop workspace showing conversation, memory, knowledge, local runtime, GPU monitoring, and product navigation',
  },
  robotAssistant: {
    src: '/assets/ria/product/ria-robot-assistant-560.jpg',
    srcSet:
      '/assets/ria/product/ria-robot-assistant-560.jpg 560w, /assets/ria/product/ria-robot-assistant-900.jpg 900w, /assets/ria/product/ria-robot-assistant.png 1150w',
    width: 1150,
    height: 1367,
    alt: 'RIA robot assistant — white and silver robotic figure with a dark display face, cyan illuminated eyes, and a RIA Ready status pill',
  },
} as const

export const WORKFLOW = [
  {
    number: '01',
    title: 'Understand',
    copy: 'Bring a question, a document, or a half-formed idea. RIA works through it with you, using the context and sources you choose.',
    items: ['Conversation', 'Think it through', 'Explore a topic'],
  },
  {
    number: '02',
    title: 'Remember',
    copy: 'RIA keeps a persistent record of what matters: memory, core memory, and the knowledge you add. Return to a thread without rebuilding the context.',
    items: ['Memory', 'Core memory', 'Knowledge sources'],
  },
  {
    number: '03',
    title: 'Work',
    copy: 'Move from thinking to doing. Set goals, use the personal assistant, explore the web, and keep the work organised in one workspace.',
    items: ['Goals', 'Personal assistant', 'Web explorer'],
  },
  {
    number: '04',
    title: 'Create',
    copy: 'Generate and collect creative work with the Creative gallery and GPU studio. Keep the outputs alongside the thinking that produced them.',
    items: ['Creative gallery', 'GPU studio', 'Journal'],
  },
] as const

export const PRINCIPLES = [
  {
    number: '01',
    title: 'Private by design',
    copy: 'Your workspace is built around local storage and a local runtime. Cloud features are a choice you configure, not a hidden default.',
  },
  {
    number: '02',
    title: 'Memory with continuity',
    copy: 'Memory, core memory, and knowledge sources are visible parts of the workspace, kept under your control.',
  },
  {
    number: '03',
    title: 'A real desktop workspace',
    copy: 'Not another browser tab. RIA is a Windows application with a local runtime and awareness of the machine it runs on.',
  },
] as const

export const FEATURES = [
  {
    id: 'workspace',
    kicker: 'Workspace',
    title: 'One place for the work around the work.',
    copy: 'RIA brings conversation, memory, knowledge, goals, creative tools, and a local runtime into a single desktop surface. The overview shows what matters now, while the sidebar keeps the deeper systems one step away.',
    items: [
      'Workspace overview',
      'Search and quick jump',
      'Pinned pages',
      'Recorded activity',
    ],
    image: 'workspace',
    reverse: false,
  },
  {
    id: 'conversation',
    kicker: 'Conversation',
    title: 'A conversation that can hold context.',
    copy: 'Ask RIA anything, choose how it should think, or open a live conversation. RIA is designed to work through a problem with you rather than return a single disconnected answer.',
    items: [
      'Ask RIA anything',
      'Think it through',
      'Explore a topic',
      'Live conversation',
    ],
    image: 'conversation',
    reverse: true,
  },
  {
    id: 'memory',
    kicker: 'Memory',
    title: 'Memory you can see and shape.',
    copy: 'RIA separates memory, core memory, and knowledge sources so you can decide what is retained, what is central, and what is reference material. The workspace keeps recent threads close without hiding the system underneath.',
    items: [
      'Memory',
      'Core memory',
      'Knowledge sources',
      'Conversation history',
    ],
    image: 'memory',
    reverse: false,
  },
  {
    id: 'runtime',
    kicker: 'Local runtime',
    title: 'Aware of the machine it runs on.',
    copy: 'The local runtime panel surfaces connection state, CPU, memory, and GPU information. When local models are configured, inference can happen on your hardware instead of leaving the machine.',
    items: [
      'Local runtime status',
      'CPU, memory, and GPU visibility',
      'Optional Ollama models',
      'Private by design',
    ],
    image: 'runtime',
    reverse: true,
  },
  {
    id: 'goals',
    kicker: 'Goals & assistant',
    title: 'From intention to a working plan.',
    copy: 'Set goals, keep a personal assistant in the loop, and use the dashboard to see the state of your work. RIA is built to support sustained projects, not just one-off prompts.',
    items: ['Goals', 'Personal assistant', 'Dashboard', 'Talk to RIA'],
    image: null,
    reverse: false,
  },
  {
    id: 'creative',
    kicker: 'Creative tools',
    title: 'A studio beside the thinking.',
    copy: 'The Creative gallery and GPU studio keep generated work alongside the conversation and references that shaped it. Image generation can use local GPU tooling when you configure it.',
    items: [
      'Creative gallery',
      'GPU studio',
      'Journal',
      'Local image generation (optional)',
    ],
    image: null,
    reverse: true,
  },
  {
    id: 'knowledge',
    kicker: 'Knowledge',
    title: 'Your sources, brought into reach.',
    copy: 'Add the documents and pages you want RIA to work with. Knowledge sources are explicit: you choose what enters the workspace, and you can revisit the material behind an answer.',
    items: ['Knowledge sources', 'Web explorer', 'Teach RIA', 'Journal'],
    image: null,
    reverse: false,
  },
] as const

export const SPECS = [
  ['Operating system', 'Windows 10 (64-bit) or Windows 11'],
  ['Architecture', 'x86-64'],
  ['Memory', '16 GB RAM recommended (8 GB minimum)'],
  ['Storage', '5 GB available disk space'],
  ['Runtime', 'Desktop application with a local runtime'],
  ['AI models', 'Cloud API (configured by you) + local models via Ollama (optional)'],
  ['GPU', 'NVIDIA GPU recommended for local inference and image generation'],
  ['Optional tools', 'Ollama, Automatic1111, Forge, or ComfyUI'],
  ['Internet', 'Required for cloud features; local functionality depends on installed local models'],
] as const

export const PRIVACY_ITEMS = [
  {
    title: 'Local-first architecture',
    subtitle: 'Where your workspace lives',
    body: [
      'RIA is designed to keep the working parts of your workspace on your machine. Memory, core memory, knowledge sources, settings, and application state are stored locally in your user directory.',
      'The local runtime panel in RIA shows the state of the machine running the workspace. When local models are configured, inference can happen on that machine rather than in the cloud.',
    ],
  },
  {
    title: 'What leaves your device',
    subtitle: 'Cloud features are explicit',
    body: [
      'When you connect a cloud AI provider, the prompts you send are processed by that provider under its terms and privacy policy. RIA does not need a cloud provider for local features, but local models and dependencies must be installed and configured.',
      'Model downloads, software updates, and any online services you configure use an internet connection. RIA is not fully offline by default.',
    ],
  },
  {
    title: 'Your controls',
    subtitle: 'What you can manage',
    body: [
      'You choose which AI providers to connect, which sources enter your knowledge base, and which local tools RIA may use.',
      'Memory is designed to remain visible and manageable. You can inspect, export, or clear memory from within the application, and you can remove knowledge sources you no longer want in the workspace.',
    ],
  },
  {
    title: 'Permissions',
    subtitle: 'What RIA can access',
    body: [
      'RIA requests filesystem access for the documents and sources you explicitly add. It does not need to scan your entire drive.',
      'Microphone access, when used for voice interaction, is initiated by you. Network access is used for the providers and services you configure, model downloads, and application updates.',
    ],
  },
  {
    title: 'Online dependencies',
    subtitle: 'When the internet is required',
    body: [
      'Cloud AI features require an internet connection. Local language models through Ollama can work without one once the models are installed. Local image generation through Automatic1111, Forge, or ComfyUI depends on your local setup.',
      'Some capabilities are optional by design. You can use RIA without connecting every integration.',
    ],
  },
  {
    title: 'What we do not claim',
    subtitle: 'Clear boundaries',
    body: [
      'RIA is not a fully offline product by default, and it is not a substitute for your judgment. AI models can be wrong, incomplete, or outdated.',
      'This page describes the current product design in plain language. It is not a legal privacy policy or a security certification. For specific questions about your setup, contact AION directly.',
    ],
  },
] as const
