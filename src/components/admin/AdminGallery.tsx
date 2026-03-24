import { useState, useEffect } from 'react'
import { fetchAPI, useFetch, getAuthToken } from '../../api'

export default function AdminGallery() {
  const { data, loading, reload } = useFetch<any[]>('/api/gallery', [])
  const [images, setImages] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => { if (data) setImages(data) }, [data])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchAPI('/api/gallery', { method: 'POST', body: JSON.stringify(images) })
      alert('Gallery saved!')
      reload()
    } catch(e: any) { alert(e.message) }
    setSaving(false)
  }

  const updateImage = (index: number, key: string, value: any) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], [key]: value }
    setImages(newImages)
  }

  const addImage = () => {
    setImages([...images, { id: Date.now(), url: '', alt_text: 'Gallery Image' }])
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return alert("Файл слишком большой! Ограничение 4MB.");

    setUploadingIndex(index);
    const token = getAuthToken();
    const ext = file.name.split('.').pop() || 'jpg';
    const originalUrl = images[index].url;
    
    updateImage(index, 'url', 'Загрузка...');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const res = await fetch(`/api/upload?ext=${ext}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: arrayBuffer
      });
      
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      updateImage(index, 'url', data.url);
    } catch (err: any) {
      alert(err.message);
      updateImage(index, 'url', originalUrl);
    } finally {
      setUploadingIndex(null);
    }
  }

  if (loading) return <div className="text-on-surface">Loading...</div>

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-headline text-on-surface">Visual Codex</h2>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-4 py-2 font-bold disabled:opacity-50 cursor-pointer">
          {saving ? 'Saving...' : 'Save Gallery'}
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={img.id} className="bg-surface-container p-2 border border-white/10 rounded flex flex-col gap-2 relative group">
            <img src={img.url} className="w-full aspect-square object-cover bg-black" />
            <input className="w-full bg-surface p-1 text-xs border border-white/10 text-on-surface" placeholder="Image URL" value={img.url} onChange={e => updateImage(i, 'url', e.target.value)} />
            
            <label className={`w-full text-center text-xs p-2 border border-dashed border-white/20 hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer block ${uploadingIndex === i ? 'opacity-50 pointer-events-none' : ''}`}>
              {uploadingIndex === i ? 'Uploading...' : 'Upload Image File'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, i)} disabled={uploadingIndex === i} />
            </label>

            <input className="w-full bg-surface p-1 text-xs border border-white/10 text-on-surface" placeholder="Alt text" value={img.alt_text} onChange={e => updateImage(i, 'alt_text', e.target.value)} />
            <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-error text-on-error p-1 rounded opacity-0 group-hover:opacity-100 cursor-pointer">X</button>
          </div>
        ))}
        
        <button onClick={addImage} className="aspect-square border-2 border-dashed border-white/20 text-on-surface-variant hover:text-white hover:border-white transition-colors flex items-center justify-center cursor-pointer">
          + Add Image
        </button>
      </div>
    </div>
  )
}
