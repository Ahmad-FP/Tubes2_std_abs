"use client";

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center 
                        justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Background grid */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] 
                      pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                        border border-blue-500/30 bg-blue-500/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 text-sm font-medium">
            IF2211 Strategi Algoritma
          </span>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span style={{ color: "var(--text-primary)" }}>DOM</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 
                           bg-clip-text text-transparent">
            Traversal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}>
          Telusuri struktur pohon HTML menggunakan algoritma
        </p>

        {/* Algorithm badges */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-blue-600/20 border 
                           border-blue-500/40 text-blue-400 text-sm font-mono font-bold">
            BFS
          </span>
          <span style={{ color: "var(--text-muted)" }}>&</span>
          <span className="px-4 py-1.5 rounded-full bg-cyan-600/20 border 
                           border-cyan-500/40 text-cyan-400 text-sm font-mono font-bold">
            DFS
          </span>
          <span style={{ color: "var(--text-muted)" }}>with</span>
          <span className="px-4 py-1.5 rounded-full bg-purple-600/20 border 
                           border-purple-500/40 text-purple-400 text-sm font-mono font-bold">
            CSS Selector
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative px-10 py-4 rounded-2xl bg-blue-600 
                     hover:bg-blue-500 text-white font-semibold text-lg
                     transition-all duration-300 hover:scale-105
                     shadow-[0_0_40px_rgba(59,130,246,0.4)]
                     hover:shadow-[0_0_60px_rgba(59,130,246,0.6)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Mulai Penelusuran
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {/* Scroll hint */}
        <p className="text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          atau scroll ke bawah untuk memulai
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)"
        }}
      />
    </section>
  );
}