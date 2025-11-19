
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HERO_PROJECTS, ABOUT_ME, CLIENT_LOGOS, BRAND_LOGOS } from '../constants';
import type { CaseStudyProject, AboutMeData } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface ContentContextType {
  heroProjects: CaseStudyProject[];
  aboutMe: AboutMeData;
  clientLogos: string[];
  brandLogos: string[];
  updateAboutMe: (data: AboutMeData) => void;
  updateHeroProjects: (projects: CaseStudyProject[]) => void;
  updateClientLogos: (logos: string[]) => void;
  updateBrandLogos: (logos: string[]) => void;
  resetToDefaults: () => void;
  isFirebaseActive: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialized with defaults. This is the ultimate fallback.
  const [heroProjects, setHeroProjects] = useState<CaseStudyProject[]>(HERO_PROJECTS);
  const [aboutMe, setAboutMe] = useState<AboutMeData>(ABOUT_ME);
  const [clientLogos, setClientLogos] = useState<string[]>(CLIENT_LOGOS);
  const [brandLogos, setBrandLogos] = useState<string[]>(BRAND_LOGOS);
  const [isFirebaseActive, setIsFirebaseActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to safely merge potentially partial `AboutMeData` with defaults.
  // This prevents crashes if fetched data is missing required nested properties.
  const mergeAboutMeData = (partialData: Partial<AboutMeData>): AboutMeData => {
    return {
      ...ABOUT_ME,
      ...partialData,
      philosophy: Array.isArray(partialData.philosophy) ? partialData.philosophy : ABOUT_ME.philosophy,
      obsessions: Array.isArray(partialData.obsessions) ? partialData.obsessions : ABOUT_ME.obsessions,
      travelLog: Array.isArray(partialData.travelLog) ? partialData.travelLog : ABOUT_ME.travelLog,
      quotes: Array.isArray(partialData.quotes) ? partialData.quotes : ABOUT_ME.quotes,
      favorites: (typeof partialData.favorites === 'object' && partialData.favorites !== null)
        ? { ...ABOUT_ME.favorites, ...partialData.favorites }
        : ABOUT_ME.favorites,
      inspirationGrid: Array.isArray(partialData.inspirationGrid) ? partialData.inspirationGrid : ABOUT_ME.inspirationGrid,
    };
  };

  useEffect(() => {
    // 1. Load from LocalStorage first for instant content display
    try {
      const storedProjects = localStorage.getItem('heroProjects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        if (Array.isArray(parsed)) setHeroProjects(parsed);
      }

      const storedAboutMe = localStorage.getItem('aboutMe');
      if (storedAboutMe) {
        const parsed = JSON.parse(storedAboutMe);
        if (typeof parsed === 'object' && parsed !== null) setAboutMe(mergeAboutMeData(parsed));
      }
      
      const storedClientLogos = localStorage.getItem('clientLogos');
      if (storedClientLogos) {
          const parsed = JSON.parse(storedClientLogos);
          if (Array.isArray(parsed)) setClientLogos(parsed);
      }
      
      const storedBrandLogos = localStorage.getItem('brandLogos');
      if (storedBrandLogos) {
          const parsed = JSON.parse(storedBrandLogos);
          if (Array.isArray(parsed)) setBrandLogos(parsed);
      }
    } catch (error) {
      console.error("Failed to parse localStorage data. Clearing storage to prevent further issues.", error);
      localStorage.clear();
      // State is already set to defaults, so we just fall back to that.
    }

    // 2. Setup Firebase auth listener
    if (auth) {
        onAuthStateChanged(auth, (user) => setIsAuthenticated(!!user));
    }

    // 3. Sync with Firebase, which will overwrite localStorage data if available
    if (db) {
        setIsFirebaseActive(true);
        
        const unsubProjects = onSnapshot(doc(db, 'content', 'heroProjects'), (doc) => {
            const data = doc.data()?.data;
            if (doc.exists() && Array.isArray(data)) setHeroProjects(data);
        });
        
        const unsubAbout = onSnapshot(doc(db, 'content', 'aboutMe'), (doc) => {
            const data = doc.data()?.data;
            if (doc.exists() && typeof data === 'object' && data !== null) {
                setAboutMe(mergeAboutMeData(data));
            }
        });
        
        const unsubLogos = onSnapshot(doc(db, 'content', 'logos'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                if (Array.isArray(data.clientLogos)) setClientLogos(data.clientLogos);
                if (Array.isArray(data.brandLogos)) setBrandLogos(data.brandLogos);
            }
        });

        return () => {
            unsubProjects();
            unsubAbout();
            unsubLogos();
        };
    }
  }, []);

  const persist = async (key: string, data: any, firestoreCollection: string = 'content') => {
      localStorage.setItem(key, JSON.stringify(data));
      if (db && isAuthenticated) {
          try {
              if (key === 'clientLogos' || key === 'brandLogos') {
                  const docRef = doc(db, firestoreCollection, 'logos');
                  await setDoc(docRef, { 
                      clientLogos: key === 'clientLogos' ? data : clientLogos,
                      brandLogos: key === 'brandLogos' ? data : brandLogos
                  }, { merge: true });
              } else {
                 await setDoc(doc(db, firestoreCollection, key), { data });
              }
          } catch (e) {
              console.error("Error saving to Firebase", e);
          }
      }
  };

  const updateAboutMe = (data: AboutMeData) => {
      setAboutMe(data);
      persist('aboutMe', data);
  };
  const updateHeroProjects = (projects: CaseStudyProject[]) => {
      setHeroProjects(projects);
      persist('heroProjects', projects);
  };
  const updateClientLogos = (logos: string[]) => {
      setClientLogos(logos);
      persist('clientLogos', logos);
  };
  const updateBrandLogos = (logos: string[]) => {
      setBrandLogos(logos);
      persist('brandLogos', logos);
  };

  const resetToDefaults = () => {
    setHeroProjects(HERO_PROJECTS);
    setAboutMe(ABOUT_ME);
    setClientLogos(CLIENT_LOGOS);
    setBrandLogos(BRAND_LOGOS);
    
    localStorage.removeItem('heroProjects');
    localStorage.removeItem('aboutMe');
    localStorage.removeItem('clientLogos');
    localStorage.removeItem('brandLogos');

    alert("Local data reset. If connected to Firebase, data may reappear.");
  };

  return (
    <ContentContext.Provider value={{
      heroProjects,
      aboutMe,
      clientLogos,
      brandLogos,
      updateAboutMe,
      updateHeroProjects,
      updateClientLogos,
      updateBrandLogos,
      resetToDefaults,
      isFirebaseActive
    }}>
      {children}
    </ContentContext.Provider>
  );
};
