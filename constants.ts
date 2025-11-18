
import type { CaseStudyProject, RecentWorkTheme } from './types';

export const CLIENT_LOGOS: string[] = [
    'https://logo.clearbit.com/transistor.fm',
    'https://logo.clearbit.com/reform.app',
    'https://logo.clearbit.com/tuple.app',
    'https://logo.clearbit.com/savvycal.com',
    'https://logo.clearbit.com/statamic.com',
    'https://logo.clearbit.com/google.com',
    'https://logo.clearbit.com/laravel.com',
    'https://logo.clearbit.com/miragejs.com',
    'https://logo.clearbit.com/workcation.com',
    'https://logo.clearbit.com/microsoft.com',
    'https://logo.clearbit.com/vercel.com',
    'https://logo.clearbit.com/github.com',
    'https://logo.clearbit.com/meta.com',
    'https://logo.clearbit.com/intel.com',
    'https://logo.clearbit.com/sentry.io',
    'https://logo.clearbit.com/mailchimp.com',
    'https://logo.clearbit.com/notion.so',
    'https://logo.clearbit.com/atlassian.com',
    'https://logo.clearbit.com/asana.com',
    'https://logo.clearbit.com/loom.com',
    'https://logo.clearbit.com/framer.com',
    'https://logo.clearbit.com/figma.com',
    'https://logo.clearbit.com/dribbble.com',
    'https://logo.clearbit.com/hubspot.com',
    'https://logo.clearbit.com/shopify.com',
    'https://logo.clearbit.com/intercom.com',
    'https://logo.clearbit.com/slack.com',
    'https://logo.clearbit.com/stripe.com',
    'https://logo.clearbit.com/airbnb.com',
    'https://logo.clearbit.com/netflix.com',
];

export const BRAND_LOGOS: string[] = [
    'https://logo.clearbit.com/sony.com',
    'https://logo.clearbit.com/nike.com',
    'https://logo.clearbit.com/cocacola.com',
    'https://logo.clearbit.com/netflix.com',
    'https://logo.clearbit.com/spotify.com',
    'https://logo.clearbit.com/playstation.com',
    'https://logo.clearbit.com/nintendo.com',
    'https://logo.clearbit.com/lego.com',
    'https://logo.clearbit.com/redbull.com',
    'https://logo.clearbit.com/starbucks.com',
    'https://logo.clearbit.com/disney.com',
    'https://logo.clearbit.com/amazon.com',
    'https://logo.clearbit.com/apple.com',
    'https://logo.clearbit.com/tesla.com',
    'https://logo.clearbit.com/mcdonalds.com',
];


export const HERO_PROJECTS: CaseStudyProject[] = [
  {
    id: 'mlb-the-show',
    title: 'MLB The Show Franchise',
    subtitle: 'Case Study: Global Brand Launch & Retail Success',
    heroImage: 'https://picsum.photos/seed/mlb/1200/800',
    challenge: 'Launch a new flagship sports gaming franchise to compete against established market giants and capture the attention of a diverse audience, from hardcore baseball fans to casual gamers. This required a multi-faceted approach to build hype and establish a strong brand identity from day one.',
    strategy: 'Directed a multi-disciplinary creative effort, structuring and managing in-house teams, external agencies, and freelance talent. We developed a cohesive, cross-channel campaign spanning broadcast TV, dynamic retail displays, packaging, and high-impact tradeshow experiences to create an unmissable launch event.',
    impact: 'Achieved record-breaking launch sales, surpassing initial projections by 40%. Secured #1 market share in the genre within the first year and established a franchise that has shown incredible longevity, winning multiple "Game of the Year" awards.',
    processImages: [
      'https://picsum.photos/seed/mlb-process1/600/400',
      'https://picsum.photos/seed/mlb-process2/600/400',
      'https://picsum.photos/seed/mlb-process3/600/400',
    ],
    // New data for detail page
    client: 'Sony PlayStation',
    tags: ['Packaging', 'Broadcast TV', 'Retail', 'Trade Show'],
    description2: "The campaign's success was built on a deep understanding of the target audience. We combined authentic baseball simulation with high-energy, accessible marketing that spoke to both hardcore fans and newcomers. The retail presence was particularly crucial, with custom displays and interactive kiosks that allowed players to experience the game firsthand. This hands-on approach, coupled with a massive broadcast push, cemented MLB The Show as the premier baseball gaming experience.",
    galleryImages: [
      'https://picsum.photos/seed/mlb-gallery1/1200/800',
      'https://picsum.photos/seed/mlb-gallery2/1200/800',
      'https://picsum.photos/seed/mlb-gallery3/1200/800',
    ],
    footerImages: [
      'https://picsum.photos/seed/mlb-footer1/400/1200',
      'https://picsum.photos/seed/mlb-footer2/400/1200',
      'https://picsum.photos/seed/mlb-footer3/400/1200',
    ],
  },
  {
    id: 'atari-revival',
    title: 'Interplay/Atari Launches',
    subtitle: 'Case Study: Revitalizing Legacy Brands for a Modern Audience',
    heroImage: 'https://picsum.photos/seed/atari/1200/800',
    challenge: "Re-introduce iconic gaming brands to a new generation of players while honoring the nostalgic connection of the original fanbase. The goal was to bridge the gap between retro appeal and modern gaming expectations.",
    strategy: 'As the agency-of-record creative lead, I developed a "Modern Nostalgia" creative platform. This involved a complete visual identity refresh, innovative packaging that paid homage to the originals, and digital campaigns that leveraged retro aesthetics within contemporary channels.',
    impact: 'Successfully managed creative for 5+ major title launches, resulting in a 300% increase in brand engagement on social media and strong sales in a competitive market. The campaigns were praised for their authentic yet fresh approach to beloved IP.',
    processImages: [
      'https://picsum.photos/seed/atari-process1/600/400',
      'https://picsum.photos/seed/atari-process2/600/400',
      'https://picsum.photos/seed/atari-process3/600/400',
    ],
    client: 'Atari / Interplay',
    tags: ['Brand Identity', 'Packaging', 'Digital Campaign', 'Social Media'],
    description2: "The key to this project was striking the perfect balance between honoring the past and appealing to the present. We dove deep into the archives to extract core visual elements—pixel art, typography, color palettes—and reinterpreted them for a high-definition world. The result was a brand identity that felt instantly familiar yet undeniably fresh, capturing the imagination of both old-school gamers and a new generation.",
    galleryImages: [
      'https://picsum.photos/seed/atari-gallery1/1200/800',
      'https://picsum.photos/seed/atari-gallery2/1200/800',
      'https://picsum.photos/seed/atari-gallery3/1200/800',
    ],
    footerImages: [
      'https://picsum.photos/seed/atari-footer1/400/1200',
      'https://picsum.photos/seed/atari-footer2/400/1200',
      'https://picsum.photos/seed/atari-footer3/400/1200',
    ],
  },
];

