import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            padding: '40px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 0.2) 0%, rgba(1, 165, 50, 0.2) 76%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, #01A532)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: '22px',
                marginBottom: '24px',
              }}
            >
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
