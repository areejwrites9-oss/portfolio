import { Brain, Bot, Wand2, Video, Code2, PenLine } from 'lucide-react'
import { skills, toolbelt } from '../data/skills'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

const icons = { Brain, Bot, Wand: Wand2, Video, Code: Code2, Pen: PenLine }

export default function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Skills"
          title="What I bring to the table"
          text="From the first prompt to a finished product: a toolkit that mixes AI engineering with creative craft."
        />
        <div className="grid-3">
          {skills.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal key={s.title} className="card skill" delay={(i % 3) * 80}>
                <span className="icon-box"><Icon size={22} /></span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="toolbelt">
          {toolbelt.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
