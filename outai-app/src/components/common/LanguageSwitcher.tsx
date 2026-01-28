import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts';
import { cn } from '@/lib/utils';
import { menuAnimation } from '@/lib/animations';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage, availableLanguages } = useLanguage();

  const currentLang = availableLanguages[language];

  return (
    <Menu as="div" className={cn('relative', className)}>
      {({ open }) => (
        <>
          <MenuButton
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
              'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              'hover:bg-[var(--color-bg-secondary)]',
              variant === 'compact' && 'px-2 py-1.5'
            )}
          >
            <GlobeIcon className="w-5 h-5" />
            {variant === 'default' && (
              <span className="text-sm font-medium">{currentLang.nativeName}</span>
            )}
            <ChevronDownIcon
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </MenuButton>

          <AnimatePresence>
            {open && (
              <MenuItems
                as={motion.div}
                static
                variants={menuAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  'absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 origin-top-right',
                  'rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
                  'shadow-lg focus:outline-none z-50 overflow-hidden'
                )}
              >
                <div className="py-1">
                  {(Object.entries(availableLanguages) as [keyof typeof availableLanguages, typeof availableLanguages[keyof typeof availableLanguages]][]).map(([code, lang]) => (
                    <MenuItem key={code}>
                      {({ focus }) => (
                        <button
                          onClick={() => setLanguage(code)}
                          className={cn(
                            'w-full px-4 py-2 text-left rtl:text-right text-sm flex items-center gap-2',
                            'transition-colors',
                            focus && 'bg-[var(--color-bg-tertiary)]',
                            language === code
                              ? 'text-primary-start font-medium'
                              : 'text-[var(--color-text-secondary)]'
                          )}
                        >
                          <span className="flex-1">{lang.nativeName}</span>
                          {language === code && <CheckIcon className="w-4 h-4" />}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}

// Icons
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
