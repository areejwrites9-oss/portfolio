import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ChatShowcase from './components/ChatShowcase'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'


const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [demo, setDemo] = useState('areej')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const tryDemo = (which) => {
    setDemo(which)
    document.getElementById('chatbots')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero onOpenChat={() => setWidgetOpen(true)} />
        <About />
        <Skills />
        <Projects onTryDemo={tryDemo} />
        <ChatShowcase active={demo} setActive={setDemo} />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatWidget open={widgetOpen} setOpen={setWidgetOpen} />
    </>
  )
}
