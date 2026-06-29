import {
  BrainCircuit,
  Code2,
  Database,
  Fingerprint,
  MessageCircle,
  Network,
  Orbit,
  Palette,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import type { CSSProperties } from 'react'

const modules = [
  { title: 'Memory Engine', code: 'MEM-01', copy: 'Durable personal and project context.', icon: Database, x: 17, y: 17 },
  { title: 'Executive Cortex', code: 'CTX-02', copy: 'Planning, reasoning, and priority control.', icon: BrainCircuit, x: 10, y: 41 },
  { title: 'Knowledge Universe', code: 'KNO-03', copy: 'Source-linked connected understanding.', icon: Network, x: 14, y: 67 },
  { title: 'Reflection Engine', code: 'REF-04', copy: 'Outcome review and learning loops.', icon: Orbit, x: 29, y: 84 },
  { title: 'Autonomous CoreX', code: 'ACX-05', copy: 'Supervised proposals and execution.', icon: Sparkles, x: 83, y: 17 },
  { title: 'DefenseCore', code: 'DFC-06', copy: 'Monitoring and decision intelligence.', icon: ShieldCheck, x: 90, y: 41 },
  { title: 'Software Studio', code: 'SFT-07', copy: 'Build, test, and review software.', icon: Code2, x: 86, y: 67 },
  { title: 'Creative Gallery', code: 'CRV-08', copy: 'Visual systems and creative memory.', icon: Palette, x: 71, y: 84 },
  { title: 'Talk to RIA', code: 'VOC-09', copy: 'Private voice and avatar interaction.', icon: MessageCircle, x: 43, y: 89 },
  { title: 'Digital Twin Layer', code: 'DTL-10', copy: 'Goals, preferences, and identity context.', icon: Fingerprint, x: 57, y: 89 }
]

export default function ArchitectureBlueprint() {
  return (
    <div className="blueprint-shell">
      <div className="blueprint-toolbar">
        <span><i /> RIA INTELLIGENCE BLUEPRINT</span>
        <div><b>10 MODULES</b><b>OWNER BOUNDARY: ACTIVE</b><b>REV 01.6</b></div>
      </div>
      <div className="blueprint-canvas">
        <div className="blueprint-grid" aria-hidden="true" />
        <div className="blueprint-crosshair" aria-hidden="true" />
        <svg className="blueprint-connections" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="blueprint-core-fill"><stop offset="0" stopColor="#d9fbff" stopOpacity=".5" /><stop offset=".45" stopColor="#7bdae8" stopOpacity=".13" /><stop offset="1" stopColor="#4c8fb5" stopOpacity="0" /></radialGradient>
          </defs>
          <g className="blueprint-paths">
            <path d="M500 305 C400 280 280 150 170 110" /><path d="M500 305 C380 300 240 260 100 260" />
            <path d="M500 305 C390 340 260 415 140 430" /><path d="M500 305 C420 390 350 500 290 540" />
            <path d="M500 305 C600 280 720 150 830 110" /><path d="M500 305 C620 300 760 260 900 260" />
            <path d="M500 305 C610 340 740 415 860 430" /><path d="M500 305 C580 390 650 500 710 540" />
            <path d="M500 305 C470 400 445 500 430 570" /><path d="M500 305 C530 400 555 500 570 570" />
            <circle cx="500" cy="305" r="130" /><circle cx="500" cy="305" r="176" />
          </g>
          <g className="blueprint-pulses"><circle r="4"><animateMotion dur="6s" repeatCount="indefinite" path="M170 110 C280 150 400 280 500 305" /></circle><circle r="4"><animateMotion dur="7s" repeatCount="indefinite" path="M830 110 C720 150 600 280 500 305" /></circle><circle r="3"><animateMotion dur="8s" repeatCount="indefinite" path="M140 430 C260 415 390 340 500 305" /></circle></g>
          <circle cx="500" cy="305" r="124" fill="url(#blueprint-core-fill)" />
        </svg>

        <div className="blueprint-core">
          <div className="blueprint-core-rings"><i /><i /><i /></div>
          <span>REACTIVE</span>
          <strong>RIA</strong>
          <small>INTELLIGENCE CORE</small>
          <em><i /> SYSTEM COHERENT</em>
        </div>

        {modules.map(({ title, code, copy, icon: Icon, x, y }, index) => (
          <article
            className="blueprint-module"
            key={title}
            style={{ '--module-x': `${x}%`, '--module-y': `${y}%`, '--module-index': index } as CSSProperties}
          >
            <div><Icon /><span>{code}</span></div>
            <strong>{title}</strong>
            <p>{copy}</p>
            <i className="blueprint-module-port" />
          </article>
        ))}
      </div>
      <div className="blueprint-legend">
        <span><i className="is-core" /> Core intelligence</span>
        <span><i /> Connected module</span>
        <span><i className="is-gate" /> Approval boundary</span>
        <strong>Architecture designed for inspectable, human-controlled operation.</strong>
      </div>
    </div>
  )
}
