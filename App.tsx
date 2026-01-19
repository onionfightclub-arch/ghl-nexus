
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import ChatBot from './components/ChatBot.tsx';
import { AFFILIATE_LINK } from './constants.ts';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Visual Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        
        <Features />
        
        {/* Pricing/CTA Section */}
        <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-transparent to-cyan-900/10">
          <div className="max-w-4xl mx-auto text-center glass p-12 border border-white/5 relative overflow-hidden">
             {/* Background glow for card */}
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
             
             <h2 className="text-4xl font-orbitron font-bold mb-6 italic">REPLACE YOUR STACK</h2>
             <p className="text-gray-400 mb-10 text-lg">
               Stop paying for ClickFunnels, ActiveCampaign, HubSpot, and Calendly. <br/>
               One platform. One monthly cost. Zero friction.
             </p>
             
             <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                <div className="text-left border-l-2 border-cyan-500 pl-4">
                  <div className="text-xs font-orbitron text-cyan-400">STARTER PLAN</div>
                  <div className="text-2xl font-bold">$97/MO</div>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/10"></div>
                <div className="text-left border-l-2 border-purple-500 pl-4">
                  <div className="text-xs font-orbitron text-purple-400">UNLIMITED SAAS</div>
                  <div className="text-2xl font-bold">$497/MO</div>
                </div>
             </div>
             
             <a 
               href={AFFILIATE_LINK}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block px-12 py-5 bg-white text-black font-orbitron font-bold rounded-sm hover:bg-cyan-400 transition-colors shadow-2xl text-center"
             >
               SECURE ACCESS NOW
             </a>
          </div>
        </section>
      </main>

      <ChatBot />

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-xs font-orbitron tracking-widest">
        <p>&copy; 2024 NEXUSGHL ECOSYSTEM. ALL SYSTEMS NOMINAL.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-cyan-400">PRIVACY_PROTOCOL</a>
          <a href="#" className="hover:text-cyan-400">TERMS_OF_SERVICE</a>
          <a href="#" className="hover:text-cyan-400">AFFILIATE_LOGS</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
