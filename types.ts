export interface SymbionModule {
  id: string;
  name: string;
  perfectNumber: number;
  functionDescription: string;
  color: string;
}

export interface SimulationState {
  thetaMax: number; // Duration of spiral
  phi: number; // Golden ratio factor
  sTotal: number; // Sinusoidal modulation
  qubits: number;
  coupling: number; // J
  decoherence: number; // Gamma
  activeModuleId: string;
}

export interface GeminiAnalysis {
  interpretation: string;
  harmonicState: string;
  suggestedFocus: string;
}
