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
import contentProducts from '@/content/products.json'

async function getProducts(): Promise<Product[]> {
  try {
    const result = await client.queries.products({ relativePath: 'products.json' })
    const raw = result?.data?.products?.products ?? []
    const mapped = mapContentProductsToProducts(raw as Parameters<typeof mapContentProductsToProducts>[0])
    return normalizeProducts(mapped)
  } catch {
    const payload = contentProducts as { products: Parameters<typeof mapContentProductsToProducts>[0] }
    const mapped = mapContentProductsToProducts(payload.products ?? [])
    return normalizeProducts(mapped)
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
