import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import CommandPalette from '@/components/CommandPalette';

// --- TYPES ---
interface Mode {
  builder: string;
  executive: string;
}

type ModeState = 'builder' | 'executive';

interface Stat {
  label: string;
  value: string;
}

interface ModeContent {
  badge: string;
  color: string;
  desc: string;
  stats: Stat[];
}

// --- 3D COMPONENTS ---

function SceneObject({ mode }: { mode: ModeState }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      {mode === 'builder' ? (
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <MeshDistortMaterial color="#3b82f6" speed={2} distort={0.4} radius={1} />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshWobbleMaterial color="#ffffff" speed={1} factor={0.2} />
        </mesh>
      )}
    </Float>
  );
}

// --- UI COMPONENTS ---

const ModeToggle = ({ currentMode, setMode }: { currentMode: ModeState, setMode: (mode: ModeState) => void }) => {
  return (
    <div className="flex items-center gap-3 p-1 bg-zinc-900 border border-zinc-800 w-fit cursor-pointer">
      <button 
        onClick={() => setMode('builder')}
        className={`px-4 py-1.5 text-[10px] mono uppercase transition-all duration-300 ${
          currentMode === 'builder' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'
        }`}
      >
        💻 Builder
      </button>
      <button 
        onClick={() => setMode('executive')}
        className={`px-4 py-1.5 text-[10px] mono uppercase transition-all duration-300 ${
          currentMode === 'executive' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'
        }`}
      >
        👔 Executive
      </button>
    </div>
  );
};

const evidenceData = [
  { company: "Walmart / Agent Builder", title: "Governed Production Agents", desc: "Architected the foundation for production-grade AI agents. Scaled the internal community from 1 to 30, delivering verifiable business impact in the WBR window.", statValue: "35k+", statLabel: "Verified Tags" },
  { company: "Wonder / Growth Ops", title: "Predictive Demand Growth", desc: "Deployed predictive demand models for routing and labor, enabling rapid geographic expansion and contributing to 3x ARR growth.", statValue: "13x", statLabel: "User Base" },
  { company: "Walmart / eCommerce", title: "Digital Transformation", desc: "Implemented AI-enabled capabilities for merchant productivity, resulting in $150M incremental GMV and $15M annual OpEx savings.", statValue: "$150M", statLabel: "Incremental GMV" },
  { company: "Walmart / Supply Chain", title: "Transportation Automation", desc: "Led end-to-end visibility and traceability systems across Walmart's U.S. transportation network, delivering $100M+ in long-range cost savings.", statValue: "$100M+", statLabel: "Cost Savings" },
];

export default function Home() {
  const [mode, setMode] = useState<ModeState>('builder');

  const content: Record<ModeState, ModeContent> = {
    builder: {
      badge: '[ROLE: AGENT BUILDER / AI OPERATOR] | [FOCUS: TOOL CALLING, BPMN, MULTI-AGENT SYSTEMS]',
      color: 'text-blue-400',
      desc: "I focus on the last mile of AI: moving from viral demos to governed, scalable agentic systems in the Fortune 100.",
      stats: [
        { label: 'Internal Community', value: '30 Operators' },
        { label: 'Verified Tags', value: '35k+' },
        { label: 'NilPicks Avoided', value: '4.3k+' }
      ]
    },
    executive: {
      badge: '[ROLE: SR. DIRECTOR, SOFTWARE ENGINEERING] | [FOCUS: DIGITAL TRANSFORMATION & SCALE]',
      color: 'text-indigo-400',
      desc: "Leading digital merchandising transformation by architecting and scaling tech-powered tools for Assortment, Store merchandising, and Pricing optimization.",
      stats: [
        { label: 'Incremental GMV', value: '$150M' },
        { label: 'Cost Savings', value: '$100M+' },
        { label: 'Merchants Led', value: '1,200+' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Head>
        <title>Rahul Mahindra | Enterprise AI Operator</title>
      </Head>

      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="mono text-xs font-bold uppercase tracking-tighter">RM / OPERATOR</div>
        <div className="flex gap-8 text-[10px] mono uppercase tracking-widest">
          <a href="#evidence" className="hover:text-gray-400 transition">Evidence</a>
          <a href="https://www.linkedin.com/in/rahulmahindra/" target="_blank" className="hover:text-gray-400 transition">LinkedIn</a>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <SceneObject mode={mode} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <motion.div 
              key={mode + 'badge'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mono text-[10px] mb-6 uppercase tracking-[0.2em] font-bold ${content[mode].color}`}
            >
              {content[mode].badge}
            </motion.div>
            
            <motion.h1 
              key={mode + 'title'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8"
            >
              BRIDGING THE <br />
              <span className="text-zinc-500">PRODUCTION GAP.</span>
            </motion.h1>

            <div className="flex items-center gap-4 mb-12">
              <span className="mono text-[10px] uppercase tracking-widest text-zinc-600">Mode:</span>
              <ModeToggle currentMode={mode} setMode={setMode} />
            </div>

            <motion.p 
              key={mode + 'desc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-3xl font-light leading-tight text-zinc-400 mb-12 transition-opacity duration-300"
            >
              {content[mode].desc}
            </motion.p>

            <div className="flex gap-6">
              <a href="#evidence" className="mono text-xs border border-white px-8 py-4 hover:bg-white hover:text-black transition uppercase tracking-widest font-bold">
                View Evidence ↓
              </a>
              <a href="mailto:rmahindra687@gmail.com" className="mono text-xs text-zinc-500 hover:text-white transition uppercase tracking-widest">
                Contact →
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl">
              <div className="mono text-[10px] text-zinc-500 mb-6 uppercase tracking-widest flex justify-between">
                <span>Telemetry / Stats</span>
                <span className="animate-pulse text-green-500">● LIVE</span>
              </div>
              <div className="space-y-6">
                {content[mode].stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center border-b border-zinc-800 pb-2"
                  >
                    <span className="mono text-[10px] text-zinc-500 uppercase">{stat.label}</span>
                    <span className="mono text-sm font-bold text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="py-32 px-6 md:px-20 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] mono uppercase tracking-widest text-zinc-500 mb-20">Operating Evidence</h2>
          <div className="space-y-0">
            {evidenceData.map((item, i) => (
              <div key={i} className="group border-t border-black py-16 flex flex-col md:flex-row justify-between items-start gap-12 hover:bg-black hover:text-white transition duration-500 px-4 cursor-pointer">
                <div className="max-w-3xl">
                  <div className="mono text-[10px] mb-4 uppercase opacity-50">{item.company}</div>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase">{item.title}</h3>
                  <p className="text-xl leading-relaxed opacity-70 max-w-xl">{item.desc}</p>
                </div>
                <div className="mono text-right">
                  <div className="text-5xl font-black tracking-tighter">{item.statValue}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50">{item.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 text-center bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase leading-[0.9]">
            Build the <br> next generation of agents.
          </h2>
          <div className="flex justify-center gap-12 mono text-xs uppercase tracking-widest">
            <a href="mailto:rmahindra687@gmail.com" className="hover:text-gray-400 transition border-b border-white pb-1">Email</a>
            <a href="https://www.linkedin.com/in/rahulmahindra/" target="_blank" className="hover:text-gray-400 transition border-b border-white pb-1">LinkedIn</a>
          </div>
          <div className="mt-32 mono text-[9px] text-gray-600 uppercase tracking-[0.3em]">
            © 2026 Rahul Mahindra // New York, NY // OPERATOR_OS_V6
          </div>
        </div>
      </footer>
      <CommandPalette />
    </div>
  );
}
