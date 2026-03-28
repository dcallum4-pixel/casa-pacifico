import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { posts } from '../data/posts.js'

const CATEGORY_COLORS = {
  'Travel Tips':       'bg-blue-50 text-blue-700',
  'Food & Dining':     'bg-orange-50 text-orange-700',
  'Events & Festivals':'bg-purple-50 text-purple-700',
  'Family Travel':     'bg-green-50 text-green-700',
  'Booking Tips':      'bg-gold/10 text-yellow-800',
}

export default function Blog() {
  useEffect(() => {
    document.title = 'Mazatlán Travel Guide — Tips & Articles | Casa Pacífico'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="font-sans bg-warm-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-ocean text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gold tracking-widest text-sm font-semibold uppercase mb-3">Mazatlán Travel Blog</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Your Mazatlán Travel Guide
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Tips, guides, and local knowledge from your hosts at Casa Pacífico
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
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

                    <h2 className="font-serif text-xl text-ocean font-semibold leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-400 text-xs">{post.published}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-ocean font-semibold text-sm hover:text-gold transition-colors flex items-center gap-1"
                      >
                        Read Article
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-[#f0ede6] py-14 px-4 text-center">
          <h2 className="font-serif text-2xl text-ocean mb-3">
            Ready to visit Mazatlán?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Casa Pacífico sleeps 14 — the ideal base for exploring everything you have just read about.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
          >
            Inquire About Availability
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
