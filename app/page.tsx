import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Divider from '@/components/Divider/Divider'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Divider />
      </main>
    </>
  )
}
