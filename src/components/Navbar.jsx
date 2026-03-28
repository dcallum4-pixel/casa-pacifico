import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const sectionLinks = [
    { label: 'About',     id: 'about' },
    { label: 'Bedrooms',  id: 'bedrooms' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Gallery',   id: 'gallery' },
    { label: 'Reviews',   id: 'reviews' },
    { label: 'Location',  id: 'location' },
    { label: 'FAQ',       id: 'faq' },
    { label: 'Contact',   id: 'contact' },
  ]

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Desktop section link: scroll on homepage, anchor on other pages
  function SectionBtn({ id, label }) {
    if (isHome) {
      return (
        <button
          onClick={() => scrollTo(id)}
          className="text-gray-600 hover:text-ocean text-sm font-medium transition-colors"
        >
          {label}
        </button>
      )
    }
    return (
      <a href={`/#${id}`} className="text-gray-600 hover:text-ocean text-sm font-medium transition-colors">
        {label}
      </a>
    )
  }

  // Mobile section link
  function MobileSectionLink({ id, label }) {
    const cls = 'block w-full text-left py-3 text-gray-700 hover:text-ocean font-medium border-b border-gray-50 text-sm'
    if (isHome) {
      return (
        <button className={cls} onClick={() => { scrollTo(id); setMenuOpen(false) }}>
          {label}
        </button>
      )
    }
    return (
      <a href={`/#${id}`} className={cls} onClick={() => setMenuOpen(false)}>
        {label}
      </a>
    )
  }

  // CTA button
  function CtaBtn({ mobile }) {
    const cls = mobile
      ? 'mt-3 w-full bg-gold text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c49a3c] transition-colors block text-center'
      : 'bg-gold text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#c49a3c] transition-colors'
    if (isHome) {
      return (
        <button className={cls} onClick={() => { scrollTo('availability'); if (mobile) setMenuOpen(false) }}>
          Check Availability
        </button>
      )
    }
    return (
      <a href="/#availability" className={cls} onClick={() => mobile && setMenuOpen(false)}>
        Check Availability
      </a>
    )
  }

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-left">
          <div className="font-serif text-ocean text-xl font-semibold">Casa Pacífico</div>
          <div className="text-xs tracking-widest text-gray-500 uppercase">Mazatlán</div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {sectionLinks.map(l => <SectionBtn key={l.id} id={l.id} label={l.label} />)}
          <Link
            to="/events"
            className={`text-sm font-medium transition-colors ${pathname === '/events' ? 'text-ocean font-semibold' : 'text-gray-600 hover:text-ocean'}`}
          >
            Events
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-ocean font-semibold' : 'text-gray-600 hover:text-ocean'}`}
          >
            Blog
          </Link>
          <CtaBtn />
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 max-h-[80vh] overflow-y-auto">
          {sectionLinks.map(l => <MobileSectionLink key={l.id} id={l.id} label={l.label} />)}
          <Link
            to="/events"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left py-3 text-gray-700 hover:text-ocean font-medium border-b border-gray-50 text-sm"
          >
            Events
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left py-3 text-gray-700 hover:text-ocean font-medium border-b border-gray-50 text-sm"
          >
            Blog
          </Link>
          <CtaBtn mobile />
        </div>
      )}
    </nav>
  )
}
