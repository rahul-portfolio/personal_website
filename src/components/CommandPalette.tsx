import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X, Search, Terminal as TerminalIcon, User, Briefcase, ExternalLink } from 'lucide-react';

const COMMANDS = [
  { cmd: '/evidence', label: 'View Evidence', action: () => window.location.href = '#evidence' },
  { cmd: '/contact', label: 'Send Message', action: () => window.location.href = 'mailto:rmahindra687@gmail.com' },
  { cmd: '/linkedin', label: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/rahulmahindra/', '_blank') },
  { cmd: '/mode', label: 'Switch Builder/Exec', action: () => alert('Use the UI toggle for mode switching') },
  { cmd: '/about', label: 'Operator Thesis', action: () => alert('Bridging the Production Gap: Moving from demos to governed scale.') },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = COMMANDS.filter(c => 
    c.cmd.toLowerCase().includes(query.toLowerCase()) || 
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="mono text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 uppercase tracking-widest">
          Press <span className="text-white font-bold">⌘K</span> to operate
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-6 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center p-4 border-b border-zinc-800">
                <Command className="w-5 h-5 text-zinc-500 mr-3" />
                <input 
                  autoFocus
                  className="bg-transparent border-none outline-none text-white w-full mono text-sm"
                  placeholder="Enter command... (e.g. /evidence)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] text-zinc-600 px-2 py-1 border border-zinc-800">ESC</span>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((item, i) => (
                    <div 
                      key={item.cmd}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      className="group flex items-center justify-between p-3 hover:bg-white hover:text-black cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <TerminalIcon className="w-4 h-4 text-zinc-500 group-hover:text-black" />
                        <span className="mono text-sm font-bold">{item.cmd}</span>
                        <span className="text-zinc-500 group-hover:text-zinc-700 text-xs">{item.label}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-zinc-500 mono text-xs">
                    No command found for "{query}"
                  </div>
                )}
              </div>

              <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
                <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest">System: Operator_OS_V6</span>
                <span className="mono text-[9px] text-zinc-600">Status: Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
