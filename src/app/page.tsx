"use client";

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  PerspectiveCamera,
  Environment,
  ContactShadows
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import CommandPalette from '@/components/CommandPalette';

// --- TYPES ---
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

function TactileObject({ mode }: { mode: ModeState }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.2;
    meshRef.current.rotation.y = Math.cos(t / 3) * 0.2;
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        {mode === 'builder' ? (
          <>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshDistortMaterial
              color="#3b82f6"
              speed={3}
              distort={0.5}
              radius={1}
              metalness={0.8}
              roughness={0.2}
            />
          </>
        ) : (
          <>
            <sphereGeometry args={[1.2, 64, 64]} />
            <MeshWobbleMaterial
              color="#ffffff"
              speed={1.5}
              factor={0.4}
              metalness={0.9}
              roughness={0.1}
            />
          </>
        )}
      </mesh>
    </Float>
  );
}

// --- UI COMPONENTS ---

const ModeToggle = ({ currentMode, setMode }: { currentMode: ModeState, setMode: (mode: ModeState) => void }) => {
  return (
    <div className="relative flex items-center p-1 bg-black border-2 border-white w-fit cursor-pointer brutalist-shadow">
      <div
        className={`absolute h-[calc(100%-8px)] w-1/2 bg-white transition-all duration-500 ease-out rounded-sm ${
          currentMode === 'executive' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <button
        onClick={() => setMode('builder')}
        className={`relative z-10 px-6 py-2 text-[10px] mono uppercase transition-colors duration-300 ${
          currentMode === 'builder' ? 'text-black font-black' : 'text-white'
        }`}
      >
        Builder
      </button>
      <button
        onClick={() => setMode('executive')}
        className={`relative z-10 px-6 py-2 text-[10px] mono uppercase transition-colors duration-300 ${
          currentMode === 'executive' ? 'text-black font-black' : 'text-white'
        }`}
      >
        Executive
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

function EvidenceLedger() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-[10px] mono uppercase tracking-widest text-zinc-500 mb-20 border-l-4 border-black pl-4">Operating Evidence // Ledger_V1</h2>
      <div className="border-t-2 border-black">
        {evidenceData.map((item, i) => (
          <div
            key={i}
            className="border-b-2 border-black overflow-hidden transition-all duration-300 cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            <div className="py-12 px-4 flex justify-between items-center group hover:bg-black hover:text-white transition-colors duration-300">
              <div className="flex flex-col">
                <span className="mono text-[10px] uppercase opacity-50 mb-2">{item.company}</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                  {item.title}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-5xl font-black tracking-tighter">{item.statValue}</div>
                <div className="mono text-[10px] uppercase tracking-widest opacity-50">{item.statLabel}</div>
              </div>
            </div>
            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-zinc-100 text-black"
                >
                  <div className="py-12 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <p className="text-2xl font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex flex-col justify-center items-end mono text-xs uppercase">
                      <span className="text-zinc-500">Status: Verified</span>
                      <span className="text-zinc-500">Impact: Tier 1</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<ModeState>('builder');

  const content: Record<ModeState, ModeContent> = {
    builder: {
      badge: '[ROLE: AGENT BUILDER / AI OPERATOR] | [FOCUS: TOOL CALLING, BPMN, MULTI-AGENT SYSTEMS]',
      color: 'text-blue-500',
      desc: "I focus on the last mile of AI: moving from viral demos to governed, scalable agentic systems in the Fortune 100.",
      stats: [
        { label: 'Internal Community', value: '30 Operators' },
        { label: 'Verified Tags', value: '35k+' },
        { label: 'NilPicks Avoided', value: '4.3k+' }
      ],
    },
    executive: {
      badge: '[ROLE: SR. DIRECTOR, SOFTWARE ENGINEERING] | [FOCUS: DIGITAL TRANSFORMATION & SCALE]',
      color: 'text-white',
      desc: "Leading digital merchandising transformation by architecting and scaling tech-powered tools for Assortment, Store merchandising, and Pricing optimization.",
      stats: [
        { label: 'Incremental GMV', value: '$150M' },
        { label: 'Cost Savings', value: '$100M+' },
        { label: 'Merchants Led', value: '1,200+' }
      ],
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      <Head>
        <title>Rahul Mahindra | Enterprise AI Operator</title>
      </Head>

      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xs font-black uppercase tracking-tighter brutalist-border px-2 py-1 bg-white text-black">RM / OPERATOR</div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#evidence" className="hover:line-through transition">Evidence</a>
          <a href="https://www.linkedin.com/in/rahulmahindra/" target="_blank" className="hover:line-through transition">LinkedIn</a>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-grid">
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
            <TactileObject mode={mode} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              key={mode + 'badge'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] mb-6 uppercase tracking-[0.2em] font-black ${content[mode].color}`}
            >
              {content[mode].badge}
            </motion.div>

            <motion.h1
              key={mode + 'title'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-8"
            >
              BRIDGING THE <br />
              <span className="text-zinc-600">PRODUCTION GAP.</span>
            </motion.h1>

            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Switch Mode:</span>
              <ModeToggle currentMode={mode} setMode={setMode} />
            </div>

            <motion.p
              key={mode + 'desc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl md:text-3xl font-medium leading-tight text-zinc-400 mb-12 max-w-2xl"
            >
              {content[mode].desc}
            </motion.p>

            <div className="flex gap-6">
              <a href="#evidence" className="text-xs border-2 border-white px-8 py-4 hover:bg-white hover:text-black transition uppercase tracking-widest font-black brutalist-shadow">
                View Evidence ↓
              </a>
              <a href="mailto:rmahindra687@gmail.com" className="text-xs text-zinc-500 hover:text-white transition uppercase tracking-widest font-bold">
                Contact →
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="p-8 bg-black border-2 border-white brutalist-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-3xl rounded-full"></div>
              <div className="text-[10px] text-zinc-500 mb-6 uppercase tracking-widest flex justify-between font-bold border-b border-zinc-800 pb-4">
                <span>Telemetry / System Stats</span>
                <span className="animate-pulse text-green-500">● LIVE_FEED</span>
              </div>
              <div className="space-y-6">
                {content[mode].stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center border-b border-zinc-800 pb-2 group"
                  >
                    <span className="text-[10px] text-zinc-500 uppercase group-hover:text-white transition-colors">{stat.label}</span>
                    <span className="text-sm font-black text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="py-32 px-6 md:px-20 bg-white text-black">
        <EvidenceLedger />
      </section>

      <footer className="py-32 px-6 text-center bg-black text-white border-t-2 border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-[0.8]">
            Build the <br /> next generation of agents.
          </h2>
          <div className="flex justify-center gap-12 text-xs uppercase tracking-widest font-black">
            <a href="mailto:rmahindra687@gmail.com" className="hover:line-through transition border-b-2 border-white pb-1">Email</a>
            <a href="https://www.linkedin.com/in/rahulmahindra/" target="_blank" className="hover:line-through transition border-b-2 border-white pb-1">LinkedIn</a>
          </div>
          <div className="mt-32 text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
            © 2026 Rahul Mahindra // New York, NY // OPERATOR_OS_V6 // BRUTALIST_EDITION
          </div>
        </div>
      </footer>
      <CommandPalette />
    </div>
  );
}
