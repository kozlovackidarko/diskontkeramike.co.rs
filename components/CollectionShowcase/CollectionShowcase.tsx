'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/lib/products'
import ProductGrid from '@/components/ProductsSection/ProductGrid'

export interface CollectionShowcaseProps {
  collectionName: string
  products: Product[]
  /** When true, also include products that are on sale (even if not in the collection). */
  includeOnSale?: boolean
}

const INITIAL_PAGE_SIZE = 8
const LOAD_MORE_SIZE = 8

export default function CollectionShowcase({ collectionName, products, includeOnSale = false }: CollectionShowcaseProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE)

  const collectionProducts = useMemo(
    () =>
      products.filter(
        (p) => p.categories.includes(collectionName) || (includeOnSale && p.onSale)
      ),
    [products, collectionName, includeOnSale]
  )
  const visibleProducts = useMemo(
    () => collectionProducts.slice(0, visibleCount),
    [collectionProducts, visibleCount]
  )
  const hasMore = visibleCount < collectionProducts.length
  const remaining = collectionProducts.length - visibleCount

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10">{collectionName}</h2>
          <ProductGrid products={visibleProducts} columns={4} />
          {hasMore && (
            <div className="flex justify-center pt-6">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_SIZE)}
                className="border border-black bg-white px-8 py-3 font-inter text-base font-semibold text-black hover:bg-off-white transition-colors"
              >
                Učitaj još ({remaining} preostalo)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
