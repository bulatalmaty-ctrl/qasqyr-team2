import { useState, useEffect } from 'react';

const getMonday = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay() || 7;  
  if (day !== 1) date.setHours(-24 * (day - 1));
  return date;
}

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/calendar').then(res => res.json()).then(data => setEvents(data || [])).catch(() => {});
  }, []);

  const startDate = getMonday(new Date());
  // Rolling 14-day window starting from current week's Monday
  const gridCells = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const getDayEvents = (d: Date) => {
    // Handle timezone offsets safely by manually formatting YYYY-MM-DD
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    return events.filter(e => e.date === dateStr);
  }

  const getThemeClass = (type: string) => {
    if (type === 'primary') return 'bg-primary-container/20 border-l-2 border-primary-container text-primary';
    if (type === 'secondary') return 'bg-secondary-container/20 border-l-2 border-secondary text-secondary';
    if (type === 'white') return 'bg-white/10 border-l-2 border-white text-white';
    return 'bg-error-container/40 border-l-2 border-error text-error';
  }

  return (
    <section className="pt-24 pb-20 px-8" id="calendar">
      <div className="relative mb-20 max-w-7xl mx-auto">
        <h1 className="text-huge font-headline font-black uppercase tracking-tighter text-white/10 select-none">ROAD TO</h1>
        <h2 className="text-5xl md:text-8xl font-headline font-black uppercase tracking-tighter text-primary relative z-10">SHANGHAI 2026</h2>
        <p className="max-w-xl mt-6 text-on-surface-variant border-l-4 border-primary-container pl-6 uppercase tracking-widest text-sm">3.8км плавание | 180км вело | 42.2км бег. Стая готовится к охоте.</p>
      </div>
      
      <div className="bg-surface-container-low border border-white/5 max-w-7xl mx-auto">
        <div className="grid grid-cols-7 border-b border-white/5 bg-surface-container-lowest overflow-hidden">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="p-4 text-center text-[10px] md:text-xs font-bold uppercase text-on-surface-variant hidden md:block">{day}</div>
          ))}
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="p-2 text-center text-xs font-bold uppercase text-on-surface-variant md:hidden">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 grid-rows-2">
          {gridCells.map((d, i) => {
             const cellEvents = getDayEvents(d);
             const isToday = new Date().toDateString() === d.toDateString();
             return (
               <div key={i} className={`min-h-[140px] p-2 border-b border-white/5 md:border-r ${isToday ? 'bg-surface-container-highest border-t-2 border-t-primary' : 'bg-surface-container-lowest/30'} flex flex-col`}>
                 <span className={`text-xs font-bold ${isToday ? 'text-primary' : 'text-white'}`}>{String(d.getDate()).padStart(2, '0')}</span>
                 
                 <div className="mt-2 space-y-2 flex-1">
                   {cellEvents.map(ev => (
                     <div key={ev.id} className={`p-1.5 md:p-2 ${getThemeClass(ev.type)} truncate`}>
                       <p className="text-[9px] md:text-[10px] font-bold uppercase leading-tight whitespace-normal">{ev.title}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )
          })}
        </div>
      </div>
    </section>
  );
}
