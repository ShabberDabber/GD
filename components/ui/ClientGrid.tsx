import React from 'react';
import { CLIENT_LOGOS } from '../../constants';

export const ClientGrid: React.FC = () => {
  return (
    <div className="py-16 bg-base-medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-10">
          A career defined by partnerships with world-class brands
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-10 items-center max-w-5xl mx-auto">
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={index} className="flex justify-center transition-transform duration-300 hover:scale-110 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
              <img src={logo} alt={`Client Logo ${index + 1}`} className="max-h-8 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};