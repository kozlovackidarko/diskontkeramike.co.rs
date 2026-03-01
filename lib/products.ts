export interface Product {
  type: string[]
  pictures: string[]
  name: string
  dimensions: { width: number; height: number; thickness?: number }
  price: number
  categories: string[]
  onSale: boolean
  class: string
  color: string[]
  purpose: string[]
  manufacturer: string
  oldPrice?: number
  tile_type?: string
  final_polish?: string
}

import {
  CATEGORY_NAMES,
  CLASSES,
  COLORS,
  PURPOSES,
  MANUFACTURERS,
  TILE_TYPES,
  FINAL_POLISHES,
} from '@/lib/product-options'

export interface FilterState {
  categories: string[]
  priceMin: number | null
  priceMax: number | null
  dimensions: string[]
  tile_types: string[]
  final_polishes: string[]
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
}

export interface FilterOptions {
  categories: string[]
  priceSteps: number[]
  dimensionPairings: string[]
  tileTypes: string[]
  finalPolishes: string[]
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
}

export function normalizeProductImage(picturePath: string): string {
  const basename = picturePath.replace(/^.*\//, '')
  return `/images/product-images/${basename}`
}

/** Filters to only products that are active (shown on the website). Missing active = true. */
export function filterActiveProducts<T extends { active?: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.active !== false)
}

function refToName(v: string | { name?: string } | null | undefined): string {
  if (v == null) return ''
  return typeof v === 'string' ? v : (v?.name ?? '')
}

function refsToNames(arr: (string | { name?: string })[] | null | undefined): string[] {
  if (arr == null || !Array.isArray(arr)) return []
  return arr.map(refToName).filter(Boolean)
}

/** Tina/content shape: pictures can be { src } objects or string paths; refs can be resolved { name } or legacy string */
export function mapContentProductsToProducts(
  items: Array<{
    type: string | string[]
    pictures: Array<{ src?: string } | string>
    name: string
    dimensions?: { width: number; height: number; thickness?: number }
    price: number
    oldPrice?: number
    categories?: (string | { name?: string })[]
    onSale: boolean
    class?: string | { name?: string } | null
    color?: (string | { name?: string })[] | string | null
    purpose?: (string | { name?: string })[]
    manufacturer?: string | { name?: string } | null
    tile_type?: string | { name?: string } | null
    final_polish?: string | { name?: string } | null
    active?: boolean
  }>
): Product[] {
  return items
    .filter((p): p is typeof p & { dimensions: { width: number; height: number } } =>
      p.dimensions != null && typeof p.dimensions.width === 'number' && typeof p.dimensions.height === 'number'
    )
    .map((p) => ({
      type: Array.isArray(p.type) ? p.type : (p.type ? [p.type] : []),
      pictures: (p.pictures ?? []).map((pic) => (typeof pic === 'string' ? pic : pic?.src ?? '')),
      name: p.name,
      dimensions: {
        width: p.dimensions.width,
        height: p.dimensions.height,
        ...(typeof p.dimensions.thickness === 'number' && { thickness: p.dimensions.thickness }),
      },
      price: p.price,
      oldPrice: p.oldPrice,
      categories: refsToNames(p.categories),
      onSale: p.onSale,
      class: refToName(p.class),
      color: Array.isArray(p.color) ? refsToNames(p.color) : (p.color ? [refToName(p.color)] : []),
      purpose: refsToNames(p.purpose),
      manufacturer: refToName(p.manufacturer),
      tile_type: refToName(p.tile_type) || undefined,
      final_polish: refToName(p.final_polish) || undefined,
    }))
}

export function normalizeProducts(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    pictures: p.pictures.map(normalizeProductImage),
  }))
}

function orderByConfig<T>(fromProducts: T[], configOrder: readonly T[]): T[] {
  const set = new Set(fromProducts)
  return configOrder.filter((c) => set.has(c)).concat([...set].filter((c) => !configOrder.includes(c)).sort())
}

function notRefPath(s: string): boolean {
  return typeof s === 'string' && !s.startsWith('product-options/')
}

