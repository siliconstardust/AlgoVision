export default function ComplexityPanel({ info }) {
  if (!info) return null;

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
        <h3 className="text-sm font-semibold text-white">{info.name} — Complexity</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Best Case', value: info.best, color: 'emerald' },
            { label: 'Average Case', value: info.average, color: 'amber' },
            { label: 'Worst Case', value: info.worst, color: 'red' },
            { label: 'Space', value: info.space, color: 'blue' },
          ].map(row => (
            <div key={row.label} className="glass rounded-lg p-2.5 border border-white/5">
              <div className="text-xs text-slate-400 mb-1">{row.label}</div>
              <div className={`text-sm font-mono font-bold text-${row.color}-400`}>{row.value}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-3">{info.description}</div>
        <div>
          <p className="text-xs text-slate-500 mb-1.5">Real-world uses</p>
          <div className="flex flex-wrap gap-1.5">
            {info.useCases.map((use, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{use}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
