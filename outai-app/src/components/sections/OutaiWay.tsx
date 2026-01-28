import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';

// Import the arrows graphic from Figma
import arrowsGraphic from '@/assets/outai-way/arrows.svg';

// Feature card colors matching Figma
const featureStyles = {
  'user-friendly': {
    borderColor: '#FADF23',
    glowColor: 'rgba(250, 223, 35, 0.4)',
  },
  'competitive-rates': {
    borderColor: '#DA33FF',
    glowColor: 'rgba(218, 51, 255, 0.4)',
  },
  'awesome-services': {
    borderColor: '#2FE297',
    glowColor: 'rgba(47, 226, 151, 0.4)',
  },
  'professional-captains': {
    borderColor: '#FF9232',
    glowColor: 'rgba(255, 146, 50, 0.4)',
  },
  'around-the-clock': {
    borderColor: '#07BA3C',
    glowColor: 'rgba(7, 186, 60, 0.4)',
  },
};

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  isCenter?: boolean;
}

function FeatureCard({ id, title, description, isCenter }: FeatureCardProps) {
  const style = featureStyles[id as keyof typeof featureStyles] || featureStyles['user-friendly'];
  
  return (
    <div
      style={{
        position: 'relative',
        width: '276px',
        minHeight: '139px',
      }}
    >
      {/* Glow Effect */}
      <div
        style={{
          position: 'absolute',
          inset: '-4px',
          backgroundColor: style.glowColor,
          borderRadius: '20px',
          filter: 'blur(10px)',
        }}
      />
      
      {/* Card Content */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#1F2937',
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
            color: '#FFFFFF',
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
            color: '#FFFFFF',
            fontFamily: '"Inter", sans-serif',
            fontSize: '12px',
            fontWeight: 300,
            lineHeight: '18px',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function OutaiWay() {
  const { t } = useTranslation();

  return (
    <section
      id="outai-way"
      style={{
        backgroundColor: '#1F2937',
        width: '100%',
        minHeight: '812px',
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
          variants={fadeInUp}
          style={{
            textAlign: 'center',
            marginBottom: '0',
          }}
        >
          <h2
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            Feature the{' '}
            <span style={{ color: '#01A532' }}>OUTAI</span>
            {' '}Way
          </h2>
        </motion.div>

        {/* Main Layout Container - Matching Figma positions */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '750px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Center Arrows Graphic from Figma */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60px',
              transform: 'translateX(-50%)',
              width: '527px',
              height: '522px',
              zIndex: 1,
            }}
          >
            <img 
              src={arrowsGraphic} 
              alt="" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* User Friendly - Top Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInLeft}
            style={{
              position: 'absolute',
              left: '0',
              top: '127px',
              zIndex: 2,
            }}
          >
            <FeatureCard
              id="user-friendly"
              title={t('outaiWay.userFriendly.title')}
              description={t('outaiWay.userFriendly.description')}
            />
          </motion.div>

          {/* Competitive Rates - Top Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInRight}
            style={{
              position: 'absolute',
              right: '0',
              top: '127px',
              zIndex: 2,
            }}
          >
            <FeatureCard
              id="competitive-rates"
              title={t('outaiWay.competitiveRates.title')}
              description={t('outaiWay.competitiveRates.description')}
            />
          </motion.div>

          {/* Awesome Set of Services - Middle Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInLeft}
            style={{
              position: 'absolute',
              left: '0',
              top: '346px',
              zIndex: 2,
            }}
          >
            <FeatureCard
              id="awesome-services"
              title={t('outaiWay.awesomeServices.title')}
              description={t('outaiWay.awesomeServices.description')}
            />
          </motion.div>

          {/* Professional Captains - Middle Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInRight}
            style={{
              position: 'absolute',
              right: '0',
              top: '353px',
              zIndex: 2,
            }}
          >
            <FeatureCard
              id="professional-captains"
              title={t('outaiWay.professionalCaptains.title')}
              description={t('outaiWay.professionalCaptains.description')}
            />
          </motion.div>

          {/* Around the Clock Service - Bottom Center */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '610px',
              zIndex: 2,
            }}
          >
            <FeatureCard
              id="around-the-clock"
              title={t('outaiWay.aroundTheClock.title')}
              description={t('outaiWay.aroundTheClock.description')}
              isCenter
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
