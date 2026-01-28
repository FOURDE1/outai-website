import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Logo, Container, ThemeToggle } from '@/components/common';
import { useScrollPast, useIsMobile } from '@/hooks';
import { useLanguage } from '@/contexts';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { slideInFromRight } from '@/lib/animations';

export function Header() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPast(50);
  const isMobile = useIsMobile();

  // Automatically close menu when transitioning to desktop
  const shouldShowMobileMenu = useMemo(() => {
    if (!isMobile && isMobileMenuOpen) {
      queueMicrotask(() => setIsMobileMenuOpen(false));
      return false;
    }
    return isMobileMenuOpen;
  }, [isMobile, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-[var(--color-bg-header)]',
          isScrolled && 'shadow-lg'
        )}
      >
        {/* Figma: height 120px, padding horizontal 160px, vertical 30px */}
        <Container>
          <nav className="flex items-center justify-between h-[75px] lg:h-[90px]">
            {/* Logo - 100x50 in Figma */}
            <Logo size="md" />

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'text-base font-medium transition-colors flex items-center gap-2',
                    'text-[var(--color-text-primary)] hover:text-primary-start'
                  )}
                >
                  {t(item.labelKey)}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Desktop Actions - Right */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Sign in / Sign up */}
              <a
                href="#signin"
                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-primary-start transition-colors"
              >
                {t('common.signIn')}
              </a>
              <a
                href="#signup"
                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-primary-start transition-colors"
              >
                {t('common.signUp')}
              </a>

              {/* Language Switcher - EN/FR Pills */}
              <div className="flex items-center rounded-full bg-[#1E2A36]" style={{ padding: '3px' }}>
                <button
                  onClick={() => setLanguage('en')}
                  style={language === 'en' ? { backgroundColor: '#01A532' } : {}}
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    language === 'en'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  style={language === 'fr' ? { backgroundColor: '#01A532' } : {}}
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    language === 'fr'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  FR
                </button>
              </div>

              {/* Theme Toggle - Compact cycling icon */}
              <ThemeToggle variant="cycle" className="ml-2" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-text-primary)]"
              aria-label={t('common.menu')}
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  className="w-full h-0.5 bg-current origin-left"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-full h-0.5 bg-current"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  className="w-full h-0.5 bg-current origin-left"
                />
              </motion.div>
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {shouldShowMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-80 max-w-[85vw]',
                'bg-[var(--color-bg-header)] z-50 lg:hidden',
                'border-l rtl:border-l-0 rtl:border-r border-[var(--color-border)]',
                'shadow-2xl'
              )}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-6 py-3 text-base font-medium',
                        'text-[var(--color-text-primary)] hover:text-primary-start',
                        'hover:bg-[var(--color-bg-cell)] transition-colors'
                      )}
                    >
                      {t(item.labelKey)}
                    </motion.a>
                  ))}
                </nav>

                {/* Menu Footer */}
                <div className="p-4 border-t border-[var(--color-border)] space-y-4">
                  {/* Language Switcher & Theme Toggle */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center flex-1 gap-1 p-1 rounded-full bg-[var(--color-bg-cell)]">
                      <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                          'flex-1 py-2 rounded-full text-sm font-medium transition-all',
                          language === 'en'
                            ? 'bg-[#01A532] text-white'
                            : 'text-[var(--color-text-secondary)]'
                        )}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLanguage('fr')}
                        className={cn(
                          'flex-1 py-2 rounded-full text-sm font-medium transition-all',
                          language === 'fr'
                            ? 'bg-[#01A532] text-white'
                            : 'text-[var(--color-text-secondary)]'
                        )}
                      >
                        FR
                      </button>
                    </div>
                    <ThemeToggle variant="cycle" />
                  </div>

                  {/* Auth buttons */}
                  <div className="flex flex-col gap-2">
                    <a
                      href="#signin"
                      className="w-full py-3 text-center text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-cell)] transition-colors"
                    >
                      {t('common.signIn')}
                    </a>
                    <a
                      href="#signup"
                      className="w-full py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-primary-start to-primary-end rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {t('common.signUp')}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
