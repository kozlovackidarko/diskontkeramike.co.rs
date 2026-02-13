'use client'

import Image from 'next/image'
import { assetUrl } from '@/lib/assetUrl'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="flex w-full gap-3">
      <input
        type="search"
        id="search-products-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Traži pločice po nazivu, boji, dimenzijama, itd."
        className="min-w-0 flex-1 max-w-none border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all"
        aria-label="Pretraži pločice"
      />
      <button
        type="button"
        onClick={onSearch}
        className="flex shrink-0 items-center justify-center gap-2 bg-orange p-3 font-inter text-base font-medium text-white hover:opacity-90 transition-opacity sm:gap-3 px-4 sm:px-6 sm:py-3"
        aria-label="Pretraži"
      >
        <Image src={assetUrl('/icons/search.svg')} alt="" width={16} height={16} aria-hidden="true" />
        <span className="hidden sm:inline">Pretraži</span>
      </button>
    </div>
  )
}
