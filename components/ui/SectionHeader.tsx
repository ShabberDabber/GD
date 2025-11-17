import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, titleClassName = 'text-text-primary' }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      {subtitle && (
        <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-2">
          {subtitle}
        </h2>
      )}
      <p className={`text-3xl md:text-4xl font-bold tracking-tight ${titleClassName}`}>
        {title}
      </p>
    </div>
  );
};
