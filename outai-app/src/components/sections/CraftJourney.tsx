import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useCallback } from 'react';
import { Container } from '@/components/common';
import { fadeInUp, viewportSettings } from '@/lib/animations';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

// Import feature images
import comfortImage from '@/assets/features/comfort.jpg';
import serviceImage from '@/assets/features/service.jpg';
import ambianceImage from '@/assets/features/ambiance.jpg';

// Stagger variants for text inside rows
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

const imageSlideLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8 },
  },
};

const imageSlideRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8 },
  },
};

const textSlideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8 },
  },
};

const textSlideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 18, duration: 0.8 },
  },
};

/**
 * Feature row with Figma green gradient hover box + scroll-driven parallax on images.
 */
function FeatureRow({
  imageLeft,
  imageSrc,
  imageAlt,
  title,
  description,
  imageWidth,
  spacerWidth,
  textWidth,
  delay,
  isMobile,
}: {
  imageLeft: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  imageWidth: string;
  spacerWidth: string;
  textWidth: string;
  delay: number;
  isMobile: boolean;
}) {
  const [greenBoxVisible, setGreenBoxVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax for the image
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  const handleHoverStart = useCallback(() => {
    if (isMobile) return;
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    setGreenBoxVisible(true);
    dismissTimer.current = setTimeout(() => {
      setGreenBoxVisible(false);
      dismissTimer.current = null;
    }, 2000);
  }, [isMobile]);

  const handleHoverEnd = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    setGreenBoxVisible(false);
  }, []);

  const greenBoxStyle: React.CSSProperties = {
    position: 'absolute',
    borderRadius: '24px',
    background: 'linear-gradient(107deg, rgba(122, 201, 14, 0.90) 0%, rgba(1, 165, 50, 0.90) 76%)',
    zIndex: 1,
    pointerEvents: 'none',
  };

  const imageContent = (
    <motion.div
      variants={imageLeft ? imageSlideLeft : imageSlideRight}
      whileHover={isMobile ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: isMobile ? '100%' : imageWidth,
        height: isMobile ? '300px' : '550px',
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: '16px',
        position: 'relative',
        zIndex: 2,
        y: isMobile ? 0 : imageParallaxY,
        scale: isMobile ? 1 : imageScale,
      }}
    >
      <motion.img
        whileHover={isMobile ? undefined : { scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        src={imageSrc}
        alt={imageAlt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      />
    </motion.div>
  );

  const textContent = (
    <motion.div
      variants={imageLeft ? textSlideRight : textSlideLeft}
      style={{
        width: isMobile ? '100%' : textWidth,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <motion.h3
          variants={textItemVariants}
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Sulphur Point", sans-serif',
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 700,
            lineHeight: isMobile ? '36px' : '56px',
            marginBottom: '16px',
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          variants={textItemVariants}
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Inter", sans-serif',
            fontSize: isMobile ? '16px' : '24px',
            lineHeight: isMobile ? '28px' : '43px',
            fontWeight: 300,
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      ref={rowRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{ delayChildren: delay }}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '24px' : '0',
        minHeight: isMobile ? 'auto' : '550px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Green box — only on desktop */}
      {!isMobile && (
        <motion.div
          animate={greenBoxVisible
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
          }
          initial={{ scaleX: 0, opacity: 0 }}
          transition={greenBoxVisible
            ? {
              scaleX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3 },
            }
            : {
              scaleX: { duration: 0.5, ease: [0.36, 0, 0.66, -0.56] },
              opacity: { duration: 0.4, delay: 0.15 },
            }
          }
          style={{
            ...greenBoxStyle,
            top: '18%',
            bottom: '18%',
            left: imageLeft ? '15%' : '0%',
            right: imageLeft ? '0%' : '15%',
            transformOrigin: imageLeft ? 'left center' : 'right center',
          }}
        />
      )}

      {imageLeft || isMobile ? (
        <>
          {imageContent}
          {!isMobile && <div style={{ width: spacerWidth }} />}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          <div style={{ width: spacerWidth }} />
          {imageContent}
        </>
      )}
    </motion.div>
  );
}

export function CraftJourney() {
  const { t } = useTranslation();
  const { isMobile } = useDeviceCapability();

  return (
    <section
      id="craft-journey"
      className="w-full relative"
      style={{
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        paddingTop: '64px',
        paddingBottom: '120px',
        zIndex: 10,
      }}
    >
      <Container>
        {/* Section Header - Left aligned */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
          style={{ marginBottom: '60px' }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            className="text-2xl md:text-3xl lg:text-[40px] font-bold"
            style={{
              fontFamily: '"Sulphur Point", sans-serif',
              color: 'var(--color-text-primary, #FFFFFF)',
              fontStyle: 'italic',
              lineHeight: '56px',
              marginBottom: '24px',
            }}
          >
            {t('craftJourney.sectionTitle')}{' '}
            <span style={{ color: 'var(--color-primary, #01A532)' }}>
              {t('craftJourney.sectionTitleHighlight')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.15 }}
            className="text-base"
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Inter", sans-serif',
              lineHeight: '30px',
              fontWeight: 400,
              maxWidth: '897px',
            }}
          >
            {t('craftJourney.sectionDescription')}
          </motion.p>
        </motion.div>

        {/* Features - 3 rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '48px' : '60px' }}>
          <FeatureRow
            imageLeft={true}
            imageSrc={comfortImage}
            imageAlt={t('craftJourney.refinedComfort.title')}
            title={t('craftJourney.refinedComfort.title')}
            description={t('craftJourney.refinedComfort.description')}
            imageWidth="43%"
            spacerWidth="8%"
            textWidth="49%"
            delay={0}
            isMobile={isMobile}
          />
          <FeatureRow
            imageLeft={false}
            imageSrc={serviceImage}
            imageAlt={t('craftJourney.seamlessService.title')}
            title={t('craftJourney.seamlessService.title')}
            description={t('craftJourney.seamlessService.description')}
            imageWidth="43%"
            spacerWidth="9%"
            textWidth="48%"
            delay={0.15}
            isMobile={isMobile}
          />
          <FeatureRow
            imageLeft={true}
            imageSrc={ambianceImage}
            imageAlt={t('craftJourney.curatedAmbiance.title')}
            title={t('craftJourney.curatedAmbiance.title')}
            description={t('craftJourney.curatedAmbiance.description')}
            imageWidth="42%"
            spacerWidth="7%"
            textWidth="51%"
            delay={0.3}
            isMobile={isMobile}
          />
        </div>
      </Container>
    </section>
  );
}
