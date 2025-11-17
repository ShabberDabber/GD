import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { PartnersSection } from '../sections/PartnersSection';
import { WorkOverviewSection } from '../sections/WorkOverviewSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WorkOverviewSection />
      <PartnersSection />
    </>
  );
};
