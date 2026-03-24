import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Team from '../components/Team'
import Training from '../components/Training'
import Calendar from '../components/Calendar'
import Gallery from '../components/Gallery'
import Ironman from '../components/Ironman'
import Footer from '../components/Footer'
import { useFetch } from '../api'

export default function MainSite() {
  const { data: config } = useFetch<any>('/api/config')
  const { data: teamList } = useFetch<any[]>('/api/team', [])
  const { data: galleryList } = useFetch<any[]>('/api/gallery', [])

  return (
    <>
      <Navbar />
      <Hero title={config?.hero_title} subtitle={config?.hero_subtitle} />
      <Team members={teamList || []} />
      <Training config={config} />
      <Calendar />
      <Gallery images={galleryList || []} />
      <Ironman date={config?.ironman_date} />
      <Footer />
    </>
  )
}
