import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHover } from '@/lib/animations';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary-start to-primary-end text-white hover:shadow-lg hover:shadow-primary-start/25',
  secondary:
    'bg-dark-cell text-white hover:bg-dark-tertiary border border-transparent',
  outline:
    'bg-transparent border-2 border-primary-start text-primary-start hover:bg-primary-start/10',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] hover:bg-dark-cell/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className,
      disabled,
      loading,
      fullWidth,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        variants={buttonHover}
        initial="initial"
        whileHover={disabled || loading ? undefined : 'hover'}
        whileTap={disabled || loading ? undefined : 'tap'}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium',
          'transition-colors duration-200 focus:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary-start focus-visible:ring-offset-2',
          'focus-visible:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : null}
        <span className={cn('flex items-center gap-2', loading && 'invisible')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
