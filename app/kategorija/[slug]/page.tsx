import Header from '@/components/Header/Header'
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
import { getCategorySlugs, getCategoryBySlug } from '@/lib/product-options'
import { client } from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'

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

export async function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()
  const products = await getProducts()
  const includeOnSale = category.name === 'Top ponuda'
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CollectionShowcase
          collectionName={category.name}
          products={products}
          includeOnSale={includeOnSale}
        />
        <Divider />
        <ContactInfo bg="off-white" />
      </main>
      <Footer />
    </>
  )
}
