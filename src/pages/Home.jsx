import { Link } from 'react-router-dom';

const cards = [
  {
    to: '/sorting', title: 'Sorting Visualizer', icon: '↕',
    desc: 'Watch Bubble, Selection, Insertion, Merge & Quick Sort come alive with real-time comparisons and step tracking.',
    algos: ['Bubble', 'Selection', 'Insertion', 'Merge', 'Quick'],
    gradient: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/30', tag: '5 Algorithms'
  },
  {
    to: '/searching', title: 'Searching Visualizer', icon: '◎',
    desc: 'See Linear and Binary Search find targets step-by-step with highlighted comparisons and search boundaries.',
    algos: ['Linear Search', 'Binary Search'],
    gradient: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500/30', tag: '2 Algorithms'
  },
  {
    to: '/compare', title: 'Algorithm Battle', icon: '⇌',
    desc: 'Run two sorting algorithms side-by-side on the same array. Compare speed, swaps, and efficiency head-to-head.',
    algos: ['Bubble vs Quick', 'Merge vs Quick', 'Selection vs Merge'],
    gradient: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30', tag: 'Head-to-Head'
  }
];

const features = [
  { icon: '⚡', title: 'Real-time Stats', desc: 'Track comparisons, swaps, and execution time live' },
  { icon: '🎚', title: 'Speed Control', desc: 'Adjust animation speed from slow-mo to blazing fast' },
  { icon: '📊', title: 'Complexity Info', desc: 'See Big-O complexity for every algorithm selected' },
  { icon: '🎯', title: 'Custom Input', desc: 'Enter your own arrays to test edge cases' },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative text-center py-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-500/30 text-blue-300 text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Interactive Visualizer
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Algo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Vision</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Interactive Data Structures & Algorithms Visualizer. See exactly how algorithms think.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {cards.map(card => (
          <Link key={card.to} to={card.to} className="group glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className={`bg-gradient-to-br ${card.gradient} p-5 border-b ${card.border}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{card.icon}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full glass border ${card.border} text-slate-300`}>{card.tag}</span>
              </div>
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5">
                {card.algos.map(algo => (
                  <span key={algo} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">{algo}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center text-xs text-blue-400 font-medium group-hover:gap-2 transition-all gap-1">
                Open Visualizer <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(f => (
            <div key={f.title} className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
