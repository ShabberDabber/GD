import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useCursorHover } from '../ui/CustomCursor';

type CardProject = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const WorkCard: React.FC<{ project: CardProject; index: number }> = ({ project, index }) => {
  const { setHoverState } = useCursorHover();
  
  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#/project/${project.id}`;
  };

  const cardContent = (
    <>
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary text-sm mt-1 max-w-sm">{project.description}</p>
      </div>
    </>
  );

  return (
    <a 
      href={`#/project/${project.id}`} 
      onClick={handleNavigation}
      className="group block relative overflow-hidden rounded-lg bg-base-medium shadow-lg aspect-[16/9] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHoverState({ isHovering: true, text: 'VIEW' })}
      onMouseLeave={() => setHoverState({ isHovering: false })}
    >
      {cardContent}
    </a>
  );
};

export const WorkOverviewSection: React.FC = () => {
  const { heroProjects } = useContent();

  const allProjects: CardProject[] = heroProjects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.subtitle,
    image: p.heroImage,
  }));

  return (
    <section className="pt-20 pb-4 bg-white text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center -m-4">
          {allProjects.map((project, index) => (
            <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <WorkCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};