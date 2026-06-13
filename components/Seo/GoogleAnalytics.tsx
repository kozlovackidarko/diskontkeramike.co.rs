'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import {
  CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent,
  type CookieConsentChoice,
} from '@/lib/cookieConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-YFZ8KRXY7V'

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (hasAnalyticsConsent()) setEnabled(true)

    function onConsentUpdate(event: Event) {
      const choice = (event as CustomEvent<{ choice: CookieConsentChoice }>).detail?.choice
      if (choice === 'accepted') setEnabled(true)
    }

    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdate)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdate)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
