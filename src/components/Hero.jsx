import { useState } from 'react'
import { ArrowDown, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

export default function Hero({ onOpenChat }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="pill">
            <Sparkles size={14} /> Open to internships and collaborations
          </span>
          <h1>
            Hi, I'm <span className="grad">{profile.name}</span>
          </h1>
          <h3 className="hero-role">{profile.role}</h3>
          <p className="lead">{profile.intro}</p>
          <div className="hero-cta">
            <a href="#work" className="btn btn-primary">
              View my work <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">Contact me</a>
            <button className="btn btn-link" onClick={onOpenChat}>Ask my AI assistant →</button>
          </div>
          <p className="hero-loc">
            <MapPin size={15} /> {profile.location}
          </p>
        </div>
        <div className="hero-art">
          <div className="blob" />
          <div className="photo-frame">
            {imgOk ? (
          <img src={profile.photo} alt={profile.name} onError={() => setImgOk(false)} />
            ) : (
              <div className="photo-fallback">AF</div>
            )}
          </div>
          <div className="float-chip c1">Python · LLM APIs</div>
          <div className="float-chip c2">Chatbots</div>
          <div className="float-chip c3">React </div>
        </div>
      </div>
    </section>
  )
}
