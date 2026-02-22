import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Divider from '@/components/Divider/Divider'
import ProductsSection from '@/components/ProductsSection/ProductsSection'
import PartnersSection from '@/components/PartnersSection/PartnersSection'
import ContactInfo from '@/components/ContactInfo/ContactInfo'
import Footer from '@/components/Footer/Footer'
import {
  mapContentProductsToProducts,
  normalizeProducts,
  filterActiveProducts,
  type Product,
} from '@/lib/products'
import { client } from '@/tina/__generated__/client'

async function getProducts(): Promise<Product[]> {
  try {
    const result = await client.queries.productsConnection({ first: 500 })
    const edges = result?.data?.productsConnection?.edges ?? []
    const nodes = edges.map((e) => e?.node).filter(Boolean) as Parameters<typeof mapContentProductsToProducts>[0]
    const activeNodes = filterActiveProducts(nodes)
    const mapped = mapContentProductsToProducts(activeNodes)
    return normalizeProducts(mapped)
  } catch {
    return []
  }
}

const HOME_HERO = {
  title: 'Diskont Keramike',
  subtitle: 'Veliki izbor kermačkih pločica po najboljim cenama.',
  description: 'U Diskontu Keramike verujemo u iskrenu i transparentnu ponudu. Već više od dve decenije uvozimo kvalitetne pločice iz Italije, Španije i Turske, uz uvek konkurentne, a često i najbolje cene na tržištu. Naš tim je tu da brzo odgovori i pomogne vam da izaberete pravo rešenje za vaš prostor.',
  imageSrc: '/images/hero-tiles.png',
  imageAlt: 'Ceramic tiles',
  buttons: [
    { label: 'Cela ponuda', href: '/svi-proizvodi', variant: 'blue' as const },
    { label: 'Naša preporuka', href: '/kategorija/nasa-preporuka', variant: 'orange' as const },
  ],
}

export default async function Home() {
  const products = await getProducts()
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero {...HOME_HERO} />
        <Divider />
        <ProductsSection products={products} />
        <PartnersSection />
        <ContactInfo />
      </main>
      <Footer />
    </>
  )
}
