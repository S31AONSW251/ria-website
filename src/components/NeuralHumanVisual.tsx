import {
  BrainCircuit,
  Fingerprint,
  LockKeyhole,
  Orbit,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

const signalPanels = [
  {
    icon: BrainCircuit,
    title: 'Memory Core',
    copy: 'Persistent context that helps RIA remember what matters across work, decisions, and time.'
  },
  {
    icon: Orbit,
    title: 'Reasoning Layer',
    copy: 'Planning and decision support across goals, tools, knowledge, and constraints.'
  },
  {
    icon: ShieldCheck,
    title: 'Reflection Loop',
    copy: 'Continuous review that improves responses, summaries, and system behavior.'
  },
  {
    icon: LockKeyhole,
    title: 'Owner Control',
    copy: 'Actions remain gated by approval, privacy, and human authority.'
  }
]

const footerSignals = ['Local-first', 'Memory-centered', 'Approval-gated', 'Enterprise-ready']

export default function NeuralHumanVisual() {
  return (
    <div className="hero-hologram-shell">
      <div className="hero-hologram-panel" role="img" aria-label="RIA living intelligence architecture overview">
        <div className="hero-hologram-head">
          <span><i /> RIA / SYSTEM ARCHITECTURE</span>
          <strong>Living Intelligence Architecture</strong>
          <small>Memory, reasoning, reflection, and action connected inside one private operating layer.</small>
        </div>

        <div className="hero-hologram-focus">
          <div className="hero-hologram-focus-rings" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-hologram-focus-copy">
            <span><Sparkles className="h-4 w-4" /> Private AI operating layer</span>
            <h3>Memory, reasoning, reflection, and action in one controlled system.</h3>
            <p>RIA organizes cognition around the owner, keeping context, execution, and approval visible.</p>
          </div>
        </div>

        <div className="hero-hologram-signal-grid">
          {signalPanels.map(({ icon: Icon, title, copy }) => (
            <article className="hero-hologram-signal" key={title}>
              <Icon className="h-4 w-4" />
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="hero-hologram-footer">
          <div className="hero-hologram-owner-chip">
            <Fingerprint className="h-4 w-4" />
            <span>Owner controlled runtime</span>
          </div>
          <div className="hero-hologram-meta">
            {footerSignals.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
