import React from 'react';
import { useCursorHover } from './ui/CustomCursor';
import { useRouter } from '../hooks/useRouter';

export const Header: React.FC = () => {
  const { setHoverState } = useCursorHover();
  const { path } = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  const handleAboutClick = (e: React.MouseEvent) => {
      e.preventDefault();
      window.location.hash = '#/about';
  };

  // Check if we are on a project page to show layout controls
  const isProjectPage = path.startsWith('#/project/');
  let currentProjectId = '';
  let currentLayout = '2';

  if (isProjectPage) {
    const parts = path.split('/');
    const idAndQuery = parts[2] || '';
    const [id, query] = idAndQuery.split('?');
    currentProjectId = id;
    if (query) {
      const params = new URLSearchParams(query);
      currentLayout = params.get('layout') || '2';
    }
  }

  const LayoutButton = ({ number }: { number: string }) => {
    const isActive = currentLayout === number;
    
    const handleClick = () => {
      window.location.hash = `#/project/${currentProjectId}?layout=${number}`;
    };

    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 border ${
          isActive 
            ? 'bg-brand-primary text-white border-brand-primary' 
            : 'text-base-light border-gray-300 hover:border-brand-primary hover:text-brand-primary'
        }`}
        onMouseEnter={() => setHoverState({ isHovering: true })}
        onMouseLeave={() => setHoverState({ isHovering: false })}
      >
        {number}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 header-with-blur border-b border-base-light">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-6">
             <a href="#/" 
                onClick={handleHomeClick}
                className="text-xl font-black text-text-primary transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoverState({ isHovering: true })}
                onMouseLeave={() => setHoverState({ isHovering: false })}
             >GD!</a>
             
             {isProjectPage && (
               <div className="hidden sm:flex items-center space-x-2 ml-6 pl-6 border-l border-gray-700">
                  <span className="text-xs text-gray-400 uppercase tracking-wider mr-2">Layout</span>
                  <LayoutButton number="1" />
                  <LayoutButton number="2" />
                  <LayoutButton number="3" />
               </div>
             )}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#/"
                onClick={handleHomeClick}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${path === '#/' || path === '' ? 'text-brand-primary' : 'text-text-secondary hover:text-text-primary'}`}
                onMouseEnter={() => setHoverState({ isHovering: true })}
                onMouseLeave={() => setHoverState({ isHovering: false })}
              >
                Home
                {(path === '#/' || path === '') && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-brand-primary rounded-full"></span>
                )}
              </a>
               <a
                href="#/about"
                onClick={handleAboutClick}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${path === '#/about' ? 'text-brand-primary' : 'text-text-secondary hover:text-text-primary'}`}
                onMouseEnter={() => setHoverState({ isHovering: true })}
                onMouseLeave={() => setHoverState({ isHovering: false })}
              >
                About
                {path === '#/about' && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-brand-primary rounded-full"></span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
       {/* Mobile Nav */}
      <div className="md:hidden bg-base-dark/95 backdrop-blur-md">
         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex justify-between items-center">
             <div className="flex gap-4">
              <a
                href="#/"
                onClick={handleHomeClick}
                className={`relative px-3 py-2 text-sm font-medium ${path === '#/' || path === '' ? 'text-brand-primary' : 'text-text-secondary'}`}
              >
                Home
              </a>
              <a
                href="#/about"
                onClick={handleAboutClick}
                className={`relative px-3 py-2 text-sm font-medium ${path === '#/about' ? 'text-brand-primary' : 'text-text-secondary'}`}
              >
                About
              </a>
             </div>
              
              {isProjectPage && (
               <div className="flex items-center space-x-2 mr-4">
                  <LayoutButton number="1" />
                  <LayoutButton number="2" />
                  <LayoutButton number="3" />
               </div>
             )}
         </div>
      </div>
    </header>
  );
};