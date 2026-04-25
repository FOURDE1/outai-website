/**
 * ScrollProgress — thin gradient bar at the top of the viewport
 * showing how far the user has scrolled down the page.
 */
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #7AC90E, #01A532)',
                transformOrigin: '0%',
                zIndex: 9999,
            }}
        />
    );
}
