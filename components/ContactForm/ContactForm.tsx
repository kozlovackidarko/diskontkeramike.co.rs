'use client'

import { useState } from 'react'

const FORM_NAME = 'Contact'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('form-name', FORM_NAME)
    const params = new URLSearchParams()
    for (const [key, value] of data.entries()) {
      params.append(key, value instanceof File ? '' : value)
    }
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!res.ok) throw new Error('Submit failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-off-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12">
            Pošaljite nam poruku
          </h2>
          <form
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <p className="hidden" aria-hidden="true">
              <label>
                Ne popunjavajte: <input name="bot-field" />
              </label>
            </p>
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
                rows={5}
                className="w-full border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all resize-y min-h-[120px]"
                placeholder="Napišite nam..."
                aria-label="Poruka"
              />
            </div>
            {status === 'success' && (
              <p className="font-inter text-base text-black font-semibold">
                Hvala! Vaša poruka je poslata.
              </p>
            )}
            {status === 'error' && (
              <p className="font-inter text-base text-red font-semibold">
                Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-block bg-blue text-white px-8 py-3 font-inter text-base font-semibold hover:opacity-90 transition-opacity w-fit disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Šaljem...' : 'Pošalji poruku'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
