
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HERO_PROJECTS, ABOUT_ME, CLIENT_LOGOS, BRAND_LOGOS } from '../constants';
import type { CaseStudyProject, AboutMeData } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
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
  // State
  const [heroProjects, setHeroProjects] = useState<CaseStudyProject[]>(HERO_PROJECTS);
  const [aboutMe, setAboutMe] = useState<AboutMeData>(ABOUT_ME);
  const [clientLogos, setClientLogos] = useState<string[]>(CLIENT_LOGOS);
  const [brandLogos, setBrandLogos] = useState<string[]>(BRAND_LOGOS);
  const [isFirebaseActive, setIsFirebaseActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Data (Hybrid Strategy)
  useEffect(() => {
    // 1. Load from LocalStorage immediately (Fastest for Demo)
    const loadLocal = (key: string, setter: any, defaultVal: any) => {
        const stored = localStorage.getItem(key);
        if (stored) setter(JSON.parse(stored));
        else setter(defaultVal);
    };
    loadLocal('heroProjects', setHeroProjects, HERO_PROJECTS);
    loadLocal('aboutMe', setAboutMe, ABOUT_ME);
    loadLocal('clientLogos', setClientLogos, CLIENT_LOGOS);
    loadLocal('brandLogos', setBrandLogos, BRAND_LOGOS);

    // 2. Check Auth for Write Access
    if (auth) {
        onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
    }

    // 3. Sync with Firebase if available
    if (db) {
        setIsFirebaseActive(true);
        
        // Listen for updates from Firestore
        const unsubH = onSnapshot(doc(db, 'content', 'heroProjects'), (doc) => {
            if (doc.exists()) setHeroProjects(doc.data().data);
        });
        const unsubA = onSnapshot(doc(db, 'content', 'aboutMe'), (doc) => {
            if (doc.exists()) setAboutMe(doc.data().data);
        });
        const unsubL = onSnapshot(doc(db, 'content', 'logos'), (doc) => {
            if (doc.exists()) {
                setClientLogos(doc.data().clientLogos || []);
                setBrandLogos(doc.data().brandLogos || []);
            }
        });

        return () => {
            unsubH(); unsubA(); unsubL();
        };
    }
  }, []);

  // Persistence Logic
  const persist = async (key: string, data: any, firestoreCollection: string = 'content') => {
      // Always save to LocalStorage (Offline/Demo fallback)
      localStorage.setItem(key, JSON.stringify(data));

      // Save to Firestore if connected and authenticated
      if (db && isAuthenticated) {
          try {
              // Special handling for logos which share a doc
              if (key === 'clientLogos' || key === 'brandLogos') {
                  const docRef = doc(db, firestoreCollection, 'logos');
                  // We need to merge, so we assume the other state is current
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
    
    // Clear storage
    localStorage.removeItem('heroProjects');
    localStorage.removeItem('aboutMe');
    localStorage.removeItem('clientLogos');
    localStorage.removeItem('brandLogos');

    // Note: Does not reset Firebase to prevent accidental wipes of prod data
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