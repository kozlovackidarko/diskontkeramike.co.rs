import Image from 'next/image'
import { assetUrl } from '@/lib/assetUrl'

const PARTNERS = [
  { name: 'Crystal Ceramicas', image: '/images/partners-cristal-ceramicas.jpg', href: 'https://cristalceramicas.com/en/' },
  { name: 'Yurtbay Seramik', image: '/images/partners-yurtbay-seramik.jpg', href: 'https://www.yurtbayseramik.com/en' },
  { name: 'Savoia Italia', image: '/images/partners-savoia-italia.jpg', href: 'https://www.savoiaitalia.com/' },
  { name: 'Castelvetro', image: '/images/partners-castel-vetro.jpg', href: 'https://www.castelvetro.it/' },
  { name: 'AGL Asian Granito', image: '/images/partners-aglasian-granito.png', href: 'https://aglasiangranito.com/' },
  { name: 'Altin Ciniseramik', image: '/images/partners-altin-ciniseramik.png', href: 'https://www.altincini.com.tr/' },
]

export default function PartnersSection() {
  return (
    <section className="bg-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-8">
            Naši partneri
          </h2>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {PARTNERS.slice(0, 3).map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex-1 min-w-0 shrink-0 h-[375px] overflow-hidden group block min-h-[240px]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={assetUrl(partner.image)}
                      alt={partner.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute top-0 right-0 bg-orange text-white px-5 py-3 font-inter text-[15px] font-semibold z-10 after:absolute after:top-full after:left-[-10px] after:right-0 after:h-[10px] after:bg-white before:absolute before:top-0 before:right-full before:bottom-0 before:w-[10px] before:bg-white pointer-events-none">
                    Pročitajte više
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 font-montserrat font-bold text-white text-lg sm:text-xl z-10">
                    {partner.name}
                  </h3>
                </a>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {PARTNERS.slice(3, 6).map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex-1 min-w-0 shrink-0 h-[375px] overflow-hidden group block min-h-[240px]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={assetUrl(partner.image)}
                      alt={partner.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute top-0 right-0 bg-orange text-white px-5 py-3 font-inter text-[15px] font-semibold z-10 after:absolute after:top-full after:left-[-10px] after:right-0 after:h-[10px] after:bg-white before:absolute before:top-0 before:right-full before:bottom-0 before:w-[10px] before:bg-white pointer-events-none">
                    Pročitajte više
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 font-montserrat font-bold text-white text-lg sm:text-xl z-10">
                    {partner.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
