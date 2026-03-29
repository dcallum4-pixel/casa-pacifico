import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage, useT } from '../context/LanguageContext.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { lang, toggle } = useLanguage()
  const t = useT().navbar

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const sectionLinks = [
    { label: t.about,     id: 'about' },
    { label: t.bedrooms,  id: 'bedrooms' },
    { label: t.amenities, id: 'amenities' },
    { label: t.gallery,   id: 'gallery' },
    { label: t.reviews,   id: 'reviews' },
    { label: t.location,  id: 'location' },
    { label: t.faq,       id: 'faq' },
    { label: t.contact,   id: 'contact' },
  ]

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

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

  function CtaBtn({ mobile }) {
    const cls = mobile
      ? 'mt-3 w-full bg-gold text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c49a3c] transition-colors block text-center'
      : 'bg-gold text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#c49a3c] transition-colors'
    if (isHome) {
      return (
        <button className={cls} onClick={() => { scrollTo('availability'); if (mobile) setMenuOpen(false) }}>
          {t.cta}
        </button>
      )
    }
    return (
      <a href="/#availability" className={cls} onClick={() => mobile && setMenuOpen(false)}>
        {t.cta}
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
            {t.events}
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-ocean font-semibold' : 'text-gray-600 hover:text-ocean'}`}
          >
            {t.blog}
          </Link>
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-ocean transition-colors border border-gray-200 rounded-md px-2.5 py-1 hover:border-ocean/40"
            aria-label={lang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8"/>
              <path d="M12 2a14.5 14.5 0 010 20M12 2a14.5 14.5 0 000 20M2 12h20" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {t.langSwitch}
          </button>
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
            {t.events}
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left py-3 text-gray-700 hover:text-ocean font-medium border-b border-gray-50 text-sm"
          >
            {t.blog}
          </Link>
          {/* Mobile language toggle */}
          <button
            onClick={() => { toggle(); setMenuOpen(false) }}
            className="block w-full text-left py-3 text-gray-600 hover:text-ocean font-medium border-b border-gray-50 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8"/>
              <path d="M12 2a14.5 14.5 0 010 20M12 2a14.5 14.5 0 000 20M2 12h20" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {lang === 'en' ? 'Español' : 'English'}
          </button>
          <CtaBtn mobile />
        </div>
      )}
    </nav>
  )
}
