import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import { PAGE_SEO } from '@/lib/seo'
import Divider from '@/components/Divider/Divider'
import ProductsSection from '@/components/ProductsSection/ProductsSection'
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

export const metadata: Metadata = PAGE_SEO.products

export default async function SviProizvodiPage() {
  const products = await getProducts()
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ProductsSection products={products} bg="white" />
        <Divider />
        <ContactInfo bg="off-white" />
      </main>
      <Footer />
    </>
  )
}
