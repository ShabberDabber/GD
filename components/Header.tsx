
import React from 'react';
import { useCursorHover } from './ui/CustomCursor';

interface HeaderProps {
  currentPath: string;
}

const NavItem: React.FC<{
  label: string;
  href: string;
  isActive: boolean;
}> = ({ label, href, isActive }) => {
  const { setIsHovering } = useCursorHover();
  return (
    <a
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-brand-primary' : 'text-text-secondary hover:text-text-primary'
      }`}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-brand-primary rounded-full"></span>
      )}
    </a>
  );
};

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const { setIsHovering } = useCursorHover();
  return (
    <header className="sticky top-0 z-50 header-with-blur border-b border-base-light">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <a href="#/" 
                className="text-xl font-black text-text-primary transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
             >DG.</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem
                label="Home"
                href="#/"
                isActive={currentPath === '/'}
              />
              <NavItem
                label="Case Studies"
                href="#/case-studies"
                isActive={currentPath.startsWith('/case-studies')}
              />
              <NavItem
                label="About"
                href="#/about"
                isActive={currentPath.startsWith('/about')}
              />
            </div>
          </div>
        </div>
      </nav>
       {/* Mobile Nav */}
      <div className="md:hidden">
         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex justify-around">
              <NavItem
                label="Home"
                href="#/"
                isActive={currentPath === '/'}
              />
              <NavItem
                label="Case Studies"
                href="#/case-studies"
                isActive={currentPath.startsWith('/case-studies')}
              />
              <NavItem
                label="About"
                href="#/about"
                isActive={currentPath.startsWith('/about')}
              />
         </div>
      </div>
    </header>
  );
};