export const RECENT_WORK: RecentWorkTheme[] = [
  {
    theme: 'Building New Brands in Regulated Markets',
    projects: [
      {
        id: 'aura-health',
        title: 'Aura Health - Medical Device Launch',
        description: 'Developed a trustworthy and accessible brand identity and patient portal UI/UX, simplifying complex medical information.',
        image: 'https://picsum.photos/seed/aura/800/600',
        mockupType: 'desktop',
      },
      {
        id: 'elysian-beauty',
        title: 'Elysian Beauty - Cosmetics Line',
        description: 'Created elegant packaging and a cohesive digital campaign that navigated complex cosmetic regulations while appealing to a luxury market.',
        image: 'https://picsum.photos/seed/elysian/800/600',
        mockupType: 'print',
      },
    ],
  },
  {
    theme: 'Modern Digital & Travel Campaigns',
    projects: [
      {
        id: 'nomad-escapes',
        title: 'Nomad Escapes - Travel Booking',
        description: 'Designed a mobile-first booking platform focused on intuitive user flow and immersive destination visuals to drive conversions.',
        image: 'https://picsum.photos/seed/nomad/800/600',
        mockupType: 'mobile',
      },
       {
        id: 'streamline-corp',
        title: 'Streamline - B2B SaaS',
        description: 'Led the creative for a B2B platform launch, focusing on clear value propositions and a professional, data-driven aesthetic.',
        image: 'https://picsum.photos/seed/streamline/800/600',
        mockupType: 'desktop',
      },
    ],
  },
];

export const ABOUT_ME = {
  name: 'David Gaines',
  title: 'Creative Director & Brand Strategist',
  heroImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // A professional placeholder
  introStatement: "A highly accomplished Creative Leader with 20+ years of experience solving complex marketing challenges by leading and mentoring creative teams. Committed to elevating craft standards and translating brand strategy into high-impact digital-first concepts.",
  philosophy: [
    {
      title: 'Strategy-Driven Creative',
      text: 'I believe great creative is driven by strategic insight, not just aesthetics. My process begins with understanding the business challenge to ensure every design choice has a purpose and delivers measurable results.'
    },
    {
      title: 'Mentorship & Team Building',
      text: "My role as a leader is to mentor the next generation of creatives. I focus on building collaborative, empowered teams where talent can thrive and produce their best work."
    },
    {
      title: 'Bridging Complexity and User Experience',
      text: "I specialize in bridging complicated technical requirements with compelling user experiences, translating product features into emotional connections that resonate with audiences."
    },
  ],
  obsessions: [
    'Swiss Typography', 
    'Japanese Denim', 
    'Vintage Synthesizers', 
    'Perfect Espresso',
    'Mid-Century Furniture',
    'Film Photography'
  ],
  travelLog: [
    'Tokyo, Japan', 
    'Reykjavik, Iceland', 
    'Berlin, Germany', 
    'Kyoto, Japan',
    'Mexico City',
    'Copenhagen, Denmark',
    'Buenos Aires',
    'Seoul, South Korea',
    'Lisbon, Portugal'
  ],
  quotes: [
    { text: "Good design is as little design as possible.", author: "Dieter Rams" },
    { text: "The details are not the details. They make the design.", author: "Charles Eames" }
  ],
  favorites: {
    movies: ['Blade Runner 2049', 'Arrival', 'Grand Budapest Hotel'],
    shows: ['Severance', 'The Bear', 'Succession'],
    podcasts: ['99% Invisible', 'Design Matters', 'How I Built This'],
    audiobooks: ['The Creative Act', 'Steve Jobs', 'Kitchen Confidential']
  },
  panoramaImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop', // Wide landscape
  inspirationGrid: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop', // Updated to abstract art
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=1200&auto=format&fit=crop', 
    'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=1200&auto=format&fit=crop'
  ],
  resumeUrl: '#', // Placeholder for actual resume link
  linkedInUrl: 'https://linkedin.com/in/davidrgaines',
  email: 'dave@gainesdg.com',
  phone: '+1 (555) 123-0987',
};
