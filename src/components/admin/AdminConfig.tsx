import { useState, useEffect } from 'react'
import { fetchAPI, useFetch } from '../../api'

export default function AdminConfig() {
  const { data, loading, reload } = useFetch<any>('/api/config')
  const [formData, setFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (data) setFormData(data) }, [data])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchAPI('/api/config', { method: 'POST', body: JSON.stringify(formData) })
      alert('Config saved!')
      reload()
    } catch(e: any) { alert(e.message) }
    setSaving(false)
  }

  if (loading) return <div className="text-on-surface">Loading...</div>

  return (
    <div className="bg-surface-container p-6 rounded-lg space-y-4 text-on-surface">
      <h2 className="text-2xl font-bold font-headline">Hero Settings</h2>
      <div>
        <label className="block text-sm mb-1 text-on-surface-variant">Hero Title</label>
        <input className="w-full bg-surface p-2 border border-white/10" value={formData.hero_title || ''} onChange={e => setFormData({...formData, hero_title: e.target.value})} />
      </div>
      <div>
        <label className="block text-sm mb-1 text-on-surface-variant">Hero Subtitle</label>
        <input className="w-full bg-surface p-2 border border-white/10" value={formData.hero_subtitle || ''} onChange={e => setFormData({...formData, hero_subtitle: e.target.value})} />
      </div>
      <div>
        <label className="block text-sm mb-1 text-on-surface-variant">Ironman Date (UTC)</label>
        <input className="w-full bg-surface p-2 border border-white/10" type="datetime-local" value={formData.ironman_date?.slice(0,16) || ''} onChange={e => setFormData({...formData, ironman_date: e.target.value + ':00Z'})} />
      </div>
      
      <h2 className="text-2xl font-bold font-headline mt-8">Training Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Swim KM</label>
          <input className="w-full bg-surface p-2 border border-white/10" type="number" step="0.1" value={formData.swim_km || ''} onChange={e => setFormData({...formData, swim_km: parseFloat(e.target.value)})} />
        </div>
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Bike KM</label>
          <input className="w-full bg-surface p-2 border border-white/10" type="number" step="1" value={formData.bike_km || ''} onChange={e => setFormData({...formData, bike_km: parseInt(e.target.value)})} />
        </div>
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Run KM</label>
          <input className="w-full bg-surface p-2 border border-white/10" type="number" step="1" value={formData.run_km || ''} onChange={e => setFormData({...formData, run_km: parseInt(e.target.value)})} />
        </div>
      </div>

      <h2 className="text-2xl font-bold font-headline mt-8">Footer & Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Instagram URL</label>
          <input className="w-full bg-surface p-2 border border-white/10" value={formData.footer_instagram || ''} onChange={e => setFormData({...formData, footer_instagram: e.target.value})} placeholder="https://instagram.com/qasqyr" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Strava URL</label>
          <input className="w-full bg-surface p-2 border border-white/10" value={formData.footer_strava || ''} onChange={e => setFormData({...formData, footer_strava: e.target.value})} placeholder="https://strava.com/clubs/..." />
        </div>
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Контакты (Email/Телефон/Link)</label>
          <input className="w-full bg-surface p-2 border border-white/10" value={formData.footer_phone || ''} onChange={e => setFormData({...formData, footer_phone: e.target.value})} placeholder="+7 777 ... или email" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-on-surface-variant">Политика конфиденциальности (URL)</label>
          <input className="w-full bg-surface p-2 border border-white/10" value={formData.footer_policy || ''} onChange={e => setFormData({...formData, footer_policy: e.target.value})} placeholder="/privacy-policy" />
        </div>
      </div>
      
      <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-4 py-2 mt-8 font-bold disabled:opacity-50 cursor-pointer border border-transparent hover:border-white transition-colors">
        {saving ? 'Saving...' : 'Save Config'}
      </button>
    </div>
  )
}
