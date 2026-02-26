import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { viewportSettings } from '@/lib/animations';
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook: fires callback when element enters viewport.
 * Does NOT use useInView + useEffect/setState pattern
 * that triggers the React compiler lint rule.
 */
function useOnEnterView(
  ref: React.RefObject<HTMLElement | null>,
  threshold: number,
  onEnter: () => void,
  onLeave: () => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter();
        else onLeave();
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // intentionally only depend on threshold
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, threshold]);
}

// Feature card colors matching Figma
const featureStyles = {
  'user-friendly': {
    borderColor: '#FADF23',
    glowColor: 'rgba(250, 223, 35, 0.4)',
    glowColorHover: 'rgba(250, 223, 35, 0.7)',
  },
  'competitive-rates': {
    borderColor: '#DA33FF',
    glowColor: 'rgba(218, 51, 255, 0.4)',
    glowColorHover: 'rgba(218, 51, 255, 0.7)',
  },
  'awesome-services': {
    borderColor: '#2FE297',
    glowColor: 'rgba(47, 226, 151, 0.4)',
    glowColorHover: 'rgba(47, 226, 151, 0.7)',
  },
  'professional-captains': {
    borderColor: '#FF9232',
    glowColor: 'rgba(255, 146, 50, 0.4)',
    glowColorHover: 'rgba(255, 146, 50, 0.7)',
  },
  'around-the-clock': {
    borderColor: '#07BA3C',
    glowColor: 'rgba(7, 186, 60, 0.4)',
    glowColorHover: 'rgba(7, 186, 60, 0.7)',
  },
};

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  isCenter?: boolean;
  delay: number;
  animate: boolean;
}

function FeatureCard({ id, title, description, isCenter, delay, animate }: FeatureCardProps) {
  const style = featureStyles[id as keyof typeof featureStyles] || featureStyles['user-friendly'];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 80, damping: 14 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -8 }}
      style={{
        position: 'relative',
        width: '276px',
        minHeight: '139px',
        cursor: 'pointer',
        zIndex: 2,
      }}
    >
      {/* Glow Effect */}
      <motion.div
        animate={{
          backgroundColor: isHovered ? style.glowColorHover : style.glowColor,
          filter: isHovered ? 'blur(15px)' : 'blur(10px)',
          opacity: isHovered ? 1 : [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: isHovered ? 0.3 : 3,
          repeat: isHovered ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '20px',
        }}
      />

      {/* Card Content */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-bg-card, #374151)',
          border: `2px solid ${style.borderColor}`,
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '9px',
          minHeight: '139px',
          textAlign: isCenter ? 'center' : 'left',
        }}
      >
        <h3
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '18px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Inter", sans-serif',
            fontSize: '12px',
            fontWeight: 300,
            lineHeight: '18px',
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Animated arrows SVG — uses stroke-dashoffset to draw paths in a
 * staggered sequence: vertical stems first, then horizontal branches,
 * then arrowhead tips snap into place.  Each color-group is also
 * slightly offset so the centre green arrow leads the animation.
 */
