import Script from 'next/script'
import { CONSENT_STORAGE_KEY } from '@/lib/cookieConsent'

export default function GoogleConsentDefaults() {
  return (
    <Script id="google-consent-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500
        });
        try {
          var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
          if (raw) {
            var data = JSON.parse(raw);
            if (data.choice === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            }
          }
        } catch (e) {}
      `}
    </Script>
  )
}
