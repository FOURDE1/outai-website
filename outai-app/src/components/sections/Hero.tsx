import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/common';
import { useSectionContent } from '@/contexts/CmsContext';

// Demo screens data — colored placeholders representing app flows
const demoScreens = [
  {
    id: 'home',
    bg: 'linear-gradient(135deg, #1F2937 0%, #263140 100%)',
    title: 'OUTAI',
    subtitle: 'Book your ride',
    icon: '🚗',
  },
  {
    id: 'map',
    bg: 'linear-gradient(135deg, #0f4c3a 0%, #1a7a5e 100%)',
    title: 'Select Location',
    subtitle: 'Where to?',
    icon: '📍',
  },
  {
    id: 'ride',
    bg: 'linear-gradient(135deg, #1a365d 0%, #2a4a7f 100%)',
    title: 'Your Captain',
    subtitle: 'Arriving in 3 min',
    icon: '⏱️',
  },
  {
    id: 'rate',
    bg: 'linear-gradient(135deg, #44337a 0%, #6b46c1 100%)',
    title: 'Rate Trip',
    subtitle: '⭐⭐⭐⭐⭐',
    icon: '✨',
  },
];

// Phone Demo component — interactive cycling screens with CSS phone frame
function PhoneDemo({
  phoneAlt,
}: {
  phoneAlt: string;
}) {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

  // Auto-cycle screens every 3 seconds
  useEffect(() => {
    if (showDownloadPrompt) return;
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % demoScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showDownloadPrompt]);

  const handlePhoneClick = useCallback(() => {
    if (showDownloadPrompt) return;
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setCurrentScreen((prev) => (prev + 1) % demoScreens.length);
    if (newCount >= 5) {
      setShowDownloadPrompt(true);
    }
  }, [clickCount, showDownloadPrompt]);

  const screen = demoScreens[currentScreen];

  return (
    <div
      onClick={handlePhoneClick}
      role="button"
      tabIndex={0}
      aria-label={phoneAlt}
      style={{
        position: 'relative',
        width: '220px',
        height: '440px',
        cursor: 'pointer',
      }}
    >
      {/* Phone bezel — CSS-drawn realistic frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '36px',
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 0 0 1px rgba(0,0,0,0.8),
            0 20px 60px rgba(0,0,0,0.5),
            0 8px 20px rgba(0,0,0,0.3)
          `,
          zIndex: 1,
        }}
      />

      {/* Screen area */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '10px',
          right: '10px',
          bottom: '14px',
          borderRadius: '26px',
          overflow: 'hidden',
          backgroundColor: '#000',
          zIndex: 2,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '22px',
            backgroundColor: '#1a1a1a',
            borderRadius: '0 0 16px 16px',
            zIndex: 10,
          }}
        />

        <AnimatePresence mode="wait">
          {showDownloadPrompt ? (
            <motion.div
              key="download"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px',
              }}
            >
              <span style={{ fontSize: '28px' }}>📲</span>
              <p style={{ color: '#fff', fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 600, textAlign: 'center', lineHeight: '16px' }}>
                {t('hero.downloadTitle', { defaultValue: 'Get the OUTAI App' })}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif', fontSize: '8px', textAlign: 'center', lineHeight: '12px', marginBottom: '6px' }}>
                {t('hero.downloadSubtitle', { defaultValue: 'Experience premium rides on your phone' })}
              </p>
              <motion.a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', borderRadius: '8px', padding: '6px 14px', textDecoration: 'none', width: '80%', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '14px' }}>🍎</span>
                <div>
                  <p style={{ fontSize: '6px', color: '#333', margin: 0, lineHeight: '8px' }}>Download on the</p>
                  <p style={{ fontSize: '10px', color: '#000', fontWeight: 700, margin: 0, lineHeight: '13px' }}>App Store</p>
                </div>
              </motion.a>
              <motion.a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', borderRadius: '8px', padding: '6px 14px', textDecoration: 'none', width: '80%', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '14px' }}>▶️</span>
                <div>
                  <p style={{ fontSize: '6px', color: '#333', margin: 0, lineHeight: '8px' }}>Get it on</p>
                  <p style={{ fontSize: '10px', color: '#000', fontWeight: 700, margin: 0, lineHeight: '13px' }}>Google Play</p>
                </div>
              </motion.a>
              <motion.button
                whileHover={{ opacity: 1 }}
                onClick={(e) => { e.stopPropagation(); setShowDownloadPrompt(false); setClickCount(0); }}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '8px', cursor: 'pointer', marginTop: '4px', fontFamily: '"Inter", sans-serif' }}
              >
                {t('hero.dismissDownload', { defaultValue: 'Continue exploring' })}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: screen.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px',
              }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 10 }}
                style={{ fontSize: '36px' }}
              >
                {screen.icon}
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ color: '#fff', fontFamily: '"Sulphur Point", sans-serif', fontSize: '14px', fontWeight: 700, textAlign: 'center' }}
              >
                {screen.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif', fontSize: '10px', textAlign: 'center' }}
              >
                {screen.subtitle}
              </motion.p>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                {demoScreens.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === currentScreen ? 14 : 5,
                      backgroundColor: i === currentScreen ? '#7AC90E' : 'rgba(255,255,255,0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 5, borderRadius: 3 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home indicator bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '3px',
          borderRadius: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          zIndex: 3,
        }}
      />
    </div>
  );
}

