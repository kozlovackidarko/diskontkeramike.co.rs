import Script from 'next/script'
import Header from '@/components/Header/Header'
import ContactInfo from '@/components/ContactInfo/ContactInfo'
import ContactForm from '@/components/ContactForm/ContactForm'
import Footer from '@/components/Footer/Footer'
import Divider from "@/components/Divider/Divider"

export default function KontaktPage() {
  return (
    <>
      <Script src="https://www.google.com/recaptcha/enterprise.js" strategy="lazyOnload" />
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
