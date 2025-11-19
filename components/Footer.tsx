import React from 'react';
import { useContent } from '../context/ContentContext';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { useCursorHover } from './ui/CustomCursor';

export const Footer: React.FC = () => {
  const { aboutMe } = useContent();
  const { setHoverState } = useCursorHover();
  
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/admin';
  };

  return (
    <footer className="bg-base-medium border-t border-base-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
          
          {/* Column 1: Name & Title (Top Aligned) */}
          <div className="text-left md:w-1/3">
            <h3 className="text-2xl font-bold text-text-primary mb-1">{aboutMe.name}</h3>
            <p className="text-text-tertiary text-sm">{aboutMe.title}</p>
          </div>

          {/* Column 2: Contact Info (Center, Top Aligned) */}
          <div className="flex flex-row items-center justify-start md:justify-center md:w-1/3 gap-6">
              <a href={`mailto:${aboutMe.email}`} 
                 className="text-white hover:text-brand-secondary transition-colors text-xl font-bold"
                 onMouseEnter={() => setHoverState({ isHovering: true })}
                 onMouseLeave={() => setHoverState({ isHovering: false })}
              >
                {aboutMe.email}
              </a>
              <a href={`tel:${aboutMe.phone.replace(/[^0-9+]/g, '')}`} 
                 className="text-text-secondary hover:text-white transition-colors text-base font-medium"
                 onMouseEnter={() => setHoverState({ isHovering: true })}
                 onMouseLeave={() => setHoverState({ isHovering: false })}
              >
                {aboutMe.phone}
              </a>
          </div>

          {/* Column 3: Socials (Right, Top Aligned) */}
          <div className="flex flex-col items-start md:items-end md:w-1/3">
             <a href={aboutMe.linkedInUrl} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-text-secondary hover:text-brand-primary transition-colors duration-300 p-2 bg-base-dark rounded-lg"
               onMouseEnter={() => setHoverState({ isHovering: true })}
               onMouseLeave={() => setHoverState({ isHovering: false })}
               aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-6 h-6"/>
            </a>
          </div>
        </div>
        
        <div className="text-center text-text-tertiary text-xs mt-8 border-t border-base-light pt-6">
          <p>&copy; {new Date().getFullYear()} {aboutMe.name}. All rights reserved.</p>
          <div className="mt-2">
            <a 
              href="#/admin" 
              onClick={handleAdminClick}
              className="text-base-light hover:text-text-tertiary transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};