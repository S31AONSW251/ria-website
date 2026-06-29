import {
  Activity,
  BrainCircuit,
  Check,
  Code2,
  Database,
  LockKeyhole,
  MessageCircle,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import type { CSSProperties } from 'react'

function WindowBar({ title, status = 'LIVE' }: { title: string; status?: string }) {
  return (
    <div className="mock-window-bar">
      <div className="mock-window-controls"><i /><i /><i /></div>
      <span>{title}</span>
      <strong><i /> {status}</strong>
    </div>
  )
}

function MiniSidebar({ active = 0 }: { active?: number }) {
  return (
    <aside className="mock-sidebar" aria-hidden="true">
      <span className="mock-sidebar-mark">R</span>
      {[Orbit, Database, Network, BrainCircuit, Code2].map((Icon, index) => (
        <i className={index === active ? 'is-active' : ''} key={index}><Icon /></i>
      ))}
      <i className="mock-sidebar-lock"><LockKeyhole /></i>
    </aside>
  )
}

function OrbitInterface() {
  return (
    <div className="mock-window mock-orbit-window">
      <WindowBar title="RIA ORBIT / PRIVATE WORKSPACE" />
      <div className="mock-app-shell">
        <MiniSidebar />
        <div className="mock-orbit-main">
          <div className="mock-command-line"><span>Ask RIA to plan, reason, or act…</span><kbd>⌘ ↵</kbd></div>
          <div className="mock-orbit-grid">
            <div className="mock-mission-card">
              <small>ACTIVE MISSION</small><strong>Investor launch preparation</strong>
              <div className="mock-progress"><i /></div>
              <span>06 tasks · 04 verified</span>
            </div>
            <div className="mock-system-card">
              <small>SYSTEM PULSE</small>
              {[84, 61, 76].map((value, index) => <div key={index}><span>{['Memory', 'Reasoning', 'Tools'][index]}</span><i><b style={{ width: `${value}%` }} /></i><em>{value}%</em></div>)}
            </div>
            <div className="mock-context-card"><small>WORKING CONTEXT</small><strong>RIA website architecture</strong><span>28 memories connected</span><span>12 source files active</span></div>
            <div className="mock-activity-card"><small>RECENT ACTIVITY</small>{['Memory graph indexed', 'Architecture plan reviewed', 'Build checks completed'].map((item) => <span key={item}><i />{item}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MemoryInterface() {
  return (
    <div className="mock-window mock-memory-window">
      <WindowBar title="MEMORY CENTER" status="INDEXED" />
      <div className="mock-memory-layout">
        <div className="mock-memory-copy"><small>LONG-TERM MEMORY</small><strong>12,481</strong><span>connected memories</span><div><i /><i /><i /><i /></div></div>
        <svg className="mock-memory-graph" viewBox="0 0 270 175" aria-hidden="true">
          <g className="memory-links"><path d="M24 82 L82 40 L137 89 L197 37 L245 74" /><path d="M82 40 L67 126 L137 89 L171 142 L245 74" /><path d="M24 82 L67 126 M197 37 L171 142 M137 89 L238 132" /></g>
          <g className="memory-nodes"><circle cx="24" cy="82" r="7" /><circle cx="82" cy="40" r="11" /><circle cx="67" cy="126" r="6" /><circle cx="137" cy="89" r="15" /><circle cx="197" cy="37" r="8" /><circle cx="171" cy="142" r="9" /><circle cx="245" cy="74" r="11" /><circle cx="238" cy="132" r="5" /></g>
        </svg>
        <div className="mock-memory-tags"><span>Identity</span><span>Projects</span><span>Decisions</span></div>
      </div>
    </div>
  )
}

function KnowledgeInterface() {
  const nodes = [
    ['RIA', 'core'], ['Memory', ''], ['Local AI', ''], ['Projects', ''], ['Goals', ''], ['Sources', ''], ['Tools', '']
  ]
  return (
    <div className="mock-window mock-knowledge-window">
      <WindowBar title="KNOWLEDGE UNIVERSE" status="SYNCED" />
      <div className="knowledge-map">
        <div className="knowledge-rings" />
        {nodes.map(([label, variant], index) => <span className={`knowledge-node knowledge-node-${index} ${variant}`} key={label}><i />{label}</span>)}
        <svg viewBox="0 0 420 230" aria-hidden="true"><path d="M210 112 L90 54 M210 112 L333 50 M210 112 L65 151 M210 112 L352 158 M210 112 L174 202 M210 112 L253 207" /></svg>
      </div>
    </div>
  )
}

function CoreXInterface() {
  const actions = [
    ['Update launch narrative', '12 files', 'LOW RISK'],
    ['Index architecture notes', '48 memories', 'LOCAL'],
    ['Prepare investor summary', 'Owner review', 'APPROVAL']
  ]
  return (
    <div className="mock-window mock-corex-window">
      <WindowBar title="AUTONOMOUS COREX" status="SUPERVISED" />
      <div className="corex-heading"><div><small>ACTION QUEUE</small><strong>03 proposals</strong></div><span><ShieldCheck /> Approval gate active</span></div>
      <div className="corex-queue">
        {actions.map(([title, meta, status], index) => <article key={title}><i>{String(index + 1).padStart(2, '0')}</i><div><strong>{title}</strong><small>{meta}</small></div><span>{status}</span></article>)}
      </div>
      <div className="corex-actions"><button>Review plan</button><button><Check /> Approve selected</button></div>
    </div>
  )
}

function DefenseInterface() {
  return (
    <div className="mock-window mock-defense-window">
      <WindowBar title="DEFENSECORE / ANALYSIS" status="MONITORING" />
      <div className="defense-grid">
        <div className="defense-map"><i className="defense-scan" /><b className="defense-point point-a" /><b className="defense-point point-b" /><b className="defense-point point-c" /></div>
        <div className="defense-telemetry"><small>DECISION SIGNALS</small>{[['Context integrity', '96'], ['Source confidence', '88'], ['Operational state', '72']].map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><em>{value}</em></div>)}</div>
      </div>
      <div className="defense-status"><ShieldCheck /><span><strong>Owner boundary protected</strong><small>No external action authorized</small></span></div>
    </div>
  )
}

function StudioInterface() {
  return (
    <div className="mock-window mock-studio-window">
      <WindowBar title="SOFTWARE STUDIO" status="BUILD 418" />
      <div className="studio-tabs"><span className="is-active">App.tsx</span><span>core.ts</span><span>memory.ts</span></div>
      <div className="studio-shell">
        <div className="studio-code" aria-hidden="true">
          <span><i>01</i><b>const</b> architecture = {'{'}</span>
          <span><i>02</i>&nbsp;&nbsp;memory: <em>'persistent'</em>,</span>
          <span><i>03</i>&nbsp;&nbsp;control: <em>'owner'</em>,</span>
          <span><i>04</i>&nbsp;&nbsp;action: <em>'approved'</em></span>
          <span><i>05</i>{'}'}</span>
        </div>
        <div className="studio-agent"><small>AGENT TRACE</small><span><i /> Architecture analyzed</span><span><i /> 14 edits prepared</span><span><i /> TypeScript verified</span></div>
      </div>
      <div className="studio-build"><Check /> Production build passed <strong>1.49s</strong></div>
    </div>
  )
}

function VoiceInterface() {
  return (
    <div className="mock-window mock-voice-window">
      <WindowBar title="TALK TO RIA" status="PRIVATE SESSION" />
      <div className="voice-stage">
        <div className="voice-orb"><i /><i /><i /></div>
        <div className="voice-wave">{[24, 42, 62, 38, 76, 54, 88, 48, 68, 34, 58, 26].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div>
        <p>“I have connected the architecture notes to your active launch plan.”</p>
        <span><i /> Listening locally</span>
      </div>
    </div>
  )
}

const panels = [
  { title: 'RIA Orbit Workspace', label: 'Command surface', icon: Orbit, className: 'product-bento-orbit', surface: <OrbitInterface /> },
  { title: 'Memory Center', label: 'Persistent context', icon: Database, className: 'product-bento-memory', surface: <MemoryInterface /> },
  { title: 'Knowledge Universe', label: 'Connected understanding', icon: Network, className: 'product-bento-knowledge', surface: <KnowledgeInterface /> },
  { title: 'Autonomous CoreX', label: 'Supervised execution', icon: BrainCircuit, className: 'product-bento-corex', surface: <CoreXInterface /> },
  { title: 'DefenseCore', label: 'Decision intelligence', icon: ShieldCheck, className: 'product-bento-defense', surface: <DefenseInterface /> },
  { title: 'Software Studio', label: 'Builder system', icon: Code2, className: 'product-bento-studio', surface: <StudioInterface /> },
  { title: 'Talk to RIA', label: 'Voice interface', icon: MessageCircle, className: 'product-bento-voice', surface: <VoiceInterface /> }
]

export default function ProductBento() {
  return (
    <div className="product-bento-grid">
      {panels.map(({ title, label, icon: Icon, className, surface }, index) => (
        <article className={`product-bento-panel ${className}`} key={title} style={{ '--bento-index': index } as CSSProperties}>
          <div className="product-bento-meta"><span><Icon /> {label}</span><small>0{index + 1}</small></div>
          <div className="product-bento-surface">{surface}</div>
          <div className="product-bento-caption"><strong>{title}</strong><span><Sparkles /> RIA system surface</span></div>
        </article>
      ))}
    </div>
  )
}
