import { Routes, Route } from 'react-router-dom'
import MainSite from './pages/MainSite'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  )
}
