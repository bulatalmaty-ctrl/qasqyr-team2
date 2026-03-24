import { useState, useEffect } from 'react'
import { fetchAPI, useFetch } from '../../api'

export default function AdminCalendar() {
  const { data, loading, reload } = useFetch<any[]>('/api/calendar', [])
  const [events, setEvents] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (data) setEvents(data) }, [data])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchAPI('/api/calendar', { method: 'POST', body: JSON.stringify(events) })
      alert('Calendar saved!')
      reload()
    } catch(e: any) { alert(e.message) }
    setSaving(false)
  }

  const updateEvent = (index: number, key: string, value: any) => {
    const newEvents = [...events]
    newEvents[index] = { ...newEvents[index], [key]: value }
    setEvents(newEvents)
  }

  const addEvent = () => {
    const today = new Date().toISOString().split('T')[0];
    setEvents([...events, { id: Date.now(), title: '', date: today, type: 'primary' }])
  }

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index))
  }

  if (loading) return <div className="text-on-surface">Loading...</div>

  // Sort events by date natively so admin sees them ordered
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold font-headline text-on-surface">Calendar Events</h2>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-4 py-2 font-bold disabled:opacity-50 cursor-pointer">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="space-y-4">
        {sortedEvents.map((ev, idx) => {
          // find the actual index in the raw events array for updating
          const actualIndex = events.findIndex(e => e.id === ev.id)
          const i = actualIndex >= 0 ? actualIndex : idx
          
          return (
            <div key={ev.id || i} className="bg-surface-container p-4 rounded border border-white/10 text-on-surface">
              <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Date</label>
                <input type="date" className="w-full bg-surface p-2 border border-white/10 text-sm" value={ev.date} onChange={e => updateEvent(i, 'date', e.target.value)} />
              </div>
              <div className="flex-[2]">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Title (e.g. Long Run)</label>
                <input className="w-full bg-surface p-2 border border-white/10 text-sm" value={ev.title} onChange={e => updateEvent(i, 'title', e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 text-on-surface-variant tracking-widest uppercase">Color Theme</label>
                <select className="w-full bg-surface p-2 border border-white/10 text-sm h-[38px]" value={ev.type} onChange={e => updateEvent(i, 'type', e.target.value)}>
                  <option value="primary">Красный (Primary)</option>
                  <option value="secondary">Желтый (Secondary)</option>
                  <option value="error">Темный (Rest/Error)</option>
                  <option value="white">Белый (Info)</option>
                </select>
              </div>
              <button onClick={() => removeEvent(i)} className="text-error hover:underline text-xs tracking-widest uppercase font-bold cursor-pointer h-[38px] px-4 flex items-center shrink-0">Remove</button>
            </div>
          </div>
        )})}
      </div>
      <button onClick={addEvent} className="w-full border-2 border-dashed border-white/20 p-4 text-on-surface-variant hover:text-white hover:border-white transition-colors cursor-pointer font-bold tracking-widest uppercase text-sm">
        + Add Event
      </button>
    </div>
  )
}
