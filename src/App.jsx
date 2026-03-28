import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { posts } from './data/posts.js'

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const FAQS = [
  {
    q: 'What is the maximum occupancy?',
    a: 'Casa Pacífico comfortably sleeps 14 guests across 6 bedrooms. We have 4 king beds, 2 queen beds, a pull-out sofa, and 2 air mattresses. The property is well suited for large families or multi-family groups.',
  },
  {
    q: 'Is the pool private?',
    a: 'Yes, the pool is entirely private to your group. It is not shared with any other guests or neighbors.',
  },
  {
    q: 'What does daily housekeeping include?',
    a: 'Monday through Friday, our housekeeping team visits to tidy common areas, refresh linens, empty bins, and ensure the property is spotless. It is included in your stay at no extra charge.',
  },
  {
    q: 'How close is the beach?',
    a: 'Olas Altas Beach is approximately a 7 minute walk from the front door. The Malecón waterfront promenade is literally 1 minute away and has beach access points along its length.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, parking is available at the property for your group\'s vehicles.',
  },
  {
    q: 'What is the check-in and check-out time?',
    a: 'Check-in is from 4:00 PM. Check-out is by 11:00 AM. Early check-in or late check-out may be available upon request — just ask us when you inquire.',
  },
  {
    q: 'Can we book direct instead of through Airbnb or VRBO?',
    a: 'Absolutely — and we encourage it. Booking direct saves you the platform service fees (which can be 14-16% on top of the nightly rate) and allows us to offer repeat guests a 10% loyalty discount. Use the inquiry form on this page to get started.',
  },
  {
    q: 'Is the property suitable for children?',
    a: 'Yes, families with children are very welcome. The property has a pool, spacious garden areas, and plenty of room for kids to play safely. Please note the pool does not have a safety fence, so adult supervision is required at all times.',
  },
  {
    q: 'What airports serve Mazatlán?',
    a: 'General Rafael Buelna International Airport (MZT) is approximately 30 minutes by car from Casa Pacífico. Several US and Canadian cities have direct flights.',
  },
  {
    q: 'How do I book or check availability?',
    a: 'Use the inquiry form on this page or click the Check Availability button. Rodrigo responds within a few hours and will confirm dates, pricing, and next steps for direct booking.',
  },
]

const LOCAL_GUIDE = [
  {
    icon: '🏖',
    category: 'Beaches',
    items: [
      { name: 'Olas Altas Beach', time: '7 min walk' },
      { name: 'Playa Norte', time: '12 min walk' },
      { name: 'Playa Gaviotas (Zona Dorada)', time: '15 min drive' },
    ],
  },
  {
    icon: '🍽',
    category: 'Dining & Nightlife',
    items: [
      { name: 'Plaza Machado restaurants', time: '10 min walk' },
      { name: 'El Presidio restaurant', time: '8 min walk' },
      { name: 'Zona Dorada dining strip', time: '15 min drive' },
    ],
  },
  {
    icon: '🎭',
    category: 'Culture & Attractions',
    items: [
      { name: 'Malecón waterfront promenade', time: '1 min walk' },
      { name: 'Angela Peralta Theater', time: '12 min walk' },
      { name: 'Mazatlán Cathedral', time: '15 min walk' },
      { name: 'El Clavadista cliff divers', time: '5 min walk' },
    ],
  },
  {
    icon: '🛍',
    category: 'Shopping & Essentials',
    items: [
      { name: 'Mercado Pino Suárez', time: '10 min walk' },
      { name: 'Zona Dorada shopping', time: '15 min drive' },
      { name: 'Local convenience stores', time: '2 min walk' },
    ],
  },
  {
    icon: '✈️',
    category: 'Getting Here',
    items: [
      { name: 'General Rafael Buelna Airport', time: '30 min drive' },
      { name: 'Mazatlán ferry terminal', time: '20 min drive' },
    ],
  },
]

