
import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useRouter } from '../../hooks/useRouter';

export const CaseStudyDetailPage = () => {
  const { heroProjects } = useContent();
  const { params } = useRouter();
  const project = heroProjects.find((p: any) => p.id === params.id);

  if (!project) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black mb-4 text-center">{project.title}</h1>
        <p className="text-xl text-center text-gray-500 mb-12">{project.client}</p>
        
        {project.contentBlocks.map((block: any, i: number) => (
          <div key={i} className="my-12 max-w-4xl mx-auto">
            {block.type === 'text' && <div dangerouslySetInnerHTML={{ __html: block.data.body }} />}
            {block.type === 'hero' && <img src={block.data.images[0].url} className="w-full rounded-lg shadow-xl" />}
          </div>
        ))}
      </div>
    </div>
  );
};
