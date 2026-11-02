import { ExternalLink, Github, MessageCircle } from 'lucide-react'
import { projects } from '../data/projects'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Projects({ onTryDemo }) {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          eyebrow="Portfolio"
          title="Selected work"
          text="Chatbots, web experiences and AI visuals, each built to solve something real."
        />
        <div className="grid-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} className="card project" delay={(i % 3) * 80}>
              <div className="project-cover" style={{ '--accent': p.accent }}>
                <span>{p.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
              </div>
              <div className="project-body">
                <span className="tag small">{p.tag}</span>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
                <div className="stack">
                  {p.stack.map((s) => (
                    <em key={s}>{s}</em>
                  ))}
                </div>
                <div className="project-links">
                  {p.demo && (
                    <button className="btn btn-sm btn-primary" onClick={() => onTryDemo(p.demo)}>
                      <MessageCircle size={14} /> Try it live
                    </button>
                  )}
                  {p.live && (
                    <a className="btn btn-sm btn-ghost" href={p.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} /> View
                    </a>
                  )}
                  {p.code && (
                    <a className="btn btn-sm btn-ghost" href={p.code} target="_blank" rel="noreferrer">
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
