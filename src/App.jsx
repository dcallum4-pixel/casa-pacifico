import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { posts } from './data/posts.js'
import { useT } from './context/LanguageContext.jsx'

// ─── Data (non-translatable: images, icons, links, times) ─────────────────────

const BEDROOM_IMAGES = [
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/569a9dd7-9987-4e35-82df-e19a33952d8a.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/9b1707e8-639c-44d1-9b24-7bef97879979.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ff04e503-6d81-40fd-a297-85aecbbe0e39.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/49f407e1-88e2-462c-b6bf-45bec44b284c.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ea245889-3828-441f-9202-e9188f7ab2b8.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/e128b781-8782-46fa-ba43-3361bfa463fa.jpeg',
]

const AMENITY_ICONS = ['🏊','🌊','🍳','🍽️','🍹','🌿','🏖️','🧹','❄️','📶','🧺','🚗','🏠','🛁','🛋️','📍']

const GALLERY = [
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/4087f40b-4824-490b-804a-008e9b8b304c.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/39bf9bdd-3bdd-4ef8-bf06-2f9f8b4adf19.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/2ca75c0a-2d97-4366-be73-1a3805a27fdb.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/cda7f1f3-5ba9-4a6b-bae1-bf9102fe8ffa.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/84d28aac-3485-4ad8-89a2-93d50c945197.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/569a9dd7-9987-4e35-82df-e19a33952d8a.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/9b1707e8-639c-44d1-9b24-7bef97879979.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ff04e503-6d81-40fd-a297-85aecbbe0e39.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/49f407e1-88e2-462c-b6bf-45bec44b284c.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ea245889-3828-441f-9202-e9188f7ab2b8.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/e128b781-8782-46fa-ba43-3361bfa463fa.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/8e11dafd-486b-4514-a025-430535f41335.jpeg',
]

const REVIEWS = [
  {
    text: 'Absolutely stunning property. The ocean views from every room took our breath away. We had three families staying together and everyone had plenty of space and privacy. The housekeeping service was a wonderful touch — we felt looked after every day. Already planning our return trip.',
    name: 'The Martinez Family',
    date: 'December 2024',
    platform: 'Airbnb',
  },
  {
    text: 'Best vacation rental we have ever stayed in. The location on the Malecón is unbeatable — we walked everywhere. The kitchen is massive and fully stocked, perfect for our group of 12. Rodrigo was incredibly responsive and helpful throughout our stay.',
    name: 'Sarah K.',
    date: 'February 2025',
    platform: 'Airbnb',
  },
  {
    text: 'We celebrated a milestone birthday here with 14 people and it was perfect. Six beautiful bedrooms, the pool was a daily highlight, and the bar area made evening gatherings so easy. Worth every penny and then some.',
    name: 'The Thompson Group',
    date: 'January 2025',
    platform: 'VRBO',
  },
  {
    text: 'Communication was flawless from inquiry to checkout. The check-in process was seamless. Property looked exactly like the photos — honestly even better in person. The views of the Pacific from the balcony are something else entirely.',
    name: 'Mike & Family',
    date: 'March 2025',
    platform: 'Airbnb',
  },
  {
    text: 'We have rented many large villas across Mexico and this is genuinely one of the best. The renovation is tasteful and modern. Having the Malecón right outside is something you cannot put a price on. The two primary suites with ensuite baths were perfect for the two couples in our group.',
    name: 'Jennifer R.',
    date: 'November 2024',
    platform: 'VRBO',
  },
  {
    text: 'Rodrigo is a superhost in every sense. Fast responses, thoughtful touches, and a property that delivers on every promise. Our kids loved the pool and we loved being steps from the best restaurants in Mazatlán. We are already booked for next year.',
    name: 'The Okafor Family',
    date: 'December 2024',
    platform: 'Airbnb',
  },
]

