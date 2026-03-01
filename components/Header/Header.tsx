'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assetUrl } from '@/lib/assetUrl'
import Logo from './Logo'
import { getCategoryLinks } from '@/lib/product-options'

interface NavLink {
  label: string
  href: string
}

const categoryLinks = getCategoryLinks()

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const mobileCategoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCategoriesOpen) return
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      const el = target as Element
      const isCategoriesToggle = el.closest?.('button[aria-label="Otvori kategorije"]')
      const isInsideDesktop = categoriesRef.current?.contains(target)
      const isInsideMobileCategories = mobileCategoriesRef.current?.contains(target)
      if (isCategoriesToggle || isInsideDesktop || isInsideMobileCategories) return
      setIsCategoriesOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCategoriesOpen])

  const navLinks: NavLink[] = [
    { label: 'Početna', href: '/' },
    { label: 'Kategorije', href: '/kategorije' },
    { label: 'Partneri', href: '/partneri' },
    { label: 'O nama', href: '/o-nama' },
  ]

  return (
    <header className="bg-off-white relative z-50">
      <div className="px-4 sm:px-8 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
          <Link href="/" className="flex items-center" aria-label="Početna">
            <Logo />
          </Link>

          <div className="hidden xl:flex items-center">
            <nav className="flex items-center">
              {navLinks.map((link) =>
                link.label === 'Kategorije' ? (
                  <div key={link.href} className="relative flex items-center" ref={categoriesRef}>
                    <Link
                      href={link.href}
                      className="text-black font-inter text-base font-normal hover:text-gray-600 transition-colors px-3 py-2.5 pr-0"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsCategoriesOpen((o) => !o)
                      }}
                      className="p-2 text-black hover:text-gray-600 transition-colors"
                      aria-label="Otvori kategorije"
                      aria-expanded={isCategoriesOpen}
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" />
                      </svg>
                    </button>
                    <div
                      className={`absolute left-0 top-full pt-1 z-20 transition-all duration-300 ease-in-out ${
                        isCategoriesOpen
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 pointer-events-none invisible'
                      }`}
                    >
                      <div className="bg-off-white border border-gray/30 shadow-lg min-w-[200px] py-2">
                        {categoryLinks.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block font-inter text-base text-black hover:bg-white hover:text-gray-600 px-4 py-2"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-black font-inter text-base font-normal hover:text-gray-600 transition-colors px-5 py-2.5"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/kategorija/top-ponuda"
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
                href="/kategorija/top-ponuda"
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
              className={`absolute -right-4 sm:-right-0 top-[120%] z-10 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none invisible'
              }`}
            >
              <div className="bg-off-white border border-gray/30 shadow-lg min-w-[200px] w-56">
              <nav className="flex flex-col">
                {navLinks.map((link) =>
                  link.label === 'Kategorije' ? (
                    <div key={link.href} className="flex flex-col">
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className="flex-1 block font-inter text-base text-black hover:bg-white hover:text-gray-600 px-4 py-2 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setIsCategoriesOpen((o) => !o)
                          }}
                          className="p-2 text-black hover:bg-white hover:text-gray-600 transition-colors"
                          aria-label="Otvori kategorije"
                          aria-expanded={isCategoriesOpen}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 4.5L6 7.5L9 4.5" />
                          </svg>
                        </button>
                      </div>
                      {isCategoriesOpen && (
                        <div ref={mobileCategoriesRef} className="flex flex-col">
                          {categoryLinks.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="block font-inter text-base text-black hover:bg-white hover:text-gray-600 px-4 py-2 pl-6 touch-manipulation"
                              scroll={true}
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block font-inter text-base text-black hover:bg-white hover:text-gray-600 px-4 py-2 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="md:hidden flex flex-col border-t border-gray/20">
                  <Link
                    href="/kategorija/top-ponuda"
                    className="block font-inter text-base font-semibold text-white bg-red hover:opacity-90 px-4 py-2 text-center transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Top ponuda
                  </Link>
                  <Link
                    href="/kontakt"
                    className="block font-inter text-base font-semibold text-white bg-blue hover:opacity-90 px-4 py-2 text-center transition-opacity"
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
