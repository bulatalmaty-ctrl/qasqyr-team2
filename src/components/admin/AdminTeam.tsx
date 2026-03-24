import { useState, useEffect } from 'react'
import { fetchAPI, useFetch, getAuthToken } from '../../api'

export default function AdminTeam() {
  const { data, loading, reload } = useFetch<any[]>('/api/team', [])
  const [members, setMembers] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => { if (data) setMembers(data) }, [data])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchAPI('/api/team', { method: 'POST', body: JSON.stringify(members) })
      alert('Team saved!')
      reload()
    } catch(e: any) { alert(e.message) }
    setSaving(false)
  }

  const disconnectStrava = async (memberId: number) => {
    if (!confirm("Вы уверены, что хотите отключить Strava для этого спортсмена?")) return;
    try {
      await fetchAPI(`/api/strava/disconnect?id=${memberId}`, { method: 'DELETE' })
      alert('Strava успешно отключена!');
      reload()
    } catch(e: any) { alert(e.message) }
  }

  const updateMember = (index: number, key: string, value: any) => {
    const newMembers = [...members]
    newMembers[index] = { ...newMembers[index], [key]: value }
    setMembers(newMembers)
  }

  const addMember = () => {
    setMembers([...members, { id: Date.now(), name: '', role: '', image_url: '', manifesto: '', strava_url: '', stat1_label: 'Readiness', stat1_val: 0 }])
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return alert("Файл слишком большой! Ограничение 4MB.");

    setUploadingIndex(index);
    const token = getAuthToken();
    const ext = file.name.split('.').pop() || 'jpg';
    const originalUrl = members[index].image_url;
    
    updateMember(index, 'image_url', 'Загрузка...');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const res = await fetch(`/api/upload?ext=${ext}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: arrayBuffer
      });
      
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      updateMember(index, 'image_url', data.url);
    } catch (err: any) {
      alert(err.message);
      updateMember(index, 'image_url', originalUrl);
    } finally {
      setUploadingIndex(null);
    }
  }

  if (loading) return <div className="text-on-surface">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-headline text-on-surface">Team Members</h2>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-4 py-2 font-bold disabled:opacity-50 cursor-pointer">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member, i) => (
          <div key={member.id} className="bg-surface-container p-4 rounded border border-white/10 flex flex-col md:flex-row gap-4 text-on-surface">
            <div className="w-full md:w-40 flex flex-col gap-2 flex-shrink-0">
              <img src={member.image_url} alt="" className="w-full aspect-[3/4] object-cover bg-black rounded" />
              <label className={`w-full text-center text-[10px] p-2 border border-dashed border-white/20 hover:border-primary-container hover:text-primary-container transition-colors cursor-pointer uppercase font-bold tracking-widest block ${uploadingIndex === i ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploadingIndex === i ? 'Uploading...' : 'Upload Photo'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, i)} disabled={uploadingIndex === i} />
              </label>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Name</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={member.name} onChange={e => updateMember(i, 'name', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Role</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={member.role} onChange={e => updateMember(i, 'role', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Image URL</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={member.image_url} onChange={e => updateMember(i, 'image_url', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Manifesto</label>
                <textarea className="w-full bg-surface p-2 border border-white/10 text-sm" rows={2} value={member.manifesto} onChange={e => updateMember(i, 'manifesto', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Stat Label</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={member.stat1_label} onChange={e => updateMember(i, 'stat1_label', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Stat Value (0-100)</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" type="number" max="100" value={member.stat1_val} onChange={e => updateMember(i, 'stat1_val', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Ссылка на профиль Strava (для кнопки)</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={member.strava_url || ''} onChange={e => updateMember(i, 'strava_url', e.target.value)} placeholder="https://www.strava.com/athletes/123456" />
              </div>
              <div className="col-span-2 flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                {member.stravaConnected ? (
                  <div className="flex items-center gap-4">
                    <span className="text-green-500 font-bold text-[10px] uppercase tracking-widest">
                      ✅ Strava Подключена
                    </span>
                    <button onClick={() => disconnectStrava(member.id)} className="text-on-surface-variant hover:text-white text-[10px] uppercase tracking-widest hover:underline cursor-pointer">
                      (Отключить)
                    </button>
                  </div>
                ) : (
                  <a href={`/api/strava/auth?id=${member.id}`} className="text-[#fc4c02] font-bold text-[10px] uppercase tracking-widest hover:underline cursor-pointer">
                    🔗 Подключить Strava
                  </a>
                )}
                <button onClick={() => removeMember(i)} className="text-error hover:underline text-xs tracking-widest uppercase font-bold cursor-pointer">Remove Athlete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addMember} className="w-full border-2 border-dashed border-white/20 p-4 text-on-surface-variant hover:text-white hover:border-white transition-colors cursor-pointer font-bold tracking-widest uppercase text-sm">
        + Add Team Member
      </button>
    </div>
  )
}
