import React from 'react';

interface StatSliderProps {
  label: string;
  value: number;
  max: number;
  onChange: (val: number) => void;
}

// React.memo로 감싸서 해당 prop이 변하지 않으면 리렌더링 방지
export const StatSlider = React.memo(({ label, value, max, onChange }: StatSliderProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-6 relative group/slider">
      <div className="flex justify-between items-end mb-2">
        <label className="text-[10px] uppercase font-bold text-cyan-700 tracking-[0.2em]">
          {label}
        </label>
        
        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            max={max}
            value={value}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) onChange(Math.max(0, Math.min(max, val)));
              else if (e.target.value === '') onChange(0);
            }}
            className="bg-transparent text-right text-lg font-bold text-cyan-400 tabular-nums leading-none w-16 focus:outline-none focus:border-b border-cyan-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-[10px] text-cyan-900 font-bold mb-0.5">_PT</span>
        </div>
      </div>

      <div className="relative w-full h-2 bg-[#1a1a1a] border border-[#333]">
        {/* transition-all 제거: 즉각적인 반응을 위해 */}
        <div 
          className="absolute top-0 left-0 h-full bg-cyan-600/50" 
          style={{ width: `${percentage}%` }} 
        />
        <div 
          className="absolute top-0 h-full w-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          style={{ left: `${percentage}%` }}
        />
        
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          // will-change-transform으로 하드웨어 가속 강제
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10 will-change-transform"
        />
      </div>
    </div>
  );
});

// 디버깅을 위해 이름을 명시적으로 지정
StatSlider.displayName = 'StatSlider';