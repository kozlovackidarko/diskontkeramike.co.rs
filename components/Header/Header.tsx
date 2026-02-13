'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assetUrl } from '@/lib/assetUrl'
import Logo from './Logo'

interface NavLink {
  label: string
  href: string
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks: NavLink[] = [
    { label: 'Početna', href: '/' },
    { label: 'Naša preporuka', href: '/nasa-preporuka' },
    { label: 'Partneri', href: '/partneri' },
    { label: 'O nama', href: '/o-nama' },
  ]

  return (
    <header className="bg-off-white relative">
      <div className="px-4 sm:px-8 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
          <Link href="/" className="flex items-center" aria-label="Početna">
            <Logo />
          </Link>

          <div className="hidden xl:flex items-center">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black font-inter text-base font-normal hover:text-gray-600 transition-colors px-5 py-2.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/top-ponuda"
                className="inline-block bg-red text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Top ponuda
              </Link>
              <Link
                href="/kontakt"
                className="inline-block bg-blue text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Kontakt
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 xl:hidden relative">
            <div className="hidden xs:flex items-center gap-4">
              <Link
                href="/top-ponuda"
                className="inline-block bg-red text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Top ponuda
              </Link>
              <Link
                href="/kontakt"
                className="hidden md:inline-block bg-blue text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Kontakt
              </Link>
            </div>

            <button
              className="text-black px-2 py-2 relative w-11 h-11 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-7 h-7 absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`w-7 h-7 absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-0'
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              className={`absolute -right-4 sm:-right-0 top-full bg-off-white pt-8 pb-2 w-56 min-w-fit z-10 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none invisible'
              }`}
            >
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-black font-inter text-base font-normal hover:text-gray-600 transition-colors py-4 px-4 whitespace-nowrap"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="md:hidden flex flex-col gap-2 px-4 pb-2">
                  <Link
                    href="/top-ponuda"
                    className="xs:hidden inline-block bg-red text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Top ponuda
                  </Link>
                  <Link
                    href="/kontakt"
                    className="md:hidden inline-block bg-blue text-white px-6 py-2.5 font-inter text-base font-semibold hover:opacity-90 transition-opacity w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Kontakt
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[14px] md:h-[18px] relative overflow-hidden">
        <Image
          src={assetUrl('/icons/divider.svg')}
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
