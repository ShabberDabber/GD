
import React from 'react';
import { useContent } from '../../context/ContentContext';

const Marquee: React.FC<{ logos: string[], direction: 'left' | 'right' }> = ({ logos, direction }) => {
  // If no logos, return null
  if (!logos || logos.length === 0) return null;

  // Duplicate logos for a seamless, continuous loop
  const allLogos = [...logos, ...logos]; 
  const animationClass = direction === 'left' ? 'animate-infinite-scroll-left' : 'animate-infinite-scroll-right';

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${animationClass} hover:[animation-play-state:paused]`}>
        {allLogos.map((logo, index) => (
          <li key={index} className="flex-shrink-0" aria-hidden={true}>
            <img src={logo} alt="" className="max-h-8 hover:scale-110 transition-transform duration-300" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PartnersSection: React.FC = () => {
  const { clientLogos, brandLogos } = useContent();

  return (
    <section className="pb-12 pt-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
            
            {/* Top Label */}
            <h3 className="text-center text-xs font-bold text-gray-300 tracking-[0.25em] uppercase mb-6">
                CLIENTS
            </h3>

            {/* Logo Group - Moved together */}
            <div className="w-full flex flex-col gap-12 mb-6">
               <Marquee logos={clientLogos} direction="left" />
               <Marquee logos={brandLogos} direction="right" />
            </div>

            {/* Bottom Label - Moved below brands */}
            <h3 className="text-center text-xs font-bold text-gray-300 tracking-[0.25em] uppercase">
                BRANDS
            </h3>

        </div>
      </div>
    </section>
  );
};
