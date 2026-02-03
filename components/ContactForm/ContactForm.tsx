'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to API or mailto
  }

  return (
    <section className="bg-off-white py-8 md:py-16 lg:py-20">
      <div className="px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-montserrat font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12">
            Pošaljite nam poruku
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-6">
              <div className="flex-1 min-w-0">
                <label htmlFor="contact-name" className="block font-inter text-base font-semibold text-black mb-2">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  id="contact-name"
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full border border-gray/40 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-gray focus:outline-none focus-visible:border-black transition-all resize-y min-h-[120px]"
                placeholder="Napišite nam..."
                aria-label="Poruka"
              />
            </div>
            <button
              type="submit"
              className="inline-block bg-blue text-white px-8 py-3 font-inter text-base font-semibold hover:opacity-90 transition-opacity w-fit"
            >
              Pošalji poruku
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
