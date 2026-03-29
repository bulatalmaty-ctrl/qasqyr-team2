import { useFetch } from '../api'

export default function Training({ config }: { config: any }) {
  const { data: logs } = useFetch<any[]>('/api/training', [])

  const getIcon = (type: string) => {
    if (type === 'Swim') return 'pool'
    if (type === 'Bike') return 'directions_bike'
    return 'directions_run'
  }

  return (
    <section className="pt-24 pb-20 px-8 max-w-7xl mx-auto space-y-12" id="training">
      <header className="relative space-y-4">
        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase leading-none">Охотничий <span className="text-primary">прогресс</span></h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-light">Индивидуальные метрики производительности и последние тренировки.</p>
      </header>
      
      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-16">
        <div className="bg-surface-container-low p-8 flex flex-col justify-between aspect-video">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">pool</span>
          <div>
            <div className="text-6xl font-black font-headline">{config?.swim_km || 12.5} <span className="text-2xl text-on-surface-variant">KM</span></div>
            <p className="text-xs uppercase tracking-widest">Swim Weekly</p>
          </div>
        </div>
        <div className="bg-surface-container p-8 flex flex-col justify-between aspect-video">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">directions_bike</span>
          <div>
            <div className="text-6xl font-black font-headline">{config?.bike_km || 342} <span className="text-2xl text-on-surface-variant">KM</span></div>
            <p className="text-xs uppercase tracking-widest">Bike Weekly</p>
          </div>
        </div>
        <div className="bg-surface-container-high p-8 flex flex-col justify-between aspect-video border-r-4 border-primary-container">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">directions_run</span>
          <div>
            <div className="text-6xl font-black font-headline">{config?.run_km || 68} <span className="text-2xl text-on-surface-variant">KM</span></div>
            <p className="text-xs uppercase tracking-widest">Run Weekly</p>
          </div>
        </div>
      </div>

      {/* TRAINING LOG FEED */}
      <div className="space-y-4 max-w-4xl mx-auto pt-10">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-white uppercase italic tracking-tighter mb-8 flex gap-3 justify-center">
            <span className="text-white">TRAINING</span><span className="text-primary-container">LOG</span>
        </h2>
        
        {logs?.length === 0 && <p className="text-center text-on-surface-variant italic">Журнал тренировок пока пуст.</p>}
        {logs?.map((log) => (
          <div key={log.id} className="bg-[#1C1C1E] rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 relative group border border-white/5 hover:border-primary-container/30 transition-colors">
            <div className="absolute top-6 right-6 flex items-center gap-3">
              {log.isStrava && <span className="bg-[#fc4c02] text-white px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest">Strava</span>}
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest hidden sm:block">
                {new Date(log.timestamp).toLocaleDateString()}
              </span>
            </div>
            
            <div className="w-20 h-20 rounded-full bg-[#2A2322] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary-container text-4xl">{getIcon(log.type)}</span>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-3 gap-y-4 pt-2">
              <div className="col-span-3">
                <h3 className="font-headline font-black text-white text-xl uppercase tracking-widest">{log.title}</h3>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Athlete</p>
                <p className="text-sm font-bold text-white uppercase">{log.athlete}</p>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Dist</p>
                <p className="text-sm font-bold text-white uppercase">{log.distance} KM</p>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Time</p>
                <p className="text-sm font-bold text-white uppercase">{log.time}</p>
              </div>
            </div>
          </div>
        ))}
        {logs?.length > 0 && (
          <div className="flex justify-center mt-8 p-4">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mr-3 flex items-center">Данные синхронизированы через:</span>
            <img src="https://tech.strava.com/img/api/api_logo_pwrdBy_strava_horiz_light.png" alt="Powered by Strava" className="h-6 opacity-80" />
          </div>
        )}
      </div>
    </section>
  );
}
