
import React from 'react';

const features = [
  {
    title: "NEURAL CRM",
    desc: "A centralized hub for every lead, interaction, and transaction. Track your pipeline with surgical precision.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  },
  {
    title: "AUTOMATED LOGIC",
    desc: "Build complex workflows that trigger based on user behavior. Let the system work while you scale.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
  },
  {
    title: "FUNNEL MATRIX",
    desc: "Create high-converting landing pages and full websites using our drag-and-drop neural editor.",
    icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
  },
  {
    title: "COMMUNICATION NODE",
    desc: "Unified inbox for Email, SMS, WhatsApp, and social media. Never miss a signal again.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">SYSTEM MODULES</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass p-8 group hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d={f.icon} />
                </svg>
              </div>
              <div className="w-12 h-12 mb-6 bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 transition-colors duration-300">
                <svg className="w-6 h-6 text-cyan-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-3 text-white">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
