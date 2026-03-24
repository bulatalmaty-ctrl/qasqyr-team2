export default function Team({ members }: { members: any[] }) {
  if (!members || members.length === 0) return null;
  
  return (
    <section className="bg-surface pt-24 min-h-screen" id="team">
      <div className="px-8 py-20 flex flex-col md:flex-row items-end gap-8 border-b border-white/5 bg-surface-container-lowest">
        <div className="flex-1">
          <h1 className="font-headline text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
            НАША <span className="text-primary-container">СТАЯ</span>
          </h1>
          <p className="max-w-xl text-on-surface-variant text-lg font-light tracking-tight">
            Элита триатлона. Хищники на дистанции. Мы не просто соревнуемся, мы доминируем. 
            Познакомьтесь с теми, кто ведет ҚАСҚЫР TEAM к победе в Шанхае.
          </p>
        </div>
        <div className="hidden md:block opacity-20">
          <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-white/5">
        {members.map((member, i) => (
          <article key={i} className="group relative aspect-[3/4] overflow-hidden bg-surface-container-low border-r border-b border-white/5 flex flex-col justify-end">
            <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src={member.image_url} alt={member.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="relative p-8 z-10 w-full">
              <span className="text-primary font-headline font-bold uppercase text-xs tracking-widest mb-2 block">{member.role}</span>
              <h2 className="font-headline text-5xl font-black uppercase tracking-tighter mb-4">{member.name}</h2>
              <blockquote className="text-on-surface-variant italic font-light border-l-2 border-primary-container pl-4 mb-6 text-sm">"{member.manifesto}"</blockquote>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                  <span>{member.stat1_label}</span><span className="text-primary">{member.stat1_val}</span>
                </div>
                <div className="h-1 bg-surface-container-highest w-full relative">
                  <div className="absolute top-0 left-0 h-full bg-primary-container" style={{ width: typeof member.stat1_val === 'number' ? `${member.stat1_val}%` : parseInt(member.stat1_val || '0') + '%' }}></div>
                </div>
              </div>
              <a href={member.strava_url} target="_blank" rel="noreferrer" className="w-full bg-primary-container text-white py-4 font-headline font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
                Следить на Strava <span className="material-symbols-outlined text-sm">trending_up</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
