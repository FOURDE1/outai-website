import { useSyncExternalStore, useCallback } from 'react';
import { BREAKPOINTS } from '@/lib/constants';

type BreakpointKey = keyof typeof BREAKPOINTS;

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

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function useBreakpoint(breakpoint: BreakpointKey): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
}

export function useBreakpointValue<T>(values: Partial<Record<BreakpointKey, T>>, defaultValue: T): T {
  const xl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const lg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const md = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const sm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);

  if (xl && values.xl !== undefined) return values.xl;
  if (lg && values.lg !== undefined) return values.lg;
  if (md && values.md !== undefined) return values.md;
  if (sm && values.sm !== undefined) return values.sm;
  if (values.xs !== undefined) return values.xs;

  return defaultValue;
}
