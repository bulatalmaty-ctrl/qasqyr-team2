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
          <p className="font-headline text-primary uppercase tracking-[0.4em] mb-4 text-sm font-bold">Великая Охота</p>
          <h1 className="font-headline text-[10vw] leading-[0.85] font-black italic uppercase tracking-tighter mb-8 text-white">ШАНХАЙ<br/>2026</h1>
          <div className="flex flex-wrap gap-12 border-l-4 border-primary-container pl-8">
            <div><p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Дата Гонки</p><p className="font-headline text-2xl font-bold">{displayDate}</p></div>
            <div><p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Локация</p><p className="font-headline text-2xl font-bold">SHANGHAI, CN</p></div>
          </div>
        </div>
      </div>
      
      {/* Live Countdown */}
      <div className="bg-surface-container-lowest py-24 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{timeLeft.days}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">Дней</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">Часов</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">Минут</span></div>
          <div className="bg-surface py-12 flex flex-col items-center"><span className="font-headline text-7xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2">Секунд</span></div>
        </div>
      </div>
      
      {/* Territorial Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] border-t border-white/5">
        <div className="bg-surface-container-low p-12 md:p-24 flex flex-col justify-center">
          <h2 className="font-headline text-5xl font-extrabold uppercase mb-8 leading-none">Территория</h2>
          <p className="text-on-surface-variant max-w-md mb-12 text-sm leading-relaxed">Трасса в Шанхае — это беспощадное испытание на выносливость. Плавание в дельте Янцзы, идеально плоский велоэтап и неоновый марафон.</p>
          <div className="space-y-6">
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Плавание</span><span className="text-primary font-bold text-sm tracking-widest">Устье Янцзы</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[65%]"></div></div></div>
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Велосипед</span><span className="text-primary font-bold text-sm tracking-widest">Прибрежная магистраль</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[40%]"></div></div></div>
            <div><div className="flex justify-between mb-2"><span className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Бег</span><span className="text-primary font-bold text-sm tracking-widest">Район Пудун</span></div><div className="h-1 bg-surface-container-highest w-full"><div className="h-full bg-primary-container w-[85%]"></div></div></div>
          </div>
        </div>
        <div className="bg-[#0E0E0E] relative min-h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108930.29837909385!2d121.45520807519137!3d31.15570535388053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b2713f3801ece1%3A0xe5ebadd821ef9a3!2sPudong%2C%20Shanghai%2C%20China!5e1!3m2!1sen!2skz!4v1711200000000!5m2!1sen!2skz" 
            className="absolute inset-0 w-full h-full opacity-60 saturate-0 hover:saturate-100 hover:opacity-100 transition-all duration-700 border-none" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
