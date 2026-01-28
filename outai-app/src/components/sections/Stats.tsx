import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';

// Import the stats image - add to: src/assets/stats/car-keys.png
import statsImage from '@/assets/stats/car-keys.jpg';

export function Stats() {
  const { t } = useTranslation();

  return (
    <section 
      id="stats"
      className="w-full relative z-20 overflow-hidden"
      style={{ 
        backgroundColor: '#263140',
      }}
    >
      <Container>
        <div 
          className="flex flex-col lg:flex-row items-center"
          style={{ 
            gap: '80px',
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
              width: '426px',
              height: '509px',
            }}
          >
            {/* Yellow Ellipse - Top Left */}
            <div 
              className="absolute"
              style={{
                width: '150px',
                height: '150px',
                left: '0',
                top: '18px',
                backgroundColor: '#FADF23',
                borderRadius: '75px',
                boxShadow: '0px 4px 12px #1c1c1c',
              }}
            />
            
            {/* Green Gradient Ellipse - Bottom Right */}
            <div 
              className="absolute"
              style={{
                width: '262px',
                height: '262px',
                left: '164px',
                top: '247px',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                borderRadius: '131px',
                boxShadow: '0px 4px 12px #1c1c1c',
              }}
            />
            
            {/* Main Image */}
            <img
              src={statsImage}
              alt="Car keys handover"
              className="absolute object-cover"
              style={{
                width: '325px',
                height: '476px',
                left: '63px',
                top: '-12px',
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
            {/* Hero Text */}
            <div className="flex flex-col" style={{ gap: '30px' }}>
              {/* Heading */}
              <h2 
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '40px',
                  fontWeight: 700,
                  lineHeight: '56px',
                  letterSpacing: '0',
                }}
              >
                {t('stats.sectionTitle')}
              </h2>
              
              {/* Paragraph */}
              <p 
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: '30px',
                  letterSpacing: '0',
                }}
              >
                {t('stats.sectionDescription')}
              </p>
            </div>

            {/* Stats */}
            <div 
              className="flex justify-between"
              style={{ maxWidth: '440px' }}
            >
              {/* Stat 1 - Successful Rides */}
              <div 
                className="flex flex-col items-center"
                style={{ gap: '26px', width: '149px' }}
              >
                <span 
                  style={{
                    color: '#01A532',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '50px',
                    fontWeight: 700,
                    lineHeight: '30px',
                    textAlign: 'center',
                  }}
                >
                  500 +
                </span>
                <span 
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '30px',
                  }}
                >
                  {t('stats.successfulRides')}
                </span>
              </div>

              {/* Stat 2 - Business Clients */}
              <div 
                className="flex flex-col items-center"
                style={{ gap: '23px', width: '148px' }}
              >
                <span 
                  style={{
                    color: '#7AC90E',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '50px',
                    fontWeight: 700,
                    lineHeight: '30px',
                    textAlign: 'center',
                  }}
                >
                  300 +
                </span>
                <span 
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '30px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('stats.businessClients')}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
