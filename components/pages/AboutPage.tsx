
import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useCursorHover } from '../ui/CustomCursor';

export const AboutPage: React.FC = () => {
  const { aboutMe } = useContent();
  const { setHoverState } = useCursorHover();

  // Split grid into two rows for the sandwich layout (ensure we have data)
  const topRowImages = aboutMe.inspirationGrid ? aboutMe.inspirationGrid.slice(0, 3) : [];
  const bottomRowImages = aboutMe.inspirationGrid ? aboutMe.inspirationGrid.slice(3, 6) : [];

  return (
    <div className="bg-white text-slate-900 animate-fade-in-up pb-12">
      {/* Hero Section */}
      <section className="bg-base-dark pt-14 md:pt-24 pb-16 md:pb-20 overflow-hidden text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
            About Me <span className="text-brand-primary">&</span> <br/>
            <span className="text-brand-primary">The Process</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300 max-w-3xl leading-relaxed">
            {aboutMe.introStatement}
          </p>
        </div>
      </section>

      {/* Main Content Wrapper - Consistent Max-Width with Project Pages */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Philosophy Section */}
        <section className="py-16 md:py-24">
           <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 sticky top-24">
                 <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">My Philosophy</h2>
                 <p className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                    Strategy first. <br/> Design second.
                 </p>
              </div>
              <div className="md:w-2/3 grid gap-12">
                 {aboutMe.philosophy.map((item, idx) => (
                   <div key={idx}>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed">{item.text}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <hr className="border-slate-200" />

        {/* Personal DNA Section */}
        <section className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                
                {/* Obsessions */}
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Obsessed With</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {aboutMe.obsessions.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-lg">
                                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Travel */}
                <div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-6">Bucket List</h3>
                     <div className="flex flex-wrap gap-2">
                        {aboutMe.travelLog.map((item, i) => (
                            <span key={i} className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium">
                                {item}
                            </span>
                        ))}
                     </div>
                </div>
            </div>

            {/* Favorites */}
            <div className="mt-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Media Diet</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Movies</h4>
                        <ul className="space-y-2 text-slate-600">
                            {aboutMe.favorites.movies.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Shows</h4>
                        <ul className="space-y-2 text-slate-600">
                            {aboutMe.favorites.shows.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Podcasts</h4>
                        <ul className="space-y-2 text-slate-600">
                            {aboutMe.favorites.podcasts.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Audiobooks</h4>
                        <ul className="space-y-2 text-slate-600">
                            {aboutMe.favorites.audiobooks.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
      </div>

      {/* Visual Story - Sandwich Layout (Grid - Panorama - Grid) */}
      <section className="pt-8 pb-20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">
            
            {/* Row 1: 3 Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {topRowImages.map((img, index) => (
                   <div key={`top-${index}`} className="aspect-video relative rounded-lg overflow-hidden shadow-sm bg-slate-100">
                      <img 
                        src={img} 
                        alt="Visual inspiration"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                   </div>
               ))}
            </div>

            {/* Panorama Sandwich */}
             <div className="w-full aspect-video md:aspect-[16/3] overflow-hidden rounded-lg shadow-lg relative">
              <img 
                  src={aboutMe.panoramaImage} 
                  alt="Panoramic View" 
                  className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Row 2: 3 Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {bottomRowImages.map((img, index) => (
                   <div key={`bottom-${index}`} className="aspect-video relative rounded-lg overflow-hidden shadow-sm bg-slate-100">
                      <img 
                        src={img} 
                        alt="Visual inspiration"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                   </div>
               ))}
            </div>

         </div>
      </section>

    </div>
  );
};