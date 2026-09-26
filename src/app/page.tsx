"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  Box,
  Cylinder
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  Settings, 
  BarChart3, 
  Play, 
  Pause, 
  ExternalLink,
  Cpu,
  Briefcase,
  FileText
} from 'lucide-react';
import * as THREE from 'three';
import CommandPalette from '@/components/CommandPalette';

// --- TYPES ---
type CharacterMode = 'agentic' | 'executive';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface Article {
  title: string;
  excerpt: string;
  category: string;
  duration: string;
}

// --- DATA ---
const PROJECTS: Project[] = [
  { title: "Governed Agent Framework", description: "Production-grade AI agent orchestration for Fortune 100 scale.", tags: ["Python", "LangGraph", "Enterprise"], link: "#" },
  { title: "Demand Forecasting AI", description: "Predictive labor and routing models for rapid geographic expansion.", tags: ["PyTorch", "AWS", "Ops"], link: "#" },
  { title: "Merchant Productivity Suite", description: "AI-enabled tooling resulting in $150M incremental GMV.", tags: ["Next.js", "LLMs", "UX"], link: "#" },
  { title: "Supply Chain Visibility", description: "End-to-end traceability for U.S. transportation networks.", tags: ["Java", "BigQuery", "Logistics"], link: "#" },
];

const ARTICLES: Article[] = [
  { title: "The Last Mile of AI", excerpt: "Moving from viral demos to governed, scalable agentic systems.", category: "Technical", duration: "4:12" },
  { title: "Bridging the Production Gap", excerpt: "Why most LLM projects fail at the deployment stage.", category: "Strategy", duration: "6:45" },
  { title: "The Operator's Mindset", excerpt: "Blending technical depth with executive strategy in the AI era.", category: "Mindset", duration: "5:30" },
];

// --- 3D COMPONENTS ---

