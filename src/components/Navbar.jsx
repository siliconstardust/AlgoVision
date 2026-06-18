import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const pageNames = { '/': 'Home', '/sorting': 'Sorting Visualizer', '/searching': 'Searching Visualizer', '/compare': 'Compare Algorithms' };
  const current = pageNames[location.pathname] || 'AlgoVision';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-strong border-b border-white/10 flex items-center px-4 gap-4">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Link to="/" className="flex items-center gap-2 mr-auto">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">AV</div>
        <span className="font-bold text-white hidden sm:block">AlgoVision</span>
        <span className="text-slate-400 text-sm hidden md:block">/ {current}</span>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">DSA Visualizer</span>
      </div>
    </nav>
  );
}
