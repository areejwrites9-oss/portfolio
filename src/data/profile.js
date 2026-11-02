
// ✏️ Edit your personal details here — every component reads from this file.
export const profile = {
  name: 'Areej Fatima',
  shortName: 'Areej',
  role: 'AI Engineer',
  tagline: 'Creative builder · Chatbots · AI content',
  intro:
    'I started in premedical with no computer background and turned myself into a BS Artificial Intelligence student who builds chatbots, AI-powered web experiences and visuals that feel genuinely human.',
  location: 'Faisalabad, Pakistan',
  photo: './profile.jpeg', // put your photo in /public/profile.jpg
  email: 'areejwrites9@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/areej-fatima567/',
    github: 'https://github.com/areejwrites9-oss',
    instagram: 'https://www.instagram.com/reej_visuals/',
  },
  // Optional: create a free form at formspree.io and paste the id (e.g. 'xyzabcde').
  // Leave empty to fall back to opening the visitor's email app.
  formspreeId: '',
}

export const about = {
  title: 'From premedical to AI — on purpose',
  paragraphs: [
    "I'm a BS Artificial Intelligence student at the University of Agriculture, Faisalabad, and a Honhaar Scholarship recipient. I came to AI from a premedical background with no prior computer knowledge, so everything I know I learned by building, breaking and rebuilding.",
    " I worked as an AI Technical Content Writer at GAO Tek Inc., build chatbots and web experiences, create AI-generated product visuals, and tutor students privately. My focus is AI engineering: Python, LLM APIs and agent architecture.",
  ],
  facts: [
    { label: 'Studying', value: 'BS Artificial Intelligence, UAF' },
    { label: 'Scholarship', value: 'Honhaar Scholarship' },
    { label: 'Working at', value: 'GAO Tek Inc. (remote)' },
    { label: 'Based in', value: 'Faisalabad, Pakistan' },
  ],
}

export const stats = [
  { value: '2', label: 'Internships' },
  { value: '2', label: 'Chatbots live in this site' },
  { value: '6+', label: 'Projects built' },
  { value: '1', label: 'Big goal: AI engineering' },
]

export const experience = [
  {
    role: 'AI Technical Content Writer',
    org: 'GAO Tek Inc.',
    type: 'Remote internship',
    points: [
      'Write product content for gas detectors, sound level meters and similar equipment.',
      'Turn technical specs into concise overviews and short, scannable application lists.',
    ],
  },
  {
    role: 'AI Intern',
    org: 'CodeAlpha',
    type: 'Internship',
    points: [
      'Built a rule-based AI chatbot in Python: greetings, exit commands, if/else logic and a continuous loop.',
      'Working through each concept with small exercises before the real project.',
    ],
  },
  {
    role: 'Private Tutor',
    org: 'Independent',
    type: 'Ongoing',
    points: [
      'Teach students one-to-one and create exam materials for entrepreneurship and business courses.',
    ],
  },
]

export const education = [
  {
    title: 'BS Artificial Intelligence',
    org: 'University of Agriculture, Faisalabad (UAF)',
    note: 'Honhaar Scholarship ',
  },
  {
    title: 'AI Fluency course',
    org: 'Anthropic',
    note: 'Completed and certified',
  },
]

// ✏️ Personal-life answers used by the Areej chatbot. Edit these to your own words.
export const personal = {
  family:
    "I come from a family with 3 to 4 siblings, and my parents are my biggest support. Their encouragement and the values they taught me keep me steady when I'm learning something hard.",
  hobbies: [
    'Reading novels, stories and self-growth books',
    'Writing poetry and keeping a journal',
    'Cooking desi dishes and baking desserts',
    'Travelling to nature, especially the northern mountains of Pakistan',
  ],
  interests: 'Modest fashion, skincare and creative digital content.',
}
