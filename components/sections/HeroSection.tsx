
import React from 'react';
import { useContent } from '../../context/ContentContext';

export const HeroSection: React.FC = () => {
  const { aboutMe } = useContent();

  const sectionStyle = {
    backgroundColor: aboutMe.heroBackgroundColor || undefined,
  };
  const titleStyle = {
    color: aboutMe.heroTitleColor || undefined,
  };
  const subtitleStyle = {
    color: aboutMe.heroSubtitleColor || undefined,
  };
  const introStyle = {
    color: aboutMe.heroIntroColor || undefined,
  };

  return (
    <section 
      className="relative pt-14 md:pt-24 pb-16 md:pb-20 text-center bg-base-dark"
      style={sectionStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 
          className="text-4xl md:text-5xl lg:text-7xl font-black text-text-primary tracking-tighter uppercase"
          style={titleStyle}
        >
          {aboutMe.name}
        </h1>
        <p 
          className="mt-4 text-xl md:text-2xl text-brand-primary font-semibold"
          style={subtitleStyle}
        >
          {aboutMe.title}
        </p>
        <p 
          className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary"
          style={introStyle}
        >
          {aboutMe.heroIntro}
        </p>
      </div>
    </section>
  );
};
