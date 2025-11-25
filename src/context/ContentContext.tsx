
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { DEFAULT_CONTENT } from '../constants';

const ContentContext = createContext<any>(null);
const ContentDispatchContext = createContext<any>(null);
const LOCAL_STORAGE_KEY = 'portfolio-content';

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    if (db) {
      const docRef = doc(db, 'content', 'main');
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          setContent(DEFAULT_CONTENT);
        }
        setIsLoading(false);
      }, (error) => {
        console.error("Firestore error:", error);
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        setContent(localData ? JSON.parse(localData) : DEFAULT_CONTENT);
        setIsLoading(false);
      });
    } else {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      setContent(localData ? JSON.parse(localData) : DEFAULT_CONTENT);
      setIsLoading(false);
    }
    return () => unsubscribe();
  }, []);

  const updateContent = async (newContent: any) => {
    setContent(newContent);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    if (db) {
      try {
        await setDoc(doc(db, 'content', 'main'), newContent);
      } catch (error) {
        console.error("Firestore write error:", error);
      }
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;

  return (
    <ContentContext.Provider value={content}>
      <ContentDispatchContext.Provider value={{ updateContent }}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
export const useContentDispatch = () => useContext(ContentDispatchContext);
