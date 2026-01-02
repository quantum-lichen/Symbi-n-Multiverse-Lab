import React, { useMemo } from 'react';
import { SimulationState, SymbionModule } from '../types';

interface FractalSpiralProps {
  state: SimulationState;
  activeModule: SymbionModule;
}

const FractalSpiral: React.FC<FractalSpiralProps> = ({ state, activeModule }) => {
  const width = 600;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  // Generate spiral points based on the Python formula:
  // r(theta) = phi * theta * (1 + 0.1 * sin(S_total)) * (perfect_number / 6)
  // Note: We normalize the perfect_number factor to avoid the spiral exploding off-screen for large numbers
  const points = useMemo(() => {
    const pts: string[] = [];
    const step = 0.1; // Theta step
    
    // Normalization factor for visualization to keep it on screen
    // We use log10 to handle the massive range of perfect numbers (6 to billions) visually
    const scaleBase = Math.log10(activeModule.perfectNumber) + 1;
    const visualScale = 20 / scaleBase; 

    for (let theta = 0; theta < state.thetaMax; theta += step) {
      // Python logic ported:
      // r = phi * theta * (1 + 0.1 * np.sin(S_total)) * (perfect_number / 6)
      
      // Adaptation for visual rendering:
      const modulation = 1 + 0.1 * Math.sin(state.sTotal * theta * 0.5); // Making modulation depend on theta for wave effect
      const r = state.phi * theta * modulation * visualScale;

      const x = centerX + r * Math.cos(theta);
      const y = centerY + r * Math.sin(theta);
      
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, [state, activeModule, centerX, centerY]);

  return (
    <div className="relative flex items-center justify-center p-4 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-sm shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-950/50 to-slate-950 pointer-events-none" />
      
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-[600px] max-h-[600px]">
        {/* Decorative Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* The Living Spiral */}
        <polyline
          points={points}
          fill="none"
          stroke={activeModule.color}
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          style={{
            filter: `drop-shadow(0 0 10px ${activeModule.color})`
          }}
        />
        
        {/* Center Point */}
        <circle cx={centerX} cy={centerY} r="4" fill={activeModule.color} className="animate-pulse" />
      </svg>

      {/* Overlay Data */}
      <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 text-right">
        <div>r(θ) = ϕ · θ · (1 + 0.1 sin(S))</div>
        <div>P_NUM: {activeModule.perfectNumber}</div>
      </div>
    </div>
  );
};

export default FractalSpiral;