import { useState, useEffect, useCallback } from 'react';
import type { CreateUnitInput, UnitSchema } from '../types/unit';
import { StatSlider } from './StatSlider';

interface Props {
  onSubmit: (data: CreateUnitInput) => void;
  initialData?: UnitSchema | null;
  onCancel: () => void;
}


export const UnitForm = ({ onSubmit, initialData, onCancel }: Props) => {
  const BASE_STAT_ORDER = ['life', 'mind', 'intensity', 'control', 'speed', 'mobility'];
  const GROWTH_STAT_ORDER = ['life', 'mind', 'intensity', 'control', 'speed'];

  const updateBaseStat = useCallback((key: string, val: number) => {
    setUnit(prev => ({
      ...prev,
      base_stat: { ...prev.base_stat, [key]: val }
    }));
  }, []);
  const updateGrowthStat = useCallback((key: string, val: number) => {
    setUnit(prev => ({
      ...prev,
      growth_stat: { ...prev.growth_stat, [key]: val }
    }));
  }, []);

  const [unit, setUnit] = useState<CreateUnitInput>({
    id: '',
    base_stat: { life: 100, mind: 50, intensity: 10, control: 10, speed: 5, mobility: 3 },
    growth_stat: { life: 0, mind: 0, intensity: 0, control: 0, speed:0 }
  });
  const STAT_LIMITS = {
    base: {
      life: 100,      // 체력은 크게
      mind: 100,
      intensity: 100,
      control: 100,
      speed: 100,       // 속도는 정밀하게
      mobility: 20
    },
    growth: {
      life: 100,        // 성장치는 상대적으로 낮게
      mind: 100,
      intensity: 100,
      control: 100,
      speed: 100
    }
  };
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
          <p className="text-[10px] text-cyan-900 font-bold mb-4 uppercase">/// Base Parameters</p>
          {BASE_STAT_ORDER.map((key) => {
            const val = unit.base_stat[key as keyof typeof unit.base_stat];
            if (val === undefined) return null;
            return(<StatSlider 
              key={`base-${key}`} 
              label={key} 
              value={val} 
              max={STAT_LIMITS.base[key as keyof typeof STAT_LIMITS.base] || 100}
              onChange={(v) => updateBaseStat(key, v)}
            />)
          })}
        </div>

        <div className="pt-8 border-t border-slate-900 mt-4">
          <p className="text-[10px] text-yellow-900 font-bold mb-4 uppercase">/// Growth Parameters</p>
          {GROWTH_STAT_ORDER.map((key) => {
            const val = unit.growth_stat[key as keyof typeof unit.growth_stat];
            if (val === undefined) return null;
            return(<StatSlider 
              key={`growth-${key}`} 
              label={`GR_${key}`} 
              value={val} 
              max={STAT_LIMITS.growth[key as keyof typeof STAT_LIMITS.growth] || 100}
              onChange={(v) => updateGrowthStat(key, v)}
            />)
          })}
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