function AgenticScene() {
  return (
    <group position={[0, -0.5, 0]}>
      <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.8, 0.05, 0.3]} position={[0, 0.06, 0.2]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      <group position={[1, 0.2, 0]}>
        <Cylinder args={[0.02, 0.02, 0.8]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={1} />
        </mesh>
      </group>
      <group position={[-1, 0, -0.5]}>
        <Cylinder args={[0.02, 0.02, 1]} position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
          <meshStandardMaterial color="#475569" />
        </Cylinder>
        <mesh position={[0, 1, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

function ExecutiveScene() {
  return (
    <group position={[0, -0.5, 0]}>
      <Box args={[4, 0.1, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[2.5, 1.5, 0.05]} position={[0, 0.8, -0.8]}>
        <meshStandardMaterial color="#1e293b" transparent opacity={0.4} metalness={1} roughness={0} />
      </Box>
      <group position={[0, 0.2, 0.5]}>
        <Cylinder args={[0.2, 0.2, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#020617" />
        </Cylinder>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
      </group>
    </group>
  );
}

// --- UI COMPONENTS ---

const Header = ({ mode, setMode }: { mode: CharacterMode, setMode: (m: CharacterMode) => void }) => (
  <nav className=\"fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#0b0f17]/50 border-b border-slate-800/40\">
    <div className=\"text-sm font-bold tracking-tighter text-slate-100 uppercase\">Desk of Rahul</div>
    <div className=\"flex gap-4 items-center\">
      <button className=\"p-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 border border-slate-800 rounded-lg flex items-center gap-2 text-[10px] uppercase font-bold\">\n        <BarChart3 size={14} /> RahulMetrics\n      </button>
      <button className=\"p-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 border border-slate-800 rounded-lg flex items-center gap-2 text-[10px] uppercase font-bold\">\n        <Settings size={14} /> Voice Settings\n      </button>
      <div className=\"h-6 w-[1px] bg-slate-800 mx-2\" />
      <button 
        onClick={() => setMode(mode === 'agentic' ? 'executive' : 'agentic')}
        className=\"px-4 py-2 bg-white text-black text-[10px] uppercase font-black rounded-lg hover:bg-slate-200 transition-colors\"\n      >\n        Switch to {mode === 'agentic' ? 'Executive' : 'Agentic'}\n      </button>
    </div>
  </nav>
);

const RahulBotDock = ({ isActive, setIsActive, isMuted, setIsMuted }: any) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => setDuration(d => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className=\"absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl p-4 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 shadow-2xl flex items-center justify-between gap-6 transition-all duration-500\">\n      <div className=\"flex items-center gap-4 overflow-hidden\">\n        <div className=\"flex gap-1 items-end h-6\">\n          {[...Array(12)].map((_, i) => (\n            <motion.div \n              key={i} \n              animate={isActive ? { height: [4, Math.random() * 24 + 4, 4] } : { height: 4 } }\n              transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: \"easeInOut\" }}\n              className=\"w-1 bg-emerald-500 rounded-full\"\n            />\n          ))}\n        </div>\n        <div className=\"text-[11px] text-slate-400 font-medium truncate\">\n          {isActive ? \"RahulBot™ is listening...\" : \"Captions will appear here...\"}\n        </div>\n      </div>\n\n      <div className=\"flex items-center gap-3\">\n        <div className=\"text-[11px] mono text-slate-500 mr-4\">{formatTime(duration)}</div>\n        <button \n          onClick={() => setIsMuted(!isMuted)}\n          className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}\n        >\n          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}\n        </button>\n        <button \n          onClick={() => setIsActive(!isActive)}\n          className={`p-3 rounded-full transition-all ${isActive ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}\n        >\n          {isActive ? <PhoneOff size={18} /> : <Play size={18} />}\n        </button>\n      </div>\n    </div>\n  );
};

export default function Home() {
  const [characterMode, setCharacterMode] = useState<CharacterMode>('agentic');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeAudioArticle, setActiveAudioArticle] = useState<string | null>(null);

  return (
    <div className=\"min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden\">\n      <Head>\n        <title>Desk of Rahul | AI Operator</title>\n      </Head>\n\n      <div className=\"fixed inset-0 z-0 pointer-events-none\">\n        <div className=\"absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/60 via-[#0b0f17] to-[#0b0f17]\" />\n      </div>\n\n      <Header mode={characterMode} setMode={setCharacterMode} />\n\n      <main className=\"relative z-10 pt-24 px-6 max-w-7xl mx-auto space-y-12 pb-32\">\n        <section className=\"h-[520px] rounded-2xl border border-slate-800/80 bg-slate-900/30 overflow-hidden relative flex items-center justify-center group\">\n          <Canvas dpr={[1, 2]}>\n            <PerspectiveCamera makeDefault position={[5, 5, 5]} />\n            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/2} />\n            <ambientLight intensity={0.3} />\n            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />\n            <pointLight position={[-10, -10, -10]} color=\"#3b82f6\" intensity={0.5} />\n            \n            {characterMode === 'agentic' ? <AgenticScene /> : <ExecutiveScene />}\n            \n            <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />\n            <Environment preset=\"city\" />\n          </Canvas>\n\n          <RahulBotDock \n            isActive={isCallActive} \n            setIsActive={setIsCallActive} \n            isMuted={isMuted} \n            setIsMuted={setIsMuted} \n          />\n        </section>\n\n        <section className=\"space-y-4\">\n          <div className=\"flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500\">\n            <Cpu size={14} /> System Recommendations\n          </div>\n          <div className=\"flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar\">\n            {['Enterprise AI', 'Agentic Workflows', 'Strategic Scaling', 'LLM Ops', 'Digital Transformation'].map((item, i) => (\n              <div \n                key={i} \n                className=\"snap-start shrink-0 w-64 p-5 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-600 transition-all cursor-pointer group\"\n              >\n                <div className=\"text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors\">{item}</div>\n                <div className=\"text-xs text-slate-500 mt-2\">Optimized Framework v2.4</div>\n              </div>\n            ))}\n          </div>\n        </section>\n\n        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-12\">\n          <div className=\"lg:col-span-2 space-y-6\">\n            <div className=\"flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500\">\n              <FileText size={14} /> Articles & Notes\n            </div>\n            <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n              {ARTICLES.map((article, i) => (\n                <div \n                  key={i} \n                  className=\"p-6 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:bg-slate-900/50 transition-all group\"\n                >\n                  <div className=\"flex justify-between items-start mb-4\">\n                    <span className=\"text-[10px] uppercase font-black text-emerald-500 tracking-tighter\">{article.category}</span>\n                    <button \n                      onClick={() => setActiveAudioArticle(activeAudioArticle === article.title ? null : article.title)}\n                      className=\"p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors\"\n                    >\n                      {activeAudioArticle === article.title ? <Pause size={14} /> : <Play size={14} />}\n                    </button>\n                  </div>\n                  <h3 className=\"text-lg font-bold text-slate-100 mb-2 group-hover:text-white transition-colors\">{article.title}</h3>\n                  <p className=\"text-sm text-slate-400 leading-relaxed\">{article.excerpt}</p>\n                  <div className=\"mt-4 flex items-center gap-2 text-[10px] text-slate-600 mono\">\n                    <span>Duration: {article.duration}</span>\n                  </div>\n                </div>\n              ))}\n            </div>\n          </div>\n\n          <div className=\"space-y-6\">\n            <div className=\"flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500\">\n              <Briefcase size={14} /> Active Builds\n            </div>\n            <div className=\"space-y-4\">\n              {PROJECTS.map((project, i) => (\n                <div \n                  key={i} \n                  className=\"p-5 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-600 transition-all group cursor-pointer\"\n                >\n                  <div className=\"flex justify-between items-center mb-2\">\n                    <h4 className=\"text-sm font-bold text-slate-100\">{project.title}</h4>\n                    <ExternalLink size={14} className=\"text-slate-600 group-hover:text-white transition-colors\" />\n                  </div>\n                  <p className=\"text-xs text-slate-400 mb-4\">{project.description}</p>\n                  <div className=\"flex flex-wrap gap-2\">\n                    {project.tags.map(tag => (\n                      <span key={tag} className=\"text-[9px] uppercase font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded\">{tag}</span>\n                    ))}\n                  </div>\n                </div>\n              ))}\n            </div>\n          </div>\n        </div>\n      </main>\n\n      <footer className=\"py-12 px-6 border-t border-slate-800/40 text-center\">\n        <div className=\"text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold\">\n          © 2026 Desk of Rahul // System Operator OS\n        </div>\n      </footer>\n\n      <CommandPalette />\n\n      <style jsx global>{`\n        .no-scrollbar::-webkit-scrollbar {\n          display: none;\n        }\n        .no-scrollbar {\n          -ms-overflow-style: none;\n          scrollbar-width: none;\n        }\n      `}</style>\n    </div>\n  );\n}\n