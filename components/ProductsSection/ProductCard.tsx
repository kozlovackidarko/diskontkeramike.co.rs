'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import { assetUrl } from '@/lib/assetUrl'
import ProductPopup from './ProductPopup'

interface ProductCardProps {
  product: Product
}

function formatPrice(price: number): string {
  return `${price.toLocaleString('sr-RS')} din`
}

export default function ProductCard({ product }: ProductCardProps) {
  const [popupOpen, setPopupOpen] = useState(false)
  const imgSrc = assetUrl(product.pictures[0] ?? '/images/hero-tiles.png')
  const dimensionsStr = `${product.dimensions.width}cm x ${product.dimensions.height}cm`

  return (
    <>
      <article
        className={`group flex cursor-pointer flex-col bg-white border ${product.onSale ? 'border-red' : 'border-gray/20'}`}
        onClick={() => setPopupOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setPopupOpen(true)}
        aria-label={`Brzi pregled: ${product.name}`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-off-white">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.onSale && (
            <div className="absolute right-0 top-0 flex h-12 w-64 items-center justify-center bg-red text-[14px] font-montserrat font-bold uppercase leading-tight text-white" style={{ transform: 'translate(66px, 16px) rotate(30deg)' }}>
              TOP PONUDA
            </div>
          )}
          <span
            className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-sm bg-white/90 text-black shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] pointer-events-none"
            aria-hidden="true"
          >
            <Image src={assetUrl('/icons/zoom-in.svg')} alt="" width={18} height={18} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-montserrat font-bold text-black text-lg">{product.name}</h3>
          <p className="mt-1 font-inter text-sm text-gray">{dimensionsStr}</p>
          <div className="mt-2 flex items-baseline gap-2">
            {product.onSale && product.oldPrice != null && (
              <span className="font-inter text-sm text-gray line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className={`font-inter text-lg font-semibold ${product.onSale ? 'text-red' : 'text-black'}`}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </article>
      {popupOpen && (
        <ProductPopup product={product} onClose={() => setPopupOpen(false)} />
      )}
    </>
  )
}
