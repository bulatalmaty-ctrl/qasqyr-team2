import { useState, useEffect } from 'react'
import { fetchAPI, useFetch } from '../../api'

export default function AdminTrainingLog() {
  const { data: members, loading: loadingMembers } = useFetch<any[]>('/api/team', [])
  const { data: logs, loading: loadingLogs, reload } = useFetch<any[]>('/api/training', [])
  
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    athleteId: '',
    athleteName: '',
    type: 'Swim',
    distance: '',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    if (members && members.length > 0 && !formData.athleteId) {
      setFormData(prev => ({ ...prev, athleteId: members[0].id.toString(), athleteName: members[0].name }))
    }
  }, [members])

  const handleAthleteChange = (e: any) => {
    const id = e.target.value;
    const athlete = members?.find((m: any) => m.id.toString() === id);
    setFormData({ ...formData, athleteId: id, athleteName: athlete?.name || '' })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!formData.athleteName || !formData.distance) return alert("Fill required fields");
    setSaving(true)
    
    let title = `${formData.type.toUpperCase()} SESSION`
    if (formData.type === 'Bike') title = 'CYCLING RIDE'
    if (formData.type === 'Run') title = 'RUNNING SESSION'

    const payload = {
      title,
      type: formData.type,
      athlete: formData.athleteName,
      distance: parseFloat(formData.distance),
      time: `${formData.hours.padStart(2, '0')}:${formData.minutes.padStart(2, '0')}:${formData.seconds.padStart(2, '0')}`
    }

    try {
      await fetchAPI('/api/training', { method: 'POST', body: JSON.stringify(payload) })
      setFormData(prev => ({ ...prev, distance: '', hours: '00', minutes: '00', seconds: '00' }))
      reload()
    } catch(err: any) { alert(err.message) }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete log?")) return;
    try {
      await fetchAPI(`/api/training?id=${id}`, { method: 'DELETE' })
      reload()
    } catch(err: any) { alert(err.message) }
  }

  const getIcon = (type: string) => {
    if (type === 'Swim') return 'pool'
    if (type === 'Bike') return 'directions_bike'
    return 'directions_run'
  }

  if (loadingMembers || loadingLogs) return <div className="text-on-surface">Loading...</div>

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT: Feed */}
      <div className="flex-1 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-white uppercase italic tracking-tighter mb-8 flex gap-3"><span className="text-white">TRAINING</span><span className="text-primary-container">LOG</span></h2>
        
        {logs?.length === 0 && <p className="text-on-surface-variant italic">No training logs yet.</p>}
        {logs?.map((log) => (
          <div key={log.id} className="bg-[#1C1C1E] rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 relative group">
            {/* Delete button (Admin only) */}
            <button onClick={() => handleDelete(log.id)} className="absolute top-4 right-4 text-error opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><span className="material-symbols-outlined text-sm">close</span></button>
            <div className="absolute top-6 right-6 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest hidden sm:block">
              {new Date(log.timestamp).toLocaleDateString()}
            </div>
            
            <div className="w-20 h-20 rounded-full bg-[#2A2322] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary-container text-4xl">{getIcon(log.type)}</span>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-3 gap-y-4 pt-2">
              <div className="col-span-3">
                <h3 className="font-headline font-black text-white text-xl uppercase tracking-widest">{log.title}</h3>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Athlete</p>
                <p className="text-sm font-bold text-white uppercase">{log.athlete}</p>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Dist</p>
                <p className="text-sm font-bold text-white uppercase">{log.distance} KM</p>
              </div>
              <div className="col-span-1">
                <p className="text-[10px] text-primary-container font-bold uppercase tracking-widest mb-1">Time</p>
                <p className="text-sm font-bold text-white uppercase">{log.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Form */}
      <div className="w-full lg:w-[400px]">
        <div className="bg-[#1C1C1E] rounded-3xl p-8 lg:sticky lg:top-8">
          <h2 className="text-2xl font-black font-headline text-primary-container uppercase tracking-widest mb-8">Log Session</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-2">Athlete</label>
              <div className="relative">
                <select 
                  className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 focus:border-primary-container transition-colors appearance-none font-bold"
                  value={formData.athleteId} 
                  onChange={handleAthleteChange}
                >
                  {members?.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-2">Type</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 focus:border-primary-container appearance-none font-bold"
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Swim">Swim</option>
                    <option value="Bike">Bike</option>
                    <option value="Run">Run</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-2">Distance (KM)</label>
                <input 
                  type="number" step="0.1" required
                  className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 focus:border-primary-container font-bold"
                  value={formData.distance} 
                  onChange={e => setFormData({...formData, distance: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-2">Time</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <input type="number" min="0" max="99" className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 pr-8 text-center font-bold" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-bold">ч</span>
                </div>
                <div className="relative">
                  <input type="number" min="0" max="59" className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 pr-8 text-center font-bold" value={formData.minutes} onChange={e => setFormData({...formData, minutes: e.target.value})} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-bold">м</span>
                </div>
                <div className="relative">
                  <input type="number" min="0" max="59" className="w-full bg-[#111111] text-white p-4 rounded-xl outline-none border border-white/5 pr-8 text-center font-bold" value={formData.seconds} onChange={e => setFormData({...formData, seconds: e.target.value})} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-bold">с</span>
                </div>
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-primary-container hover:brightness-110 transition-all text-[#4A3200] font-headline font-black uppercase tracking-widest py-4 rounded-xl mt-4 disabled:opacity-50 cursor-pointer text-lg shadow-lg shadow-primary-container/20 border-b-4 border-[#C7872A] active:border-b-0 active:translate-y-1">
              {saving ? 'Logging...' : 'Submit Entry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
