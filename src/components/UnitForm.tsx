import { useState, useEffect } from 'react';
import type { CreateUnitInput, UnitSchema } from '../types/unit';
import { StatSlider } from './StatSlider';

interface Props {
  onSubmit: (data: CreateUnitInput) => void;
  initialData?: UnitSchema | null;
  onCancel: () => void;
}

export const UnitForm = ({ onSubmit, initialData, onCancel }: Props) => {
  const [unit, setUnit] = useState<CreateUnitInput>({
    id: '',
    base_stat: { life: 100, mind: 50, intensity: 10, suppression: 10, speed: 5, mobility: 3 },
    growth_stat: { life: 5, mind: 2 }
  });

  useEffect(() => { if (initialData) setUnit(initialData); }, [initialData]);

  return (
    <div className="bg-black/90 border border-slate-800 p-8 w-full max-w-[400px] relative shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
      {/* 장식용 코너 마커 */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>

      <h2 className="text-xl text-white font-black italic tracking-tighter mb-8 border-b border-gray-800 pb-4">
        <span className="text-cyan-500 mr-2">/</span>
        {initialData ? "MODIFY_ENTITY" : "REGISTER_NEW_ENTITY"}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Identification_ID</label>
          <input
            className="w-full bg-transparent border-b border-gray-700 text-white text-lg p-2 font-mono focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/10 transition-all placeholder:text-gray-800"
            value={unit.id}
            disabled={!!initialData}
            onChange={(e) => setUnit({ ...unit, id: e.target.value })}
            placeholder="INPUT_ID_HERE"
          />
        </div>

        <div className="pt-4">
          <p className="text-[10px] text-cyan-900 font-bold mb-4 uppercase">/// Synchronization_Parameters</p>
          {Object.entries(unit.base_stat).map(([key, val]) => (
            <StatSlider 
              key={key} 
              label={key} 
              value={val as number} 
              onChange={(v) => setUnit({...unit, base_stat: {...unit.base_stat, [key]: v}})} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <button 
          onClick={() => onSubmit(unit)}
          className="bg-cyan-600 text-black font-bold py-3 text-sm hover:bg-white hover:text-black transition-colors uppercase tracking-widest"
        >
          Execute
        </button>
        <button 
          onClick={onCancel}
          className="border border-gray-700 text-gray-500 py-3 text-sm hover:border-red-500 hover:text-red-500 transition-colors uppercase tracking-widest"
        >
          Abort
        </button>
      </div>
    </div>
  );
};