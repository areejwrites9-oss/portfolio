import { useMemo } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatWindow from './ChatWindow'
import { areejReply, areejGreeting } from '../lib/areejBot'

// Floating launcher for the Areej assistant, available on every section.
export default function ChatWidget({ open, setOpen }) {
  const bot = useMemo(() => ({ greeting: areejGreeting, reply: areejReply }), [])
  return (
    <>
      {open && (
        <div className="widget">
          <ChatWindow title="Areej Assistant" subtitle="Ask me anything about Areej" bot={bot} accent="#8b5a3c" compact />
        </div>
      )}
      <button className="fab" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}>
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  )
}
