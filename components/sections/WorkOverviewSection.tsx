
import React from 'react';
import { useContent } from '../../context/ContentContext';
import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';
import { useCursorHover } from '../ui/CustomCursor';

type CardProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  isCaseStudy: boolean;
};

const WorkCard: React.FC<{ project: CardProject; index: number }> = ({ project, index }) => {
  const { setIsHovering } = useCursorHover();
  
  const handleNavigation = (e: React.MouseEvent) => {
    if (project.isCaseStudy) {
      e.preventDefault();
      window.location.hash = `#/project/${project.id}`;
    }
  };

  const cardContent = (
    <>
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      
      {project.isCaseStudy && (
        <span className="absolute top-4 left-4 z-10 inline-block bg-brand-primary text-text-primary text-xs font-bold px-3 py-1.5 rounded-full">
            FULL CASE STUDY
        </span>
      )}

      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary text-sm mt-1 max-w-sm">{project.description}</p>
        <div className="absolute top-4 right-4 p-2 bg-base-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRightIcon className="w-5 h-5 text-brand-primary" />
        </div>
      </div>
    </>
  );

  if (!project.isCaseStudy) {
    return (
      <div 
        className="group relative overflow-hidden rounded-lg bg-base-medium shadow-lg aspect-[16/9] opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
       {cardContent}
      </div>
    );
  }

  return (
    <a 
      href={`#/project/${project.id}`} 
      onClick={handleNavigation}
      className="group block relative overflow-hidden rounded-lg bg-base-medium shadow-lg aspect-[16/9] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {cardContent}
    </a>
  );
};

export const WorkOverviewSection: React.FC = () => {
  const { heroProjects, recentWork } = useContent();

  const caseStudyProjects: CardProject[] = heroProjects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.subtitle,
    image: p.heroImage,
    isCaseStudy: true,
  }));

  const recentWorkProjects: CardProject[] = recentWork.flatMap(theme => 
    theme.projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      isCaseStudy: false,
    }))
  );
  
  const allProjects = [...caseStudyProjects, ...recentWorkProjects];

  return (
    <section className="pt-20 pb-4 bg-white text-slate-900">
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
