import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['work', 'Work'],
  ['chatbots', 'Chatbots'],
  ['experience', 'Journey'],
  ['contact', 'Contact'],
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo" aria-label="Back to top">
          <span className="logo-mark">A</span>
          {profile.shortName}
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
