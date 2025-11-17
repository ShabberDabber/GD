import React from 'react';
import { AboutSection } from '../sections/AboutSection';
import { ABOUT_ME } from '../../constants';

const AboutHero: React.FC = () => {
    return (
        <section className="py-24 bg-base-medium">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-2 flex justify-center">
                        <img 
                        src={ABOUT_ME.heroImage} 
                        alt={ABOUT_ME.name} 
                        className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-base-light shadow-2xl"
                        />
                    </div>
                    <div className="md:col-span-3 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight">
                        {ABOUT_ME.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-primary font-semibold mt-2 mb-6">
                        {ABOUT_ME.title}
                        </p>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto md:mx-0">
                        {ABOUT_ME.introStatement}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const AboutPage: React.FC = () => {
  return (
    <>
      <AboutHero />
      <AboutSection />
    </>
  );
};