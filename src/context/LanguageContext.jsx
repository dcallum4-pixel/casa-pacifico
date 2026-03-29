import { createContext, useContext, useState, useEffect } from 'react'
import en from '../translations/en.js'
import es from '../translations/es.js'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cp_lang') || 'en')

  const toggle = () => setLang(l => (l === 'en' ? 'es' : 'en'))

  useEffect(() => {
    localStorage.setItem('cp_lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useT() {
  const { lang } = useLanguage()
  return lang === 'es' ? es : en
}
