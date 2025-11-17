
import React from 'react';
import { RECENT_WORK } from '../../constants';
import type { RecentWorkProject } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';
import { useCursorHover } from '../ui/CustomCursor';

const RecentWorkCard: React.FC<{ project: RecentWorkProject }> = ({ project }) => {
  const { setIsHovering } = useCursorHover();
  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-base-medium shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="button"
      tabIndex={0}
    >
      <img src={project.image} alt={project.title} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary text-sm mt-1">{project.description}</p>
         <div className="absolute top-4 right-4 p-2 bg-base-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRightIcon className="w-5 h-5 text-brand-primary" />
        </div>
      </div>
    </div>
  )
}


export const RecentWorkSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-base-medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Recent Projects"
          title="Adaptability & Current Relevance"
        />
        <div className="space-y-12">
          {RECENT_WORK.map(theme => (
            <div key={theme.theme}>
              <h3 className="text-2xl font-bold text-text-primary mb-6 border-l-4 border-brand-primary pl-4">{theme.theme}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {theme.projects.map(project => (
                  <RecentWorkCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};