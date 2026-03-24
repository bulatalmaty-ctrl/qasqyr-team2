export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-surface/70 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="text-2xl font-black italic tracking-tiled text-white font-headline">
        ҚАСҚЫР TEAM
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#hero">Главная</a>
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#team">Команда</a>
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#training">Тренировки</a>
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#calendar">Календарь</a>
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#gallery">Галерея</a>
        <a className="font-headline uppercase tracking-tighter font-bold text-sm text-[#E3BEB8] hover:text-white transition-colors duration-300" href="#ironman">Ironman 2026</a>
      </div>
      <button className="bg-primary-container text-white px-6 py-2 font-headline uppercase font-bold text-xs tracking-widest scale-95 active:scale-90 transition-transform cursor-pointer hover:bg-on-primary-fixed-variant">
        Вступить в стаю
      </button>
    </nav>
  );
}
