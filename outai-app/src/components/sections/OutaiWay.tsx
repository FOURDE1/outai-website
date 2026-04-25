import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Container } from '@/components/common';
import { viewportSettings } from '@/lib/animations';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

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
  isMobile: boolean;
}

function FeatureCard({ id, title, description, isCenter, delay, animate, isMobile }: FeatureCardProps) {
  const style = featureStyles[id as keyof typeof featureStyles] || featureStyles['user-friendly'];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 80, damping: 14 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isMobile ? undefined : { scale: 1.05, y: -8 }}
      style={{
        position: 'relative',
        width: isMobile ? '100%' : '276px',
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
 * Scroll-driven animated arrows SVG — arrows draw as you scroll through the section.
 * Uses Framer Motion useScroll + useTransform for scroll-position-driven stroke animation.
 */
function ScrollDrivenArrows({ scrollProgress }: { scrollProgress: ReturnType<typeof useTransform<number>> }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [lengths, setLengths] = useState<number[]>([]);

  useEffect(() => {
    const l = pathRefs.current.map((p) => (p ? p.getTotalLength() : 600));
    setLengths(l);
  }, []);

  const setRef = useCallback((el: SVGPathElement | null, i: number) => {
    pathRefs.current[i] = el;
  }, []);

  const paths: { d: string; stroke: string; type: 'stem' | 'branch' | 'tip'; group: number }[] = [
    // Green centre
    { d: 'M263.677 12L263.677 509.266', stroke: '#01A532', type: 'stem', group: 0 },
    { d: 'M263.677 509.019L293.705 481.134', stroke: '#01A532', type: 'tip', group: 0 },
    { d: 'M233.705 482.114L263.734 509.999', stroke: '#01A532', type: 'tip', group: 0 },
    // Yellow
    { d: 'M151.705 160.019L151.705 12.019', stroke: '#FADF23', type: 'stem', group: 1 },
    { d: 'M151.705 160.019L17.7051 160.019', stroke: '#FADF23', type: 'branch', group: 1 },
    { d: 'M12.7051 160.019L41.6965 189.01', stroke: '#FADF23', type: 'tip', group: 1 },
    { d: 'M41.7051 131.019L12.7137 160.01', stroke: '#FADF23', type: 'tip', group: 1 },
    // Purple
    { d: 'M375.705 160.019L375.705 12.0189', stroke: '#DA33FF', type: 'stem', group: 2 },
    { d: 'M375.705 160.019L509.705 160.019', stroke: '#DA33FF', type: 'branch', group: 2 },
    { d: 'M509.708 160.019L480.936 189.005', stroke: '#DA33FF', type: 'tip', group: 2 },
    { d: 'M480.923 131.019L509.806 160.118', stroke: '#DA33FF', type: 'tip', group: 2 },
    // Teal
    { d: 'M207.705 379.019L207.705 12.0189', stroke: '#2FE297', type: 'stem', group: 3 },
    { d: 'M207.705 379.019H12.7051', stroke: '#2FE297', type: 'branch', group: 3 },
    { d: 'M12.7061 379.342L43.4031 406.521', stroke: '#2FE297', type: 'tip', group: 3 },
    { d: 'M43.7051 351.895L13.0081 379.074', stroke: '#2FE297', type: 'tip', group: 3 },
    // Orange
    { d: 'M319.705 379.019L319.705 12.0189', stroke: '#FFA04D', type: 'stem', group: 4 },
    { d: 'M319.706 379.019L514.706 379.019', stroke: '#FFA04D', type: 'branch', group: 4 },
    { d: 'M514.705 378.465L483.943 405.571', stroke: '#FFA04D', type: 'tip', group: 4 },
    { d: 'M483.705 351.149L514.466 378.255', stroke: '#FFA04D', type: 'tip', group: 4 },
  ];

  // Stagger each path: stems start first, branches mid, tips last
  const getScrollRange = (type: 'stem' | 'branch' | 'tip', group: number): [number, number] => {
    const base = group * 0.05;
    const typeOffset: Record<string, number> = { stem: 0, branch: 0.25, tip: 0.5 };
    const start = Math.min(base + (typeOffset[type] ?? 0), 0.7);
    const end = Math.min(start + 0.3, 1);
    return [start, end];
  };

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
        const [start, end] = getScrollRange(p.type, p.group);
        return (
          <ScrollPath
            key={i}
            ref={(el: SVGPathElement | null) => setRef(el, i)}
            d={p.d}
            stroke={p.stroke}
            length={len}
            scrollProgress={scrollProgress}
            scrollStart={start}
            scrollEnd={end}
          />
        );
      })}
    </svg>
  );
}

