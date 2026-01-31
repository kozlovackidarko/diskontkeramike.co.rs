import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Divider from '@/components/Divider/Divider'
import ProductsSection from '@/components/ProductsSection/ProductsSection'
import {
  mapContentProductsToProducts,
  normalizeProducts,
  type Product,
} from '@/lib/products'
import { client } from '@/tina/__generated__/client'

async function getProducts(): Promise<Product[]> {
  try {
    const result = await client.queries.productsConnection({ first: 500 })
    const edges = result?.data?.productsConnection?.edges ?? []
    const nodes = edges.map((e) => e?.node).filter(Boolean) as Parameters<typeof mapContentProductsToProducts>[0]
    const mapped = mapContentProductsToProducts(nodes)
    return normalizeProducts(mapped)
  } catch {
    return []
  }
}

export default async function Home() {
  const products = await getProducts()
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Divider />
        <ProductsSection products={products} />
      </main>
    </>
  )
}
