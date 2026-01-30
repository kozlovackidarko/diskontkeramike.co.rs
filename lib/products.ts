export interface Product {
  type: string[]
  pictures: string[]
  name: string
  dimensions: { width: number; height: number; thickness: number }
  price: number
  categories: string[]
  onSale: boolean
  class: string
  color: string
  purpose: string[]
  manufacturer: string
  oldPrice?: number
}

export interface FilterState {
  categories: string[]
  priceMin: number | null
  priceMax: number | null
  width: number | null
  height: number | null
  thickness: number | null
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
}

export interface FilterOptions {
  categories: string[]
  priceSteps: number[]
  widths: number[]
  heights: number[]
  thicknesses: number[]
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
}

export function normalizeProductImage(picturePath: string): string {
  const basename = picturePath.replace(/^.*\//, '')
  return `/images/product-images/${basename}`
}

export function normalizeProducts(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    pictures: p.pictures.map(normalizeProductImage),
  }))
}

export function getFilterOptions(products: Product[]): FilterOptions {
  const categories = Array.from(
    new Set(products.flatMap((p) => p.categories))
  ).sort()
  const maxPrice = Math.max(...products.map((p) => p.price))
  const priceSteps = [500, 1000, 1500, 2000, 2500, 3000, 5000].filter((s) => s <= maxPrice + 500)

  return {
    categories,
    priceSteps: [0, ...priceSteps],
    widths: Array.from(new Set(products.map((p) => p.dimensions.width))).sort((a, b) => a - b),
    heights: Array.from(new Set(products.map((p) => p.dimensions.height))).sort((a, b) => a - b),
    thicknesses: Array.from(new Set(products.map((p) => p.dimensions.thickness))).sort((a, b) => a - b),
    classes: Array.from(new Set(products.map((p) => p.class))).sort(),
    colors: Array.from(new Set(products.map((p) => p.color))).sort(),
    purposes: Array.from(new Set(products.flatMap((p) => p.purpose))).sort(),
    manufacturers: Array.from(new Set(products.map((p) => p.manufacturer))).sort(),
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
      const searchStr = [p.name, p.color, p.manufacturer, `${p.dimensions.width}x${p.dimensions.height}`].join(' ').toLowerCase()
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
    if (filters.width != null && p.dimensions.width !== filters.width) return false
    if (filters.height != null && p.dimensions.height !== filters.height) return false
    if (filters.thickness != null && p.dimensions.thickness !== filters.thickness) return false
    if (filters.classes.length > 0 && !filters.classes.includes(p.class)) return false
    if (filters.colors.length > 0 && !filters.colors.includes(p.color)) return false
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
    width: null,
    height: null,
    thickness: null,
    classes: [],
    colors: [],
    purposes: [],
    manufacturers: [],
  }
}
