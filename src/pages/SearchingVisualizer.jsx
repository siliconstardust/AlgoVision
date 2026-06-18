import { useState, useRef, useCallback } from 'react';
import { getLinearSearchSteps, linearSearchInfo } from '../algorithms/linearSearch';
import { getBinarySearchSteps, binarySearchInfo } from '../algorithms/binarySearch';
import ComplexityPanel from '../components/ComplexityPanel';

const ALGORITHMS = {
  linear: { fn: getLinearSearchSteps, info: linearSearchInfo, requiresSorted: false },
  binary: { fn: getBinarySearchSteps, info: binarySearchInfo, requiresSorted: true },
};

function generateArray(sorted = false) {
  const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 98) + 1);
  return sorted ? [...arr].sort((a, b) => a - b) : arr;
}

export default function SearchingVisualizer() {
  const [algorithm, setAlgorithm] = useState('linear');
  const [array, setArray] = useState(() => generateArray(false));
  const [target, setTarget] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const runningRef = useRef(false);

  const currentStep = steps[stepIdx];
  const displayArray = currentStep?.array ?? array;
  const currentIdx = currentStep?.current ?? -1;
  const foundIdx = currentStep?.found ?? -1;
  const low = currentStep?.low ?? -1;
  const high = currentStep?.high ?? -1;
  const isDone = stepIdx >= 0 && stepIdx === steps.length - 1;
  const isBinary = algorithm === 'binary';

  const reset = useCallback(() => {
    runningRef.current = false;
    setIsRunning(false);
    setSteps([]);
    setStepIdx(-1);
  }, []);

  const handleAlgoChange = (key) => {
    setAlgorithm(key);
    reset();
    if (ALGORITHMS[key].requiresSorted) {
      setArray(prev => [...prev].sort((a, b) => a - b));
    }
  };

  const generateNew = () => {
    reset();
    setArray(generateArray(ALGORITHMS[algorithm].requiresSorted));
  };

  const applyCustomInput = () => {
    const parsed = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (parsed.length >= 2) {
      reset();
      const arr = ALGORITHMS[algorithm].requiresSorted ? parsed.sort((a, b) => a - b) : parsed;
      setArray(arr);
    }
  };

  const start = async () => {
    const t = parseInt(target);
    if (isNaN(t)) { alert('Enter a valid target number'); return; }
    const newSteps = ALGORITHMS[algorithm].fn(array, t);
    setSteps(newSteps);
    setStepIdx(0);
    setIsRunning(true);
    runningRef.current = true;

    for (let i = 0; i < newSteps.length; i++) {
      if (!runningRef.current) break;
      setStepIdx(i);
      await new Promise(r => setTimeout(r, Math.max(100, 600 - speed * 5)));
    }
    if (runningRef.current) {
      setIsRunning(false);
      runningRef.current = false;
    }
  };

  const getElementStyle = (idx) => {
    if (foundIdx === idx) return 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/50 shadow-lg scale-110';
    if (currentIdx === idx) return 'bg-red-500 text-white border-red-400 shadow-red-500/50 shadow-lg scale-105';
    if (isBinary && isDone && low !== -1) {
      if (idx < low || idx > high) return 'bg-slate-800 text-slate-600 border-slate-700';
    }
    if (isBinary && !isDone && currentIdx >= 0) {
      if (idx < low || idx > high) return 'bg-slate-800 text-slate-600 border-slate-700';
    }
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:border-blue-400/50';
  };

  const info = ALGORITHMS[algorithm].info;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Searching Visualizer</h1>
        <p className="text-slate-400 text-sm mt-0.5">Step through Linear and Binary Search algorithms</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          {/* Algorithm Picker */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest">Algorithm</p>
            <div className="flex gap-2">
              {Object.entries(ALGORITHMS).map(([key, { info }]) => (
                <button key={key} onClick={() => handleAlgoChange(key)} disabled={isRunning}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
                    ${algorithm === key ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'glass border-white/10 text-slate-400 hover:text-white'}
                    disabled:opacity-50`}>
                  {info.name}
                  {ALGORITHMS[key].requiresSorted && <span className="ml-1 text-xs opacity-60">(sorted)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Array Display */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <div className="flex flex-wrap gap-2 justify-center min-h-16 items-center">
              {displayArray.map((val, idx) => (
                <div key={idx} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border transition-all duration-300 ${getElementStyle(idx)}`}>
                  {val}
                </div>
              ))}
            </div>

            {isDone && (
              <div className={`mt-3 text-center text-sm font-medium ${foundIdx >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {foundIdx >= 0 ? `✓ Found ${target} at index ${foundIdx}` : `✗ ${target} not found in array`}
              </div>
            )}

            {isBinary && currentIdx >= 0 && !isDone && (
              <div className="mt-3 flex justify-center gap-4 text-xs text-slate-400">
                <span>Low: <span className="text-blue-300">{low}</span></span>
                <span>Mid: <span className="text-red-300">{currentIdx}</span></span>
                <span>High: <span className="text-blue-300">{high}</span></span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl border border-white/10 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input value={target} onChange={e => setTarget(e.target.value)} placeholder="Target value to find..."
                className="flex-1 glass border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50" />
              <button onClick={start} disabled={isRunning || !target}
                className="px-4 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                ▶ Search
              </button>
              <button onClick={() => { reset(); setArray([...array]); }} disabled={isRunning}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
                ↺ Reset
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="Custom array: 3, 15, 8, 42..."
                className="flex-1 glass border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button onClick={applyCustomInput} disabled={isRunning}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
                Apply
              </button>
              <button onClick={generateNew} disabled={isRunning}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
                🎲 Random
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Speed: {speed}%</label>
              <input type="range" min="1" max="100" value={speed} onChange={e => setSpeed(+e.target.value)} className="w-full accent-purple-500" />
            </div>
          </div>

          {/* Step counter */}
          {steps.length > 0 && (
            <div className="glass rounded-xl border border-white/10 p-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">Step {Math.min(stepIdx + 1, steps.length)} / {steps.length}</span>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ComplexityPanel info={info} />
          <div className="glass rounded-2xl border border-white/10 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Color Legend</h3>
            <div className="space-y-2">
              {[
                { color: 'bg-blue-500', label: 'Unsearched elements' },
                { color: 'bg-red-500', label: 'Currently checking' },
                { color: 'bg-emerald-500', label: 'Target found!' },
                { color: 'bg-slate-700', label: 'Eliminated range (Binary)' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
