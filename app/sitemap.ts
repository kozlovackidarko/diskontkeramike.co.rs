import type { MetadataRoute } from 'next'
import { getCategorySlugs } from '@/lib/product-options'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/svi-proizvodi/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/kontakt/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/o-nama/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/partneri/`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const categoryPages: MetadataRoute.Sitemap = getCategorySlugs().map((slug) => ({
    url: `${SITE_URL}/kategorija/${slug}/`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages]
}
