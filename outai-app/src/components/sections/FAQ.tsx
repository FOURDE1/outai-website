import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common';
import { fadeInUp, viewportSettings } from '@/lib/animations';

// FAQ items data
const faqItems = [
  {
    id: 'q1',
    question: 'How do i Book A ride with OUTAI App?',
  },
  {
    id: 'q2',
    question: 'How can i track my OUTAI ride?',
  },
  {
    id: 'q3',
    question: 'What type of vehicles are available on OUTAI App?',
  },
  {
    id: 'q4',
    question: 'How do you ensure passenger saftey?',
  },
  {
    id: 'q5',
    question: 'Can i Schedule a ride in advance',
  },
  {
    id: 'q6',
    question: 'What if i need to cancel booking?',
  },
  {
    id: 'q7',
    question: 'How do i pay for my ride?',
  },
  {
    id: 'q8',
    question: 'Is OUTAI App available for corporate accounts?',
  },
];

// Split FAQ items into two columns
const leftColumnItems = faqItems.filter((_, index) => index % 2 === 0);
const rightColumnItems = faqItems.filter((_, index) => index % 2 === 1);

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: '#263140',
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
          variants={fadeInUp}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          {/* Tag */}
          <p
            style={{
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </p>

          {/* Title */}
          <h2
            style={{
              color: '#FFFFFF',
              fontFamily: '"Sulphur Point", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: '48px',
              marginBottom: '8px',
            }}
          >
            Got questions? Find quick answers!
          </h2>

          {/* Subtitle */}
          <p
            style={{
              color: '#FFFFFF',
              fontFamily: '"Sulphur Point", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              lineHeight: '48px',
            }}
          >
            Simplifying your OUTAI experience.
          </p>
        </motion.div>

        {/* FAQ Grid - Two Columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
          style={{
            display: 'flex',
            gap: '80px',
            justifyContent: 'center',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              width: '400px',
            }}
          >
            {leftColumnItems.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                isOpen={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              width: '400px',
            }}
          >
            {rightColumnItems.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                isOpen={openItems.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

interface FAQItemProps {
  question: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      style={{
        marginBottom: '8px',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          {question}
        </span>

        {/* Plus Icon */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            flexShrink: 0,
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 300,
          }}
        >
          +
        </motion.span>
      </button>

      {/* Answer (expandable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                paddingBottom: '24px',
              }}
            >
              Simply download our app, create an account, enter your pickup and destination, 
              choose your ride type, and confirm. A driver will be assigned within minutes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
