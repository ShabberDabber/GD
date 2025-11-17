
export interface CaseStudyProject {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  challenge: string;
  strategy: string;
  impact: string;
  processImages: string[];
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

export interface SanityClientLogo {
  _id: string;
  name: string;
  logoUrl: string;
}
