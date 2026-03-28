import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const BEDROOMS = [
  { id: 1, name: 'Bedroom 1', bed: 'Queen Bed', note: '', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/569a9dd7-9987-4e35-82df-e19a33952d8a.jpeg' },
  { id: 2, name: 'Bedroom 2', bed: 'King Bed', note: '', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/9b1707e8-639c-44d1-9b24-7bef97879979.jpeg' },
  { id: 3, name: 'Bedroom 3', bed: 'Queen Bed', note: '', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ff04e503-6d81-40fd-a297-85aecbbe0e39.jpeg' },
  { id: 4, name: 'Bedroom 4', bed: 'King Bed + Sofa Bed', note: '', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/49f407e1-88e2-462c-b6bf-45bec44b284c.jpeg' },
  { id: 5, name: 'Bedroom 5', bed: 'King Bed', note: 'Primary Suite — Ensuite Bath', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/ea245889-3828-441f-9202-e9188f7ab2b8.jpeg' },
  { id: 6, name: 'Bedroom 6', bed: 'King Bed', note: 'Primary Suite — Ensuite Bath', img: 'https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/e128b781-8782-46fa-ba43-3361bfa463fa.jpeg' },
]

const AMENITIES = [
  { icon: '🏊', label: 'Private Pool' },
  { icon: '🌊', label: 'Ocean Views' },
  { icon: '🍳', label: 'Full Kitchen' },
  { icon: '🍽️', label: 'Dining for 8+' },
  { icon: '🍹', label: 'Bar Area' },
  { icon: '🌿', label: 'Garden & Terrace' },
  { icon: '🏖️', label: 'Beach Access (7 min)' },
  { icon: '🧹', label: 'Housekeeping Mon–Fri' },
  { icon: '❄️', label: 'Air Conditioning' },
  { icon: '📶', label: 'High-Speed WiFi' },
  { icon: '🧺', label: 'Washer & Dryer' },
  { icon: '🚗', label: 'Parking Available' },
  { icon: '🏠', label: '4,000 Sq Ft' },
  { icon: '🛁', label: '4.5 Bathrooms' },
  { icon: '🛋️', label: 'Spacious Living Room' },
  { icon: '📍', label: '1 Min to Malecón' },
]

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Bedrooms', id: 'bedrooms' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Location', id: 'location' },
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left">
          <div className="font-serif text-ocean text-xl font-semibold">Casa Pacífico</div>
          <div className="text-xs tracking-widest text-gray-500 uppercase">Mazatlán</div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-gray-600 hover:text-ocean text-sm font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('availability')}
            className="bg-gold text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#c49a3c] transition-colors"
          >
            Check Availability
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { scrollTo(l.id); setMenuOpen(false) }}
              className="block w-full text-left py-3 text-gray-700 hover:text-ocean font-medium border-b border-gray-50 text-sm"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo('availability'); setMenuOpen(false) }}
            className="mt-3 w-full bg-gold text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c49a3c] transition-colors"
          >
            Check Availability
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://a0.muscache.com/im/pictures/miso/Hosting-983307579255396282/original/4087f40b-4824-490b-804a-008e9b8b304c.jpeg)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-4">
        <h1 className="font-serif text-5xl md:text-7xl text-white font-bold text-shadow leading-tight">
          Casa Pacífico Mazatlán
        </h1>
        <p className="italic font-serif text-gold text-xl md:text-2xl mt-2 text-shadow">
          Where the Pacific Meets Home
        </p>
        <p className="text-white/80 text-lg mt-4 text-shadow max-w-2xl">
          Oceanfront Villa for 14 · Private Pool · Malecón Views · Daily Housekeeping
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => scrollTo('availability')}
            className="bg-gold text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-[#c49a3c] transition-colors"
          >
            Check Availability
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors"
          >
            View Gallery
          </button>
        </div>
      </div>

      {/* Scroll Arrow */}
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
  const stats = [
    { icon: '🏠', value: '4,000 Sq Ft', label: 'Living Space' },
    { icon: '🛏️', value: '6 Bedrooms', label: 'All Configured' },
    { icon: '👥', value: 'Sleeps 14', label: 'Guests' },
    { icon: '🏊', value: 'Private Pool', label: 'Exclusive Use' },
    { icon: '🧹', value: 'Daily Housekeeping', label: 'Mon–Fri' },
  ]

  return (
    <section id="highlights" className="bg-ocean text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center divide-x divide-white/20">
          {stats.map((s, i) => (
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
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-4">The Property</p>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            Your Pacific Home Base in Mazatlán
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Casa Pacífico is a beautifully renovated 4,000 square foot villa perched just one minute from Mazatlán's legendary Malecón — one of the longest oceanfront promenades in the world. From your private terrace, you'll wake up to the sound of the Pacific and spend evenings watching the sun melt into the horizon.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The villa comfortably sleeps 14 guests across six thoughtfully appointed bedrooms, including two primary suites with ensuite bathrooms. The private pool, full gourmet kitchen, and spacious indoor-outdoor living areas make it the perfect base for family reunions, friend getaways, and destination celebrations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our dedicated housekeeping team keeps the property impeccable Monday through Friday, so you can focus on making memories. Whether you're exploring the historic Centro Histórico, dining at award-winning seafood restaurants, or simply lounging poolside with a cold chelada, Casa Pacífico is your home away from home.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-ocean/10 text-ocean border border-ocean/20 rounded-full px-4 py-1 text-sm font-medium">
              Rated 4.92★ on Airbnb
            </span>
            <span className="bg-ocean/10 text-ocean border border-ocean/20 rounded-full px-4 py-1 text-sm font-medium">
              10/10 on VRBO
            </span>
          </div>
        </div>

        {/* Right */}
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
  return (
    <section id="bedrooms" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">Accommodations</p>
          <h2 className="font-serif text-4xl text-ocean">Sleep in Comfort — All 6 Bedrooms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEDROOMS.map(room => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={room.img}
                alt={room.name}
                loading="lazy"
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-serif text-xl text-ocean font-semibold">{room.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{room.bed}</p>
                {room.note && (
                  <p className="text-gold text-xs font-semibold uppercase tracking-wide mt-2">{room.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Amenities ────────────────────────────────────────────────────────────────

function Amenities() {
  return (
    <section id="amenities" className="py-20 bg-[#f0ede6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">What's Included</p>
          <h2 className="font-serif text-4xl text-ocean">Everything You Need, Nothing You Don't</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AMENITIES.map((a, i) => (
            <div key={i} className="bg-white rounded-xl p-5 flex items-start gap-3 shadow-sm">
              <span className="text-2xl flex-shrink-0">{a.icon}</span>
              <span className="text-gray-700 text-sm font-medium leading-snug">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prev = () => setCurrentIndex(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setCurrentIndex(i => (i + 1) % GALLERY.length)

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen])

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  // Grid cell class helper
  const cellClass = (index) => {
    if (index === 0) return 'col-span-2 row-span-2'
    if (index === 4 || index === 8) return 'col-span-2'
    return ''
  }

  return (
    <section id="gallery" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">Gallery</p>
          <h2 className="font-serif text-4xl text-ocean">Casa Pacífico in Photos</h2>
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
                alt={`Casa Pacífico photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Image */}
          <img
            src={GALLERY[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
          />

          {/* Close */}
          <button
            className="fixed top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Next photo"
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
  return (
    <section id="location" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="mb-12 lg:mb-0">
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-4">Location</p>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            Steps from Everything Mazatlán
          </h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🚶</span>
              <span><strong className="text-ocean">1 minute</strong> to the Malecón — Mazatlán's iconic 21 km oceanfront promenade</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🏖️</span>
              <span><strong className="text-ocean">7 minutes</strong> to the nearest beach — Playa Olas Altas &amp; Playa Norte</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🏛️</span>
              <span><strong className="text-ocean">10 minutes</strong> to Centro Histórico &amp; the beautiful Angela Peralta Theater</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">✈️</span>
              <span><strong className="text-ocean">20 minutes</strong> from Mazatlán International Airport (MZT)</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Situated in the heart of Mazatlán's vibrant zona histórica, Casa Pacífico puts you within easy reach of the city's best restaurants, seafood markets, art galleries, and nightlife. Walk to sunsets on the Malecón, hire a pulmonia (Mazatlán's iconic open-air taxi) to explore, or simply relax poolside — the choice is yours.
          </p>
        </div>

        {/* Right: Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Casa Pacífico Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7443.610822020648!2d-106.43338552346808!3d23.22884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53001dd27543%3A0x8c7b228da29fee6e!2sMazatl%C3%A1n%20Malecon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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
  return (
    <section id="availability" className="py-20 bg-ocean text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl text-white leading-snug">
          Check Availability &amp; Book Direct
        </h2>
        <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
          Booking direct saves you up to 15% compared to platform fees. Same property, better price.
        </p>

        {/* Placeholder Calendar */}
        <div className="mt-10 border border-white/20 rounded-2xl p-12 text-center bg-white/5">
          <div className="text-5xl">📅</div>
          <h3 className="text-white text-xl font-semibold mt-4">Live availability calendar coming soon</h3>
          <p className="text-white/60 mt-2">
            Contact us below to check your dates — we typically respond within a few hours.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
          >
            Inquire About Dates
          </button>
          <a
            href="https://www.airbnb.com/rooms/983307579255396282"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            View on Airbnb
          </a>
          <a
            href="https://www.vrbo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            View on VRBO
          </a>
        </div>

        <p className="text-white/50 text-sm mt-6">★ 4.92 on Airbnb · 10/10 on VRBO · Superhost</p>
      </div>
    </section>
  )
}

// ─── InquiryForm ──────────────────────────────────────────────────────────────

function InquiryForm() {
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
    if (!form.firstName.trim()) errs.firstName = 'First name is required.'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.checkIn) errs.checkIn = 'Check-in date is required.'
    if (!form.checkOut) errs.checkOut = 'Check-out date is required.'
    if (!form.guests) errs.guests = 'Please select number of guests.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const inputClass = (field) =>
    `w-full border ${errors[field] ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean text-gray-700 text-sm`

  const labelClass = 'text-sm font-medium text-gray-700 mb-1 block'

  return (
    <section id="contact" className="py-20 bg-[#f0ede6]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-2">
          <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">Contact</p>
          <h2 className="font-serif text-4xl text-ocean">Plan Your Stay at Casa Pacífico</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-3xl font-bold">✓</span>
              </div>
              <h3 className="font-serif text-2xl text-ocean font-semibold mb-2">Thank you!</h3>
              <p className="text-gray-600">Rodrigo will be in touch within a few hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className={labelClass} htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass('firstName')}
                    placeholder="Maria"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className={labelClass} htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass('lastName')}
                    placeholder="García"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                    placeholder="maria@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Check-in */}
                <div>
                  <label className={labelClass} htmlFor="checkIn">Check-in Date</label>
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={form.checkIn}
                    onChange={handleChange}
                    className={inputClass('checkIn')}
                  />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                </div>

                {/* Check-out */}
                <div>
                  <label className={labelClass} htmlFor="checkOut">Check-out Date</label>
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={form.checkOut}
                    onChange={handleChange}
                    className={inputClass('checkOut')}
                  />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                </div>

                {/* Guests */}
                <div>
                  <label className={labelClass} htmlFor="guests">Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputClass('guests')}
                  >
                    <option value="">Select guests</option>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                </div>

                {/* Source */}
                <div>
                  <label className={labelClass} htmlFor="source">How did you hear about us?</label>
                  <select
                    id="source"
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className={inputClass('source')}
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="vrbo">VRBO</option>
                    <option value="referral">Referred by a friend</option>
                    <option value="social">Social media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass('message')}
                    placeholder="Tell us about your group, any special requests, or questions you have..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-gold hover:bg-[#c49a3c] text-white font-semibold py-4 rounded-lg text-lg transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-ocean text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left */}
          <div>
            <div className="font-serif text-xl text-gold">Casa Pacífico</div>
            <div className="text-white/60 text-sm mt-1">Mazatlán, Sinaloa, Mexico</div>
            <div className="text-white/40 text-xs mt-2">Where the Pacific Meets Home</div>
          </div>

          {/* Center */}
          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">Quick Links</div>
            <ul className="space-y-2">
              {[
                { label: 'About', id: 'about' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Amenities', id: 'amenities' },
                { label: 'Contact', id: 'contact' },
              ].map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-white/70 hover:text-gold text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">Also find us on</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.airbnb.com/rooms/983307579255396282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  Airbnb
                </a>
              </li>
              <li>
                <a
                  href="https://www.vrbo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold text-sm transition-colors"
                >
                  VRBO
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-xs">
          © 2025 Casa Pacífico Mazatlán. All rights reserved. | Site by{' '}
          <a href="#" className="text-white/60 hover:text-gold transition-colors">Local Boost AI</a>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <HighlightsBar />
      <About />
      <Bedrooms />
      <Amenities />
      <Gallery />
      <Location />
      <Availability />
      <InquiryForm />
      <Footer />
    </div>
  )
}
