export const CONSENT_STORAGE_KEY = 'diskont-cookie-consent'
export const CONSENT_UPDATED_EVENT = 'diskont-cookie-consent-updated'
export const CONSENT_REPROMPT_MS = 30 * 24 * 60 * 60 * 1000

export type CookieConsentChoice = 'accepted' | 'declined'

export interface CookieConsentRecord {
  choice: CookieConsentChoice
  updatedAt: string
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent()?.choice === 'accepted'
}

export function shouldShowConsentBanner(): boolean {
  const stored = getStoredConsent()
  if (!stored) return true
  if (stored.choice === 'accepted') return false
  const elapsed = Date.now() - new Date(stored.updatedAt).getTime()
  return elapsed >= CONSENT_REPROMPT_MS
}

export function getStoredConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsentRecord
    if (parsed.choice !== 'accepted' && parsed.choice !== 'declined') return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(choice: CookieConsentChoice): CookieConsentRecord {
  const record: CookieConsentRecord = {
    choice,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(CONSENT_UPDATED_EVENT, { detail: { choice } })
    )
  }
  return record
}

export function applyGoogleConsent(choice: CookieConsentChoice) {
  const granted = choice === 'accepted'
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
}
