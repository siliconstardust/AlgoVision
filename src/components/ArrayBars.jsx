export default function ArrayBars({ array, comparing = [], sortedFrom = null, done = false }) {
  const max = Math.max(...array, 1);

  const getColor = (idx) => {
    if (done || sortedFrom === 0) return 'from-emerald-500 to-emerald-400';
    if (comparing.includes(idx)) return 'from-red-500 to-rose-400';
    if (sortedFrom !== null && idx >= sortedFrom) return 'from-emerald-500 to-emerald-400';
    return 'from-blue-500 to-cyan-400';
  };

  const getShadow = (idx) => {
    if (done || sortedFrom === 0) return '0 0 8px rgba(52,211,153,0.6)';
    if (comparing.includes(idx)) return '0 0 12px rgba(239,68,68,0.8)';
    if (sortedFrom !== null && idx >= sortedFrom) return '0 0 8px rgba(52,211,153,0.6)';
    return '0 0 6px rgba(59,130,246,0.4)';
  };

  const fontSize = array.length > 40 ? '7px' : array.length > 25 ? '9px' : '11px';

  return (
    <div style={{ height: '320px' }} className="flex items-end justify-center gap-1 w-full px-2">
      {array.map((val, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-end"
          style={{
            height: '100%',
            width: `${Math.max(100 / array.length - 1, 4)}%`,
            minWidth: '3px',
          }}
        >
          {/* Number label above the bar */}
          <span
            className="text-slate-300 font-medium mb-0.5 leading-none"
            style={{ fontSize }}
          >
            {val}
          </span>

          {/* The bar itself */}
          <div
            className={`w-full rounded-t-sm bg-gradient-to-t ${getColor(idx)} bar-transition`}
            style={{
              height: `${Math.max((val / max) * 85, 2)}%`,
              boxShadow: getShadow(idx),
            }}
          />
        </div>
      ))}
    </div>
  );
}