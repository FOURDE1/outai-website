/**
 * SmoothScroll — wraps the app in a Lenis smooth-scroll provider.
 * Disabled on mobile/touch for better native scroll feel.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const { canSmoothScroll } = useDeviceCapability();

    useEffect(() => {
        if (!canSmoothScroll) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 0, // disable on touch
            infinite: false,
        });
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [canSmoothScroll]);

    return <>{children}</>;
}
