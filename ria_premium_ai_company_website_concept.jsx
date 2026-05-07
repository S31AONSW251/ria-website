export default function RIAPremiumWebsite() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(90,90,90,0.18),transparent_45%)] pointer-events-none" />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[0.3em]">RIA</h1>
            <p className="text-xs text-zinc-500 tracking-[0.25em] uppercase">
              Cognitive Infrastructure
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm text-zinc-400">
            <a href="#vision" className="hover:text-white transition">Vision</a>
            <a href="#architecture" className="hover:text-white transition">Architecture</a>
            <a href="#desktop" className="hover:text-white transition">Desktop</a>
            <a href="#future" className="hover:text-white transition">Future</a>
          </nav>

          <button className="border border-white/20 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
            Access RIA
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[700px] h-[700px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.5em] text-zinc-500 text-xs mb-8">
            Persistent Artificial Intelligence
          </p>

          <h1 className="text-6xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
            Building the
            <br />
            Cognitive Operating
            <br />
            System of the Future.
          </h1>

          <p className="mt-10 text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            RIA is an evolving local intelligence architecture focused on persistent
            memory, adaptive cognition, emotional intelligence, autonomous reasoning,
            and long-term continuity.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="px-8 py-4 rounded-full bg-white text-black font-medium hover:scale-105 transition-all duration-300">
              Explore RIA
            </button>

            <button className="px-8 py-4 rounded-full border border-white/15 text-white hover:bg-white/10 transition-all duration-300">
              View Architecture
            </button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="vision" className="relative py-40 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-6">
              The Problem
            </p>

            <h2 className="text-5xl font-semibold leading-tight">
              Modern AI systems forget.
            </h2>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
              Most AI systems operate statelessly. They lack identity continuity,
              long-term memory, adaptive emotional understanding, and persistent
              cognition.
            </p>

            <p className="mt-6 text-zinc-500 leading-relaxed">
              RIA is designed as a long-term cognitive infrastructure layer capable
              of memory evolution, semantic retrieval, autonomous reflection, and
              adaptive intelligence orchestration.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10 backdrop-blur-xl">
            <div className="space-y-8">
              <div>
                <p className="text-zinc-500 text-sm">Current AI</p>
                <h3 className="text-2xl font-medium mt-2">Fragmented Intelligence</h3>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="text-zinc-500 text-sm">RIA</p>
                <h3 className="text-2xl font-medium mt-2">Persistent Cognitive Systems</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  'Hybrid Graph-RAG',
                  'Adaptive Memory',
                  'Semantic Continuity',
                  'Reflection Loops',
                  'Local AI Orchestration',
                  'Identity Persistence'
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-white/10 rounded-2xl p-4 text-sm text-zinc-300 bg-white/[0.02]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-40 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-6">
              Cognitive Architecture
            </p>

            <h2 className="text-5xl font-semibold leading-tight">
              Designed as a modular intelligence ecosystem.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              {
                title: 'Memory Engine',
                desc: 'Long-term semantic, episodic, reflective, and identity memory systems.'
              },
              {
                title: 'Hybrid Retrieval',
                desc: 'Vector intelligence fused with graph-based contextual reasoning.'
              },
              {
                title: 'Adaptive Cognition',
                desc: 'Recursive reflection loops and autonomous optimization pipelines.'
              },
              {
                title: 'Local AI Layer',
                desc: 'Offline orchestration of Ollama, embeddings, and multimodal systems.'
              }
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition-all duration-500"
              >
                <h3 className="text-2xl font-medium">{card.title}</h3>
                <p className="mt-6 text-zinc-400 leading-relaxed text-sm">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop */}
      <section id="desktop" className="py-40 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-6">
              RIA Desktop
            </p>

            <h2 className="text-5xl font-semibold leading-tight">
              An AI-native operating environment.
            </h2>

            <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
              RIA combines memory systems, telemetry, cognition monitoring,
              adaptive learning, local model orchestration, and neural dashboards
              into a unified desktop intelligence platform.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />

            <div className="relative border border-white/10 bg-zinc-950 rounded-[40px] p-5 shadow-2xl shadow-black/50">
              <div className="rounded-[30px] border border-white/10 bg-black overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-zinc-600" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-500" />
                </div>

                <div className="p-8 grid grid-cols-2 gap-6 min-h-[420px]">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-zinc-500">Hybrid Retrieval</p>
                    <div className="mt-8 h-40 rounded-2xl bg-gradient-to-b from-white/10 to-transparent" />
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-zinc-500">Neural Telemetry</p>
                    <div className="mt-8 h-40 rounded-2xl bg-gradient-to-b from-white/10 to-transparent" />
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 col-span-2">
                    <p className="text-sm text-zinc-500">Adaptive Memory Optimization</p>
                    <div className="mt-8 h-28 rounded-2xl bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future */}
      <section id="future" className="py-40 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-6">
            Long-Term Vision
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold leading-tight max-w-5xl mx-auto">
            Toward persistent cognitive infrastructure.
          </h2>

          <p className="mt-10 text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            RIA is evolving beyond a conventional assistant into a scalable cognitive
            operating framework for memory continuity, local intelligence orchestration,
            and future AI-native ecosystems.
          </p>

          <div className="mt-16 flex justify-center">
            <button className="px-10 py-5 rounded-full bg-white text-black text-lg font-medium hover:scale-105 transition-all duration-300">
              Enter The RIA Ecosystem
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-zinc-500 text-sm">
        © 2026 RIA Cognitive Systems — Persistent Intelligence Infrastructure
      </footer>
    </div>
  )
}
