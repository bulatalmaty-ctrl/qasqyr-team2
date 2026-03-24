export default function Footer({ config }: { config?: any }) {
  return (
    <footer className="bg-[#0E0E0E] py-12 px-8 flex flex-col md:flex-row justify-between items-start w-full border-t border-white/5">
      <div className="mb-8 md:mb-0">
        <div className="text-xl font-black text-white mb-4 font-headline uppercase italic">ҚАСҚЫР TEAM</div>
        <p className="font-body text-xs tracking-widest uppercase text-[#E3BEB8]/60">© 2024 ҚАСҚЫР TEAM. ПРЕДАТОРСКАЯ ЭСТЕТИКА.</p>
      </div>
      <div className="flex flex-wrap gap-12">
        {(config?.footer_instagram || config?.footer_strava) && (
          <div className="flex flex-col gap-4">
            <span className="font-headline text-white text-sm font-bold uppercase tracking-widest mb-2">Social</span>
            {config?.footer_instagram && <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href={config.footer_instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {config?.footer_strava && <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href={config.footer_strava} target="_blank" rel="noopener noreferrer">Strava</a>}
          </div>
        )}
        {(config?.footer_phone || config?.footer_policy) && (
          <div className="flex flex-col gap-4">
            <span className="font-headline text-white text-sm font-bold uppercase tracking-widest mb-2">Info</span>
            {config?.footer_phone && <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href={config.footer_phone.includes('@') && !config.footer_phone.startsWith('mailto:') ? `mailto:${config.footer_phone}` : (config.footer_phone.startsWith('+') ? `tel:${config.footer_phone}` : config.footer_phone)}>Контакты</a>}
            {config?.footer_policy && <a className="text-xs tracking-widest uppercase text-[#E3BEB8]/60 hover:text-white" href={config.footer_policy} target="_blank" rel="noopener noreferrer">Политика</a>}
          </div>
        )}
      </div>
    </footer>
  );
}
