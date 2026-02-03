const PHONE = '069/56-62-009'
const PHONE_LINK = '+381695662009'
const EMAIL = 'kozlovacki.darko@gmail.com'
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.3430214058226!2d20.475538399999998!3d44.855311199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a64c9320a48cb%3A0xba8fef1b34a48a4c!2sDiskont%20Keramike!5e0!3m2!1ssr!2snl!4v1769982389130!5m2!1ssr!2snl'

export interface ContactInfoProps {
  bg?: 'white' | 'off-white'
}

export default function ContactInfo({ bg = 'white' }: ContactInfoProps) {
  const bgClass = bg === 'off-white' ? 'bg-off-white' : 'bg-white'
  return (
    <section className={`${bgClass} py-8 md:py-16 lg:py-20`}>
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12">
            Kako do nas?
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 min-w-0">
              <h3 className="font-montserrat font-bold text-black text-xl sm:text-2xl mb-4">
                Za sve informacije...
              </h3>
              <a
                href={`tel:${PHONE_LINK}`}
                className="inline-block bg-orange text-white px-5 py-3 font-inter text-base font-semibold hover:opacity-90 transition-opacity mb-4"
              >
                Pozovite {PHONE}
              </a>
              <p className="text-gray text-base mb-4">ili</p>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block bg-blue text-white px-5 py-3 font-inter text-base font-semibold hover:opacity-90 transition-opacity mb-6"
              >
                Pošaljite poruku na {EMAIL}
              </a>
              <p className="font-inter text-black text-base leading-relaxed">
                Ako se ne javimo odmah, pozvaćemo vas u roku od 2 sata.
                <br />
                Trudimo se da odgovorimo na mejl u roku od 48 sati.
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-montserrat font-bold text-black text-xl sm:text-2xl mb-4">
                Posetite nas...
              </h3>
              <div className="w-full aspect-[4/3] min-h-[280px] bg-off-white overflow-hidden">
                {MAP_EMBED_URL ? (
                  <iframe
                    title="Lokacija"
                    src={MAP_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-inter text-gray text-sm p-4 text-center">
                    Dodajte Google Maps embed URL u MAP_EMBED_URL
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
