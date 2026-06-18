import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: '⌂', label: 'Home', desc: 'Dashboard' },
  { to: '/sorting', icon: '↕', label: 'Sorting', desc: 'Sort Visualizer' },
  { to: '/searching', icon: '◎', label: 'Searching', desc: 'Search Visualizer' },
  { to: '/compare', icon: '⇌', label: 'Compare', desc: 'Algorithm Battle' },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-16 left-0 bottom-0 z-40 w-64 glass border-r border-white/10 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 px-2">Navigation</p>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
                }>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-lg glass group-hover:glow-blue transition-all">{item.icon}</span>
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-xs text-slate-400">Visualize. Learn. Master.</p>
            <p className="text-xs text-blue-400 mt-1">AlgoVision v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
