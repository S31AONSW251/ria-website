export default function RiaHeroSceneFallback() {
  return (
    <div className="ria-hero-scene-fallback" aria-hidden="true">
      <div className="ria-fallback-presence">
        <div className="ria-fallback-halo" />
        <div className="ria-fallback-head">
          <div className="ria-fallback-neural-core"><i /><i /><i /><span /></div>
        </div>
        <div className="ria-fallback-neck" />
        <div className="ria-fallback-shoulders" />
        <div className="ria-fallback-torso">
          <div className="ria-fallback-spine" />
          <div className="ria-fallback-memory-core"><i /><span /></div>
        </div>
        <div className="ria-fallback-orbit ria-fallback-orbit-a" />
        <div className="ria-fallback-orbit ria-fallback-orbit-b" />
        <span className="ria-fallback-label ria-fallback-label-brain"><b>01</b> Neural lattice</span>
        <span className="ria-fallback-label ria-fallback-label-memory"><b>02</b> Memory core</span>
        <span className="ria-fallback-label ria-fallback-label-vault"><b>03</b> Private runtime</span>
      </div>
      <div className="ria-fallback-data-lines"><i /><i /><i /><i /></div>
    </div>
  )
}
