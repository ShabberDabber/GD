
import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useCursorHover } from '../ui/CustomCursor';
import type { CaseStudyProject, RecentWorkProject } from '../../types';

// ---------------------------------------------------------------------------
// SHARED COMPONENTS
// ---------------------------------------------------------------------------

const ProjectImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const { setIsHovering } = useCursorHover();

  React.useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  return (
    <div 
      className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Project gallery image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-transparent hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectTags: React.FC<{ tags?: string[] }> = ({ tags }) => {
  if (!tags) return null;
  return (
    <div className="mt-6 flex justify-center gap-2 flex-wrap">
      {tags.map(tag => (
        <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
          {tag}
        </span>
      ))}
    </div>
  );
};

const ProjectTitle: React.FC<{ project: CaseStudyProject }> = ({ project }) => (
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">{project.title}</h1>
    {project.client && <p className="mt-2 text-xl font-medium text-brand-primary">{project.client}</p>}
    <ProjectTags tags={project.tags} />
  </div>
);

// ---------------------------------------------------------------------------
// LAYOUT 1: VERTICAL FOCUS ("First Version")
// Hero is 3 vertical images. Text has small floated images.
// ---------------------------------------------------------------------------

const LayoutOne: React.FC<{ project: CaseStudyProject }> = ({ project }) => {
  // Determine hero images. Prefer footerImages (verticals), then processImages, then duplicate hero.
  let heroImages: string[] = [];
  if (project.footerImages && project.footerImages.length >= 3) {
      heroImages = project.footerImages.slice(0, 3);
  } else if (project.processImages && project.processImages.length >= 3) {
      heroImages = project.processImages.slice(0, 3);
  } else {
      heroImages = [project.heroImage, project.heroImage, project.heroImage];
  }

  const headings = {
    challenge: project.challengeHeading || 'The Challenge',
    strategy: project.strategyHeading || 'Strategy',
    impact: project.impactHeading || 'The Impact'
  };

  return (
    <article className="text-slate-800 animate-fade-in-up bg-white pb-20">
      {/* Vertical Hero Section - Contained to match Layout 2 */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10 md:mt-12">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
           {heroImages.map((img, i) => (
             <div key={i} className="relative overflow-hidden rounded-lg shadow-xl aspect-[16/9] sm:aspect-[16/27]">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
             </div>
           ))}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12 md:mt-20">
        <ProjectTitle project={project} />

        <div className="prose prose-lg max-w-none mx-auto text-slate-600">
            {/* Challenge Section - Full Width */}
            <section className="mb-12">
               <h2 className="text-2xl font-bold text-slate-900 mb-4">{headings.challenge}</h2>
               <p>{project.challenge}</p>
            </section>

            <div className="flow-root"> 
              {/* Floated Images Container - Aligned with Strategy */}
              <div className="float-none md:float-right md:ml-8 mb-8 w-full md:w-1/3 space-y-6">
                   {project.processImages && project.processImages[0] && (
                      <img src={project.processImages[0]} alt="Process 1" className="rounded-lg shadow-lg w-full" />
                   )}
                   {project.processImages && project.processImages[1] && (
                      <img src={project.processImages[1]} alt="Process 2" className="rounded-lg shadow-lg w-full" />
                   )}
              </div>

              {/* Text Content */}
              <div className="space-y-12">
                <section>
                   <h2 className="text-2xl font-bold text-slate-900 mb-4">{headings.strategy}</h2>
                   <p>{project.strategy}</p>
                   {project.description2 && <p className="mt-4">{project.description2}</p>}
                </section>

                <section>
                   <h2 className="text-2xl font-bold text-slate-900 mb-4">{headings.impact}</h2>
                   <p>{project.impact}</p>
                </section>
              </div>
            </div>
        </div>
      </div>

      {/* Footer is the Standard 16/9 Hero Image */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-20">
         <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
            <img src={project.heroImage} alt="Final shot" className="w-full h-full object-cover" />
         </div>
      </div>
    </article>
  );
};

// ---------------------------------------------------------------------------
// LAYOUT 2: STANDARD (The Original Layout)
// ---------------------------------------------------------------------------

const LayoutTwo: React.FC<{ project: CaseStudyProject }> = ({ project }) => {
  const headings = {
    challenge: project.challengeHeading || 'The Challenge',
    strategy: project.strategyHeading || 'Strategy & Execution',
    impact: project.impactHeading || 'Impact'
  };

  return (
    <article className="text-slate-800 animate-fade-in-up bg-white">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10 md:mt-12">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
          <img src={project.heroImage} alt={`${project.title} hero image`} className="w-full h-full object-cover" />
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 md:py-16">
        <ProjectTitle project={project} />

        <div className="prose prose-lg max-w-none mx-auto mt-12 md:mt-16 text-slate-600 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">{headings.challenge}</h2>
            <p>{project.challenge}</p>
            <h2 className="text-2xl font-bold text-slate-900">{headings.strategy}</h2>
            <p>{project.strategy}</p>
            <h2 className="text-2xl font-bold text-slate-900">{headings.impact}</h2>
            <p>{project.impact}</p>
        </div>
      </div>

      {/* Grid of 3 images (Moved up from bottom) */}
      {project.footerImages && project.footerImages.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl my-12 md:my-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {project.footerImages.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-xl aspect-[16/9] sm:aspect-[16/27]">
                 <img 
                    src={img} 
                    alt={`Process detail image ${index + 1}`} 
                    className="w-full h-full object-cover" 
                 />
              </div>
            ))}
          </div>
        </div>
      )}

      {project.description2 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl my-12 md:my-16">
           <div className="prose prose-lg max-w-none mx-auto text-slate-600 space-y-6">
              <p>{project.description2}</p>
           </div>
        </div>
      )}

      {/* Middle Section: Carousel (Moved down from middle) */}
      {project.galleryImages && project.galleryImages.length > 0 && (
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl my-12 md:my-16">
           <ProjectImageCarousel images={project.galleryImages} />
        </div>
      )}
    </article>
  );
};

