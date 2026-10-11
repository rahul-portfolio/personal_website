"use client";

import { create } from 'zustand';

type CharacterMode = 'builder' | 'operator';

interface SceneState {
  mode: CharacterMode;
  rotationSpeed: number;
  bloomIntensity: number;
  setMode: (mode: CharacterMode) => void;
  setRotationSpeed: (speed: number) => void;
  setBloomIntensity: (intensity: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({\n  mode: 'builder',\n  rotationSpeed: 1,\n  bloomIntensity: 1.5,\n  setMode: (mode) => set({ mode }),\n  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),\n  setBloomIntensity: (bloomIntensity) => set({ bloomIntensity }),\n}));
