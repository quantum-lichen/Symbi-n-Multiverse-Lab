import { SymbionModule } from './types';

// Ported from src/modules.py
export const SYMBION_MODULES: SymbionModule[] = [
  { 
    id: "RECALLΩ", 
    name: "RECALLΩ", 
    perfectNumber: 6, 
    functionDescription: "Phase et récupération contextuelle",
    color: "#22d3ee" // Cyan
  },
  { 
    id: "MATERIΩN", 
    name: "MATERIΩN", 
    perfectNumber: 28, 
    functionDescription: "Amplitude et ancrage matériel",
    color: "#fbbf24" // Amber
  },
  { 
    id: "CALMΩ", 
    name: "CALMΩ", 
    perfectNumber: 496, 
    functionDescription: "Décohérence et équilibre émotionnel",
    color: "#a78bfa" // Violet
  },
  { 
    id: "WINKΩ", 
    name: "WINKΩ", 
    perfectNumber: 8128, 
    functionDescription: "Couplage et communication codée",
    color: "#f472b6" // Pink
  },
  { 
    id: "ASTRALΩ", 
    name: "ASTRALΩ", 
    perfectNumber: 33550336, 
    functionDescription: "Entropie dynamique et navigation subtile",
    color: "#34d399" // Emerald
  },
  { 
    id: "TRINITYΩ", 
    name: "TRINITYΩ", 
    perfectNumber: 8589869056, 
    functionDescription: "Interaction tripolaire maximale",
    color: "#f87171" // Red
  }
];

// Ported from data/mersenne.txt
export const MERSENNE_PRIMES = [3, 7, 31, 127, 8191, 131071];

export const INITIAL_SIMULATION_STATE = {
  thetaMax: 50,
  phi: 1.618,
  sTotal: 1.0,
  qubits: 4,
  coupling: 0.5,
  decoherence: 0.1,
  activeModuleId: "RECALLΩ"
};