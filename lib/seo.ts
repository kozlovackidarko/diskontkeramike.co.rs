import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://diskontkeramike.co.rs'

export const SITE_NAME = 'Diskont Keramike'

export const DEFAULT_DESCRIPTION =
  'Diskont Keramike u Beogradu — veliki izbor keramičkih pločica po najboljim cenama. Uvoz iz Italije, Španije i Turske. Posetite nas ili pogledajte ponudu online.'

export const DEFAULT_OG_IMAGE = '/images/hero-tiles.png'

export const COMPANY = {
  legalName: 'Gille Promet d.o.o.',
  brandName: 'Diskont Keramike',
  streetAddress: 'Bulevar Oslobođenja 23',
  addressLocality: 'Beograd',
  addressCountry: 'RS',
  postalCode: '11000',
  phone: '+381695662009',
  phoneDisplay: '069/56-62-009',
  email: 'kozlovacki.darko@gmail.com',
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'sr_RS',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  'nasa-preporuka': {
    title: 'Naša preporuka',
    description:
      'Pogledajte našu preporuku keramičkih pločica — pažljivo odabrani modeli po povoljnim cenama. Diskont Keramike, Beograd.',
  },
  '2cm-debljina': {
    title: '2cm debljina',
    description:
      'Keramičke pločice debljine 2 cm za terase, spoljne prostore i zahtevnije projekte. Veliki izbor u Diskontu Keramike.',
  },
  'top-ponuda': {
    title: 'Top ponuda',
    description:
      'Top ponuda keramičkih pločica po sniženim cenama. Akcijski artikli i najbolje cene u Diskontu Keramike, Beograd.',
  },
  protivklizna: {
    title: 'Protivklizna (anti-slip)',
    description:
      'Protivklizne keramičke pločice za kupatila, terase i spoljne površine. Bezbednost i kvalitet po diskont cenama.',
  },
  najpopularnije: {
    title: 'Najpopularnije',
    description:
      'Najpopularnije keramičke pločice koje naši kupci najčešće biraju. Pogledajte aktuelnu ponudu u Diskontu Keramike.',
  },
  rasprodaja: {
    title: 'Rasprodaja',
    description:
      'Rasprodaja keramičkih pločica — snižene cene i poslednji komadi. Iskoristite povoljnu ponudu u Diskontu Keramike.',
  },
}

export function getCategoryMetadata(slug: string, categoryName: string): Metadata {
  const seo = CATEGORY_SEO[slug] ?? {
    title: categoryName,
    description: `${categoryName} — keramičke pločice u Diskontu Keramike, Beograd. Pogledajte aktuelnu ponudu i cene.`,
  }
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/kategorija/${slug}/`,
  })
}

export const PAGE_SEO = {
  home: {
    ...pageMetadata({
      title: 'Keramičke pločice Beograd',
      description: DEFAULT_DESCRIPTION,
      path: '/',
    }),
    title: { absolute: 'Keramičke pločice Beograd — Diskont Keramike' },
  },
  products: pageMetadata({
    title: 'Svi proizvodi',
    description:
      'Pregledajte kompletan katalog keramičkih pločica u Diskontu Keramike. Filtrirajte po dimenzijama, boji, proizvođaču i ceni.',
    path: '/svi-proizvodi/',
  }),
  contact: pageMetadata({
    title: 'Kontakt',
    description:
      'Kontaktirajte Diskont Keramike — adresa, telefon i email. Bulevar Oslobođenja 23, Beograd. Pozovite nas ili pošaljite poruku.',
    path: '/kontakt/',
  }),
  about: pageMetadata({
    title: 'O nama',
    description:
      'Saznajte više o Diskontu Keramike i Gille Promet d.o.o. — više od dve decenije kvalitetnih pločica po najboljim cenama u Beogradu.',
    path: '/o-nama/',
  }),
  partners: pageMetadata({
    title: 'Partneri',
    description:
      'Naši partneri i proizvođači keramičkih pločica — Crystal Ceramicas, Yurtbay Seramik, Savoia Italia i drugi renomirani brendovi.',
    path: '/partneri/',
  }),
  categoriesIndex: pageMetadata({
    title: 'Kategorije',
    description: 'Pregled svih kategorija keramičkih pločica u Diskontu Keramike.',
    path: '/kategorije/',
    noIndex: true,
  }),
}
