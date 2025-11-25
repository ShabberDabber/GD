
export interface Image { url: string; alt: string; }
export interface Social { name: string; url: string; icon: string; }
export interface PhilosophyPoint { title: string; body: string; }
export interface BucketListItem { text: string; completed: boolean; }
export interface MediaCategory { title: string; items: string[]; }
export interface ContentBlock { type: string; data: any; }
export interface CaseStudyProject {
  id: string;
  title: string;
  client: string;
  tags: string[];
  homePageTitle: string;
  homePageSubtitle: string;
  homePageImage: Image;
  contentBlocks: ContentBlock[];
}
export interface AboutMe {
  name: string;
  title: string;
  email: string;
  phone: string;
  heroImage: Image;
  socials: Social[];
  aboutPage: {
    heading: string;
    intro: string;
    philosophy: { heading: string; points: PhilosophyPoint[]; };
    personalDNA: {
      obsessions: { heading: string; items: string[]; };
      bucketList: { heading: string; items: BucketListItem[]; };
      mediaDiet: { heading: string; categories: MediaCategory[]; };
    };
    inspirationGrid: { images: Image[]; };
    panoramaImage: Image;
  };
  theme: {
    headerLogoText: string;
    headerIconUrl: string;
    colors: Record<string, string>;
    logoSettings: { useMonochrome: boolean; };
  };
}
