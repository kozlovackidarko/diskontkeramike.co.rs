import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import { PAGE_SEO } from '@/lib/seo'
import PartnersSection from '@/components/PartnersSection/PartnersSection'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = PAGE_SEO.partners

export default function PartneriPage() {
  return (
    <>
      <Header />
      <main className="pb-8">
        <PartnersSection />
      </main>
      <Footer />
    </>
  )
}
