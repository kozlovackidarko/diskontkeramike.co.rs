import { COMPANY, SITE_NAME, SITE_URL } from '@/lib/seo'

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-tiles.png`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.addressCountry,
    },
    areaServed: {
      '@type': 'City',
      name: 'Beograd',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
