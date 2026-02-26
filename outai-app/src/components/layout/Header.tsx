import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo, Container, ThemeToggle } from '@/components/common';
import { useScrollPast, useIsMobile } from '@/hooks';
import { useLanguage } from '@/contexts';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { slideInFromRight } from '@/lib/animations';

// Nav link with animated underline
function NavLink({ item, label }: { item: typeof NAV_ITEMS[number]; label: string }) {
  const isRoute = item.href.startsWith('/') && !item.href.startsWith('/#');
  const NavTag = isRoute ? Link : 'a';
  const navProps = isRoute ? { to: item.href } : { href: item.href };

  return (
    <motion.div
      className="relative"
      style={{ display: 'inline-flex', alignItems: 'center' }}
      whileHover="hovered"
      initial="idle"
    >
      <NavTag
        {...(navProps as Record<string, string>)}
        className={cn(
          'text-base font-medium transition-colors flex items-center gap-2',
          'text-[var(--color-text-primary)] hover:text-primary-start'
        )}
      >
        {label}
        {item.hasDropdown && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </NavTag>
      {/* Animated underline */}
      <motion.div
        variants={{
          idle: { scaleX: 0, opacity: 0 },
          hovered: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: '-4px',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #7AC90E, #01A532)',
          borderRadius: '1px',
          transformOrigin: 'left center',
        }}
      />
    </motion.div>
  );
}

export function Header() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPast(50);
  const isMobile = useIsMobile();

  // Automatically close menu when transitioning to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const shouldShowMobileMenu = isMobile && isMobileMenuOpen;

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
        animate={{ 
          y: 0, 
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          isScrolled && 'shadow-lg'
        )}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          backgroundColor: isScrolled 
            ? 'rgba(var(--color-bg-header-rgb, 31, 41, 55), 0.72)' 
            : 'var(--color-bg-header)',
          borderBottom: isScrolled ? '1px solid rgba(var(--color-bg-header-rgb, 31, 41, 55), 0.12)' : 'none',
          transition: 'backdrop-filter 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease',
        }}
      >
        {/* Figma: height 120px, padding horizontal 160px, vertical 30px */}
        <Container>
          <motion.nav 
            animate={{ height: isScrolled ? 70 : (isMobile ? 75 : 90) }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between"
          >
            {/* Logo - 100x50 in Figma */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 12 }}
            >
              <Logo size="md" />
            </motion.div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  label={t(item.labelKey)}
                />
              ))}
            </div>

            {/* Desktop Actions - Right */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Sign in / Sign up */}
              <motion.a
                href="#signin"
                whileHover={{ scale: 1.05, color: 'var(--color-primary-start, #7AC90E)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-[var(--color-text-primary)] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {t('common.signIn')}
              </motion.a>
              <motion.a
                href="#signup"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(1, 165, 50, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-[var(--color-text-primary)] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {t('common.signUp')}
              </motion.a>

              {/* Language Switcher - EN/FR Pills */}
              <div className="flex items-center rounded-full bg-[var(--color-bg-cell)]" style={{ padding: '3px' }}>
                <button
                  onClick={() => setLanguage('en')}
                  style={language === 'en' ? { backgroundColor: 'var(--color-primary, #01A532)' } : {}}
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
                  style={language === 'fr' ? { backgroundColor: 'var(--color-primary, #01A532)' } : {}}
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
          </motion.nav>
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
                  {NAV_ITEMS.map((item, index) => {
                    const isRoute = item.href.startsWith('/') && !item.href.startsWith('/#');
                    const Component = isRoute ? motion(Link) : motion.a;
                    const linkProps = isRoute ? { to: item.href } : { href: item.href };
                    return (
                      <Component
                        key={item.id}
                        {...(linkProps as Record<string, string>)}
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
                      </Component>
                    );
                  })}
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
                            ? 'bg-[var(--color-primary)] text-white'
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
                            ? 'bg-[var(--color-primary)] text-white'
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
