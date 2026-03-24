export default function Gallery({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;
  
  return (
    <section className="pt-32 pb-24 px-12 max-w-7xl mx-auto" id="gallery">
      <header className="mb-20">
        <h1 className="text-6xl md:text-8xl font-headline font-black uppercase leading-none tracking-tighter mb-6">ВИЗУАЛЬНЫЙ <br/> <span className="text-primary">КОДЕКС</span></h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-surface-container-lowest p-1">
        {images.map((img, i) => (
          <div key={i} className="aspect-square bg-surface-container overflow-hidden group">
            <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" src={img.url} alt={img.alt_text} />
          </div>
        ))}
      </div>
    </section>
  );
}
