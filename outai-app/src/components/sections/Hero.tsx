import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import phoneMockup from '@/assets/hero/phone-mockup.png';

export function Hero() {
  const { t } = useTranslation();

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
        backgroundColor: '#263140',
        minHeight: '700px',
        overflow: 'visible',
      }}
    >
      {/* Use same Container as navbar for consistent alignment */}
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
                  color: '#ffffff',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '50px',
                  fontWeight: 700,
                  letterSpacing: '0',
                  lineHeight: '56px',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {t('hero.title')}
                <br />
                {t('hero.subtitle')}
              </p>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              variants={fadeInUp}
              style={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                fontWeight: 300,
                letterSpacing: '0',
                lineHeight: '30px',
                margin: '40px 0',
              }}
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <motion.a
                href="#contact"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 15px 40px rgba(1, 165, 50, 0.5)' 
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '38px',
                  padding: '6px 12px',
                  background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, sans-serif',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  border: 'none',
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('hero.cta')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone overlapping Ellipse */}
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
            {/* Green Ellipse - Background circle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  delay: 0.5,
                  duration: 1,
                  type: 'spring' as const,
                  stiffness: 60,
                  damping: 12,
                }
              }}
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                right: '30px',
                top: '140px',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px #1c1c1c',
                transform: 'rotate(15deg)',
                zIndex: 1,
              }}
            />

            {/* Phone Image - Overlapping the ellipse */}
            <motion.img
              src={phoneMockup}
              alt="OUTAI App"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 1,
                type: 'spring' as const,
                stiffness: 50,
                damping: 12,
              }}
              style={{
                position: 'absolute',
                height: 'auto',
                width: 'auto',
                right: '-75px',
                top: '45%',
                zIndex: 10,
                transform: 'translateY(-50%) rotate(12deg) scale(1.2)',
                filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                animation: 'float 4s ease-in-out infinite',
              }}
            />
          </motion.div>
        </div>
      </Container>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) rotate(12deg) scale(1.4); }
          50% { transform: translateY(calc(-50% - 15px)) rotate(12deg) scale(1.4); }
        }
      `}</style>
    </section>
  );
}
