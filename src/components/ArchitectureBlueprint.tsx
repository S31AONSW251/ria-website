type ArchitectureModule = {
  id: string
  title: string
  features: string
}

const leftModules: ArchitectureModule[] = [
  {
    id: '01',
    title: 'Memory Engine',
    features: 'Long-term memory · Episodic context · Semantic recall'
  },
  {
    id: '02',
    title: 'Knowledge Universe',
    features: 'Web research · Source ranking · Knowledge graph'
  },
  {
    id: '03',
    title: 'Security Boundary',
    features: 'Local-first · Owner permission · Private runtime'
  },
  {
    id: '04',
    title: 'Creative Studio',
    features: 'Image · Design · Content generation'
  }
]

const rightModules: ArchitectureModule[] = [
  {
    id: '05',
    title: 'Reasoning Cortex',
    features: 'Planning · Reflection · Decision support'
  },
  {
    id: '06',
    title: 'Autonomous Core',
    features: 'Goals · Tasks · Approval queue'
  },
  {
    id: '07',
    title: 'Tool Layer',
    features: 'Files · Web · Workflows'
  },
  {
    id: '08',
    title: 'Interface Layer',
    features: 'Chat · Dashboard · Mission Control'
  }
]

const foundationModules: ArchitectureModule[] = [
  {
    id: '09',
    title: 'Evolution Layer',
    features: 'Self-review · Upgrade reports · Learning loop'
  },
  {
    id: '10',
    title: 'RIA Identity',
    features: 'Preferences · Personality · Voice · Behavior'
  }
]

const neuralNodes = [
  [260, 105], [197, 132], [324, 138], [145, 190], [230, 185], [302, 198], [375, 193],
  [112, 266], [181, 252], [260, 258], [340, 255], [405, 270], [148, 335], [219, 322],
  [300, 330], [372, 342], [204, 397], [284, 406], [340, 390], [260, 458]
]

const neuralEdges = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8], [4, 8],
  [4, 9], [4, 5], [5, 9], [5, 10], [5, 6], [6, 11], [7, 8], [7, 12], [8, 9],
  [8, 12], [8, 13], [9, 10], [9, 13], [9, 14], [10, 11], [10, 14], [10, 15],
  [11, 15], [12, 13], [12, 16], [13, 14], [13, 16], [13, 17], [14, 15], [14, 17],
  [14, 18], [15, 18], [16, 17], [17, 18], [17, 19], [18, 19]
]

function ArchitectureModuleRow({ module }: { module: ArchitectureModule }) {
  return (
    <article className="ria-system-module">
      <span className="ria-system-module-number">{module.id}</span>
      <div>
        <h3>{module.title}</h3>
        <p>{module.features}</p>
      </div>
    </article>
  )
}

function CognitiveCore() {
  return (
    <div className="ria-cognitive-core">
      <svg className="ria-cognitive-sphere" viewBox="0 0 520 520" role="img" aria-label="Abstract layered neural sphere representing the RIA cognitive core">
        <defs>
          <radialGradient id="riaSphereVolume" cx="43%" cy="36%" r="65%">
            <stop offset="0%" stopColor="#e8fcff" stopOpacity="0.16" />
            <stop offset="36%" stopColor="#7ddceb" stopOpacity="0.09" />
            <stop offset="78%" stopColor="#245b71" stopOpacity="0.025" />
            <stop offset="100%" stopColor="#061018" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="riaSphereEdge" x1="10%" y1="5%" x2="92%" y2="95%">
            <stop offset="0%" stopColor="#d7f8fc" stopOpacity="0.6" />
            <stop offset="48%" stopColor="#79d9e8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3b8198" stopOpacity="0.09" />
          </linearGradient>
          <radialGradient id="riaSphereCenter" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#e8fdff" stopOpacity="0.92" />
            <stop offset="18%" stopColor="#a8edf5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3fa3ba" stopOpacity="0" />
          </radialGradient>
          <clipPath id="riaSphereClip">
            <circle cx="260" cy="260" r="190" />
          </clipPath>
          <filter id="riaSphereSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <circle className="ria-sphere-aura" cx="260" cy="260" r="232" />
        <circle className="ria-sphere-volume" cx="260" cy="260" r="190" fill="url(#riaSphereVolume)" />
        <circle className="ria-sphere-edge" cx="260" cy="260" r="190" stroke="url(#riaSphereEdge)" />

        <g className="ria-sphere-latitudes" clipPath="url(#riaSphereClip)">
          <ellipse cx="260" cy="260" rx="190" ry="68" />
          <ellipse cx="260" cy="260" rx="190" ry="126" />
          <ellipse cx="260" cy="260" rx="72" ry="190" />
          <ellipse cx="260" cy="260" rx="132" ry="190" />
        </g>

        <g className="ria-sphere-mesh" clipPath="url(#riaSphereClip)">
          {neuralEdges.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={neuralNodes[from][0]}
              y1={neuralNodes[from][1]}
              x2={neuralNodes[to][0]}
              y2={neuralNodes[to][1]}
            />
          ))}
          {neuralNodes.map(([cx, cy], index) => (
            <circle
              className="ria-sphere-node"
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index % 5 === 0 ? 3.3 : 2.1}
              style={{ animationDelay: `${index * -0.18}s` }}
            />
          ))}
        </g>

        <circle className="ria-sphere-inner-ring" cx="260" cy="260" r="92" />
        <circle className="ria-sphere-center" cx="260" cy="260" r="54" fill="url(#riaSphereCenter)" />
        <circle className="ria-sphere-center-point" cx="260" cy="260" r="4" filter="url(#riaSphereSoftGlow)" />
      </svg>

      <div className="ria-cognitive-core-label">
        <span>RIA CORE</span>
        <strong>Reactive Intelligence Architecture</strong>
      </div>

      <div className="ria-cognitive-flow" aria-label="RIA cognitive workflow">
        {['Memory', 'Reasoning', 'Tools', 'Action', 'Reflection'].map((stage, index) => (
          <span key={stage}>{stage}{index < 4 && <i aria-hidden="true">→</i>}</span>
        ))}
      </div>
    </div>
  )
}

export default function ArchitectureBlueprint() {
  return (
    <section id="architecture" className="ria-intelligence-architecture">
      <header className="ria-architecture-heading">
        <span>RIA SYSTEM MAP</span>
        <h2>RIA Intelligence Architecture</h2>
        <p>
          A private cognitive system connecting memory, reasoning, knowledge, tools, autonomy, and owner-approved action.
        </p>
      </header>

      <div className="ria-architecture-premium-panel">
        <div className="ria-architecture-grid">
          <div className="ria-architecture-column ria-architecture-column-left">
            {leftModules.map((module) => <ArchitectureModuleRow module={module} key={module.id} />)}
          </div>

          <div className="ria-architecture-core-area">
            <CognitiveCore />
          </div>

          <div className="ria-architecture-column ria-architecture-column-right">
            {rightModules.map((module) => <ArchitectureModuleRow module={module} key={module.id} />)}
          </div>

          <div className="ria-architecture-foundation">
            {foundationModules.map((module) => <ArchitectureModuleRow module={module} key={module.id} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
