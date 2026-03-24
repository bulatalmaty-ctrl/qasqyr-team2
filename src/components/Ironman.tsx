import { useState, useEffect } from 'react';

export default function Ironman({ date }: { date?: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!date) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(date).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [date]);

  // Format the date dynamically for display
  const displayDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()
    : "OCT 18, 2026";

  return (
    <section className="relative" id="ironman">
      <div className="relative h-[80vh] flex flex-col justify-end px-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center grayscale opacity-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcFieEv6Z5OEI00voM1JArAFsxo5Yj2RXvp_OJ29XmGIAHekLomhp-sDW2TaX9XUokvyBmGf2r59-eHqkN3E0GYr6Oot9BZXeMzmx923bQTFLItjOK631dwY4ZSnx3z6wxxsKOxk9O-D-SJwPux-ctOEbBdC3UFIx41_twB87CZg9zQneYKOHj6q7FfoOJrQzhqDS6A_fAdBKGNP_YELl4Bu_dUrJVUcWq8bGk_PrE7uYwMNgg14u1qkfyu_-POHpvCTcHHcWWBHc')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl">
          <p className="font-headline text-primary uppercase tracking-[0.4em] mb-4 text-sm font-bold">The Ultimate Hunt</p>
          <h1 className="font-headline text-[10vw] leading-[0.85] font-black italic uppercase tracking-tighter mb-8 text-white">SHANGHAI<br/>2026</h1>
          <div className="flex flex-wrap gap-12 border-l-4 border-primary-container pl-8">
            <div><p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Race Date</p><p className="font-headline text-2xl font-bold">{displayDate}</p></div>
            <div><p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Location</p><p className="font-headline text-2xl font-bold">SHANGHAI, CN</p></div>
          </div>
        </div>
      </div>
      
      {/* Live Countdown */}
      <div className="bg-surface-container-lowest py-24 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{timeLeft.days}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">DAYS</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">HOURS</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">MINUTES</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">SECONDS</span></div>
        </div>
      </div>
      
      {/* Territorial Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-surface-container-low p-12 md:p-24 flex flex-col justify-center">
          <h2 className="font-headline text-5xl font-extrabold uppercase mb-8 leading-none">The Territory</h2>
          <p className="text-on-surface-variant max-w-md mb-12 text-sm leading-relaxed">Shanghai's course is a relentless test of endurance. Yangtze delta swim, pan-flat bike, neon-glow marathon.</p>
          <div className="space-y-6">
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold">Swim</span><span className="text-primary font-bold">Yangtze Estuary</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[65%]"></div></div></div>
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold">Bike</span><span className="text-primary font-bold">Coastal Expressway</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[40%]"></div></div></div>
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold">Run</span><span className="text-primary font-bold">Pudong District</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[85%]"></div></div></div>
          </div>
        </div>
        <div className="bg-[#0E0E0E] flex items-center justify-center p-8 grayscale opacity-50"><span className="material-symbols-outlined text-[300px]">map</span></div>
      </div>
    </section>
  );
}
