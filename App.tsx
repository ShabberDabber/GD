import React from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { CaseStudiesPage } from './components/pages/CaseStudiesPage';
import { AboutPage } from './components/pages/AboutPage';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { useRouter } from './hooks/useRouter';

const App: React.FC = () => {
  const { path } = useRouter();

  const renderPage = () => {
    if (path.startsWith('/case-studies')) {
      return <CaseStudiesPage />;
    }
    if (path.startsWith('/about')) {
      return <AboutPage />;
    }
    return <HomePage />;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-base-dark">
      <CustomCursor />
      <Header currentPath={path} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;