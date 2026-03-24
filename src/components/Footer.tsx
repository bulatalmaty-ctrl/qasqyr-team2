export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] py-12 px-8 flex flex-col md:flex-row justify-between items-start w-full border-t border-white/5">
      <div className="mb-8 md:mb-0">
        <div className="text-xl font-black text-white mb-4 font-headline uppercase italic">ҚАСҚЫР TEAM</div>
        <p className="font-body text-xs tracking-widest uppercase text-[#E3BEB8]/60">© 2024 ҚАСҚЫР TEAM. ПРЕДАТОРСКАЯ ЭСТЕТИКА.</p>
      </div>
      <div className="flex flex-wrap gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-headline text-white text-sm font-bold uppercase tracking-widest mb-2">Social</span>
          <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href="#">Instagram</a>
          <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href="#">Strava</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-headline text-white text-sm font-bold uppercase tracking-widest mb-2">Info</span>
          <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href="#">Контакты</a>
          <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href="#">Политика</a>
        </div>
      </div>
    </footer>
  );
}
