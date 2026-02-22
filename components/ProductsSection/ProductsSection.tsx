'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  type Product,
  type FilterState,
  getFilterOptions,
  getInitialFilterState,
  filterProducts,
} from '@/lib/products'
import SearchBar from './SearchBar'
import FiltersSidebar from './FiltersSidebar'
import ActiveFilterTags, { type FilterTag } from './ActiveFilterTags'
import ProductGrid from './ProductGrid'

export interface ProductsSectionProps {
  products: Product[]
  bg?: 'white' | 'off-white'
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/š/g, 's')
    .replace(/č/g, 'c')
    .replace(/ć/g, 'c')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd')
}

function buildActiveTags(filters: FilterState): FilterTag[] {
  const tags: FilterTag[] = []
  filters.categories.forEach((c) => tags.push({ id: `category:${c}`, label: slugify(c) }))
  if (filters.priceMin != null) tags.push({ id: 'priceMin', label: `od-${filters.priceMin}-dinara` })
  if (filters.priceMax != null) tags.push({ id: 'priceMax', label: `do-${filters.priceMax}-dinara` })
  if (filters.width != null) tags.push({ id: 'width', label: `${filters.width}cm-sirine` })
  if (filters.height != null) tags.push({ id: 'height', label: `${filters.height}cm-duzine` })
  filters.tile_types.forEach((t) => tags.push({ id: `tile_type:${t}`, label: slugify(t) }))
  filters.final_polishes.forEach((f) => tags.push({ id: `final_polish:${f}`, label: slugify(f) }))
  filters.classes.forEach((c) => tags.push({ id: `class:${c}`, label: slugify(c) }))
  filters.colors.forEach((c) => tags.push({ id: `color:${c}`, label: slugify(c) }))
  filters.purposes.forEach((p) => tags.push({ id: `purpose:${p}`, label: slugify(p) }))
  filters.manufacturers.forEach((m) => tags.push({ id: `manufacturer:${m}`, label: slugify(m) }))
  return tags
}

const INITIAL_PAGE_SIZE = 9
const LOAD_MORE_SIZE = 9
const SCROLL_DELAY_MS = 150

export default function ProductsSection({ products, bg = 'off-white' }: ProductsSectionProps) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>(getInitialFilterState())
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE)
  const resultsRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  const filterOptions = useMemo(() => getFilterOptions(products), [products])
  const filteredProducts = useMemo(
    () => filterProducts(products, filters, search),
    [products, filters, search]
  )
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  )
  const hasMore = visibleCount < filteredProducts.length
  const activeTags = useMemo(() => buildActiveTags(filters), [filters])

  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE)
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const timeout = setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, SCROLL_DELAY_MS)
    return () => clearTimeout(timeout)
  }, [filters, search])

  const handleFiltersChange = (update: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...update }))
  }

  const handleClearAll = () => {
    setFilters(getInitialFilterState())
  }

  const handleRemoveTag = (id: string) => {
    if (id.startsWith('category:')) {
      const cat = id.slice('category:'.length)
      setFilters((prev) => ({ ...prev, categories: prev.categories.filter((c) => c !== cat) }))
      return
    }
    if (id === 'priceMin') setFilters((prev) => ({ ...prev, priceMin: null }))
    else if (id === 'priceMax') setFilters((prev) => ({ ...prev, priceMax: null }))
    else if (id === 'width') setFilters((prev) => ({ ...prev, width: null }))
    else if (id === 'height') setFilters((prev) => ({ ...prev, height: null }))
    else if (id.startsWith('tile_type:')) {
      const t = id.slice('tile_type:'.length)
      setFilters((prev) => ({ ...prev, tile_types: prev.tile_types.filter((x) => x !== t) }))
    }
    else if (id.startsWith('final_polish:')) {
      const f = id.slice('final_polish:'.length)
      setFilters((prev) => ({ ...prev, final_polishes: prev.final_polishes.filter((x) => x !== f) }))
    }
    else if (id.startsWith('class:')) {
      const cls = id.slice('class:'.length)
      setFilters((prev) => ({ ...prev, classes: prev.classes.filter((c) => c !== cls) }))
    }
    else if (id.startsWith('color:')) {
      const color = id.slice('color:'.length)
      setFilters((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }))
    }
    else if (id.startsWith('purpose:')) {
      const purp = id.slice('purpose:'.length)
      setFilters((prev) => ({ ...prev, purposes: prev.purposes.filter((p) => p !== purp) }))
    }
    else if (id.startsWith('manufacturer:')) {
      const m = id.slice('manufacturer:'.length)
      setFilters((prev) => ({ ...prev, manufacturers: prev.manufacturers.filter((x) => x !== m) }))
    }
  }

  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-off-white'} py-8`}>
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <FiltersSidebar
              filters={filters}
              options={filterOptions}
              onChange={handleFiltersChange}
            />

            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  onSearch={() => {}}
                />
              </div>
              <div ref={resultsRef} className="flex flex-col gap-5 pt-5 border-t border-gray">
                {activeTags.length > 0 && (
                  <ActiveFilterTags tags={activeTags} onRemove={handleRemoveTag} onClearAll={handleClearAll} />
                )}
                <ProductGrid products={visibleProducts} />
                {hasMore && (
                  <div className="flex justify-center pt-6">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + LOAD_MORE_SIZE)}
                      className="border border-black bg-white px-8 py-3 font-inter text-base font-semibold text-black hover:bg-off-white transition-colors"
                    >
                      Učitaj još ({filteredProducts.length - visibleCount} preostalo)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
