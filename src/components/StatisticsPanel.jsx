export default function StatisticsPanel({ comparisons, swaps, time, isRunning }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Comparisons', value: comparisons, icon: '⚖', color: 'blue' },
        { label: 'Swaps', value: swaps, icon: '↔', color: 'purple' },
        { label: 'Time (ms)', value: time !== null ? time.toFixed(1) : '—', icon: '⏱', color: 'amber' },
      ].map(stat => (
        <div key={stat.label} className={`glass rounded-xl p-3 border ${isRunning && stat.label !== 'Time (ms)' ? 'border-' + stat.color + '-500/40 pulse-glow' : 'border-white/10'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{stat.icon}</span>
            <span className="text-xs text-slate-400">{stat.label}</span>
          </div>
          <div className={`text-2xl font-bold font-mono text-${stat.color}-300`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
