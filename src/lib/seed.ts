// ---------------------------------------------------------------------------
// Seed content shared across Feed / Map / Profile / Lists so the app feels
// alive on first open (GTM §3: "onboarding that populates fast"). Friends-only
// by design: every author here is someone "you follow", never a stranger.
// ---------------------------------------------------------------------------

export interface Person {
  name: string
  handle: string
  initials: string
}

export interface SeedBite {
  id: string
  user: Person
  timeAgo: string
  cafe: string
  dish: string
  rating: number // dish-level, 0.5–5
  vibes: string[]
  note: string
  likes: number
  photo: string
  colorHex: string
  category: 'cafes' | 'restaurants' | 'hidden'
  lat: number
  lng: number
}

export const ME: Person = { name: 'khushi', handle: '@khushi.eats', initials: 'K' }

export const MAP_CENTER: [number, number] = [19.012, 72.848]

export const SEED_BITES: SeedBite[] = [
  {
    id: 's1',
    user: { name: 'priya m.', handle: '@priya.eats', initials: 'PM' },
    timeAgo: '2h',
    cafe: 'Blue Tokai Coffee',
    dish: 'Ethiopian Pour Over',
    rating: 4.5,
    vibes: ['rainy day solo', 'first sip ritual', 'quiet corner'],
    note: "the kind of coffee that makes you think you're in a wes anderson film. sat there three hours and felt entirely like myself. the barista remembered my name.",
    likes: 47,
    photo: '/dishes/ethiopian-pour-over.jpg',
    colorHex: '#C4A0A8',
    category: 'cafes',
    lat: 19.017,
    lng: 72.856,
  },
  {
    id: 's2',
    user: { name: 'arjun t.', handle: '@arjun_bites', initials: 'AT' },
    timeAgo: '5h',
    cafe: 'Naaru',
    dish: 'Spicy Miso Ramen',
    rating: 5,
    vibes: ['cozy corner', 'cold night comfort', 'worth the wait'],
    note: 'waited 40 minutes. would wait 80. the broth is what winter feels like when it is finally done being hard.',
    likes: 112,
    photo: '/dishes/miso-ramen.jpg',
    colorHex: '#8B8BA8',
    category: 'restaurants',
    lat: 18.999,
    lng: 72.841,
  },
  {
    id: 's3',
    user: { name: 'sara k.', handle: '@thequietfork', initials: 'SK' },
    timeAgo: '1d',
    cafe: 'Fig & Maple',
    dish: 'Ricotta Pancakes',
    rating: 4,
    vibes: ['sunday slow', 'golden hour', 'aesthetic brunch'],
    note: 'stacked like a small architectural decision. the ricotta keeps them impossibly light. i have returned three times and will return a fourth.',
    likes: 203,
    photo: '/dishes/ricotta-pancakes.jpg',
    colorHex: '#D4A8B8',
    category: 'cafes',
    lat: 19.012,
    lng: 72.848,
  },
  {
    id: 's4',
    user: { name: 'ruhan d.', handle: '@ruhan.explores', initials: 'RD' },
    timeAgo: '2d',
    cafe: 'Suzette',
    dish: 'Salted Caramel Crêpe',
    rating: 3.5,
    vibes: ['hidden gem', 'late afternoon', 'solo dining'],
    note: "tucked in a lane google maps almost doesn't believe in. the crêpe is paper thin and the filling-to-crêpe ratio is, frankly, unhinged (in the best way).",
    likes: 88,
    photo: '/dishes/salted-caramel-crepe.jpg',
    colorHex: '#D4B896',
    category: 'hidden',
    lat: 19.034,
    lng: 72.839,
  },
  {
    id: 's5',
    user: { name: 'mira v.', handle: '@mira.eats', initials: 'MV' },
    timeAgo: '3d',
    cafe: 'Perch Wine Bar',
    dish: 'Burrata + Heirloom Tomato',
    rating: 4.5,
    vibes: ['soft luxury', 'date night', 'quiet luxury'],
    note: 'the kind of place that makes you feel you have figured something out about yourself. the burrata is improbably fresh. i did not want to leave.',
    likes: 176,
    photo: '/dishes/burrata-toast.jpg',
    colorHex: '#B8C4A8',
    category: 'restaurants',
    lat: 19.022,
    lng: 72.832,
  },
  {
    id: 's6',
    user: { name: 'dev p.', handle: '@devours', initials: 'DP' },
    timeAgo: '4d',
    cafe: 'La Folie',
    dish: 'Pistachio Tart',
    rating: 5,
    vibes: ['quiet luxury', 'worth the detour', 'treat yourself'],
    note: 'a tart so precise it feels rude to eat it fast. the pistachio is greener and greener the deeper you go. easily the best thing i have eaten this month.',
    likes: 154,
    photo: '/dishes/pistachio-tart.jpg',
    colorHex: '#C8B8D8',
    category: 'hidden',
    lat: 18.992,
    lng: 72.828,
  },
  {
    id: 's7',
    user: { name: 'nina r.', handle: '@ninaeats', initials: 'NR' },
    timeAgo: '5d',
    cafe: 'Kopi Klub',
    dish: 'Cold Brew Float',
    rating: 4,
    vibes: ['golden hour', 'summer in a glass', 'afternoon reset'],
    note: 'cold brew and a scoop of vanilla doing the most with the least. drank it too fast, ordered a second, no regrets.',
    likes: 96,
    photo: '/dishes/cold-brew-float.jpg',
    colorHex: '#C4A0A8',
    category: 'cafes',
    lat: 19.026,
    lng: 72.862,
  },
  {
    id: 's8',
    user: { name: 'sam w.', handle: '@samsslice', initials: 'SW' },
    timeAgo: '6d',
    cafe: 'Smoke House Deli',
    dish: 'Pulled Pork Slider',
    rating: 3.5,
    vibes: ['comfort food', 'friday unwind', 'no notes needed'],
    note: 'twelve hours of smoke folded into three bites. the slaw does the heavy lifting. an honest, uncomplicated joy.',
    likes: 71,
    photo: '/dishes/pulled-pork-slider.jpg',
    colorHex: '#D4B896',
    category: 'restaurants',
    lat: 19.006,
    lng: 72.851,
  },
]

