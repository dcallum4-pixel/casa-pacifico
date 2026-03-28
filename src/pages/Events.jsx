import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const EVENTS = [
  {
    name: 'High Season Peak',
    category: 'Seasonal',
    dates: 'January – April',
    season: 'peak',
    description: 'Perfect weather, peak crowds, and the best time to visit Mazatlán. Daytime highs of 24–28°C, calm Pacific waters, and the city fully alive with visitors from across North America and Mexico.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Mazatlán International Carnival',
    category: 'Festivals',
    dates: 'February (varies)',
    season: 'peak',
    description: 'Third largest Mardi Gras in the world since 1898. Six days of parades along the Malecón, the Naval Combat fireworks show over the bay, coronations of the Queen and King of Joy, live concerts, and 500,000+ attendees. Book six months ahead.',
    link: 'https://carnavalmazatlan.com/en/',
  },
  {
    name: 'Semana Santa (Holy Week)',
    category: 'Festivals',
    dates: 'March or April',
    season: 'peak',
    description: "Mexico's biggest beach week. Beaches fill with families from across the country, volleyball tournaments run along the shoreline, outdoor concerts fill Plaza Machado, and the entire city takes on a festive, holiday energy.",
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'International Motorcycle Week',
    category: 'Festivals',
    dates: 'Late April',
    season: 'peak',
    description: 'Thousands of riders from around the world converge on Mazatlán for one of the Americas\' largest motorcycle events. Parades along the Malecón, stunt shows, bike expos, and evening concerts. Spectacular even for non-riders.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Mazatlán Pride Parade',
    category: 'Culture',
    dates: 'June 21',
    season: 'shoulder',
    description: 'Annual Pride parade along the Malecón from Paseo Claussen to Punto Valentino. Free and all ages welcome. The Malecón closes to traffic at 4pm as the parade begins at sunset over the Pacific.',
    link: 'https://mazatlanvisit.com/mazatlan-events-calendar.html',
  },
  {
    name: 'Mexican Independence Day',
    category: 'Culture',
    dates: 'September 15–16',
    season: 'shoulder',
    description: 'El Grito ceremony at Plaza República on the 15th with the Mayor, fireworks, music, and dancing until midnight. Military parade and civic ceremony down the Malecón on the 16th. One of the most authentically Mexican experiences in Mazatlán.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Festival Cultural Mazatlán',
    category: 'Culture',
    dates: 'October – December',
    season: 'shoulder',
    description: 'Three months of world-class musicians, contemporary dance companies, theater, art exhibitions, and film screenings centered on the Angela Peralta Theater and venues across the city. Many events are free or low cost.',
    link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d558218-Reviews-Angela_Peralta_Theater-Mazatlan_Pacific_Coast.html',
  },
  {
    name: 'Day of the Dead',
    category: 'Culture',
    dates: 'November 1–2',
    season: 'peak',
    description: 'Candlelit processions through the historic center, intricate ofrendas honoring loved ones, a major parade from Plaza Machado at 8pm with brass bands, traditional dancers, and thousands in Catrina costumes. One of the most beautiful events in all of Mexico.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Gran Maratón Pacífico',
    category: 'Sports',
    dates: 'Late November',
    season: 'peak',
    description: 'International marathon certified by AIMS and IAAF. Scenic Malecón route with distances from 5K to the full 42.195K marathon. Athletes from across North America and Mexico. Spectators line the Malecón to cheer runners on.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Historic Old Town ArtWalk',
    category: 'Culture',
    dates: 'November – April',
    season: 'peak',
    description: 'Free self-guided gallery walk through the Historic Center. Browse and purchase local art, photography, indigenous crafts, and contemporary painting at dozens of studios and galleries. Maps available at any participating gallery.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
  {
    name: 'Peak Holiday Season',
    category: 'Seasonal',
    dates: 'December – January',
    season: 'peak',
    description: 'Perfect weather, holiday atmosphere, and Christmas and New Year\'s celebrations throughout the city. Casa Pacífico is ideal for large family holiday gatherings — book months ahead as the villa fills up for December and January.',
    link: 'https://mazatlanvisit.com/mazatlan-events.html',
  },
]

const FILTERS = ['All', 'Festivals', 'Culture', 'Sports', 'Nightlife', 'Seasonal']

const SEASON_BADGE = {
  peak:     'bg-gold/20 text-yellow-800',
  shoulder: 'bg-teal-50 text-teal-700',
}

const SEASON_LABEL = {
  peak:     'Peak Season',
  shoulder: 'Shoulder Season',
}

const SOURCES = [
  { label: 'Mazatlán Events Calendar',    link: 'https://mazatlanvisit.com/mazatlan-events-calendar.html' },
  { label: 'Official Mazatlán Carnival',  link: 'https://carnavalmazatlan.com/en/' },
  { label: 'Mazatlán on TripAdvisor',     link: 'https://www.tripadvisor.com/Tourism-g150792-Mazatlan_Pacific_Coast-Vacations.html' },
  { label: 'Mazatlán Restaurant Guide',   link: 'https://mazatlanvisit.com/mazatlan-restaurants.html' },
  { label: 'Angela Peralta Theater',      link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d558218-Reviews-Angela_Peralta_Theater-Mazatlan_Pacific_Coast.html' },
  { label: 'Malecón de Mazatlán',         link: 'https://www.tripadvisor.com/Attraction_Review-g150792-d278625-Reviews-Malecon_de_Mazatlan-Mazatlan_Pacific_Coast.html' },
]

export default function Events() {
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    document.title = 'Mazatlán Events & Festivals Calendar | Casa Pacífico'
    window.scrollTo(0, 0)
  }, [])

  const filtered = filter === 'All' ? EVENTS : EVENTS.filter(e => e.category === filter)

  return (
    <div className="font-sans bg-warm-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-ocean text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">Plan Your Visit</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Mazatlán Events &amp; Festivals
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
              Everything happening in Mazatlán — updated annually. Plan your Casa Pacífico stay around these unforgettable events.
            </p>
            <p className="text-white/40 text-xs">
              Sources:{' '}
              <a href="https://mazatlanvisit.com/mazatlan-events-calendar.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold transition-colors">mazatlanvisit.com</a>
              {' · '}
              <a href="https://carnavalmazatlan.com/en/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold transition-colors">carnavalmazatlan.com</a>
              {' · '}
              <a href="https://www.tripadvisor.com/Tourism-g150792-Mazatlan_Pacific_Coast-Vacations.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold transition-colors">tripadvisor.com</a>
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <div className="sticky top-[61px] z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-ocean text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No events in this category yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <div className="p-6 flex flex-col flex-1">
                      {/* Season badge + category */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${SEASON_BADGE[event.season]}`}>
                          {SEASON_LABEL[event.season]}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{event.category}</span>
                      </div>

                      <h3 className="font-serif text-lg text-ocean font-semibold leading-snug mb-1">
                        {event.name}
                      </h3>
                      <p className="text-gold text-xs font-semibold mb-3">{event.dates}</p>

                      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-3 mt-auto flex-wrap">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ocean font-semibold hover:text-gold transition-colors flex items-center gap-1"
                        >
                          Learn More
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <a
                          href="/#contact"
                          className="text-sm bg-gold/10 text-yellow-800 font-semibold px-4 py-1.5 rounded-full hover:bg-gold/20 transition-colors"
                        >
                          Book for This Event
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Sources section */}
        <section className="py-14 px-4 bg-[#f0ede6]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl text-ocean font-semibold mb-2 text-center">
              Sources &amp; Further Reading
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              All event information is drawn from these official and trusted sources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOURCES.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group"
                >
                  <span className="text-ocean text-sm font-medium group-hover:text-gold transition-colors leading-snug">
                    {s.label}
                  </span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-ocean py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
              Planning your trip around one of these events?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Casa Pacífico books up fast during Carnival and peak season — inquire early to secure your dates.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#contact"
                className="bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
              >
                Check Availability
              </a>
              <a
                href="https://www.airbnb.com/rooms/983307579255396282"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View on Airbnb
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
