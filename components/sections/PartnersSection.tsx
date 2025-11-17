
import React, { useState, useEffect } from 'react';
import { LogoGrid } from '../ui/InfiniteLogoWall';
import { client } from '../../lib/sanityClient';
import type { SanityClientLogo } from '../../types';

const SkeletonLoader: React.FC = () => (
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
    {Array.from({ length: 10 }).map((_, index) => (
      <div 
        key={index} 
        className="aspect-[2/1] bg-slate-200 rounded-md animate-pulse"
      />
    ))}
  </div>
);

export const PartnersSection: React.FC = () => {
  const [logos, setLogos] = useState<SanityClientLogo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const query = '*[_type == "clientLogo"]{_id, name, "logoUrl": logo.asset->url}';
        const result = await client.fetch<SanityClientLogo[]>(query);
        setLogos(result);
      } catch (err) {
        console.error('Failed to fetch logos from Sanity:', err);
        setError('Failed to load partner logos.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogos();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold tracking-tight uppercase text-slate-800">
            CLIENTS
           </h2>
        </div>

        {loading && <SkeletonLoader />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && <LogoGrid logos={logos} />}
      </div>
    </section>
  );
};
