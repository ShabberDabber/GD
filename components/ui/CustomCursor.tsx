import React from 'react';

// Define the shape of the hover state
interface HoverState {
  isHovering: boolean;
  text?: string;
}

// Context to manage hover state
interface CursorHoverContextType {
  hoverState: HoverState;
  setHoverState: (state: HoverState) => void;
}

const CursorHoverContext = React.createContext<CursorHoverContextType | undefined>(undefined);

export const useCursorHover = () => {
  const context = React.useContext(CursorHoverContext);
  if (!context) {
    throw new Error('useCursorHover must be used within a CursorHoverProvider');
  }
  return context;
};

export const CursorHoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoverState, setHoverState] = React.useState<HoverState>({ isHovering: false, text: undefined });
  const value = { hoverState, setHoverState };
  return (
    <CursorHoverContext.Provider value={value}>
      {children}
    </CursorHoverContext.Provider>
  );
};


export const CustomCursor: React.FC = () => {
    const { hoverState } = useCursorHover();
    const { isHovering, text } = hoverState;
    const [position, setPosition] = React.useState({ x: -100, y: -100 });
    
    const tailRef = React.useRef<HTMLDivElement>(null);
    const mousePositionRef = React.useRef({ x: -100, y: -100 });
    const hoverStateRef = React.useRef(hoverState);

    // Physics model for position and scale
    const physicsRef = React.useRef({
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        scale: 1, 
        vScale: 0,
    });

    const animationFrameRef = React.useRef<number | null>(null);
    
    // Constants for spring physics
    const STIFFNESS = 0.15;
    const DAMPING = 0.75;
    const SCALE_STIFFNESS = 0.1;
    const SCALE_DAMPING = 0.8;


    React.useEffect(() => {
        hoverStateRef.current = hoverState;
    }, [hoverState]);

    React.useEffect(() => {
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        mousePositionRef.current = { x: startX, y: startY };
        setPosition({ x: startX, y: startY });
        
        // Initialize physics
        physicsRef.current.x = startX;
        physicsRef.current.y = startY;
        
        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleMouseLeave = () => {
          mousePositionRef.current = { x: -100, y: -100 };
          setPosition({ x: -100, y: -100 });
        }
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);


        const updateCursor = () => {
            const phys = physicsRef.current;
            const target = mousePositionRef.current;
            const currentHoverState = hoverStateRef.current;
            
            // 1. Position Physics (Rubber Band Effect)
            const dx = target.x - phys.x;
            const dy = target.y - phys.y;

            phys.vx += dx * STIFFNESS;
            phys.vy += dy * STIFFNESS;

            phys.vx *= DAMPING;
            phys.vy *= DAMPING;

            phys.x += phys.vx;
            phys.y += phys.vy;

            // 2. Scale Physics for hover effect
            const targetScale = currentHoverState.text ? 1.5 : (currentHoverState.isHovering ? 0.5 : 1);
            const dScale = targetScale - phys.scale;
            phys.vScale += dScale * SCALE_STIFFNESS;
            phys.vScale *= SCALE_DAMPING;
            phys.scale += phys.vScale;

            if (tailRef.current) {
                // Use physics position for rubbery lag
                tailRef.current.style.transform = `translate(${phys.x}px, ${phys.y}px) translate(-50%, -50%) scale(${phys.scale})`;
            }
            
            animationFrameRef.current = requestAnimationFrame(updateCursor);
        };
        
        animationFrameRef.current = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const hasText = !!text;

    return (
        <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            <div
                ref={tailRef}
                className={`absolute w-8 h-8 rounded-full transition-colors duration-300 flex items-center justify-center ${
                    (isHovering || hasText) 
                    ? 'bg-white' 
                    : 'border border-gray-400'
                }`}
                style={{
                    top: 0,
                    left: 0,
                    willChange: 'transform',
                }}
            >
              {hasText && (
                <span className="text-[5px] font-bold text-base-dark tracking-widest uppercase">
                  {text}
                </span>
              )}
            </div>
            <div
                className={`absolute w-2 h-2 rounded-full bg-brand-primary transition-transform duration-200 ease-out`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovering || hasText ? 0 : 1})`,
                    willChange: 'transform',
                }}
            />
        </div>
    );
};