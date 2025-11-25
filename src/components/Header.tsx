
import React from 'react';
import { useContent } from '../context/ContentContext';

export const Header = () => {
  const { aboutMe } = useContent();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-6 flex justify-between items-center mix-blend-difference text-white">
      <a href="#/" className="text-2xl font-black">{aboutMe.theme.headerLogoText}</a>
      <nav className="hidden md:flex gap-8 font-semibold">
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <button>Contact</button>
      </nav>
    </header>
  );
};