// ---------------------------------------------------------------------------
// LAYOUT 3: COMPLEX / EDITORIAL ("Even more photos")
// Grid layouts, expanded text, more visual density
// ---------------------------------------------------------------------------

const LayoutThree: React.FC<{ project: CaseStudyProject }> = ({ project }) => {
  const heroImg1 = project.heroImage;
  // Use the first gallery image for the second hero slot if available, otherwise fallback
  const heroImg2 = project.galleryImages?.[0] || project.processImages?.[0] || project.heroImage;

  const headings = {
    challenge: project.challengeHeading || 'The Challenge',
    strategy: project.strategyHeading || 'Strategy & Execution',
    impact: project.impactHeading || 'Impact'
  };

  return (
    <article className="text-slate-800 animate-fade-in-up bg-white">
      {/* Hero - 2 Images Side by Side. Container is 16/9 on desktop to match other layouts height */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:aspect-[16/9]">
           <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-lg shadow-xl">
              <img src={heroImg1} alt={`${project.title} hero 1`} className="w-full h-full object-cover" />
           </div>
           <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-full overflow-hidden rounded-lg shadow-xl">
              <img src={heroImg2} alt={`${project.title} hero 2`} className="w-full h-full object-cover" />
           </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        
        {/* Header Area */}
        <div className="max-w-5xl mx-auto">
           <ProjectTitle project={project} />
        </div>
        
        {/* Main Text Content - Standardized to match Layout 2 */}
        <div className="container mx-auto px-0 max-w-5xl mb-16">
            <div className="prose prose-lg max-w-none mx-auto text-slate-600 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">{headings.challenge}</h2>
                <p>{project.challenge}</p>

                <h2 className="text-2xl font-bold text-slate-900">{headings.strategy}</h2>
                <p>{project.strategy}</p>
                {project.description2 && <p>{project.description2}</p>}
            </div>
        </div>

        {/* Bento Grid for Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 auto-rows-[200px]">
           {/* Hero Crop */}
           <div className="md:col-span-2 lg:col-span-2 row-span-2 overflow-hidden rounded-2xl relative">
              <img src={project.heroImage} className="w-full h-full object-cover" />
           </div>
           
           {/* Process Images */}
           {project.processImages?.map((img, i) => (
             <div key={`process-${i}`} className={`overflow-hidden rounded-2xl relative ${i === 0 ? 'lg:col-span-2' : ''}`}>
                <img src={img} className="w-full h-full object-cover" />
             </div>
           ))}

           {/* Gallery Images - Showing 3 to fill more space */}
            {project.galleryImages?.slice(0,3).map((img, i) => (
             <div key={`gallery-${i}`} className="overflow-hidden rounded-2xl relative row-span-1">
                <img src={img} className="w-full h-full object-cover" />
             </div>
           ))}
           
           {/* Extra Image filler (using footer image 1) to complete the grid row */}
           {project.footerImages && project.footerImages[0] && (
              <div className="overflow-hidden rounded-2xl relative row-span-1">
                <img src={project.footerImages[0]} className="w-full h-full object-cover" />
             </div>
           )}
        </div>

        {/* Impact Section - Standardized Text Styling */}
        <div className="container mx-auto px-0 max-w-5xl mb-20">
           <div className="prose prose-lg max-w-none mx-auto text-slate-600 space-y-6">
               <h2 className="text-2xl font-bold text-slate-900">{headings.impact}</h2>
               <p>{project.impact}</p>
           </div>
        </div>

        {/* Footer Single Image (Standard 16/9) */}
        {project.footerImages && project.footerImages[0] && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
             <img src={project.footerImages[0]} alt="Footer visual" className="w-full h-full object-cover" />
          </div>
        )}

      </div>
    </article>
  );
};


// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------

const RecentWorkLayout: React.FC<{ project: RecentWorkProject }> = ({ project }) => {
  const { setIsHovering } = useCursorHover();
  
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  return (
    <article className="text-slate-800 animate-fade-in-up bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12 md:py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{project.title}</h1>
            <div className="prose prose-lg max-w-none mx-auto mt-8 text-slate-600">
                <p>{project.description}</p>
            </div>
            <img src={project.image} alt={`${project.title} hero image`} className="w-full h-auto object-cover mt-12 rounded-lg shadow-xl"/>
            <a
              href="#/"
              onClick={handleHomeClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="mt-12 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              Back to Home
            </a>
        </div>
    </article>
  );
};


export const CaseStudyDetailPage: React.FC<{ projectId: string; layoutOverride?: '1' | '2' | '3' }> = ({ projectId, layoutOverride }) => {
  const { setIsHovering } = useCursorHover();
  const { heroProjects, recentWork } = useContent();
  
  const allProjects = [
      ...heroProjects,
      ...recentWork.flatMap(theme => theme.projects)
  ];

  const project = allProjects.find(p => p.id === projectId);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  if (!project) {
    return (
      <div className="text-slate-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-base-dark">Project Not Found</h1>
          <p className="mt-4 text-base-light">Sorry, we couldn't find the project you were looking for.</p>
          <a
            href="#/"
            onClick={handleHomeClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="mt-8 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Recent Work projects (Simple ones) always use a default simple layout
  if (!('challenge' in project)) {
    return <RecentWorkLayout project={project as RecentWorkProject} />;
  }

  const caseStudy = project as CaseStudyProject;
  // Layout priority: URL Override > Project Preference > Default '2'
  const activeLayout = layoutOverride || caseStudy.layout || '2';

  // Main Case Study Layouts
  switch (activeLayout) {
    case '1':
      return <LayoutOne project={caseStudy} />;
    case '3':
      return <LayoutThree project={caseStudy} />;
    case '2':
    default:
      return <LayoutTwo project={caseStudy} />;
  }
};
