/**
 * HeroParticles — floating gradient orbs in the hero background.
 * CSS-only implementation (no Three.js) for lightweight performance.
 * Uses animated radial-gradient divs with translate keyframes.
 */
import { useMemo } from 'react';

interface ParticleConfig {
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
    color1: string;
    color2: string;
}

const PARTICLE_COLORS: [string, string][] = [
    ['rgba(122, 201, 14, 0.25)', 'rgba(1, 165, 50, 0.08)'],
    ['rgba(1, 165, 50, 0.2)', 'rgba(122, 201, 14, 0.05)'],
    ['rgba(7, 186, 60, 0.15)', 'rgba(47, 226, 151, 0.05)'],
    ['rgba(122, 201, 14, 0.12)', 'rgba(1, 165, 50, 0.03)'],
    ['rgba(47, 226, 151, 0.18)', 'rgba(7, 186, 60, 0.06)'],
    ['rgba(1, 165, 50, 0.22)', 'rgba(122, 201, 14, 0.08)'],
];

export function HeroParticles() {
    const particles = useMemo<ParticleConfig[]>(() => {
        return Array.from({ length: 6 }, (_, i) => ({
            size: 100 + Math.random() * 200,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            duration: 15 + Math.random() * 20,
            delay: i * -3,
            opacity: 0.4 + Math.random() * 0.3,
            color1: PARTICLE_COLORS[i % PARTICLE_COLORS.length][0],
            color2: PARTICLE_COLORS[i % PARTICLE_COLORS.length][1],
        }));
    }, []);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            position: 'absolute',
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${p.color1}, ${p.color2})`,
                            filter: `blur(${40 + i * 10}px)`,
                            opacity: p.opacity,
                            animationName: `heroParticleDrift${i % 3}`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            willChange: 'transform',
                        }}
                    />
                ))}
            </div>

            {/* Keyframe animations — 3 variations to avoid uniform movement */}
            <style>{`
        @keyframes heroParticleDrift0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.05); }
          50% { transform: translate(-20px, 25px) scale(0.95); }
          75% { transform: translate(15px, -15px) scale(1.02); }
        }
        @keyframes heroParticleDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25px, 20px) scale(0.97); }
          50% { transform: translate(35px, -30px) scale(1.04); }
          75% { transform: translate(-10px, 40px) scale(0.98); }
        }
        @keyframes heroParticleDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 30px) scale(1.03); }
          66% { transform: translate(-30px, -20px) scale(0.96); }
        }
      `}</style>
        </>
    );
}
