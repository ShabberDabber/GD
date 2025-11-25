
import { useState, useEffect } from 'react';

export const useRouter = () => {
  const [route, setRoute] = useState({ path: '', params: {} as any });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2);
      const [path, ...rest] = hash.split('/');
      
      if (path === 'project' && rest.length > 0) {
        setRoute({ path: 'project', params: { id: rest[0] } });
      } else if (path === 'admin') {
        setRoute({ path: 'admin', params: {} });
      } else if (path === 'about') {
        setRoute({ path: 'about', params: {} });
      } else {
        setRoute({ path: 'home', params: {} });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
};
