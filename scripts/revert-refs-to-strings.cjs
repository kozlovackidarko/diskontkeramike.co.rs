const fs = require('fs')
const path = require('path')

const optionsDir = path.join(__dirname, '..', 'content', 'product-options')
const productsDir = path.join(__dirname, '..', 'content', 'products')

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
  if (Array.isArray(data.categories))
    data.categories = data.categories.map((r) => (refToName[r] != null ? refToName[r] : r)).filter((c) => typeof c === 'string')
  if (Array.isArray(data.color))
    data.color = data.color.map((r) => (refToName[r] != null ? refToName[r] : r)).filter((c) => typeof c === 'string')
  if (Array.isArray(data.purpose))
    data.purpose = data.purpose.map((r) => (refToName[r] != null ? refToName[r] : r)).filter((c) => typeof c === 'string')
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

console.log('Reverted categories, color, purpose to strings in', productFiles.length, 'product files')
