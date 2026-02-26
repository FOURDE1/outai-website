import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';
import { useVisibleFAQItems } from '@/contexts/CmsContext';

// Stagger header
const faqHeaderContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const faqHeaderItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

export function FAQ() {
  const { t, i18n } = useTranslation();
  const faqItems = useVisibleFAQItems();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';
  const [openItems, setOpenItems] = useState<string[]>([]);

  const leftItems = faqItems.filter((_: unknown, i: number) => i % 2 === 0);
  const rightItems = faqItems.filter((_: unknown, i: number) => i % 2 !== 0);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: 'var(--color-bg-hero, #263140)',
        width: '100%',
        paddingTop: '60px',
        paddingBottom: '80px',
      }}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={faqHeaderContainer}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          {/* Tag */}
          <motion.p
            variants={faqHeaderItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {t('faq.sectionTag')}
          </motion.p>

          {/* Title */}
          <motion.h2
            variants={faqHeaderItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Sulphur Point", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: '48px',
              marginBottom: '8px',
            }}
          >
            {t('faq.sectionTitle')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={faqHeaderItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Sulphur Point", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: '48px',
            }}
          >
            {t('faq.sectionSubtitle')}
          </motion.p>
        </motion.div>

        {/* FAQ Grid - Two Columns */}
        <div
          style={{
            display: 'flex',
            gap: '80px',
            justifyContent: 'center',
          }}
        >
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInLeft}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              width: '400px',
            }}
          >
            {leftItems.map((item, index) => (
              <FAQItem
                key={item.id}
                id={item.id}
                question={lang === 'fr' ? item.questionFr : item.questionEn}
                answer={lang === 'fr' ? item.answerFr : item.answerEn}
                isOpen={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
                index={index}
              />
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInRight}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              width: '400px',
            }}
          >
            {rightItems.map((item, index) => (
              <FAQItem
                key={item.id}
                id={item.id}
                question={lang === 'fr' ? item.questionFr : item.questionEn}
                answer={lang === 'fr' ? item.answerFr : item.answerEn}
                isOpen={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 5 }}
      style={{
        marginBottom: '8px',
      }}
    >
      <motion.button
        onClick={onToggle}
        aria-expanded={isOpen}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        transition={{ duration: 0.2 }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          {question}
        </span>

        {/* Plus Icon — hover turns green */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }}
          whileHover={{ color: 'var(--color-primary-start, #7AC90E)' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            color: isOpen ? 'var(--color-primary-start, #7AC90E)' : 'var(--color-text-primary, #FFFFFF)',
            fontSize: '20px',
            fontWeight: 300,
          }}
        >
          +
        </motion.span>
      </motion.button>

      {/* Answer (expandable) — text fades in with delay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.1 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{
                color: 'var(--color-text-secondary, rgba(255, 255, 255, 0.7))',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingBottom: '24px',
                paddingLeft: '12px',
              }}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
