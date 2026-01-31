// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var CATEGORIES = [
  "Top artikli",
  "Na\u0161a preporuka",
  "Najpopularnije",
  "2cm debljina",
  "Oprema za kupatilo",
  "Top ponuda"
];
var CLASS_OPTIONS = ["Prva klasa", "Druga klasa"];
var COLOR_OPTIONS = ["Bela", "Plava", "Siva", "Braon"];
var PURPOSE_OPTIONS = [
  "Spoljne",
  "Unutra\u0161nje",
  "Kupatilske",
  "Tersane",
  "Podne",
  "Zidne"
];
var MANUFACTURER_OPTIONS = [
  "Cristal Ceramicas",
  "Yurtbay Seramik",
  "Savoia Italia",
  "Castel Vetro",
  "Aglasian Granito"
];
var PRODUCT_TYPE_OPTIONS = [
  { label: "Tile", value: "tile" },
  { label: "Additional product", value: "additional_product" }
];
var CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ label: c, value: c }));
var PURPOSE_OPTION_ITEMS = PURPOSE_OPTIONS.map((p) => ({ label: p, value: p }));
function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images/product-images"
    }
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_INDEXER_TOKEN ?? "",
      stopwordLanguages: ["eng"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  schema: {
    collections: [
      {
        label: "Products",
        name: "products",
        path: "content/products",
        format: "json",
        match: {
          include: "*"
        },
        ui: {
          filename: {
            slugify: (values) => slugify(values?.name ?? "product") || "product"
          }
        },
        defaultItem: () => ({
          type: "tile",
          name: "New product",
          pictures: [],
          dimensions: { width: 0, height: 0, thickness: 0 },
          price: 0,
          categories: [],
          onSale: false,
          class: "Prva klasa",
          color: "Bela",
          purpose: [],
          manufacturer: "Yurtbay Seramik"
        }),
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
            required: true,
            options: [...PRODUCT_TYPE_OPTIONS],
            ui: {
              component: "select",
              description: "Product type: Tile or Additional product"
            }
          },
          {
            type: "object",
            name: "pictures",
            label: "Pictures",
            list: true,
            required: true,
            fields: [
              {
                type: "image",
                name: "src",
                label: "Image",
                required: true
              }
            ],
            ui: {
              itemProps: () => ({ label: "Image" })
            }
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            isTitle: true
          },
          {
            type: "object",
            name: "dimensions",
            label: "Dimensions",
            required: true,
            fields: [
              { type: "number", name: "width", label: "Width", required: true },
              { type: "number", name: "height", label: "Height", required: true },
              { type: "number", name: "thickness", label: "Thickness", required: true }
            ]
          },
          {
            type: "number",
            name: "price",
            label: "Price",
            required: true
          },
          {
            type: "number",
            name: "oldPrice",
            label: "Old price (when on sale)"
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            required: true,
            options: CATEGORY_OPTIONS,
            ui: {
              description: "Select one or more categories"
            }
          },
          {
            type: "boolean",
            name: "onSale",
            label: "On sale",
            ui: {
              component: "toggle"
            }
          },
          {
            type: "string",
            name: "class",
            label: "Class",
            required: true,
            options: [...CLASS_OPTIONS]
          },
          {
            type: "string",
            name: "color",
            label: "Color",
            required: true,
            options: [...COLOR_OPTIONS]
          },
          {
            type: "string",
            name: "purpose",
            label: "Purpose",
            list: true,
            required: true,
            options: PURPOSE_OPTION_ITEMS,
            ui: {
              description: "Select one or more purposes"
            }
          },
          {
            type: "string",
            name: "manufacturer",
            label: "Manufacturer",
            required: true,
            options: [...MANUFACTURER_OPTIONS]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
