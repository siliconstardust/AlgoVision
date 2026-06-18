import { useState, useRef } from 'react';
import ArrayBars from '../components/ArrayBars';
import { getBubbleSortSteps, bubbleSortInfo } from '../algorithms/bubbleSort';
import { getSelectionSortSteps, selectionSortInfo } from '../algorithms/selectionSort';
import { getMergeSortSteps, mergeSortInfo } from '../algorithms/mergeSort';
import { getQuickSortSteps, quickSortInfo } from '../algorithms/quickSort';

const ALGOS = {
  bubble: { fn: getBubbleSortSteps, info: bubbleSortInfo },
  selection: { fn: getSelectionSortSteps, info: selectionSortInfo },
  merge: { fn: getMergeSortSteps, info: mergeSortInfo },
  quick: { fn: getQuickSortSteps, info: quickSortInfo },
};

const PRESETS = [
  { label: 'Bubble vs Quick', a: 'bubble', b: 'quick' },
  { label: 'Merge vs Quick', a: 'merge', b: 'quick' },
  { label: 'Selection vs Merge', a: 'selection', b: 'merge' },
];

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 5);
}

function AlgoPanel({ label, info, stepData, array }) {
  const current = stepData;
  const displayArray = current?.array ?? array;
  const comparing = current?.comparing ?? [];
  const sortedFrom = current?.sortedFrom ?? null;
  const isDone = current?.type === 'done';

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-white">{info.name}</span>
          <span className="ml-2 text-xs text-slate-500">{info.average}</span>
        </div>
        {isDone && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Done</span>}
      </div>
      <div className="p-4">
        <ArrayBars array={displayArray} comparing={comparing} sortedFrom={isDone ? 0 : sortedFrom} done={isDone} />
      </div>
      <div className="px-4 py-3 border-t border-white/10 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-blue-300">{current?.comparisons ?? 0}</div>
          <div className="text-xs text-slate-500">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-purple-300">{current?.swaps ?? 0}</div>
          <div className="text-xs text-slate-500">Swaps</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold font-mono text-amber-300">{label}</div>
          <div className="text-xs text-slate-500">Steps done</div>
        </div>
      </div>
    </div>
  );
}

export default function CompareAlgorithms() {
  const [preset, setPreset] = useState(PRESETS[0]);
  const [array, setArray] = useState(() => generateArray(25));
  const [arraySize, setArraySize] = useState(25);
  const [speed, setSpeed] = useState(50);
  const [stepA, setStepA] = useState(null);
  const [stepB, setStepB] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const runningRef = useRef(false);

  const reset = () => {
    runningRef.current = false;
    setIsRunning(false);
    setStepA(null);
    setStepB(null);
    setWinner(null);
  };

  const generateNew = () => {
    reset();
    const newArr = generateArray(arraySize);
    setArray(newArr);
  };

  const start = async () => {
    reset();
    await new Promise(r => setTimeout(r, 50));

    const stepsA = ALGOS[preset.a].fn([...array]);
    const stepsB = ALGOS[preset.b].fn([...array]);
    const maxLen = Math.max(stepsA.length, stepsB.length);

    setIsRunning(true);
    runningRef.current = true;

    for (let i = 0; i < maxLen; i++) {
      if (!runningRef.current) break;
      if (i < stepsA.length) setStepA(stepsA[i]);
      if (i < stepsB.length) setStepB(stepsB[i]);
      await new Promise(r => setTimeout(r, Math.max(5, 200 - speed * 1.9)));
    }

    if (runningRef.current) {
      setStepA(stepsA[stepsA.length - 1]);
      setStepB(stepsB[stepsB.length - 1]);
      const timeA = stepsA.length;
      const timeB = stepsB.length;
      setWinner(timeA <= timeB ? preset.a : preset.b);
      setIsRunning(false);
      runningRef.current = false;
    }
  };

  const infoA = ALGOS[preset.a].info;
  const infoB = ALGOS[preset.b].info;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Algorithm Battle</h1>
        <p className="text-slate-400 text-sm mt-0.5">Compare two algorithms on the same array simultaneously</p>
      </div>

      {/* Preset Selector */}
      <div className="glass rounded-2xl border border-white/10 p-4">
        <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest">Matchup</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => { setPreset(p); reset(); }} disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
                ${preset.label === p.label ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'glass border-white/10 text-slate-400 hover:text-white'}
                disabled:opacity-50`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl border border-white/10 p-4 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <button onClick={generateNew} disabled={isRunning}
            className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
            🎲 New Array
          </button>
          <button onClick={start} disabled={isRunning}
            className="px-4 py-2 rounded-lg text-sm bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            ⚔ Start Battle
          </button>
          <button onClick={reset} disabled={isRunning}
            className="px-3 py-2 rounded-lg text-sm glass border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50">
            ↺ Reset
          </button>
        </div>
        <div className="flex-1 min-w-48">
          <label className="text-xs text-slate-400 block mb-1">Speed: {speed}%</label>
          <input type="range" min="1" max="100" value={speed} onChange={e => setSpeed(+e.target.value)} className="w-full accent-amber-500" />
        </div>
        <div className="flex-1 min-w-48">
          <label className="text-xs text-slate-400 block mb-1">Array Size: {arraySize}</label>
          <input type="range" min="10" max="60" value={arraySize} onChange={e => { setArraySize(+e.target.value); }} disabled={isRunning} className="w-full accent-orange-500" />
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="glass rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center">
          <span className="text-amber-300 font-semibold">🏆 {ALGOS[winner].info.name} used fewer steps on this input!</span>
          <span className="text-slate-400 text-sm ml-2">(Results vary by input distribution)</span>
        </div>
      )}

      {/* Dual Visualizers */}
      <div className="grid md:grid-cols-2 gap-5">
        <AlgoPanel label={stepA ? stepA.comparisons + stepA.swaps : 0} info={infoA} stepData={stepA} array={array} />
        <AlgoPanel label={stepB ? stepB.comparisons + stepB.swaps : 0} info={infoB} stepData={stepB} array={array} />
      </div>

      {/* Complexity Comparison Table */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white">Complexity Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">Metric</th>
                <th className="text-center px-4 py-2.5 text-xs text-blue-400 font-medium">{infoA.name}</th>
                <th className="text-center px-4 py-2.5 text-xs text-purple-400 font-medium">{infoB.name}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Best Case', keyA: 'best', keyB: 'best' },
                { label: 'Average Case', keyA: 'average', keyB: 'average' },
                { label: 'Worst Case', keyA: 'worst', keyB: 'worst' },
                { label: 'Space', keyA: 'space', keyB: 'space' },
                { label: 'Stable?', keyA: 'stable', keyB: 'stable' },
              ].map(row => (
                <tr key={row.label} className="border-b border-white/5 hover:bg-white/2">
                  <td className="px-4 py-2.5 text-slate-400 text-xs">{row.label}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-blue-300 text-xs">{String(infoA[row.keyA])}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-purple-300 text-xs">{String(infoB[row.keyB])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
