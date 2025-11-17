import React from 'react';
import { HERO_PROJECTS, RECENT_WORK } from '../../constants';
import type { CaseStudyProject, RecentWorkProject } from '../../types';
import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';
import { useCursorHover } from '../ui/CustomCursor';

type Project = (CaseStudyProject | RecentWorkProject) & { image: string };

const WorkCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { setIsHovering } = useCursorHover();
  const isCaseStudy = 'challenge' in project;
  const description = 'description' in project ? project.description : project.subtitle;
  return (
    <a 
      href="#/case-studies" 
      className="group block relative overflow-hidden rounded-lg bg-base-medium shadow-lg aspect-[16/9] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        {isCaseStudy && (
            <span className="inline-block bg-brand-primary/20 text-brand-primary text-xs font-bold px-2 py-1 rounded-full mb-2">
                FULL CASE STUDY
            </span>
        )}
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary text-sm mt-1 max-w-sm">{description}</p>
        <div className="absolute top-4 right-4 p-2 bg-base-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRightIcon className="w-5 h-5 text-brand-primary" />
        </div>
      </div>
    </a>
  );
};

export const WorkOverviewSection: React.FC = () => {
  const allProjects: Project[] = [
    ...HERO_PROJECTS.map(p => ({ ...p, image: p.heroImage })),
    ...RECENT_WORK.flatMap(theme => theme.projects.map(p => ({ ...p }))),
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};