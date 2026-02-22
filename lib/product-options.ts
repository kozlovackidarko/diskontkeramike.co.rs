import optionsData from '@/data/product-options.json'

export interface CategoryItem {
  slug: string
  name: string
}

const data = optionsData as {
  categories: CategoryItem[]
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
  tileTypes: string[]
  finalPolishes: string[]
}

export const CATEGORIES = data.categories
export const CLASSES = data.classes
export const COLORS = data.colors
export const PURPOSES = data.purposes
export const MANUFACTURERS = data.manufacturers
export const TILE_TYPES = data.tileTypes
export const FINAL_POLISHES = data.finalPolishes

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name)
export const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ label: c.name, value: c.name }))
export const CLASS_OPTIONS = CLASSES.map((c) => ({ label: c, value: c }))
export const COLOR_OPTIONS = COLORS.map((c) => ({ label: c, value: c }))
export const PURPOSE_OPTIONS = PURPOSES.map((p) => ({ label: p, value: p }))
export const MANUFACTURER_OPTIONS = MANUFACTURERS.map((m) => ({ label: m, value: m }))
export const TILE_TYPE_OPTIONS = TILE_TYPES.map((t) => ({ label: t, value: t }))
export const FINAL_POLISH_OPTIONS = FINAL_POLISHES.map((f) => ({ label: f, value: f }))

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug)
}

export function getCategoryLinks(): { label: string; href: string }[] {
  return CATEGORIES.map((c) => ({ label: c.name, href: `/kategorija/${c.slug}` }))
}