// Individual scroll-driven path
import { forwardRef } from 'react';

const ScrollPath = forwardRef<SVGPathElement, {
  d: string;
  stroke: string;
  length: number;
  scrollProgress: ReturnType<typeof useTransform<number>>;
  scrollStart: number;
  scrollEnd: number;
}>(function ScrollPath({ d, stroke, length, scrollProgress, scrollStart, scrollEnd }, ref) {
  const dashOffset = useTransform(
    scrollProgress,
    [scrollStart, scrollEnd],
    [length, 0]
  );

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={stroke}
      strokeOpacity="0.7"
      strokeWidth="24"
      strokeLinecap="round"
      fill="none"
      style={{
        strokeDasharray: length,
        strokeDashoffset: dashOffset,
      }}
    />
  );
});

export function OutaiWay() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceCapability();

  // Scroll-driven arrow animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Cards animate based on scroll visibility
  const shouldAnimate = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = shouldAnimate.on('change', (v) => {
      setCardsVisible(v >= 0.8);
    });
    return () => unsubscribe();
  }, [shouldAnimate]);

  return (
    <section
      ref={sectionRef}
      id="outai-way"
      style={{
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        width: '100%',
        position: 'relative',
        paddingTop: '52px',
        paddingBottom: '80px',
        overflow: 'hidden',
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
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: 700,
              color: 'var(--color-text-primary, #FFFFFF)',
            }}
          >
            {t('outaiWay.sectionTitle')}{' '}
            <span style={{ color: 'var(--color-primary, #01A532)' }}>{t('outaiWay.sectionTitleHighlight')}</span>
            {' '}{t('outaiWay.sectionTitleEnd')}
          </motion.h2>
        </motion.div>

        {/* Mobile layout: simple stacked cards */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 8px' }}>
            {(['user-friendly', 'competitive-rates', 'awesome-services', 'professional-captains', 'around-the-clock'] as const).map((id, i) => (
              <FeatureCard
                key={id}
                id={id}
                title={t(`outaiWay.${id === 'user-friendly' ? 'userFriendly' : id === 'competitive-rates' ? 'competitiveRates' : id === 'awesome-services' ? 'awesomeServices' : id === 'professional-captains' ? 'professionalCaptains' : 'aroundTheClock'}.title`)}
                description={t(`outaiWay.${id === 'user-friendly' ? 'userFriendly' : id === 'competitive-rates' ? 'competitiveRates' : id === 'awesome-services' ? 'awesomeServices' : id === 'professional-captains' ? 'professionalCaptains' : 'aroundTheClock'}.description`)}
                isCenter={id === 'around-the-clock'}
                delay={i * 0.1}
                animate={cardsVisible}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          /* Desktop layout: grid with scroll-driven animated arrows */
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {/* Row 1 */}
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
                delay={0.3}
                animate={cardsVisible}
                isMobile={false}
              />
              <FeatureCard
                id="competitive-rates"
                title={t('outaiWay.competitiveRates.title')}
                description={t('outaiWay.competitiveRates.description')}
                delay={0.4}
                animate={cardsVisible}
                isMobile={false}
              />
            </div>

            {/* Row 2 */}
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
                delay={0.5}
                animate={cardsVisible}
                isMobile={false}
              />
              <FeatureCard
                id="professional-captains"
                title={t('outaiWay.professionalCaptains.title')}
                description={t('outaiWay.professionalCaptains.description')}
                delay={0.6}
                animate={cardsVisible}
                isMobile={false}
              />
            </div>

            {/* Row 3 — centered */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <FeatureCard
                id="around-the-clock"
                title={t('outaiWay.aroundTheClock.title')}
                description={t('outaiWay.aroundTheClock.description')}
                isCenter
                delay={0.7}
                animate={cardsVisible}
                isMobile={false}
              />
            </div>

            {/* Scroll-driven arrows overlay */}
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
              <ScrollDrivenArrows scrollProgress={scrollYProgress} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
