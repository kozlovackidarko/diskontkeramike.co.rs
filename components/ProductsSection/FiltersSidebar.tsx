'use client'

import { useState } from 'react'
import type { FilterState, FilterOptions } from '@/lib/products'

interface FiltersSidebarProps {
  filters: FilterState
  options: FilterOptions
  onChange: (update: Partial<FilterState>) => void
}

export default function FiltersSidebar({ filters, options, onChange }: FiltersSidebarProps) {
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)

  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onChange({ categories: next })
  }
  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    onChange({ colors: next })
  }
  const toggleManufacturer = (m: string) => {
    const next = filters.manufacturers.includes(m)
      ? filters.manufacturers.filter((x) => x !== m)
      : [...filters.manufacturers, m]
    onChange({ manufacturers: next })
  }
  const toggleClass = (cls: string) => {
    const next = filters.classes.includes(cls)
      ? filters.classes.filter((c) => c !== cls)
      : [...filters.classes, cls]
    onChange({ classes: next })
  }
  const togglePurpose = (purp: string) => {
    const next = filters.purposes.includes(purp)
      ? filters.purposes.filter((p) => p !== purp)
      : [...filters.purposes, purp]
    onChange({ purposes: next })
  }
  const toggleTileType = (t: string) => {
    const next = filters.tile_types.includes(t)
      ? filters.tile_types.filter((x) => x !== t)
      : [...filters.tile_types, t]
    onChange({ tile_types: next })
  }
  const toggleFinalPolish = (f: string) => {
    const next = filters.final_polishes.includes(f)
      ? filters.final_polishes.filter((x) => x !== f)
      : [...filters.final_polishes, f]
    onChange({ final_polishes: next })
  }

  const selectBorder = (value: string | number | null) =>
    (value !== '' && value != null) ? 'border-black' : 'border-gray/20'

  return (
    <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-4 space-y-6">
      {/* Below lg: Cena + Dimenzije in one row; lg: full column */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:block">
        <div className="flex flex-col gap-6 sm:flex-row lg:flex-col">
          <fieldset className="min-w-0 flex-1 space-y-3 lg:flex-none">
            <legend className="font-montserrat font-bold text-black text-base">Cena</legend>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[15px] text-black">
                Cena od (RSD)
                <select
                  value={filters.priceMin ?? ''}
                  onChange={(e) => onChange({ priceMin: e.target.value === '' ? null : Number(e.target.value) })}
                  className={`mt-1 block w-full border bg-white px-3 py-2 font-inter text-[15px] text-black focus:outline-none focus:ring-2 ${selectBorder(filters.priceMin ?? '')}`}
                >
                  <option value="">Bilo koja</option>
                  {options.priceSteps.filter((s) => s > 0).map((s) => (
                    <option key={s} value={s}>{s} din</option>
                  ))}
                </select>
              </label>
              <label className="font-inter text-[15px] text-black">
                Do (RSD)
                <select
                  value={filters.priceMax ?? ''}
                  onChange={(e) => onChange({ priceMax: e.target.value === '' ? null : Number(e.target.value) })}
                  className={`mt-1 block w-full border bg-white px-3 py-2 font-inter text-[15px] text-black focus:outline-none focus:ring-2 ${selectBorder(filters.priceMax ?? '')}`}
                >
                  <option value="">Bilo koja</option>
                  {options.priceSteps.filter((s) => s > 0).map((s) => (
                    <option key={s} value={s}>Do {s} dinara</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset className="min-w-0 flex-1 space-y-3 lg:flex-none">
            <legend className="font-montserrat font-bold text-black text-base">Dimenzije</legend>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[15px] text-black">
                Širina (cm)
                <select
                  value={filters.width ?? ''}
                  onChange={(e) => onChange({ width: e.target.value === '' ? null : Number(e.target.value) })}
                  className={`mt-1 block w-full border bg-white px-3 py-2 font-inter text-[15px] text-black focus:outline-none focus:ring-2 ${selectBorder(filters.width ?? '')}`}
                >
                  <option value="">Bilo koja</option>
                  {options.widths.map((w) => (
                    <option key={w} value={w}>{w}cm</option>
                  ))}
                </select>
              </label>
              <label className="font-inter text-[15px] text-black">
                Dužina (cm)
                <select
                  value={filters.height ?? ''}
                  onChange={(e) => onChange({ height: e.target.value === '' ? null : Number(e.target.value) })}
                  className={`mt-1 block w-full border bg-white px-3 py-2 font-inter text-[15px] text-black focus:outline-none focus:ring-2 ${selectBorder(filters.height ?? '')}`}
                >
                  <option value="">Bilo koja</option>
                  {options.heights.map((h) => (
                    <option key={h} value={h}>{h}cm</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
        </div>
        <button
          type="button"
          onClick={() => setMoreFiltersOpen((o) => !o)}
          className="lg:hidden w-full border border-gray/40 bg-white px-4 py-2.5 font-inter text-[15px] font-semibold text-black hover:bg-off-white transition-colors"
          aria-expanded={moreFiltersOpen}
          aria-controls="more-filters"
        >
          {moreFiltersOpen ? 'Manje filtera' : 'Više filtera'}
        </button>
      </div>

      <div id="more-filters" className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 ${!moreFiltersOpen ? 'hidden' : ''} lg:grid`}>
      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Kategorije</legend>
        <div className="flex flex-col gap-2">
          {options.categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 border-gray accent-black-check"
              />
              {cat}
            </label>
          ))}
        </div>
      </fieldset>

      {options.tileTypes.length > 0 && (
        <fieldset className="space-y-3 min-w-0">
          <legend className="font-montserrat font-bold text-black text-base">Tip plocice</legend>
          <div className="flex flex-col gap-2">
            {options.tileTypes.map((t) => (
              <label key={t} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.tile_types.includes(t)}
                  onChange={() => toggleTileType(t)}
                  className="h-4 w-4 border-gray accent-black-check"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {options.finalPolishes.length > 0 && (
        <fieldset className="space-y-3 min-w-0">
          <legend className="font-montserrat font-bold text-black text-base">Zavrsna obrada</legend>
          <div className="flex flex-col gap-2">
            {options.finalPolishes.map((f) => (
              <label key={f} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.final_polishes.includes(f)}
                  onChange={() => toggleFinalPolish(f)}
                  className="h-4 w-4 border-gray accent-black-check"
                />
                {f}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Klasa</legend>
        <div className="flex flex-col gap-2">
          {options.classes.map((cls) => (
            <label key={cls} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
              <input
                type="checkbox"
                checked={filters.classes.includes(cls)}
                onChange={() => toggleClass(cls)}
                className="h-4 w-4 border-gray accent-black-check"
              />
              {cls}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Boja</legend>
        <div className="flex flex-col gap-2">
          {options.colors.map((color) => (
            <label key={color} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => toggleColor(color)}
                className="h-4 w-4 border-gray accent-black-check"
              />
              {color}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Namena pločica</legend>
        <div className="flex flex-col gap-2">
          {options.purposes.map((purp) => (
            <label key={purp} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
              <input
                type="checkbox"
                checked={filters.purposes.includes(purp)}
                onChange={() => togglePurpose(purp)}
                className="h-4 w-4 border-gray accent-black-check"
              />
              {purp}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Proizvođač</legend>
        <div className="flex flex-col gap-2">
          {options.manufacturers.map((m) => (
            <label key={m} className="flex items-center gap-2 font-inter text-[15px] text-black cursor-pointer">
              <input
                type="checkbox"
                checked={filters.manufacturers.includes(m)}
                onChange={() => toggleManufacturer(m)}
                className="h-4 w-4 border-gray accent-black-check"
              />
              {m}
            </label>
          ))}
        </div>
      </fieldset>
      </div>
    </aside>
  )
}
