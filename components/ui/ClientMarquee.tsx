import React from 'react';
import { CLIENT_LOGOS } from '../../constants';

export const ClientMarquee: React.FC = () => {
    const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]; // Duplicate for seamless loop

  return (
    <div className="py-12 bg-base-medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-8">
          Trusted by world-class brands
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-scroll hover:[animation-play-state:paused]">
            {logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-48 mx-6 flex items-center justify-center">
                <img src={logo} alt={`Client Logo ${index + 1}`} className="max-h-10 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};