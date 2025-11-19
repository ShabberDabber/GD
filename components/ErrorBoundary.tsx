
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Fix: Explicitly extend React.Component to resolve a potential type resolution issue where properties like `props` and `setState` were not being correctly inferred on the class instance.
class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Replaced state class property with initialization in the constructor.
  // This ensures compatibility with build environments that might not support
  // class field syntax, which can lead to the reported type errors for `setState` and `props`.
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
