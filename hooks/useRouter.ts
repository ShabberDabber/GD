import { useState, useEffect } from 'react';

export const useRouter = () => {
  const [path, setPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => {
      // When hash changes, update the state and scroll to the top of the page
      setPath(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onHashChange);

    // Initial scroll to top
    window.scrollTo(0, 0);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return { path };
};