// Location section: static links/times; labels come from translations
const LOCATION_LINKS = [
  'https://www.tripadvisor.com/Attraction_Review-g150792-d278625-Reviews-Malecon_de_Mazatlan-Mazatlan_Pacific_Coast.html',
  'https://www.tripadvisor.com/Attraction_Review-g150792-d8663587-Reviews-Olas_Altas_Beach-Mazatlan_Pacific_Coast.html',
  'https://www.tripadvisor.com/Attraction_Review-g150792-d1065283-Reviews-Plaza_Machado-Mazatlan_Pacific_Coast.html',
  'https://www.google.com/maps/place/Mazatl%C3%A1n+International+Airport/@23.1614,-106.2661,15z',
]
const LOCATION_ICONS = ['🚶', '🏖️', '🍽️', '✈️']

// Local guide: icons, times, links (labels come from translations)
const LOCAL_GUIDE_META = [
  {
    icon: '🏖',
    items: [
      { time: '7 min walk',  link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d8663587-Reviews-Olas_Altas_Beach-Mazatlan_Pacific_Coast.html' },
      { time: '12 min walk', link: null },
      { time: '15 min drive', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d319368-Reviews-Zona_Dorada-Mazatlan_Pacific_Coast.html' },
    ],
  },
  {
    icon: '🍽',
    items: [
      { time: '10 min walk', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d1065283-Reviews-Plaza_Machado-Mazatlan_Pacific_Coast.html' },
      { time: '8 min walk',  link: null },
      { time: '15 min drive', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d319368-Reviews-Zona_Dorada-Mazatlan_Pacific_Coast.html' },
    ],
  },
  {
    icon: '🎭',
    items: [
      { time: '1 min walk',  link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d278625-Reviews-Malecon_de_Mazatlan-Mazatlan_Pacific_Coast.html' },
      { time: '12 min walk', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d558218-Reviews-Angela_Peralta_Theater-Mazatlan_Pacific_Coast.html' },
      { time: '15 min walk', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d319355-Reviews-Mazatlan_Cathedral-Mazatlan_Pacific_Coast.html' },
      { time: '5 min walk',  link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d319370-Reviews-El_Clavadista-Mazatlan_Pacific_Coast.html' },
    ],
  },
  {
    icon: '🛍',
    items: [
      { time: '10 min walk', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d2356589-Reviews-Mercado_Pino_Suarez-Mazatlan_Pacific_Coast.html' },
      { time: '15 min drive', link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d319368-Reviews-Zona_Dorada-Mazatlan_Pacific_Coast.html' },
      { time: '2 min walk',  link: null },
    ],
  },
  {
    icon: '✈️',
    items: [
      { time: '30 min drive', link: 'https://www.google.com/maps/place/Mazatl%C3%A1n+International+Airport/@23.1614,-106.2661,15z' },
      { time: '20 min drive', link: 'https://www.google.com/maps/place/Terminal+de+Ferry+Mazatl%C3%A1n/@23.1833,-106.4244,15z' },
    ],
  },
]

const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7443.610822020648!2d-106.43338552346808!3d23.22884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53001dd27543%3A0x8c7b228da29fee6e!2sMazatl%C3%A1n%20Malecon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function FadeIn({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">{children}</p>
  )
}

// ─── (Navbar imported from ./components/Navbar.jsx) ──────────────────────────

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const t = useT().hero
  return (
    <section className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/4087f40b-4824-490b-804a-008e9b8b304c.jpeg)' }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-4">
        <h1 className="font-serif text-5xl md:text-7xl text-white font-bold text-shadow leading-tight">
          Casa Pacífico Mazatlán
        </h1>
        <p className="italic font-serif text-gold text-xl md:text-2xl mt-2 text-shadow">
          {t.subtitle}
        </p>
        <p className="text-white/80 text-lg mt-4 text-shadow max-w-2xl">
          {t.desc}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => scrollTo('availability')}
            className="bg-gold text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-[#c49a3c] transition-colors"
          >
            {t.cta}
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors"
          >
            {t.gallery}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={() => scrollTo('highlights')} aria-label="Scroll down">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

// ─── HighlightsBar ────────────────────────────────────────────────────────────

function HighlightsBar() {
  const t = useT().highlights
  return (
    <section id="highlights" className="bg-ocean text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center divide-x divide-white/20">
          {t.items.map((s, i) => (
            <div key={i} className="flex-1 min-w-[140px] text-center px-4 py-2">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-gold font-bold text-xl leading-tight">{s.value}</div>
              <div className="text-white/70 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const t = useT().about
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            {t.heading}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">{t.p1}</p>
          <p className="text-gray-600 leading-relaxed mb-4">{t.p2}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{t.p3}</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-ocean/10 text-ocean border border-ocean/20 rounded-full px-4 py-1 text-sm font-medium">
              {t.badge1}
            </span>
            <span className="bg-ocean/10 text-ocean border border-ocean/20 rounded-full px-4 py-1 text-sm font-medium">
              {t.badge2}
            </span>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/39bf9bdd-3bdd-4ef8-bf06-2f9f8b4adf19.jpeg"
            alt="Casa Pacífico interior"
            loading="lazy"
            className="rounded-2xl shadow-xl object-cover w-full h-[500px]"
          />
        </div>
      </div>
    </section>
  )
}

// ─── Bedrooms ─────────────────────────────────────────────────────────────────

function Bedrooms() {
  const t = useT().bedrooms
  return (
    <section id="bedrooms" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEDROOM_IMAGES.map((img, i) => {
            const room = t.rooms[i]
            return (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img src={img} alt={room.name} loading="lazy" className="h-52 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-serif text-xl text-ocean font-semibold">{room.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{room.bed}</p>
                  {room.note && <p className="text-gold text-xs font-semibold uppercase tracking-wide mt-2">{room.note}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Amenities ────────────────────────────────────────────────────────────────

function Amenities() {
  const t = useT().amenities
  return (
    <section id="amenities" className="py-20 bg-[#f0ede6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AMENITY_ICONS.map((icon, i) => (
            <div key={i} className="bg-white rounded-xl p-5 flex items-start gap-3 shadow-sm">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <span className="text-gray-700 text-sm font-medium leading-snug">{t.items[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const t = useT().gallery
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imgKey, setImgKey] = useState(0)

  const openLightbox = (index) => { setCurrentIndex(index); setImgKey(k => k + 1); setLightboxOpen(true) }
  const closeLightbox = () => setLightboxOpen(false)
  const prev = () => { setCurrentIndex(i => (i - 1 + GALLERY.length) % GALLERY.length); setImgKey(k => k + 1) }
  const next = () => { setCurrentIndex(i => (i + 1) % GALLERY.length); setImgKey(k => k + 1) }

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen])

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  const cellClass = (index) => {
    if (index === 0)                return 'col-span-2 row-span-2'
    if (index === 4 || index === 8) return 'col-span-2'
    return ''
  }

  return (
    <section id="gallery" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className={`${cellClass(i)} overflow-hidden rounded-lg cursor-pointer group aspect-square`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={src}
                alt={`${t.photoAlt} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <img
            key={imgKey}
            src={GALLERY[currentIndex]}
            alt={`${t.photoAlt} ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain animate-fade-in"
            onClick={e => e.stopPropagation()}
          />

          <div className="fixed top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
            {currentIndex + 1} / {GALLERY.length}
          </div>

          <button
            className="fixed top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label={t.prev}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label={t.next}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

// ─── Location ─────────────────────────────────────────────────────────────────

function Location() {
  const t = useT().location
  return (
    <section id="location" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-2 gap-12 items-center">
        <div className="mb-12 lg:mb-0">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            {t.heading}
          </h2>
          <ul className="space-y-4 mb-6">
            {t.distances.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="text-xl">{LOCATION_ICONS[i]}</span>
                <span>
                  <strong className="text-ocean">{d.time}</strong> —{' '}
                  <a
                    href={LOCATION_LINKS[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    {d.place}
                    <span className="text-gold ml-0.5 text-xs">↗</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">{t.desc}</p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Casa Pacífico Location"
            src={MAP_EMBED}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

// ─── Availability ─────────────────────────────────────────────────────────────

function Availability() {
  const t = useT().availability
  return (
    <section id="availability" className="py-20 bg-ocean text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl text-white leading-snug">
          {t.heading}
        </h2>
        <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
          {t.desc}
        </p>

        <div className="mt-10 border border-white/20 rounded-2xl p-12 text-center bg-white/5">
          <div className="text-5xl">📅</div>
          <h3 className="text-white text-xl font-semibold mt-4">{t.calendarTitle}</h3>
          <p className="text-white/60 mt-2">{t.calendarDesc}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
          >
            {t.inquire}
          </button>
          <a
            href="https://www.airbnb.com/rooms/983307579255396282"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            {t.airbnb}
          </a>
          <a
            href="https://www.vrbo.com/en-ca/cottage-rental/p3460030vb"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            {t.vrbo}
          </a>
        </div>

        <p className="text-white/50 text-sm mt-6">{t.stats}</p>
      </div>
    </section>
  )
}

// ─── Why Book Direct ──────────────────────────────────────────────────────────

function WhyBookDirect() {
  const t = useT().whyBookDirect
  return (
    <section id="book-direct" className="py-20 bg-ocean">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-white">{t.heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">{t.platformLabel}</div>
            <ul className="space-y-4">
              {t.platform.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className={`text-sm ${i === t.platform.length - 1 ? 'text-white font-semibold' : 'text-white/60'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gold/15 border-2 border-gold rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
              {t.recommended}
            </div>
            <div className="text-gold text-xs uppercase tracking-widest font-semibold mb-5">{t.directLabel}</div>
            <ul className="space-y-4">
              {t.direct.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                  <span className={`text-sm ${i === t.direct.length - 1 ? 'text-white font-semibold' : 'text-white/80'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="font-serif text-2xl md:text-3xl text-white mb-8">
            {t.tagline} <span className="text-gold">{t.taglineAccent}</span>
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#c49a3c] transition-colors"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function Reviews() {
  const t = useT().reviews
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => setCurrent(c => (c + 1) % REVIEWS.length), 5000)
    return () => clearInterval(iv)
  }, [paused])

  const prev = () => setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () => setCurrent(c => (c + 1) % REVIEWS.length)
  const r = REVIEWS[current]

  return (
    <section id="reviews" className="py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
          <p className="text-gray-500 mt-3">{t.stats}</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            key={current}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 animate-fade-in-up"
          >
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold text-xl">★</span>
              ))}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed italic">
              "{r.text}"
            </p>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-semibold text-ocean">{r.name}</div>
                <div className="text-gray-400 text-sm mt-0.5">{r.date}</div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${r.platform === 'Airbnb' ? 'bg-[#FF385C]/10 text-[#FF385C]' : 'bg-blue-50 text-blue-600'}`}>
                {r.platform}
              </span>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-ocean text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-ocean/80 transition-colors"
            aria-label={t.prev}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-ocean text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-ocean/80 transition-colors"
            aria-label={t.next}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Local Area Guide ─────────────────────────────────────────────────────────

function LocalAreaGuide() {
  const t = useT().localGuide
  return (
    <section id="area-guide" className="py-20 bg-[#f0ede6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 mb-12 lg:mb-0">
            {LOCAL_GUIDE_META.map((cat, ci) => {
              const catT = t.categories[ci]
              return (
                <div key={ci}>
                  <h3 className="font-serif text-lg text-ocean font-semibold mb-3 flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{catT.label}</span>
                  </h3>
                  <ul className="space-y-1">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <span className="text-gray-700 text-sm">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gold transition-colors"
                            >
                              {catT.items[ii]}
                              <span className="text-gold ml-0.5 text-xs">↗</span>
                            </a>
                          ) : catT.items[ii]}
                        </span>
                        <span className="text-ocean text-xs font-semibold bg-ocean/10 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                          {item.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl lg:sticky lg:top-24">
            <iframe
              title="Mazatlán Area Map"
              src={MAP_EMBED}
              width="100%"
              height="520"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Digital House Guide ──────────────────────────────────────────────────────

function DigitalHouseGuide() {
  const t = useT().houseGuide
  return (
    <section id="house-guide" className="py-20 bg-ocean">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <SectionLabel>{t.label}</SectionLabel>
        <h2 className="font-serif text-4xl text-white mb-4">{t.heading}</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">{t.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.cards.map((c, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 text-left hover:bg-white/15 transition-colors"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-serif text-base font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-white/40 text-sm mt-10">{t.footer}</p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const t = useT().faq
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
        </div>

        <div className="space-y-3">
          {t.items.map((faq, i) => (
            <div key={i} className={`border rounded-xl overflow-hidden transition-colors ${openIdx === i ? 'border-ocean/30 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className={`font-medium text-sm md:text-base leading-snug ${openIdx === i ? 'text-ocean' : 'text-gray-800'}`}>
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-gold transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`accordion-body ${openIdx === i ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">{t.stillQuestion}</p>
          <button
            onClick={() => scrollTo('contact')}
            className="bg-ocean text-white px-8 py-3 rounded-lg font-semibold hover:bg-ocean/80 transition-colors text-sm"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────

function InquiryForm() {
  const t = useT().inquiry
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    checkIn: '', checkOut: '', guests: '', source: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = t.errors.firstName
    if (!form.lastName.trim())  errs.lastName  = t.errors.lastName
    if (!form.email.trim()) {
      errs.email = t.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t.errors.emailInvalid
    }
    if (!form.checkIn)  errs.checkIn  = t.errors.checkIn
    if (!form.checkOut) errs.checkOut = t.errors.checkOut
    if (!form.guests)   errs.guests   = t.errors.guests
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  const inputClass = (field) =>
    `w-full border ${errors[field] ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean text-gray-700 text-sm`

  const labelClass = 'text-sm font-medium text-gray-700 mb-1 block'

  return (
    <section id="contact" className="py-20 bg-[#f0ede6]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-2">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-3xl font-bold">✓</span>
              </div>
              <h3 className="font-serif text-2xl text-ocean font-semibold mb-2">{t.successTitle}</h3>
              <p className="text-gray-600">{t.successDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} htmlFor="firstName">{t.firstName}</label>
                  <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} className={inputClass('firstName')} placeholder={t.firstNamePlaceholder} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="lastName">{t.lastName}</label>
                  <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} className={inputClass('lastName')} placeholder={t.lastNamePlaceholder} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="email">{t.email}</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder={t.emailPlaceholder} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="phone">{t.phone}</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass('phone')} placeholder={t.phonePlaceholder} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="checkIn">{t.checkIn}</label>
                  <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className={inputClass('checkIn')} />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="checkOut">{t.checkOut}</label>
                  <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className={inputClass('checkOut')} />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="guests">{t.guests}</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange} className={inputClass('guests')}>
                    <option value="">{t.selectGuests}</option>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? t.guestSingular : t.guestPlural}</option>
                    ))}
                  </select>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="source">{t.source}</label>
                  <select id="source" name="source" value={form.source} onChange={handleChange} className={inputClass('source')}>
                    <option value="">{t.selectSource}</option>
                    <option value="google">{t.sourceOptions.google}</option>
                    <option value="airbnb">{t.sourceOptions.airbnb}</option>
                    <option value="vrbo">{t.sourceOptions.vrbo}</option>
                    <option value="referral">{t.sourceOptions.referral}</option>
                    <option value="social">{t.sourceOptions.social}</option>
                    <option value="other">{t.sourceOptions.other}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="message">{t.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass('message')}
                    placeholder={t.messagePlaceholder}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-gold hover:bg-[#c49a3c] text-white font-semibold py-4 rounded-lg text-lg transition-colors"
              >
                {t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function Newsletter() {
  const t = useT().newsletter
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.emailError)
      return
    }
    setSent(true)
  }

  return (
    <section className="py-20 bg-[#f5e6c4]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">🌴</div>
        <h2 className="font-serif text-3xl md:text-4xl text-ocean mb-4">{t.heading}</h2>
        <p className="text-gray-700 leading-relaxed mb-8">{t.desc}</p>

        {sent ? (
          <div className="bg-white rounded-2xl p-8 shadow-md inline-block">
            <div className="text-3xl mb-3">✉️</div>
            <p className="font-serif text-xl text-ocean font-semibold">{t.successTitle}</p>
            <p className="text-gray-600 mt-1 text-sm">{t.successDesc}</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={t.placeholder}
                className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-[#c49a3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                {t.submit}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        <p className="text-gray-500 text-xs mt-4">{t.note}</p>
      </div>
    </section>
  )
}

// ─── (Footer imported from ./components/Footer.jsx) ──────────────────────────

// ─── Events Teaser ────────────────────────────────────────────────────────────

function EventsTeaser() {
  const t = useT().eventsTeaser
  return (
    <section className="bg-ocean py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-3">
          {t.heading}
        </h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">{t.desc}</p>
        <Link
          to="/events"
          className="inline-block bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  )
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  'Travel Tips':        'bg-blue-50 text-blue-700',
  'Food & Dining':      'bg-orange-50 text-orange-700',
  'Events & Festivals': 'bg-purple-50 text-purple-700',
  'Family Travel':      'bg-green-50 text-green-700',
  'Booking Tips':       'bg-gold/10 text-yellow-800',
}

function BlogPreview() {
  const t = useT().blogPreview
  const featured = posts.slice(0, 3)

  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">{t.heading}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {featured.map(post => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime} {t.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-ocean font-semibold leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-auto text-ocean font-semibold text-sm hover:text-gold transition-colors flex items-center gap-1"
                >
                  {t.readArticle}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-block border-2 border-ocean text-ocean px-8 py-3 rounded-lg font-semibold hover:bg-ocean hover:text-white transition-colors"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Floating: WhatsApp ───────────────────────────────────────────────────────

function WhatsAppButton() {
  const t = useT().whatsapp
  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-40 group">
      <a
        href="https://wa.me/message"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.ariaLabel}
      >
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-ocean text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          {t.tooltip}
        </span>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl animate-pulse-wa">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </div>
  )
}

// ─── Floating: Scroll to Top ──────────────────────────────────────────────────

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-24 md:bottom-6 left-6 z-40 bg-ocean text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-ocean/80 transition-colors animate-fade-in"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

// ─── Floating: Mobile Book Now Bar ────────────────────────────────────────────

function MobileBookBar() {
  const t = useT().mobileBar
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div>
        <div className="text-xs text-gray-400">{t.startingFrom}</div>
        <div className="font-serif text-ocean font-semibold text-lg">$XXX <span className="text-sm font-normal text-gray-500">/ night</span></div>
      </div>
      <button
        onClick={() => scrollTo('contact')}
        className="bg-gold hover:bg-[#c49a3c] text-white px-7 py-2.5 rounded-xl font-semibold text-sm transition-colors"
      >
        {t.bookNow}
      </button>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`font-sans transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      <HighlightsBar />
      <FadeIn><About /></FadeIn>
      <FadeIn><Bedrooms /></FadeIn>
      <FadeIn><Amenities /></FadeIn>
      <FadeIn><Gallery /></FadeIn>
      <FadeIn><Location /></FadeIn>
      <FadeIn><Availability /></FadeIn>
      <FadeIn><WhyBookDirect /></FadeIn>
      <FadeIn><Reviews /></FadeIn>
      <FadeIn><LocalAreaGuide /></FadeIn>
      <FadeIn><DigitalHouseGuide /></FadeIn>
      <FadeIn><FAQ /></FadeIn>
      <FadeIn><EventsTeaser /></FadeIn>
      <FadeIn><BlogPreview /></FadeIn>
      <FadeIn><InquiryForm /></FadeIn>
      <FadeIn><Newsletter /></FadeIn>
      <Footer />

      {/* Floating elements */}
      <WhatsAppButton />
      <ScrollToTopBtn />
      <MobileBookBar />
    </div>
  )
}
