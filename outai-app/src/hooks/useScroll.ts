import { useState, useEffect } from 'react';

// Hook for detecting if scrolled past a certain point
export function useScrollPast(threshold: number = 100) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > threshold);
    };

    // Check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolledPast;
}
