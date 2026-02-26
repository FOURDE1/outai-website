import { Header } from './Header';
import { Footer } from './Footer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
