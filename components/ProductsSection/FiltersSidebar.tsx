'use client'

import { useState } from 'react'
import type { FilterState, FilterOptions } from '@/lib/products'

interface FiltersSidebarProps {
  filters: FilterState
  options: FilterOptions
  onChange: (update: Partial<FilterState>) => void
  sectionBg?: 'white' | 'off-white'
}

const INITIAL_VISIBLE = 3
type CheckboxFilterKey = 'categories' | 'tileTypes' | 'finalPolishes' | 'classes' | 'colors' | 'purposes' | 'manufacturers'

const gradientFromClass = { white: 'from-white', 'off-white': 'from-off-white' } as const

export default function FiltersSidebar({ filters, options, onChange, sectionBg = 'off-white' }: FiltersSidebarProps) {
  const fadeFrom = gradientFromClass[sectionBg]
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState<Record<CheckboxFilterKey, boolean>>({
    categories: false,
    tileTypes: false,
    finalPolishes: false,
    classes: false,
    colors: false,
    purposes: false,
    manufacturers: false,
  })

  const setFilterExpanded = (key: CheckboxFilterKey, value: boolean) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: value }))
  }

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
  const toggleDimension = (pairing: string) => {
    const next = filters.dimensions.includes(pairing)
      ? filters.dimensions.filter((d) => d !== pairing)
      : [...filters.dimensions, pairing]
    onChange({ dimensions: next })
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
                Cena do (RSD)
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
            <div className="grid grid-cols-2 gap-2">
              {options.dimensionPairings.map((pairing) => {
                const checked = filters.dimensions.includes(pairing)
                const [w, h] = pairing.split('x')
                const displayLabel = `${w}×${h}`
                return (
                  <label
                    key={pairing}
                    className={`flex cursor-pointer items-center justify-center rounded border-2 px-3 py-2.5 font-inter text-[15px] font-medium text-black transition-colors hover:border-gray has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-1 ${checked ? 'border-black bg-off-white' : 'border-gray/30 bg-white'}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDimension(pairing)}
                      className="sr-only"
                      aria-label={`Dimenzije ${displayLabel} cm`}
                    />
                    <span aria-hidden="true">{displayLabel}</span>
                  </label>
                )
              })}
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
        <div className="relative">
          <div className={`flex flex-col gap-2 ${options.categories.length > INITIAL_VISIBLE && !expandedFilters.categories ? 'h-[6.5rem] overflow-hidden' : ''}`}>
            {(expandedFilters.categories ? options.categories : options.categories.slice(0, INITIAL_VISIBLE)).map((cat) => (
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
          {options.categories.length > INITIAL_VISIBLE && !expandedFilters.categories && (
            <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
              <button
                type="button"
                onClick={() => setFilterExpanded('categories', !expandedFilters.categories)}
                className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži sve
              </button>
            </div>
          )}
          {options.categories.length > INITIAL_VISIBLE && expandedFilters.categories && (
            <button
              type="button"
              onClick={() => setFilterExpanded('categories', false)}
              className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
            >
              Prikaži manje
            </button>
          )}
        </div>
      </fieldset>

      {options.tileTypes.length > 0 && (
        <fieldset className="space-y-3 min-w-0">
          <legend className="font-montserrat font-bold text-black text-base">Tip plocice</legend>
          <div className="relative">
            <div className={`flex flex-col gap-2 ${options.tileTypes.length > INITIAL_VISIBLE && !expandedFilters.tileTypes ? 'h-[6.5rem] overflow-hidden' : ''}`}>
              {(expandedFilters.tileTypes ? options.tileTypes : options.tileTypes.slice(0, INITIAL_VISIBLE)).map((t) => (
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
            {options.tileTypes.length > INITIAL_VISIBLE && !expandedFilters.tileTypes && (
              <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
                <button
                  type="button"
                  onClick={() => setFilterExpanded('tileTypes', !expandedFilters.tileTypes)}
                  className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
                >
                  Prikaži sve
                </button>
              </div>
            )}
            {options.tileTypes.length > INITIAL_VISIBLE && expandedFilters.tileTypes && (
              <button
                type="button"
                onClick={() => setFilterExpanded('tileTypes', false)}
                className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži manje
              </button>
            )}
          </div>
        </fieldset>
      )}

      {options.finalPolishes.length > 0 && (
        <fieldset className="space-y-3 min-w-0">
          <legend className="font-montserrat font-bold text-black text-base">Zavrsna obrada</legend>
          <div className="relative">
            <div className={`flex flex-col gap-2 ${options.finalPolishes.length > INITIAL_VISIBLE && !expandedFilters.finalPolishes ? 'h-[6.5rem] overflow-hidden' : ''}`}>
              {(expandedFilters.finalPolishes ? options.finalPolishes : options.finalPolishes.slice(0, INITIAL_VISIBLE)).map((f) => (
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
            {options.finalPolishes.length > INITIAL_VISIBLE && !expandedFilters.finalPolishes && (
              <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
                <button
                  type="button"
                  onClick={() => setFilterExpanded('finalPolishes', !expandedFilters.finalPolishes)}
                  className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
                >
                  Prikaži sve
                </button>
              </div>
            )}
            {options.finalPolishes.length > INITIAL_VISIBLE && expandedFilters.finalPolishes && (
              <button
                type="button"
                onClick={() => setFilterExpanded('finalPolishes', false)}
                className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži manje
              </button>
            )}
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Klasa</legend>
        <div className="relative">
          <div className={`flex flex-col gap-2 ${options.classes.length > INITIAL_VISIBLE && !expandedFilters.classes ? 'h-[6.5rem] overflow-hidden' : ''}`}>
            {(expandedFilters.classes ? options.classes : options.classes.slice(0, INITIAL_VISIBLE)).map((cls) => (
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
          {options.classes.length > INITIAL_VISIBLE && !expandedFilters.classes && (
            <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
              <button
                type="button"
                onClick={() => setFilterExpanded('classes', !expandedFilters.classes)}
                className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži sve
              </button>
            </div>
          )}
          {options.classes.length > INITIAL_VISIBLE && expandedFilters.classes && (
            <button
              type="button"
              onClick={() => setFilterExpanded('classes', false)}
              className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
            >
              Prikaži manje
            </button>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Boja</legend>
        <div className="relative">
          <div className={`flex flex-col gap-2 ${options.colors.length > INITIAL_VISIBLE && !expandedFilters.colors ? 'h-[6.5rem] overflow-hidden' : ''}`}>
            {(expandedFilters.colors ? options.colors : options.colors.slice(0, INITIAL_VISIBLE)).map((color) => (
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
          {options.colors.length > INITIAL_VISIBLE && !expandedFilters.colors && (
            <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
              <button
                type="button"
                onClick={() => setFilterExpanded('colors', !expandedFilters.colors)}
                className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži sve
              </button>
            </div>
          )}
          {options.colors.length > INITIAL_VISIBLE && expandedFilters.colors && (
            <button
              type="button"
              onClick={() => setFilterExpanded('colors', false)}
              className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
            >
              Prikaži manje
            </button>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Namena pločica</legend>
        <div className="relative">
          <div className={`flex flex-col gap-2 ${options.purposes.length > INITIAL_VISIBLE && !expandedFilters.purposes ? 'h-[6.5rem] overflow-hidden' : ''}`}>
            {(expandedFilters.purposes ? options.purposes : options.purposes.slice(0, INITIAL_VISIBLE)).map((purp) => (
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
          {options.purposes.length > INITIAL_VISIBLE && !expandedFilters.purposes && (
            <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
              <button
                type="button"
                onClick={() => setFilterExpanded('purposes', !expandedFilters.purposes)}
                className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži sve
              </button>
            </div>
          )}
          {options.purposes.length > INITIAL_VISIBLE && expandedFilters.purposes && (
            <button
              type="button"
              onClick={() => setFilterExpanded('purposes', false)}
              className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
            >
              Prikaži manje
            </button>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="font-montserrat font-bold text-black text-base">Proizvođač</legend>
        <div className="relative">
          <div className={`flex flex-col gap-2 ${options.manufacturers.length > INITIAL_VISIBLE && !expandedFilters.manufacturers ? 'h-[6.5rem] overflow-hidden' : ''}`}>
            {(expandedFilters.manufacturers ? options.manufacturers : options.manufacturers.slice(0, INITIAL_VISIBLE)).map((m) => (
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
          {options.manufacturers.length > INITIAL_VISIBLE && !expandedFilters.manufacturers && (
            <div className={`absolute bottom-0 left-0 right-0 pt-6 bg-gradient-to-t ${fadeFrom} to-transparent`}>
              <button
                type="button"
                onClick={() => setFilterExpanded('manufacturers', !expandedFilters.manufacturers)}
                className="font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
              >
                Prikaži sve
              </button>
            </div>
          )}
          {options.manufacturers.length > INITIAL_VISIBLE && expandedFilters.manufacturers && (
            <button
              type="button"
              onClick={() => setFilterExpanded('manufacturers', false)}
              className="mt-1 font-inter text-[14px] text-black underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded"
            >
              Prikaži manje
            </button>
          )}
        </div>
      </fieldset>
      </div>
    </aside>
  )
}
