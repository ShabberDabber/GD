
import React, { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

export const HomePage = () => {
  const { aboutMe, heroProjects } = useContent();
  
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-base-dark text-white">
      <section className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">{aboutMe.name}</h1>
          <p className="text-xl md:text-2xl text-gray-400">{aboutMe.title}</p>
        </div>
      </section>
      
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Selected Work</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {heroProjects.map((project: any) => (
            <a key={project.id} href={`#/project/${project.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img src={project.homePageImage.url} alt={project.homePageImage.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-bold">{project.homePageTitle}</h3>
              <p className="text-gray-400">{project.homePageSubtitle}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
