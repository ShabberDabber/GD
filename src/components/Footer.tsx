
import React from 'react';
import { useContent } from '../context/ContentContext';

export const Footer = () => {
  const { aboutMe } = useContent();
  return (
    <footer className="bg-base-dark text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-white font-bold mb-2">{aboutMe.name}</h3>
        <p className="mb-4">{aboutMe.title}</p>
        <div className="flex justify-center gap-4 mb-8">
          <a href={`mailto:${aboutMe.email}`} className="hover:text-white">{aboutMe.email}</a>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};
