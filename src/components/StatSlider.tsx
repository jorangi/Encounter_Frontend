interface StatSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

export const StatSlider = ({ label, value, onChange }: StatSliderProps) => (
  <div className="mb-6 relative group/slider">
    <div className="flex justify-between items-end mb-2">
      <label className="text-[10px] uppercase font-bold text-cyan-700 tracking-[0.2em]">
        {label}
      </label>
      
      {/* 수치 표시 및 직접 입력 필드 */}
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          max="200"
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            // NaN 방지 및 범위 제한 (0~200)
            if (!isNaN(val)) {
              onChange(Math.max(0, Math.min(200, val)));
            } else if (e.target.value === '') {
              onChange(0); // 빈 칸일 경우 0으로 처리
            }
          }}
          className="bg-transparent text-right text-lg font-bold text-cyan-400 tabular-nums leading-none w-16 focus:outline-none focus:border-b border-cyan-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-[10px] text-cyan-900 font-bold mb-0.5">_PT</span>
      </div>
    </div>

    {/* 슬라이더 트랙 커스텀 */}
    <div className="relative w-full h-2 bg-[#1a1a1a] border border-[#333]">
      {/* 실제 채워지는 게이지 (Visual) */}
      <div 
        className="absolute top-0 left-0 h-full bg-cyan-600/50 transition-all duration-150" 
        style={{ width: `${(value / 200) * 100}%` }} 
      />
      {/* 현재 위치 표시선 (Visual) */}
      <div 
        className="absolute top-0 h-full w-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-150"
        style={{ left: `${(value / 200) * 100}%` }}
      />
      
      {/* 실제 Input (투명하게 덮어씌움) */}
      <input
        type="range"
        min="0"
        max="200"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
    </div>
  </div>
);