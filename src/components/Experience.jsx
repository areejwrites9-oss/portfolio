import { Briefcase, GraduationCap } from 'lucide-react'
import { experience, education } from '../data/profile'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead eyebrow="Journey" title="Experience & education" />
        <div className="two-col">
          <div>
            <h4 className="col-title"><Briefcase size={18} /> Experience</h4>
            <ol className="timeline">
              {experience.map((e, i) => (
                <Reveal as="li" key={e.role + e.org} delay={i * 80}>
                  <strong>{e.role}</strong>
                  <span>{e.org} · {e.type}</span>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="col-title"><GraduationCap size={18} /> Education & learning</h4>
            <ol className="timeline">
              {education.map((e, i) => (
                <Reveal as="li" key={e.title} delay={i * 80}>
                  <strong>{e.title}</strong>
                  <span>{e.org}</span>
                  <p>{e.note}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
