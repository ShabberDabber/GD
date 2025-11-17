import React from 'react';
import { ABOUT_ME } from '../../constants';

export const HeroSection: React.FC = () => {
  const name = ABOUT_ME.name;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-center bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase">
          {name}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-brand-primary font-semibold">
          {ABOUT_ME.title}
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          A creative leader translating complex brand strategy into high-impact, pixel-perfect design across digital, print, and retail experiences.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[80px] md:h-[120px] overflow-hidden leading-[0]" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-full" style={{ fill: '#f0f9ff' }}>
          <path d="M0,70 C150,110 200,30 350,60 Q400,75 450,60 C550,30 600,90 700,80 S850,50 950,80 C1050,110 1150,40 1300,60 Q1370,70 1440,50 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};