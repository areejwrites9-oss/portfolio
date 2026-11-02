import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.role}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
