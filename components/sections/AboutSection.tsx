
import React from 'react';
import { ABOUT_ME } from '../../constants';
import { SectionHeader } from '../ui/SectionHeader';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';
import { useCursorHover } from '../ui/CustomCursor';

export const AboutSection: React.FC = () => {
  const { setIsHovering } = useCursorHover();
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={`About ${ABOUT_ME.name}`}
          title="Philosophy & Experience"
        />
        <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Creative Director Philosophy</h3>
            <div className="space-y-6">
              {ABOUT_ME.philosophy.map(item => (
                <div key={item.title}>
                  <h4 className="text-lg font-semibold text-brand-primary">{item.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">The Age Advantage</h3>
            <div className="space-y-6">
              {ABOUT_ME.experienceAdvantage.map(item => (
                <div key={item.title}>
                  <h4 className="text-lg font-semibold text-brand-primary">{item.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-16">
            <a href={ABOUT_ME.resumeUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-lg"
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}>
               View Full Resume
               <ArrowUpRightIcon className="w-5 h-5"/>
            </a>
        </div>
      </div>
    </section>
  );
};