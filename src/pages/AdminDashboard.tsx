import { useState } from 'react'
import { getAuthToken, setAuthToken } from '../api'
import AdminConfig from '../components/admin/AdminConfig'
import AdminTeam from '../components/admin/AdminTeam'
import AdminGallery from '../components/admin/AdminGallery'
import AdminTrainingLog from '../components/admin/AdminTrainingLog'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(getAuthToken())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'config'|'team'|'gallery'|'training'>('training')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (res.ok) {
        setAuthToken(data.token)
        setToken(data.token)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch(e) {
      setError('Network error')
    }
  }

  const handleLogout = () => {
    setAuthToken('')
    setToken(null)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 font-body">
        <form onSubmit={handleLogin} className="bg-surface-container p-8 max-w-sm w-full border border-white/10 rounded">
          <h2 className="text-3xl font-headline font-black mb-6 text-center text-primary uppercase">Staff Only</h2>
          {error && <div className="bg-error-container text-on-error-container p-3 text-sm mb-4">{error}</div>}
          <input 
            type="password" 
            placeholder="Admin Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-surface text-on-surface border border-white/20 p-3 outline-none focus:border-primary mb-4"
          />
          <button type="submit" className="w-full bg-primary-container hover:bg-primary-fixed-dim transition-colors text-white cursor-pointer font-bold uppercase tracking-widest py-3">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background font-body text-on-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-surface-container border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-headline font-black uppercase text-white">COMMAND<br/><span className="text-primary-container">CENTER</span></h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button onClick={() => setTab('config')} className={`text-left p-3 uppercase text-sm tracking-widest font-bold cursor-pointer ${tab === 'config' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'}`}>Hero & Config</button>
          <button onClick={() => setTab('team')} className={`text-left p-3 uppercase text-sm tracking-widest font-bold cursor-pointer ${tab === 'team' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'}`}>Team Panel</button>
          <button onClick={() => setTab('gallery')} className={`text-left p-3 uppercase text-sm tracking-widest font-bold cursor-pointer ${tab === 'gallery' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'}`}>Gallery</button>
          <button onClick={() => setTab('training')} className={`text-left p-3 uppercase text-sm tracking-widest font-bold cursor-pointer ${tab === 'training' ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-white'}`}>Training Log</button>
        </nav>
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link to="/" className="block w-full text-center p-2 text-xs uppercase tracking-widest bg-surface transition-colors border border-white/10 hover:text-white text-on-surface-variant hover:border-white">View Site</Link>
          <button onClick={handleLogout} className="block w-full p-2 text-xs uppercase tracking-widest text-[#410000] bg-error hover:opacity-90 font-bold transition-colors cursor-pointer">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {tab === 'config' && <AdminConfig />}
        {tab === 'team' && <AdminTeam />}
        {tab === 'gallery' && <AdminGallery />}
        {tab === 'training' && <AdminTrainingLog />}
      </main>
    </div>
  )
}
