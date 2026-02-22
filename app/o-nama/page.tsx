import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Divider from '@/components/Divider/Divider'
import CollectionShowcase from '@/components/CollectionShowcase/CollectionShowcase'
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

const O_NAMA_HERO = {
  title: 'O nama',
  subtitle: 'Diskont Keramike - sjajan kvalitet, po najboljoj ceni.',
  description: 'U Diskontu Keramike verujemo u iskrenu i transparentnu ponudu. Već više od dve decenije uvozimo kvalitetne pločice iz Italije, Španije i Turske, uz uvek konkurentne, a često i najbolje cene na tržištu. Naš tim je tu da brzo odgovori i pomogne vam da izaberete pravo rešenje za vaš prostor.',
  imageSrc: '/images/hero-tiles.png',
  imageAlt: 'Ceramic tiles',
  buttons: [
    { label: 'Cela ponuda', href: '/svi-proizvodi', variant: 'blue' as const },
  ],
}

export default async function OnamaPage() {
  const products = await getProducts()
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero {...O_NAMA_HERO} />
        <CollectionShowcase collectionName="Naša preporuka" products={products} />
        <Divider />
        <ContactInfo bg="off-white" />
      </main>
      <Footer />
    </>
  )
}
