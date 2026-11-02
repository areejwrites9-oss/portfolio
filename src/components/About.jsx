import { about, stats } from '../data/profile'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead eyebrow="About me" title={about.title} />
        <div className="about-grid">
          <Reveal className="about-text">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <dl className="facts">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} className="stat card" delay={i * 80}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
