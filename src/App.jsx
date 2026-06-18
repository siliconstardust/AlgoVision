import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SortingVisualizer from './pages/SortingVisualizer';
import SearchingVisualizer from './pages/SearchingVisualizer';
import CompareAlgorithms from './pages/CompareAlgorithms';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0e1a]">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="lg:ml-64 pt-16 min-h-screen">
          <div className="p-5 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sorting" element={<SortingVisualizer />} />
              <Route path="/searching" element={<SearchingVisualizer />} />
              <Route path="/compare" element={<CompareAlgorithms />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
