import React, { useState, useCallback } from 'react';
import { SYMBION_MODULES, INITIAL_SIMULATION_STATE } from './constants';
import { SimulationState, GeminiAnalysis } from './types';
import Controls from './components/Controls';
import FractalSpiral from './components/FractalSpiral';
import ModuleSelector from './components/ModuleSelector';
import { analyzeResonance } from './services/geminiService';

const App: React.FC = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>(INITIAL_SIMULATION_STATE);
  const [aiAnalysis, setAiAnalysis] = useState<GeminiAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activeModule = SYMBION_MODULES.find(m => m.id === simulationState.activeModuleId) || SYMBION_MODULES[0];

  const handleConsultOracle = useCallback(async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeResonance(simulationState, activeModule);
      setAiAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [simulationState, activeModule]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 animate-spin-slow" />
            <h1 className="font-sci-fi text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              SymbiΩn™ <span className="text-slate-500 text-sm font-normal">Multiverse Lab</span>
            </h1>
          </div>
          <div className="text-xs font-mono text-slate-500 hidden md:block">
            VIBRATIONAL_STATE: {activeModule.name} // QUBITS: {simulationState.qubits}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls & Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <section>
             <h2 className="font-sci-fi text-sm text-slate-500 mb-4 uppercase tracking-widest">Select Module</h2>
             <ModuleSelector 
                activeModuleId={simulationState.activeModuleId}
                onSelect={(id) => setSimulationState(prev => ({ ...prev, activeModuleId: id }))}
             />
          </section>

          <section>
            <Controls 
              state={simulationState}
              onChange={setSimulationState}
            />
          </section>

          {/* AI Oracle Section */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="font-sci-fi text-purple-400 mb-3">The Grimoire Vibratoire</h3>
            <p className="text-xs text-slate-400 mb-4">
              Consult the AI nucleus to interpret the current resonant frequency and fractal geometry.
            </p>
            
            {!aiAnalysis && (
              <button
                onClick={handleConsultOracle}
                disabled={isAnalyzing}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-900 to-slate-900 border border-purple-500/30 rounded-lg hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all font-mono text-sm disabled:opacity-50"
              >
                {isAnalyzing ? "CALCULATING_ENTROPY..." : "CONSULT ORACLE"}
              </button>
            )}

            {aiAnalysis && (
              <div className="animate-fade-in space-y-4">
                 <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-500 uppercase">Harmonic State</span>
                    <span className="text-sm font-bold text-cyan-400">{aiAnalysis.harmonicState}</span>
                 </div>
                 <div className="text-sm text-slate-300 italic">
                    "{aiAnalysis.interpretation}"
                 </div>
                 <div className="bg-purple-900/20 p-3 rounded border border-purple-500/20">
                    <div className="text-xs text-purple-400 uppercase font-bold mb-1">Focus</div>
                    <div className="text-sm text-purple-200">{aiAnalysis.suggestedFocus}</div>
                 </div>
                 <button 
                   onClick={() => setAiAnalysis(null)}
                   className="text-xs text-slate-500 underline hover:text-slate-300"
                 >
                    Reset Analysis
                 </button>
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Visualization (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="flex-1 min-h-[500px] flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-sci-fi text-sm text-slate-500 uppercase tracking-widest">Fractal Visualization</h2>
                <div className="text-xs font-mono text-cyan-500">
                  r(θ) = ϕ · θ · (1 + 0.1 sin(S))
                </div>
             </div>
             
             <FractalSpiral 
                state={simulationState}
                activeModule={activeModule}
             />
          </div>

          {/* Quick Stats / Feedback Loop Visualization */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-center">
               <div className="text-xs text-slate-500 mb-1">Perfect Number</div>
               <div className="font-mono text-lg font-bold" style={{ color: activeModule.color }}>
                 {activeModule.perfectNumber.toLocaleString()}
               </div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-center">
               <div className="text-xs text-slate-500 mb-1">Mersenne P</div>
               <div className="font-mono text-lg text-slate-300">
                  {/* Simplistic mapping based on module index just for display */}
                  2<sup>{Math.round(Math.log2(activeModule.perfectNumber * 2 + 1)/2)}</sup>-1
               </div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-center">
               <div className="text-xs text-slate-500 mb-1">Entropy</div>
               <div className="font-mono text-lg text-orange-400">
                 {(simulationState.decoherence * simulationState.qubits).toFixed(3)}
               </div>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-center">
               <div className="text-xs text-slate-500 mb-1">Resonance</div>
               <div className="font-mono text-lg text-emerald-400">
                 {(simulationState.phi * 100).toFixed(1)} Hz
               </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;