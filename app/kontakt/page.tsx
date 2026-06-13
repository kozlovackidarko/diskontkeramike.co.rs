import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import LocalBusinessJsonLd from '@/components/Seo/LocalBusinessJsonLd'
import { PAGE_SEO } from '@/lib/seo'
import ContactInfo from '@/components/ContactInfo/ContactInfo'
import ContactForm from '@/components/ContactForm/ContactForm'
import Footer from '@/components/Footer/Footer'
import Divider from "@/components/Divider/Divider"

export const metadata: Metadata = PAGE_SEO.contact

export default function KontaktPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main className="min-h-screen">
        <ContactInfo bg="white" />
        <Divider />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
