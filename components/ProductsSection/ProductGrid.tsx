'use client'

import type { Product } from '@/lib/products'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  columns?: 3 | 4
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="font-inter text-black py-12 text-center">
        Nema proizvoda koji odgovaraju filterima.
      </p>
    )
  }
  const gridCols = columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <div className={`grid grid-cols-1 gap-5 xs:grid-cols-2 ${gridCols}`}>
      {products.map((product, i) => (
        <ProductCard key={`${product.name}-${i}`} product={product} />
      ))}
    </div>
  )
}
