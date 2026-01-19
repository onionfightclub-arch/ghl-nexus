
import React from 'react';
import { AFFILIATE_LINK } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <div className="w-4 h-4 bg-black rounded-sm"></div>
          </div>
          <span className="font-orbitron text-xl font-bold tracking-widest text-white">NEXUS<span className="text-cyan-400">GHL</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-cyan-400 transition-colors">OS FEATURES</a>
          <a href="#automation" className="hover:text-cyan-400 transition-colors">CORE LOGIC</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">UPGRADE PATH</a>
        </div>

        <a 
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-transparent border border-cyan-500/50 text-cyan-400 text-xs font-orbitron hover:bg-cyan-500/10 transition-all rounded-sm tracking-tighter text-center"
        >
          ACCESS TERMINAL
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
