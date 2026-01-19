
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types.ts';
import { geminiService } from '../services/geminiService.ts';
import { AFFILIATE_LINK } from '../constants.ts';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greeting initiated. I am NexusAI. How can I optimize your agency workflow today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Audio References for futuristic UI sounds
  const userSendAudio = useRef<HTMLAudioElement | null>(null);
  const aiTypingAudio = useRef<HTMLAudioElement | null>(null);
  const aiReplyAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio objects
    userSendAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'); // Quick digital click
    aiTypingAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2349/2349-preview.mp3'); // Digital blip
    aiReplyAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'); // Futuristic chime
    
    // Set volumes
    if (userSendAudio.current) userSendAudio.current.volume = 0.3;
    if (aiTypingAudio.current) aiTypingAudio.current.volume = 0.2;
    if (aiReplyAudio.current) aiReplyAudio.current.volume = 0.3;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Play User Send Sound
    userSendAudio.current?.play().catch(() => {});

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Play AI Start Typing Sound
    aiTypingAudio.current?.play().catch(() => {});

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const aiResponse = await geminiService.sendMessage(history, input);
    
    // Play AI Reply Sound
    aiReplyAudio.current?.play().catch(() => {});

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  /**
   * Simple formatter to turn markdown links [text](url) and plain URLs into clickable links
   */
  const formatMessageText = (text: string) => {
    const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-300 font-bold transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = markdownRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      const remaining = text.substring(lastIndex);
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let urlLastIndex = 0;
      let urlMatch;
      
      while ((urlMatch = urlRegex.exec(remaining)) !== null) {
        if (urlMatch.index > urlLastIndex) {
          parts.push(remaining.substring(urlLastIndex, urlMatch.index));
        }
        parts.push(
          <a
            key={`url-${urlMatch.index}`}
            href={urlMatch[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 transition-colors break-all"
          >
            {urlMatch[1]}
          </a>
        );
        urlLastIndex = urlRegex.lastIndex;
      }
      
      if (urlLastIndex < remaining.length) {
        parts.push(remaining.substring(urlLastIndex));
      }
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] glass flex flex-col border border-cyan-500/30 shadow-[0_10px_60px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="font-orbitron text-sm font-bold tracking-widest uppercase text-white">Nexus AI</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={AFFILIATE_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-orbitron text-cyan-400 hover:text-white transition-colors underline whitespace-nowrap"
              >
                LAUNCH GHL
              </a>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 scrollbar-thin scrollbar-thumb-cyan-500/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-sm text-sm ${
                  msg.role === 'user' 
                  ? 'bg-cyan-500 text-black font-semibold ml-auto rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                  : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {msg.role === 'model' ? formatMessageText(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-sm border border-white/5 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex gap-3 items-center">
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all rounded-sm flex-shrink-0 group"
                title="Close Interface"
              >
                <svg className="w-8 h-8 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query the system..."
                className="flex-1 bg-black/50 border border-white/10 rounded-sm px-3 py-3 text-xs focus:outline-none focus:border-cyan-500 transition-colors text-white"
              />
              
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyan-500 p-2 rounded-sm text-black hover:bg-cyan-400 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-[8px] font-orbitron text-gray-600 text-center tracking-tighter uppercase">
              Secure Neural Link Active
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center animate-glow-pulse shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform active:scale-95 group"
        >
          <svg className="w-8 h-8 text-black group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;