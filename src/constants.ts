
import { AboutMe, CaseStudyProject } from './types';

export const CLIENT_LOGOS = ['https://logo.clearbit.com/transistor.fm', 'https://logo.clearbit.com/reform.app', 'https://logo.clearbit.com/tuple.app', 'https://logo.clearbit.com/savvycal.com', 'https://logo.clearbit.com/statamic.com', 'https://logo.clearbit.com/google.com', 'https://logo.clearbit.com/laravel.com', 'https://logo.clearbit.com/miragejs.com', 'https://logo.clearbit.com/workcation.com', 'https://logo.clearbit.com/microsoft.com', 'https://logo.clearbit.com/vercel.com', 'https://logo.clearbit.com/github.com', 'https://logo.clearbit.com/meta.com', 'https://logo.clearbit.com/intel.com', 'https://logo.clearbit.com/sentry.io', 'https://logo.clearbit.com/mailchimp.com', 'https://logo.clearbit.com/notion.so', 'https://logo.clearbit.com/atlassian.com', 'https://logo.clearbit.com/asana.com', 'https://logo.clearbit.com/loom.com', 'https://logo.clearbit.com/framer.com', 'https://logo.clearbit.com/figma.com', 'https://logo.clearbit.com/dribbble.com', 'https://logo.clearbit.com/hubspot.com', 'https://logo.clearbit.com/shopify.com', 'https://logo.clearbit.com/intercom.com', 'https://logo.clearbit.com/slack.com', 'https://logo.clearbit.com/stripe.com', 'https://logo.clearbit.com/airbnb.com', 'https://logo.clearbit.com/netflix.com'];
export const BRAND_LOGOS = ['https://logo.clearbit.com/sony.com', 'https://logo.clearbit.com/nike.com', 'https://logo.clearbit.com/cocacola.com', 'https://logo.clearbit.com/netflix.com', 'https://logo.clearbit.com/spotify.com', 'https://logo.clearbit.com/playstation.com', 'https://logo.clearbit.com/nintendo.com', 'https://logo.clearbit.com/lego.com', 'https://logo.clearbit.com/redbull.com', 'https://logo.clearbit.com/starbucks.com', 'https://logo.clearbit.com/disney.com', 'https://logo.clearbit.com/amazon.com', 'https://logo.clearbit.com/apple.com', 'https://logo.clearbit.com/tesla.com', 'https://logo.clearbit.com/mcdonalds.com'];

