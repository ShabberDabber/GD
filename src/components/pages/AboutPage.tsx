
import React from 'react';
import { useContent } from '../../context/ContentContext';

export const AboutPage = () => {
  const { aboutMe } = useContent();
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8">{aboutMe.aboutPage.heading}</h1>
        <p className="text-xl leading-relaxed mb-12">{aboutMe.aboutPage.intro}</p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">My Philosophy</h2>
            {aboutMe.aboutPage.philosophy.points.map((point: any, i: number) => (
              <div key={i} className="mb-6">
                <h3 className="font-bold mb-2">{point.title}</h3>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
