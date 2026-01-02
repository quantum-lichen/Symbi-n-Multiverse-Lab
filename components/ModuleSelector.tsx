import React from 'react';
import { SYMBION_MODULES } from '../constants';
import { SymbionModule } from '../types';

interface ModuleSelectorProps {
  activeModuleId: string;
  onSelect: (id: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ activeModuleId, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {SYMBION_MODULES.map((mod) => (
        <button
          key={mod.id}
          onClick={() => onSelect(mod.id)}
          className={`
            relative p-4 rounded-xl border text-left transition-all duration-300
            ${activeModuleId === mod.id 
              ? 'bg-slate-800 border-current shadow-[0_0_15px_rgba(0,0,0,0.3)] transform scale-105' 
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'}
          `}
          style={{ borderColor: activeModuleId === mod.id ? mod.color : undefined }}
        >
          <div 
            className="text-sm font-sci-fi font-bold mb-1"
            style={{ color: mod.color }}
          >
            {mod.name}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            PN: {mod.perfectNumber}
          </div>
          <div className="text-[10px] text-slate-500 mt-2 leading-tight">
            {mod.functionDescription}
          </div>
          
          {/* Active Indicator */}
          {activeModuleId === mod.id && (
            <div 
              className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: mod.color }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ModuleSelector;