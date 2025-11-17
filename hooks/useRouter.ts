import { useState, useEffect } from 'react';

export const useRouter = () => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial path
    setPath(window.location.hash.slice(1) || '/');


    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { path };
};