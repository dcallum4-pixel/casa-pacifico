import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'
import App from './App.jsx'

const Blog      = lazy(() => import('./pages/Blog.jsx'))
const BlogPost  = lazy(() => import('./pages/BlogPost.jsx'))
const Events    = lazy(() => import('./pages/Events.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Suspense fallback={<div className="min-h-screen bg-warm-white" />}>
          <Routes>
            <Route path="/"           element={<App />} />
            <Route path="/blog"       element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/events"     element={<Events />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