// Your own diary: the bites "you" already logged before opening the app today.
export const MY_SEED_BITES: SeedBite[] = [
  {
    id: 'm1',
    user: ME,
    timeAgo: '1d',
    cafe: 'Kala Ghoda Café',
    dish: 'Rose & Cardamom Latte',
    rating: 4.5,
    vibes: ['quiet luxury', 'first sip ritual', 'window seat'],
    note: 'floral without tipping into perfume. i keep a mental list of drinks worth crossing town for and this just joined it.',
    likes: 12,
    photo: '/dishes/cold-brew-float.jpg',
    colorHex: '#D4A8B8',
    category: 'cafes',
    lat: 18.928,
    lng: 72.832,
  },
  {
    id: 'm2',
    user: ME,
    timeAgo: '3d',
    cafe: 'The Table',
    dish: 'Truffle Parmesan Fries',
    rating: 5,
    vibes: ['cozy corner', 'friends who linger', 'worth the detour'],
    note: 'ordered as a side, remembered as the main event. the kind of thing you keep reaching for while pretending you are done.',
    likes: 34,
    photo: '/dishes/pulled-pork-slider.jpg',
    colorHex: '#B8C4A8',
    category: 'restaurants',
    lat: 19.062,
    lng: 72.831,
  },
  {
    id: 'm3',
    user: ME,
    timeAgo: '1w',
    cafe: 'Suzette',
    dish: 'Salted Caramel Crêpe',
    rating: 4,
    vibes: ['solo dining', 'rainy day solo', 'treat yourself'],
    note: 'a slow afternoon and a very good crêpe. sometimes that is the whole review.',
    likes: 28,
    photo: '/dishes/salted-caramel-crepe.jpg',
    colorHex: '#D4B896',
    category: 'hidden',
    lat: 19.034,
    lng: 72.839,
  },
]

export interface CuratedList {
  id: string
  title: string
  blurb: string
  biteIds: string[]
}

export const MY_LISTS: CuratedList[] = [
  {
    id: 'list-rainy',
    title: 'rainy day cafés',
    blurb: 'window seats, slow coffee, nowhere to be.',
    biteIds: ['s1', 'm1', 's7'],
  },
  {
    id: 'list-splurge',
    title: 'worth the splurge',
    blurb: 'the ones i think about at 2am.',
    biteIds: ['s6', 's5', 'm2'],
  },
]

export function initialsFor(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
