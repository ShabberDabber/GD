
import React, { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-slate-900 text-white p-8 z-50">
          <h1 className="text-2xl text-red-500 mb-4">Something went wrong.</h1>
          <pre className="bg-slate-800 p-4 rounded">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
