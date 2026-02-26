import type { Variants, Transition } from 'framer-motion';

// Default transition settings - smoother and more professional
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // custom easeOutQuint
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: 'easeOut',
};

// Gentle spring for subtle movements
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 20,
};

// Fade animations with enhanced timing
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Scale animations with bounce
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
};

export const scaleInCenter: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

// Stagger container animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Stagger child animations
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Slide animations
export const slideInFromLeft: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideInFromTop: Variants = {
  hidden: {
    y: '-100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Float animation for phone mockup
export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse glow animation
export const pulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(122, 201, 14, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(122, 201, 14, 0.3)',
      '0 0 40px rgba(122, 201, 14, 0.5)',
      '0 0 20px rgba(122, 201, 14, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

// Character stagger for text
export const characterStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const characterAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// Card hover animation
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Button hover animation
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Menu animations
export const menuAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
};

// Accordion animation
export const accordionAnimation: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Counter animation helper
export const counterAnimation = {
  from: 0,
  duration: 2,
  ease: 'easeOut' as const,
};

// Scroll-triggered section animations
export const sectionAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Image reveal animation
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: '-50px',
};

// Enhanced card hover with glow effect
export const cardHoverGlow: Variants = {
  initial: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Smooth reveal from bottom
export const revealFromBottom: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Image zoom on scroll
export const imageZoomReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Parallax-like subtle movement
export const subtleParallax: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Rotate and fade in
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -5,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Service card hover
export const serviceCardHover: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -12,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Icon bounce
export const iconBounce: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.15,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

// Blog card hover
export const blogCardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

// FAQ accordion smooth
export const faqAccordion: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.25 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, delay: 0.1 },
    },
  },
};

// Footer link hover
export const footerLinkHover: Variants = {
  initial: { x: 0, color: '#9CA3AF' },
  hover: {
    x: 4,
    color: '#FFFFFF',
    transition: { duration: 0.2 },
  },
};

// Social icon hover
export const socialIconHover: Variants = {
  initial: { scale: 1, opacity: 0.7 },
  hover: {
    scale: 1.2,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

// Stat number counter animation
export const statCounter: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Navigation item hover
export const navItemHover: Variants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Button shine effect container
export const buttonShine: Variants = {
  initial: { backgroundPosition: '200% 0' },
  hover: {
    backgroundPosition: '-200% 0',
    transition: { duration: 1.5, ease: 'linear' },
  },
};

// Stagger for cards with more delay
export const cardStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card stagger item
export const cardStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Glow pulse for OutaiWay cards
export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 0px rgba(122, 201, 14, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(122, 201, 14, 0.4)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Helper function to create custom fade in with delay
export const createFadeInWithDelay = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      delay,
    },
  },
});

// Helper function to create stagger with custom settings
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});
