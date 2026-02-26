import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useCallback } from 'react';
import { Container } from '@/components/common';
import { fadeInUp, viewportSettings } from '@/lib/animations';

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
 * Feature row with Figma green gradient hover box.
 * On hover: a green gradient box expands from behind the image toward the text,
 * extending slightly past the image side too (like a rectangle expanded on both sides).
 * On hover-out: immediately starts collapsing back toward the photo with a slight overshoot, then disappears.
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
}) {
  const [greenBoxVisible, setGreenBoxVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHoverStart = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    setGreenBoxVisible(true);
    // Auto-dismiss after 2 seconds
    dismissTimer.current = setTimeout(() => {
      setGreenBoxVisible(false);
      dismissTimer.current = null;
    }, 2000);
  }, []);

  const handleHoverEnd = useCallback(() => {
    // Immediately start collapsing
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    setGreenBoxVisible(false);
  }, []);

  // Green box: positioned behind the text content area, matching text height
  // Anchored to the text side, extends a little past image side too
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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: imageWidth,
        height: '550px',
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: '16px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
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
      style={{ width: textWidth, position: 'relative', zIndex: 2 }}
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
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: '56px',
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
            fontSize: '24px',
            lineHeight: '43px',
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
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{ delayChildren: delay }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '550px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Green box at row level — emerges from behind the image toward text */}
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

      {imageLeft ? (
        <>
          {imageContent}
          <div style={{ width: spacerWidth }} />
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

        {/* Features - 3 rows matching Figma exactly */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* Row 1 - Refined Comfort: Image LEFT (43%), Text RIGHT */}
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
          />

          {/* Row 2 - Seamless Service: Text LEFT, Image RIGHT (43%) */}
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
          />

          {/* Row 3 - Curated Ambiance: Image LEFT (42%), Text RIGHT */}
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
          />
        </div>
      </Container>
    </section>
  );
}