export function getFilterOptions(products: Product[]): FilterOptions {
  const allCategories = Array.from(new Set(products.flatMap((p) => p.categories)))
  const categories = orderByConfig(
    allCategories.filter((c) => notRefPath(c) && CATEGORY_NAMES.includes(c)),
    CATEGORY_NAMES
  )
  const maxPrice = Math.max(...products.map((p) => p.price))
  const priceSteps = [500, 1000, 1500, 2000, 2500, 3000, 5000].filter((s) => s <= maxPrice + 500)

  const pairings = Array.from(
    new Set(products.map((p) => `${p.dimensions.width}x${p.dimensions.height}`))
  )
    .filter((p) => {
      const [w, h] = p.split('x').map(Number)
      return w > 0 && h > 0
    })
    .sort((a, b) => {
      const [aw, ah] = a.split('x').map(Number)
      const [bw, bh] = b.split('x').map(Number)
      return aw !== bw ? aw - bw : ah - bh
    })

  return {
    categories,
    priceSteps: [0, ...priceSteps],
    dimensionPairings: pairings,
    tileTypes: orderByConfig(
      Array.from(new Set(products.map((p) => p.tile_type).filter((t): t is string => !!t && notRefPath(t)))),
      TILE_TYPES
    ),
    finalPolishes: orderByConfig(
      Array.from(new Set(products.map((p) => p.final_polish).filter((f): f is string => !!f && notRefPath(f)))),
      FINAL_POLISHES
    ),
    classes: orderByConfig(
      Array.from(new Set(products.map((p) => p.class).filter(notRefPath))),
      CLASSES
    ),
    colors: orderByConfig(
      Array.from(new Set(products.flatMap((p) => p.color).filter(notRefPath))),
      COLORS
    ),
    purposes: orderByConfig(
      Array.from(new Set(products.flatMap((p) => p.purpose).filter(notRefPath))),
      PURPOSES
    ),
    manufacturers: orderByConfig(
      Array.from(new Set(products.map((p) => p.manufacturer).filter(notRefPath))),
      MANUFACTURERS
    ),
  }
}

export function filterProducts(
  products: Product[],
  filters: FilterState,
  search: string
): Product[] {
  const q = search.trim().toLowerCase()
  return products.filter((p) => {
    if (q) {
      const searchStr = [p.name, p.color.join(' '), p.manufacturer, `${p.dimensions.width}x${p.dimensions.height}`].join(' ').toLowerCase()
      if (!searchStr.includes(q)) return false
    }
    if (filters.categories.length > 0) {
      const matchesCategory = (c: string) =>
        c === 'Top ponuda'
          ? p.categories.includes('Top ponuda') || p.onSale
          : p.categories.includes(c)
      if (!filters.categories.some(matchesCategory)) return false
    }
    if (filters.priceMin != null && p.price < filters.priceMin) return false
    if (filters.priceMax != null && p.price > filters.priceMax) return false
    const dimKey = `${p.dimensions.width}x${p.dimensions.height}`
    if (filters.dimensions.length > 0 && !filters.dimensions.includes(dimKey)) return false
    if (filters.tile_types.length > 0 && (!p.tile_type || !filters.tile_types.includes(p.tile_type))) return false
    if (filters.final_polishes.length > 0 && (!p.final_polish || !filters.final_polishes.includes(p.final_polish))) return false
    if (filters.classes.length > 0 && !filters.classes.includes(p.class)) return false
    if (filters.colors.length > 0 && !p.color.some((c) => filters.colors.includes(c))) return false
    if (filters.purposes.length > 0 && !p.purpose.some((purp) => filters.purposes.includes(purp))) return false
    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(p.manufacturer)) return false
    return true
  })
}

export function getInitialFilterState(): FilterState {
  return {
    categories: [],
    priceMin: null,
    priceMax: null,
    dimensions: [],
    tile_types: [],
    final_polishes: [],
    classes: [],
    colors: [],
    purposes: [],
    manufacturers: [],
  }
}
