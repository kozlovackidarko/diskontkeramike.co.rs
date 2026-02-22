const fs = require('fs')
const path = require('path')

const optionsDir = path.join(__dirname, '..', 'content', 'product-options')
const productsDir = path.join(__dirname, '..', 'content', 'products')

if (!fs.existsSync(optionsDir)) {
  console.log('product-options folder not found, skipping ref revert')
  process.exit(0)
}

const refToName = {}
const files = fs.readdirSync(optionsDir).filter((f) => f.endsWith('.json'))
for (const file of files) {
  const base = file.replace('.json', '')
  const ref = `product-options/${base}`
  const data = JSON.parse(fs.readFileSync(path.join(optionsDir, file), 'utf8'))
  refToName[ref] = data.name
}

const productFiles = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'))
for (const file of productFiles) {
  const filePath = path.join(productsDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const resolve = (r) => (refToName[r] != null ? refToName[r] : r)
  if (typeof data.class === 'string' && data.class.startsWith('product-options/'))
    data.class = resolve(data.class)
  if (typeof data.manufacturer === 'string' && data.manufacturer.startsWith('product-options/'))
    data.manufacturer = resolve(data.manufacturer)
  if (typeof data.tile_type === 'string' && data.tile_type.startsWith('product-options/'))
    data.tile_type = resolve(data.tile_type)
  if (typeof data.final_polish === 'string' && data.final_polish.startsWith('product-options/'))
    data.final_polish = resolve(data.final_polish)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

console.log('Reverted class, manufacturer, tile_type, final_polish to strings in', productFiles.length, 'files')
