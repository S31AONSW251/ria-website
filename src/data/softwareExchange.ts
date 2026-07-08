export const softwareCategories = [
  'All',
  'Agents',
  'Plugins',
  'Automations',
  'UI Modules',
  'Memory Tools',
  'Knowledge Tools',
  'Robotics',
  'Local Apps',
  'Experimental'
] as const

export type SoftwareCategory = (typeof softwareCategories)[number]

export type ExchangeProject = {
  id: string
  title: string
  description: string
  author: string
  category: Exclude<SoftwareCategory, 'All'>
  version: string
  license: string
  stars: number
  downloads: number
  updated: string
  compatibility: string
  tags: string[]
  verified: boolean
  featured: boolean
}

// Demonstration catalog. Keep this shape stable when the Exchange API is connected.
export const exchangeProjects: ExchangeProject[] = [
  {
    id: 'memory-atlas',
    title: 'Memory Atlas',
    description: 'Inspect episodic, semantic, project, and identity memory as a source-linked local graph.',
    author: 'AION Labs',
    category: 'Memory Tools',
    version: '0.9.4',
    license: 'Apache-2.0',
    stars: 1284,
    downloads: 18420,
    updated: '2 days ago',
    compatibility: 'RIA OS 0.9+',
    tags: ['local-first', 'graph', 'memory'],
    verified: true,
    featured: true
  },
  {
    id: 'orbit-agent-kit',
    title: 'Orbit Agent Kit',
    description: 'Composable owner-approved agents with visible plans, permission gates, and recoverable execution.',
    author: 'Orbit Builders',
    category: 'Agents',
    version: '1.2.0',
    license: 'MIT',
    stars: 963,
    downloads: 12108,
    updated: '4 days ago',
    compatibility: 'RIA Orbit 1.0+',
    tags: ['agents', 'approval', 'tooling'],
    verified: true,
    featured: true
  },
  {
    id: 'local-workflow-engine',
    title: 'Local Workflow Engine',
    description: 'Run scheduled multi-step automations on local infrastructure with audit-ready execution records.',
    author: 'Private Stack Collective',
    category: 'Automations',
    version: '0.8.7',
    license: 'MPL-2.0',
    stars: 742,
    downloads: 9870,
    updated: '1 week ago',
    compatibility: 'RIA OS 0.8+',
    tags: ['automation', 'scheduler', 'audit'],
    verified: true,
    featured: true
  },
  {
    id: 'knowledge-bridge',
    title: 'Knowledge Bridge',
    description: 'Normalize local documents into permission-aware knowledge nodes with explicit source provenance.',
    author: 'Nodecraft India',
    category: 'Knowledge Tools',
    version: '0.7.1',
    license: 'Apache-2.0',
    stars: 616,
    downloads: 7544,
    updated: '9 days ago',
    compatibility: 'RIA Knowledge 0.7+',
    tags: ['retrieval', 'provenance', 'documents'],
    verified: true,
    featured: true
  },
  {
    id: 'command-surface',
    title: 'Command Surface',
    description: 'A responsive glass command interface for telemetry, approvals, memory, and agent activity.',
    author: 'AION Interface Group',
    category: 'UI Modules',
    version: '1.0.3',
    license: 'MIT',
    stars: 489,
    downloads: 6208,
    updated: '12 days ago',
    compatibility: 'RIA UI SDK 1.0+',
    tags: ['react', 'dashboard', 'accessible'],
    verified: true,
    featured: true
  },
  {
    id: 'robotics-signal-bus',
    title: 'Robotics Signal Bus',
    description: 'A guarded adapter layer for translating approved RIA plans into simulator and robotics signals.',
    author: 'Kinetic Systems',
    category: 'Robotics',
    version: '0.4.2',
    license: 'BSD-3-Clause',
    stars: 371,
    downloads: 2932,
    updated: '2 weeks ago',
    compatibility: 'RIA Robotics Preview',
    tags: ['robotics', 'simulation', 'safety'],
    verified: false,
    featured: true
  },
  {
    id: 'vault-backup',
    title: 'Vault Backup',
    description: 'Encrypted local snapshots, integrity checks, and human-readable restore plans for RIA vaults.',
    author: 'Local Systems Guild',
    category: 'Local Apps',
    version: '0.6.5',
    license: 'MIT',
    stars: 284,
    downloads: 4185,
    updated: '3 weeks ago',
    compatibility: 'RIA Desktop 0.9+',
    tags: ['backup', 'encryption', 'desktop'],
    verified: true,
    featured: false
  },
  {
    id: 'context-window-lab',
    title: 'Context Window Lab',
    description: 'Evaluate retrieval strategies and context packing against repeatable local test suites.',
    author: 'Open Cognition Group',
    category: 'Experimental',
    version: '0.3.0',
    license: 'MIT',
    stars: 198,
    downloads: 1760,
    updated: '1 month ago',
    compatibility: 'RIA Research Runtime',
    tags: ['evaluation', 'context', 'research'],
    verified: false,
    featured: false
  },
  {
    id: 'model-router-plugin',
    title: 'Model Router Plugin',
    description: 'Policy-based routing across local and approved cloud models with cost and latency telemetry.',
    author: 'Inference Works',
    category: 'Plugins',
    version: '0.5.8',
    license: 'Apache-2.0',
    stars: 447,
    downloads: 5360,
    updated: '1 month ago',
    compatibility: 'RIA Core 0.8+',
    tags: ['models', 'routing', 'telemetry'],
    verified: true,
    featured: false
  }
]

export const exchangeReviewSteps = [
  ['01', 'Submitted', 'Repository, ownership, contact, license, compatibility, and release metadata are captured.'],
  ['02', 'Security Review', 'Permissions, dependencies, data movement, secrets, and execution boundaries are evaluated.'],
  ['03', 'Compatibility Check', 'Manifest structure, RIA runtime support, installation, failure behavior, and rollback are checked.'],
  ['04', 'AION Verified', 'Verification may be issued after human review; it never grants automatic execution authority.'],
  ['05', 'Published', 'Approved metadata can enter the public catalog when a persistent backend registry is connected.']
] as const
