import { useState, useEffect, useRef, useCallback } from 'react';
import ArrayBars from '../components/ArrayBars';
import StatisticsPanel from '../components/StatisticsPanel';
import ComplexityPanel from '../components/ComplexityPanel';
import { getBubbleSortSteps, bubbleSortInfo } from '../algorithms/bubbleSort';
import { getSelectionSortSteps, selectionSortInfo } from '../algorithms/selectionSort';
import { getInsertionSortSteps, insertionSortInfo } from '../algorithms/insertionSort';
import { getMergeSortSteps, mergeSortInfo } from '../algorithms/mergeSort';
import { getQuickSortSteps, quickSortInfo } from '../algorithms/quickSort';

const ALGORITHMS = {
  bubble: { fn: getBubbleSortSteps, info: bubbleSortInfo },
  selection: { fn: getSelectionSortSteps, info: selectionSortInfo },
  insertion: { fn: getInsertionSortSteps, info: insertionSortInfo },
  merge: { fn: getMergeSortSteps, info: mergeSortInfo },
  quick: { fn: getQuickSortSteps, info: quickSortInfo },
};

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState('bubble');
  const [array, setArray] = useState(() => generateArray(30));
  const [arraySize, setArraySize] = useState(30);
  const [customInput, setCustomInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [startTime, setStartTime] = useState(null);
  const [execTime, setExecTime] = useState(null);
  const pausedRef = useRef(false);
  const runningRef = useRef(false);

  const currentStep = steps[stepIdx];
  const displayArray = currentStep?.array ?? array;
  const comparing = currentStep?.comparing ?? [];
  const sortedFrom = currentStep?.sortedFrom ?? null;
  const isDone = currentStep?.type === 'done';

  const stats = { comparisons: currentStep?.comparisons ?? 0, swaps: currentStep?.swaps ?? 0 };

  const reset = useCallback(() => {
    runningRef.current = false;
    pausedRef.current = false;
    setIsRunning(false);
    setIsPaused(false);
    setSteps([]);
    setStepIdx(-1);
    setExecTime(null);
  }, []);

  const generateNew = useCallback(() => {
    reset();
    const newArr = generateArray(arraySize);
    setArray(newArr);
  }, [arraySize, reset]);

  const applyCustomInput = () => {
    const parsed = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0 && n <= 100);
    if (parsed.length >= 2) {
      reset();
      setArray(parsed);
    }
  };

  const start = async () => {
    const algo = ALGORITHMS[algorithm];
    const arr = stepIdx >= 0 && !isDone ? displayArray : array;
    const newSteps = algo.fn(arr);
    setSteps(newSteps);
    setStepIdx(0);
    setIsRunning(true);
    setIsPaused(false);
    pausedRef.current = false;
    runningRef.current = true;
    const t0 = performance.now();
    setStartTime(t0);

    for (let i = 0; i < newSteps.length; i++) {
      if (!runningRef.current) break;
      while (pausedRef.current) await new Promise(r => setTimeout(r, 50));
      if (!runningRef.current) break;
      setStepIdx(i);
      const delay = Math.max(5, 200 - speed * 1.9);
      await new Promise(r => setTimeout(r, delay));
    }

    if (runningRef.current) {
      setExecTime(performance.now() - t0);
      setIsRunning(false);
      runningRef.current = false;
    }
  };

  const pause = () => {
    pausedRef.current = true;
    setIsPaused(true);
  };

  const resume = () => {
    pausedRef.current = false;
    setIsPaused(false);
  };

  useEffect(() => { generateNew(); }, [arraySize]);

  const info = ALGORITHMS[algorithm].info;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sorting Visualizer</h1>
          <p className="text-slate-400 text-sm mt-0.5">Select an algorithm and watch it sort step by step</p>
        </div>
        {isDone && <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium">✓ Sorted!</span>}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Algorithm Selector */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest">Algorithm</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ALGORITHMS).map(([key, { info }]) => (
                <button key={key} onClick={() => { setAlgorithm(key); reset(); }}
                  disabled={isRunning}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border
                    ${algorithm === key ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'glass border-white/10 text-slate-400 hover:text-white hover:border-white/20'}
                    disabled:opacity-50 disabled:cursor-not-allowed`}>
                  {info.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <ArrayBars array={displayArray} comparing={comparing} sortedFrom={isDone ? 0 : sortedFrom} done={isDone} />
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl border border-white/10 p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <button onClick={generateNew} disabled={isRunning && !isPaused}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                🎲 Random Array
              </button>
              {!isRunning && <button onClick={start} className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">▶ Start</button>}
              {isRunning && !isPaused && <button onClick={pause} className="px-4 py-2 rounded-lg text-sm bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors">⏸ Pause</button>}
              {isRunning && isPaused && <button onClick={resume} className="px-4 py-2 rounded-lg text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors">▶ Resume</button>}
              <button onClick={() => { reset(); setArray([...array]); }} disabled={isRunning && !isPaused}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
                ↺ Reset
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-xs text-slate-400 block mb-1.5">Speed: {speed}%</label>
                <input type="range" min="1" max="100" value={speed} onChange={e => setSpeed(+e.target.value)}
                  className="w-full accent-blue-500" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-400 block mb-1.5">Array Size: {arraySize}</label>
                <input type="range" min="5" max="80" value={arraySize} onChange={e => setArraySize(+e.target.value)} disabled={isRunning}
                  className="w-full accent-purple-500" />
              </div>
            </div>

            <div className="flex gap-2">
              <input value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="Custom array: 5, 12, 8, 3, 45..."
                className="flex-1 glass border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button onClick={applyCustomInput} disabled={isRunning}
                className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
                Apply
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatisticsPanel comparisons={stats.comparisons} swaps={stats.swaps} time={execTime} isRunning={isRunning} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <ComplexityPanel info={info} />

          {/* How it works */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">How It Works</h3>
            <ol className="space-y-2">
              {info.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Legend */}
          <div className="glass rounded-2xl border border-white/10 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Color Legend</h3>
            <div className="space-y-2">
              {[
                { color: 'bg-blue-500', label: 'Unsorted elements' },
                { color: 'bg-red-500', label: 'Being compared' },
                { color: 'bg-emerald-500', label: 'Sorted / in place' },
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
