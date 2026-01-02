import React from 'react';
import { SimulationState } from '../types';

interface ControlsProps {
  state: SimulationState;
  onChange: (newState: SimulationState) => void;
}

const Controls: React.FC<ControlsProps> = ({ state, onChange }) => {
  
  const handleChange = (key: keyof SimulationState, value: number) => {
    onChange({ ...state, [key]: value });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-md">
      <h3 className="font-sci-fi text-lg text-cyan-400 mb-6 border-b border-cyan-900/50 pb-2">
        Parameter Control
      </h3>
      
      <div className="space-y-6">
        {/* S Total (Modulation) */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Modulation (S_Total)</label>
            <span className="font-mono text-cyan-500">{state.sTotal.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={state.sTotal}
            onChange={(e) => handleChange('sTotal', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
          />
        </div>

        {/* Phi Factor */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Phi Factor (ϕ)</label>
            <span className="font-mono text-cyan-500">{state.phi.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.001"
            value={state.phi}
            onChange={(e) => handleChange('phi', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
          />
        </div>

        {/* Qubits */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Qubits (N)</label>
            <span className="font-mono text-purple-400">{state.qubits}</span>
          </div>
          <input
            type="range"
            min="1"
            max="32"
            step="1"
            value={state.qubits}
            onChange={(e) => handleChange('qubits', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
          />
        </div>

        {/* Coupling */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Coupling (J)</label>
            <span className="font-mono text-pink-400">{state.coupling.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.coupling}
            onChange={(e) => handleChange('coupling', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-400"
          />
        </div>

         {/* Decoherence */}
         <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Decoherence (Γ)</label>
            <span className="font-mono text-orange-400">{state.decoherence.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.decoherence}
            onChange={(e) => handleChange('decoherence', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
          />
        </div>

        {/* Theta Max (Zoom/Length) */}
         <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-slate-300">Spiral Length (θ Max)</label>
            <span className="font-mono text-emerald-400">{state.thetaMax}</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="1"
            value={state.thetaMax}
            onChange={(e) => handleChange('thetaMax', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
          />
        </div>

      </div>
    </div>
  );
};

export default Controls;