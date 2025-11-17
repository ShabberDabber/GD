import React from 'react';
import { HERO_PROJECTS } from '../../constants';
import type { CaseStudyProject } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';

const CaseStudyCard: React.FC<{ project: CaseStudyProject }> = ({ project }) => {
  return (
    <div className="bg-base-medium rounded-lg overflow-hidden shadow-2xl mb-16 md:mb-24 transition-transform duration-300 hover:scale-[1.02]">
      <img src={project.heroImage} alt={project.title} className="w-full h-64 md:h-96 object-cover"/>
      <div className="p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{project.title}</h3>
        <p className="text-brand-primary font-semibold text-lg mb-6">{project.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8 text-text-secondary">
          <div>
            <h4 className="font-bold text-text-primary mb-2 border-l-4 border-brand-primary pl-3">The Challenge</h4>
            <p className="text-sm leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h4 className="font-bold text-text-primary mb-2 border-l-4 border-brand-primary pl-3">Solution & Strategy</h4>
            <p className="text-sm leading-relaxed">{project.strategy}</p>
          </div>
          <div>
            <h4 className="font-bold text-text-primary mb-2 border-l-4 border-brand-primary pl-3">The Impact</h4>
            <p className="text-sm leading-relaxed">{project.impact}</p>
          </div>
        </div>

        <div className="mt-8">
            <h4 className="font-bold text-text-primary mb-4 text-center">Process & Scope</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.processImages.map((img, index) => (
                    <img key={index} src={img} alt={`Process for ${project.title} ${index+1}`} className="rounded-md object-cover w-full h-40 shadow-lg"/>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export const WorkSection: React.FC = () => {
  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Case Studies"
          title="Leadership & Impact Showcase"
        />
        <div className="space-y-16">
          {HERO_PROJECTS.map(project => (
            <CaseStudyCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};