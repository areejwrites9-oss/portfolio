import { useEffect, useRef, useState } from 'react'
import { Send, Bot, User } from 'lucide-react'

// Generic chat UI. `bot` = { greeting, reply(input) => {text, chips?} }
export default function ChatWindow({ title, subtitle, bot, accent, compact = false }) {
  const [messages, setMessages] = useState([{ from: 'bot', ...bot.greeting }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const send = (raw) => {
    const text = raw.trim()
    if (!text || typing) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    const r = bot.reply(text)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...r }])
      setTyping(false)
    }, 450 + Math.min(r.text.length * 4, 700))
  }

  const lastBot = [...messages].reverse().find((m) => m.from === 'bot')

  return (
    <div className={`chat ${compact ? 'compact' : ''}`} style={{ '--chat-accent': accent }}>
      <div className="chat-head">
        <span className="avatar"><Bot size={18} /></span>
        <div>
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </div>
        <span className="online">online</span>
      </div>
      <div className="chat-body" ref={bodyRef} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <span className="msg-ico">{m.from === 'bot' ? <Bot size={14} /> : <User size={14} />}</span>
            <p>{m.text}</p>
          </div>
        ))}
        {typing && (
          <div className="msg bot">
            <span className="msg-ico"><Bot size={14} /></span>
            <p className="dots"><i /><i /><i /></p>
          </div>
        )}
      </div>
      {lastBot?.chips && !typing && (
        <div className="chips">
          {lastBot.chips.map((c) => (
            <button key={c} onClick={() => send(c)}>{c}</button>
          ))}
        </div>
      )}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" aria-label="Message" />
        <button type="submit" aria-label="Send" disabled={!input.trim()}><Send size={16} /></button>
      </form>
    </div>
  )
}
