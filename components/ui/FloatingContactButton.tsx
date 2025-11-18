
import React, { useState, useRef, useEffect } from 'react';
import { useCursorHover } from './CustomCursor';
import { useContent } from '../../context/ContentContext';

export const FloatingContactButton: React.FC = () => {
  const { aboutMe } = useContent();
  const { setIsHovering } = useCursorHover();
  const [isHovered, setIsHovered] = useState(false);
  
  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  // Physics State
  const mouseRef = useRef({ x: 0, y: 0 });
  const physicsRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  
  // Rotation State
  const rotationRef = useRef({ current: 0, velocity: 0 });
  const scrollRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !isHovered) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Mouse position relative to center
    mouseRef.current = {
      x: (e.clientX - rect.left) - centerX,
      y: (e.clientY - rect.top) - centerY
    };
  };

  // Setup Scroll Listener
  useEffect(() => {
    scrollRef.current = window.scrollY;
    
    const handleScroll = () => {
      const now = Date.now();
      const newY = window.scrollY;
      const delta = newY - scrollRef.current;
      
      scrollRef.current = newY;
      lastScrollTimeRef.current = now;

      // Only apply scroll rotation if NOT hovered.
      // If hovered, we want it to stabilize for interaction.
      if (!isHovered) {
        // Rotation factor: Adjust for gear-like feel. 
        rotationRef.current.current += delta * 0.5;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered]);

  // Animation Loop
  useEffect(() => {
    if (!isHovered) {
        mouseRef.current = { x: 0, y: 0 };
    }

    const animate = () => {
        // 1. Inner Circle Magnetic Physics (Mouse interaction)
        const targetX = mouseRef.current.x;
        const targetY = mouseRef.current.y;
        const phys = physicsRef.current;

        const stiffness = 0.05;
        const damping = 0.8;

        const dx = targetX - phys.x;
        const dy = targetY - phys.y;

        phys.vx += dx * stiffness;
        phys.vy += dy * stiffness;
        phys.vx *= damping;
        phys.vy *= damping;
        phys.x += phys.vx;
        phys.y += phys.vy;

        // Clamp translation for the inner circle
        const limit = 30;
        const clampedX = Math.max(Math.min(phys.x, limit), -limit);
        const clampedY = Math.max(Math.min(phys.y, limit), -limit);

        if (circleRef.current) {
            circleRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
        }

        // 2. Rotation Physics (Gear Effect + Sway Back)
        const now = Date.now();
        const timeSinceScroll = now - lastScrollTimeRef.current;
        let rot = rotationRef.current.current;
        let vel = rotationRef.current.velocity;
        
        // Determine if we should be "swinging back"
        // Trigger if hovered OR if scroll has stopped for > 1s
        if (isHovered || timeSinceScroll > 1000) {
             // Target nearest upright position (multiples of 360)
             const target = Math.round(rot / 360) * 360;
             
             // Spring physics for smooth sway
             const springK = 0.05;
             const springD = 0.9;
             
             const diff = target - rot;
             vel += diff * springK;
             vel *= springD;
             rot += vel;
        } else {
            // While scrolling, we just maintain position set by scroll handler.
            vel = 0;
        }
        
        rotationRef.current.current = rot;
        rotationRef.current.velocity = vel;

        if (contentRef.current) {
             contentRef.current.style.transform = `rotate(${rot}deg)`;
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered]);


  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
      <div 
        ref={wrapperRef}
        className={`pointer-events-auto bg-brand-primary text-white shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative rounded-full flex items-center justify-center
          ${isHovered ? 'w-60 h-60' : 'w-20 h-20'}`}
        style={{ willChange: 'width, height' }}
        onMouseEnter={() => {
            setIsHovered(true);
            setIsHovering(true);
        }}
        onMouseLeave={() => {
            setIsHovered(false);
            setIsHovering(false);
        }}
        onMouseMove={handleMouseMove}
      >
         {/* Rotating Content Container */}
         <div 
            ref={contentRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ willChange: 'transform' }}
         >
             {/* Inner Physics Circle */}
             <div 
                ref={circleRef}
                className={`absolute w-48 h-48 rounded-full border border-white/30 pointer-events-none transition-opacity duration-500
                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}
             />

             {/* Collapsed State Content - Rotating with container */}
            <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 
                ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}
            >
                <span className="text-xs font-bold tracking-widest">HELLo</span>
            </div>

            {/* Expanded State Content */}
            <div 
                className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-all duration-300 delay-75 z-10
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
            >
                <div className="flex flex-col gap-1 items-center">
                    <h3 className="text-5xl font-black mb-2 leading-none">Hi!</h3>
                    <a href={`mailto:${aboutMe.email}`} className="text-xl font-bold hover:text-brand-secondary transition-colors block">
                       {aboutMe.email}
                    </a>
                    <a href={`tel:${aboutMe.phone.replace(/[^0-9+]/g, '')}`} className="text-lg font-medium hover:text-brand-secondary transition-colors block opacity-80">
                        {aboutMe.phone}
                    </a>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
