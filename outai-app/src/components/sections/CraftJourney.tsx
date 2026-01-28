import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';

// Import feature images
import comfortImage from '@/assets/features/comfort.jpg';
import serviceImage from '@/assets/features/service.jpg';
import ambianceImage from '@/assets/features/ambiance.jpg';

export function CraftJourney() {
  const { t } = useTranslation();

  return (
    <section 
      id="craft-journey" 
      className="w-full relative"
      style={{ 
        backgroundColor: '#1F2937',
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
          <h2 
            className="text-2xl md:text-3xl lg:text-[40px] font-bold"
            style={{ 
              fontFamily: '"Sulphur Point", sans-serif',
              color: '#FFFFFF',
              fontStyle: 'italic',
              lineHeight: '56px',
              marginBottom: '24px',
            }}
          >
            {t('craftJourney.sectionTitle')}{' '}
            <span style={{ color: '#01A532' }}>
              {t('craftJourney.sectionTitleHighlight')}
            </span>
          </h2>
          <p 
            className="text-base"
            style={{ 
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              lineHeight: '30px',
              fontWeight: 400,
              maxWidth: '897px',
            }}
          >
            {t('craftJourney.sectionDescription')}
          </p>
        </motion.div>

        {/* Features - 3 rows matching Figma exactly */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          
          {/* Row 1 - Refined Comfort: Image LEFT (43%), Text RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',
              height: '550px',
              position: 'relative',
            }}
          >
            {/* Image - Left side 43% */}
            <motion.div 
              variants={fadeInLeft}
              style={{ width: '43%', height: '550px', flexShrink: 0 }}
            >
              <img
                src={comfortImage}
                alt={t('craftJourney.refinedComfort.title')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>

            {/* Spacer */}
            <div style={{ width: '8%' }} />

            {/* Text - Right side */}
            <motion.div 
              variants={fadeInRight}
              style={{ width: '49%' }}
            >
              <h3 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: '56px',
                  marginBottom: '16px',
                }}
              >
                {t('craftJourney.refinedComfort.title')}
              </h3>
              <p 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '24px',
                  lineHeight: '43px',
                  fontWeight: 300,
                }}
              >
                {t('craftJourney.refinedComfort.description')}
              </p>
            </motion.div>
          </motion.div>

          {/* Row 2 - Seamless Service: Text LEFT, Image RIGHT (43%) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',
              height: '550px',
              position: 'relative',
            }}
          >
            {/* Text - Left side */}
            <motion.div 
              variants={fadeInLeft}
              style={{ width: '48%' }}
            >
              <h3 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: '56px',
                  marginBottom: '16px',
                }}
              >
                {t('craftJourney.seamlessService.title')}
              </h3>
              <p 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '24px',
                  lineHeight: '43px',
                  fontWeight: 300,
                }}
              >
                {t('craftJourney.seamlessService.description')}
              </p>
            </motion.div>

            {/* Spacer */}
            <div style={{ width: '9%' }} />

            {/* Image - Right side 43% */}
            <motion.div 
              variants={fadeInRight}
              style={{ width: '43%', height: '550px', flexShrink: 0 }}
            >
              <img
                src={serviceImage}
                alt={t('craftJourney.seamlessService.title')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Row 3 - Curated Ambiance: Image LEFT (42%), Text RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',
              height: '550px',
              position: 'relative',
            }}
          >
            {/* Image - Left side 42% */}
            <motion.div 
              variants={fadeInLeft}
              style={{ width: '42%', height: '550px', flexShrink: 0 }}
            >
              <img
                src={ambianceImage}
                alt={t('craftJourney.curatedAmbiance.title')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>

            {/* Spacer */}
            <div style={{ width: '7%' }} />

            {/* Text - Right side */}
            <motion.div 
              variants={fadeInRight}
              style={{ width: '51%' }}
            >
              <h3 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: '56px',
                  marginBottom: '16px',
                }}
              >
                {t('craftJourney.curatedAmbiance.title')}
              </h3>
              <p 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '24px',
                  lineHeight: '43px',
                  fontWeight: 300,
                }}
              >
                {t('craftJourney.curatedAmbiance.description')}
              </p>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
