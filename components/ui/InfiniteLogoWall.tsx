
import React from 'react';
import type { SanityClientLogo } from '../../types';

interface LogoGridProps {
  logos: SanityClientLogo[];
}

export const LogoGrid: React.FC<LogoGridProps> = ({ logos }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
      {logos.map((logo, index) => (
        <div 
          key={logo._id} 
          className="flex justify-center items-center aspect-[2/1] bg-white p-4 rounded-md transition-all duration-300 opacity-0 animate-fade-in-up shadow-sm hover:shadow-lg hover:scale-105"
          style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'forwards' }}
        >
          <img 
            src={logo.logoUrl} 
            alt={logo.name} 
            className="max-h-10 w-full object-contain transition-all duration-300" 
          />
        </div>
      ))}
    </div>
  );
};
