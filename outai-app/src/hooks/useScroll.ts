import { useState, useEffect, useCallback } from 'react';
import { throttle } from '@/lib/utils';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollOptions {
  throttleMs?: number;
}

export function useScroll(options: UseScrollOptions = {}) {
  const { throttleMs = 100 } = options;
  
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      setScrollPosition({ x: currentScrollX, y: currentScrollY });
      setIsScrolling(true);

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      lastScrollY = currentScrollY;

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set scrolling to false after scroll ends
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }, throttleMs);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [throttleMs]);

  return { scrollPosition, isScrolling, scrollDirection };
}

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

// Hook for scroll-to-top functionality
export function useScrollToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return scrollToTop;
}

// Hook for scroll-to-element functionality
export function useScrollToElement() {
  const scrollToElement = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }, []);

  return scrollToElement;
}

// Hook for scroll progress (0-1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
