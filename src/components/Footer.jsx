import { Link, useLocation } from 'react-router-dom'
import { useT } from '../context/LanguageContext.jsx'

const PROPERTY_SECTION_IDS = ['about', 'gallery', 'amenities', 'reviews', 'faq', 'contact']
const EXPLORE_SLUGS = [
  '/events',
  '/blog',
  '/blog/best-time-to-visit-mazatlan',
  '/blog/top-restaurants-near-malecon-mazatlan',
  '/blog/mazatlan-with-kids-family-travel-guide',
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const t = useT().footer

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
            <div className="text-white/60 text-sm mt-1">{t.location}</div>
            <div className="text-white/40 text-xs mt-2">{t.tagline}</div>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">{t.theProperty}</div>
            <ul className="space-y-2">
              {PROPERTY_SECTION_IDS.map((id, i) => (
                <li key={id}>
                  <FooterSectionLink id={id} label={t.propertyLinks[i]} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">{t.explore}</div>
            <ul className="space-y-2">
              {EXPLORE_SLUGS.map((slug, i) => (
                <li key={slug}>
                  <Link to={slug} className="text-white/70 hover:text-gold text-sm transition-colors">
                    {t.exploreLinks[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest mb-3">{t.alsoFindUs}</div>
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
          {t.copyright} | {t.siteBy}{' '}
          <a href="#" className="text-white/60 hover:text-gold transition-colors">Local Boost AI</a>
        </div>
      </div>
    </footer>
  )
}
