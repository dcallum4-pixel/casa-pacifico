import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { getPost, getRelatedPosts } from '../data/posts.js'

const CATEGORY_COLORS = {
  'Travel Tips':       'bg-blue-50 text-blue-700',
  'Food & Dining':     'bg-orange-50 text-orange-700',
  'Events & Festivals':'bg-purple-50 text-purple-700',
  'Family Travel':     'bg-green-50 text-green-700',
  'Booking Tips':      'bg-gold/10 text-yellow-800',
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-serif text-2xl text-ocean font-semibold mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p
          className="text-gray-700 leading-relaxed mb-4 [&_a]:text-ocean [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-gold [&_a]:transition-colors"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      )
    case 'tip':
      return (
        <div className="my-8 bg-gold/10 border-l-4 border-gold rounded-r-xl px-6 py-5">
          <div className="text-gold font-bold text-xs uppercase tracking-widest mb-2">Host Tip</div>
          <p className="text-gray-700 text-sm leading-relaxed">{block.text}</p>
        </div>
      )
    case 'cta':
      return (
        <div className="my-10 bg-ocean rounded-2xl p-8 text-center">
          <p className="text-white/80 mb-5 leading-relaxed">{block.text}</p>
          <a
            href={block.href}
            className="inline-block bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49a3c] transition-colors"
          >
            {block.label}
          </a>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    if (post) document.title = `${post.title} | Casa Pacífico Mazatlán`
    window.scrollTo(0, 0)
  }, [slug, post])

  if (!post) return <Navigate to="/blog" replace />

  const related = getRelatedPosts(post)

  return (
    <div className="font-sans bg-warm-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-ocean transition-colors">Home</Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-ocean transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 pt-2 pb-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-ocean text-sm font-medium hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 pb-16">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                {post.category}
              </span>
              <span className="text-gray-400 text-xs">{post.readTime} read</span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-gray-400 text-xs">{post.published}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-ocean font-bold leading-snug mb-4">
              {post.title}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-gold/40 pl-4">
              {post.excerpt}
            </p>
          </header>

          <hr className="border-gray-200 mb-8" />

          {/* Body */}
          <div className="prose-custom">
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#f0ede6] py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl text-ocean font-semibold mb-8 text-center">
                More From the Blog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
                  >
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${CATEGORY_COLORS[r.category] || 'bg-gray-100 text-gray-600'}`}>
                      {r.category}
                    </span>
                    <h3 className="font-serif text-lg text-ocean font-semibold leading-snug">{r.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{r.excerpt}</p>
                    <span className="text-ocean text-sm font-semibold mt-1">Read Article →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