export function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const cms = useSectionContent('hero', lang);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 60,
        damping: 18,
      },
    },
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 50,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <section 
      className="relative w-full"
      style={{ 
        marginTop: '90px',
        backgroundColor: 'var(--color-bg-hero, #263140)',
        minHeight: '700px',
        overflow: 'visible',
      }}
    >
      <Container className="h-full">
        <div 
          className="flex items-center justify-between h-full py-16 lg:py-0"
          style={{ minHeight: '600px' }}
        >
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              maxWidth: '466px',
              flexShrink: 0,
              zIndex: 20,
            }}
          >
            {/* Heading */}
            <motion.div variants={slideFromLeft}>
              <p 
                style={{
                  color: 'var(--color-text-primary, #ffffff)',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '50px',
                  fontWeight: 700,
                  letterSpacing: '0',
                  lineHeight: '56px',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {cms.title || t('hero.title')}
                <br />
                {cms.subtitle || t('hero.subtitle')}
              </p>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              variants={fadeInUp}
              style={{
                color: 'var(--color-text-secondary, #9CA3AF)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 300,
                letterSpacing: '0',
                lineHeight: '30px',
                margin: '40px 0',
              }}
            >
              {cms.description || t('hero.description')}
            </motion.p>

            {/* CTA Button with shimmer */}
            <motion.div variants={fadeInUp}>
              <motion.a
                href="#contact"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 15px 40px rgba(1, 165, 50, 0.5)' 
                }}
                whileTap={{ scale: 0.98 }}
                className="hero-cta-shimmer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '38px',
                  padding: '6px 12px',
                  background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                  borderRadius: '12px',
                  color: 'var(--color-text-primary, #ffffff)',
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, sans-serif',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  border: 'none',
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {cms.ctaText || t('hero.cta')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Dark rectangle + Green ellipse + Phone */}
          <motion.div 
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            className="relative"
            style={{
              width: '550px',
              height: '700px',
              flexShrink: 0,
            }}
          >
            {/* Dark navy rounded rectangle — background shape */}
            <motion.div
              initial={{ opacity: 0, x: 80, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 12 }}
              transition={{ delay: 0.3, duration: 0.9, type: 'spring', stiffness: 50, damping: 14 }}
              style={{
                position: 'absolute',
                width: '400px',
                height: '580px',
                right: '-40px',
                top: '60px',
                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: '40px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                zIndex: 0,
              }}
            />

            {/* Green Ellipse — static after entrance, no pulse */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 60, damping: 14 }}
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                right: '60px',
                top: '160px',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px var(--color-shadow-dark, #1c1c1c)',
                zIndex: 1,
              }}
            />

            {/* Phone — positioned on top of both shapes */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, type: 'spring', stiffness: 50, damping: 12 }}
              style={{
                position: 'absolute',
                right: '50px',
                top: '50%',
                transform: 'translateY(-50%) rotate(12deg)',
                zIndex: 10,
                filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.35))',
              }}
            >
              <PhoneDemo phoneAlt={t('hero.phoneAlt')} />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
