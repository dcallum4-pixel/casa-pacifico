import { Link, useLocation } from 'react-router-dom'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  function FooterSectionLink({ id, label }) {
    if (isHome) {
      return (
        <button onClick={() => scrollTo(id)} className="text-white/70 hover:text-gold text-sm transition-colors">
          {label}
        </button>
      )
    }
    return (
      <a href={`/#${id}`} className="text-white/70 hover:text-gold text-sm transition-colors">
        {label}
      </a>
    )
  }

  return (
    <footer className="bg-ocean text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <div className="font-serif text-xl text-gold">Casa Pacífico</div>
            <div className="text-white/60 text-sm mt-1">Mazatlán, Sinaloa, Mexico</div>
            <div className="text-white/40 text-xs mt-2">Where the Pacific Meets Home</div>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">The Property</div>
            <ul className="space-y-2">
              {[
                { label: 'About',     id: 'about' },
                { label: 'Gallery',   id: 'gallery' },
                { label: 'Amenities', id: 'amenities' },
                { label: 'Reviews',   id: 'reviews' },
                { label: 'FAQ',       id: 'faq' },
                { label: 'Contact',   id: 'contact' },
              ].map(l => (
                <li key={l.id}>
                  <FooterSectionLink id={l.id} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">Explore</div>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-white/70 hover:text-gold text-sm transition-colors">
                  Events &amp; Festivals
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-gold text-sm transition-colors">
                  Mazatlán Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/best-time-to-visit-mazatlan" className="text-white/70 hover:text-gold text-sm transition-colors">
                  Best Time to Visit
                </Link>
              </li>
              <li>
                <Link to="/blog/top-restaurants-near-malecon-mazatlan" className="text-white/70 hover:text-gold text-sm transition-colors">
                  Best Restaurants
                </Link>
              </li>
              <li>
                <Link to="/blog/mazatlan-with-kids-family-travel-guide" className="text-white/70 hover:text-gold text-sm transition-colors">
                  Family Travel Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">Also Find Us On</div>
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
                  href="https://www.vrbo.com/en-ca/cottage-rental/p3460030vb"
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

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-xs">
          © 2025 Casa Pacífico Mazatlán. All rights reserved. | Site by{' '}
          <a href="#" className="text-white/60 hover:text-gold transition-colors">Local Boost AI</a>
        </div>
      </div>
    </footer>
  )
}
