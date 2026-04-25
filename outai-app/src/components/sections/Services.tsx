import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { viewportSettings } from '@/lib/animations';
import { useVisibleServices } from '@/contexts/CmsContext';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

// Stagger header variants
const headerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

// ──────────────────────────────────────────────────────────
// 3D Tilt Card — CSS perspective-based mouse-tracking tilt
// ──────────────────────────────────────────────────────────
function ServiceCard({
  iconName,
  title,
  description,
  index,
  isMobile,
}: {
  iconName: string;
  title: string;
  description: string;
  index: number;
  isMobile: boolean;
}) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -12,
      rotateY: (x - 0.5) * 12,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const icons: Record<string, ReactElement> = {
    car: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6L19 10H5L8 6H16ZM16 6H8M19 10V17C19 17.5523 18.5523 18 18 18H17C16.4477 18 16 17.5523 16 17V16H8V17C8 17.5523 7.55228 18 7 18H6C5.44772 18 5 17.5523 5 17V10M7.5 13H7.51M16.5 13H16.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    calendar: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
        <path d="M16 2V6M8 2V6M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="7" y="14" width="4" height="4" rx="0.5" fill="white" />
      </svg>
    ),
    cab: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 11L6.5 6.5C6.8 5.6 7.6 5 8.5 5H15.5C16.4 5 17.2 5.6 17.5 6.5L19 11M5 11V18C5 18.6 5.4 19 6 19H7C7.6 19 8 18.6 8 18V17H16V18C16 18.6 16.4 19 17 19H18C18.6 19 19 18.6 19 18V11M5 11H19M7.5 14H8.5M15.5 14H16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 2H14V5H10V2Z" stroke="white" strokeWidth="2" />
      </svg>
    ),
    winch: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 16H3V18H13V16Z" fill="white" />
        <path d="M19 7L21 9L19 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 13L6 15L8 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 15H18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    delivery: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="14" height="12" rx="1" stroke="white" strokeWidth="2" />
        <path d="M16 8H19L22 11V16H16V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="2" stroke="white" strokeWidth="2" />
        <circle cx="18" cy="18" r="2" stroke="white" strokeWidth="2" />
      </svg>
    ),
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card"
      style={{
        width: isMobile ? '280px' : '328px',
        minWidth: isMobile ? '280px' : '328px',
        height: '348px',
        backgroundColor: 'var(--color-bg-card, #374151)',
        borderRadius: '32px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        flexShrink: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        perspective: '800px',
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
    >
      {/* Mouse-following glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(1, 165, 50, 0.15) 0%, transparent 60%)`,
          opacity: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Green gradient hover overlay */}
      <div
        className="service-card-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, duration: 0.6 }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {icons[iconName] || icons.car}
      </motion.div>

      {/* Title */}
      <h3
        style={{
          color: 'var(--color-text-primary, #FFFFFF)',
          fontFamily: '"Sulphur Point", sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '16px',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: 'var(--color-text-secondary, #9CA3AF)',
          fontFamily: '"Inter", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Divider Line - Animated */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'var(--color-bg-card-border, #4B5563)',
          margin: '16px 0',
          transformOrigin: 'center',
        }}
      />

      {/* Learn More */}
      <motion.a
        href="#"
        whileHover={{ x: 5, color: 'var(--color-primary-start, #7AC90E)' }}
        transition={{ duration: 0.2 }}
        style={{
          color: 'var(--color-text-primary, #FFFFFF)',
          fontFamily: '"Inter", sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        {t('common.learnMore')}
      </motion.a>
    </motion.div>
  );
}

export function Services() {
  const { t, i18n } = useTranslation();
  const cmsServices = useVisibleServices();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { isMobile } = useDeviceCapability();

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 310 : 358;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  }, [checkScrollButtons, isMobile]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const atEnd = scrollLeft >= scrollWidth - clientWidth - 10;
      if (atEnd) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
      setTimeout(checkScrollButtons, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [scroll, checkScrollButtons]);

  return (
    <section
      id="services"
      style={{
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        width: '100%',
        paddingTop: '80px',
        paddingBottom: '120px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={headerContainer}
          style={{
            textAlign: 'center',
            marginBottom: '46px',
          }}
        >
          <motion.p
            variants={headerItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Roboto", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            {t('services.sectionTag')}
          </motion.p>
          <motion.h2
            variants={headerItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Righteous", sans-serif',
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            {t('services.sectionTitle')}
          </motion.h2>
          <motion.p
            variants={headerItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Inter", sans-serif',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 400,
              maxWidth: '649px',
              margin: '0 auto',
            }}
          >
            {t('services.sectionDescription')}
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '16px' : '30px',
            justifyContent: 'center',
          }}
        >
          {/* Left Arrow */}
          <motion.button
            onClick={() => scroll('left')}
            aria-label={t('common.scrollLeft') || 'Scroll left'}
            whileHover={canScrollLeft ? { scale: 1.3 } : undefined}
            whileTap={canScrollLeft ? { scale: 0.9 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              width: '30px',
              height: '30px',
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: canScrollLeft ? 'pointer' : 'default',
              opacity: canScrollLeft ? 1 : 0.3,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
            disabled={!canScrollLeft}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            style={{
              display: 'flex',
              gap: isMobile ? '16px' : '30px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              width: isMobile ? '100%' : '1044px',
              maxWidth: isMobile ? '100%' : 'calc(100vw - 140px)',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
            className="hide-scrollbar"
          >
            {cmsServices.map((service, index) => (
              <div key={service.id} style={{ scrollSnapAlign: 'start' }}>
                <ServiceCard
                  iconName={service.iconName}
                  title={lang === 'fr' ? service.titleFr : service.titleEn}
                  description={lang === 'fr' ? service.descriptionFr : service.descriptionEn}
                  index={index}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scroll('right')}
            aria-label={t('common.scrollRight') || 'Scroll right'}
            whileHover={canScrollRight ? { scale: 1.3 } : undefined}
            whileTap={canScrollRight ? { scale: 0.9 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              width: '30px',
              height: '30px',
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: canScrollRight ? 'pointer' : 'default',
              opacity: canScrollRight ? 1 : 0.3,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
            disabled={!canScrollRight}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </Container>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .service-card > *:not(.service-card-overlay) {
          position: relative;
          z-index: 1;
        }
        .service-card:hover .service-card-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}