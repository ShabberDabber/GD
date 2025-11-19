
import React, { useState, useEffect } from 'react';
import { useCursorHover } from './CustomCursor';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setHoverState } = useCursorHover();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if user has scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHoverState({ isHovering: true })}
      onMouseLeave={() => setHoverState({ isHovering: false })}
      aria-label="Go to top"
      className={`fixed bottom-28 right-8 z-40 w-12 h-12 rounded-full bg-base-medium/80 backdrop-blur-sm text-white shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-brand-primary hover:scale-110
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};