const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7443.610822020648!2d-106.43338552346808!3d23.22884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f53001dd27543%3A0x8c7b228da29fee6e!2sMazatl%C3%A1n%20Malecon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Fade-in-up on scroll into view
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

// Section label pill
function SectionLabel({ children }) {
  return (
    <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">{children}</p>
  )
}

// ─── (Navbar imported from ./components/Navbar.jsx) ──────────────────────────

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
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
        <div>
          <SectionLabel>The Property</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            Your Pacific Home Base in Mazatlán
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Casa Pacífico is Mazatlán's premier large-group villa — a fully renovated 4,000 square foot residence sitting one minute from the iconic Malecón waterfront promenade. With six bedrooms, four and a half baths, a private pool, and sweeping Pacific Ocean views from the balcony, terrace, and garden, this is the kind of property that turns a vacation into a family tradition.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The home comfortably sleeps 14 across four king bedrooms, two queen bedrooms, a pull-out sofa, and two air mattresses — with two primary suites each featuring their own ensuite bathroom for added privacy. A fully equipped kitchen, dining table for eight, kitchen island seating for three, and a dedicated bar area make it easy to host everyone under one roof.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Included Monday through Friday housekeeping means the only thing on your agenda is enjoying the Pacific. Olas Altas Beach is a seven-minute walk. Plaza Machado, Mazatlán's best dining and nightlife square, is ten minutes on foot.
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
          <SectionLabel>Accommodations</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">Sleep in Comfort — All 6 Bedrooms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEDROOMS.map(room => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={room.img} alt={room.name} loading="lazy" className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-serif text-xl text-ocean font-semibold">{room.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{room.bed}</p>
                {room.note && <p className="text-gold text-xs font-semibold uppercase tracking-wide mt-2">{room.note}</p>}
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
          <SectionLabel>What's Included</SectionLabel>
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
    if (index === 0)            return 'col-span-2 row-span-2'
    if (index === 4 || index === 8) return 'col-span-2'
    return ''
  }

  return (
    <section id="gallery" className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Gallery</SectionLabel>
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Image with fade-in on change */}
          <img
            key={imgKey}
            src={GALLERY[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain animate-fade-in"
            onClick={e => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
            {currentIndex + 1} / {GALLERY.length}
          </div>

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
        <div className="mb-12 lg:mb-0">
          <SectionLabel>Location</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean leading-snug mb-6">
            Steps from Everything Mazatlán
          </h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🚶</span>
              <span><strong className="text-ocean">1 minute</strong> — Malecón waterfront promenade</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🏖️</span>
              <span><strong className="text-ocean">7 minutes</strong> — Olas Altas Beach</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">🍽️</span>
              <span><strong className="text-ocean">10 minutes</strong> — Plaza Machado dining &amp; nightlife</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="text-xl">✈️</span>
              <span><strong className="text-ocean">30 minutes</strong> — General Rafael Buelna Airport</span>
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Casa Pacífico sits in the heart of Mazatlán's historic coastline, putting the city's best beaches, restaurants, and cultural landmarks within easy walking distance.
          </p>
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
  return (
    <section id="availability" className="py-20 bg-ocean text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl text-white leading-snug">
          Check Availability &amp; Book Direct
        </h2>
        <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
          Booking direct saves you up to 15% compared to platform fees. Same property, better price.
        </p>

        <div className="mt-10 border border-white/20 rounded-2xl p-12 text-center bg-white/5">
          <div className="text-5xl">📅</div>
          <h3 className="text-white text-xl font-semibold mt-4">Live availability calendar coming soon</h3>
          <p className="text-white/60 mt-2">
            Contact us below to check your dates — we typically respond within a few hours.
          </p>
        </div>

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
            href="https://www.vrbo.com/en-ca/cottage-rental/p3460030vb"
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

// ─── Why Book Direct ──────────────────────────────────────────────────────────

function WhyBookDirect() {
  const platform = [
    'Airbnb / VRBO service fees: up to 14%',
    'Guest service fees: up to 16%',
    'Limited direct communication',
    'No repeat guest discounts',
    'Total extra cost on $3,000 stay: ~$450+',
  ]
  const direct = [
    'Zero platform fees',
    'Direct communication with host',
    'Repeat guest discount: 10% off',
    'Flexible payment options',
    'Total savings on $3,000 stay: ~$450+',
  ]

  return (
    <section id="book-direct" className="py-20 bg-ocean">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Save More</SectionLabel>
          <h2 className="font-serif text-4xl text-white">Why Book Direct with Us?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Platform card */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">Booking via Platform</div>
            <ul className="space-y-4">
              {platform.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span className={`text-sm ${i === platform.length - 1 ? 'text-white font-semibold' : 'text-white/60'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book direct card */}
          <div className="bg-gold/15 border-2 border-gold rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
              Recommended
            </div>
            <div className="text-gold text-xs uppercase tracking-widest font-semibold mb-5">Book Direct</div>
            <ul className="space-y-4">
              {direct.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                  <span className={`text-sm ${i === direct.length - 1 ? 'text-white font-semibold' : 'text-white/80'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="font-serif text-2xl md:text-3xl text-white mb-8">
            Same villa. Same dates. <span className="text-gold">Better price.</span>
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#c49a3c] transition-colors"
          >
            Inquire Now &amp; Save
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function Reviews() {
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
          <SectionLabel>Guest Reviews</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">What Our Guests Say</h2>
          <p className="text-gray-500 mt-3">4.92★ on Airbnb · 10/10 on VRBO · 25+ verified stays</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Review card — key forces remount + animation on change */}
          <div
            key={current}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 animate-fade-in-up"
          >
            {/* Stars */}
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

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-ocean text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-ocean/80 transition-colors"
            aria-label="Previous review"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-ocean text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-ocean/80 transition-colors"
            aria-label="Next review"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
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
  return (
    <section id="area-guide" className="py-20 bg-[#f0ede6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Explore</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">Explore Mazatlán — Everything at Your Doorstep</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Casa Pacífico puts the best of Mazatlán within easy walking distance
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Categories list */}
          <div className="space-y-8 mb-12 lg:mb-0">
            {LOCAL_GUIDE.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-serif text-lg text-ocean font-semibold mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.category}</span>
                </h3>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="text-gray-700 text-sm">{item.name}</span>
                      <span className="text-ocean text-xs font-semibold bg-ocean/10 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Map */}
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
  const cards = [
    {
      icon: '🔑',
      title: 'Check-in Details',
      desc: 'Step by step arrival instructions and door codes sent 48 hours before your stay',
    },
    {
      icon: '📶',
      title: 'WiFi & Tech',
      desc: 'Network names, passwords, and smart TV setup guides for every room',
    },
    {
      icon: '🏠',
      title: 'House Manual',
      desc: 'Appliance guides, house rules, emergency contacts, and local tips',
    },
    {
      icon: '🗺️',
      title: 'Insider Recommendations',
      desc: "Rodrigo's personal guide to the best restaurants, beaches, and hidden gems in Mazatlán",
    },
  ]

  return (
    <section id="house-guide" className="py-20 bg-ocean">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <SectionLabel>For Guests</SectionLabel>
        <h2 className="font-serif text-4xl text-white mb-4">
          Everything You Need to Know — Before You Arrive
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">
          Guests receive our complete digital welcome guide upon booking
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
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

        <p className="text-white/40 text-sm mt-10">
          Full guide delivered via email upon confirmed booking
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Questions</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
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
          <p className="text-gray-500 text-sm mb-4">Still have a question?</p>
          <button
            onClick={() => scrollTo('contact')}
            className="bg-ocean text-white px-8 py-3 rounded-lg font-semibold hover:bg-ocean/80 transition-colors text-sm"
          >
            Ask Rodrigo Directly
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────

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
    if (!form.lastName.trim())  errs.lastName  = 'Last name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.checkIn)  errs.checkIn  = 'Check-in date is required.'
    if (!form.checkOut) errs.checkOut = 'Check-out date is required.'
    if (!form.guests)   errs.guests   = 'Please select number of guests.'
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
          <SectionLabel>Contact</SectionLabel>
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
                <div>
                  <label className={labelClass} htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} className={inputClass('firstName')} placeholder="Maria" />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} className={inputClass('lastName')} placeholder="García" />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder="maria@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className={labelClass} htmlFor="checkIn">Check-in Date</label>
                  <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className={inputClass('checkIn')} />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="checkOut">Check-out Date</label>
                  <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className={inputClass('checkOut')} />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="guests">Number of Guests</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange} className={inputClass('guests')}>
                    <option value="">Select guests</option>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="source">How did you hear about us?</label>
                  <select id="source" name="source" value={form.source} onChange={handleChange} className={inputClass('source')}>
                    <option value="">Select an option</option>
                    <option value="google">Google</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="vrbo">VRBO</option>
                    <option value="referral">Referred by a friend</option>
                    <option value="social">Social media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="message">Message / Special Requests</label>
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

// ─── Newsletter ───────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setSent(true)
  }

  return (
    <section className="py-20 bg-[#f5e6c4]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">🌴</div>
        <h2 className="font-serif text-3xl md:text-4xl text-ocean mb-4">
          Get Our Free Mazatlán Insider Guide
        </h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Subscribe and we'll send you Rodrigo's personal guide to the best restaurants, beaches, sunset spots, and hidden gems in Mazatlán — plus exclusive direct booking rates.
        </p>

        {sent ? (
          <div className="bg-white rounded-2xl p-8 shadow-md inline-block">
            <div className="text-3xl mb-3">✉️</div>
            <p className="font-serif text-xl text-ocean font-semibold">Check your inbox!</p>
            <p className="text-gray-600 mt-1 text-sm">Your Mazatlán guide is on its way.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="Your email address"
                className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-[#c49a3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                Send My Guide
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        <p className="text-gray-500 text-xs mt-4">
          No spam. Unsubscribe anytime. Direct booking deals for subscribers only.
        </p>
      </div>
    </section>
  )
}

// ─── (Footer imported from ./components/Footer.jsx) ──────────────────────────

// ─── Events Teaser ────────────────────────────────────────────────────────────

function EventsTeaser() {
  return (
    <section className="bg-ocean py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-3">
          What's happening in Mazatlán?
        </h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">
          Browse our events calendar — plan your trip around Mazatlán's best festivals, markets, and cultural celebrations.
        </p>
        <Link
          to="/events"
          className="inline-block bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
        >
          View Events Calendar
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
  const featured = posts.slice(0, 3)

  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel>Mazatlán Travel Guide</SectionLabel>
          <h2 className="font-serif text-4xl text-ocean">Your Mazatlán Travel Guide</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Tips, guides, and local knowledge from your hosts at Casa Pacífico
          </p>
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
                  <span className="text-gray-400 text-xs">{post.readTime} read</span>
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
                  Read Article
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
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Floating: WhatsApp ───────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-40 group">
      <a
        href="https://wa.me/message"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rodrigo on WhatsApp"
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-ocean text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Chat with Rodrigo on WhatsApp
        </span>
        {/* Button */}
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
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div>
        <div className="text-xs text-gray-400">Starting from</div>
        <div className="font-serif text-ocean font-semibold text-lg">$XXX <span className="text-sm font-normal text-gray-500">/ night</span></div>
      </div>
      <button
        onClick={() => scrollTo('contact')}
        className="bg-gold hover:bg-[#c49a3c] text-white px-7 py-2.5 rounded-xl font-semibold text-sm transition-colors"
      >
        Book Now
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
