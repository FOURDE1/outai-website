import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts';
import { cn } from '@/lib/utils';
import { menuAnimation } from '@/lib/animations';
import type { Theme } from '@/types';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'compact' | 'icon' | 'cycle';
}

const themeOptions: { value: Theme; labelKey: string; icon: React.ReactNode }[] = [
  {
    value: 'light',
    labelKey: 'common.light',
    icon: <SunIcon className="w-4 h-4" />,
  },
  {
    value: 'dark',
    labelKey: 'common.dark',
    icon: <MoonIcon className="w-4 h-4" />,
  },
  {
    value: 'system',
    labelKey: 'common.system',
    icon: <ComputerIcon className="w-4 h-4" />,
  },
];

export function ThemeToggle({ className, variant = 'default' }: ThemeToggleProps) {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();

  // Cycle variant - small icon that cycles through light → dark → system
  if (variant === 'cycle') {
    const cycleTheme = () => {
      const themeOrder: Theme[] = ['light', 'dark', 'system'];
      const currentIndex = themeOrder.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      setTheme(themeOrder[nextIndex]);
    };

    // Show icon based on current theme setting (not resolved)
    const getIcon = () => {
      if (theme === 'light') return <SunIcon className="w-4 h-4" />;
      if (theme === 'dark') return <MoonIcon className="w-4 h-4" />;
      return <ComputerIcon className="w-4 h-4" />;
    };

    return (
      <button
        onClick={cycleTheme}
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center transition-all',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          'bg-[var(--color-bg-cell)] hover:bg-[var(--color-bg-tertiary)]',
          className
        )}
        aria-label={t('common.theme')}
        title={theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
      >
        {getIcon()}
      </button>
    );
  }

  // Simple toggle button for icon variant
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          'hover:bg-[var(--color-bg-secondary)]',
          className
        )}
        aria-label={t('common.theme')}
      >
        {resolvedTheme === 'dark' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    );
  }

  const currentTheme = themeOptions.find((opt) => opt.value === theme);

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
            {resolvedTheme === 'dark' ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
            {variant === 'default' && (
              <span className="text-sm font-medium">{t(currentTheme?.labelKey || 'common.theme')}</span>
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
                  {themeOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ focus }) => (
                        <button
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            'w-full px-4 py-2 text-left rtl:text-right text-sm flex items-center gap-2',
                            'transition-colors',
                            focus && 'bg-[var(--color-bg-tertiary)]',
                            theme === option.value
                              ? 'text-primary-start font-medium'
                              : 'text-[var(--color-text-secondary)]'
                          )}
                        >
                          {option.icon}
                          <span className="flex-1">{t(option.labelKey)}</span>
                          {theme === option.value && <CheckIcon className="w-4 h-4" />}
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
function SunIcon({ className }: { className?: string }) {
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
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
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
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

function ComputerIcon({ className }: { className?: string }) {
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
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
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
