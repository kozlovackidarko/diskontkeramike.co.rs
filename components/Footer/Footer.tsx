const COMPANY = {
  name: 'Gile Promet d.o.o.',
  address: 'Bulevar Oslobođenja 23, Beograd',
  pib: '2615120161616',
  phone: '+381695662009',
  phoneDisplay: '069/56-62-009',
  email: 'kozlovacki.darko@gmail.com',
}

const USEFUL_LINKS_LEFT = [
  { label: 'Naša preporuka', href: '/nasa-preporuka' },
  { label: 'Partneri', href: '/partneri' },
  { label: 'O nama', href: '/o-nama' },
  { label: 'Kontaktirajte nas', href: '/kontakt' },
]

const USEFUL_LINKS_RIGHT = [
  { label: 'Svi proizvodi', href: '/svi-proizvodi' },
  { label: 'Top ponuda', href: '/top-ponuda' },
  { label: 'Top artikli', href: '/top-artikli' },
  { label: 'Najpopularnije', href: '/najpopularnije' },
]

export default function Footer() {
  return (
    <footer className="bg-blue text-white">
      <div className="px-4 sm:px-8 py-10 md:py-12 lg:py-14">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            <div className="flex-1 min-w-0">
              <h3 className="font-montserrat font-semibold text-lg xs:text-xl mb-8">
                Podaci firme
              </h3>
              <ul className="font-inter text-sm xs:text-base leading-relaxed space-y-4">
                <li>Ime: <span className="font-semibold">{COMPANY.name}</span></li>
                <li>Adresa: <span className="font-semibold">{COMPANY.address}</span></li>
                <li>PIB: <span className="font-semibold">{COMPANY.pib}</span></li>
                <li>
                  Kontakt telefon:{' '}
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="font-semibold underline hover:opacity-90 transition-opacity"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                </li>
                <li>
                  Email:{' '}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-semibold underline hover:opacity-90 transition-opacity"
                  >
                    {COMPANY.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="font-montserrat font-semibold text-lg xs:text-xl mb-8">
                Korisno
              </h3>
              <div className="flex gap-16 xs:gap-32 md:gap-16 lg:gap-32">
                <ul className="font-inter text-sm xs:text-base space-y-2">
                  {USEFUL_LINKS_LEFT.map((link) => (
                    <li key={link.label} className="py-3">
                      <a
                        href={link.href}
                        className="underline hover:opacity-90 transition-opacity py-3"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="font-inter text-sm xs:text-base space-y-2">
                  {USEFUL_LINKS_RIGHT.map((link) => (
                    <li key={link.label} className="py-3">
                      <a
                        href={link.href}
                        className="underline hover:opacity-90 transition-opacity py-3"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="font-inter text-[12px] xs:text-sm text-center py-4 px-4">
          © Copyright 2025 | Diskont Keramike - Gile Promet d.o.o.
        </p>
      </div>
    </footer>
  )
}
