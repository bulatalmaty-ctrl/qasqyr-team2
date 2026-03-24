export default function Hero({ title, subtitle }: { title?: string, subtitle?: string }) {
  const finalTitle = title || "ҚАСҚЫР\nTEAM";
  const finalSubtitle = subtitle || 'Стая не знает слова "сдаться"';
  
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <img alt="Triathlon team in competition" className="w-full h-full object-cover opacity-70" src="/hero-bg.jpeg" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
      </div>
      <div className="relative z-10 px-8 md:px-24 max-w-4xl -mt-48">
        <h1 className="font-headline text-7xl md:text-9xl font-black italic tracking-tiled text-white mb-4 leading-none uppercase whitespace-pre-line">
            {finalTitle}
        </h1>
        <p className="font-headline text-xl md:text-3xl font-light text-primary tracking-widest uppercase mb-10">
            {finalSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-container text-black px-10 py-5 font-headline font-extrabold uppercase tracking-widest text-sm hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-primary-container/20 border-b-4 border-[#C7872A] active:border-b-0 active:translate-y-1">
            Познакомиться с командой
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant/50">Scroll to hunt</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}
