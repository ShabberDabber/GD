
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CursorHoverProvider } from './components/ui/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary';

// --- Global Error Handler ---
// This will catch errors that happen outside of React's lifecycle
// and display them on the screen since the user cannot open the console.
const showErrorOverlay = (message: string) => {
  // Hide the main app root
  const appRoot = document.getElementById('root');
  if (appRoot) {
    appRoot.style.display = 'none';
  }

  // Check if an overlay already exists
  let overlay = document.getElementById('error-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'error-overlay';
    // Style the overlay to be very prominent
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      backgroundColor: '#0f172a', // base-dark
      color: '#f8fafc', // text-primary
      padding: '2rem',
      fontFamily: 'monospace',
      zIndex: '99999',
      overflow: 'auto',
      cursor: 'auto'
    });
    document.body.appendChild(overlay);
  }

  // Add the error message
  overlay.innerHTML = `
    <h1 style="color: #ef4444; font-size: 1.5rem; margin-bottom: 1rem;">A critical error occurred</h1>
    <p style="color: #fca5a5; margin-bottom: 1rem;">The application could not start. Please copy the details below and report this issue.</p>
    <pre style="background-color: #1e293b; padding: 1rem; border-radius: 0.5rem; white-space: pre-wrap; word-break: break-all; color: #cbd5e1;">${message}</pre>
  `;
};

window.addEventListener('error', (event) => {
  showErrorOverlay(`Error: ${event.message}\nSource: ${event.filename}\nLine: ${event.lineno}, Col: ${event.colno}`);
});

window.addEventListener('unhandledrejection', (event) => {
  let reason = event.reason;
  if (reason instanceof Error) {
    reason = `${reason.message}\n${reason.stack}`;
  }
  showErrorOverlay(`Unhandled Promise Rejection:\nReason: ${reason}`);
});
// --- End Global Error Handler ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  showErrorOverlay('Fatal Error: The root HTML element with ID "root" was not found in the document.');
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CursorHoverProvider>
        <App />
      </CursorHoverProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
