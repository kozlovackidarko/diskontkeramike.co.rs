import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-10 md:gap-16 lg:gap-10">
            <div className="w-full lg:w-[560px]">
              <h1 className="font-montserrat font-bold text-[#3A3A3A] text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                Diskont Keramike
              </h1>
              <h2 className="font-inter text-xl text-[#3A3A3A] mt-3 font-semibold">
                Veliki izbor kermačkih pločica po najboljim cenama.
              </h2>
              <p className="font-inter text-base text-[#3A3A3A] mt-4 md:mt-6 leading-normal">
                U Diskontu Keramike verujemo u iskrenu i transparentnu ponudu. Već više od dve decenije uvozimo kvalitetne pločice iz Italije, Španije i Turske, uz uvek konkurentne, a često i najbolje cene na tržištu. Naš tim je tu da brzo odgovori i pomogne vam da izaberete pravo rešenje za vaš prostor.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
                <a
                  href="/preporuka"
                  className="inline-block bg-hero-blue text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Cela ponudu
                </a>
                <a
                  href="/preporuka"
                  className="inline-block bg-orange text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Top artikli
                </a>
              </div>
            </div>
            <div className="relative flex lg:justify-start">
              <div className="relative w-full h-auto lg:w-[480px]">
                <div className="w-full aspect-[16/9.2]">
                  <Image
                    src="/images/hero-tiles.png"
                    alt="Ceramic tiles"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="">
                  <Image
                    src="/icons/image-frame-hero.svg"
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
