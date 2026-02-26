import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Logo } from '@/components/common';
import { fadeInUp, viewportSettings } from '@/lib/animations';

// Stagger container for footer columns
const footerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const footerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

// Social icons stagger
const socialStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const socialItem: Variants = {
  hidden: { opacity: 0, scale: 0, y: 10 },
  visible: {
    opacity: 0.7,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 12 },
  },
};

// Footer link structure — labels are i18n keys
const footerLinkSections = [
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'footer.about', href: '#' },
      { labelKey: 'footer.features', href: '#' },
      { labelKey: 'footer.works', href: '#' },
      { labelKey: 'footer.career', href: '#' },
    ],
  },
  {
    titleKey: 'footer.help',
    links: [
      { labelKey: 'footer.support', href: '#' },
      { labelKey: 'footer.deliveryDetails', href: '#' },
      { labelKey: 'footer.terms', href: '#' },
      { labelKey: 'footer.privacy', href: '#' },
    ],
  },
  {
    titleKey: 'footer.resources',
    links: [
      { labelKey: 'footer.freeEbooks', href: '#' },
      { labelKey: 'footer.howToBlog', href: '#blog' },
      { labelKey: 'footer.subscription', href: '#' },
    ],
  },
];

// Footer Link with hover animation - defined outside component
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      initial={{ x: 0, color: 'var(--color-text-secondary, #9CA3AF)' }}
      whileHover={{ x: 4, color: 'var(--color-text-primary, #FFFFFF)' }}
      transition={{ duration: 0.2 }}
      style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '20px',
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      {label}
    </motion.a>
  );
}

// Social Icon with hover animation - defined outside component
function SocialIcon({ href, ariaLabel, children }: { href: string; ariaLabel: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      initial={{ scale: 1, opacity: 0.7 }}
      whileHover={{ scale: 1.2, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      style={{ color: 'var(--color-text-secondary, #9CA3AF)', display: 'flex' }}
    >
      {children}
    </motion.a>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        width: '100%',
      }}
    >
      {/* Main Footer Content */}
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={footerStagger}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
        >
          {/* Logo & Copyright Section */}
          <motion.div variants={footerItem} style={{ maxWidth: '280px' }}>
            {/* Logo */}
            <div style={{ marginBottom: '20px' }}>
              <Logo size="lg" />
            </div>

            {/* Copyright Text */}
            <p
              style={{
                color: 'var(--color-text-secondary, #9CA3AF)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '20px',
              }}
            >
              {t('footer.copyright', { year: currentYear, defaultValue: `Copyright © ${currentYear} All rights reserved | OUTAI` })}
            </p>
          </motion.div>

          {/* Links Columns */}
          <div style={{ display: 'flex', gap: '60px' }}>
            {footerLinkSections.map((section) => (
              <motion.div key={section.titleKey} variants={footerItem}>
                <h4
                  style={{
                    color: 'var(--color-text-primary, #FFFFFF)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    marginBottom: '16px',
                  }}
                >
                  {t(section.titleKey)}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.links.map((link) => (
                    <li key={link.labelKey} style={{ marginBottom: '8px' }}>
                      <FooterLink href={link.href} label={t(link.labelKey)} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Bottom Bar — slide up entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '24px',
              paddingBottom: '24px',
            }}
          >
            {/* Left - Address & Contact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LocationIcon />
                <span
                  style={{
                    color: 'var(--color-text-secondary, #9CA3AF)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '20px',
                  }}
                >
                  {t('footer.address')}
                </span>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EmailIcon />
                <a
                  href="mailto:contact@outai.com"
                  style={{
                    color: 'var(--color-text-secondary, #9CA3AF)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    textDecoration: 'none',
                  }}
                >
                  contact@outai.com
                </a>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneIcon />
                <a
                  href="tel:+1234567890"
                  style={{
                    color: 'var(--color-text-secondary, #9CA3AF)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    textDecoration: 'none',
                  }}
                >
                  (123) 456-7890
                </a>
              </div>
            </div>

            {/* Right - Social Icons — stagger bounce */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={socialStagger}
              style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              {/* Twitter */}
              <motion.div variants={socialItem}>
                <SocialIcon href="#" ariaLabel="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              </motion.div>

              {/* Facebook */}
              <motion.div variants={socialItem}>
              <SocialIcon href="#" ariaLabel="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              </motion.div>

              {/* LinkedIn */}
              <motion.div variants={socialItem}>
              <SocialIcon href="#" ariaLabel="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </footer>
  );
}

// Icons
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5C13.75 14.375 17.5 11.0068 17.5 8.125C17.5 3.95304 14.1421 0.625 10 0.625C5.85786 0.625 2.5 3.95304 2.5 8.125C2.5 11.0068 6.25 14.375 10 17.5Z"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 5.83333L9.0755 10.5962C9.63533 10.9819 10.3647 10.9819 10.9245 10.5962L17.5 5.83333M4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333Z"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H6.89298C7.25429 2.5 7.57458 2.73198 7.68998 3.07533L8.93589 6.81343C9.06761 7.20883 8.91254 7.64439 8.55836 7.88067L7.06173 8.87867C7.96368 10.9002 9.59983 12.5363 11.6213 13.4383L12.6193 11.9416C12.8556 11.5875 13.2912 11.4324 13.6866 11.5641L17.4247 12.81C17.768 12.9254 18 13.2457 18 13.607V16.3333C18 17.2538 17.2538 18 16.3333 18H15.8333C8.46954 18 2.5 12.0305 2.5 4.66667V4.16667Z"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
