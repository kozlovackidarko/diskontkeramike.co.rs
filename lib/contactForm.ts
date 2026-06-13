const API_URL = 'https://server.diskontkeramike.co.rs/api/contact.php'

const MIN_SUBMIT_SECONDS = 3

export type ContactPayload = {
  name: string
  email: string
  message: string
  website: string
  ts: number
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false, error: string, message: string }

export function getFormStartedAt(): number {
  return Math.floor(Date.now() / 1000)
}

export function canSubmitForm(formStartedAt: number): boolean {
  return getFormStartedAt() - formStartedAt >= MIN_SUBMIT_SECONDS
}

export async function submitContactForm(
  data: Omit<ContactPayload, 'ts'>,
  formStartedAt: number
): Promise<ContactSubmitResult> {
  if (!canSubmitForm(formStartedAt)) {
    return { ok: false, error: 'too_fast', message: contactErrorMessage('too_fast') }
  }

  const payload: ContactPayload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
    website: data.website.trim(),
    ts: formStartedAt,
  }

  let res: Response
  try {
    res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return { ok: false, error: 'network_error', message: contactErrorMessage('network_error') }
  }

  const rawBody = await res.text()
  let body: Record<string, unknown> | null = null

  if (rawBody) {
    try {
      const parsed = JSON.parse(rawBody) as unknown
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        body = parsed as Record<string, unknown>
      }
    } catch {
      return {
        ok: false,
        error: 'invalid_response',
        message: contactErrorMessage('invalid_response'),
      }
    }
  }

  if (body?.ok === true) {
    return { ok: true }
  }

  const errorCode =
    typeof body?.error === 'string' && body.error !== ''
      ? body.error
      : res.ok
        ? 'unknown_error'
        : `http_${res.status}`

  return { ok: false, error: errorCode, message: contactErrorMessage(errorCode) }
}

export function contactErrorMessage(error: string): string {
  switch (error) {
    case 'rate_limited':
      return 'Previše pokušaja. Pokušajte ponovo za minut.'
    case 'too_fast':
      return 'Sačekajte par sekundi pre slanja.'
    case 'invalid_email':
      return 'Unesite ispravnu email adresu.'
    case 'invalid_name':
      return 'Unesite ime i prezime (do 100 karaktera).'
    case 'invalid_message':
      return 'Unesite poruku (do 5000 karaktera).'
    case 'invalid_json':
      return 'Podaci nisu poslati u ispravnom formatu.'
    case 'spam_detected':
      return 'Slanje nije uspelo. Pokušajte ponovo.'
    case 'origin_not_allowed':
      return 'Slanje sa ove adrese nije dozvoljeno. Posetite diskontkeramike.co.rs ili nas kontaktirajte direktno.'
    case 'method_not_allowed':
      return 'Zahtev nije dozvoljen. Osvežite stranicu i pokušajte ponovo.'
    case 'smtp_not_configured':
      return 'Slanje poruke trenutno nije dostupno. Kontaktirajte nas direktno.'
    case 'email_failed':
      return 'Poruka nije poslata. Pokušajte ponovo ili nas kontaktirajte direktno.'
    case 'network_error':
      return 'Nema konekcije sa serverom. Proverite internet i pokušajte ponovo.'
    case 'invalid_response':
      return 'Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno.'
    default:
      return 'Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno.'
  }
}
