
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContentProvider } from './context/ContentContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Inject Global Styles
const globalStyles = `
  body.hide-cursor, body.hide-cursor * { cursor: none; }
  .header-with-blur::before {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background-color: rgba(var(--header-bg-color-rgb, 15, 23, 42), 0.8);
    -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  }
  .logo-dragging, .project-dragging, .block-dragging {
    opacity: 0.5; transform: scale(1.02);
    box-shadow: 0 0 20px rgba(8, 145, 178, 0.7); background: #e0f2fe;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

// Configure Tailwind
// @ts-ignore
window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'], },
      colors: {
        'brand-primary': 'var(--accent-color, #0891b2)', 
        'brand-secondary': 'var(--accent-secondary-color, #f0f9ff)', 
        'base-dark': '#0f172a', 'base-medium': '#1e293b', 'base-light': '#334155',
        'text-primary': 'var(--hero-text-color, #f8fafc)',
        'text-secondary': '#cbd5e1', 'text-tertiary': '#94a3b8',
        'body-headings': 'var(--body-headings-color, #1e293b)',
        'body-text': 'var(--body-text-color, #475569)',
        'tag-bg': 'var(--project-tag-bg-color)', 'tag-text': 'var(--project-tag-text-color)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'infinite-scroll-left': 'infinite-scroll-left 60s linear infinite',
        'infinite-scroll-right': 'infinite-scroll-right 60s linear infinite',
      },
      keyframes: {
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, },
        'infinite-scroll-left': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' }, },
        'infinite-scroll-right': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' }, },
      }
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ContentProvider>
        <App />
      </ContentProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);