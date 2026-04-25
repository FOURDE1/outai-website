/**
 * useDeviceCapability — detects device tier for conditional rendering.
 * Heavy effects (3D, particles) are disabled on mobile / low-perf devices.
 */
import { useMemo } from 'react';
import { useIsMobile } from './useMediaQuery';

interface DeviceCapability {
    /** True when viewport width ≤ 768 px */
    isMobile: boolean;
    /** True for underpowered hardware (≤ 4 logical cores, or if info is unavailable on mobile) */
    isLowPerf: boolean;
    /** True when it's safe to render Three.js / heavy GPU effects */
    canRender3D: boolean;
    /** True when device supports smooth scroll without perf issues */
    canSmoothScroll: boolean;
}

export function useDeviceCapability(): DeviceCapability {
    const isMobile = useIsMobile();

    return useMemo(() => {
        const cores = navigator.hardwareConcurrency ?? 2;
        const isLowPerf = cores <= 4;
        const canRender3D = !isMobile && !isLowPerf;
        const canSmoothScroll = !isMobile; // native scroll feels better on touch

        return { isMobile, isLowPerf, canRender3D, canSmoothScroll };
    }, [isMobile]);
}
