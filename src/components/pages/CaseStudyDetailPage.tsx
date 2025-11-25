import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useRouter } from '../../hooks/useRouter';

// --- Sub-components (Blocks) ---

const HeroBlock = ({ data }: any) => {
  const { images, style } = data;
  if (!images || images.length === 0) return null;

  if (style === 'duo' && images.length >= 2) {
    return (
      <div className="grid md:grid-cols-2 gap-4 my-12">
        <img src={images[0].url} alt={images[0].alt} className="w-full h-auto rounded-lg" />
        <img src={images[1].url} alt={images[1].alt} className="w-full h-auto rounded-lg mt-12 md:mt-24" />
      </div>
    );
  }
  return (
    <div className="my-12">
      <img src={images[0].url} alt={images[0].alt} className="w-full h-auto rounded-lg" />
    </div>
  );
};

const TextBlock = ({ data, aboutMe }: any) => {
  return (
    <div className="my-16 max-w-3xl mx-auto">
      {data.heading && <h3 className="text-3xl font-bold mb-6" style={{ color: aboutMe.theme.colors['body-headings-color'] }}>{data.heading}</h3>}
      <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: aboutMe.theme.colors['body-text-color'] }}>{data.body}</p>
    </div>
  );
};

const TextWithImagesBlock = ({ data, aboutMe }: any) => {
  const { heading, body, images, imagePosition } = data;
  const isRight = imagePosition === 'right';
  
  return (
    <div className={`my-20 grid md:grid-cols-2 gap-12 items-center`}>
      <div className={`${isRight ? 'order-1' : 'order-2'}`}>
        {heading && <h3 className="text-3xl font-bold mb-6" style={{ color: aboutMe.theme.colors['body-headings-color'] }}>{heading}</h3>}
        <p className="text-lg leading-relaxed" style={{ color: aboutMe.theme.colors['body-text-color'] }}>{body}</p>
      </div>
      <div className={`${isRight ? 'order-2' : 'order-1'}`}>
        {images && images.map((img: any, i: number) => (
           <img key={i} src={img.url} alt={img.alt} className="w-full rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
};

const PanoBlock = ({ data }: any) => {
  if (!data.url) return null;
  return (
    <div className="my-20 w-full">
      <img src={data.url} alt={data.alt || 'Panoramic view'} className="w-full h-auto object-cover" />
    </div>
  );
};

const StatsBlock = ({ data, aboutMe }: any) => {
  return (
    <div className="my-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center border-y py-12" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
      {data.stats.map((stat: any, i: number) => (
        <div key={i}>
          <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: aboutMe.theme.colors['accent-color'] }}>{stat.value}</div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const QuoteBlock = ({ data, aboutMe }: any) => {
  const quote = data.quotes?.[0];
  if (!quote) return null;
  return (
    <div className="my-20 max-w-4xl mx-auto text-center">
      <blockquote className="text-3xl md:text-4xl font-bold italic leading-tight mb-8" style={{ color: aboutMe.theme.colors['body-headings-color'] }}>
        "{quote.text}"
      </blockquote>
      <cite className="not-italic text-lg font-semibold text-gray-500">— {quote.author}</cite>
    </div>
  );
};

// --- Main Page Component ---

export const CaseStudyDetailPage = () => {
  const { heroProjects, aboutMe } = useContent();
  const { params } = useRouter();
  const project = heroProjects.find((p: any) => p.id === params.id);

  if (!project) return <div className="pt-32 text-center">Project not found.</div>;

  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ backgroundColor: aboutMe.theme.colors['page-bg-color'] }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Block */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4" style={{ color: aboutMe.theme.colors['body-headings-color'] }}>{project.title}</h1>
          <h2 className="text-2xl font-bold text-gray-500 mb-8">{project.client}</h2>
          <div className="flex justify-center gap-2 flex-wrap">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: aboutMe.theme.colors['project-tag-bg-color'], color: aboutMe.theme.colors['project-tag-text-color'] }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Blocks */}
        {project.contentBlocks.map((block: any, i: number) => {
          switch (block.type) {
            case 'hero': return <HeroBlock key={i} data={block.data} />;
            case 'text': return <TextBlock key={i} data={block.data} aboutMe={aboutMe} />;
            case 'textWithImages': return <TextWithImagesBlock key={i} data={block.data} aboutMe={aboutMe} />;
            case 'pano': return <PanoBlock key={i} data={block.data} />;
            case 'stats': return <StatsBlock key={i} data={block.data} aboutMe={aboutMe} />;
            case 'quote': return <QuoteBlock key={i} data={block.data} aboutMe={aboutMe} />;
            default: return null;
          }
        })}
      </div>
    </div>
  );
};