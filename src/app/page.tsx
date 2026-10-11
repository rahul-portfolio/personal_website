"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Head from 'next/head';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  ContactShadows,
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Settings,
  ExternalLink,
  Briefcase,
  FileText,
  User,
  Cpu,
  Zap,
  Shield
} from 'lucide-react';
import * as THREE from 'three';
import CommandPalette from '@/components/CommandPalette';
import { useSceneStore } from '@/store/useSceneStore';

type CharacterMode = 'builder' | 'operator';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface Thought {
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

// --- NARRATIVE DATA ---
const MODE_DATA: Record<CharacterMode, {
  about: string;
  projects: Project[];
  thoughts: Thought[];
}> = {
  builder: {
    about: "Started in the trenches of analytics. Focused on the rigor of the data—segmentations, regression, and the grit of SQL/Python—while learning the visceral reality of retail assortment and buyer psychology.",
    projects: [
      { title: "Foundational Analytics", description: "Early career focus on segmentations, clustering, and regression to drive data-driven assortment decisions with buyers and suppliers.", tags: ["Python", "SQL", "R", "Clustering"], link: "#" },
      { title: "Industry Knowledge", description: "Deep dive into retail dynamics, collaborating in-room with buyers to define item need-states and annual planning.", tags: ["Retail", "Assortment", "Planning"], link: "#" },
      { title: "CRM Tactics at Scale", description: "Addressing YOY annual planning gaps through precision CRM tactics and large-scale customer segmentation.", tags: ["CRM", "Scale", "Growth"], link: "#" },
      { title: "Technical Foundation", description: "Developing core proficiency in SQL, Python, R, and Linux to automate manual reporting and insight generation.", tags: ["Linux", "Automation", "Data Engineering"], link: "#" },
    ],
    thoughts: [
      { title: "The Learning Curve", excerpt: "The transition from writing queries to understanding why a buyer chooses one item over another.", category: "Growth", date: "Early Career" },
      { title: "Foundational Rigor", excerpt: "Why the basics of regression and clustering remain the most powerful tools in the operator's kit.", category: "Technical", date: "2014" },
    ],
  },
  operator: {
    about: "Bridging the gap between technical depth and executive strategy. From scaling eCommerce and global logistics to leading moonshots and now architecting the future of AI-native enterprise operations.",
    projects: [
      { title: "eCommerce Strategy", description: "Enabling humans via analytical frameworks to outline walmart.com strategy from the COVID boom to stabilization.", tags: ["eCommerce", "Strategy", "Scale"], link: "#" },
      { title: "Global Traceability", description: "Architecting end-to-end visibility across land, air, and sea—integrating first, middle, and last mile carrier data.", tags: ["Logistics", "Traceability", "Ops"], link: "#" },
      { title: "The Wonder Moonshot", description: "Scaling a venture from ground zero, owning everything from daily food production to investor strategy and board sessions.", tags: ["Executive", "Scaling", "P&L"], link: "#" },
      { title: "Governed AI Agents", description: "Pulling the future ahead one workflow at a time by building production-grade, governed AI-native frameworks.", tags: ["AI", "Enterprise", "Agentic"], link: "#" },
    ],
    thoughts: [
      { title: "The Production Gap", excerpt: "The distance between a viral AI demo and a governed, scalable system that a Fortune 100 can actually trust.", category: "Vision", date: "2026" },
      { title: "Ownership & Agency", excerpt: "The shift from providing the data to owning the P&L and the decision rights that come with it.", category: "Leadership", date: "Current" },
    ],
  }
};

// --- 3D COMPONENTS ---

function MirrorBall() {
  const mode = useSceneStore((state) => state.mode);
  const color = mode === 'builder' ? '#10b981' : '#ffffff';

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={1} 
          roughness={0.02} 
          clearcoat={1}
          clearcoatRoughness={0}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function GlassArtifact() {
  const mode = useSceneStore((state) => state.mode);
  const color = mode === 'builder' ? '#10b981' : '#ffffff';

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={1} 
          thickness={0.5} 
          roughness={0.1} 
          metalness={0}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function SceneCanvas() {
  const mode = useSceneStore((state) => state.mode);
  const bloomIntensity = useSceneStore((state) => state.bloomIntensity);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#444" />
      
      <Suspense fallback={null}>
        {mode === 'operator' ? <MirrorBall /> : <GlassArtifact />}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={bloomIntensity} levels={9} mipmapBlur />
        <Noise opacity={0.08} />
        <Vignette offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
}

function HolographicASCII() {
  const mode = useSceneStore((state) => state.mode);
  const [ascii, setAscii] = useState('');
  const [loading, setLoading] = useState(true);

  const asciiMap = {
    builder: 'https://ascii.rest/typewriter/',
    operator: 'https://ascii.rest/earthrise/',
  };

  useEffect(() => {
    setLoading(true);
    fetch(asciiMap[mode])
      .then(res => res.text())
      .then(text => {
        setAscii(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mode]);

  const themeColors = {
    builder: 'text-emerald-500',
    operator: 'text-white',
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10 transition-colors duration-1000 ${themeColors[mode]}`}>
      <pre className={`font-mono text-[10px] leading-none whitespace-pre opacity-30 animate-pulse ${loading ? 'opacity-0' : 'opacity-30'}`} 
           style={{ 
             textShadow: `0 0 10px ${mode === 'builder' ? '#10b981' : '#ffffff'}`,
             filter: 'blur(0.5px)'
           }}>
        {ascii}
      </pre>
    </div>
  );
}

const Header = () => {
  const { mode, setMode } = useSceneStore();
  const modes: { id: CharacterMode; label: string }[] = [
    { id: 'builder', label: 'Builder' },
    { id: 'operator', label: 'Operator' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="text-sm font-bold tracking-tighter text-slate-100 uppercase flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Desk of Rahul
      </div >
      <div className="flex gap-4 items-center">
        <div className="flex bg-black/40 border border-white/10 p-1 rounded-lg">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1 text-[10px] uppercase font-black rounded-md transition-all ${
                mode === m.id ? 'bg-white text-black' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div >
      </div >
    </nav>
  );
};

export default function Home() {
  const mode = useSceneStore((state) => state.mode);
  const modeConfigs = {
    builder: { title: 'Production Implementation', subtitle: 'PRODUCTION_MODE', color: 'text-emerald-400', accent: 'bg-emerald-500', bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069' },
    operator: { title: 'Operational Command', subtitle: 'COMMAND_MODE', color: 'text-white', accent: 'bg-white', bg: 'https://images.unsplash.com/photo-1497366811353-6870744d0948?auto=format&fit=crop&q=80&w=2070' },
  };
  const currentConfig = modeConfigs[mode];

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 font-sans overflow-x-hidden">
      <Head><title>Desk of Rahul | AI Operator</title></Head>
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto space-y-24 pb-32">
        <section className="h-[600px] rounded-3xl border border-white/10 bg-black/40 overflow-hidden relative flex items-center justify-center group">
          
          {/* CYBER-LUXE BACKGROUND LAYER */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 via-black to-black" />
          <HolographicASCII />
          
          {/* 3D OVERLAY LAYER */}
          <div className="absolute inset-0 z-20">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
              <SceneCanvas />
            </Canvas>
          </div >

          <div className="absolute bottom-10 left-10 z-30">
             <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
               <span className={`w-1.5 h-1.5 rounded-full ${currentConfig.accent} animate-pulse`} />
               System State: {currentConfig.subtitle}
             </div >
             <div className={`text-4xl font-bold uppercase tracking-tighter transition-colors duration-500 ${currentConfig.color}`}>
               {currentConfig.title}
             </div >
          </div >
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <section className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
              <h3 className="text-xl font-bold text-slate-100 mb-4">The AI Operator</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{MODE_DATA[mode].about}</p>
            </div >
          </section>
          <section className="lg:col-span-4 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {MODE_DATA[mode].thoughts.map((thought, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
                  <h3 className="text-base font-bold text-slate-100">{thought.title}</h3>
                  <p className="text-xs text-slate-400">{thought.excerpt}</p>
                </div >
              ))}
            </div >
          </section>
          <section className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              {MODE_DATA[mode].projects.map((project, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-slate-100">{project.title}</h4>
                  <p className="text-xs text-slate-400">{project.description}</p>
                </div >
              ))}
            </div >
          </section>
        </div >
      </main>
      <footer className="py-12 px-6 border-t border-white/10 text-center">
        <div className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold">
          © 2026 Desk of Rahul // System Operator OS
        </div >
      </footer >
      <CommandPalette />
    </div >
  );
}
