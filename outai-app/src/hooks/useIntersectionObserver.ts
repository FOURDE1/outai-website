import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = useRef(false);

  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]): void => {
      if (frozen.current && freezeOnceVisible) return;

      setEntry(entry);

      if (entry.isIntersecting && freezeOnceVisible) {
        frozen.current = true;
      }
    },
    [freezeOnceVisible]
  );

  useEffect(() => {
    const node = ref.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [root, rootMargin, threshold, updateEntry]);

  return {
    ref,
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  };
}

// Hook specifically for scroll animations
export function useScrollAnimation(options: UseIntersectionObserverOptions = {}) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px',
    freezeOnceVisible: true,
    ...options,
  });

  return { ref, isVisible: isIntersecting };
}
