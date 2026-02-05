import { useEffect, useState } from 'react';
import { unitService } from './services/api';
import type { UnitSchema, CreateUnitInput } from './types/unit';
import { UnitForm } from './components/UnitForm';

function App() {
  const [units, setUnits] = useState<UnitSchema[]>([]);
  const [editingUnit, setEditingUnit] = useState<UnitSchema | null>(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = async () => {
    try {
      const res = await unitService.getAll();
      setUnits(res.data);
    } catch (e) { console.error("Connection Failed"); }
  };

  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (data: CreateUnitInput) => {
    if (editingUnit) await unitService.update(data.id, data as UnitSchema);
    else await unitService.create(data);
    setShowForm(false);
    setEditingUnit(null);
    refresh();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-8 lg:p-12 relative overflow-hidden">
      {/* 배경 장식 (오염된 느낌의 원) */}
      <div className="fixed -top-20 -right-20 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 헤더 영역 */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-900 pb-6 relative z-10">
        <div>
          <h1 className="text-7xl font-black text-white tracking-tighter mb-2" style={{ textShadow: "0 0 10px rgba(6,182,212,0.3)" }}>
            ENCOUNTER<span className="text-cyan-500">.</span>
          </h1>
          <div className="flex gap-6 text-[10px] tracking-[0.2em] text-gray-500 uppercase font-bold">
            <p>System: <span className="text-green-500">ONLINE</span></p>
            <p>Auth: <span className="text-cyan-600">Administrator</span></p>
            <p>Ver: <span className="text-gray-600">2.0.6</span></p>
          </div>
        </div>

        <button 
          onClick={() => { setEditingUnit(null); setShowForm(true); }}
          className="mt-6 md:mt-0 px-8 py-4 border border-cyan-500 text-cyan-400 font-bold tracking-widest text-xs hover:bg-cyan-500 hover:text-black transition-all duration-300 uppercase relative overflow-hidden group"
        >
          {/* 버튼 호버 시 지나가는 광원 효과 */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1s_infinite]"></div>
          + Initialize_Detection
        </button>
      </header>

      <main className="flex flex-col lg:flex-row gap-12 relative z-10">
        {/* 유닛 리스트 영역 */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {units.map((u) => (
            <div key={u.id} className="bg-[#0a0a0c] border border-gray-800 p-6 hover:border-cyan-500/50 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{u.id}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 text-[10px] uppercase font-bold">
                  <button onClick={() => { setEditingUnit(u); setShowForm(true); }} className="text-cyan-500 hover:underline">Edit</button>
                  <button onClick={() => unitService.delete(u.id).then(refresh)} className="text-red-600 hover:underline">Kill</button>
                </div>
              </div>
              
              <div className="space-y-2">
                {Object.entries(u.base_stat).slice(0, 5).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 uppercase tracking-wider text-[10px]">{k}</span>
                    <span className="text-gray-300 font-mono">{v}</span>
                  </div>
                ))}
              </div>
              
              {/* 카드 장식용 바 */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
          
          {units.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-800 text-gray-700 font-mono text-sm">
              NO ENTITIES DETECTED IN SECTOR 4.
            </div>
          )}
        </section>

        {/* 폼이 켜졌을 때 우측에 고정 or 모달 */}
        {showForm && (
          <aside className="lg:w-[400px] shrink-0">
             <div className="sticky top-10">
               <UnitForm 
                 initialData={editingUnit}
                 onCancel={() => setShowForm(false)}
                 onSubmit={handleSubmit}
               />
             </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;