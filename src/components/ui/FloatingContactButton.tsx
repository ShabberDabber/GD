
import React from 'react';
import { useContent } from '../../context/ContentContext';

export const FloatingContactButton = () => {
  const { aboutMe } = useContent();
  return (
    <a href={`mailto:${aboutMe.email}`} className="fixed bottom-8 right-8 w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg z-40 hover:scale-110 transition-transform">
      HI!
    </a>
  );
};
