'use client'

export interface FilterTag {
  id: string
  label: string
}

interface ActiveFilterTagsProps {
  tags: FilterTag[]
  onRemove: (id: string) => void
  onClearAll: () => void
}

export default function ActiveFilterTags({ tags, onRemove, onClearAll }: ActiveFilterTagsProps) {
  if (tags.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="group inline-flex items-center gap-1.5 bg-blue px-2 py-1 pr-8 font-inter text-sm text-white relative"
        >
          #{tag.label}
          <button
            type="button"
            onClick={() => onRemove(tag.id)}
            className="absolute right-0 top-0 px-2 py-1 transition-colors focus-visible:bg-red group-hover:bg-red hover:bg-red"
            aria-label={`Ukloni filter ${tag.label}`}
          >
            <span aria-hidden="true">×</span>
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="font-inter text-sm text-black underline hover:text-red transition-colors"
        aria-label="Ukloni sve filtere"
      >
        Obriši sve
      </button>
    </div>
  )
}
