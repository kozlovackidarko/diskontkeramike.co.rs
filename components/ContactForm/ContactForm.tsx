'use client'

import { useEffect, useRef, useState } from 'react'
import {
  canSubmitForm,
  contactErrorMessage,
  getFormStartedAt,
  submitContactForm,
} from '@/lib/contactForm'

const SUBMIT_DELAY_MS = 3000

export default function ContactForm() {
  const formStartedAt = useRef(getFormStartedAt())
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setCanSubmit(true), SUBMIT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit || status === 'sending') return

    if (!canSubmitForm(formStartedAt.current)) {
      setStatus('error')
      setErrorMessage(contactErrorMessage('too_fast'))
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const result = await submitContactForm(
        {
          name,
          email,
          message,
          website: honeypotRef.current?.value ?? '',
        },
        formStartedAt.current
      )

      if (result.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        if (honeypotRef.current) honeypotRef.current.value = ''
        formStartedAt.current = getFormStartedAt()
        setCanSubmit(false)
        setTimeout(() => setCanSubmit(true), SUBMIT_DELAY_MS)
        return
      }

      setStatus('error')
      setErrorMessage(result.message)
    } catch {
      setStatus('error')
      setErrorMessage(contactErrorMessage('network_error'))
    }
  }

  return (
    <section className="bg-off-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12">
            Pošaljite nam poruku
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <input
              ref={honeypotRef}
              type="text"
              defaultValue=""
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] opacity-0 h-0 w-0 pointer-events-none"
            />
            <div className="flex flex-col md:flex-row gap-6 md:gap-6">
              <div className="flex-1 min-w-0">
                <label htmlFor="contact-name" className="block font-inter text-base font-semibold text-black mb-2">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all"
                  placeholder="Vaše ime"
                  aria-label="Ime i prezime"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="contact-email" className="block font-inter text-base font-semibold text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={254}
                  className="w-full border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all"
                  placeholder="vas@email.rs"
                  aria-label="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-inter text-base font-semibold text-black mb-2">
                Poruka
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={5000}
                rows={5}
                className="w-full border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all resize-y min-h-[120px]"
                placeholder="Napišite nam..."
                aria-label="Poruka"
              />
            </div>
            {status === 'success' && (
              <p className="font-inter text-base text-black font-semibold" role="status">
                Hvala! Vaša poruka je poslata.
              </p>
            )}
            {status === 'error' && errorMessage && (
              <p className="font-inter text-base text-red font-semibold" role="alert">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending' || !canSubmit}
              className="inline-block bg-blue text-white px-8 py-3 font-inter text-base font-semibold hover:opacity-90 transition-opacity w-fit disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Šalje se...' : 'Pošalji poruku'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
