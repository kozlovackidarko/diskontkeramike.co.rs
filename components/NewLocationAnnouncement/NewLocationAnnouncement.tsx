'use client'

const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2883.1708756190196!2d20.697588000000003!3d43.727776999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDQzJzQwLjAiTiAyMMKwNDEnNTEuMyJF!5e0!3m2!1ssr!2snl!4v1772924386551!5m2!1ssr!2snl'

export default function NewLocationAnnouncement() {
  return (
    <div className="w-full lg:w-[480px] shrink-0 relative overflow-hidden rounded-sm">
      <div
        className="absolute left-1/2 top-1/2 w-[200%] h-[200%] animate-spin-slow"
        style={{ background: 'conic-gradient(from 0deg, #FFFFFF, #D17140, #FFFFFF, #D17140)' }}
        aria-hidden
      />
      <div className="relative z-10 m-[3px] overflow-hidden bg-white rounded-[2px] min-h-0">
        <div className="bg-orange px-4 py-3 text-center">
          <p className="font-montserrat font-black text-white text-[24px] sm:text-[28px] tracking-wider uppercase animate-novo-pulse">
            Nova lokacija!!!
          </p>
        </div>
      <div className="relative w-full aspect-[16/10] min-h-[200px] bg-off-white">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokacija: Hajduk Veljkova bb"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="px-4 py-4 space-y-2">
        <p className="font-montserrat font-bold text-black text-lg">
          Hajduk Veljkova bb, Kraljevo
        </p>
        <p className="font-inter text-[15px] text-black">
          Magacin preko vrtica i firme Pub internacional
        </p>
        <p className="font-inter text-base font-semibold text-orange pt-1">
          Otvaranje: 16.03.2026.
        </p>
      </div>
      </div>
    </div>
  )
}
