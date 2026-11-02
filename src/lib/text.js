// Shared helpers for both chatbots.
export const normalize = (s) =>
  s.toLowerCase().replace(/[^a-z0-9\s؀-ۿ]/g, ' ').replace(/\s+/g, ' ').trim()

export const hasAny = (text, words) => words.some((w) => text.includes(w))

// Scores intents by keyword hits; longer keywords weigh more.
export function bestIntent(input, intents) {
  const text = ' ' + normalize(input) + ' '
  let best = null
  let bestScore = 0
  for (const intent of intents) {
    let score = 0
    for (const k of intent.keywords) {
      if (text.includes(' ' + k + ' ') || (k.length > 4 && text.includes(k))) score += k.length
    }
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }
  return best
}

export const money = (n) => 'Rs. ' + n.toLocaleString('en-PK')
