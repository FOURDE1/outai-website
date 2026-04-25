import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/common';
import { fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';
import { useSectionContent, useCmsImage } from '@/contexts/CmsContext';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

import statsImage from '@/assets/stats/car-keys.jpg';

// Count-up hook: animates a number from 0 to target when visible
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || hasStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasStarted]);

  return { count, ref, hasStarted };
}

function parseStatNumber(val: string): number {
  const match = val.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function parseSuffix(val: string): string {
  const match = val.match(/\d+\s*(.*)/);
  return match ? ` ${match[1]}` : '';
}

export function Stats() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const cms = useSectionContent('stats', lang);
  const statImg = useCmsImage('stats_image', statsImage);
  const { isMobile } = useDeviceCapability();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for decorative ellipses + image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yellowY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const greenY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="w-full relative z-20 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-hero, #263140)',
      }}
    >
      <Container>
        <div
          className="flex flex-col lg:flex-row items-center"
          style={{
            gap: isMobile ? '40px' : '80px',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          {/* Left Side - Image with decorative ellipses */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInLeft}
            className="relative flex-shrink-0"
            style={{
              width: isMobile ? '300px' : '426px',
              height: isMobile ? '380px' : '509px',
            }}
          >
            {/* Yellow Ellipse - parallax + breathing */}
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ scale: [0, 1.1, 1], opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              animate={{
                scale: [1, 1.05, 1],
                transition: {
                  scale: { delay: 1.5, duration: 4, repeat: Infinity, ease: 'easeInOut' },
                },
              }}
              style={{
                width: isMobile ? '100px' : '150px',
                height: isMobile ? '100px' : '150px',
                left: '0',
                top: '18px',
                backgroundColor: 'var(--color-yellow-accent, #FADF23)',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px var(--color-shadow-dark, #1c1c1c)',
                y: isMobile ? 0 : yellowY,
              }}
            />

            {/* Green Gradient Ellipse - parallax at different speed */}
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ scale: [0, 1.1, 1], opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              animate={{
                scale: [1, 1.05, 1],
                transition: {
                  scale: { delay: 2, duration: 5, repeat: Infinity, ease: 'easeInOut' },
                },
              }}
              style={{
                width: isMobile ? '180px' : '262px',
                height: isMobile ? '180px' : '262px',
                left: isMobile ? '100px' : '164px',
                top: isMobile ? '180px' : '247px',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px #1c1c1c',
                y: isMobile ? 0 : greenY,
              }}
            />

            {/* Main Image — parallax */}
            <motion.img
              src={statImg}
              alt={t('stats.imageAlt')}
              whileHover={isMobile ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute object-cover"
              style={{
                width: isMobile ? '230px' : '325px',
                height: isMobile ? '350px' : '476px',
                left: isMobile ? '40px' : '63px',
                top: '-12px',
                borderRadius: '24px',
                y: isMobile ? 0 : imageY,
              }}
            />
          </motion.div>

          {/* Right Side - Text and Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInRight}
            className="flex flex-col w-full lg:flex-1"
            style={{ gap: '60px' }}
          >
            <div className="flex flex-col" style={{ gap: '30px' }}>
              <h2
                style={{
                  color: 'var(--color-text-primary, #FFFFFF)',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: isMobile ? '28px' : '40px',
                  fontWeight: 700,
                  lineHeight: isMobile ? '36px' : '56px',
                  letterSpacing: '0',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {t('stats.sectionTitle')}
              </h2>
              <p
                style={{
                  color: 'var(--color-text-primary, #FFFFFF)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 300,
                  lineHeight: '30px',
                  letterSpacing: '0',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {t('stats.sectionDescription')}
              </p>
            </div>

            {/* Stats */}
            <div
              className="flex justify-between"
              style={{
                maxWidth: '440px',
                margin: isMobile ? '0 auto' : undefined,
              }}
            >
              <StatCounter
                value={cms.stat1Value || '500 +'}
                label={cms.stat1Label || t('stats.successfulRides')}
                color="var(--color-primary, #01A532)"
                delay={0.2}
                width="149px"
                gap="26px"
              />
              <StatCounter
                value={cms.stat2Value || '300 +'}
                label={cms.stat2Label || t('stats.businessClients')}
                color="var(--color-primary-start, #7AC90E)"
                delay={0.4}
                width="148px"
                gap="23px"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Animated stat counter with blur-to-sharp transition
function StatCounter({
  value,
  label,
  color,
  delay,
  width,
  gap,
}: {
  value: string;
  label: string;
  color: string;
  delay: number;
  width: string;
  gap: string;
}) {
  const target = parseStatNumber(value);
  const suffix = parseSuffix(value);
  const { count, ref, hasStarted } = useCountUp(target, 1500);
  const progress = target > 0 ? count / target : 0;

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ gap, width }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100, damping: 12 }}
    >
      <motion.span
        ref={ref}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        style={{
          color,
          fontFamily: '"Roboto", sans-serif',
          fontSize: '50px',
          fontWeight: 700,
          lineHeight: '30px',
          textAlign: 'center',
          cursor: 'default',
          filter: hasStarted && progress < 1 ? `blur(${(1 - progress) * 3}px)` : 'blur(0px)',
          transition: 'filter 0.1s ease-out',
        }}
      >
        {count}{suffix}
      </motion.span>
      <span
        style={{
          color: 'var(--color-text-primary, #FFFFFF)',
          fontFamily: '"Roboto", sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '30px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
