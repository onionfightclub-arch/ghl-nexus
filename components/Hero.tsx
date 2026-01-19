
import React from 'react';
import { AFFILIATE_LINK } from '../constants.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 mb-6 glass border border-cyan-500/30 rounded-full text-[10px] font-orbitron text-cyan-400 tracking-[0.2em]">
          SYSTEM STATUS: OPTIMAL // VERSION 4.0.2
        </div>
        
        <h1 className="text-5xl md:text-8xl font-orbitron font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
          THE LAST PLATFORM <br/> YOU'LL EVER <span className="text-cyan-400 text-glow">NEED.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          NexusGHL integrates advanced CRM, automated funnels, and AI-driven marketing into a single, cohesive neural network for your agency.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black font-orbitron font-bold text-sm rounded-sm hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] text-center"
          >
            INITIATE 14-DAY TRIAL
          </a>
          <a 
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 glass text-white font-orbitron font-bold text-sm rounded-sm border border-white/10 hover:border-white/30 transition-all text-center"
          >
            VIEW BLUEPRINTS
          </a>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40">
          <div className="text-xs font-orbitron">99.9% UPTIME</div>
          <div className="text-xs font-orbitron">256-BIT ENCRYPTION</div>
          <div className="text-xs font-orbitron">AI AUTOMATION</div>
          <div className="text-xs font-orbitron">WHITE-LABEL READY</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;