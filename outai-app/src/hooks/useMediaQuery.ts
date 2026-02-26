import { useSyncExternalStore, useCallback } from 'react';
import { BREAKPOINTS } from '@/lib/constants';

// Server-safe media query hook using useSyncExternalStore
function subscribeToMediaQuery(query: string, callback: () => void) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getMediaQuerySnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => subscribeToMediaQuery(query, callback),
    [query]
  );
  
  const getSnapshot = useCallback(
    () => getMediaQuerySnapshot(query)(),
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}