export const HERO_PROJECTS: CaseStudyProject[] = [{
  id: 'aura-health',
  title: 'Aura Health & Wellness App',
  client: 'Mindful Technologies',
  tags: ['UI/UX Design', 'Mobile App', 'Health & Wellness', 'Branding'],
  homePageTitle: 'Aura: Mindful Wellness',
  homePageSubtitle: 'Crafting a calming, user-centric mobile experience for mental well-being.',
  homePageImage: { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop', alt: 'A person meditating in a peaceful, natural environment.' },
  contentBlocks: [
    { type: 'hero', data: { images: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', alt: 'Aura App Meditation Screen' }], style: 'single' } },
    { type: 'title', data: {} },
    { type: 'text', data: { heading: 'The Challenge', body: 'Design and launch Aura, a new mobile app aimed at making mindfulness and meditation accessible to a wider audience. The goal was to create a sanctuary-like digital space that reduces stress, not adds to it, standing out in a crowded market of wellness apps.' } },
    { type: 'stats', data: { stats: [{ value: '500K+', label: 'Downloads in Year One' }, { value: '4.8 ★', label: 'Average App Store Rating' }, { value: 'Featured', label: 'by Apple as App of the Day' }] } },
    { type: 'textWithImages', data: { heading: 'A Human-Centered Approach', body: 'Our process began with deep user research into anxiety triggers and relaxation techniques. This informed a minimalist UI with a soothing color palette, gentle animations, and intuitive navigation. We focused on creating guided meditation journeys that were easy to follow for beginners while still offering depth for experienced users.', images: [{ url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop', alt: 'Wireframes and sketches of the Aura app' }], imagePosition: 'right', imageLayout: 'singleTall' } },
    { type: 'quote', data: { quotes: [{ text: 'Using Aura feels like a deep breath in a chaotic world. It’s beautifully designed and genuinely helpful.', author: 'User Review' }], style: 'single' } },
    { type: 'carousel', data: { images: [{ url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', alt: 'Aura app guided breathing exercise' }, { url: 'https://images.unsplash.com/photo-1599301859914-0a6b4a5e0f7e?q=80&w=800&auto=format&fit=crop', alt: 'Aura app sleep stories interface' }, { url: 'https://images.unsplash.com/photo-1605320922883-500b3f790a3c?q=80&w=800&auto=format&fit=crop', alt: 'Aura app progress tracking screen' }] } }
  ]
},
{
  id: 'quantum-leap-ai',
  title: 'QuantumLeap AI SaaS Platform',
  client: 'Cognitive Dynamics Inc.',
  tags: ['B2B', 'SaaS', 'AI', 'Brand Identity', 'Web Design'],
  homePageTitle: 'QuantumLeap AI',
  homePageSubtitle: 'Designing the brand and UI for a next-generation enterprise AI platform.',
  homePageImage: { url: 'https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=800&auto=format&fit=crop', alt: 'Abstract visualization of an artificial intelligence network.' },
  contentBlocks: [
    { type: 'hero', data: { images: [{ url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', alt: 'QuantumLeap data visualization dashboard' }, { url: 'https://images.unsplash.com/photo-1614064548237-02f0d1467812?q=80&w=800&auto=format&fit=crop', alt: 'QuantumLeap machine learning model builder' }], style: 'duo' } },
    { type: 'title', data: {} },
    { type: 'text', data: { heading: 'The Mission', body: 'Develop a powerful and intuitive brand identity and user interface for QuantumLeap, an AI platform designed to help enterprises make sense of massive datasets. The challenge was to communicate immense technical power while ensuring the product felt accessible and manageable to data scientists and business analysts alike.' } },
    { type: 'imageGrid', data: { images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop', alt: 'Data stream visualization' }, { url: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=600&auto=format&fit=crop', alt: 'AI model training interface' }, { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop', alt: 'Collaborative AI project workspace' }] } },
    { type: 'text', data: { heading: 'Simplifying Complexity', body: 'The design system, built on a dark-mode-first philosophy, uses a vibrant, futuristic color palette to highlight key data points and actions. We created a modular dashboard system that allows users to customize their workspace, and developed a library of data visualization components that could present complex information in a clear, digestible format.' } },
    { type: 'stats', data: { stats: [{ value: '40%', label: 'Faster Data Analysis' }, { value: '300+', label: 'Enterprise Clients' }, { value: '$50M', label: 'Series A Funding' }] } }
  ]
}];

export const ABOUT_ME: AboutMe = {
  name: 'David Gaines',
  title: 'Creative Director & Brand Strategist',
  email: 'dave@gainesdg.com',
  phone: '555-123-4567',
  heroImage: { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop', alt: 'A creative workspace with various design tools and technology.' },
  socials: [{ name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'linkedin' }],
  aboutPage: {
    heading: "ABOUT ME & MY PROCESS",
    intro: "A highly accomplished and user-centric creative director with a proven history of elevating brands and driving business growth through impactful, story-driven design and strategic leadership.",
    philosophy: {
      heading: "My Philosophy",
      points: [
        { title: "Impact Over Aesthetics", body: "Design must do more than look good; it must solve problems. I focus on creating work that is not only beautiful and engaging but also drives measurable results and achieves strategic business objectives." },
        { title: "Strategy is the Foundation", body: "Creativity without strategy is just art. Every project begins with a deep dive into the brand, the audience, and the market to build a strategic foundation that informs every creative decision." },
        { title: "Leadership Through Collaboration", body: "The best ideas are born from diverse perspectives. I foster a collaborative environment where every team member is empowered to contribute, experiment, and excel, leading to more innovative and effective outcomes." }
      ]
    },
    personalDNA: {
      obsessions: { heading: "Obsessed With", items: ["Perfecting the perfect espresso shot", "Mid-century modern architecture", "The strategic genius of F1 racing", "Finding the world's best breakfast burrito"] },
      bucketList: { heading: "Bucket List", items: [{ text: "Walk the Camino de Santiago", completed: true }, { text: "See the Northern Lights in Iceland", completed: false }, { text: "Learn to shape a surfboard", completed: false }, { text: "Visit the Pyramids of Giza", completed: false }, { text: "Hike to Machu Picchu", completed: true }, { text: "Master the art of sourdough", completed: false }] },
      mediaDiet: { heading: "Media Diet", categories: [{ title: "Podcasts", items: ["99% Invisible", "The Daily", "How I Built This", "Acquired"] }, { title: "Audiobooks", items: ["Shoe Dog by Phil Knight", "The Creative Act by Rick Rubin", "Sapiens by Yuval Noah Harari"] }, { title: "Shows", items: ["Severance", "Formula 1: Drive to Survive", "Ted Lasso", "Succession"] }, { title: "Movies", items: ["Blade Runner 2049", "Arrival", "Dune", "Everything Everywhere All At Once"] }] }
    },
    inspirationGrid: { images: [{ url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', alt: 'A clean, modern architectural detail.' }, { url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop', alt: 'A minimalist workspace with a laptop.' }, { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', alt: 'A collaborative team meeting.' }, { url: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=800&auto=format&fit=crop', alt: 'A person working on a laptop in a cafe.' }, { url: 'https://images.unsplash.com/photo-1504270997636-07ddfbd4d3af?q=80&w=800&auto=format&fit=crop', alt: 'A beautifully designed book cover.' }, { url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop', alt: 'A collection of design tools on a desk.' }] },
    panoramaImage: { url: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1920&auto=format&fit=crop', alt: 'A wide panoramic view of a creative office space.' }
  },
  theme: {
    headerLogoText: 'GD!',
    headerIconUrl: '',
    colors: {
      'accent-color': '#0891b2', 'accent-secondary-color': '#f0f9ff',
      'header-bg-color': '#0f172a', 'hero-bg-color': '#0f172a', 'hero-text-color': '#f8fafc',
      'page-bg-color': '#ffffff', 'body-headings-color': '#1e293b', 'body-text-color': '#475569',
      'project-tag-bg-color': '#e0f2fe', 'project-tag-text-color': '#0891b2'
    },
    logoSettings: { useMonochrome: false }
  }
};

export const DEFAULT_CONTENT = {
  aboutMe: ABOUT_ME,
  heroProjects: HERO_PROJECTS,
  clientLogos: CLIENT_LOGOS,
  brandLogos: BRAND_LOGOS
};
