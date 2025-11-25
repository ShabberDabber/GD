
import React, { FC, useEffect } from 'react';
import { useContent } from './context/ContentContext';
import { useRouter } from './hooks/useRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { CaseStudyDetailPage } from './components/pages/CaseStudyDetailPage';
import { AdminPage } from './components/admin/AdminPage';
import { CustomCursor, CustomCursorProvider } from './components/ui/CustomCursor';
import { FloatingContactButton } from './components/ui/FloatingContactButton';

const App: FC = () => {
  const content = useContent();
  const route = useRouter();

  useEffect(() => {
    if (content?.aboutMe?.theme?.colors) {
      const colors = content.aboutMe.theme.colors;
      const root = document.documentElement;
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key.replace('colors.', '')}`, value as string);
        // Specific mapping for ease of use
        if(key === 'accent-color') root.style.setProperty('--accent-color', value as string);
        if(key === 'accent-secondary-color') root.style.setProperty('--accent-secondary-color', value as string);
        if(key === 'hero-text-color') root.style.setProperty('--hero-text-color', value as string);
        if(key === 'body-headings-color') root.style.setProperty('--body-headings-color', value as string);
        if(key === 'body-text-color') root.style.setProperty('--body-text-color', value as string);
        if(key === 'project-tag-bg-color') root.style.setProperty('--project-tag-bg-color', value as string);
        if(key === 'project-tag-text-color') root.style.setProperty('--project-tag-text-color', value as string);
        if(key === 'header-bg-color') {
             const hex = (value as string).replace('#', '');
             const rgb = hex.match(/.{1,2}/g)?.map(x => parseInt(x, 16)).join(', ');
             if(rgb) root.style.setProperty('--header-bg-color-rgb', rgb);
        }
      });
      document.body.style.backgroundColor = route.path === 'home' ? (colors['hero-bg-color'] || '#0f172a') : (colors['page-bg-color'] || '#ffffff');
    }
  }, [content, route.path]);

  const renderPage = () => {
    switch (route.path) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'project': return <CaseStudyDetailPage />;
      case 'admin': return <AdminPage />;
      default: return <HomePage />;
    }
  };

  return (
    <CustomCursorProvider>
      <div className="relative">
        {!['admin'].includes(route.path) && (
          <>
            <Header />
            <CustomCursor />
            <FloatingContactButton />
          </>
        )}
        <main>{renderPage()}</main>
        {!['admin'].includes(route.path) && <Footer />}
      </div>
    </CustomCursorProvider>
  );
};

export default App;
