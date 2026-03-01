'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import { assetUrl } from '@/lib/assetUrl'

interface ProductPopupProps {
  product: Product
  onClose: () => void
}

function formatPrice(price: number): string {
  return `${price.toLocaleString('sr-RS')} din`
}

export default function ProductPopup({ product, onClose }: ProductPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const pictures = product.pictures?.length
    ? product.pictures.map(assetUrl)
    : [assetUrl('/images/hero-tiles.png')]
  const hasMultiple = pictures.length > 1

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    setCurrentIndex(0)
  }, [product])

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i - 1 + pictures.length) % pictures.length)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((i) => (i + 1) % pictures.length)
  }

  const dimensionsStr = `${product.dimensions.width}cm x ${product.dimensions.height}cm`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-popup-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-sm bg-white/90 text-black shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-white"
          aria-label="Zatvori"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-off-white">
          {pictures.map((src, i) => (
            <div
              key={`${i}-${src}`}
              className={`absolute inset-0 transition-opacity duration-300 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={i !== currentIndex}
            >
              <Image
                src={src}
                alt={i === currentIndex ? `${product.name} – slika ${i + 1}` : ''}
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
          ))}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-white/90 text-black shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-white"
                aria-label="Prethodna slika"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-white/90 text-black shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-white"
                aria-label="Sledeća slika"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
          {product.onSale && (
            <div className="absolute right-0 top-0 flex h-12 w-80 items-center justify-center bg-red text-[14px] font-montserrat font-bold uppercase leading-tight text-white" style={{ transform: 'translate(86px, 26px) rotate(30deg)' }}>
              TOP PONUDA
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6">
          <h2 id="product-popup-title" className="font-montserrat font-bold text-black text-xl">
            {product.name}
          </h2>

          <div className="flex flex-wrap items-baseline gap-2">
            {product.onSale && product.oldPrice != null && (
              <span className="font-inter text-base text-gray line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className={`font-inter text-xl font-semibold ${product.onSale ? 'text-red' : 'text-black'}`}>
              {formatPrice(product.price)}
            </span>
          </div>

          <dl className="grid gap-3 font-inter text-[15px]">
            <div>
              <dt className="font-semibold text-black">Dimenzije</dt>
              <dd className="mt-0.5 text-gray">{dimensionsStr} (širina × dužina)</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Tip</dt>
              <dd className="mt-0.5 text-gray">{product.type.join(', ')}</dd>
            </div>
            {product.tile_type && (
              <div>
                <dt className="font-semibold text-black">Tip plocice</dt>
                <dd className="mt-0.5 text-gray">{product.tile_type}</dd>
              </div>
            )}
            {product.final_polish && (
              <div>
                <dt className="font-semibold text-black">Zavrsna obrada</dt>
                <dd className="mt-0.5 text-gray">{product.final_polish}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-black">Kategorije</dt>
              <dd className="mt-0.5 text-gray">{product.categories.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Klasa</dt>
              <dd className="mt-0.5 text-gray">{product.class}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Boja</dt>
              <dd className="mt-0.5 text-gray">{product.color?.length ? product.color.join(', ') : '—'}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Namena</dt>
              <dd className="mt-0.5 text-gray">{product.purpose.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Proizvođač</dt>
              <dd className="mt-0.5 text-gray">{product.manufacturer}</dd>
            </div>
          </dl>
        </div>
        </div>
      </div>
    </div>
  )
}
