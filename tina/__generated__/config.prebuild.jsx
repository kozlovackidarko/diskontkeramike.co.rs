// tina/config.ts
import { config as loadEnv } from "dotenv";
import { defineConfig } from "tinacms";
loadEnv();
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
        path: "content",
        format: "json",
        match: {
          include: "products"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "products",
            label: "Products",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name ?? "Product" })
            },
            fields: [
              {
                type: "string",
                name: "type",
                label: "Type",
                list: true,
                required: true,
                options: ["tile", "additional_product"],
                ui: {
                  component: "tags"
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
                required: true
              },
              {
                type: "object",
                name: "dimensions",
                label: "Dimensions",
                fields: [
                  { type: "number", name: "width", label: "Width" },
                  { type: "number", name: "height", label: "Height" },
                  { type: "number", name: "thickness", label: "Thickness" }
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
                options: [...CATEGORIES],
                ui: {
                  component: "tags"
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
                options: [...CLASS_OPTIONS]
              },
              {
                type: "string",
                name: "color",
                label: "Color",
                options: [...COLOR_OPTIONS]
              },
              {
                type: "string",
                name: "purpose",
                label: "Purpose",
                list: true,
                options: [...PURPOSE_OPTIONS],
                ui: {
                  component: "tags"
                }
              },
              {
                type: "string",
                name: "manufacturer",
                label: "Manufacturer",
                options: [...MANUFACTURER_OPTIONS]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
