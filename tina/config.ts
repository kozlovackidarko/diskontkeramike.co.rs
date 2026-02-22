import { defineConfig } from 'tinacms'
import optionsData from '../data/product-options.json'

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

const options = optionsData as {
  categories: Array<{ slug: string; name: string }>
  classes: string[]
  colors: string[]
  purposes: string[]
  manufacturers: string[]
  tileTypes: string[]
  finalPolishes: string[]
}

const CATEGORY_OPTIONS = options.categories.map((c) => ({ label: c.name, value: c.name }))
const CLASS_OPTIONS = options.classes.map((c) => ({ label: c, value: c }))
const COLOR_OPTIONS = options.colors.map((c) => ({ label: c, value: c }))
const PURPOSE_OPTIONS = options.purposes.map((p) => ({ label: p, value: p }))
const MANUFACTURER_OPTIONS = options.manufacturers.map((m) => ({ label: m, value: m }))
const TILE_TYPE_OPTIONS = options.tileTypes.map((t) => ({ label: t, value: t }))
const FINAL_POLISH_OPTIONS = options.finalPolishes.map((f) => ({ label: f, value: f }))

const PRODUCT_TYPE_OPTIONS = [
  { label: 'Tile', value: 'tile' },
  { label: 'Additional product', value: 'additional_product' },
] as const

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'images/product-images',
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_INDEXER_TOKEN ?? '',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
    collections: [
      {
        label: 'Products',
        name: 'products',
        path: 'content/products',
        format: 'json',
        match: { include: '*' },
        ui: {
          filename: {
            slugify: (values) => slugify((values?.name as string) ?? 'product') || 'product',
          },
        },
        defaultItem: () => ({
          type: 'tile',
          name: 'New product',
          active: true,
          pictures: [],
          dimensions: { width: 0, height: 0 },
          price: 0,
          categories: [],
          onSale: false,
          class: options.classes[0] ?? 'Prva klasa',
          color: [],
          purpose: [],
          manufacturer: options.manufacturers[0] ?? 'Yurtbay Seramik',
        }),
        fields: [
          {
            type: 'boolean',
            name: 'active',
            label: 'Aktivan proizvod',
            ui: {
              component: 'toggle',
              description: 'Prikazan na sajtu ako je ukljuceno.',
            },
          },
          {
            type: 'string',
            name: 'type',
            label: 'Tip proizvoda',
            required: true,
            options: [...PRODUCT_TYPE_OPTIONS],
            ui: {
              component: 'select',
              description: 'Tip proizvoda: Plocica ili Dodatni proizvod',
            },
          },
          {
            type: 'object',
            name: 'pictures',
            label: 'Slike proizvoda',
            list: true,
            required: true,
            fields: [
              { type: 'image', name: 'src', label: 'Slika', required: true },
            ],
            ui: { itemProps: () => ({ label: 'Slika' }) },
          },
          {
            type: 'string',
            name: 'name',
            label: 'Ime proizvoda',
            required: true,
            isTitle: true,
          },
          {
            type: 'object',
            name: 'dimensions',
            label: 'Dimenzije',
            required: true,
            fields: [
              { type: 'number', name: 'width', label: 'Širina', required: true },
              { type: 'number', name: 'height', label: 'Dužina', required: true },
              {
                type: 'number',
                name: 'thickness',
                label: 'Debljina',
                required: false,
                ui: { description: 'Samo za dodatne proizvode; izostavite za plocice.' },
              },
            ],
          },
          {
            type: 'string',
            name: 'tile_type',
            label: 'Tip plocice',
            options: [...TILE_TYPE_OPTIONS],
            ui: { component: 'select', description: 'Samo za plocice.' },
          },
          {
            type: 'string',
            name: 'final_polish',
            label: 'Zavrsna obrada',
            options: [...FINAL_POLISH_OPTIONS],
            ui: { component: 'select', description: 'Samo za plocice.' },
          },
          {
            type: 'number',
            name: 'price',
            label: 'Cena',
            required: true,
          },
          {
            type: 'number',
            name: 'oldPrice',
            label: 'Stara cena (kada je na popustu)',
          },
          {
            type: 'string',
            name: 'categories',
            label: 'Kategorija',
            list: true,
            required: false,
            options: [...CATEGORY_OPTIONS],
            ui: { description: 'Izaberi nijednu, jednu ili više kategorija' },
          },
          {
            type: 'boolean',
            name: 'onSale',
            label: 'On sale',
            ui: { component: 'toggle' },
          },
          {
            type: 'string',
            name: 'class',
            label: 'Klasa',
            required: true,
            options: [...CLASS_OPTIONS],
          },
          {
            type: 'string',
            name: 'color',
            label: 'Boja',
            list: true,
            required: true,
            options: [...COLOR_OPTIONS],
            ui: { description: 'Izaberi jednu ili više boja' },
          },
          {
            type: 'string',
            name: 'purpose',
            label: 'Namena',
            list: true,
            required: true,
            options: [...PURPOSE_OPTIONS],
            ui: { description: 'Izaberi jednu ili više namena' },
          },
          {
            type: 'string',
            name: 'manufacturer',
            label: 'Proizvođač',
            required: true,
            options: [...MANUFACTURER_OPTIONS],
          },
        ],
      },
    ],
  },
})
