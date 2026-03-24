export default function Calendar() {
  return (
    <section className="pt-24 pb-20 px-8" id="calendar">
      <div className="relative mb-20">
        <h1 className="text-huge font-headline font-black uppercase tracking-tighter text-white/10 select-none">ROAD TO</h1>
        <h2 className="text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter text-primary relative z-10">SHANGHAI 2026</h2>
        <p className="max-w-xl mt-6 text-on-surface-variant border-l-4 border-primary-container pl-6 uppercase tracking-widest text-sm">3.8км плавание | 180км вело | 42.2км бег. Стая готовится к охоте.</p>
      </div>
      <div className="bg-surface-container-low border border-white/5">
        <div className="grid grid-cols-7 border-b border-white/5 bg-surface-container-lowest">
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Mon</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Tue</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Wed</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Thu</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Fri</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Sat</div>
          <div className="p-4 text-center text-xs font-bold uppercase text-on-surface-variant">Sun</div>
        </div>
        <div className="grid grid-cols-7 grid-rows-2">
          <div className="min-h-[140px] p-2 border-r border-b border-white/5 bg-surface-container-lowest/30">
            <span className="text-xs text-white font-bold">01</span>
            <div className="mt-2 p-2 bg-primary-container/20 border-l-2 border-primary-container"><p className="text-[10px] font-bold uppercase text-primary">Core Work</p></div>
          </div>
          <div className="min-h-[140px] p-2 border-r border-b border-white/5 bg-surface-container-lowest/30">
            <span className="text-xs text-white font-bold">02</span>
            <div className="mt-2 p-2 bg-secondary-container/20 border-l-2 border-secondary"><p className="text-[10px] font-bold uppercase text-secondary">Long Run</p></div>
          </div>
          <div className="min-h-[140px] p-2 border-b border-white/5 bg-surface-container-lowest/30">
            <span className="text-xs text-white font-bold">03</span>
            <div className="mt-2 p-2 bg-error-container/40 border-l-2 border-error"><p className="text-[10px] font-bold uppercase text-error">REST DAY</p></div>
          </div>
          <div className="min-h-[140px] p-2 border-r border-b border-white/5"><span className="text-xs text-white font-bold">04</span><div className="mt-2 p-2 bg-primary-container/20 border-l-2 border-primary-container"><p className="text-[10px] font-bold uppercase text-primary">Intervals</p></div></div>
          <div className="min-h-[140px] p-2 border-r border-b border-white/5"><span className="text-xs text-white font-bold">05</span></div>
          <div className="min-h-[140px] p-2 border-r border-b border-white/5"><span className="text-xs text-white font-bold">06</span><div className="mt-2 p-2 bg-primary-container border-l-2 border-white"><p className="text-[10px] font-bold uppercase text-white">Test 5K Run</p></div></div>
          <div className="min-h-[140px] p-2 border-b border-white/5"><span className="text-xs text-white font-bold">07</span></div>
        </div>
      </div>
    </section>
  );
}
