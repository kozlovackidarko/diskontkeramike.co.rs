const fs = require('fs')
const path = require('path')

function slugify(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function toRef(type, name) {
  if (!name || typeof name !== 'string') return null
  return `product-options/${type}-${slugify(name)}`
}

const productsDir = path.join(__dirname, '..', 'content', 'products')
const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'))

for (const file of files) {
  const filePath = path.join(productsDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  if (data.class && typeof data.class === 'string') data.class = toRef('class', data.class)
  if (data.manufacturer && typeof data.manufacturer === 'string') data.manufacturer = toRef('manufacturer', data.manufacturer)
  if (data.tile_type && typeof data.tile_type === 'string') data.tile_type = toRef('tile_type', data.tile_type)
  if (data.final_polish && typeof data.final_polish === 'string') data.final_polish = toRef('final_polish', data.final_polish)
  if (Array.isArray(data.categories)) data.categories = data.categories.map((c) => toRef('categories', c)).filter(Boolean)
  if (Array.isArray(data.purpose)) data.purpose = data.purpose.map((p) => toRef('purpose', p)).filter(Boolean)
  if (data.color) {
    const arr = Array.isArray(data.color) ? data.color : [data.color]
    data.color = arr.map((c) => (typeof c === 'string' ? toRef('color', c) : null)).filter(Boolean)
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

console.log('Migrated', files.length, 'product files')
