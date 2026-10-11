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

export const useSceneStore = create<SceneState>((set) => ({
  mode: 'builder',
  rotationSpeed: 1,
  bloomIntensity: 1.5,
  setMode: (mode) => set({ mode }),
  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),
  setBloomIntensity: (bloomIntensity) => set({ bloomIntensity }),
}));
