
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// FIX: Corrected the ErrorBoundary class to properly extend React.Component and initialize state in the constructor.
// This resolves TypeScript errors where `state`, `setState`, and `props` were not recognized, and ensures
// the component can correctly function as an error boundary and accept child components.
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    // We still log here, although the user might not see it.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0f172a', // base-dark from tailwind config
          color: '#f8fafc', // text-primary
          padding: '2rem',
          fontFamily: 'monospace',
          zIndex: 99999,
          overflow: 'auto',
          cursor: 'auto'
        }}>
          <h1 style={{ color: '#ef4444', fontSize: '1.5rem', marginBottom: '1rem' }}>Application Error</h1>
          <p style={{ color: '#fca5a5', marginBottom: '1rem' }}>Something went wrong while rendering the application. Please copy the details below and report this issue.</p>
          <pre style={{
            backgroundColor: '#1e293b', // base-medium
            padding: '1rem',
            borderRadius: '0.5rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            color: '#cbd5e1' // text-secondary
          }}>
            <strong>Error:</strong> {this.state.error?.toString()}
            <br /><br />
            <strong>Stack Trace:</strong>
            <br />
            {this.state.errorInfo?.componentStack || this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
