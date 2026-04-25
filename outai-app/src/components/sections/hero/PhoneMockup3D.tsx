/**
 * PhoneMockup3D — A Three.js-based 3D phone with cycling demo screens.
 * Mouse-tracking gyroscopic tilt, subtle float animation, and environment reflections.
 * Lazy-loaded and only rendered on desktop (canRender3D).
 */
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Demo screens — gradient colors representing different app screens
const SCREEN_COLORS: [string, string][] = [
    ['#01A532', '#7AC90E'], // Ride - green
    ['#1E3A5F', '#3B82F6'], // Pickup - blue
    ['#F59E0B', '#EF4444'], // Delivery - amber/red
    ['#8B5CF6', '#EC4899'], // Winch - purple/pink
];

interface PhoneModelProps {
    mouseX: number;
    mouseY: number;
}

function PhoneModel({ mouseX, mouseY }: PhoneModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const [screenIndex, setScreenIndex] = useState(0);
    const { viewport } = useThree();

    // Cycle screens every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setScreenIndex((prev) => (prev + 1) % SCREEN_COLORS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Animate: gyroscopic tilt follows mouse + subtle float
    useFrame((state) => {
        if (!meshRef.current) return;

        const targetRotationY = (mouseX - 0.5) * 0.4;
        const targetRotationX = -(mouseY - 0.5) * 0.3;
        const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetRotationY,
            0.05
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            targetRotationX,
            0.05
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
            meshRef.current.position.y,
            floatY,
            0.03
        );

        // Animate screen color transition
        if (screenRef.current) {
            const mat = screenRef.current.material as THREE.MeshStandardMaterial;
            const [c1] = SCREEN_COLORS[screenIndex];
            const target = new THREE.Color(c1);
            mat.color.lerp(target, 0.05);
            mat.emissive.lerp(target, 0.03);
        }
    });

    // Scale phone to viewport
    const scale = Math.min(viewport.width, viewport.height) * 0.2;

    return (
        <group ref={meshRef} scale={scale}>
            {/* Phone body */}
            <RoundedBox
                args={[1.1, 2.2, 0.08]}
                radius={0.12}
                smoothness={8}
            >
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.15}
                />
            </RoundedBox>

            {/* Screen */}
            <mesh
                ref={screenRef}
                position={[0, 0, 0.042]}
            >
                <planeGeometry args={[0.95, 2.0]} />
                <meshStandardMaterial
                    color={SCREEN_COLORS[0][0]}
                    emissive={SCREEN_COLORS[0][0]}
                    emissiveIntensity={0.3}
                    metalness={0.1}
                    roughness={0.3}
                />
            </mesh>

            {/* Notch */}
            <mesh position={[0, 0.95, 0.043]}>
                <planeGeometry args={[0.35, 0.06]} />
                <meshStandardMaterial color="#111111" />
            </mesh>

            {/* Home indicator */}
            <mesh position={[0, -0.95, 0.043]}>
                <planeGeometry args={[0.25, 0.02]} />
                <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Camera lens (back) */}
            <mesh position={[-0.35, 0.85, -0.042]}>
                <circleGeometry args={[0.06, 32]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.05}
                />
            </mesh>

            {/* Side button (power) */}
            <mesh position={[0.56, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.15, 0.02, 0.04]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
            </mesh>
        </group>
    );
}

interface PhoneMockup3DProps {
    className?: string;
    style?: React.CSSProperties;
}

export function PhoneMockup3D({ className, style }: PhoneMockup3DProps) {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                minHeight: '400px',
                ...style,
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 4], fov: 35 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                    <pointLight position={[-3, -3, 2]} intensity={0.3} color="#01A532" />
                    <pointLight position={[3, 2, 2]} intensity={0.2} color="#7AC90E" />
                    <PhoneModel mouseX={mousePos.x} mouseY={mousePos.y} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
