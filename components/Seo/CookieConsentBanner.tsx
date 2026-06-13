'use client'

import { useEffect, useState } from 'react'
import {
  saveConsent,
  shouldShowConsentBanner,
  type CookieConsentChoice,
} from '@/lib/cookieConsent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (shouldShowConsentBanner()) setVisible(true)
  }, [])

  function handleChoice(choice: CookieConsentChoice) {
    saveConsent(choice)
    window.location.reload()
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray/30 bg-white p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:p-6"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p
            id="cookie-consent-title"
            className="font-montserrat text-base font-bold text-black sm:text-lg"
          >
            Kolačići i privatnost
          </p>
          <p
            id="cookie-consent-description"
            className="mt-1 font-inter text-sm text-black/80 sm:text-base"
          >
            Koristimo kolačiće kako bismo poboljšali vaše iskustvo i analizirali saobraćaj
            na sajtu. Možete prihvatiti ili odbiti analitičke kolačiće.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 xs:flex-row sm:gap-3">
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="border border-black bg-white px-6 py-3 font-inter text-sm font-semibold text-black transition-colors hover:bg-off-white sm:text-base"
          >
            Odbij
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="bg-blue px-6 py-3 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:text-base"
          >
            Prihvati
          </button>
        </div>
      </div>
    </div>
  )
}
