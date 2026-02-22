const fs = require('fs')
const path = require('path')

const productsDir = path.join(__dirname, '..', 'content', 'products')
const files = fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'))

for (const file of files) {
  const filePath = path.join(productsDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  if (data.active !== undefined) continue
  const isAgIconWhite = data.name === 'AG Icon White'
  const next = { active: !isAgIconWhite, ...data }
  fs.writeFileSync(filePath, JSON.stringify(next, null, 2) + '\n')
}

console.log('Added active field to', files.length, 'product files (AG Icon White = false, rest = true)')
