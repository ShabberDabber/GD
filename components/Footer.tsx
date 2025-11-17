
import React from 'react';
import { ABOUT_ME } from '../constants';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { useCursorHover } from './ui/CustomCursor';

export const Footer: React.FC = () => {
  const { setIsHovering } = useCursorHover();
  return (
    <footer className="bg-base-medium border-t border-base-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-text-primary">{ABOUT_ME.name}</h3>
            <p className="text-text-tertiary">{ABOUT_ME.title}</p>
            <a href={`mailto:${ABOUT_ME.email}`} 
               className="text-brand-primary hover:underline mt-1 inline-block"
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
            >{ABOUT_ME.email}</a>
          </div>
          <div className="flex items-center gap-4">
            <a href={ABOUT_ME.linkedInUrl} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-text-tertiary hover:text-brand-primary transition-colors duration-300"
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
            >
              <LinkedInIcon className="w-8 h-8"/>
            </a>
          </div>
        </div>
        <div className="text-center text-text-tertiary text-sm mt-8 border-t border-base-light pt-6">
          <p>&copy; {new Date().getFullYear()} {ABOUT_ME.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};