import { restaurant } from '../data/restaurant'
import { bestIntent, hasAny, money, normalize } from './text'

const { menu } = restaurant
const menuText = () => {
  const cats = [...new Set(menu.map((m) => m.cat))]
  return cats
    .map((c) => `${c}\n` + menu.filter((m) => m.cat === c).map((m) => `  ${m.name}: ${money(m.price)}`).join('\n'))
    .join('\n\n')
}

const findItem = (text) =>
  menu.find((m) => text.includes(normalize(m.name)) || m.alias.some((a) => text.includes(a)))

const chips = ['Show menu', 'Place an order', 'Book a table', 'Opening hours', 'Location']

const intents = [
  { id: 'hi', keywords: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa'], answer: () => `Assalam-o-alaikum! Welcome to ${restaurant.name}. How can I help?` },
  { id: 'menu', keywords: ['menu', 'food', 'dishes', 'what do you have', 'price', 'prices'], answer: menuText },
  { id: 'hours', keywords: ['hours', 'open', 'close', 'timing', 'timings', 'time'], answer: () => restaurant.hours },
  { id: 'loc', keywords: ['location', 'address', 'where', 'directions'], answer: () => `${restaurant.name}, ${restaurant.address}. Call us on ${restaurant.phone}.` },
  { id: 'delivery', keywords: ['delivery', 'deliver', 'home delivery'], answer: () => `Yes, we deliver. The delivery fee is ${money(restaurant.deliveryFee)}.` },
  { id: 'thanks', keywords: ['thanks', 'thank you', 'shukria', 'bye'], answer: () => 'Thank you for choosing us! Khuda hafiz.' },
]

// Each bot instance keeps its own cart and flow state.
export function createRestaurantBot() {
  let cart = []
  let flow = null // null | { type: 'reserve', step, data } | { type: 'checkout' }

  const cartText = () => {
    if (!cart.length) return 'Your cart is empty.'
    const sub = cart.reduce((s, c) => s + c.item.price * c.qty, 0)
    return (
      cart.map((c) => `${c.qty} × ${c.item.name}: ${money(c.item.price * c.qty)}`).join('\n') +
      `\n\nSubtotal: ${money(sub)}\nWith delivery: ${money(sub + restaurant.deliveryFee)}`
    )
  }

  const add = (item, qty) => {
    const line = cart.find((c) => c.item.id === item.id)
    line ? (line.qty += qty) : cart.push({ item, qty })
  }

  function reply(input) {
    const text = normalize(input)

    if (hasAny(text, ['cancel', 'stop', 'reset'])) {
      flow = null
      cart = []
      return { text: 'No problem, everything is cleared. What next?', chips }
    }

    // Reservation flow
    if (flow?.type === 'reserve') {
      const f = flow
      if (f.step === 'size') {
        const n = parseInt(text.match(/\d+/)?.[0] || '', 10)
        if (!n || n > 30) return { text: 'How many people? Please send a number between 1 and 30.' }
        f.data.size = n
        f.step = 'time'
        return { text: 'What date and time would you like? (e.g. Friday 8 PM)' }
      }
      if (f.step === 'time') {
        f.data.time = input.trim()
        f.step = 'name'
        return { text: 'And the name for the booking?' }
      }
      if (f.step === 'name') {
        f.data.name = input.trim()
        flow = null
        return {
          text: `Booked! Table for ${f.data.size} under ${f.data.name}, ${f.data.time}. We'll hold it for 15 minutes. See you at ${restaurant.name}.`,
          chips,
        }
      }
    }

    // Checkout flow
    if (flow?.type === 'checkout') {
      if (hasAny(text, ['yes', 'confirm', 'ok', 'haan', 'han'])) {
        const sub = cart.reduce((s, c) => s + c.item.price * c.qty, 0)
        cart = []
        flow = null
        return { text: `Order confirmed. Total ${money(sub + restaurant.deliveryFee)} including delivery. It will arrive in about 40 minutes.`, chips }
      }
      flow = null
      return { text: 'Okay, your cart is still saved. Add more items or say "checkout" when ready.', chips: ['Show cart', 'Checkout'] }
    }

    // Order commands
    if (hasAny(text, ['cart', 'my order'])) return { text: cartText(), chips: ['Checkout', 'Show menu'] }

    if (hasAny(text, ['checkout', 'confirm order', 'place order now'])) {
      if (!cart.length) return { text: 'Your cart is empty. Try "add 2 biryani".', chips: ['Show menu'] }
      flow = { type: 'checkout' }
      return { text: `${cartText()}\n\nShall I confirm this order? (yes / no)`, chips: ['Yes', 'No'] }
    }

    const item = findItem(text)
    if (item && hasAny(text, ['add', 'order', 'want', 'get', 'have', 'chahiye', 'one', 'two', 'three', '1', '2', '3', '4'])) {
      const words = { one: 1, two: 2, three: 3, four: 4, five: 5 }
      const qty = parseInt(text.match(/\d+/)?.[0] || '', 10) || words[Object.keys(words).find((w) => text.includes(w))] || 1
      add(item, Math.min(qty, 20))
      return { text: `Added ${qty} × ${item.name}.\n\n${cartText()}`, chips: ['Checkout', 'Show menu', 'Show cart'] }
    }

    if (hasAny(text, ['place an order', 'order', 'delivery order'])) {
      return { text: 'Great! Tell me what you want, like "add 2 chicken biryani" or "1 chai". Say "show menu" to see everything.', chips: ['Show menu'] }
    }

    if (hasAny(text, ['book', 'reserve', 'reservation', 'table'])) {
      flow = { type: 'reserve', step: 'size', data: {} }
      return { text: 'Happy to reserve a table. How many people?' }
    }

    if (item) return { text: `${item.name} is ${money(item.price)}. Say "add 1 ${item.name.toLowerCase()}" to order it.`, chips: ['Show menu'] }

    const intent = bestIntent(input, intents)
    if (intent) return { text: intent.answer(), chips }
    return { text: 'Sorry, I did not get that. I can show the menu, take an order, book a table or share our hours.', chips }
  }

  return { reply }
}

export const restaurantGreeting = {
  text: `Welcome to ${restaurant.name}! ${restaurant.tagline}.\nI can show the menu, take your order or book a table.`,
  chips,
}
