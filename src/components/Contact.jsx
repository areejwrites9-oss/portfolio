import { useState } from 'react'
import { Mail, Send, Linkedin, Instagram, Github, CheckCircle2 } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!profile.formspreeId) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2>Let's work together</h2>
          <p>Have an AI idea, a chatbot to build or content that needs writing? Tell me about it. I'd love to hear from you.</p>
          <a className="mail" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <div className="socials">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a href={profile.links.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <form className="form" onSubmit={submit}>
            <h3>Send me a message</h3>
            <label>
              Your name
              <input required value={form.name} onChange={set('name')} placeholder="Jane Doe" />
            </label>
            <label>
              Email address
              <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" />
            </label>
            <label>
              Message
              <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell me a little about your project…" />
            </label>
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send message <Send size={16} /></>}
            </button>
            {status === 'sent' && <p className="ok"><CheckCircle2 size={16} /> Thank you. I'll reply soon.</p>}
            {status === 'error' && <p className="err">Something went wrong. Please email me directly.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
