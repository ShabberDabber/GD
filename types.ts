
export interface CaseStudyProject {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  challenge: string;
  strategy: string;
  impact: string;
  processImages: string[];
  // New fields for detail page
  client?: string;
  tags?: string[];
  galleryImages?: string[];
  description2?: string;
  footerImages?: string[];
  layout?: '1' | '2' | '3'; // Preference for which template to use
  // Customizable headings
  challengeHeading?: string;
  strategyHeading?: string;
  impactHeading?: string;
}

export interface RecentWorkProject {
  id: string;
  title: string;
  description: string;
  image: string;
  mockupType: 'desktop' | 'mobile' | 'print';
}

export interface RecentWorkTheme {
  theme: string;
  projects: RecentWorkProject[];
}

export interface AboutMeData {
  name: string;
  title: string;
  heroImage: string;
  introStatement: string;
  philosophy: { title: string; text: string }[];
  obsessions: string[];
  travelLog: string[];
  quotes: { text: string; author: string }[];
  favorites: {
    movies: string[];
    shows: string[];
    podcasts: string[];
    audiobooks: string[];
  };
  panoramaImage: string;
  inspirationGrid: string[];
  resumeUrl: string;
  linkedInUrl: string;
  email: string;
  phone: string;
}