function AnimatedArrows({ animate }: { animate: boolean }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [lengths, setLengths] = useState<number[]>([]);

  useEffect(() => {
    const l = pathRefs.current.map((p) => (p ? p.getTotalLength() : 600));
    setLengths(l);
  }, []);

  const setRef = useCallback((el: SVGPathElement | null, i: number) => {
    pathRefs.current[i] = el;
  }, []);

  // Paths grouped by colour + annotated with draw-order type & group index.
  // group 0 = green centre (draws first), 1-4 = outer arrows
  const paths: { d: string; stroke: string; type: 'stem' | 'branch' | 'tip'; group: number }[] = [
    // Green centre vertical + arrowheads (group 0 — prominent, draws first)
    { d: 'M263.677 12L263.677 509.266', stroke: '#01A532', type: 'stem', group: 0 },
    { d: 'M263.677 509.019L293.705 481.134', stroke: '#01A532', type: 'tip', group: 0 },
    { d: 'M233.705 482.114L263.734 509.999', stroke: '#01A532', type: 'tip', group: 0 },
    // Yellow vertical + horizontal + arrowheads (top-left, group 1)
    { d: 'M151.705 160.019L151.705 12.019', stroke: '#FADF23', type: 'stem', group: 1 },
    { d: 'M151.705 160.019L17.7051 160.019', stroke: '#FADF23', type: 'branch', group: 1 },
    { d: 'M12.7051 160.019L41.6965 189.01', stroke: '#FADF23', type: 'tip', group: 1 },
    { d: 'M41.7051 131.019L12.7137 160.01', stroke: '#FADF23', type: 'tip', group: 1 },
    // Purple vertical + horizontal + arrowheads (top-right, group 2)
    { d: 'M375.705 160.019L375.705 12.0189', stroke: '#DA33FF', type: 'stem', group: 2 },
    { d: 'M375.705 160.019L509.705 160.019', stroke: '#DA33FF', type: 'branch', group: 2 },
    { d: 'M509.708 160.019L480.936 189.005', stroke: '#DA33FF', type: 'tip', group: 2 },
    { d: 'M480.923 131.019L509.806 160.118', stroke: '#DA33FF', type: 'tip', group: 2 },
    // Teal vertical + horizontal + arrowheads (middle-left, group 3)
    { d: 'M207.705 379.019L207.705 12.0189', stroke: '#2FE297', type: 'stem', group: 3 },
    { d: 'M207.705 379.019H12.7051', stroke: '#2FE297', type: 'branch', group: 3 },
    { d: 'M12.7061 379.342L43.4031 406.521', stroke: '#2FE297', type: 'tip', group: 3 },
    { d: 'M43.7051 351.895L13.0081 379.074', stroke: '#2FE297', type: 'tip', group: 3 },
    // Orange vertical + horizontal + arrowheads (middle-right, group 4)
    { d: 'M319.705 379.019L319.705 12.0189', stroke: '#FFA04D', type: 'stem', group: 4 },
    { d: 'M319.706 379.019L514.706 379.019', stroke: '#FFA04D', type: 'branch', group: 4 },
    { d: 'M514.705 378.465L483.943 405.571', stroke: '#FFA04D', type: 'tip', group: 4 },
    { d: 'M483.705 351.149L514.466 378.255', stroke: '#FFA04D', type: 'tip', group: 4 },
  ];

  // Staggered timing — stems draw first, branches second, tips snap in last.
  // Each colour-group offsets by 0.12 s so the motion "ripples" outward.
  const getDelay = (type: 'stem' | 'branch' | 'tip', group: number) => {
    const groupStagger = group * 0.12;
    const typeBase: Record<string, number> = { stem: 0, branch: 0.55, tip: 1.1 };
    return groupStagger + (typeBase[type] ?? 0);
  };

  const getDuration = (type: 'stem' | 'branch' | 'tip') =>
    ({ stem: 1.1, branch: 0.75, tip: 0.3 })[type];

  const getEase = (type: 'stem' | 'branch' | 'tip'): number[] =>
    type === 'tip'
      ? [0.34, 1.56, 0.64, 1]   // elastic snap for arrowheads
      : [0.22, 1, 0.36, 1];      // smooth ease-out for lines

  return (
    <svg
      width="528"
      height="522"
      viewBox="0 0 528 522"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {paths.map((p, i) => {
        const len = lengths[i] || 600;
        return (
          <motion.path
            key={i}
            ref={(el: SVGPathElement | null) => setRef(el, i)}
            d={p.d}
            stroke={p.stroke}
            strokeOpacity="0.7"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDasharray: len, strokeDashoffset: len }}
            animate={
              animate
                ? { strokeDashoffset: 0 }
                : { strokeDashoffset: len }
            }
            transition={{
              duration: getDuration(p.type),
              delay: getDelay(p.type, p.group),
              ease: getEase(p.type),
            }}
          />
        );
      })}
    </svg>
  );
}

export function OutaiWay() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [animKey, setAnimKey] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Trigger draw animation only when scrolled into view (not on mount)
  useOnEnterView(
    sectionRef,
    0.3,
    useCallback(() => setShouldAnimate(true), []),
    useCallback(() => setShouldAnimate(false), []),
  );

  // Allow re-triggering by clicking — remounts animated children via key change
  const handleReplay = useCallback(() => {
    setShouldAnimate(false);
    setAnimKey((k) => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outai-way"
      onClick={handleReplay}
      style={{
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        width: '100%',
        position: 'relative',
        paddingTop: '52px',
        paddingBottom: '80px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Container>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              color: 'var(--color-text-primary, #FFFFFF)',
            }}
          >
            {t('outaiWay.sectionTitle')}{' '}
            <span style={{ color: 'var(--color-primary, #01A532)' }}>{t('outaiWay.sectionTitleHighlight')}</span>
            {' '}{t('outaiWay.sectionTitleEnd')}
          </motion.h2>
        </motion.div>

        {/* Main Layout — centered with proper grid */}
        <div
          key={animKey}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Row 1: User Friendly (left) | spacer | Competitive Rates (right) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '40px',
              paddingTop: '40px',
            }}
          >
            <FeatureCard
              id="user-friendly"
              title={t('outaiWay.userFriendly.title')}
              description={t('outaiWay.userFriendly.description')}
              delay={0.8}
              animate={shouldAnimate}
            />
            <FeatureCard
              id="competitive-rates"
              title={t('outaiWay.competitiveRates.title')}
              description={t('outaiWay.competitiveRates.description')}
              delay={0.9}
              animate={shouldAnimate}
            />
          </div>

          {/* Row 2: Awesome Services (left) | spacer | Professional Captains (right) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '40px',
            }}
          >
            <FeatureCard
              id="awesome-services"
              title={t('outaiWay.awesomeServices.title')}
              description={t('outaiWay.awesomeServices.description')}
              delay={1.0}
              animate={shouldAnimate}
            />
            <FeatureCard
              id="professional-captains"
              title={t('outaiWay.professionalCaptains.title')}
              description={t('outaiWay.professionalCaptains.description')}
              delay={1.1}
              animate={shouldAnimate}
            />
          </div>

          {/* Row 3: Around the Clock — centered, pushed down to clear arrow tip */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <FeatureCard
              id="around-the-clock"
              title={t('outaiWay.aroundTheClock.title')}
              description={t('outaiWay.aroundTheClock.description')}
              isCenter
              delay={1.2}
              animate={shouldAnimate}
            />
          </div>

          {/* Arrows overlay — absolutely positioned in center */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '480px',
              height: '500px',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <AnimatedArrows animate={shouldAnimate} />
          </div>
        </div>
      </Container>
    </section>
  );
}
