import Image from 'next/image'
import Link from 'next/link'
import { assetUrl } from '@/lib/assetUrl'

export interface HeroButton {
  label: string
  href: string
  variant?: 'blue' | 'orange'
}

export interface HeroProps {
  title: string
  subtitle?: string
  description: string
  imageSrc: string
  imageAlt: string
  buttons: HeroButton[]
}

export default function Hero({ title, subtitle, description, imageSrc, imageAlt, buttons }: HeroProps) {
  return (
    <section className="bg-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-10 md:gap-16 lg:gap-10">
            <div className="w-full lg:w-[560px]">
              <h1 className="font-montserrat font-bold text-black text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                {title}
              </h1>
              {subtitle != null && subtitle !== '' && (
                <h2 className="font-inter text-xl text-black mt-3 font-semibold">
                  {subtitle}
                </h2>
              )}
              <p className="font-inter text-base text-black mt-4 md:mt-6 leading-normal">
                {description}
              </p>
              {buttons.length > 0 && (
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
                  {buttons.map((btn) => {
                  const className = `inline-block text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity ${
                    btn.variant === 'orange' ? 'bg-orange' : 'bg-blue'
                  }`
                  return btn.href.startsWith('/') ? (
                    <Link key={btn.label} href={btn.href} className={className}>
                      {btn.label}
                    </Link>
                  ) : (
                    <a key={btn.label} href={btn.href} className={className}>
                      {btn.label}
                    </a>
                  )
                })}
                </div>
              )}
            </div>
            <div className="relative flex lg:justify-start">
              <div className="relative w-full lg:w-[480px] aspect-[16/9.2]">
                <Image
                  src={assetUrl(imageSrc)}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
                <Image
                  src={assetUrl('/icons/image-frame-hero.svg')}
                  alt=""
                  fill
                  className="object-cover pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
