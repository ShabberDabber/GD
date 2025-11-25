import React, { useState, useEffect, createContext, useContext, useRef, ReactNode } from 'react';

const CursorStateContext = createContext<string>('default');
const CursorDispatchContext = createContext<any>(null);

export const CustomCursorProvider = ({ children }: { children: ReactNode }) => {
  const [hoverState, setHoverState] = useState('default');
  
  useEffect(() => {
    // Hide default cursor when the custom cursor provider is active
    document.body.classList.add('hide-cursor');
    return () => {
      document.body.classList.remove('hide-cursor');
    };
  }, []);

  return (
    <CursorStateContext.Provider value={hoverState}>
      <CursorDispatchContext.Provider value={{ setHoverState }}>
        {children}
      </CursorDispatchContext.Provider>
    </CursorStateContext.Provider>
  );
};

export const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const hoverState = useContext(CursorStateContext);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (outerRef.current && innerRef.current) {
        outerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const outerSize = hoverState !== 'default' ? 'w-24 h-24' : 'w-10 h-10';
  const outerColor = hoverState !== 'default' ? 'bg-white' : 'bg-transparent';
  
  return (
    <>
      <div ref={outerRef} className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 ${outerSize} ${outerColor} border-2 border-brand-primary rounded-full pointer-events-none transition-all duration-300 z-50 flex items-center justify-center mix-blend-difference`} />
      <div ref={innerRef} className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-primary rounded-full pointer-events-none z-50" />
    </>
  );
};