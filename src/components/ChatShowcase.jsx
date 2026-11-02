import { useMemo } from 'react'
import ChatWindow from './ChatWindow'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import { areejReply, areejGreeting } from '../lib/areejBot'
import { createRestaurantBot, restaurantGreeting } from '../lib/restaurantBot'
import { restaurant } from '../data/restaurant'

export default function ChatShowcase({ active, setActive }) {
  const areejBot = useMemo(() => ({ greeting: areejGreeting, reply: areejReply }), [])
  const restoBot = useMemo(() => {
    const b = createRestaurantBot()
    return { greeting: restaurantGreeting, reply: b.reply }
  }, [])

  return (
    <section id="chatbots" className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Chatbots"
          title="Don't just read about them. Talk to them."
          text="Two bots I built, running right here in your browser. Try asking, ordering or booking."
        />
        <Reveal className="tabs" role="tablist">
          <button role="tab" aria-selected={active === 'areej'} className={active === 'areej' ? 'on' : ''} onClick={() => setActive('areej')}>
            Areej Assistant
          </button>
          <button role="tab" aria-selected={active === 'restaurant'} className={active === 'restaurant' ? 'on' : ''} onClick={() => setActive('restaurant')}>
            Restaurant Bot
          </button>
        </Reveal>
        <div className="showcase">
          <Reveal className="showcase-info">
            {active === 'areej' ? (
              <>
                <h3>A portfolio assistant that knows me</h3>
                <p>Visitors can ask about my skills, projects, experience, hobbies and family without scrolling. It matches intents from my profile data and answers in plain language, including Roman Urdu greetings.</p>
                <ul>
                  <li>Intent scoring over keyword sets</li>
                  <li>Suggestion chips that guide the visitor</li>
                  <li>Answers generated from one data file</li>
                </ul>
              </>
            ) : (
              <>
                <h3>A restaurant bot that takes orders</h3>
                <p>Built for a restaurant: it shows the menu, builds a cart ("add 2 biryani"), confirms delivery orders and walks guests through a table reservation.</p>
                <ul>
                  <li>Multi-step flows with state (order, reservation)</li>
                  <li>Quantity and menu-item parsing</li>
                  <li>Demo restaurant: {restaurant.name}</li>
                </ul>
              </>
            )}
          </Reveal>
          <Reveal delay={100}>
            {active === 'areej' ? (
              <ChatWindow key="a" title="Areej Assistant" subtitle="Ask about Areej" bot={areejBot} accent="#8b5a3c" />
            ) : (
              <ChatWindow key="r" title={`${restaurant.name} Bot`} subtitle="Menu · Orders · Tables" bot={restoBot} accent="#b4532a" />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
