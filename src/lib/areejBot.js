import { profile, about, personal, experience, education } from '../data/profile'
import { projects } from '../data/projects'
import { skills, toolbelt } from '../data/skills'
import { bestIntent } from './text'

const list = (arr) => arr.map((x) => '• ' + x).join('\n')

const intents = [
  {
    id: 'greet',
    keywords: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'good morning', 'good evening'],
    answer: () =>
      `Assalam-o-alaikum! I'm ${profile.shortName}'s assistant. Ask me about her skills, projects, experience, hobbies or family.`,
  },
  {
    id: 'who',
    keywords: ['who are you', 'who is areej', 'about', 'introduce', 'yourself', 'tell me about areej', 'bio'],
    answer: () => `${profile.intro}\n\n${about.paragraphs[0]}`,
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'good at', 'expertise', 'tech stack', 'technologies', 'tools', 'what can she do'],
    answer: () => `Main strengths:\n${list(skills.map((s) => `${s.title}: ${s.text}`))}\n\nTools: ${toolbelt.join(', ')}.`,
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'portfolio', 'built', 'work samples', 'made'],
    answer: () => `Here are some of her projects:\n${list(projects.map((p) => `${p.title} (${p.tag})`))}\n\nScroll to "Selected work" for details.`,
  },
  {
    id: 'chatbot',
    keywords: ['chatbot', 'chat bot', 'bot', 'restaurant bot', 'restaurant'],
    answer: () =>
      "She has built three bots: a rule-based Python chatbot (CodeAlpha internship), the assistant you're talking to, and a restaurant bot for menus, orders and reservations. You can try the restaurant bot in the \"Chatbots\" section.",
  },
  {
    id: 'experience',
    keywords: ['experience', 'internship', 'intern', 'job', 'work', 'gao', 'gao tek', 'codealpha', 'career'],
    answer: () => list(experience.map((e) => `${e.role}, ${e.org} (${e.type})`)),
  },
  {
    id: 'education',
    keywords: ['education', 'study', 'studies', 'university', 'uaf', 'degree', 'student', 'scholarship', 'honhaar', 'course', 'certificate'],
    answer: () => list(education.map((e) => `${e.title}, ${e.org}. ${e.note}`)),
  },
  {
    id: 'background',
    keywords: ['premedical', 'pre medical', 'medical', 'background', 'journey', 'how did she start', 'started'],
    answer: () =>
      'Areej started in premedical with no computer knowledge and moved into BS Artificial Intelligence. She learned by building small projects and now works towards AI engineering.',
  },
  {
    id: 'family',
    keywords: ['family', 'parents', 'siblings', 'brother', 'sister', 'father', 'mother', 'values', 'support'],
    answer: () => personal.family,
  },
  {
    id: 'hobbies',
    keywords: ['hobby', 'hobbies', 'free time', 'interests', 'like to do', 'fun', 'reading', 'cooking', 'travel', 'baking', 'poetry'],
    answer: () => `Outside code:\n${list(personal.hobbies)}\n\nShe also enjoys ${personal.interests.toLowerCase()}`,
  },
  {
    id: 'goal',
    keywords: ['goal', 'future', 'plan', 'dream', 'startup', 'final year', 'fyp'],
    answer: () =>
      'Her goal is AI engineering. She is working on a final-year project that solves a real problem and could grow into a startup, and she aims for strong internships or graduate admissions.',
  },
  {
    id: 'hire',
    keywords: ['hire', 'freelance', 'available', 'services', 'collaborate', 'work together', 'price', 'pricing'],
    answer: () =>
      `She takes on AI product visuals, chatbots and technical content. Send a message from the Contact section or email ${profile.email}.`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'instagram', 'social', 'connect'],
    answer: () =>
      `Email: ${profile.email}\nLinkedIn: ${profile.links.linkedin}\nGitHub: ${profile.links.github}\nInstagram: ${profile.links.instagram}`,
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'city', 'live', 'based', 'pakistan', 'faisalabad'],
    answer: () => `She is based in ${profile.location} and works remotely.`,
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'shukria', 'jazakallah', 'bye', 'allah hafiz', 'khuda hafiz'],
    answer: () => "You're welcome! Khuda hafiz, and feel free to message Areej from the Contact section.",
  },
]

export const areejSuggestions = ['Her skills', 'Projects', 'Experience', 'Hobbies', 'Family', 'How to contact her']

export function areejReply(input) {
  const intent = bestIntent(input, intents)
  if (intent) return { text: intent.answer(), chips: areejSuggestions }
  return {
    text: "I'm not sure about that one. I know about Areej's skills, projects, experience, studies, hobbies and family. Try one of these:",
    chips: areejSuggestions,
  }
}

export const areejGreeting = {
  text: `Assalam-o-alaikum! I'm ${profile.shortName}'s assistant. What would you like to know?`,
  chips: areejSuggestions,
}
