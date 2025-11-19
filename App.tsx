
import React from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { CaseStudyDetailPage } from './components/pages/CaseStudyDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { AdminPage } from './components/admin/AdminPage';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingContactButton } from './components/ui/FloatingContactButton';
import { useRouter } from './hooks/useRouter';
import { ContentProvider } from './context/ContentContext';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Admin Route - No Header/Footer
  if (path === '#/admin') {
    return <AdminPage />;
  }

  const renderPage = () => {
    if (path === '#/about') {
      return <AboutPage />;
    }
    
    if (path.startsWith('#/project/')) {
      // Split path to get ID
      const pathParts = path.split('/');
      const idAndQuery = pathParts[2] || ''; 
      
      const [projectId] = idAndQuery.split('?'); // Still split to handle old bookmarks gracefully

      return <CaseStudyDetailPage key={projectId} projectId={projectId} />;
    }
    
    return <HomePage />;
  };

  const isDetailPage = path.startsWith('#/project/');
  const isAboutPage = path === '#/about';
  const isLightBackground = isDetailPage || isAboutPage;

  return (
    <div className="min-h-screen flex flex-col bg-base-dark">
      <CustomCursor />
      <Header />
      <main className={`flex-grow ${isLightBackground ? 'bg-white' : ''}`}>
        {renderPage()}
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
};

export default App;
